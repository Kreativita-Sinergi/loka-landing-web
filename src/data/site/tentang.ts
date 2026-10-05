import { pick, type Locale } from '@/data/localized';

/** Copy halaman Tentang & Kontak (/tentang). */
const id = {
  metaTitle: 'Tentang Loka Kasir & Kontak',
  metaDescription: 'Loka Kasir dibuat di Pekanbaru oleh Kreativita Sinergi. Hubungi kami lewat WhatsApp, email, atau Instagram, atau datang ke kantor kami.',
  crumbHome: 'Beranda',
  crumb: 'Tentang Kami',
  title: 'Teman di meja kasir',
  desc: 'Loka Kasir dibuat di Pekanbaru oleh Kreativita Sinergi untuk pemilik usaha yang ingin jualannya tercatat rapi tanpa ribet.',
  story: {
    eyebrow: 'Cerita kami',
    title: 'Kasir yang dibuat untuk usaha di sekitar kita',
    paragraphs: [
      'Banyak warung, kafe, dan toko masih mencatat penjualan di buku atau tidak mencatat sama sekali. Kami membuat Loka supaya pemilik usaha bisa fokus melayani pembeli, sementara penjualan, stok, dan kas tercatat sendiri.',
      'Loka berjalan di perangkat yang sudah ada, tetap bisa dipakai saat internet putus, dan bisa dimulai gratis.',
    ],
    imageAlt: 'Warung makan kecil di pinggir jalan',
  },
  stats: {
    users: 'usaha terdaftar',
    transactions: 'transaksi tercatat',
    setupTitle: 'Online',
    setup: 'bantuan setup lewat WhatsApp',
    platformsTitle: 'Android & Windows',
    platforms: 'plus Web Admin untuk pemilik',
  },
  contact: {
    eyebrow: 'Kontak',
    title: 'Hubungi kami',
    desc: 'Pertanyaan, bantuan setup, atau ajakan kerja sama, silakan pilih cara yang paling nyaman.',
    whatsapp: { label: 'WhatsApp', action: 'Chat sekarang', message: 'Halo tim Loka, saya mau tanya tentang Loka Kasir.' },
    email: { label: 'Email', action: 'Kirim email' },
    instagram: { label: 'Instagram', action: 'Ikuti kami' },
  },
  office: {
    title: 'Kantor',
    maps: 'Buka di Google Maps',
    mapTitle: 'Peta lokasi kantor Loka Kasir di Pekanbaru',
  },
};

export const getTentangCopy = (locale: Locale) => pick({ id }, locale);
