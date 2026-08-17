import type { Metadata } from "next";
import Link from "next/link";

import { siteDetails } from "@/data/siteDetails";
import {
  appDownloadDetails,
  windowsDirectDownload,
  windowsDownloadDetails,
} from "@/data/cta";
import WindowsDownloadLink from "@/components/WindowsDownloadLink";
import WingetCommand from "@/components/WingetCommand";

export const metadata: Metadata = {
  title: `Download untuk Windows — ${siteDetails.siteName}`,
  description:
    "Cara memasang aplikasi kasir Loka Kasir di PC atau laptop Windows 10/11 — lewat Microsoft Store atau perintah winget. Ringan, unduhan hanya ±30 MB. Gratis 30 hari pertama.",
  alternates: {
    canonical: `${siteDetails.siteUrl}/download/windows`,
  },
};

// Angka di bawah diambil dari pemakaian nyata build rilis Windows: unduhan
// ~30 MB dan sekitar 200 MB RAM saat aplikasi dipakai. Sengaja tidak
// dibesar-besarkan supaya pemilik toko dengan PC lama tidak mengurungkan niat.
const requirements = [
  "Windows 10 versi 1809 (Oktober 2018) ke atas, atau Windows 11",
  "Prosesor 64-bit (x64) — RAM 2 GB sudah cukup",
  "Ruang kosong sekitar 150 MB (file unduhannya hanya ±30 MB)",
  "Koneksi internet untuk sinkronisasi (transaksi tetap jalan saat offline)",
];

const steps = [
  {
    title: "Buka halaman Loka Kasir di Microsoft Store",
    detail:
      "Klik tombol di atas. Browser akan menawarkan untuk membuka aplikasi Microsoft Store — pilih Buka.",
  },
  {
    title: "Tekan Get / Install",
    detail:
      "Microsoft Store mengunduh dan memasang aplikasinya sendiri. Anda tidak perlu hak akses administrator.",
  },
  {
    title: "Login, atau daftar bila belum punya akun",
    detail:
      "Buka Loka Kasir dari Start Menu lalu login. Belum punya akun? Anda bisa mendaftar gratis di dalam aplikasi maupun lewat browser di app.lokakasir.id — 30 hari pertama gratis dengan akses penuh.",
  },
];

export default function WindowsDownloadPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-blue-600 mb-2 dark:text-blue-400">
            Loka Kasir untuk Windows
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-white">
            Download aplikasi kasir untuk PC &amp; laptop
          </h1>
          <p className="text-gray-600 leading-relaxed dark:text-gray-400">
            Aplikasi kasir yang sama seperti versi Android, dijalankan di layar besar
            PC atau laptop Windows. Data dan akunnya sama — kasir bisa pindah
            perangkat tanpa setup ulang.
          </p>

          {/* Angka ringan ditonjolkan — banyak PC kasir masih spek lama */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { value: "±30 MB", label: "Ukuran unduhan" },
              { value: "±200 MB", label: "Pemakaian RAM" },
              { value: "RAM 2 GB", label: "Sudah cukup" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-100 px-3 py-3 text-center dark:border-surface-border"
              >
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Ringan, jadi tetap lancar di PC atau laptop lama yang biasa dipakai di
            toko.
          </p>
        </div>

        {/* Tombol utama: Microsoft Store */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-surface-border dark:bg-surface">
          <WindowsDownloadLink
            source="download-page"
            variant="button"
            className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
          />
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            {windowsDownloadDetails.note} · Gratis 30 hari pertama
          </p>
        </div>

        {/* Cara pasang */}
        <h2 className="mt-12 mb-5 text-xl font-bold text-gray-900 dark:text-white">
          Cara memasang
        </h2>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* winget — jalur tanpa membuka Store, praktis untuk banyak PC */}
        <h2 className="mt-12 mb-3 text-xl font-bold text-gray-900 dark:text-white">
          Pasang lewat winget
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Kalau Anda memasang di banyak PC sekaligus, jalankan perintah ini di
          PowerShell atau Command Prompt. Aplikasinya terpasang dari sumber yang
          sama dengan Microsoft Store, jadi pembaruannya tetap otomatis.
        </p>
        <WingetCommand command={windowsDownloadDetails.wingetCommand} />

        {/* Unduhan file langsung — hanya tampil bila filenya sudah di-host */}
        {windowsDirectDownload && (
          <>
            <h2 className="mt-12 mb-3 text-xl font-bold text-gray-900 dark:text-white">
              Download file langsung
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Untuk PC yang Microsoft Store-nya dimatikan oleh admin. Versi ini tidak
              mendapat pembaruan otomatis — Anda perlu mengunduh ulang saat ada versi
              baru.
            </p>
            <a
              href={windowsDirectDownload.url}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:border-surface-border dark:text-white dark:hover:bg-white/5"
            >
              {windowsDirectDownload.fileLabel} · v{windowsDirectDownload.version} ·{" "}
              {windowsDirectDownload.size}
            </a>
          </>
        )}

        {/* Kebutuhan sistem */}
        <h2 className="mt-12 mb-3 text-xl font-bold text-gray-900 dark:text-white">
          Kebutuhan sistem
        </h2>
        <ul className="space-y-2">
          {requirements.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
              {item}
            </li>
          ))}
        </ul>

        {/* Platform lain */}
        <div className="mt-12 rounded-2xl border border-gray-100 p-6 dark:border-surface-border">
          <p className="font-semibold text-gray-900 dark:text-white">
            Pakai HP atau tablet?
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Versi Android tersedia gratis di Google Play, dengan akun yang sama.
          </p>
          <a
            href={appDownloadDetails.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            {appDownloadDetails.label} →
          </a>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            ← Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
