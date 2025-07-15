import {
    FiBarChart2,
    FiBriefcase,
    FiLock,
    FiPieChart,
    FiTrendingUp,
    FiUser
} from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Pengelolaan Usaha Cerdas",
        description: "Loka Kasir membantu Anda mengelola bisnis secara efisien dan real-time, langsung dari genggaman.",
        bullets: [
            {
                title: "Laporan Otomatis",
                description: "Pantau penjualan, stok, dan performa harian dengan grafik yang mudah dipahami.",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "Analisa Pertumbuhan",
                description: "Dapatkan insight tren penjualan dan produk terlaris dengan cepat.",
                icon: <FiTrendingUp size={26} />
            }
        ],
        imageSrc: "/images/mockup-1.webp"
    },
    {
        title: "Transaksi Cepat & Mudah",
        description: "Lakukan transaksi penjualan hanya dalam beberapa detik, cocok untuk toko offline maupun online.",
        bullets: [
            {
                title: "Manajemen Produk & Stok",
                description: "Tambah, edit, dan kelola produk serta varian dengan mudah.",
                icon: <FiBriefcase size={26} />
            },
            {
                title: "Dashboard Penjualan",
                description: "Lihat performa usaha Anda dengan tampilan data yang interaktif.",
                icon: <FiPieChart size={26} />
            }
        ],
        imageSrc: "/images/mockup-2.webp"
    },
    {
        title: "Keamanan Terjamin",
        description: "Data bisnis Anda aman bersama Loka Kasir, dengan teknologi keamanan terkini.",
        bullets: [
            {
                title: "Enkripsi Data",
                description: "Semua data disimpan dan dikirim dengan standar enkripsi tinggi.",
                icon: <FiLock size={26} />
            },
            {
                title: "Login Aman",
                description: "Gunakan verifikasi biometrik seperti sidik jari atau wajah.",
                icon: <FiUser size={26} />
            },
        ],
        imageSrc: "/images/mockup-1.webp"
    }
]
