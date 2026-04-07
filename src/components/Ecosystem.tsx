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
                <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span className="text-sm font-medium">Login PIN 4-Digit Cepat</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span className="text-sm font-medium">Offline Mode & Auto-Sync</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span className="text-sm font-medium">Cetak Struk Bluetooth/USB</span>
                    </li>
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
                <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span className="text-sm font-medium">Analitik Laporan Mendalam</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span className="text-sm font-medium">Manajemen Produk & Stok Massal</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span className="text-sm font-medium">Multi Outlet & Role Karyawan</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Ecosystem;
