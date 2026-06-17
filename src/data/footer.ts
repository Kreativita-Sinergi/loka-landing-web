import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    address: string;
    socials: ISocials;
} = {
    subheading: "Memberdayakan pelaku UMKM dengan teknologi kasir modern yang efisien, andal, dan terjangkau.",
    quickLinks: [
        { text: "Fitur", url: "#features" },
        { text: "Ekosistem", url: "#ecosystem" },
        { text: "Harga", url: "#pricing" },
        { text: "Testimoni", url: "#testimonials" },
        { text: "FAQ", url: "#faq" },
        { text: "Kreativita Sinergi", url: "#kreativita" },
        { text: "Kebijakan Privasi", url: "/privacy-policy" },
    ],
    email: 'help@lokakasir.id',
    telephone: '+62 853-9373-7313',
    address: 'Jl. Air Camar No. 24, RT 5/RW 007, Kel. Parak Gadang Timur, Kec. Padang Timur, Kota Padang, Sumatera Barat, Indonesia',
    socials: {
        instagram: 'https://www.instagram.com/lokakasir.id',
    }
}
