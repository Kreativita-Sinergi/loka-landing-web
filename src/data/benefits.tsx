import {
    FiActivity,
    FiClock,
    FiFileText,
    FiGrid,
    FiPrinter,
    FiSettings,
    FiShoppingCart,
    FiUser
} from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Tampilan POS yang Modern & Cepat",
        description: "App Kasir dirancang untuk kecepatan transaksi harian dengan pilihan tampilan yang dapat disesuaikan sesuai kebutuhan toko Anda.",
        bullets: [
            {
                title: "Grid & List View",
                description: "Gunakan Grid untuk visual produk yang jelas, atau List untuk detail SKU dan stok yang lebih lengkap.",
                icon: <FiGrid size={26} />
            },
            {
                title: "Tipe Order Fleksibel",
                description: "Dukungan penuh untuk Dine-in, Take Away, dan Delivery dalam satu aplikasi.",
                icon: <FiShoppingCart size={26} />
            }
        ],
        imageSrc: "/images/app-order-grid.png"
    },
    {
        title: "Manajemen Shift & Transparansi Kas",
        description: "Pastikan setiap rupiah tercatat dengan benar. Fitur shift kami membantu mencegah selisih kas dan memantau performa kasir.",
        bullets: [
            {
                title: "Ringkasan Kas Otomatis",
                description: "Hitung total penjualan, refund, dan aliran kas (masuk/keluar) secara otomatis per sesi.",
                icon: <FiActivity size={26} />
            },
            {
                title: "Verifikasi Kas Fisik",
                description: "Bandingkan angka sistem dengan uang fisik di laci untuk laporan yang akurat.",
                icon: <FiUser size={26} />
            }
        ],
        imageSrc: "/images/app-shift-summary.png"
    },
    {
        title: "Riwayat Transaksi & Kelola Refund",
        description: "Akses riwayat transaksi harian dengan mudah. Lakukan refund atau pembatalan transaksi langsung dari aplikasi kasir.",
        bullets: [
            {
                title: "Detail Transaksi Instan",
                description: "Lihat status lunas, nomor bill, dan waktu transaksi secara mendalam.",
                icon: <FiFileText size={26} />
            },
            {
                title: "Proses Refund Cepat",
                description: "Tangani pembatalan pesanan dengan prosedur yang tercatat rapi di sistem.",
                icon: <FiClock size={26} />
            }
        ],
        imageSrc: "/images/app-history.png"
    },
    {
        title: "Hardware & Sinkronisasi Cloud",
        description: "Hubungkan dengan berbagai perangkat pendukung dan nikmati kemudahan data yang selalu terupdate ke Web Admin.",
        bullets: [
            {
                title: "Printer Thermal Bluetooth/USB",
                description: "Cetak struk belanja secara otomatis atau manual dengan berbagai merek printer thermal.",
                icon: <FiPrinter size={26} />
            },
            {
                title: "Auto-Sync Real-time",
                description: "Data transaksi otomatis terkirim ke server. Tarik data produk terbaru hanya dengan satu tombol.",
                icon: <FiSettings size={26} />
            }
        ],
        imageSrc: "/images/app-settings.png"
    }
]
