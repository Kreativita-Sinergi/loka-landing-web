"use client"
import { useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BiMinus, BiPlus } from "react-icons/bi";

import SectionTitle from "./SectionTitle";
import { faqs } from "@/data/faq";

const FAQ: React.FC = () => {
    const categories = ["Semua", ...Array.from(new Set(faqs.map(f => f.category).filter(Boolean)))] as string[];
    const [active, setActive] = useState("Semua");

    const filtered = active === "Semua"
        ? faqs
        : faqs.filter(f => f.category === active);

    return (
        <section id="faq" className="py-10 lg:py-20">
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="text-center">
                    <p className="text-foreground-accent text-sm mb-2">Pertanyaan Umum</p>
                    <SectionTitle>
                        <h2 className="my-3 !leading-snug">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                    </SectionTitle>
                    <p className="text-foreground-accent max-w-xl mx-auto">
                        Panduan lengkap cara kerja Loka Kasir — dari setup awal hingga laporan harian.
                        Masih ada pertanyaan?{" "}
                        <a href="mailto:help@lokakasir.id" className="text-secondary font-semibold hover:underline">
                            help@lokakasir.id
                        </a>
                    </p>
                </div>

                {/* Category tabs */}
                {categories.length > 1 && (
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActive(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                                    active === cat
                                        ? "bg-secondary text-white border-secondary"
                                        : "bg-transparent text-foreground-accent border-foreground-accent/30 hover:border-secondary hover:text-secondary"
                                }`}
                            >
                                {cat}
                                {cat !== "Semua" && (
                                    <span className="ml-1.5 opacity-60 text-xs">
                                        ({faqs.filter(f => f.category === cat).length})
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* FAQ list */}
                <div className="w-full max-w-3xl mx-auto border-b">
                    {filtered.map((faq, index) => (
                        <div key={`${active}-${index}`} className="mb-5">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <DisclosureButton className="flex items-start justify-between w-full px-4 pt-6 text-left border-t gap-4">
                                            <span className="text-lg font-semibold leading-snug">{faq.question}</span>
                                            <span className="mt-1 shrink-0">
                                                {open
                                                    ? <BiMinus className="w-5 h-5 text-secondary" />
                                                    : <BiPlus className="w-5 h-5 text-secondary" />
                                                }
                                            </span>
                                        </DisclosureButton>
                                        <DisclosurePanel className="px-4 pt-3 pb-2 text-foreground-accent leading-relaxed whitespace-pre-line">
                                            {faq.answer}
                                        </DisclosurePanel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <p className="text-center text-foreground-accent py-10">
                            Tidak ada pertanyaan di kategori ini.
                        </p>
                    )}
                </div>

                {/* Footer CTA */}
                <p className="text-center text-foreground-accent text-sm">
                    Tidak menemukan jawaban yang Anda cari?{" "}
                    <a href="mailto:help@lokakasir.id" className="text-secondary font-semibold hover:underline">
                        Hubungi tim support kami
                    </a>
                </p>
            </div>
        </section>
    );
};

export default FAQ;
