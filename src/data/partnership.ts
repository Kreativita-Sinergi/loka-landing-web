// Data untuk section "Request Fitur & Kerjasama".
// Loka Kasir dikembangkan mengikuti kebutuhan nyata pengguna — siapa pun boleh
// mengusulkan fitur, dan bisnis apa pun (minimarket, supermarket, kafe, dll.)
// bisa mengajak kerjasama.

export interface IPartnerType {
  icon: string;
  title: string;
  description: string;
}

export const partnershipDetails = {
  title: "Request Fitur & Kerjasama",
  description:
    "Loka Kasir dibangun bersama penggunanya. Butuh fitur yang belum ada, atau ingin mengajak kami kerjasama? Siapa pun boleh mengajukan — dari warung satu meja sampai jaringan supermarket.",

  featureRequest: {
    heading: "Siapa Saja Bisa Request Fitur",
    message:
      "Tidak perlu jadi pelanggan berbayar. Kalau ada alur kerja di bisnis Anda yang belum terakomodasi — laporan tertentu, integrasi perangkat, format struk, atau apa pun — kirimkan saja. Setiap usulan kami tinjau, dan yang paling banyak dibutuhkan kami kerjakan lebih dulu, lalu dirilis sebagai update gratis untuk semua pengguna.",
    points: [
      "Gratis diajukan — pengguna baru, pengguna aktif, maupun yang belum pakai sama sekali",
      "Usulan ditinjau tim produk; kami kabari kalau masuk antrean pengembangan",
      "Fitur yang dirilis langsung tersedia lewat update aplikasi, tanpa biaya tambahan",
      "Butuh penyesuaian khusus untuk bisnis Anda? Bisa kami diskusikan terpisah",
    ],
    ctaLabel: "Ajukan Request Fitur",
    whatsappMessage:
      "Halo tim Loka Kasir, saya ingin mengajukan request fitur.\n\nNama bisnis: \nJenis bisnis: \nFitur yang dibutuhkan: \nKenapa dibutuhkan: ",
  },

  partnership: {
    heading: "Terbuka untuk Kerjasama",
    message:
      "Kami terbuka bekerja sama dengan berbagai skala dan jenis bisnis — mulai dari penyesuaian sistem sesuai alur operasional Anda, penerapan multi-outlet, sampai kemitraan reseller dan mitra pemasangan di daerah.",
    ctaLabel: "Ajak Kerjasama",
    whatsappMessage:
      "Halo tim Loka Kasir, saya tertarik mengajak kerjasama.\n\nNama bisnis: \nJenis bisnis: \nJumlah outlet: \nKota: \nBentuk kerjasama yang diinginkan: ",
  },

  // Kanal kontak untuk kedua jalur di atas.
  contact: {
    whatsapp: "6283878960539",
    instagram: "lokakasir.id",
    email: "help@lokakasir.id",
  },
};

export const partnerTypes: IPartnerType[] = [
  {
    icon: "🏪",
    title: "Minimarket & Supermarket",
    description:
      "Barcode, stok multi-rak, banyak kasir dalam satu outlet, dan laporan per cabang.",
  },
  {
    icon: "☕",
    title: "Kafe & Restoran",
    description:
      "Manajemen meja, KDS dapur, resep/HPP, dan alur dine-in, take away, maupun delivery.",
  },
  {
    icon: "🛍️",
    title: "Retail & Grosir",
    description:
      "Variasi produk, harga bertingkat, supplier, dan Purchase Order untuk pembelian rutin.",
  },
  {
    icon: "🤝",
    title: "Reseller & Mitra Daerah",
    description:
      "Ingin memasarkan dan mendampingi pemasangan Loka Kasir di kota Anda? Mari bicara.",
  },
];
