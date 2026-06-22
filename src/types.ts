import React from "react";

export interface IMenuItem {
    text: string;
    url: string;
}

export interface IBenefit {
    title: string;
    description: string;
    imageSrc: string;
    bullets: IBenefitBullet[]
}

export interface IBenefitBullet {
    title: string;
    description: string;
    icon: React.JSX.Element;
}

export interface IPricing {
    name: string;
    price: number | string;
    period?: string;
    /** Harga tahunan (opsional). Bila diisi, ditampilkan sebagai alternatif hemat. */
    priceAnnual?: number;
    /** Satuan harga tahunan, mis. "per tahun" atau "per outlet / tahun". */
    periodAnnual?: string;
    /** Catatan hemat untuk paket tahunan, mis. "Hemat 2 bulan". */
    annualNote?: string;
    badge?: string;
    description?: string;
    features: string[];
    ctaLabel?: string;
    ctaUrl?: string;
}

export interface IFAQ {
    question: string;
    answer: string;
    category?: string;
}

export interface ITestimonial {
    name: string;
    role: string;
    message: string;
    avatar: string;
}

export interface IStats {
    title: string;
    icon: React.JSX.Element;
    description: string;
}

export interface ISocials {
    facebook?: string;
    github?: string;
    instagram?: string;
    linkedin?: string;
    threads?: string;
    twitter?: string;
    youtube?: string;
    x?: string;
    [key: string]: string | undefined;
}
