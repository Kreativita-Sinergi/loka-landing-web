import { pick, type Locale } from '@/data/localized';
import { androidDirectDownload, windowsDirectDownload } from '@/data/cta';

/**
 * Konten yang dipakai di lebih dari satu halaman: kategori fitur, paket harga,
 * pilihan unduhan, dan testimoni.
 */

export type FeatureCategory = {
  key: string;
  icon: 'cart' | 'utensils' | 'package' | 'users' | 'heart' | 'chart';
  title: string;
  desc: string;
  image: string;
  imageAlt: string;
  items: { label: string; pro?: boolean }[];
};

const categories: FeatureCategory[] = [
  { key: 'penjualan', icon: 'cart', title: 'Penjualan & Kasir', desc: 'Layani pembeli dengan cepat. Produk tampil rapi, pembayaran fleksibel, struk langsung tercetak.', image: '/images/site/app-transaksi.webp', imageAlt: 'Layar transaksi Loka Kasir', items: [{ label: 'Grid atau daftar produk' }, { label: 'Dine-in, takeaway & delivery' }, { label: 'Tunai, QRIS, kartu & transfer' }, { label: 'Diskon, refund & void', pro: true }, { label: 'Struk thermal Bluetooth/USB', pro: true }, { label: 'Mode offline, sinkron saat online' }] },
  { key: 'resto', icon: 'utensils', title: 'Resto, Kafe & QR Order', desc: 'Pesanan dari meja langsung masuk ke dapur. Kasir, pelayan, dan koki melihat status yang sama.', image: '/images/site/app-dapur.webp', imageAlt: 'Layar pesanan berjalan dengan status dapur', items: [{ label: 'QR menu per meja', pro: true }, { label: 'Pelanggan pesan dari HP', pro: true }, { label: 'Denah & status meja', pro: true }, { label: 'Kitchen Display System', pro: true }, { label: 'Varian, add-on, pajak & service' }] },
  { key: 'stok', icon: 'package', title: 'Stok, HPP & Pembelian', desc: 'Stok berkurang sendiri setiap ada penjualan. Tahu modal per produk dan harga jual yang masuk akal.', image: '/images/site/app-produk.webp', imageAlt: 'Layar produk dan stok', items: [{ label: 'Stok per outlet & peringatan menipis' }, { label: 'Transfer & riwayat stok', pro: true }, { label: 'Bahan baku, resep & waste', pro: true }, { label: 'Supplier & purchase order', pro: true }, { label: 'HPP, profit produk & saran harga', pro: true }] },
  { key: 'karyawan', icon: 'users', title: 'Karyawan & Operasional', desc: 'Setiap kasir punya PIN sendiri. Buka dan tutup shift tercatat, selisih kas kelihatan.', image: '/images/site/app-tutupkasir.webp', imageAlt: 'Layar tutup kasir', items: [{ label: 'Buka/tutup shift & selisih kas' }, { label: 'PIN kasir & supervisor' }, { label: 'Absensi clock-in/clock-out', pro: true }, { label: 'Role, izin & audit log' }, { label: 'Kasbon karyawan', pro: true }] },
  { key: 'pelanggan', icon: 'heart', title: 'Pelanggan & Loyalitas', desc: 'Kenali pelanggan tetap, beri poin, dan catat kasbon tanpa buku terpisah.', image: '/images/site/app-riwayat.webp', imageAlt: 'Layar riwayat penjualan', items: [{ label: 'Database & riwayat belanja', pro: true }, { label: 'Membership pelanggan' }, { label: 'Poin loyalitas', pro: true }, { label: 'Kasbon/piutang pelanggan', pro: true }, { label: 'Promo konsisten di kasir', pro: true }] },
  { key: 'laporan', icon: 'chart', title: 'Laporan & Kendali Pemilik', desc: 'Pantau semua outlet dari Web Admin. Lihat jam ramai, produk terlaris, dan laba bersih.', image: '/images/site/app-jamramai.webp', imageAlt: 'Layar analisis jam ramai', items: [{ label: 'Dashboard penjualan real-time' }, { label: 'Laporan penjualan & keuangan', pro: true }, { label: 'Analisis produk & jam ramai', pro: true }, { label: 'Multi-outlet & terminal', pro: true }, { label: 'Ekspor laporan ke CSV', pro: true }] },
];

export const getFeatureCategories = (locale: Locale) => pick({ id: categories }, locale);

export const plans = {
  free: { name: 'Gratis', note: 'Untuk usaha yang baru mulai.', cta: 'Mulai Gratis', items: ['50 transaksi per bulan', '1 outlet', 'Produk & cetak struk', 'Laporan dasar & mode offline'] },
  pro: { name: 'Pro', badge: 'Gratis 30 hari', note: 'Outlet pertama termasuk.', cta: 'Coba Gratis 30 Hari', items: ['Transaksi tanpa batas', 'Stok, HPP & laporan lengkap', 'Karyawan, meja & QR order', 'Absensi & multi-role', 'Bantuan teknis prioritas'] },
  fineprint: 'Harga sudah termasuk PPN. Outlet tambahan Rp49.000/outlet/bulan. Bayar lewat transfer bank atau dompet digital.',
  monthly: 'Bulanan',
  yearly: 'Tahunan',
  yearlySave: 'Hemat 2 bulan',
  perMonth: '/ bulan',
  perYear: '/ tahun',
};

export type DownloadOption = {
  key: 'play' | 'windows' | 'apk';
  title: string;
  desc: string;
  specs: string[];
  cta: string;
  primary?: boolean;
};

export function getDownloadOptions(): DownloadOption[] {
  return [
    { key: 'play', title: 'Google Play', desc: 'Untuk HP dan tablet Android. Update otomatis lewat Play Store.', specs: ['Android 8 ke atas', 'RAM 3GB atau lebih disarankan'], cta: 'Download di Google Play', primary: true },
    { key: 'windows', title: 'Windows', desc: 'Untuk PC atau laptop kasir. Ringan, jalan di komputer lama sekalipun.', specs: ['Windows 10 (1809) atau 11', windowsDirectDownload ? `Ukuran unduhan ${windowsDirectDownload.size}` : 'Tersedia di Microsoft Store'], cta: 'Download untuk Windows' },
    { key: 'apk', title: 'File APK', desc: 'Untuk perangkat Android tanpa Play Store, seperti mesin POS.', specs: [androidDirectDownload ? `Android ${androidDirectDownload.minAndroid} ke atas` : 'Pasang manual dari file APK', 'Izinkan instalasi dari sumber lain'], cta: 'Download APK' },
  ];
}

/**
 * Testimoni pelanggan asli (dikumpulkan tim Loka, kalimat dirapikan tanpa
 * mengubah isi). Kartu tanpa `logo` menampilkan inisial nama.
 *
 * `TESTIMONIALS_ARE_DUMMY = true` menyembunyikan section ini di production;
 * pakai lagi bila sewaktu-waktu isinya diganti data contoh.
 */
export const TESTIMONIALS_ARE_DUMMY = false;
export const testimonials: { quote: string; name: string; business: string; logo?: string }[] = [
  { quote: 'Pencatatan jual beli jadi jauh lebih mudah. Sekarang saya lebih sadar soal untung dan rugi usaha.', name: 'Lina', business: 'Kedai Lina' },
  { quote: 'Pelanggan yang servis sekarang tercatat rapi, dan cek stok tidak lagi repot.', name: 'Linda', business: 'Bengkel Mobil Atom', logo: '/images/site/pelanggan/atom-auto-car.webp' },
  { quote: 'Pesanan dari kasir langsung masuk ke dapur. Tidak perlu lagi bolak-balik mengantar catatan pesanan untuk dimasak.', name: 'Ara', business: 'Red Projects', logo: '/images/site/pelanggan/redprojects.webp' },
];
