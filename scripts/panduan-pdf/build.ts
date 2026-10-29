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

function guideHtml(g: Guide) {
  const answers = (g.faq ?? []).map(q => faqs.find(f => f.question === q)).filter(Boolean) as { question: string; answer: string }[];
  return `
  <article class="guide" id="${g.slug}">
    <h3>${esc(g.title)}</h3>
    <p class="lead">${esc(g.intro ?? g.desc)}</p>
    ${g.image ? `<figure><img src="${img(g.image.src)}" alt="${esc(g.image.alt)}"></figure>` : ''}
    ${g.steps ? `<ol class="steps">${g.steps.map(s => `<li><b>${esc(s.title)}</b><span>${esc(s.body)}</span></li>`).join('')}</ol>` : ''}
    ${g.tip ? `<p class="tip"><b>Tips:</b> ${esc(g.tip)}</p>` : ''}
    ${answers.map(a => `<section class="faq"><h4>${esc(a.question)}</h4><p>${paras(a.answer)}</p></section>`).join('')}
    ${g.youtubeId ? `<p class="video">Tonton videonya: <a href="https://youtu.be/${g.youtubeId}">youtu.be/${g.youtubeId}</a></p>` : ''}
  </article>`;
}

function featureHtml(f: FeatureGuide) {
  return `
  <article class="guide feature" id="fitur-${slugify(f.title)}">
    <h3>${esc(f.title)}</h3>
    <ol class="steps">${f.steps.map(s => `<li><span>${esc(s)}</span></li>`).join('')}</ol>
  </article>`;
}

const toc = `
  <nav class="toc">
    <h2>Daftar isi</h2>
    <h4>Bagian 1 · Dasar-dasar</h4>
    ${written.map(gr => `<p class="toc-group">${esc(gr.title)}</p><ul>${gr.guides.map(g => `<li><a href="#${g.slug}">${esc(g.title)}</a></li>`).join('')}</ul>`).join('')}
    <h4>Bagian 2 · Panduan fitur</h4>
    ${features.groups.map(gr => `<p class="toc-group">${esc(gr.group)}</p><ul>${gr.guides.map(f => `<li><a href="#fitur-${slugify(f.title)}">${esc(f.title)}</a></li>`).join('')}</ul>`).join('')}
    ${videoOnly.length ? `<h4><a href="#video">Video panduan lainnya</a></h4>` : ''}
    <h4><a href="#bantuan">Butuh bantuan?</a></h4>
  </nav>`;

const html = `<!doctype html>
<html lang="id"><head><meta charset="utf-8">
<title>Panduan Pengguna ${esc(siteDetails.siteName)}</title>
<style>
  @page { size: A4; margin: 18mm 16mm 20mm; @bottom-center { content: "Panduan Pengguna Loka Kasir · " counter(page); font: 9pt system-ui, sans-serif; color: #8a90a0; } }
  @page :first { @bottom-center { content: none; } }
  * { box-sizing: border-box; }
  body { font: 10.5pt/1.55 -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: #1f2430; margin: 0; }
  a { color: #1d4ed8; text-decoration: none; }
  h2 { font-size: 20pt; margin: 0 0 4mm; letter-spacing: -0.01em; }
  h3 { font-size: 14pt; margin: 0 0 2mm; }
  h4 { font-size: 11pt; margin: 4mm 0 1.5mm; }
  .cover { height: 255mm; display: flex; flex-direction: column; justify-content: space-between; page-break-after: always; }
  .cover img.logo { width: 52mm; }
  .cover h1 { font-size: 34pt; line-height: 1.1; margin: 0 0 5mm; letter-spacing: -0.02em; }
  .cover .sub { font-size: 13pt; color: #4b5263; max-width: 140mm; }
  .cover .hero { width: 100%; border-radius: 4mm; margin: 8mm 0; }
  .cover .meta { font-size: 10pt; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 4mm; }
  .toc { page-break-after: always; }
  .toc h4 { margin-top: 5mm; color: #1d4ed8; }
  .toc .toc-group { font-weight: 700; margin: 3mm 0 1mm; font-size: 10pt; }
  .toc ul { margin: 0; padding-left: 5mm; columns: 2; column-gap: 8mm; font-size: 9.5pt; }
  .toc li { break-inside: avoid; margin-bottom: 0.6mm; }
  .toc a { color: #1f2430; }
  .part { page-break-before: always; }
  .part > h2 { color: #1d4ed8; }
  .part > p.intro { color: #4b5263; margin-top: 0; }
  .group-title { font-size: 9pt; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; margin: 8mm 0 3mm; border-bottom: 1px solid #e5e7eb; padding-bottom: 1.5mm; }
  .guide { margin: 0 0 7mm; }
  .guide .lead { color: #4b5263; margin: 0 0 3mm; }
  .guide figure { margin: 0 0 4mm; break-inside: avoid; }
  .guide figure img { width: 100%; max-height: 95mm; object-fit: contain; object-position: left top; border-radius: 2.5mm; border: 1px solid #e5e7eb; }
  ol.steps { list-style: none; counter-reset: s; padding: 0; margin: 0 0 3mm; }
  ol.steps li { counter-increment: s; position: relative; padding-left: 9mm; margin-bottom: 2.6mm; break-inside: avoid; }
  ol.steps li::before { content: counter(s); position: absolute; left: 0; top: 0.2mm; width: 6mm; height: 6mm; border-radius: 50%; background: #1f2430; color: #fff; font-size: 8.5pt; font-weight: 700; display: flex; align-items: center; justify-content: center; }
  ol.steps li b { display: block; }
  .feature ol.steps li::before { background: #1d4ed8; }
  .tip { background: #fff7e6; border-radius: 2mm; padding: 3mm 4mm; margin: 0 0 3mm; break-inside: avoid; }
  .faq { margin: 0 0 3mm; }
  .faq h4 { margin-top: 2mm; }
  .faq p { margin: 0 0 2mm; }
  .video { font-size: 9.5pt; color: #4b5263; }
  .feature { break-inside: avoid; }
  table.videos { width: 100%; border-collapse: collapse; font-size: 9.5pt; }
  table.videos th, table.videos td { text-align: left; padding: 2mm 2mm; border-bottom: 1px solid #eef0f4; vertical-align: top; }
  table.videos th { color: #6b7280; font-weight: 600; }
  table.videos tr { break-inside: avoid; }
  .help { background: #f3f6fb; border-radius: 4mm; padding: 7mm; break-inside: avoid; }
  .help p { margin: 0 0 2mm; }
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
    <p class="meta">Diperbarui ${esc(updated)} · ${esc(siteDetails.siteUrl.replace('https://', ''))} · Versi terbaru panduan ini selalu ada di ${esc(links.panduan.startsWith('http') ? links.panduan : siteDetails.siteUrl.replace('https://', '') + links.panduan)}</p>
  </section>

  ${toc}

  <section class="part">
    <h2>Bagian 1 · Dasar-dasar</h2>
    <p class="intro">Mulai dari lima langkah harian kasir — login sampai tutup shift — lalu pengaturan dan hal-hal yang paling sering ditanyakan pemilik.</p>
    ${written.map(gr => `<p class="group-title">${esc(gr.title)}</p>${gr.guides.map(guideHtml).join('')}`).join('')}
  </section>

  <section class="part">
    <h2>Bagian 2 · Panduan fitur</h2>
    <p class="intro">Langkah singkat untuk fitur-fitur aplikasi, dikelompokkan per kebutuhan. Nama menu ditulis persis seperti di aplikasi; tanda › berarti "lalu buka".</p>
    ${features.groups.map(gr => `<p class="group-title">${esc(gr.group)}</p>${gr.guides.map(featureHtml).join('')}`).join('')}
  </section>

  ${videoOnly.length ? `
  <section class="part" id="video">
    <h2>Video panduan lainnya</h2>
    <p class="intro">Panduan berikut tersedia dalam bentuk video. Ketuk tautannya untuk menonton.</p>
    <table class="videos">
      <tr><th>Topik</th><th>Isi</th><th>Video</th></tr>
      ${videoOnly.map(v => `<tr><td><b>${esc(v.title)}</b><br><span style="color:#6b7280">${esc(v.group)}</span></td><td>${esc(v.desc)}</td><td><a href="https://youtu.be/${v.youtubeId}">youtu.be/${v.youtubeId}</a></td></tr>`).join('')}
    </table>
  </section>` : ''}

  <section id="bantuan" style="margin-top: 10mm">
    <div class="help">
      <h2>Butuh bantuan?</h2>
      <p>Tim Loka Kasir siap membantu, termasuk untuk setup awal.</p>
      <p><b>WhatsApp:</b> <a href="${links.whatsapp('Halo tim Loka, saya butuh bantuan memakai Loka Kasir.')}">${esc(WHATSAPP_DISPLAY)}</a></p>
      <p><b>Email:</b> <a href="mailto:${SUPPORT_EMAIL}">${esc(SUPPORT_EMAIL)}</a></p>
      <p><b>Panduan & video terbaru:</b> <a href="${siteDetails.siteUrl}${links.panduan.startsWith('http') ? '' : links.panduan}">${esc(siteDetails.siteUrl.replace('https://', ''))}/panduan</a></p>
    </div>
  </section>
</body></html>`;

const chrome =
  process.env.CHROME_PATH ??
  ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(p => existsSync(p));
if (!chrome) {
  console.error('❌ Chrome tidak ditemukan. Setel CHROME_PATH ke Chrome/Chromium.');
  process.exit(1);
}

const work = join(tmpdir(), `panduan-pdf-${process.pid}`);
mkdirSync(work, { recursive: true });
const htmlFile = join(work, 'panduan.html');
writeFileSync(htmlFile, html);
mkdirSync(dirname(outFile), { recursive: true });
try {
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--allow-file-access-from-files',
    `--user-data-dir=${join(work, 'profile')}`,
    `--print-to-pdf=${outFile}`,
    pathToFileURL(htmlFile).href,
  ], { stdio: 'pipe' });
} finally {
  rmSync(work, { recursive: true, force: true });
}

const featureCount = features.groups.reduce((n, g) => n + g.guides.length, 0);
console.log(`✅ ${outFile.replace(root + '/', '')} — ${written.reduce((n, g) => n + g.guides.length, 0)} panduan dasar, ${featureCount} panduan fitur, ${videoOnly.length} video`);
