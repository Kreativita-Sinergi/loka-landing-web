import PricingColumn from "./PricingColumn";
import { tiers } from "@/data/pricing";

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

      {/* Paket Gratis info */}
      <div className="mt-6 flex items-center justify-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4">
        <span className="text-lg">🆓</span>
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Paket Gratis selamanya</span>
          {" "}— 1 outlet, maks. 500 transaksi/bulan, fitur POS dasar.{" "}
          <a
            href="https://app.lokakasir.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 font-medium"
          >
            Daftar gratis →
          </a>
        </p>
      </div>

      <div className="mt-4 space-y-2 text-center">
        <p className="text-sm font-medium text-gray-600">
          Untuk berlangganan:{" "}
          <a
            href="https://app.lokakasir.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 font-semibold"
          >
            Daftar akun di app.lokakasir.id
          </a>
          {" "}terlebih dahulu, kemudian pilih paket dan selesaikan pembayaran.
        </p>
        <p className="text-sm text-gray-400">
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
