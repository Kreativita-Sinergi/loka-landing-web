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
  }
];

export const findGuide = (slug: string) => guides.find(guide => guide.slug === slug);
