import { pick, type Locale } from '@/data/localized';
import { SUPPORT_EMAIL, WHATSAPP_DISPLAY } from '@/data/site/links';

/**
 * Syarat & Ketentuan Loka Kasir.
 *
 * DRAF: teksnya sudah final dari sisi produk, tapi belum ditinjau orang yang
 * paham hukum. Banner peringatan di halaman sengaja dibiarkan sampai itu terjadi
 * (`isDraft`).
 */
export type TermsSection = { id: string; title: string } & ({ kind: 'p'; body: string } | { kind: 'list'; items: string[] });

const id = {
  metaTitle: 'Syarat & Ketentuan',
  metaDescription: 'Syarat dan ketentuan penggunaan aplikasi kasir Loka Kasir, Web Admin, dan layanan terkait.',
  crumbHome: 'Beranda',
  title: 'Syarat & Ketentuan',
  effective: 'Berlaku sejak 1 November 2026',
  isDraft: true,
  draftNote: 'Draf: sebaiknya dicek oleh orang yang paham hukum sebelum dipublikasikan.',
  tocLabel: 'Daftar isi',
  sections: [
    { id: 'penerimaan', title: 'Penerimaan syarat', kind: 'p', body: 'Layanan Loka Kasir (aplikasi kasir, Web Admin, dan layanan terkait) disediakan oleh Kreativita Sinergi, usaha perorangan yang berdomisili di Pekanbaru. Dengan mendaftar atau menggunakan Loka Kasir, Anda menyetujui syarat dan ketentuan ini. Jika Anda mendaftar atas nama usaha, Anda menyatakan berwenang mewakili usaha tersebut.' },
    { id: 'akun', title: 'Akun & keamanan', kind: 'list', items: ['Data pendaftaran harus benar dan diperbarui jika berubah.', 'Anda bertanggung jawab menjaga kerahasiaan kata sandi dan PIN karyawan.', 'Hak akses karyawan diatur oleh pemilik akun melalui Web Admin.'] },
    { id: 'paket', title: 'Paket, uji coba & pembayaran', kind: 'list', items: ['Uji coba 30 hari membuka semua fitur Pro dan dihitung sejak transaksi pertama.', 'Paket Gratis dapat dipakai tanpa batas waktu dengan batas 50 transaksi per bulan dan 1 outlet.', 'Paket Pro ditagih bulanan atau tahunan sesuai harga di halaman Harga. Harga sudah termasuk PPN. Outlet tambahan dikenakan biaya terpisah.', 'Perpanjangan dilakukan secara manual. Kami mengirim pengingat beberapa hari sebelum masa langganan habis.', 'Pembayaran untuk periode yang sudah berjalan tidak dapat dikembalikan. Anda dapat berhenti kapan saja dengan tidak memperpanjang langganan.', 'Jika paket Pro habis dan tidak diperpanjang, akun otomatis menjadi paket Gratis. Data tetap aman, hanya fitur Pro yang terkunci.'] },
    { id: 'larangan', title: 'Penggunaan yang dilarang', kind: 'p', body: 'Layanan tidak boleh digunakan untuk kegiatan yang melanggar hukum, mencoba mengakses data pengguna lain, atau mengganggu sistem Loka Kasir.' },
    { id: 'data', title: 'Data & privasi', kind: 'list', items: ['Pengelolaan data mengikuti Kebijakan Privasi Loka Kasir. Data usaha Anda tetap milik Anda dan tidak kami jual.', 'Pengguna paket Pro dapat mengekspor laporan ke CSV sebelum berhenti berlangganan atau menghapus akun.'] },
    { id: 'ketersediaan', title: 'Ketersediaan layanan', kind: 'p', body: 'Kami berupaya menjaga layanan tetap tersedia. Aplikasi kasir tetap bisa mencatat transaksi saat offline dan menyinkronkannya saat kembali online. Pembayaran non-tunai membutuhkan koneksi internet.' },
    { id: 'tanggung-jawab', title: 'Batas tanggung jawab', kind: 'p', body: 'Loka Kasir tidak bertanggung jawab atas kerugian yang timbul akibat kesalahan input data oleh pengguna, atau gangguan di luar kendali kami seperti listrik padam, gangguan internet, dan kerusakan perangkat.' },
    { id: 'penghentian', title: 'Penangguhan & penghentian', kind: 'list', items: ['Kami hanya menangguhkan akun yang melanggar hukum atau syarat ini, dengan pemberitahuan lebih dulu kecuali dalam keadaan darurat.', 'Anda dapat meminta penghapusan akun kapan saja melalui halaman Hapus Akun.'] },
    { id: 'perubahan', title: 'Perubahan syarat', kind: 'p', body: 'Syarat ini dapat diperbarui. Perubahan penting akan diberitahukan melalui aplikasi atau email sebelum berlaku.' },
    { id: 'hukum', title: 'Hukum & penyelesaian sengketa', kind: 'p', body: 'Syarat ini tunduk pada hukum Republik Indonesia. Setiap perselisihan akan diselesaikan lebih dulu secara musyawarah. Jika tidak tercapai kesepakatan, perselisihan diselesaikan melalui Pengadilan Negeri Pekanbaru.' },
    { id: 'kontak', title: 'Hubungi kami', kind: 'list', items: [`Email: ${SUPPORT_EMAIL}`, `WhatsApp: ${WHATSAPP_DISPLAY}`] },
  ] satisfies TermsSection[] as TermsSection[],
};

export const getSyaratCopy = (locale: Locale) => pick({ id }, locale);
