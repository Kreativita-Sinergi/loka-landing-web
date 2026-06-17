import React from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Globe, Mail } from "lucide-react";
import { parentCompany as kc } from "@/data/parentCompany";

const waLink = `https://wa.me/${kc.whatsapp}?text=${encodeURIComponent(kc.whatsappMessage)}`;

// Structured data: associate Loka Kasir with its publisher Kreativita Sinergi.
// Helps search engines connect both entities and pass relevance/authority.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${kc.website}/#organization`,
      name: kc.name,
      url: kc.website,
      slogan: kc.tagline,
      description: kc.description,
      email: kc.email,
      areaServed: "ID",
      sameAs: ["https://lokakasir.id"],
    },
    {
      "@type": "SoftwareApplication",
      name: "Loka Kasir",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android",
      url: "https://lokakasir.id",
      offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
      publisher: { "@id": `${kc.website}/#organization` },
      author: { "@id": `${kc.website}/#organization` },
    },
  ],
};

const ParentCompany: React.FC = () => {
  return (
    <section id="kreativita" className="py-10 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 sm:p-12 lg:p-16 shadow-sm dark:bg-surface dark:border-surface-border dark:shadow-black/30">
        {/* soft brand glow */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #3366ff, transparent 70%)" }}
          aria-hidden
        />

        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: identity + description */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              {kc.eyebrow}
            </span>

            <div className="flex items-center gap-4 mb-5">
              <Image
                src="/images/kreativita-logo.png"
                alt="Logo Kreativita Sinergi"
                width={56}
                height={56}
                className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0"
              />
              <div className="leading-tight">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {kc.name}
                </div>
                <div className="text-sm text-foreground-accent">{kc.tagline}</div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{kc.description}</p>

            <div className="mt-8 grid sm:grid-cols-3 gap-5">
              {kc.points.map((p) => (
                <div key={p.title}>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{p.title}</h4>
                  <p className="text-xs text-foreground-accent leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a
                href={kc.website}
                target="_blank"
                rel="noopener"
                title="Jasa pembuatan website & aplikasi — Kreativita Sinergi"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 text-white font-semibold px-6 py-3 hover:bg-gray-800 transition-colors dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
              >
                <Globe size={18} /> Jasa Website & Aplikasi — {kc.websiteLabel}
                <ArrowUpRight size={16} />
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 text-gray-800 font-semibold px-6 py-3 hover:border-secondary hover:text-secondary transition-colors dark:border-surface-border dark:text-gray-200"
              >
                Konsultasi Proyek
              </a>
            </div>
          </div>

          {/* Right: services offered */}
          <div className="rounded-2xl bg-hero-background border border-gray-100 p-7 sm:p-8 dark:bg-background/40 dark:border-surface-border">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Butuh solusi digital lain?</h3>
            <p className="text-sm text-foreground-accent mb-6">
              Selain Loka Kasir, Kreativita Sinergi juga mengerjakan:
            </p>
            <ul className="space-y-3">
              {kc.services.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="grid place-items-center w-5 h-5 rounded-full bg-secondary/10 text-secondary flex-shrink-0">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${kc.email}`}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
            >
              <Mail size={16} /> {kc.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentCompany;
