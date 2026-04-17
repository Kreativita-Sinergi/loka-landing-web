import React from 'react';
import { Monitor, Smartphone } from 'lucide-react';

const Ecosystem: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* App Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center mb-6 text-white">
                    <Smartphone size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">App Kasir: Sang Tangan</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Alat tempur harian di toko. Proses transaksi kilat, cetak struk otomatis, dan manajemen shift yang akurat.
                </p>
                <ul className="space-y-3">
                    {[
                        "Login PIN 4-Digit Cepat per Kasir",
                        "Tampilan POS Modern — Grid & List View",
                        "Multi Tipe Order: Dine-in, Take Away, Delivery",
                        "Pembayaran Tunai, Non-Tunai & Split",
                        "Cetak Struk Printer Bluetooth / USB",
                        "Manajemen Shift Kasir & Rekap Kas Otomatis",
                        "Kitchen Display System (KDS) untuk Dapur",
                        "E-receipt Otomatis via WhatsApp",
                        "Offline Mode & Auto-Sync ke Cloud",
                    ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                            <span className="text-sm font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
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
