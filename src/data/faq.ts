import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
  {
    question: `Apakah ada masa percobaan gratis?`,
    answer:
      `Ya! Setiap akun baru mendapat masa percobaan 30 hari gratis dengan akses penuh ke semua fitur — tanpa kartu kredit, tanpa komitmen. Setelah 30 hari, pilih paket Bulanan (Rp 100.000/bulan) atau Tahunan (Rp 800.000/tahun, hemat 33%).`,
  },
  {
    question: `Apa bedanya App Kasir dan Web Admin ${siteDetails.siteName}?`,
    answer:
      `App Kasir adalah alat operasional harian untuk kasir di toko — proses order, terima pembayaran, cetak struk, dan buka/tutup shift. Web Admin adalah pusat kendali untuk pemilik bisnis — pantau laporan, atur produk & harga, kelola karyawan, dan analitik bisnis. Keduanya terhubung secara real-time.`,
  },
  {
    question: `Apakah kasir perlu login email setiap hari?`,
    answer:
      `Tidak. Setelah perangkat terikat (bound) ke terminal kasir, kasir hanya perlu memasukkan PIN 4-digit untuk membuka sesi setiap hari. Lebih cepat, lebih aman, dan mengurangi kesalahan login di operasional harian.`,
  },
  {
    question: `Fitur apa saja yang didukung untuk restoran dan kafe?`,
    answer:
      `${siteDetails.siteName} mendukung manajemen meja (table management), Kitchen Display System (KDS) untuk dapur, tipe order Dine-in/Take Away/Delivery, dan pembayaran split. Kasir bisa mengelola beberapa meja sekaligus dari satu layar.`,
  },
  {
    question: `Apakah saya bisa mengelola banyak outlet atau cabang?`,
    answer:
      `Ya. Satu akun Owner dapat mengelola banyak outlet sekaligus. Anda bisa memantau stok, laporan penjualan, dan performa kasir di setiap cabang dari satu Web Admin tanpa perlu pindah akun.`,
  },
  {
    question: `Bagaimana jika koneksi internet terputus saat transaksi?`,
    answer:
      `App Kasir berjalan dengan mode offline otomatis. Saat internet terputus, transaksi tetap bisa diproses dan tersimpan di perangkat. Saat koneksi kembali, semua data langsung tersinkronisasi ke server dan laporan di Web Admin otomatis diperbarui.`,
  },
  {
    question: `Apakah bisa mencetak struk ke printer thermal?`,
    answer:
      `Tentu. App Kasir mendukung berbagai printer thermal populer melalui koneksi Bluetooth maupun USB. Struk bisa dicetak otomatis setelah pembayaran selesai, atau manual sesuai kebutuhan. Ukuran dan konten struk bisa dikustomisasi.`,
  },
  {
    question: `Apakah ada biaya tambahan di luar harga langganan?`,
    answer:
      `Tidak ada. Harga langganan sudah mencakup semua fitur, update, dan bantuan teknis. Tidak ada biaya setup, biaya per transaksi, atau biaya tersembunyi lainnya.`,
  },
  {
    question: `Bagaimana cara mengelola karyawan dengan peran berbeda?`,
    answer:
      `${siteDetails.siteName} mendukung 5 peran: Owner (akses penuh), Manager, Admin, Kasir (hanya operasional toko), dan Koki (hanya melihat antrian di KDS). Setiap peran punya akses yang sesuai — kasir tidak bisa melihat laporan keuangan, Owner bisa melihat semua.`,
  },
];
