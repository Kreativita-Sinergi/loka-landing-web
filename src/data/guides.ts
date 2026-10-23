export interface Guide {
  slug: string;
  title: string;
  description: string;
  tablet: string;
  phone: string;
}

// Rekaman aplikasi versi 1.36, menggunakan bisnis demo.
export const guides: Guide[] = [
  {
    "slug": "login",
    "title": "Login ke Aplikasi",
    "description": "Masuk ke akun dan pilih outlet.",
    "tablet": "BZj3K7fIy5E",
    "phone": "7uYrwgTwtkA"
  },
  {
    "slug": "buka-kasir",
    "title": "Buka Kasir & Mulai Shift",
    "description": "Pilih terminal dan kasir, lalu isi modal awal.",
    "tablet": "JBN54tXnOFs",
    "phone": "MYWtM8gU9Zo"
  },
  {
    "slug": "transaksi",
    "title": "Melayani Transaksi",
    "description": "Pilih produk dan selesaikan pembayaran.",
    "tablet": "LZ9lr9pqqCo",
    "phone": "Qk5hpG4X82o"
  },
  {
    "slug": "riwayat-struk",
    "title": "Riwayat & Struk",
    "description": "Temukan transaksi dan kirim atau cetak struk.",
    "tablet": "GuWLmo5TsYg",
    "phone": "AEDFtix5riU"
  },
  {
    "slug": "tutup-shift",
    "title": "Tutup Shift",
    "description": "Hitung kas fisik dan konfirmasi penutupan kasir.",
    "tablet": "kPByiIf-Yho",
    "phone": "mtfyXlD2l7M"
  },
  {
    "slug": "tambah-produk",
    "title": "Tambah Produk",
    "description": "Isi nama produk, tentukan harga, dan simpan.",
    "tablet": "oVPG2lSlOHw",
    "phone": "wB6ZyvyWQq8"
  },
  {
    "slug": "barang-titipan",
    "title": "Tambah Barang Titipan",
    "description": "Pilih penitip dan isi harga jual serta harga setor.",
    "tablet": "ae6lTSCxF14",
    "phone": "mM9VzyvecNE"
  },
  {
    "slug": "pesanan-berjalan",
    "title": "Kelola Pesanan Berjalan",
    "description": "Simpan keranjang, lanjutkan pesanan, dan tagih pelanggan.",
    "tablet": "nKoAuKY7lSU",
    "phone": "9mSh7WqcWQk"
  },
  {
    "slug": "pesanan-meja",
    "title": "Pesanan Meja",
    "description": "Pilih meja, simpan pesanan, pantau, dan tagih.",
    "tablet": "cWVppcms280",
    "phone": "PANc0c5j1XY"
  },
  {
    "slug": "pisah-struk",
    "title": "Pisah Struk & Bayar Terpisah",
    "description": "Pisahkan item per tamu dan bayar bagian pesanan.",
    "tablet": "3xxtjV3fu8E",
    "phone": "gCYpkZJ8kfA"
  },
  {
    "slug": "karyawan-pin",
    "title": "Tambah Pegawai, PIN, dan Hak Akses",
    "description": "Tambah pegawai, buat PIN, dan atur hak aksesnya.",
    "tablet": "jEgB38YzExk",
    "phone": "lpB-C9RiK1o"
  },
  {
    "slug": "printer-thermal",
    "title": "Mengatur Printer Kasir dan Dapur",
    "description": "Hubungkan printer kasir dan printer dapur.",
    "tablet": "a1YxgOJdgK8",
    "phone": "UsFD_Ursi_Q"
  },
  {
    "slug": "meja-layar-dapur",
    "title": "Mengelola Pesanan Dapur",
    "description": "Pantau dan selesaikan pesanan di layar dapur.",
    "tablet": "0HUXiOBZ8GM",
    "phone": "tgfbai9zXk8"
  },
  {
    "slug": "bahan-baku-stok-masuk",
    "title": "Bahan Baku & Stok Masuk",
    "description": "Catat bahan baku dan stok yang masuk.",
    "tablet": "w5SBQlfoPag",
    "phone": "ydI0y02QQuQ"
  },
  {
    "slug": "paket-resep",
    "title": "Paket Produk dengan Resep Bahan Baku",
    "description": "Buat paket produk dan hubungkan dengan resep bahan baku.",
    "tablet": "rGokHC4EaXA",
    "phone": "4rkYlm1XJ2c"
  },
  {
    "slug": "harga-modal",
    "title": "Mengisi Harga Modal Produk",
    "description": "Isi harga modal supaya laba terhitung.",
    "tablet": "gja3Bv2vamQ",
    "phone": "b478bCyYXsk"
  },
  {
    "slug": "stok-opname",
    "title": "Menghitung dan Posting Stok Opname",
    "description": "Hitung stok fisik lalu posting hasil stok opname.",
    "tablet": "Qn9vkW-uG3o",
    "phone": "14lZc-MDewo"
  },
  {
    "slug": "impor-produk-csv",
    "title": "Impor Banyak Produk dari CSV",
    "description": "Masukkan banyak produk sekaligus dari file CSV.",
    "tablet": "BEUnqw7JGPU",
    "phone": "PsShxmJr9A8"
  },
  {
    "slug": "retur-titipan",
    "title": "Retur Barang Titipan",
    "description": "Kembalikan barang titipan kepada penitip.",
    "tablet": "r5GaF1B0-u8",
    "phone": "GUizrJBGiZc"
  },
  {
    "slug": "setoran-penitip",
    "title": "Setoran Penjualan kepada Penitip",
    "description": "Setorkan hasil penjualan barang titipan kepada penitip.",
    "tablet": "rAIz0VlNHkM",
    "phone": "YPz_nDlIe2E"
  },
  {
    "slug": "kasbon",
    "title": "Mencatat dan Melunasi Kasbon",
    "description": "Catat pembelian kasbon dan lunasi kemudian.",
    "tablet": "axtLHkG-cdM",
    "phone": "zbi2dmrIC1s"
  },
  {
    "slug": "pembatalan-refund",
    "title": "Pembatalan Transaksi dan Refund",
    "description": "Batalkan transaksi atau kembalikan pembayaran pelanggan.",
    "tablet": "S7f0IzZKM58",
    "phone": "2wxSBI3EvFk"
  },
  {
    "slug": "member-pelanggan",
    "title": "Menambahkan Member Pelanggan",
    "description": "Daftarkan pelanggan sebagai member.",
    "tablet": "vv3FT-heE3c",
    "phone": "VWZGafv4MHY"
  },
  {
    "slug": "diskon",
    "title": "Menambahkan Diskon",
    "description": "Buat diskon untuk produk atau transaksi.",
    "tablet": "jx5potuhyAU",
    "phone": "WXtEK6iam6s"
  },
  {
    "slug": "pajak",
    "title": "Menambahkan Pajak",
    "description": "Atur pajak yang dikenakan pada transaksi.",
    "tablet": "pu4Ta8kbEog",
    "phone": "uIfDpuzNiSw"
  },
  {
    "slug": "cetak-otomatis-laci",
    "title": "Mengatur Cetak Otomatis dan Laci Uang",
    "description": "Atur struk tercetak otomatis dan laci uang terbuka.",
    "tablet": "hEbWbtlrcH8",
    "phone": "xdwIgmIRZbo"
  },
  {
    "slug": "profil-fitur-toko",
    "title": "Mengatur Profil dan Fitur Toko",
    "description": "Lengkapi profil toko dan pilih fitur yang dipakai.",
    "tablet": "6VzBRmtWODY",
    "phone": "MAPtUUk-8h8"
  },
  {
    "slug": "pengaturan-transaksi",
    "title": "Mengatur Transaksi dan Pembayaran",
    "description": "Atur alur transaksi dan metode pembayaran.",
    "tablet": "y77kv4vByE0",
    "phone": "iPzYAe5ykFI"
  },
  {
    "slug": "tampilan-struk",
    "title": "Mengatur Tampilan Struk",
    "description": "Sesuaikan isi dan tampilan struk.",
    "tablet": "uqOXUc7dGEI",
    "phone": "LYxs0GeHuwo"
  },
  {
    "slug": "tampilkan-menu",
    "title": "Menampilkan dan Menyembunyikan Menu",
    "description": "Pilih menu yang tampil di aplikasi.",
    "tablet": "Xv2USQsTjls",
    "phone": "tdJqOhPK_v0"
  },
  {
    "slug": "absensi",
    "title": "Absensi Masuk & Pulang",
    "description": "Pegawai mencatat absensi masuk dan pulang.",
    "tablet": "jMUNmrezTTU",
    "phone": "c_bf_f-Vae0"
  },
  {
    "slug": "lokasi-absensi",
    "title": "Mengatur Lokasi Absensi",
    "description": "Tentukan lokasi tempat pegawai boleh absen.",
    "tablet": "fc11mXKy7aQ",
    "phone": "kr2uBPLBUM8"
  },
  {
    "slug": "jam-kerja-libur",
    "title": "Mengatur Jam Kerja dan Hari Libur",
    "description": "Atur jam kerja dan hari libur toko.",
    "tablet": "n--8ey2zLWc",
    "phone": "Ck8AQiVTCj0"
  },
  {
    "slug": "jadwal-shift",
    "title": "Membuat Jadwal Shift Pegawai",
    "description": "Susun jadwal shift untuk pegawai.",
    "tablet": "ESqMslbLuAA",
    "phone": "ZWfva7VdtRo"
  },
  {
    "slug": "gaji-absensi",
    "title": "Gaji Pegawai Sesuai Absensi",
    "description": "Periksa gaji dan slip berdasarkan absensi.",
    "tablet": "99dEpNGZx10",
    "phone": "0rLzH9cOgwo"
  },
  {
    "slug": "ringkasan-penjualan",
    "title": "Ringkasan dan Filter Penjualan",
    "description": "Lihat ringkasan penjualan dan saring datanya.",
    "tablet": "K65gu6Ve2s0",
    "phone": "GmAHFSLNs2o"
  },
  {
    "slug": "membership-loka",
    "title": "Membership Aplikasi Loka",
    "description": "Kelola membership aplikasi Loka.",
    "tablet": "axWKM4pAOwI",
    "phone": "tUfs86PCY9Y"
  },
  {
    "slug": "lupa-kata-sandi",
    "title": "Lupa Kata Sandi dan Pemulihan Akun",
    "description": "Atur ulang kata sandi dan pulihkan akun.",
    "tablet": "RC1EMRNt7cg",
    "phone": "126pA9xr-BY"
  },
  {
    "slug": "printer-tidak-mencetak",
    "title": "Memeriksa Printer yang Tidak Mencetak",
    "description": "Langkah memeriksa printer yang tidak mau mencetak.",
    "tablet": "ctn_vV-EDwk",
    "phone": "xTGsB5TXfxM"
  },
  {
    "slug": "transaksi-belum-sinkron",
    "title": "Memeriksa Transaksi yang Belum Tersinkron",
    "description": "Temukan transaksi yang belum tersinkron dan kirim ulang.",
    "tablet": "nhfKZynmPPM",
    "phone": "Sl6uMjp7-Zw"
  },
  {
    "slug": "absensi-ditolak-lokasi",
    "title": "Mengatasi Absensi Ditolak karena Lokasi",
    "description": "Atasi absensi yang ditolak karena di luar lokasi.",
    "tablet": "nRVKWsdLV5E",
    "phone": "5wpbxZmq6Wo"
  }
];

export const findGuide = (slug: string) => guides.find(guide => guide.slug === slug);
