/**
 * Membangkitkan public/downloads/panduan-loka-kasir.pdf — panduan pengguna
 * yang bisa diunduh dari /panduan.
 *
 * Tidak ada isi yang dikarang di sini; semuanya dari sumber yang sama dengan
 * situs dan aplikasi:
 * - Bagian 1 dari src/data/site/panduan.ts (+ jawaban FAQ yang dirujuknya) —
 *   sama persis dengan halaman /panduan.
 * - Bagian 2 dari fitur-aplikasi.json — panduan "Yang baru" di aplikasi,
 *   dikurasi (lihat kunci `_sumber` di berkasnya).
 * - Panduan yang di situs hanya berupa video dicantumkan beserta tautannya.
 *
 * Ditata untuk dibaca siapa saja, termasuk orang tua: huruf 12,5pt, satu bab
 * per topik (panduan dasar dan panduan fitur digabung), setiap bab mulai di
 * halaman baru, topik tidak terpotong bila muat satu halaman, dan daftar isi
 * bernomor lengkap dengan nomor halaman serta bookmark PDF.
 *
 * Jalankan: npm run panduan:pdf
 * Butuh Google Chrome (atau CHROME_PATH ke Chrome/Chromium lain).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { getFaqs } from '@/data/faq';
import { getGuideGroups, type Guide } from '@/data/site/panduan';
import { SUPPORT_EMAIL, WHATSAPP_DISPLAY, siteLinks } from '@/data/site/links';
import { siteDetails } from '@/data/siteDetails';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const publicDir = join(root, 'public');
const outFile = join(publicDir, 'downloads', 'panduan-loka-kasir.pdf');

type FeatureGuide = { title: string; since: string; steps: string[] };
const features = JSON.parse(readFileSync(join(here, 'fitur-aplikasi.json'), 'utf8')) as {
  groups: { group: string; guides: FeatureGuide[] }[];
};

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** Teks berparagraf (jawaban FAQ memakai baris baru sebagai pemisah). */
const paras = (s: string) => esc(s).replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>');
const img = (src: string) => pathToFileURL(join(publicDir, src)).href;
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const locale = 'id' as const;
const links = siteLinks(locale);
const faqs = getFaqs(locale);
const groups = getGuideGroups(locale);
const hasText = (g: Guide) => Boolean(g.steps || g.intro || g.faq?.length);
const written = groups.map(gr => ({ ...gr, guides: gr.guides.filter(hasText) })).filter(gr => gr.guides.length);
const videoOnly = groups.flatMap(gr => gr.guides.filter(g => !hasText(g) && g.youtubeId).map(g => ({ ...g, group: gr.title })));

const updated = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

// ── Susunan bab ─────────────────────────────────────────────────────────────
//
// Di PDF, panduan dasar (Bagian 1 situs) dan panduan fitur digabung per topik:
// pembaca — termasuk yang jarang memegang HP — cukup mencari satu bab, bukan
// "Pesanan & pembayaran" di dua tempat. Urutannya mengikuti hari kerja kasir,
// lalu pengaturan, lalu urusan pemilik. Grup baru yang belum terdaftar di sini
// tetap tampil, disisipkan sebelum "Mengatasi masalah".
const BAB_ORDER = [
  'Mulai di sini',
  'Pesanan & pembayaran',
  'Pelanggan & member',
  'Meja & sewa',
  'Booking lapangan',
  'Produk & stok',
  'Pengaturan',
  'Pegawai & absensi',
  'Keuangan & pembukuan',
  'Untuk pemilik',
  'Mengatasi masalah',
];
const FEATURE_GROUP_ALIAS: Record<string, string> = { 'Pengaturan & tampilan': 'Pengaturan' };
const BAB_INTRO: Record<string, string> = {
  'Mulai di sini': 'Lima langkah harian kasir, dari login sampai tutup shift. Baca bab ini lebih dulu.',
  'Mengatasi masalah': 'Langkah yang bisa dicoba sendiri sebelum menghubungi tim Loka.',
};
/** Pintasan di halaman daftar isi — hal yang paling sering ditanyakan ke CS. */
const POPULAR: { slug: string; label: string }[] = [
  { slug: 'buka-kasir', label: 'Buka kasir di pagi hari' },
  { slug: 'transaksi', label: 'Melayani pembeli sampai struk tercetak' },
  { slug: 'riwayat-struk', label: 'Mencetak ulang struk' },
  { slug: 'kas-masuk-keluar', label: 'Mencatat uang keluar dari laci' },
  { slug: 'tutup-shift', label: 'Tutup kasir di akhir hari' },
  { slug: 'tambah-produk', label: 'Menambah produk baru' },
  { slug: 'pembatalan-refund', label: 'Membatalkan transaksi atau refund' },
  { slug: 'printer-tidak-mencetak', label: 'Printer tidak mencetak' },
];

type Entry = { id: string; num: string; title: string; html: string };
type Bab = { num: number; id: string; title: string; entries: Entry[] };

const babTitles = [...BAB_ORDER];
const addBab = (t: string) => {
  if (babTitles.includes(t)) return;
  const trouble = babTitles.indexOf('Mengatasi masalah');
  babTitles.splice(trouble < 0 ? babTitles.length : trouble, 0, t);
};
written.forEach(gr => addBab(gr.title));
features.groups.forEach(gr => addBab(FEATURE_GROUP_ALIAS[gr.group] ?? gr.group));

const babs: Bab[] = babTitles
  .map(title => {
    const basics = written.find(gr => gr.title === title)?.guides ?? [];
    const feats = features.groups.filter(gr => (FEATURE_GROUP_ALIAS[gr.group] ?? gr.group) === title).flatMap(gr => gr.guides);
    return { title, basics, feats };
  })
  .filter(b => b.basics.length || b.feats.length)
  .map((b, i) => {
    const num = i + 1;
    const items = [
      ...b.basics.map(g => ({ id: g.slug, title: g.title, render: (n: string, pre: string) => guideHtml(g, n, pre) })),
      ...b.feats.map(f => ({ id: `fitur-${slugify(f.title)}`, title: f.title, render: (n: string, pre: string) => featureHtml(f, n, pre) })),
    ];
    // Kepala bab ditaruh di dalam topik pertamanya supaya tidak pernah
    // tertinggal sendirian di halaman kosong.
    const head = `<header class="bab-head" id="bab-${num}"><p class="kicker">Bab ${num}</p><h2>${esc(b.title)}</h2>${BAB_INTRO[b.title] ? `<p class="intro">${esc(BAB_INTRO[b.title])}</p>` : ''}</header>`;
    return {
      num,
      id: `bab-${num}`,
      title: b.title,
      entries: items.map((it, j) => ({ id: it.id, num: `${num}.${j + 1}`, title: it.title, html: it.render(`${num}.${j + 1}`, j === 0 ? head : '') })),
    };
  });
const entryById = new Map(babs.flatMap(b => b.entries.map(e => [e.id, e] as const)));

function guideHtml(g: Guide, num: string, prefix = '') {
  const answers = (g.faq ?? []).map(q => faqs.find(f => f.question === q)).filter(Boolean) as { question: string; answer: string }[];
  // Panduan bergambar atau ber-FAQ bisa lebih dari satu halaman: biarkan
  // terpotong di antara langkah, asal judul + pengantar tetap bersama.
  const long = Boolean(g.image || answers.length);
  return `
  <article class="guide${long ? ' long' : ''}" id="${g.slug}">
    <div class="head">
      ${prefix}
      <h3><span class="num">${num}</span> ${esc(g.title)}</h3>
      <p class="lead">${esc(g.intro ?? g.desc)}</p>
    </div>
    ${g.image ? `<figure><img src="${img(g.image.src)}" alt="${esc(g.image.alt)}"></figure>` : ''}
    ${g.steps ? `<ol class="steps">${g.steps.map(s => `<li><b>${esc(s.title)}</b><span>${esc(s.body)}</span></li>`).join('')}</ol>` : ''}
    ${g.tip ? `<p class="tip"><b>Tips:</b> ${esc(g.tip)}</p>` : ''}
    ${answers.map(a => `<section class="faq"><h4>${esc(a.question)}</h4><p>${paras(a.answer)}</p></section>`).join('')}
    ${g.youtubeId ? `<p class="video">Tonton videonya: <a href="https://youtu.be/${g.youtubeId}">youtu.be/${g.youtubeId}</a></p>` : ''}
  </article>`;
}

function featureHtml(f: FeatureGuide, num: string, prefix = '') {
  return `
  <article class="guide feature" id="fitur-${slugify(f.title)}">
    ${prefix}
    <h3><span class="num">${num}</span> ${esc(f.title)}</h3>
    <ol class="steps">${f.steps.map(s => `<li><span>${esc(s)}</span></li>`).join('')}</ol>
  </article>`;
}

type Pages = Map<string, number>;
const pg = (pages: Pages, id: string) => (pages.has(id) ? String(pages.get(id)) : '');
const tocRow = (pages: Pages, id: string, num: string, title: string, cls = '') =>
  `<a class="row ${cls}" href="#${id}"><span class="n">${esc(num)}</span><span class="t">${esc(title)}</span><span class="dots"></span><span class="p">${pg(pages, id)}</span></a>`;

const siteHost = siteDetails.siteUrl.replace('https://', '');
const panduanUrl = links.panduan.startsWith('http') ? links.panduan : siteHost + links.panduan;

function buildHtml(pages: Pages) {
  const popular = POPULAR.filter(p => entryById.has(p.slug));
  const toc = `
  <nav class="toc">
    <h2>Daftar Isi</h2>
    <div class="howto">
      <p><b>Cara memakai panduan ini</b></p>
      <ol>
        <li>Cari topik yang Anda perlukan di daftar ini, lalu lihat <b>nomor halamannya</b> di sebelah kanan.</li>
        <li>Membaca di HP? <b>Ketuk judulnya</b> untuk langsung menuju halamannya.</li>
        <li>Tanda <b>›</b> artinya "lalu ketuk". Contoh: <b>Lainnya › Produk</b> = ketuk Lainnya, lalu ketuk Produk.</li>
      </ol>
    </div>
    ${popular.length ? `
    <div class="popular">
      <p class="label">Paling sering dicari</p>
      ${popular.map(p => tocRow(pages, p.slug, entryById.get(p.slug)!.num, p.label)).join('')}
    </div>` : ''}
    ${babs.map(b => `
    <div class="toc-bab">
      ${tocRow(pages, b.id, `Bab ${b.num}`, b.title, 'bab')}
      ${b.entries.map(e => tocRow(pages, e.id, e.num, e.title)).join('')}
    </div>`).join('')}
    ${videoOnly.length ? tocRow(pages, 'video', '', 'Video panduan lainnya', 'bab') : ''}
    ${tocRow(pages, 'bantuan', '', 'Butuh bantuan? Hubungi tim Loka', 'bab')}
  </nav>`;

  return `<!doctype html>
<html lang="id"><head><meta charset="utf-8">
<title>Panduan Pengguna ${esc(siteDetails.siteName)}</title>
<style>
  @page { size: A4; margin: 16mm 16mm 18mm; @bottom-center { content: "Panduan Pengguna Loka Kasir  ·  Halaman " counter(page); font: 10pt system-ui, sans-serif; color: #4b5563; } }
  @page :first { @bottom-center { content: none; } }
  * { box-sizing: border-box; }
  body { font: 12.5pt/1.6 -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: #111827; margin: 0; }
  a { color: #1d4ed8; text-decoration: none; }
  b { font-weight: 700; }
  h2 { font-size: 24pt; line-height: 1.2; margin: 0 0 5mm; letter-spacing: -0.01em; }
  h3 { font-size: 17pt; line-height: 1.3; margin: 0 0 2.5mm; break-after: avoid; }
  h4 { font-size: 13pt; margin: 4mm 0 1.5mm; break-after: avoid; }

  /* Sampul */
  .cover { height: 258mm; display: flex; flex-direction: column; justify-content: space-between; break-after: page; }
  .cover img.logo { width: 52mm; }
  .cover h1 { font-size: 38pt; line-height: 1.1; margin: 0 0 5mm; letter-spacing: -0.02em; }
  .cover .sub { font-size: 15pt; color: #374151; max-width: 150mm; margin: 0; }
  .cover .hero { width: 100%; border-radius: 4mm; margin: 8mm 0 0; }
  .cover .meta { font-size: 11pt; color: #374151; border-top: 1px solid #d1d5db; padding-top: 4mm; margin: 0; }

  /* Daftar isi */
  .toc { break-after: page; }
  .toc .howto { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 3mm; padding: 4mm 5mm; margin: 0 0 6mm; break-inside: avoid; }
  .toc .howto p { margin: 0 0 1.5mm; }
  .toc .howto ol { margin: 0; padding-left: 6mm; }
  .toc .howto li { margin-bottom: 1mm; }
  .toc .popular { border: 2px solid #111827; border-radius: 3mm; padding: 3mm 5mm 2mm; margin: 0 0 7mm; break-inside: avoid; }
  .toc .popular .label { font-weight: 700; font-size: 13.5pt; margin: 0 0 1.5mm; }
  .toc .row { display: flex; align-items: baseline; gap: 3mm; color: #111827; padding: 1.4mm 0; break-inside: avoid; }
  .toc .row .n { flex: 0 0 13mm; color: #4b5563; font-variant-numeric: tabular-nums; }
  .toc .row .t { flex: 0 1 auto; }
  .toc .row .dots { flex: 1 1 auto; border-bottom: 1.5px dotted #9ca3af; min-width: 6mm; transform: translateY(-1.2mm); }
  .toc .row .p { flex: 0 0 11mm; text-align: right; font-weight: 700; font-variant-numeric: tabular-nums; }
  .toc .toc-bab { margin: 0 0 4mm; }
  .toc .row.bab { font-weight: 700; font-size: 14pt; margin-top: 2mm; border-top: 1px solid #e5e7eb; padding-top: 3mm; break-after: avoid; }
  .toc .row.bab .n { color: #1d4ed8; flex-basis: 16mm; font-size: 11pt; }
  .toc .toc-bab .row:not(.bab) .n { flex-basis: 16mm; }

  /* Bab dan topik */
  .chapter { break-before: page; }
  .bab-head { border-bottom: 3px solid #1d4ed8; padding-bottom: 3mm; margin: 0 0 7mm; break-after: avoid; }
  .bab-head .kicker { font-size: 12pt; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #1d4ed8; margin: 0 0 1mm; }
  .bab-head h2 { margin: 0; }
  .bab-head .intro { color: #374151; margin: 2mm 0 0; }
  .guide { margin: 0 0 9mm; break-inside: avoid; }
  .guide.long { break-inside: auto; }
  .guide .head { break-inside: avoid; break-after: avoid; }
  .guide h3 .num { display: inline-block; min-width: 12mm; margin-right: 3mm; color: #1d4ed8; font-variant-numeric: tabular-nums; }
  .guide .lead { color: #374151; margin: 0 0 4mm; }
  .guide figure { margin: 0 0 4mm; break-inside: avoid; }
  .guide figure img { width: 100%; max-height: 95mm; object-fit: contain; object-position: left top; border-radius: 2.5mm; border: 1px solid #e5e7eb; }
  ol.steps { list-style: none; counter-reset: s; padding: 0; margin: 0 0 4mm; }
  ol.steps li { counter-increment: s; position: relative; padding-left: 12mm; margin-bottom: 3.5mm; min-height: 8mm; break-inside: avoid; }
  ol.steps li::before { content: counter(s); position: absolute; left: 0; top: 0; width: 8mm; height: 8mm; border-radius: 50%; background: #1d4ed8; color: #fff; font-size: 12pt; font-weight: 700; display: flex; align-items: center; justify-content: center; }
  ol.steps li b { display: block; font-size: 13pt; }
  .tip { background: #fff7e6; border-left: 4px solid #f59e0b; border-radius: 2mm; padding: 3.5mm 4.5mm; margin: 0 0 4mm; break-inside: avoid; }
  .faq { margin: 0 0 4mm; }
  .faq h4 { margin-top: 2mm; }
  .faq p { margin: 0 0 2mm; }
  .video { font-size: 11.5pt; color: #374151; }
  table.videos { width: 100%; border-collapse: collapse; font-size: 11.5pt; }
  table.videos th, table.videos td { text-align: left; padding: 2.5mm 2mm; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
  table.videos th { color: #4b5563; font-weight: 600; }
  table.videos tr { break-inside: avoid; }
  .help { background: #f3f6fb; border-radius: 4mm; padding: 7mm; break-inside: avoid; font-size: 13.5pt; }
  .help p { margin: 0 0 2.5mm; }
</style></head>
<body>
  <section class="cover">
    <div>
      <img class="logo" src="${img('/images/logo.png')}" alt="Loka Kasir">
    </div>
    <div>
      <h1>Panduan Pengguna<br>Loka Kasir</h1>
      <p class="sub">Cara pakai aplikasi kasir Loka langkah demi langkah — dari login dan buka kasir, melayani pembeli, sampai pengaturan, laporan, dan fitur untuk pemilik toko.</p>
      <img class="hero" src="${img('/images/site/app-transaksi.webp')}" alt="">
    </div>
    <p class="meta">Diperbarui ${esc(updated)} · ${esc(siteHost)} · Versi terbaru panduan ini selalu ada di ${esc(panduanUrl)}</p>
  </section>

  ${toc}

  ${babs.map(b => `
  <section class="chapter">
    ${b.entries.map(e => e.html).join('')}
  </section>`).join('')}

  ${videoOnly.length ? `
  <section class="chapter" id="video">
    <header class="bab-head"><h2>Video panduan lainnya</h2><p class="intro">Panduan berikut tersedia dalam bentuk video. Ketuk tautannya untuk menonton.</p></header>
    <table class="videos">
      <tr><th>Topik</th><th>Isi</th><th>Video</th></tr>
      ${videoOnly.map(v => `<tr><td><b>${esc(v.title)}</b><br><span style="color:#4b5563">${esc(v.group)}</span></td><td>${esc(v.desc)}</td><td><a href="https://youtu.be/${v.youtubeId}">youtu.be/${v.youtubeId}</a></td></tr>`).join('')}
    </table>
  </section>` : ''}

  <section id="bantuan" style="margin-top: 10mm">
    <div class="help">
      <h2>Butuh bantuan?</h2>
      <p>Tim Loka Kasir siap membantu, termasuk untuk setup awal.</p>
      <p><b>WhatsApp:</b> <a href="${links.whatsapp('Halo tim Loka, saya butuh bantuan memakai Loka Kasir.')}">${esc(WHATSAPP_DISPLAY)}</a></p>
      <p><b>Email:</b> <a href="mailto:${SUPPORT_EMAIL}">${esc(SUPPORT_EMAIL)}</a></p>
      <p><b>Panduan & video terbaru:</b> <a href="${siteDetails.siteUrl}${links.panduan.startsWith('http') ? '' : links.panduan}">${esc(siteHost)}/panduan</a></p>
    </div>
  </section>
</body></html>`;
}

// ── Nomor halaman daftar isi ────────────────────────────────────────────────
//
// Chrome tidak mendukung target-counter(), jadi nomor halaman diambil dari PDF
// itu sendiri: setiap tautan #id di daftar isi menjadi named destination
// (/Dests) yang menunjuk objek halamannya. Cetak sekali tanpa nomor, baca
// halamannya, lalu cetak lagi dengan nomor. Kolom nomor lebarnya tetap, jadi
// mengisinya tidak menggeser tata letak; tetap diperiksa ulang sampai stabil.
function readPages(pdf: Buffer): Pages {
  const s = pdf.toString('latin1');
  const obj = (n: number) => {
    const at = s.search(new RegExp(`(?:^|[\\r\\n])${n} 0 obj\\b`));
    if (at < 0) return '';
    const end = s.indexOf('endobj', at);
    return s.slice(at, end < 0 ? undefined : end);
  };
  const ref = (body: string, key: string) => Number(new RegExp(`/${key}\\s+(\\d+) 0 R`).exec(body)?.[1] ?? NaN);
  const catalog = obj(Number(/(\d+) 0 obj\s*<<\s*\/Type\s*\/Catalog/.exec(s)?.[1] ?? NaN)) || (s.match(/<<[^>]*\/Type\s*\/Catalog[\s\S]*?>>/)?.[0] ?? '');
  const order: number[] = [];
  const walk = (n: number) => {
    const body = obj(n);
    if (/\/Type\s*\/Pages\b/.test(body)) {
      const kids = /\/Kids\s*\[([^\]]*)\]/.exec(body)?.[1] ?? '';
      for (const m of kids.matchAll(/(\d+) 0 R/g)) walk(Number(m[1]));
    } else order.push(n);
  };
  walk(ref(catalog, 'Pages'));
  const index = new Map(order.map((n, i) => [n, i + 1]));
  const pages: Pages = new Map();
  const dests = obj(ref(catalog, 'Dests'));
  for (const m of dests.matchAll(/\/([^\s[\]/<>()]+)\s*\[\s*(\d+) 0 R/g)) {
    const name = m[1].replace(/#([0-9a-fA-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
    const page = index.get(Number(m[2]));
    if (page) pages.set(name, page);
  }
  return pages;
}

const chrome =
  process.env.CHROME_PATH ??
  ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(p => existsSync(p));
if (!chrome) {
  console.error('❌ Chrome tidak ditemukan. Setel CHROME_PATH ke Chrome/Chromium.');
  process.exit(1);
}

const work = join(tmpdir(), `panduan-pdf-${process.pid}`);
mkdirSync(work, { recursive: true });
mkdirSync(dirname(outFile), { recursive: true });
const htmlFile = join(work, 'panduan.html');
const render = (pages: Pages) => {
  writeFileSync(htmlFile, buildHtml(pages));
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--generate-pdf-document-outline',
    '--allow-file-access-from-files',
    `--user-data-dir=${join(work, 'profile')}`,
    `--print-to-pdf=${outFile}`,
    pathToFileURL(htmlFile).href,
  ], { stdio: 'pipe' });
  return readPages(readFileSync(outFile));
};
const same = (a: Pages, b: Pages) => a.size === b.size && [...a].every(([k, v]) => b.get(k) === v);
let pages: Pages = new Map();
try {
  for (let pass = 1; pass <= 4; pass++) {
    const found = render(pages);
    if (same(found, pages)) break;
    if (pass === 4) throw new Error('Nomor halaman daftar isi tidak stabil setelah 4 kali cetak.');
    pages = found;
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
const missing = [...entryById.keys()].filter(id => !pages.has(id));
if (missing.length) {
  console.error(`❌ Halaman tidak ditemukan untuk: ${missing.join(', ')}`);
  process.exit(1);
}

const featureCount = features.groups.reduce((n, g) => n + g.guides.length, 0);
const lastPage = Math.max(...pages.values());
console.log(`✅ ${outFile.replace(root + '/', '')} — ${babs.length} bab, ${written.reduce((n, g) => n + g.guides.length, 0)} panduan dasar, ${featureCount} panduan fitur, ${videoOnly.length} video, ±${lastPage} halaman`);
