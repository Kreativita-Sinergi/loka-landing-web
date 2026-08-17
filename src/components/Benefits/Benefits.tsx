import BenefitSection from "./BenefitSection"

import { getBenefits } from "@/data/benefits"
import type { Locale } from "@/data/localized";
import { getUi } from "@/data/ui";

const Benefits: React.FC<{ locale: Locale }> = ({ locale }) => {
  const benefits = getBenefits(locale);
    return (
        <div id="features">
            <h2 className="sr-only">{getUi(locale).benefitsEyebrow}</h2>
            {benefits.map((item, index) => {
                return <BenefitSection key={index} benefit={item} imageAtRight={index % 2 !== 0} />
            })}
        </div>
    )
}

export default Benefits