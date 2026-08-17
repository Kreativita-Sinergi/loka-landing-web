// Isi bagian "Web Admin" — dipakai oleh komponen WebAdmin (section di beranda)
// dan halaman /web-admin.
//
// Daftar fitur di sini dipetakan langsung dari route yang benar-benar ada di
// loka-kasir-web (src/App.tsx), termasuk gerbang paketnya (PlanGate). Kalau ada
// route baru ditambahkan/dihapus di sana, perbarui juga daftar ini supaya
// halaman pemasaran tidak menjanjikan fitur yang tidak ada.

export type Plan = "semua" | "lite" | "pro";

export type WebAdminFeature = {
  name: string;
  desc: string;
  plan: Plan;
};

export type WebAdminGroup = {
  /** Nama ikon lucide-react, dipetakan di komponen. */
  icon: "chart" | "box" | "tag" | "users" | "heart" | "store";
  title: string;
  /** Masalah pemilik yang diselesaikan grup ini, bukan daftar fitur. */
  summary: string;
  features: WebAdminFeature[];
};

export const webAdminDetails = {
  eyebrow: "Web Admin",
  title: "Pusat kendali pemilik, bukan sekadar tempat lihat laporan",
  description:
    "Kasir memakai aplikasi di toko. Anda sebagai pemilik memegang Web Admin di browser — dari laptop, PC, maupun tablet, tanpa perlu pasang apa pun. Semua yang diatur di sini langsung berlaku di semua terminal kasir Anda.",
  url: "https://app.lokakasir.id",
  // Ditegaskan karena banyak calon pengguna mengira Web Admin dijual terpisah.
  includedNote:
    "Web Admin sudah termasuk di semua paket, termasuk masa gratis 30 hari. Akunnya sama dengan yang dipakai di aplikasi.",
};

// Tangkapan layar Web Admin. Selama array ini kosong, galerinya tidak dirender
// sama sekali — jadi halaman tidak pernah menampilkan bingkai gambar kosong.
//
// Cara menambah: simpan file ke `public/images/web-admin/`, lalu daftarkan di
// sini. Pakai lebar 1600px, dan pastikan datanya data contoh — bukan data
// pelanggan asli.
export const webAdminScreenshots: {
  src: string;
  alt: string;
  caption: string;
}[] = [];

export const webAdminGroups: WebAdminGroup[] = [
  {
    icon: "chart",
    title: "Laporan & Keuangan",
    summary:
      "Tahu untung-rugi yang sebenarnya, bukan sekadar total penjualan harian.",
    features: [
      {
        name: "Dashboard ringkasan",
        desc: "Penjualan hari ini, transaksi berjalan, dan tren terbaru dalam satu layar.",
        plan: "semua",
      },
      {
        name: "Laporan keuangan",
        desc: "Pemasukan, pengeluaran, dan arus kas per outlet maupun gabungan.",
        plan: "lite",
      },
      {
        name: "Laporan penjualan",
        desc: "Bedah penjualan per periode, produk, kategori, kasir, dan metode bayar.",
        plan: "pro",
      },
      {
        name: "Untung per produk",
        desc: "Margin tiap produk dihitung dari HPP — ketahuan mana yang laris tapi tipis untungnya.",
        plan: "pro",
      },
      {
        name: "Saran harga",
        desc: "Usulan penyesuaian harga jual berdasarkan biaya dan margin yang Anda targetkan.",
        plan: "pro",
      },
    ],
  },
  {
    icon: "box",
    title: "Stok & Pembelian",
    summary:
      "Stok tidak lagi ditebak-tebak, dan belanja ke supplier ada jejaknya.",
    features: [
      {
        name: "Stok saat ini",
        desc: "Posisi stok tiap produk per outlet, lengkap dengan peringatan stok menipis.",
        plan: "semua",
      },
      {
        name: "Keluar-masuk stok",
        desc: "Riwayat setiap pergerakan stok beserta siapa yang mengubahnya.",
        plan: "pro",
      },
      {
        name: "Transfer stok antar outlet",
        desc: "Pindahkan barang antar cabang dengan catatan yang rapi di kedua sisi.",
        plan: "pro",
      },
      {
        name: "Bahan baku & resep",
        desc: "Stok bahan berkurang otomatis mengikuti resep tiap menu yang terjual.",
        plan: "pro",
      },
      {
        name: "Supplier & pesanan pembelian",
        desc: "Data supplier dan PO — dari pesan, terima barang, sampai stok bertambah.",
        plan: "pro",
      },
    ],
  },
  {
    icon: "tag",
    title: "Produk & Katalog",
    summary:
      "Ubah harga sekali di sini, semua terminal kasir langsung ikut berubah.",
    features: [
      {
        name: "Produk, varian & add-on",
        desc: "Kelola katalog lengkap dengan foto, SKU, harga, dan pilihan tambahan.",
        plan: "semua",
      },
      {
        name: "Kategori, brand, satuan",
        desc: "Rapikan struktur katalog supaya laporan ikut rapi.",
        plan: "semua",
      },
      {
        name: "Diskon & promo",
        desc: "Atur potongan harga yang otomatis muncul di kasir.",
        plan: "semua",
      },
      {
        name: "Pajak & biaya layanan",
        desc: "Konfigurasi PPN atau service charge sesuai aturan toko Anda.",
        plan: "semua",
      },
      {
        name: "Menu publik QR",
        desc: "Menu digital yang dibuka pelanggan lewat QR di meja — isinya ikut katalog ini.",
        plan: "pro",
      },
    ],
  },
  {
    icon: "users",
    title: "Karyawan & Hak Akses",
    summary:
      "Beri akses seperlunya, dan tetap tahu siapa mengubah apa saat Anda tidak di toko.",
    features: [
      {
        name: "Karyawan & peran",
        desc: "Tambah kasir, supervisor, atau admin dengan hak akses berbeda.",
        plan: "semua",
      },
      {
        name: "Pengaturan izin (RBAC)",
        desc: "Tentukan detail siapa boleh refund, ubah harga, atau lihat laporan.",
        plan: "semua",
      },
      {
        name: "Audit log",
        desc: "Catatan perubahan penting — jejaknya tidak bisa dihapus karyawan.",
        plan: "semua",
      },
      {
        name: "Kasbon karyawan",
        desc: "Catat pinjaman karyawan dan potongannya tanpa buku tulis terpisah.",
        plan: "semua",
      },
      {
        name: "Absensi",
        desc: "Rekap clock-in/clock-out karyawan dari aplikasi kasir.",
        plan: "pro",
      },
    ],
  },
  {
    icon: "heart",
    title: "Pelanggan & Loyalitas",
    summary: "Pelanggan lama kembali lagi, tanpa perlu aplikasi member terpisah.",
    features: [
      {
        name: "Data pelanggan",
        desc: "Riwayat belanja tiap pelanggan, tersimpan otomatis dari transaksi kasir.",
        plan: "lite",
      },
      {
        name: "Membership",
        desc: "Kelompokkan pelanggan menjadi member dengan perlakuan khusus.",
        plan: "semua",
      },
      {
        name: "Poin loyalitas",
        desc: "Atur perolehan dan penukaran poin — perhitungannya jalan sendiri di kasir.",
        plan: "pro",
      },
    ],
  },
  {
    icon: "store",
    title: "Outlet, Perangkat & Transaksi",
    summary:
      "Pegang beberapa cabang dari satu akun, dan awasi kas tiap shift dari jauh.",
    features: [
      {
        name: "Multi-outlet",
        desc: "Tambah cabang baru dan bandingkan performanya berdampingan.",
        plan: "semua",
      },
      {
        name: "Terminal kasir",
        desc: "Daftarkan dan pantau perangkat kasir mana saja yang aktif.",
        plan: "semua",
      },
      {
        name: "Meja & denah ruangan",
        desc: "Susun tata meja resto yang dipakai kasir dan menu QR.",
        plan: "lite",
      },
      {
        name: "Shift & rekap kas",
        desc: "Lihat pembukaan, penutupan, dan selisih kas tiap shift dari mana saja.",
        plan: "semua",
      },
      {
        name: "Transaksi & refund",
        desc: "Telusuri seluruh riwayat transaksi dan proses refund dengan jejak lengkap.",
        plan: "semua",
      },
    ],
  },
];

// Label paket yang ditampilkan sebagai badge. "semua" sengaja tidak diberi
// badge di UI supaya yang menonjol hanya fitur berbayar.
export const planLabels: Record<Plan, string> = {
  semua: "Semua paket",
  lite: "Lite",
  pro: "Pro",
};
