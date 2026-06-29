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
                <h3 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">Aplikasi Kasir</h3>
                <p className="text-gray-600 mb-6 leading-relaxed dark:text-gray-400">
                    Teman kerja kasir setiap hari. Transaksinya cepat, struk langsung tercetak, dan tutup shift jadi gampang.
                </p>
                <ul className="space-y-3 flex-1">
                    {[
                        "Kasir cukup login pakai PIN 4 angka",
                        "Tampilan kasir simpel, bisa mode grid atau daftar",
                        "Melayani dine-in, take away, sampai delivery",
                        "Pilihan pembayaran menyesuaikan toko Anda",
                        "Cetak struk lewat printer Bluetooth atau USB",
                        "Buka-tutup shift dan rekap kas otomatis",
                        "Layar dapur (KDS) untuk memantau pesanan masuk",
                        "Absen karyawan cukup clock-in dan clock-out",
                        "Tetap jalan walau offline, sinkron sendiri saat online",
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
                        Aplikasinya untuk Android. Chat tim kami untuk minta aplikasinya,
                        lalu daftar langsung dari aplikasi.
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
                <h3 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">Web Admin</h3>
                <p className="text-gray-600 mb-6 leading-relaxed dark:text-gray-400">
                    Tempat Anda memantau dan mengatur bisnis dari mana saja. Lihat laporan terbaru, urus stok, dan kelola karyawan.
                </p>
                <ul className="space-y-3">
                    {[
                        "Laporan keuangan yang selalu terbarui",
                        "Lihat tren penjualan lengkap dengan grafiknya",
                        "Atur produk, kategori, dan variannya",
                        "Kelola stok, bisa sekaligus banyak item",
                        "Pegang banyak outlet dari satu akun",
                        "Atur karyawan beserta hak aksesnya",
                        "Tata meja dan denah ruangan resto",
                        "Lihat riwayat transaksi dan proses refund",
                        "Atur outlet dan langganan Anda",
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
