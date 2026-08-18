import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Monitor, Smartphone, Download } from 'lucide-react';
import { getAppDownload } from '@/data/cta';
import { getWebAdmin } from '@/data/webAdmin';
import { getUi } from '@/data/ui';
import WindowsDownloadLink from './WindowsDownloadLink';
import type { Locale } from "@/data/localized";
import { getEcosystem } from '@/data/ecosystem';
import { localePath } from '@/data/localized';

// Aplikasi sudah rilis di Google Play Store (Android) dan Microsoft Store
// (Windows). Pendaftaran akun bisa dilakukan di web maupun di aplikasi, jadi
// kartu ini hanya bicara soal pemasangan dan login.

const Ecosystem: React.FC<{ locale: Locale }> = ({ locale }) => {
  const appDownloadDetails = getAppDownload(locale);
  const webAdminDetails = getWebAdmin(locale);
  const ui = getUi(locale);
  const eco = getEcosystem(locale);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* App Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col dark:bg-surface dark:border-surface-border dark:shadow-black/30">
                <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center mb-6 text-white dark:bg-white/10">
                    <Smartphone size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">{eco.app.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed dark:text-gray-400">{eco.app.description}</p>
                <ul className="space-y-3 flex-1">
                    {eco.app.bullets.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                            <span className="text-sm font-medium">{item}</span>
                        </li>
                    ))}
                </ul>

                {/* Download dari Play Store / Microsoft Store */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-surface-border">
                    <p className="text-xs text-gray-500 mb-3 dark:text-gray-400">{eco.app.note}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href={appDownloadDetails.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            <Download size={22} className="flex-shrink-0" />
                            <div className="text-left">
                                <div className="text-[10px] text-white/70 leading-none">{ui.ecosystemDownloadOn}</div>
                                <div className="text-base font-semibold leading-tight">Google Play Store</div>
                            </div>
                        </a>
                        <WindowsDownloadLink
                          locale={locale}
                            source="ecosystem"
                            variant="button"
                            label="Microsoft Store"
                            className="h-auto py-3 px-5 text-base bg-gray-900 text-white hover:bg-gray-800 dark:bg-white/10 dark:hover:bg-white/20"
                        />
                    </div>
                </div>
            </div>

            {/* Web Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow dark:bg-surface dark:border-surface-border dark:shadow-black/30">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white">
                    <Monitor size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">{eco.web.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed dark:text-gray-400">{eco.web.description}</p>
                <ul className="space-y-3">
                    {eco.web.bullets.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                            <span className="text-sm font-medium">{item}</span>
                        </li>
                    ))}
                </ul>

                {/* Web Admin tidak diunduh, jadi kartunya perlu jalan masuk
                    sendiri — tanpa ini bagian pemilik terasa cuma pelengkap */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-surface-border">
                    <p className="text-xs text-gray-500 mb-3 dark:text-gray-400">{eco.web.note}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href={webAdminDetails.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                            {eco.openWebAdmin}
                            <ExternalLink size={15} aria-hidden="true" />
                        </a>
                        <Link
                            href={localePath(locale, "/web-admin")}
                            className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-900 px-5 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors dark:border-surface-border dark:text-white dark:hover:bg-white/5"
                        >
                            {eco.seeFeatures}
                            <ArrowRight size={15} aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ecosystem;
