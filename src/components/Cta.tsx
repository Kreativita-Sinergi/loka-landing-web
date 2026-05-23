"use client";

import { useState } from "react";
import { ctaDetails } from "@/data/cta";

const ADMIN_WA = "6285393737313";

const steps = [
  {
    number: "1",
    title: "Daftar Akun",
    desc: "Buat akun gratis di app.lokakasir.id. Pilih paket dan selesaikan pembayaran.",
  },
  {
    number: "2",
    title: "Minta Akses App",
    desc: "Masukkan email Google akun Android Anda. Admin kami akan kirim undangan download via Firebase.",
  },
  {
    number: "3",
    title: "Login & Mulai Jualan",
    desc: "Install app dari undangan, login dengan akun Anda. Siap menerima transaksi hari ini!",
  },
];

function buildWaMessage(email: string) {
  return encodeURIComponent(
    `Halo Admin Loka 👋\n\nSaya ingin mengajukan akses download aplikasi *Loka Kasir* (Beta).\n\nEmail Google (akun Android) saya:\n📧 ${email}\n\nMohon kirimkan undangan download-nya. Terima kasih! 🙏`
  );
}

export default function CTA() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const handleRequest = () => {
    const e = email.trim();
    if (!e) return;
    window.open(`https://wa.me/${ADMIN_WA}?text=${buildWaMessage(e)}`, "_blank");
    setSent(true);
  };

  const handleDirectChat = () => {
    const msg = encodeURIComponent(
      "Halo Admin Loka 👋\n\nSaya ingin mendapatkan informasi cara download aplikasi Loka Kasir. Mohon bantuannya. Terima kasih! 🙏"
    );
    window.open(`https://wa.me/${ADMIN_WA}?text=${msg}`, "_blank");
  };

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
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={ctaDetails.dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center min-w-[220px] px-8 h-14 rounded-full font-bold text-base bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
              >
                Daftar & Mulai Gratis
              </a>

              {/* Download beta request button */}
              <button
                onClick={() => { setOpen(true); setSent(false); }}
                className="flex items-center justify-center gap-2.5 min-w-[220px] px-6 h-14 rounded-full font-semibold text-base text-gray-900 bg-white hover:bg-gray-100 transition-colors"
              >
                {/* Android icon */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="currentColor">
                  <path d="M17.523 15.341A5.98 5.98 0 0 0 18 13a5.98 5.98 0 0 0-.477-2.341l1.285-1.285a.75.75 0 1 0-1.06-1.06l-1.286 1.285A5.98 5.98 0 0 0 14 9.1V7.75a.75.75 0 0 0-1.5 0v1.116a5.974 5.974 0 0 0-2.477.433L8.737 8.013a.75.75 0 1 0-1.06 1.06l1.284 1.285A5.98 5.98 0 0 0 8.5 13c0 .827.168 1.614.477 2.341l-1.284 1.285a.75.75 0 1 0 1.06 1.06l1.285-1.285A5.974 5.974 0 0 0 12.5 16.9V18.25a.75.75 0 0 0 1.5 0v-1.116a5.974 5.974 0 0 0 2.477-.433l1.284 1.285a.75.75 0 1 0 1.061-1.06l-1.299-1.285zM10.5 13a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
                Minta Akses Android
              </button>
            </div>

            {/* Beta note */}
            <p className="mt-4 text-xs text-gray-500">
              * App Android saat ini didistribusikan via Firebase App Distribution (Beta).
              Tersedia segera di Google Play Store.
            </p>
          </div>
        </div>
      </div>

      {/* Download request modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
            {sent ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Permintaan Terkirim!</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Admin Loka akan segera mengirim undangan download ke email Google Anda.
                  Cek inbox dalam beberapa menit.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-5 w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Minta Akses Download App</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Distribusi via Firebase App Distribution — gratis untuk pengguna terdaftar
                    </p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-300 hover:text-gray-600 transition text-xl leading-none ml-3"
                  >
                    ✕
                  </button>
                </div>

                {/* Email input */}
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Email Google (akun di HP Android / Tablet Anda)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRequest()}
                  placeholder="contoh@gmail.com"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition placeholder-gray-300 mb-3"
                  autoFocus
                />

                {/* Info */}
                <div className="flex items-start gap-2 px-3 py-2.5 bg-blue-50 rounded-xl mb-5">
                  <svg className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-blue-600 leading-relaxed">
                    Gunakan email Google yang sama dengan akun di HP/tablet Android Anda.
                    Undangan download akan dikirim ke email tersebut.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleRequest}
                    disabled={!email.trim()}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition"
                  >
                    {/* WhatsApp icon */}
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Kirim Permintaan via WhatsApp
                  </button>

                  <button
                    onClick={handleDirectChat}
                    className="w-full py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-500 text-sm font-medium rounded-xl transition"
                  >
                    Chat Admin Langsung (tanpa email)
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
