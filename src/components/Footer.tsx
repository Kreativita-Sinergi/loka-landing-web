import Link from "next/link";
import React from "react";
import Image from "next/image";

import { siteDetails } from "@/data/siteDetails";
import { footerDetails } from "@/data/footer";
import { appRequestDetails } from "@/data/cta";
import { getPlatformIconByName } from "@/utils";

const appRequestWaLink = `https://wa.me/${appRequestDetails.whatsapp}?text=${encodeURIComponent(
  appRequestDetails.whatsappMessage
)}`;

const Footer: React.FC = () => {
  return (
    <footer className="bg-hero-background text-foreground py-12">
      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" width={140} height={70} alt="Logo" />
          </Link>
          <p className="mt-3 text-sm text-foreground-accent leading-relaxed">
            {footerDetails.subheading}
          </p>
          {footerDetails.socials && (
            <div className="mt-5 flex items-center gap-4">
              {Object.keys(footerDetails.socials).map((platformName) => {
                if (platformName && footerDetails.socials[platformName]) {
                  return (
                    <Link
                      href={footerDetails.socials[platformName]!}
                      key={platformName}
                      aria-label={platformName}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getPlatformIconByName(platformName)}
                    </Link>
                  );
                }
              })}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-base font-semibold mb-4">Tautan Cepat</h4>
          <ul className="space-y-2 text-sm text-foreground-accent">
            {footerDetails.quickLinks.map((link) => (
              <li key={link.text}>
                <Link href={link.url} className="hover:text-foreground transition-colors">
                  {link.text}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={appRequestWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-secondary hover:underline"
              >
                💬 Minta Aplikasi
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-base font-semibold mb-4">Hubungi Kami</h4>
          <ul className="space-y-2 text-sm text-foreground-accent">
            {footerDetails.email && (
              <li>
                <a
                  href={`mailto:${footerDetails.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  ✉ {footerDetails.email}
                </a>
              </li>
            )}
            {footerDetails.telephone && (
              <li>
                <a
                  href={`tel:${footerDetails.telephone}`}
                  className="hover:text-foreground transition-colors"
                >
                  ☎ {footerDetails.telephone}
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Address */}
        <div>
          <h4 className="text-base font-semibold mb-4">Alamat Kami</h4>
          {footerDetails.address && (
            <address className="not-italic text-sm text-foreground-accent leading-relaxed">
              {footerDetails.address}
            </address>
          )}
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(footerDetails.address ?? '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-xs text-secondary hover:underline"
          >
            Lihat di Google Maps →
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-200 pt-6 px-6 text-center text-sm text-gray-400 dark:border-surface-border dark:text-gray-500">
        <p>
          Hak Cipta &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-foreground">{siteDetails.siteName}</span>.
          Seluruh hak cipta dilindungi undang-undang.
        </p>
        <p className="mt-1">
          Dibuat dengan ♥ oleh{" "}
          <a
            href="https://www.kreativitasinergi.com"
            target="_blank"
            rel="noopener"
            title="Jasa pembuatan website & aplikasi — Kreativita Sinergi"
            className="font-medium text-foreground-accent hover:text-secondary transition-colors"
          >
            Kreativita Sinergi
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
