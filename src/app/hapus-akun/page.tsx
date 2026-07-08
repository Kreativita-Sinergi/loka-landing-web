import type { Metadata } from 'next'
import { siteDetails } from '@/data/siteDetails'

export const metadata: Metadata = {
  title: `Hapus Akun & Data — ${siteDetails.siteName}`,
  description:
    'Cara meminta penghapusan akun Loka Kasir beserta seluruh data terkait, jenis data yang dihapus, dan periode retensinya.',
}

const steps = [
  {
    title: 'Kirim permintaan penghapusan',
    detail: (
      <>
        Kirim email ke{' '}
        <a href="mailto:help@lokakasir.id?subject=Permintaan%20Hapus%20Akun%20Loka%20Kasir" className="text-blue-600 hover:underline dark:text-blue-400">
          help@lokakasir.id
        </a>{' '}
        dengan subjek <strong>&ldquo;Permintaan Hapus Akun&rdquo;</strong>, atau hubungi kami via
        telepon/WhatsApp di <strong>+62 853-9373-7313</strong>.
      </>
    ),
  },
  {
    title: 'Sertakan data akun terdaftar',
    detail: (
      <>
        Cantumkan <strong>nomor telepon atau email</strong> yang terdaftar di akun Loka Kasir Anda
        beserta <strong>nama bisnis</strong>. Permintaan harus dikirim dari email/nomor yang
        terdaftar sebagai verifikasi kepemilikan akun.
      </>
    ),
  },
  {
    title: 'Verifikasi & konfirmasi',
    detail: (
      <>
        Tim kami akan memverifikasi kepemilikan akun dan mengirimkan konfirmasi. Setelah Anda
        mengonfirmasi, akun beserta datanya dihapus <strong>maksimal 7 hari kerja</strong>.
      </>
    ),
  },
]

export default function AccountDeletionPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-blue-600 mb-2 dark:text-blue-400">Loka Kasir</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-white">Hapus Akun &amp; Data</h1>
          <p className="text-gray-500 text-sm dark:text-gray-400">Terakhir diperbarui: 8 Juli 2026</p>
        </div>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed mb-10 dark:text-gray-300">
          Halaman ini menjelaskan cara meminta penghapusan akun aplikasi <strong>Loka Kasir</strong>{' '}
          (dikembangkan oleh <strong>Kreativita Sinergi</strong>) beserta seluruh data yang terkait
          dengan akun tersebut, sesuai persyaratan Google Play Store.
        </p>

        {/* Steps */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 dark:text-white">
            Langkah Meminta Penghapusan Akun
          </h2>
          <div className="space-y-5">
            {steps.map((s, i) => (
              <div key={s.title} className="border border-gray-200 rounded-2xl p-6 flex items-start gap-4 dark:border-surface-border dark:bg-surface">
                <span className="flex-none w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center dark:bg-blue-500/15 dark:text-blue-300">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1 dark:text-white">{s.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data deleted */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">Data yang Dihapus</h2>
          <p className="text-sm text-gray-700 mb-3 dark:text-gray-300">
            Setelah permintaan diproses, data berikut <strong>dihapus permanen</strong> dan tidak
            dapat dipulihkan:
          </p>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>Data Akun:</strong> nama, nomor telepon, email, dan kata sandi.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>Data Bisnis:</strong> nama bisnis, outlet, produk, stok, karyawan, dan pengaturan.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>Data Transaksi:</strong> riwayat penjualan, laporan, dan data pembayaran.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>Media:</strong> foto produk dan logo bisnis yang tersimpan di server kami.</p>
            </div>
          </div>
        </section>

        {/* Retention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">Periode Retensi Data</h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span>⏱️</span>
              <p>Penghapusan dari sistem aktif dilakukan <strong>maksimal 7 hari kerja</strong> setelah permintaan terverifikasi.</p>
            </li>
            <li className="flex gap-3">
              <span>🗄️</span>
              <p>Salinan pada cadangan (backup) sistem terhapus otomatis <strong>maksimal 30 hari</strong> setelahnya.</p>
            </li>
            <li className="flex gap-3">
              <span>🧾</span>
              <p>
                Catatan transaksi tertentu dapat disimpan lebih lama <strong>hanya jika diwajibkan
                oleh peraturan perundang-undangan</strong> (mis. kewajiban perpajakan), dalam bentuk
                yang tidak lagi terhubung dengan akun Anda.
              </p>
            </li>
          </ul>
        </section>

        {/* Partial deletion */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
            Penghapusan Sebagian Data
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Jika Anda hanya ingin menghapus sebagian data (mis. foto produk atau data outlet
            tertentu) tanpa menghapus akun, sampaikan detailnya melalui kontak yang sama di bawah —
            kami akan membantu memprosesnya.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">Hubungi Kami</h2>
          <div className="bg-gray-50 rounded-2xl p-5 text-sm text-gray-700 space-y-1 dark:bg-surface dark:text-gray-300">
            <p>📧 <strong>Email:</strong>{' '}
              <a href="mailto:help@lokakasir.id" className="text-blue-600 hover:underline dark:text-blue-400">help@lokakasir.id</a>
            </p>
            <p>📞 <strong>Telepon / WhatsApp:</strong> +62 853-9373-7313</p>
            <p>🏢 <strong>Developer:</strong> Kreativita Sinergi</p>
            <p>📍 Jl. Air Camar No. 24, Padang Timur, Kota Padang, Sumatera Barat, Indonesia</p>
          </div>
        </section>

        <hr className="border-gray-100 mb-8 dark:border-surface-border" />
        <p className="text-xs text-gray-400 text-center dark:text-gray-500">
          &copy; {new Date().getFullYear()} Loka Kasir &mdash; Kreativita Sinergi. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </div>
  )
}
