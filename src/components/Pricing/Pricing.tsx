import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import PricingColumn from "./PricingColumn";
import { tiers } from "@/data/pricing";
import { appRequestDetails } from "@/data/cta";

const appRequestWaLink = `https://wa.me/${appRequestDetails.whatsapp}?text=${encodeURIComponent(
  appRequestDetails.whatsappMessage
)}`;

const Pricing: React.FC = () => {
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {tiers.map((tier, index) => (
          <PricingColumn
            key={tier.name}
            tier={tier}
            highlight={index === 2}
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
          Cocok untuk usaha yang baru mulai. Tanpa biaya, tanpa masa berlaku — gunakan selama yang Anda mau.
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
            href={appRequestWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 font-semibold text-sm"
          >
            Minta aplikasi via WhatsApp →
          </a>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-center">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Untuk berlangganan:{" "}
          <a
            href={appRequestWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 font-semibold"
          >
            minta aplikasinya via WhatsApp
          </a>
          {" "}lalu daftar langsung di aplikasi, kemudian pilih paket dan selesaikan pembayaran.
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
