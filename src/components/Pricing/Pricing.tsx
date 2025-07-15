import PricingColumn from "./PricingColumn";

import { tiers } from "@/data/pricing";

const Pricing: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {tiers.map((tier, index) => (
          <PricingColumn key={tier.name} tier={tier} highlight={index === 1} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
