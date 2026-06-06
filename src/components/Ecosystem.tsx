import React from 'react';
import { Monitor, Smartphone } from 'lucide-react';

// Aplikasi belum rilis publik di Play Store. Arahkan pengguna untuk
// mendaftar / request akses lewat web terlebih dahulu.
const REGISTER_URL = 'https://app.lokakasir.id';

const Ecosystem: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* App Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center mb-6 text-white">
                    <Smartphone size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">App Kasir: Sang Tangan</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
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
                        <li key={item} className="flex items-center gap-3 text-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                            <span className="text-sm font-medium">{item}</span>
                        </li>
                    ))}
                </ul>

                {/* Daftar via web — app belum rilis publik di Play Store */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-3">
                        Tersedia untuk Android — daftar dulu untuk request akses aplikasi di{" "}
                        <span className="font-semibold text-gray-700">app.lokakasir.id</span>
                    </p>
                    <a
                        href={REGISTER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        <Smartphone size={22} className="flex-shrink-0" />
                        <div className="text-left">
                            <div className="text-[10px] text-gray-400 leading-none">Daftar & request akses di</div>
                            <div className="text-base font-semibold leading-tight">app.lokakasir.id</div>
                        </div>
                    </a>
                </div>
            </div>

            {/* Web Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white">
                    <Monitor size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Web Admin: Sang Otak</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
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
                        <li key={item} className="flex items-center gap-3 text-gray-700">
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
