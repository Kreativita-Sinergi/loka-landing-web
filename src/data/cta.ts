export const ctaDetails = {
  heading: "Gratis 30 Hari Pertama — Tanpa Risiko",
  subheading:
    "Daftar gratis langsung dari browser ini, atau dari aplikasinya — akunnya sama. Pakai semua fitur Pro selama 30 hari pertama tanpa kartu kredit dan tanpa komitmen. Setelah itu, lanjutkan dengan paket mulai Rp 39.000/bulan.",
  dashboardUrl: "https://app.lokakasir.id",
};

// Pendaftaran akun Owner. Sejak Web Admin punya halaman /register sendiri,
// mendaftar TIDAK lagi harus lewat aplikasi — pemilik yang menemukan situs ini
// dari laptop bisa langsung membuat akun tanpa menyentuh HP.
//
// Semua ajakan "Daftar" di situs ini harus memakai URL ini, bukan link toko
// aplikasi seperti sebelumnya.
export const signUpDetails = {
  url: "https://app.lokakasir.id/register",
  label: "Daftar Gratis",
  note: "Gratis 30 hari pertama · Tanpa kartu kredit · Bisa daftar dari browser atau aplikasi",
};

export const supportDetails = {
  heading: "Ada kendala atau masukan?",
  message:
    "Jangan sungkan menghubungi admin kami. Setiap pertanyaan, kendala, maupun saran perbaikan sangat kami hargai — Loka Kasir terus kami kembangkan bersama Anda.",
  email: "help@lokakasir.id",
  // Nomor WhatsApp admin (format internasional tanpa "+").
  whatsapp: "6283878960539",
  whatsappMessage:
    "Halo Admin Loka Kasir, saya ingin bertanya/menyampaikan masukan terkait aplikasi.",
  // Username Instagram admin (untuk deep-link DM via ig.me/m/).
  instagram: "lokakasir.id",
};

// Link unduh aplikasi. Aplikasi sudah rilis di Google Play Store — pengguna
// memasang langsung dari Play Store, tidak perlu lagi unduh APK manual.
export const appDownloadDetails = {
  url: "https://play.google.com/store/apps/details?id=id.lokakasir.app",
  label: "Download di Google Play",
  // Catatan singkat yang ditampilkan di dekat tombol unduh.
  note: "Android & Windows · Gratis 30 hari pertama · Login dengan akun yang sama",
};

// Versi desktop Loka Kasir untuk PC/laptop Windows, dirilis lewat Microsoft
// Store sehingga pemasangan dan pembaruannya ditangani Store (tanpa installer
// manual). Dipakai berdampingan dengan appDownloadDetails (Android).
export const windowsDownloadDetails = {
  url: "https://apps.microsoft.com/detail/9mxbj5l6rdp8",
  label: "Download di Microsoft Store",
  shortLabel: "Pakai PC/laptop Windows? Download di Microsoft Store",
  note: "Windows 10/11 · Unduhan ±30 MB · Dipasang otomatis lewat Microsoft Store",
  // Perintah winget — alternatif tanpa membuka Store, berguna untuk pemasangan
  // massal di banyak PC toko. Store ID sama dengan yang ada di `url`.
  // `--source msstore` + `--id` dipakai eksplisit: tanpa itu winget
  // memperlakukan argumen sebagai kata kunci pencarian dan bisa tidak menemukan
  // paketnya. Perlu dicoba sekali di mesin Windows sebelum dipromosikan luas.
  wingetCommand: "winget install --id 9MXBJ5L6RDP8 --source msstore",
};

// Unduhan file langsung (di luar Microsoft Store) untuk PC yang Store-nya
// diblokir/dimatikan admin. Biarkan `null` selama filenya belum di-host —
// halaman /download/windows otomatis menyembunyikan bagian ini saat null.
//
// Saat sudah siap, isi seperti:
//   { url: "https://dl.lokakasir.id/windows/LokaKasir-Setup-1.5.0.exe",
//     fileLabel: "Installer (.exe)", size: "58 MB", version: "1.5.0" }
export const windowsDirectDownload: {
  url: string;
  fileLabel: string;
  size: string;
  version: string;
} | null = null;

// Detail untuk menghubungi tim Loka Kasir (bantuan pemasangan, pertanyaan, dll).
// Bukan lagi jalur utama untuk mendapatkan aplikasi — pakai appDownloadDetails.
export const appRequestDetails = {
  whatsapp: "6283878960539",
  whatsappMessage:
    "Halo tim Loka Kasir, saya butuh bantuan terkait aplikasi Loka Kasir.",
  instagram: "lokakasir.id",
};

// WhatsApp bantuan bila pengguna tersendat saat mendaftar atau memasang
// aplikasi. Bukan jalur pendaftaran — daftar sendiri lewat signUpDetails.
export const registerDetails = {
  whatsapp: "6283878960539",
  whatsappMessage:
    "Halo tim Loka Kasir, saya butuh bantuan untuk pendaftaran akun / pemasangan aplikasi.",
};
