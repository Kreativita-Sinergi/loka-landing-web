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
      <p className="mt-8 text-center text-sm text-gray-400">
        Harga belum termasuk PPN. Pembayaran melalui transfer bank atau dompet digital.{" "}
        <a href="mailto:help@lokakasir.id" className="underline hover:text-gray-600">
          Hubungi kami
        </a>{" "}
        untuk pertanyaan seputar harga.
      </p>
    </div>
  );
};

export default Pricing;
