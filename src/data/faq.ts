import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
  {
    question: `Apa bedanya App Kasir dan Web Admin ${siteDetails.siteName}?`,
    answer:
      'App Kasir adalah alat operasional harian untuk kasir di toko — proses order, bayar, cetak struk, dan buka/tutup shift. Web Admin adalah pusat kendali untuk pemilik bisnis — pantau laporan, atur produk, kelola karyawan, dan analitik. Keduanya terhubung real-time.',
  },
  {
    question: `Apakah kasir perlu login email setiap hari?`,
    answer:
      'Tidak. Setelah perangkat terikat (bind) ke terminal, kasir hanya perlu memasukkan PIN 4-digit untuk membuka sesi. Ini lebih cepat dan aman untuk operasional harian di toko.',
  },
  {
    question: 'Apakah saya bisa mengelola banyak outlet atau cabang?',
    answer:
      `Ya, ${siteDetails.siteName} dirancang untuk skala bisnis apa pun. Satu akun Owner dapat mengelola banyak outlet. Anda bisa memantau stok dan performa setiap cabang dari satu dashboard Web Admin.`,
  },
  {
    question: 'Bagaimana jika koneksi internet terputus saat transaksi?',
    answer:
      `App Kasir menyimpan data sesi secara lokal. Transaksi yang sedang diproses tetap tersimpan aman. Saat koneksi kembali, data akan otomatis disinkronkan ke server dan laporan di Web Admin akan diperbarui.`,
  },
  {
    question: 'Apakah bisa mencetak struk ke printer thermal?',
    answer:
      `Tentu. App Kasir mendukung berbagai jenis printer thermal melalui koneksi Bluetooth maupun USB. Anda bisa mengatur cetak struk otomatis setelah pembayaran selesai.`,
  },
];
