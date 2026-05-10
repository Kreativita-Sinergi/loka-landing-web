import React from 'react';
import { Monitor, Smartphone } from 'lucide-react';

const PLAY_STORE_URL =
    'https://play.google.com/store/apps/details?id=com.lokakasir.app';

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

                {/* Play Store download */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-3">
                        Tersedia di Android — download setelah mendaftar dan login di{" "}
                        <span className="font-semibold text-gray-700">app.lokakasir.id</span>
                    </p>
                    <a
                        href={PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        {/* Google Play icon */}
                        <svg viewBox="30 336.7 120.9 129.2" className="w-6 h-6 flex-shrink-0">
                            <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z" />
                            <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z" />
                            <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z" />
                            <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z" />
                        </svg>
                        <div className="text-left">
                            <div className="text-[10px] text-gray-400 leading-none">Unduh di</div>
                            <div className="text-base font-semibold leading-tight">Google Play</div>
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
