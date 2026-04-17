import { ctaDetails } from "@/data/cta"

const CTA: React.FC = () => {
    return (
        <section id="cta" className="mt-10 mb-5 lg:my-20">
            <div className="relative h-full w-full z-10 mx-auto py-12 sm:py-20">
                <div className="h-full w-full">
                    <div className="rounded-3xl opacity-95 absolute inset-0 -z-10 h-full w-full bg-[#050a02] bg-[linear-gradient(to_right,#12170f_1px,transparent_1px),linear-gradient(to_bottom,#12170f_1px,transparent_1px)] bg-[size:6rem_4rem]">
                        <div className="rounded-3xl absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_500px,#1C1C02,transparent)]"></div>
                    </div>

                    <div className="h-full flex flex-col items-center justify-center text-white text-center px-5">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl md:leading-tight font-semibold mb-4 max-w-2xl">{ctaDetails.heading}</h2>

                        <p className="mx-auto max-w-xl md:px-5">{ctaDetails.subheading}</p>

                        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                            <a
                                href={ctaDetails.dashboardUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center min-w-[220px] px-8 h-14 rounded-full font-bold text-base bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                            >
                                Daftar & Mulai Gratis
                            </a>
                            <a
                                href={ctaDetails.dashboardUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center min-w-[220px] px-8 h-14 rounded-full font-semibold text-base text-gray-900 bg-white hover:bg-gray-100 transition-colors"
                            >
                                Buka Dashboard
                            </a>
                        </div>

                        <p className="mt-4 text-xs text-blue-200">
                            Daftar di{" "}
                            <span className="font-semibold text-white">app.lokakasir.id</span>
                            {" "}→ pilih paket → selesaikan pembayaran
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA
