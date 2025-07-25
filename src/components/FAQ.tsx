"use client"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BiMinus, BiPlus } from "react-icons/bi";

import SectionTitle from "./SectionTitle";
import { faqs } from "@/data/faq";

const FAQ: React.FC = () => {
    return (
        <section id="faq" className="py-10 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-10">
                <div>
                    <p className="hidden lg:block text-foreground-accent">Pertanyaan Umum</p>
                    <SectionTitle>
                        <h2 className="my-3 !leading-snug lg:max-w-sm text-center lg:text-left">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                    </SectionTitle>
                    <p className="lg:mt-10 text-foreground-accent text-center lg:text-left">
                        Masih ada pertanyaan? Jangan ragu untuk menghubungi kami.
                    </p>
                    <a
                        href="mailto:help@loka-pos.com"
                        className="mt-3 block text-xl lg:text-4xl text-secondary font-semibold hover:underline text-center lg:text-left"
                    >
                        help@lokakasir.id
                    </a>
                </div>

                <div className="w-full lg:max-w-2xl mx-auto border-b">
                    {faqs.map((faq, index) => (
                        <div key={index} className="mb-7">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <DisclosureButton className="flex items-center justify-between w-full px-4 pt-7 text-lg text-left border-t">
                                            <span className="text-2xl font-semibold">{faq.question}</span>
                                            {open ? (
                                                <BiMinus className="w-5 h-5 text-secondary" />
                                            ) : (
                                                <BiPlus className="w-5 h-5 text-secondary" />
                                            )}
                                        </DisclosureButton>
                                        <DisclosurePanel className="px-4 pt-4 pb-2 text-foreground-accent">
                                            {faq.answer}
                                        </DisclosurePanel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
