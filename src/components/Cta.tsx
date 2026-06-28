"use client";

import { Mail, MessageCircle } from "lucide-react";
import { FiInstagram } from "react-icons/fi";
import { appRequestDetails, ctaDetails, supportDetails } from "@/data/cta";
import { trackContactClick } from "@/utils/analytics";

const appRequestWaLink = `https://wa.me/${appRequestDetails.whatsapp}?text=${encodeURIComponent(
  appRequestDetails.whatsappMessage
)}`;

const steps = [
  {
    number: "1",
    title: "Minta Aplikasi",
    desc: "Hubungi tim Loka Kasir via WhatsApp untuk meminta aplikasinya.",
  },
  {
    number: "2",
    title: "Daftar di Aplikasi",
    desc: "Buka aplikasi, buat akun gratis langsung di HP/tablet Anda, dan mulai trial 14 hari.",
  },
  {
    number: "3",
    title: "Mulai Jualan",
    desc: "Login dan langsung terima transaksi hari itu juga — tanpa komitmen.",
  },
];

export default function CTA() {
  return (
    <section id="cta" className="mt-10 mb-5 lg:my-20">
      <div className="relative h-full w-full z-10 mx-auto py-12 sm:py-20">
        <div className="h-full w-full">
          <div className="rounded-3xl opacity-95 absolute inset-0 -z-10 h-full w-full bg-[#050a02] bg-[linear-gradient(to_right,#12170f_1px,transparent_1px),linear-gradient(to_bottom,#12170f_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="rounded-3xl absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_500px,#1C1C02,transparent)]" />
          </div>

          <div className="h-full flex flex-col items-center justify-center text-white text-center px-5">
            <h2 className="text-2xl sm:text-3xl md:text-5xl md:leading-tight font-semibold mb-4 max-w-2xl">
              {ctaDetails.heading}
            </h2>

            <p className="mx-auto max-w-xl md:px-5 text-gray-300">
              {ctaDetails.subheading}
            </p>

            {/* 3-step flow */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="flex flex-col items-center text-center relative"
                >
                  {i < steps.length - 1 && (
                    <div className="hidden sm:block absolute top-5 left-[calc(50%+24px)] right-[-calc(50%-24px)] h-px bg-white/20 w-[calc(100%-48px)]" />
                  )}
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm mb-3 flex-shrink-0 z-10">
                    {step.number}
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-2xl mx-auto">
              <a
                href={appRequestWaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick("whatsapp", "cta")}
                className="flex items-center justify-center gap-2 w-full sm:flex-1 px-8 h-14 rounded-full font-bold text-base leading-none bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                <MessageCircle size={18} className="flex-shrink-0 relative -top-px" /> Minta Aplikasi via WhatsApp
              </a>
              <a
                href={ctaDetails.dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full sm:flex-1 px-8 h-14 rounded-full font-bold text-base leading-none bg-white/10 text-white border border-white/30 hover:bg-white/20 transition-colors"
              >
                Login
              </a>
            </div>

            {/* Support / bantuan admin */}
            <div className="mt-12 w-full max-w-2xl rounded-2xl border border-white/15 bg-white/5 px-6 py-6 text-center">
              <p className="text-base font-semibold text-white">
                {supportDetails.heading}
              </p>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-300">
                {supportDetails.message}
              </p>
              <div className="mt-5 flex flex-col gap-3 max-w-sm mx-auto">
                <a
                  href={`https://wa.me/${supportDetails.whatsapp}?text=${encodeURIComponent(
                    supportDetails.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactClick("whatsapp", "support")}
                  className="flex items-center justify-start gap-3 w-full px-6 h-12 rounded-full font-semibold text-sm leading-none whitespace-nowrap bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  <MessageCircle size={16} className="flex-shrink-0 relative -top-px" />
                  WhatsApp
                </a>
                <a
                  href={`https://ig.me/m/${supportDetails.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactClick("instagram", "support")}
                  className="flex items-center justify-start gap-3 w-full px-6 h-12 rounded-full font-semibold text-sm leading-none whitespace-nowrap text-white bg-pink-600 hover:bg-pink-700 transition-colors"
                >
                  <FiInstagram size={16} className="flex-shrink-0 relative -top-px" />
                  Instagram
                </a>
                <a
                  href={`mailto:${supportDetails.email}`}
                  className="flex items-center justify-start gap-3 w-full px-6 h-12 rounded-full font-semibold text-sm leading-none whitespace-nowrap bg-white/10 text-white border border-white/30 hover:bg-white/20 transition-colors"
                >
                  <Mail size={16} className="flex-shrink-0 relative -top-px" />
                  {supportDetails.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
