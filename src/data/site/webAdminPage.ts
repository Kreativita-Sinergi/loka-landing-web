import { pick, type Locale } from '@/data/localized';

/**
 * Copy tambahan halaman `/web-admin` desain 2026. Isi utamanya (judul, peran,
 * grup fitur + penanda Pro) tetap dari `data/webAdmin.ts`.
 * Baru tersedia dalam bahasa Indonesia; bahasa lain jatuh ke versi ini.
 */
const id = {
  home: 'Beranda',
  compareTitle: 'Dua aplikasi, satu akun',
  gridTitle: 'Yang bisa diatur dari Web Admin',
  points: ['Tidak perlu instal, cukup buka browser', 'Termasuk di semua paket', 'Gratis 30 hari semua fitur Pro'],
  downloadLink: 'Download aplikasi kasir',
};

export const getWebAdminSiteCopy = (locale: Locale) => pick({ id }, locale);
