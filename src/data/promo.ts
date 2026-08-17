// Masa gratis: 30 hari pertama untuk setiap akun baru — akses penuh ke semua
// fitur Pro. Riwayatnya: 14 hari → 3 bulan (promo Juli 2026) → 30 hari.
//
// PENTING: 30 hari itu dihitung sejak TRANSAKSI PERTAMA, bukan sejak
// pendaftaran — lihat anchorTrialToFirstSale di loka-kasir-service. Jadi
// pemilik yang mendaftar dari browser lalu baru memasang aplikasinya seminggu
// kemudian tidak kehilangan apa pun, dan janji di halaman ini tetap benar.
//
// Ubah durasi di sini bila promo berubah; seluruh halaman mengambil datanya
// dari file ini. Backend: konstanta TrialDays di
// loka-kasir-service/service/registration_service.go harus ikut disesuaikan.
export const promoDetails = {
  heading: "Gratis 30 Hari Pertama",
  // Kalimat pendek untuk badge/keterangan di bawah tombol.
  short: "Gratis 30 hari pertama",
  duration: "30 hari",
  description:
    "Setiap akun baru mendapat 30 hari pertama gratis dengan akses penuh ke semua fitur Pro — termasuk multi-outlet sampai 5 cabang, tanpa kartu kredit, tanpa komitmen. Setelah masa itu, lanjutkan dengan paket mulai Rp 39.000/bulan.",
};
