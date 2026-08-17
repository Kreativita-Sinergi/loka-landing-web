"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Lightbulb, Gift } from "lucide-react";
import PricingColumn from "./PricingColumn";
import { tiers } from "@/data/pricing";
import { appDownloadDetails, signUpDetails } from "@/data/cta";
import { promoDetails } from "@/data/promo";
import {
  PRICING_COUNTRIES,
  fetchPrices,
  guessCountry,
  type PricingCountry,
  type SubscriptionPrice,
} from "@/lib/pricing";

/** Nama plan di API untuk tiap kolom harga; kolom uji coba tidak punya harga. */
const PLAN_KEYS: Record<string, { monthly: string; yearly: string }> = {
  Lite: { monthly: "lite", yearly: "lite-yearly" },
  Pro: { monthly: "pro", yearly: "pro-yearly" },
};

const Pricing: React.FC = () => {
  // Negara ditebak dari bahasa peramban, lalu bisa diubah pengunjung. Tebakan
  // yang meleset cukup satu klik untuk dibetulkan — jauh lebih baik daripada
  // semua orang melihat rupiah lebih dulu.
  const [country, setCountry] = useState<PricingCountry>("ID");
  const [prices, setPrices] = useState<SubscriptionPrice[] | null>(null);

  useEffect(() => setCountry(guessCountry()), []);

  useEffect(() => {
    let cancelled = false;
    fetchPrices(country).then((result) => {
      if (!cancelled) setPrices(result);
    });
    return () => {
      cancelled = true;
    };
  }, [country]);

  const priceOf = (plan: string) => prices?.find((p) => p.plan === plan);

  /**
   * Harga lokal untuk sebuah kolom. Dikembalikan undefined bila API belum
   * menjawab ATAU bila negara itu memakai baris cadangan rupiah — dalam kedua
   * keadaan itu, angka rupiah dari `data/pricing.ts` sudah benar.
   */
  const localizedFor = (tierName: string) => {
    const keys = PLAN_KEYS[tierName];
    if (!keys) return undefined;
    const monthly = priceOf(keys.monthly);
    if (!monthly || !monthly.is_local_price) return undefined;
    return {
      currency: monthly.display_currency,
      country,
      monthly: monthly.display_amount,
      yearly: priceOf(keys.yearly)?.display_amount,
    };
  };

  return (
    <div className="py-6">
      {/* Pemilih negara — menentukan mata uang yang ditampilkan seluruh kolom. */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        <label htmlFor="pricing-country" className="text-sm text-gray-600 dark:text-gray-300">
          Harga untuk
        </label>
        <select
          id="pricing-country"
          value={country}
          onChange={(e) => setCountry(e.target.value as PricingCountry)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-surface-border dark:bg-surface"
        >
          {PRICING_COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label} ({c.currency})
            </option>
          ))}
        </select>
      </div>

      {/* Banner promo: gratis 30 hari pertama untuk setiap akun baru */}
      <div className="mb-8 flex flex-col items-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-5 text-center dark:border-blue-500/30 dark:bg-blue-500/10">
        <p className="inline-flex items-center gap-2 text-base font-bold text-blue-800 dark:text-blue-300">
          <Gift size={18} aria-hidden="true" /> {promoDetails.heading}
        </p>
        <p className="max-w-2xl text-sm leading-relaxed text-blue-900/80 dark:text-blue-100/80">
          {promoDetails.description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {tiers.map((tier, index) => (
          <PricingColumn
            key={tier.name}
            tier={tier}
            highlight={index === 2}
            localized={localizedFor(tier.name)}
          />
        ))}
      </div>

      {/* Paket Gratis info — dijelaskan gamblang: apa yang termasuk, batasannya, dan yang tidak termasuk */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 dark:bg-surface dark:border-surface-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🆓</span>
          <h3 className="text-base font-bold text-gray-800 dark:text-white">
            Paket Gratis — Selamanya (Rp 0)
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Cocok untuk usaha yang baru mulai. Tanpa biaya, tanpa masa berlaku — gunakan selama yang Anda mau. Sebelum turun ke paket ini, setiap akun baru lebih dulu menikmati {promoDetails.duration} pertama gratis dengan semua fitur Pro terbuka.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Yang termasuk */}
          <div>
            <p className="inline-flex items-center gap-1 text-xs font-bold text-green-600 uppercase tracking-wider mb-2 dark:text-green-400">
              <CheckCircle2 size={14} aria-hidden="true" /> Yang termasuk
            </p>
            <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
              <li>• Kasir / transaksi penjualan (POS)</li>
              <li>• <span className="font-semibold text-gray-800 dark:text-white">500 transaksi</span> per bulan</li>
              <li>• 1 outlet</li>
              <li>• Kelola produk &amp; kategori</li>
              <li>• Cetak struk &amp; laporan transaksi dasar</li>
              <li>• Mode offline (kasir tetap jalan tanpa internet)</li>
            </ul>
          </div>

          {/* Yang belum termasuk */}
          <div>
            <p className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 dark:text-gray-500">
              <XCircle size={14} aria-hidden="true" /> Belum termasuk (upgrade ke Lite / Pro)
            </p>
            <ul className="space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
              <li>• Database pelanggan, meja &amp; KDS (Lite)</li>
              <li>• Karyawan multi-role &amp; diskon/bundle (Lite)</li>
              <li>• Multi-outlet &amp; inventori lanjutan (Pro)</li>
              <li>• HPP, Smart Pricing &amp; Loyalty (Pro)</li>
              <li>• Pesan via QR / Scan-to-Order (Pro)</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-surface-border flex flex-wrap items-center justify-between gap-2">
          <p className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Lightbulb size={14} className="shrink-0 text-amber-500" aria-hidden="true" /> Lewat batas 500 transaksi? Tinggal upgrade kapan saja — data Anda tetap aman.
          </p>
          <a
            href={appDownloadDetails.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 font-semibold text-sm"
          >
            Download di Google Play →
          </a>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-center">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Mulai sekarang:{" "}
          <a
            href={signUpDetails.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 font-semibold"
          >
            daftar gratis di app.lokakasir.id
          </a>
          {" "}atau langsung dari aplikasinya — {promoDetails.duration} pertama gratis. Pemilihan paket &amp; pembayaran baru dilakukan setelah masa gratis berakhir.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Harga sudah termasuk PPN. Pembayaran melalui transfer bank atau dompet digital.{" "}
          <a href="mailto:help@lokakasir.id" className="underline hover:text-gray-600">
            Hubungi kami
          </a>{" "}
          untuk pertanyaan seputar harga.
        </p>
      </div>
    </div>
  );
};

export default Pricing;
