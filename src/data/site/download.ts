import { pick, type Locale } from '@/data/localized';

/**
 * Copy halaman unduhan desain 2026: `/download` (baru) serta tambahan kecil
 * untuk `/download/windows` dan `/download/android`.
 *
 * Isi utama halaman Windows dan Android tetap dari `data/windowsPage.ts`,
 * `data/androidPage.ts`, dan `data/cta.ts` (versi, ukuran, SHA-256).
 * Baru tersedia dalam bahasa Indonesia; bahasa lain jatuh ke versi ini.
 */
const id = {
  crumbs: { home: 'Beranda', download: 'Download', windows: 'Windows', android: 'File APK' },
  hub: {
    metaTitle: 'Download Aplikasi Kasir untuk Android & Windows',
    metaDescription:
      'Download Loka Kasir untuk HP dan tablet Android (Google Play), PC atau laptop Windows, dan file APK untuk mesin POS tanpa Play Store. Satu akun untuk semua perangkat. Gratis 30 hari pertama.',
    title: 'Download aplikasi Loka Kasir',
    desc: 'Pilih sesuai perangkat kasir Anda. Satu akun bisa dipakai di HP, tablet, komputer, dan mesin POS.',
    howToTitle: 'Cara memasang',
    install: [
      {
        key: 'windows' as const,
        title: 'Windows',
        steps: [
          'Klik Download untuk Windows, lalu pasang lewat Microsoft Store atau file installer (.exe).',
          'Ikuti petunjuk pemasangan sampai selesai.',
          'Buka Loka Kasir dan masuk dengan akun Anda.',
          'Daftarkan perangkat sebagai terminal kasir, lalu kasir cukup login dengan PIN.',
        ],
        more: 'Panduan lengkap Windows',
      },
      {
        key: 'apk' as const,
        title: 'File APK',
        steps: [
          'Buka halaman ini dari perangkat Android, lalu ketuk Download APK.',
          'Saat diminta, izinkan pemasangan aplikasi dari sumber ini.',
          'Buka file APK dan ketuk Pasang.',
          'Masuk dengan akun Anda. Update berikutnya diunduh dari halaman ini juga.',
        ],
        more: 'Panduan lengkap APK & Huawei',
      },
    ],
    webAdminLead: 'Pemilik usaha? Laporan dan pengaturan dibuka lewat',
    webAdminLink: 'Web Admin di browser',
  },
  windows: {
    storeNoteSuffix: 'Pembaruan otomatis',
    directSecondary: 'Download installer (.exe)',
    version: 'Versi',
    size: 'Ukuran',
  },
  android: {
    version: 'Versi',
    size: 'Ukuran',
    minAndroid: 'Minimal',
  },
};

export const getDownloadCopy = (locale: Locale) => pick({ id }, locale);
