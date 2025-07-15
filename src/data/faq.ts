import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
  {
    question: `Apakah ${siteDetails.siteName} aman digunakan?`,
    answer:
      'Tentu. Kami menggunakan enkripsi setara perbankan untuk melindungi data Anda, dan tidak menyimpan informasi login apa pun. Keamanan berlapis termasuk autentikasi biometrik juga tersedia.',
  },
  {
    question: `Apakah ${siteDetails.siteName} bisa diakses di beberapa perangkat?`,
    answer:
      `Ya! Akun ${siteDetails.siteName} Anda dapat diakses secara mulus dari berbagai perangkat—smartphone, tablet, maupun komputer.`,
  },
  {
    question: 'Apakah saya bisa mengelola banyak outlet atau cabang?',
    answer:
      `Bisa. ${siteDetails.siteName} mendukung pengelolaan multi-outlet dengan satu akun admin pusat, memudahkan pemantauan stok, transaksi, dan laporan dari berbagai lokasi.`,
  },
  {
    question: 'Apakah saya butuh keahlian teknis untuk menggunakan aplikasi ini?',
    answer:
      `Tidak perlu. Antarmuka ${siteDetails.siteName} dirancang intuitif dan mudah digunakan oleh siapa saja, bahkan bagi yang belum pernah menggunakan sistem POS sebelumnya.`,
  },
  {
    question: 'Bagaimana jika saya butuh bantuan?',
    answer:
      'Tim dukungan kami siap membantu Anda 24/7 melalui email atau chat. Kami juga menyediakan dokumentasi lengkap dan panduan dalam aplikasi untuk memudahkan penggunaan.',
  },
];
