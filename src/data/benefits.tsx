import {
    FiActivity,
    FiClock,
    FiFileText,
    FiGrid,
    FiLayers,
    FiPrinter,
    FiSettings,
    FiShield,
    FiShoppingCart,
    FiUsers,
    FiUserCheck,
    FiWifi,
} from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Tampilan POS yang Modern & Cepat",
        description: "Dirancang untuk kecepatan transaksi harian. Kasir bisa melayani lebih banyak pelanggan tanpa antrian panjang.",
        bullets: [
            {
                title: "Grid & List View Produk",
                description: "Tampilkan produk dalam Grid bergambar untuk visual yang menarik, atau List untuk detail SKU dan stok yang lebih lengkap.",
                icon: <FiGrid size={26} />
            },
            {
                title: "Tipe Order: Dine-in, Take Away & Delivery",
                description: "Satu aplikasi untuk semua jenis layanan. Pisahkan pesanan meja, bawa pulang, dan delivery tanpa ribet.",
                icon: <FiShoppingCart size={26} />
            },
            {
                title: "Pembayaran Split & Multi-Metode",
                description: "Terima pembayaran tunai dan non-tunai sekaligus dalam satu transaksi — cocok untuk pelanggan yang bayar patungan.",
                icon: <FiLayers size={26} />
            },
        ],
        imageSrc: "/images/app-order-grid.png"
    },
    {
        title: "Manajemen Shift, Kas & Absensi Karyawan",
        description: "Tidak ada lagi selisih kas yang membingungkan. Setiap rupiah tercatat otomatis dari buka hingga tutup toko — dan kehadiran karyawan terpantau langsung.",
        bullets: [
            {
                title: "Rekap Kas Otomatis per Shift",
                description: "Total penjualan, refund, kas masuk, dan kas keluar dihitung otomatis. Bandingkan dengan uang fisik di laci untuk laporan yang akurat.",
                icon: <FiActivity size={26} />
            },
            {
                title: "Multi-Kasir, Satu Akun",
                description: "Tetapkan PIN unik untuk setiap kasir. Lacak performa dan aktivitas setiap karyawan secara terpisah.",
                icon: <FiUsers size={26} />
            },
            {
                title: "Absensi Karyawan (Clock-in / Clock-out)",
                description: "Tablet kasir berfungsi ganda sebagai kiosk absensi. Karyawan cukup memilih nama dan memasukkan PIN untuk mencatat kehadiran — tanpa aplikasi tambahan.",
                icon: <FiUserCheck size={26} />
            },
            {
                title: "Verifikasi PIN Supervisor",
                description: "Tindakan sensitif seperti void transaksi membutuhkan persetujuan supervisor — keamanan berlapis tanpa birokrasi.",
                icon: <FiShield size={26} />
            },
        ],
        imageSrc: "/images/app-shift-summary.png"
    },
    {
        title: "Riwayat Transaksi Lengkap & Kelola Refund",
        description: "Temukan transaksi mana pun dalam hitungan detik. Proses refund dan pembatalan dengan prosedur yang tercatat rapi.",
        bullets: [
            {
                title: "Cari & Filter Transaksi Instan",
                description: "Cari berdasarkan nomor bill, nama pelanggan, atau status pembayaran. Semua riwayat tersimpan dan bisa difilter kapan saja.",
                icon: <FiFileText size={26} />
            },
            {
                title: "Proses Refund & Void Terpandu",
                description: "Tangani pengembalian uang dan pembatalan pesanan dengan alur yang jelas, disertai catatan alasan untuk audit.",
                icon: <FiClock size={26} />
            },
        ],
        imageSrc: "/images/app-history.png"
    },
    {
        title: "Hardware Siap & Cloud Selalu Terkini",
        description: "Hubungkan perangkat pendukung dalam menit. Data tersinkronisasi otomatis sehingga Web Admin selalu menampilkan kondisi terkini.",
        bullets: [
            {
                title: "Printer Thermal Bluetooth / USB",
                description: "Cetak struk otomatis setelah transaksi selesai. Mendukung berbagai merek dan ukuran kertas printer thermal populer.",
                icon: <FiPrinter size={26} />
            },
            {
                title: "Sinkronisasi Real-time & Offline Mode",
                description: "Internet terputus? Kasir tetap jalan. Data tersinkronisasi otomatis ke server begitu koneksi kembali.",
                icon: <FiWifi size={26} />
            },
            {
                title: "Pengaturan Terpusat dari Web Admin",
                description: "Atur menu, harga, promo, dan karyawan langsung dari browser — perubahan langsung tampil di semua perangkat kasir.",
                icon: <FiSettings size={26} />
            },
        ],
        imageSrc: "/images/app-settings.png"
    }
]
