import { notFound } from 'next/navigation';

/**
 * Alamat yang tidak cocok dengan rute mana pun. Tanpa rute ini Next memakai 404
 * bawaannya (tanpa header/footer), karena layout akar ada di `[locale]` dan
 * `not-found.tsx` di sana hanya dipakai saat `notFound()` dipanggil.
 */
export default function CatchAll() {
  notFound();
}
