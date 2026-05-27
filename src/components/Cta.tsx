"use client";

import { useState } from "react";
import { ctaDetails } from "@/data/cta";

const ADMIN_EMAIL = "admin@lokakasir.id";

const steps = [
  {
    number: "1",
    title: "Daftar Akun",
    desc: "Buat akun gratis di app.lokakasir.id. Verifikasi email dan mulai trial 14 hari.",
  },
  {
    number: "2",
    title: "Minta Akses App",
    desc: "Masukkan email Google akun Android Anda yang terdaftar di smartphone atau tablet. Email bisa lebih dari satu.",
  },
  {
    number: "3",
    title: "Install & Mulai Jualan",
    desc: "Terima undangan Google Play, install app, login dengan akun Anda. Siap menerima transaksi hari ini!",
  },
];

function buildMailtoLink(emails: string[]) {
  const filled = emails.map((e) => e.trim()).filter(Boolean);
  const emailList = filled.map((e, i) => `  ${i + 1}. ${e}`).join("\n");
  const subject = encodeURIComponent("Permintaan Akses Aplikasi Loka Kasir");
  const body = encodeURIComponent(
    `Halo Admin Loka,\n\nSaya ingin mengajukan akses download aplikasi Loka Kasir.\n\nEmail Google (akun Android) yang digunakan:\n${emailList}\n\nMohon kirimkan undangan Google Play-nya. Terima kasih!`
  );
  return `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
}

export default function CTA() {
  const [emails, setEmails] = useState<string[]>([""]);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const updateEmail = (index: number, value: string) => {
    setEmails((prev) => prev.map((e, i) => (i === index ? value : e)));
  };

  const addEmail = () => {
    if (emails.length < 5) setEmails((prev) => [...prev, ""]);
  };

  const removeEmail = (index: number) => {
    if (emails.length === 1) return;
    setEmails((prev) => prev.filter((_, i) => i !== index));
  };

  const hasValidEmail = emails.some((e) => e.trim() !== "");

  const handleRequest = () => {
    if (!hasValidEmail) return;
    window.open(buildMailtoLink(emails), "_blank");
    setSent(true);
  };

  const handleDirectEmail = () => {
    const subject = encodeURIComponent("Info Cara Download Aplikasi Loka Kasir");
    const body = encodeURIComponent(
      "Halo Admin Loka,\n\nSaya ingin mendapatkan informasi cara download aplikasi Loka Kasir. Mohon bantuannya. Terima kasih!"
    );
    window.open(`mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`, "_blank");
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

              {/* Download request button */}
              <button
                onClick={() => { setOpen(true); setSent(false); setEmails([""]); }}
                className="flex items-center justify-center gap-2.5 min-w-[220px] px-6 h-14 rounded-full font-semibold text-base text-gray-900 bg-white hover:bg-gray-100 transition-colors"
              >
                {/* Android icon */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="currentColor">
                  <path d="M17.523 15.341A5.98 5.98 0 0 0 18 13a5.98 5.98 0 0 0-.477-2.341l1.285-1.285a.75.75 0 1 0-1.06-1.06l-1.286 1.285A5.98 5.98 0 0 0 14 9.1V7.75a.75.75 0 0 0-1.5 0v1.116a5.974 5.974 0 0 0-2.477.433L8.737 8.013a.75.75 0 1 0-1.06 1.06l1.284 1.285A5.98 5.98 0 0 0 8.5 13c0 .827.168 1.614.477 2.341l-1.284 1.285a.75.75 0 1 0 1.06 1.06l1.285-1.285A5.974 5.974 0 0 0 12.5 16.9V18.25a.75.75 0 0 0 1.5 0v-1.116a5.974 5.974 0 0 0 2.477-.433l1.284 1.285a.75.75 0 1 0 1.061-1.06l-1.299-1.285zM10.5 13a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
                Minta Akses Android
              </button>
            </div>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Email Siap Terkirim!</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Aplikasi email Anda terbuka dengan pesan yang sudah terisi.
                  Kirim email tersebut dan admin Loka akan segera memproses permintaan Anda.
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
                    <h3 className="text-base font-bold text-gray-900">Minta Akses Aplikasi</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Akses via Google Play — tersedia untuk pengguna terdaftar
                    </p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-300 hover:text-gray-600 transition text-xl leading-none ml-3"
                  >
                    ✕
                  </button>
                </div>

                {/* Email inputs */}
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  Email Google (akun di smartphone / tablet Android Anda)
                </label>

                <div className="space-y-2 mb-3">
                  {emails.map((email, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => updateEmail(index, e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && index === emails.length - 1 && addEmail()}
                        placeholder="contoh@gmail.com"
                        className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition placeholder-gray-300"
                        autoFocus={index === 0}
                      />
                      {emails.length > 1 && (
                        <button
                          onClick={() => removeEmail(index)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition flex-shrink-0"
                          title="Hapus email ini"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {emails.length < 5 && (
                  <button
                    onClick={addEmail}
                    className="flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-700 font-medium mb-4 transition"
                  >
                    <span className="text-base leading-none">+</span>
                    Tambah email lain
                  </button>
                )}

                {/* Info */}
                <div className="flex items-start gap-2 px-3 py-2.5 bg-blue-50 rounded-xl mb-5">
                  <svg className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-blue-600 leading-relaxed">
                    Pastikan email yang dimasukkan adalah email Google yang terdaftar di smartphone atau tablet Android Anda. Undangan Google Play akan dikirim ke email tersebut.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleRequest}
                    disabled={!hasValidEmail}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Kirim Permintaan via Email
                  </button>

                  <button
                    onClick={handleDirectEmail}
                    className="w-full py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-500 text-sm font-medium rounded-xl transition"
                  >
                    Hubungi Admin Langsung (tanpa isi form)
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
