"use client"
import { useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BiMinus, BiPlus } from "react-icons/bi";

import SectionTitle from "./SectionTitle";
import { getFaqs } from "@/data/faq";
import { getUi } from "@/data/ui";
import type { Locale } from "@/data/localized";

const FAQ: React.FC<{ locale: Locale }> = ({ locale }) => {
  const faqs = getFaqs(locale);
  const ui = getUi(locale);
    const categories = [ui.faqFilterAll, ...Array.from(new Set(faqs.map(f => f.category).filter(Boolean)))] as string[];
    const [active, setActive] = useState(ui.faqFilterAll);

    const filtered = active === ui.faqFilterAll
        ? faqs
        : faqs.filter(f => f.category === active);

    return (
        <section id="faq" className="py-10 lg:py-20">
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="text-center">
                    <p className="text-foreground-accent text-sm mb-2">{ui.faqHeading}</p>
                    <SectionTitle>
                        <h2 className="my-3 !leading-snug">
                            {ui.faqTitle}
                        </h2>
                    </SectionTitle>
                    <p className="text-foreground-accent max-w-xl mx-auto">
                        {ui.faqLeadBefore}
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
                                aria-pressed={active === cat}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                                    active === cat
                                        ? "bg-secondary text-white border-secondary"
                                        : "bg-transparent text-foreground-accent border-foreground-accent/30 hover:border-secondary hover:text-secondary"
                                }`}
                            >
                                {cat}
                                {cat !== ui.faqFilterAll && (
                                    <span className="ml-1.5 opacity-60 text-xs">
                                        ({faqs.filter(f => f.category === cat).length})
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* FAQ list */}
                {filtered.length === 0 ? (
                    <p className="text-center text-foreground-accent py-10">
                        Tidak ada pertanyaan di kategori ini.
                    </p>
                ) : (
                    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10">
                        {[0, 1].map(col => (
                            <div key={col} className="border-b border-gray-200 dark:border-surface-border">
                                {filtered
                                    .filter((_, i) => i % 2 === col)
                                    .map((faq, index) => (
                                        <div key={`${active}-${col}-${index}`}>
                                            <Disclosure>
                                                {({ open }) => (
                                                    <>
                                                        <DisclosureButton className="flex items-start justify-between w-full px-4 pt-5 pb-1 text-left border-t border-gray-200 dark:border-surface-border gap-4">
                                                            <span className="text-base font-semibold leading-snug">{faq.question}</span>
                                                            <span className="mt-0.5 shrink-0">
                                                                {open
                                                                    ? <BiMinus className="w-4 h-4 text-secondary" />
                                                                    : <BiPlus className="w-4 h-4 text-secondary" />
                                                                }
                                                            </span>
                                                        </DisclosureButton>
                                                        <DisclosurePanel className="px-4 pt-2 pb-4 text-sm text-foreground-accent leading-relaxed whitespace-pre-line">
                                                            {faq.answer}
                                                        </DisclosurePanel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer CTA */}
                <p className="text-center text-foreground-accent text-sm">
                    Tidak menemukan jawaban yang Anda cari?{" "}
                    <a href="mailto:help@lokakasir.id" className="text-secondary font-semibold hover:underline">
                        {ui.pricingContactLink}
                    </a>
                </p>
            </div>
        </section>
    );
};

export default FAQ;
