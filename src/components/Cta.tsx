import { ctaDetails } from "@/data/cta"

const PLAY_STORE_URL =
    'https://play.google.com/store/apps/details?id=com.lokakasir.app';

const steps = [
    {
        number: '1',
        title: 'Daftar Akun',
        desc: 'Buat akun gratis di app.lokakasir.id. Pilih paket dan selesaikan pembayaran.',
    },
    {
        number: '2',
        title: 'Download App Kasir',
        desc: 'Unduh App Kasir Loka di Google Play Store menggunakan akun yang sudah terdaftar.',
    },
    {
        number: '3',
        title: 'Login & Mulai Jualan',
        desc: 'Login di aplikasi dengan akun Anda. Siap menerima transaksi hari ini!',
    },
];

const CTA: React.FC = () => {
    return (
        <section id="cta" className="mt-10 mb-5 lg:my-20">
            <div className="relative h-full w-full z-10 mx-auto py-12 sm:py-20">
                <div className="h-full w-full">
                    <div className="rounded-3xl opacity-95 absolute inset-0 -z-10 h-full w-full bg-[#050a02] bg-[linear-gradient(to_right,#12170f_1px,transparent_1px),linear-gradient(to_bottom,#12170f_1px,transparent_1px)] bg-[size:6rem_4rem]">
                        <div className="rounded-3xl absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_500px,#1C1C02,transparent)]"></div>
                    </div>

                    <div className="h-full flex flex-col items-center justify-center text-white text-center px-5">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl md:leading-tight font-semibold mb-4 max-w-2xl">
                            {ctaDetails.heading}
                        </h2>

                        <p className="mx-auto max-w-xl md:px-5 text-gray-300">
                            {ctaDetails.subheading}
                        </p>

                        {/* 3-step flow */}
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
                            {steps.map((step, i) => (
                                <div key={step.number} className="flex flex-col items-center text-center relative">
                                    {/* connector line between steps */}
                                    {i < steps.length - 1 && (
                                        <div className="hidden sm:block absolute top-5 left-[calc(50%+24px)] right-[-calc(50%-24px)] h-px bg-white/20 w-[calc(100%-48px)]" />
                                    )}
                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm mb-3 flex-shrink-0 z-10">
                                        {step.number}
                                    </div>
                                    <p className="text-sm font-semibold text-white mb-1">{step.title}</p>
                                    <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Action buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                            <a
                                href={ctaDetails.dashboardUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center min-w-[220px] px-8 h-14 rounded-full font-bold text-base bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                            >
                                Daftar & Mulai Gratis
                            </a>
                            <a
                                href={PLAY_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 min-w-[220px] px-6 h-14 rounded-full font-semibold text-base text-gray-900 bg-white hover:bg-gray-100 transition-colors"
                            >
                                {/* Google Play icon */}
                                <svg viewBox="30 336.7 120.9 129.2" className="w-6 h-6 flex-shrink-0">
                                    <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z" />
                                    <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z" />
                                    <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z" />
                                    <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z" />
                                </svg>
                                Download di Google Play
                            </a>
                        </div>

                        <p className="mt-5 text-xs text-gray-500">
                            * App Android tersedia setelah mendaftar dan login dengan akun terdaftar
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA
