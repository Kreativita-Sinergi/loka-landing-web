// Data untuk section "Pemasangan Langsung oleh Tim Kami" (layanan onsite).
// Loka Kasir punya tim di Padang, Pekanbaru, dan Payakumbuh. Untuk pelanggan
// di kota-kota ini, tim bisa datang langsung ke lokasi untuk menyiapkan
// aplikasi dan kedainya — dengan syarat berlangganan paket tahunan.
//
// SENGAJA TIDAK DILOKALKAN, dan section-nya hanya dirender pada bahasa
// Indonesia (lihat `src/app/[locale]/page.tsx`). Tim yang bisa datang ke lokasi
// hanya ada di tiga kota di Sumatera; menawarkan "kunjungan ke toko Anda"
// kepada pembaca di Osaka atau Kuala Lumpur berarti menjanjikan layanan yang
// tidak bisa ditepati. Tautannya di navigasi dan footer juga dihapus untuk
// bahasa lain.

export interface IOnsiteCity {
  name: string;
  province: string;
  note: string;
}

export interface IOnsiteStep {
  title: string;
  desc: string;
}

export const onsiteServiceDetails = {
  title: "Tim Kami Bisa Datang & Setupkan Langsung",
  description:
    "Tidak sempat atau bingung menyiapkan sendiri? Untuk bisnis di Padang, Pekanbaru, dan Payakumbuh, tim Loka Kasir bisa datang ke lokasi Anda dan menyiapkan aplikasi beserta kedainya sampai siap dipakai jualan.",

  citiesHeading: "Kota Layanan Onsite",
  citiesNote:
    "Tim kami berdomisili di tiga kota ini, jadi kunjungan ke lokasi bisa dijadwalkan tanpa biaya perjalanan tambahan.",

  cities: [
    {
      name: "Padang",
      province: "Sumatera Barat",
      note: "Kantor pusat Loka Kasir — jadwal kunjungan paling fleksibel.",
    },
    {
      name: "Pekanbaru",
      province: "Riau",
      note: "Tim lokal siap datang ke toko, kafe, maupun kedai Anda.",
    },
    {
      name: "Payakumbuh",
      province: "Sumatera Barat",
      note: "Melayani juga area sekitar Limapuluh Kota dan Bukittinggi.",
    },
  ] as IOnsiteCity[],

  serviceHeading: "Yang Dikerjakan Tim di Lokasi",
  serviceItems: [
    "Pendaftaran akun Owner dan pembuatan outlet pertama",
    "Input produk, kategori, harga jual, dan stok awal",
    "Pendaftaran karyawan beserta role dan PIN masing-masing",
    "Pemasangan terminal kasir di HP/tablet dan pairing printer thermal",
    "Pengaturan metode pembayaran, format struk, dan meja/KDS untuk FNB",
    "Pelatihan singkat untuk kasir dan pemilik sampai benar-benar paham",
  ],

  requirementHeading: "Syaratnya: Berlangganan Tahunan",
  requirementMessage:
    "Layanan datang ke lokasi ini gratis untuk pelanggan yang mengambil paket Pro Rp 590.000/tahun. Anda tetap bisa mencoba gratis 30 hari lebih dulu, lalu minta dijadwalkan kunjungan setelah memutuskan berlangganan tahunan.",
  requirementPoints: [
    "Berlaku untuk paket Pro tahunan",
    "Kunjungan dijadwalkan setelah pembayaran langganan tahunan dikonfirmasi",
    "Tanpa biaya setup dan tanpa biaya transportasi di dalam kota layanan",
    "Di luar tiga kota tersebut? Setup tetap kami bantu penuh secara online lewat WhatsApp atau video call",
  ],

  steps: [
    {
      title: "1. Hubungi Admin",
      desc: "Chat admin lewat WhatsApp, sebutkan nama bisnis, jenis usaha, dan kota Anda.",
    },
    {
      title: "2. Pilih Paket Tahunan",
      desc: "Admin membantu proses langganan Pro tahunan.",
    },
    {
      title: "3. Atur Jadwal Kunjungan",
      desc: "Tentukan hari dan jam yang paling longgar di kedai Anda; tim menyesuaikan.",
    },
    {
      title: "4. Tim Datang & Siapkan",
      desc: "Tim datang, menyiapkan semuanya sampai selesai, dan melatih kasir Anda di tempat.",
    },
  ] as IOnsiteStep[],

  ctaLabel: "Hubungi Admin untuk Dijadwalkan",
  whatsappMessage:
    "Halo tim Loka Kasir, saya ingin dibantu setup langsung di lokasi (langganan Pro tahunan).\n\nNama bisnis: \nJenis bisnis: \nKota (Padang/Pekanbaru/Payakumbuh): \nAlamat kedai: \nWaktu kunjungan yang diinginkan: ",

  contact: {
    whatsapp: "6283878960539",
  },
};
