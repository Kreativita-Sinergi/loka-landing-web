import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Download, Mail, Phone } from "lucide-react";

import { siteDetails } from "@/data/siteDetails";
import { getFooter } from "@/data/footer";
import { getAppDownload } from "@/data/cta";
import { localePath, type Locale } from "@/data/localized";
import { getUi } from "@/data/ui";
import { getPlatformIconByName } from "@/utils";
import { FaWindows } from "react-icons/fa";

const Footer: React.FC<{ locale: Locale }> = ({ locale }) => {
  const footerDetails = getFooter(locale);
  const appDownloadDetails = getAppDownload(locale);
  const ui = getUi(locale);
  return (
    <footer className="bg-hero-background text-foreground py-12">
      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link href={localePath(locale)} className="flex items-center gap-2">
            <Image src="/images/logo.png" width={140} height={70} alt="Loka Kasir" />
          </Link>
          <p className="mt-3 text-sm font-semibold text-foreground">
            {footerDetails.tagline}
          </p>
          <p className="mt-1.5 text-sm text-foreground-accent leading-relaxed">
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
          <h4 className="text-base font-semibold mb-4">{ui.footerQuickLinks}</h4>
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
                href={appDownloadDetails.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-secondary hover:underline"
              >
                <Download size={15} aria-hidden="true" /> Download Android
              </a>
            </li>
            <li>
              <Link
                href={localePath(locale, "/download/windows")}
                className="inline-flex items-center gap-1.5 font-semibold text-secondary hover:underline"
              >
                <FaWindows size={14} aria-hidden="true" /> Download Windows
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-base font-semibold mb-4">{ui.footerContact}</h4>
          <ul className="space-y-2 text-sm text-foreground-accent">
            {footerDetails.email && (
              <li>
                <a
                  href={`mailto:${footerDetails.email}`}
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail size={15} className="shrink-0" aria-hidden="true" /> {footerDetails.email}
                </a>
              </li>
            )}
            {footerDetails.telephone && (
              <li>
                <a
                  href={`tel:${footerDetails.telephone}`}
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Phone size={15} className="shrink-0" aria-hidden="true" /> {footerDetails.telephone}
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Address */}
        <div>
          <h4 className="text-base font-semibold mb-4">{ui.footerAddress}</h4>
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
            {ui.footerMapsLink}
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
            title={ui.parentServiceAlt}
            className="font-medium text-foreground-accent hover:text-secondary transition-colors"
          >
            Kreativita Sinergi
          </a>
        </p>
        <p className="mt-1">
          Dikembangkan oleh{" "}
          <a
            href="https://odhiahmad.github.io/"
            target="_blank"
            rel="noopener"
            title="Odhi Ahmad Hidayat — Full Stack Developer (Go, Flutter, React)"
            className="font-medium text-foreground-accent hover:text-secondary transition-colors"
          >
            Odhi Ahmad Hidayat
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
