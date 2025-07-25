"use client";

import clsx from "clsx";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { IPricing } from "@/types";

interface Props {
  tier: IPricing;
  highlight?: boolean;
}

const PricingColumn: React.FC<Props> = ({ tier, highlight }: Props) => {
  const { name, price, features } = tier;

  const isBulanan = name.toLowerCase().includes("bulan");
  const isTahunan = name.toLowerCase().includes("tahun");

  return (
    <div
      className={clsx(
        "w-full max-w-sm mx-auto bg-white rounded-xl border border-gray-200 text-center",
        { "shadow-lg": highlight }
      )}
    >
      <div className="p-6 border-b border-gray-200 rounded-t-xl">
        <h3 className="text-2xl font-semibold mb-4">{name}</h3>
        <p className="text-3xl md:text-5xl font-bold mb-6">
          <span className={clsx({ "text-secondary": highlight })}>
            Rp {price.toLocaleString("id-ID")}
          </span>
          <span className="block text-lg font-normal text-gray-600">
            /{isBulanan ? "bulan" : isTahunan ? "tahun" : ""}
          </span>
        </p>
        <button
          onClick={() =>
            window.open(
              "https://play.google.com/store/apps/details?id=com.loka.app",
              "_blank"
            )
          }
          className={clsx(
            "w-full py-3 px-4 rounded-full transition-colors font-semibold",
            {
              "bg-primary text-white hover:bg-primary-accent": highlight,
              "bg-gray-100 text-black hover:bg-gray-200": !highlight,
            }
          )}
        >
          Langganan Sekarang
        </button>
      </div>
      <div className="p-6 mt-1 text-left">
        <p className="font-bold mb-0 text-center">FITUR</p>
        <p className="text-foreground-accent mb-5 text-center">
          Semua fitur yang Anda butuhkan
        </p>
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <BsFillCheckCircleFill className="h-5 w-5 text-secondary mr-2" />
              <span className="text-foreground-accent">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingColumn;
