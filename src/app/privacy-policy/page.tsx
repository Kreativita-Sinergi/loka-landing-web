import type { Metadata } from 'next'
import { siteDetails } from '@/data/siteDetails'

export const metadata: Metadata = {
  title: `Kebijakan Privasi — ${siteDetails.siteName}`,
  description:
    'Kebijakan Privasi Loka Kasir menjelaskan izin yang digunakan aplikasi beserta alasannya, serta cara kami melindungi data pengguna.',
}

const permissions = [
  {
    icon: '🔔',
    name: 'Notifikasi',
    androidPermission: 'POST_NOTIFICATIONS',
    why: 'Mengirim pemberitahuan real-time untuk pesanan masuk, peringatan stok menipis, konfirmasi pembayaran, dan informasi penting terkait operasional bisnis Anda.',
    dataCollected: 'Token perangkat FCM (Firebase Cloud Messaging) untuk pengiriman notifikasi.',
    optional: false,
  },
  {
    icon: '📡',
    name: 'Bluetooth',
    androidPermission: 'BLUETOOTH_CONNECT, BLUETOOTH_SCAN',
    why: 'Menghubungkan dan berkomunikasi dengan printer struk termal nirkabel (Bluetooth) untuk mencetak struk transaksi langsung dari aplikasi kasir.',
    dataCollected: 'Nama dan alamat perangkat Bluetooth di sekitar. Data ini hanya digunakan untuk pairing printer dan tidak disimpan di server.',
    optional: true,
  },
  {
    icon: '📷',
    name: 'Kamera',
    androidPermission: 'CAMERA',
    why: 'Memindai barcode atau QR code produk saat menambah atau mencari produk di daftar menu/stok, sehingga input data lebih cepat dan akurat.',
    dataCollected: 'Tidak ada gambar yang disimpan. Kamera hanya aktif saat sesi pemindaian berlangsung.',
    optional: true,
  },
  {
    icon: '🖼️',
    name: 'Galeri / Penyimpanan Foto',
    androidPermission: 'READ_MEDIA_IMAGES',
    why: 'Mengunggah foto produk ke katalog dan logo bisnis yang tampil di struk transaksi. Pengguna memilih sendiri gambar dari galeri perangkat.',
    dataCollected: 'Gambar yang dipilih pengguna diunggah ke server (Cloudinary) dan dikaitkan dengan akun bisnis. Gambar lain di galeri tidak diakses.',
    optional: true,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-blue-600 mb-2 dark:text-blue-400">Loka Kasir</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-white">Kebijakan Privasi</h1>
          <p className="text-gray-500 text-sm dark:text-gray-400">Terakhir diperbarui: 20 April 2025</p>
        </div>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed mb-10 dark:text-gray-300">
          Aplikasi <strong>Loka Kasir</strong> dikembangkan oleh <strong>Kreativita Sinergi</strong> sebagai
          solusi kasir digital (POS) untuk UMKM. Halaman ini menjelaskan izin yang diminta oleh
          aplikasi, alasan penggunaannya, dan data apa saja yang dikumpulkan — sesuai persyaratan
          Google Play Store.
        </p>

        {/* Permissions */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 dark:text-white">Izin Aplikasi & Penggunaannya</h2>
          <div className="space-y-5">
            {permissions.map((p) => (
              <div key={p.name} className="border border-gray-200 rounded-2xl p-6 dark:border-surface-border dark:bg-surface">
                <div className="flex items-start gap-4">
                  <span className="text-3xl mt-0.5">{p.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{p.name}</h3>
                      {p.optional && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-300">
                          Opsional
                        </span>
                      )}
                      {!p.optional && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
                          Diperlukan
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 font-mono mb-3 dark:text-gray-500">{p.androidPermission}</p>
                    <p className="text-sm text-gray-700 mb-2 dark:text-gray-300">
                      <span className="font-medium text-gray-900 dark:text-white">Mengapa dibutuhkan: </span>
                      {p.why}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">Data yang dikumpulkan: </span>
                      {p.dataCollected}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data collected */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">Data Lain yang Dikumpulkan</h2>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>Data Akun:</strong> Nama, nomor telepon, email, dan kata sandi (terenkripsi bcrypt) yang diperlukan untuk autentikasi.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>Data Bisnis:</strong> Nama bisnis, jenis usaha, data outlet, produk, dan stok yang dimasukkan pengguna.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>Data Transaksi:</strong> Riwayat penjualan, item, harga, metode pembayaran, dan laporan keuangan bisnis.</p>
            </div>
          </div>
        </section>

        {/* How we protect */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">Perlindungan Data</h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex gap-3"><span>✅</span> Semua komunikasi antara aplikasi dan server menggunakan enkripsi <strong>HTTPS/TLS</strong>.</li>
            <li className="flex gap-3"><span>✅</span> Kata sandi disimpan menggunakan hash <strong>bcrypt</strong> — tidak dapat dibaca.</li>
            <li className="flex gap-3"><span>✅</span> Gambar disimpan di <strong>Cloudinary</strong> dengan kontrol akses ketat.</li>
            <li className="flex gap-3"><span>✅</span> Data sesi lokal di perangkat disimpan menggunakan <strong>Flutter Secure Storage</strong>.</li>
            <li className="flex gap-3"><span>✅</span> Kami <strong>tidak menjual</strong> data pengguna kepada pihak ketiga manapun.</li>
          </ul>
        </section>

        {/* User rights */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">Hak Pengguna</h2>
          <p className="text-sm text-gray-700 mb-3 dark:text-gray-300">
            Anda dapat mencabut izin aplikasi kapan saja melalui <strong>Pengaturan &rsaquo; Aplikasi &rsaquo; Loka Kasir &rsaquo; Izin</strong> di perangkat Android Anda.
            Mencabut izin tertentu tidak akan menonaktifkan akun Anda, namun fitur terkait izin tersebut tidak akan tersedia.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Untuk permintaan akses, koreksi, atau penghapusan data, hubungi kami di{' '}
            <a href="mailto:help@lokakasir.id" className="text-blue-600 hover:underline dark:text-blue-400">
              help@lokakasir.id
            </a>.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">Hubungi Kami</h2>
          <div className="bg-gray-50 rounded-2xl p-5 text-sm text-gray-700 space-y-1 dark:bg-surface dark:text-gray-300">
            <p>📧 <strong>Email:</strong>{' '}
              <a href="mailto:help@lokakasir.id" className="text-blue-600 hover:underline dark:text-blue-400">help@lokakasir.id</a>
            </p>
            <p>📞 <strong>Telepon:</strong> +62 853-9373-7313</p>
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
