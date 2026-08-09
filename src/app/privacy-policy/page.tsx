import type { Metadata } from 'next'
import { siteDetails } from '@/data/siteDetails'

export const metadata: Metadata = {
  title: `Kebijakan Privasi — ${siteDetails.siteName}`,
  description:
    'Kebijakan Privasi Loka Kasir menjelaskan data yang dikumpulkan aplikasi di Android, iOS, macOS, dan Windows, izin yang diminta beserta alasannya, serta cara kami melindungi data pengguna.',
}

const permissions = [
  {
    icon: '🔔',
    name: 'Notifikasi',
    technicalId: 'POST_NOTIFICATIONS (Android)',
    platforms: 'Android, iOS, macOS, Windows',
    why: 'Mengirim pemberitahuan real-time untuk pesanan masuk, peringatan stok menipis, konfirmasi pembayaran, dan informasi penting terkait operasional bisnis Anda.',
    dataCollected:
      'Pada Android dan iOS, token perangkat FCM (Firebase Cloud Messaging) untuk pengiriman notifikasi. Pada macOS dan Windows tidak ada token yang dikirim: notifikasi di sana dibuat secara lokal oleh aplikasi berdasarkan data yang sudah diambil dari server.',
    optional: false,
  },
  {
    icon: '📡',
    name: 'Bluetooth',
    technicalId: 'BLUETOOTH_CONNECT, BLUETOOTH_SCAN (Android)',
    platforms: 'Android, iOS',
    why: 'Menghubungkan dan berkomunikasi dengan printer struk termal nirkabel (Bluetooth) untuk mencetak struk transaksi langsung dari aplikasi kasir.',
    dataCollected:
      'Nama dan alamat perangkat Bluetooth di sekitar. Data ini hanya digunakan untuk pairing printer dan tidak disimpan di server. Pada macOS dan Windows izin ini tidak diminta — struk dikirim ke printer yang sudah terpasang di sistem operasi.',
    optional: true,
  },
  {
    icon: '📷',
    name: 'Kamera',
    technicalId: 'CAMERA (Android)',
    platforms: 'Android, iOS, macOS',
    why: 'Memindai barcode atau QR code produk saat menambah atau mencari produk di daftar menu/stok, sehingga input data lebih cepat dan akurat.',
    dataCollected:
      'Tidak ada gambar yang disimpan. Kamera hanya aktif saat sesi pemindaian berlangsung. Pada Windows aplikasi tidak mengakses kamera sama sekali — pemindai barcode USB dibaca sebagai papan ketik biasa.',
    optional: true,
  },
  {
    icon: '🖼️',
    name: 'Galeri / Berkas Foto (tanpa izin khusus)',
    technicalId: 'Android Photo Picker — tidak memerlukan permission',
    platforms: 'Android, iOS, macOS, Windows',
    why: 'Mengunggah foto produk ke katalog dan logo bisnis yang tampil di struk transaksi. Aplikasi menggunakan pemilih berkas bawaan sistem operasi, sehingga tidak memerlukan izin akses ke seluruh galeri.',
    dataCollected: 'Hanya gambar yang dipilih sendiri oleh pengguna yang diunggah ke server (Cloudinary) dan dikaitkan dengan akun bisnis. Aplikasi tidak dapat mengakses gambar lain di galeri.',
    optional: true,
  },
  {
    icon: '💰',
    name: 'Akses Notifikasi (Konfirmasi QRIS Statis)',
    technicalId: 'BIND_NOTIFICATION_LISTENER_SERVICE (Android)',
    platforms: 'Android saja',
    why:
      'Khusus untuk fitur opsional "Konfirmasi Otomatis QRIS Statis". Pembayaran QRIS statis masuk langsung ke rekening merchant tanpa gateway, sehingga tidak ada konfirmasi resmi yang bisa diterima aplikasi. Dengan izin ini, aplikasi membaca notifikasi dana masuk dari aplikasi bank/e-wallet MILIK PEMILIK TOKO di perangkat yang sama, lalu mencocokkan nominalnya dengan tagihan yang sedang menunggu agar transaksi dapat dilunasi otomatis — menggantikan konfirmasi manual kasir.',
    dataCollected:
      'Hanya notifikasi dari daftar aplikasi perbankan/e-wallet yang telah ditentukan yang dibaca. Notifikasi dari aplikasi lain (pesan pribadi, media sosial, email, dan sebagainya) tidak pernah dibaca, disimpan, maupun dikirim. Teks notifikasi pembayaran yang terbaca dikirim ke server Loka Kasir untuk dicocokkan dan disimpan sebagai bukti pembayaran yang bisa dilihat pemilik di Web Admin. Fitur ini MATI secara bawaan dan hanya aktif bila pemilik toko mengaktifkannya sendiri serta memberikan izin secara manual di Pengaturan Android. Fitur ini tidak tersedia di iOS, macOS, maupun Windows.',
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
          <p className="text-gray-500 text-sm dark:text-gray-400">Terakhir diperbarui: 10 Agustus 2026</p>
        </div>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed mb-4 dark:text-gray-300">
          Aplikasi <strong>Loka Kasir</strong> dikembangkan oleh <strong>Kreativita Sinergi</strong> sebagai
          solusi kasir digital (POS) untuk UMKM. Halaman ini menjelaskan izin yang diminta oleh
          aplikasi, alasan penggunaannya, dan data apa saja yang dikumpulkan.
        </p>
        <p className="text-gray-700 leading-relaxed mb-10 dark:text-gray-300">
          Kebijakan ini berlaku untuk <strong>seluruh versi Loka Kasir</strong> — aplikasi Android
          (Google Play), iOS dan iPadOS (App Store), macOS (Mac App Store), Windows (Microsoft
          Store), serta Web Admin di{' '}
          <a href={siteDetails.dashboardUrl} className="text-blue-600 hover:underline dark:text-blue-400">
            {siteDetails.dashboardUrl.replace('https://', '')}
          </a>
          . Semuanya memakai satu akun dan satu server yang sama. Karena kemampuan tiap sistem
          operasi berbeda, sebagian izin di bawah hanya berlaku di platform tertentu — hal itu
          dicantumkan pada masing-masing izin.
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
                    <p className="text-xs text-gray-400 font-mono mb-1 dark:text-gray-500">{p.technicalId}</p>
                    <p className="text-xs text-gray-500 mb-3 dark:text-gray-400">
                      <span className="font-medium">Berlaku di: </span>{p.platforms}
                    </p>
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
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>Notifikasi Pembayaran (opsional):</strong> Bila fitur Konfirmasi Otomatis QRIS Statis diaktifkan, teks notifikasi dana masuk dari aplikasi bank/e-wallet milik pemilik toko dikirim ke server untuk dicocokkan dengan transaksi. Data ini hanya dipakai untuk memverifikasi pembayaran, tidak dibagikan ke pihak ketiga, dan bisa dihapus dengan mematikan fitur tersebut lalu menghubungi kami.</p>
            </div>
          </div>
        </section>

        {/* Third-party processors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">Pihak Ketiga yang Memproses Data</h2>
          <p className="text-sm text-gray-700 mb-3 dark:text-gray-300">
            Kami tidak menjual data pengguna. Layanan berikut memproses sebagian data atas nama kami
            semata-mata agar aplikasi dapat berfungsi:
          </p>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>Firebase Cloud Messaging (Google):</strong> menerima token perangkat untuk mengirim notifikasi ke aplikasi Android dan iOS. Tidak digunakan pada versi macOS dan Windows.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>Firebase Crashlytics (Google):</strong> menerima laporan kerusakan aplikasi berisi data diagnostik seperti model perangkat, versi sistem operasi, dan jejak kesalahan. Hanya aktif pada versi rilis Android dan iOS, dan tidak berisi data transaksi maupun kata sandi.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>Cloudinary:</strong> menyimpan gambar yang Anda unggah sendiri, yaitu foto produk dan logo bisnis.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>Toko aplikasi (Google Play, Apple App Store, Microsoft Store):</strong> menangani pemasangan dan pembaruan aplikasi. Kami tidak menerima data pribadi Anda dari mereka selain informasi pembelian bila ada.</p>
            </div>
          </div>
        </section>

        {/* Retention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">Penyimpanan &amp; Retensi Data</h2>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p>Data akun, bisnis, dan transaksi disimpan selama akun Anda aktif, karena riwayat penjualan memang perlu tersedia untuk pembukuan Anda sendiri.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p>Bila Anda menghapus akun melalui{' '}
                <a href="/hapus-akun" className="text-blue-600 hover:underline dark:text-blue-400">halaman penghapusan akun</a>, data dihapus dari sistem aktif paling lambat <strong>7 hari kerja</strong> setelah permintaan terverifikasi, dan salinannya pada cadangan sistem terhapus paling lambat <strong>30 hari</strong> setelahnya.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p>Token perangkat untuk notifikasi dihapus saat Anda keluar dari aplikasi (logout) atau mencopot pemasangan aplikasi.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p>Sebagian data dapat kami simpan lebih lama bila diwajibkan oleh peraturan perpajakan atau hukum yang berlaku.</p>
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
            Anda dapat mencabut izin aplikasi kapan saja. Mencabut izin tertentu tidak akan
            menonaktifkan akun Anda, namun fitur terkait izin tersebut tidak akan tersedia.
            Caranya berbeda di tiap sistem operasi:
          </p>
          <div className="space-y-3 text-sm text-gray-700 mb-3 dark:text-gray-300">
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>Android:</strong> <strong>Pengaturan &rsaquo; Aplikasi &rsaquo; Loka Kasir &rsaquo; Izin</strong>. Khusus Akses Notifikasi, lewat <strong>Pengaturan &rsaquo; Notifikasi &rsaquo; Akses notifikasi khusus</strong> — atau cukup matikan “Konfirmasi Otomatis” pada pengaturan outlet di Web Admin.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>iOS dan iPadOS:</strong> <strong>Settings &rsaquo; Loka Kasir</strong>.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>macOS:</strong> <strong>System Settings &rsaquo; Privacy &amp; Security</strong>, pilih kategori izinnya (mis. Kamera atau Notifications).</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p><strong>Windows:</strong> aplikasi tidak meminta izin kamera maupun Bluetooth karena kedua fitur itu tidak tersedia di sana. Notifikasi dapat dimatikan melalui <strong>Settings &rsaquo; System &rsaquo; Notifications</strong>.</p>
            </div>
          </div>
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
