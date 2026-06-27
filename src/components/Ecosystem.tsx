import React from 'react';
import { Monitor, Smartphone, MessageCircle } from 'lucide-react';
import { appRequestDetails } from '@/data/cta';

// Aplikasi belum rilis publik di Play Store. Pendaftaran kini dilakukan langsung
// di aplikasi — arahkan pengguna menghubungi tim untuk meminta aplikasinya.
const appRequestWaLink = `https://wa.me/${appRequestDetails.whatsapp}?text=${encodeURIComponent(
    appRequestDetails.whatsappMessage,
)}`;

const Ecosystem: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* App Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col dark:bg-surface dark:border-surface-border dark:shadow-black/30">
                <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center mb-6 text-white dark:bg-white/10">
                    <Smartphone size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">App Kasir: Sang Tangan</h3>
                <p className="text-gray-600 mb-6 leading-relaxed dark:text-gray-400">
                    Alat tempur harian di toko. Proses transaksi kilat, cetak struk otomatis, dan manajemen shift yang akurat.
                </p>
                <ul className="space-y-3 flex-1">
                    {[
                        "Login PIN 4-Digit Cepat per Kasir",
                        "Tampilan POS Modern — Grid & List View",
                        "Multi Tipe Order: Dine-in, Take Away, Delivery",
                        "Metode Pembayaran Sesuai Konfigurasi Bisnis",
                        "Cetak Struk Printer Bluetooth / USB",
                        "Manajemen Shift Kasir & Rekap Kas Otomatis",
                        "Kitchen Display System (KDS) untuk Dapur",
                        "Absensi Karyawan — Kiosk Clock-in / Clock-out",
                        "Offline Mode & Auto-Sync ke Cloud",
                    ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                            <span className="text-sm font-medium">{item}</span>
                        </li>
                    ))}
                </ul>

                {/* Minta aplikasi via WhatsApp — pendaftaran dilakukan di dalam aplikasi */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-surface-border">
                    <p className="text-xs text-gray-500 mb-3 dark:text-gray-400">
                        Tersedia untuk Android — hubungi tim kami untuk meminta aplikasinya,
                        lalu daftar langsung di dalam aplikasi.
                    </p>
                    <a
                        href={appRequestWaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-xl hover:bg-[#1ebe57] transition-colors"
                    >
                        <MessageCircle size={22} className="flex-shrink-0" />
                        <div className="text-left">
                            <div className="text-[10px] text-white/70 leading-none">Minta aplikasi via</div>
                            <div className="text-base font-semibold leading-tight">WhatsApp</div>
                        </div>
                    </a>
                </div>
            </div>

            {/* Web Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow dark:bg-surface dark:border-surface-border dark:shadow-black/30">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white">
                    <Monitor size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">Web Admin: Sang Otak</h3>
                <p className="text-gray-600 mb-6 leading-relaxed dark:text-gray-400">
                    Pusat kendali bisnis Anda. Pantau laporan real-time, kelola inventori, dan atur karyawan dari mana saja.
                </p>
                <ul className="space-y-3">
                    {[
                        "Dashboard Laporan Keuangan Real-time",
                        "Analitik Penjualan Mendalam & Grafik",
                        "Manajemen Produk, Kategori & Varian",
                        "Kelola Stok & Inventori Massal",
                        "Multi-Outlet dari Satu Akun",
                        "Manajemen Karyawan & Hak Akses Role",
                        "Kelola Meja & Denah Restoran",
                        "Riwayat Transaksi & Manajemen Refund",
                        "Pengaturan Outlet & Langganan",
                    ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                            <span className="text-sm font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Ecosystem;
