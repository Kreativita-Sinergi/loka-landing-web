import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Memberdayakan pelaku usaha dengan teknologi kasir modern yang efisien dan andal.",
    quickLinks: [
        {
            text: "Fitur",
            url: "#features"
        },
        {
            text: "Harga",
            url: "#pricing"
        },
        {
            text: "Testimoni",
            url: "#testimonials"
        }
    ],
    email: 'kontak@lokakasir.id',
    telephone: '+62 853-9373-7313',
    socials: {
        instagram: 'https://www.instagram.com/lokakasir.id',
    }
}
