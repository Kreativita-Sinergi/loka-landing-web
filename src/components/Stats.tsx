import React from "react";
import { stats } from "@/data/stats";

const Stats: React.FC = () => {
  return (
    <section className="bg-secondary py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
                {stat.value}
              </span>
              <span className="mt-1 text-base font-semibold">{stat.label}</span>
              <span className="mt-1 text-sm text-blue-200 leading-snug">
                {stat.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
