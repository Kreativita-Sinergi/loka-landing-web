import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [

  // ─── Memulai ────────────────────────────────────────────────────────────────

  {
    category: "Memulai",
    question: "Bagaimana cara mendaftar dan memulai menggunakan Loka Kasir?",
    answer:
      `Daftarkan akun Owner di ${siteDetails.dashboardUrl}, pilih jenis bisnis Anda (FNB, Retail, atau Jasa), lalu buat outlet pertama. Setelah itu Anda mendapat 14 hari akses penuh gratis — tidak perlu kartu kredit.

Urutan setup yang direkomendasikan:
1. Buat outlet dan isi informasi toko
2. Tambah karyawan dan atur hak akses
3. Buat kategori dan tambah produk
4. Konfigurasikan terminal kasir di perangkat
5. Lakukan transaksi percobaan`,
  },
  {
    category: "Memulai",
    question: "Apa saja yang perlu disiapkan sebelum mulai beroperasi?",
    answer:
      `Sebelum kasir pertama kali transaksi, pastikan hal-hal ini sudah beres:

• Outlet sudah dibuat dan dikonfigurasi
• Terminal kasir sudah terdaftar dan terikat ke perangkat
• Minimal satu produk sudah ditambahkan dengan harga jual
• Karyawan dengan role KASIR sudah terdaftar
• Metode pembayaran yang diterima sudah diaktifkan (tunai, QRIS, dll.)

Untuk bisnis FNB: tambahkan juga data meja dan aktifkan Kitchen Display System (KDS) jika ada dapur.`,
  },
  {
    category: "Memulai",
    question: "Apakah ada masa percobaan gratis?",
    answer:
      `Ya! Setiap akun baru mendapat masa percobaan 14 hari gratis dengan akses penuh ke semua fitur Pro — tanpa kartu kredit, tanpa komitmen.

Setelah 14 hari, pilih paket yang sesuai:
• Gratis — fitur POS inti, 1 outlet, selamanya gratis
• Lite — Rp 39.000/bulan, operasional lengkap (karyawan, inventori, supplier, PO, analitik)
• Pro — Rp 89.000/outlet/bulan, semua fitur Lite + HPP, Smart Pricing, Profitabilitas, Loyalty`,
  },
  {
    category: "Memulai",
    question: "Apa bedanya App Kasir dan Web Admin Loka Kasir?",
    answer:
      `App Kasir (mobile, tersedia di iOS & Android) adalah alat operasional harian untuk kasir di toko — proses order, terima pembayaran, buka/tutup shift, dan tampilkan antrian dapur (KDS). Kasir menggunakan PIN, bukan email.

Web Admin (browser) adalah pusat kendali untuk Owner, Manager, dan Admin — pantau laporan real-time, atur produk & harga, kelola karyawan, analisis HPP, dan konfigurasi sistem. Keduanya terhubung secara real-time melalui satu backend yang sama.`,
  },
  {
    category: "Memulai",
    question: "Jenis bisnis apa saja yang cocok menggunakan Loka Kasir?",
    answer:
      `Loka Kasir dirancang fleksibel untuk berbagai jenis bisnis:

• Restoran & Kafe — manajemen meja, KDS dapur, Dine-in/Take Away/Delivery
• Warung & Toko Kelontong — transaksi cepat, stok sederhana
• Retail & Fashion — variasi produk (ukuran, warna), multi-outlet
• Bakery & Minuman — BOM/resep untuk kalkulasi HPP bahan
• Bengkel & Jasa — layanan dengan komponen bahan

Jenis bisnis menentukan alur order: Retail menggunakan INSTANT_SALE (bayar → selesai), FNB menggunakan PREPARED_ORDER (ada status dapur: PENDING → PREPARING → READY → SERVED).`,
  },

  // ─── Operasi Harian ─────────────────────────────────────────────────────────

  {
    category: "Operasi Harian",
    question: "Bagaimana alur transaksi di App Kasir sehari-hari?",
    answer:
      `Alur operasi harian kasir:

1. Buka Shift — input saldo kas awal, pilih terminal
2. Proses Transaksi — pilih produk → tentukan qty → terapkan diskon jika ada
3. Pilih Metode Bayar — tunai, QRIS, kartu, atau split payment
4. Konfirmasi Pembayaran — sistem hitung kembalian otomatis
5. Struk — cetak atau kirim via WhatsApp/email
6. Tutup Shift — input saldo kas akhir, lihat ringkasan shift

Seluruh proses biasanya selesai dalam 30–60 detik per transaksi.`,
  },
  {
    category: "Operasi Harian",
    question: "Apa yang dimaksud dengan Shift dan mengapa kasir wajib membuka shift?",
    answer:
      `Shift adalah sesi kerja kasir yang mencatat semua transaksi selama periode tertentu. Kasir wajib membuka shift sebelum transaksi agar:

• Setiap transaksi tercatat ke shift yang benar
• Laporan harian bisa direkap per shift (kasir A vs kasir B)
• Saldo kas bisa dicocokkan (uang masuk vs yang seharusnya)
• Owner bisa tahu kapan toko buka dan tutup

Saat tutup shift, kasir menghitung kas fisik. Sistem otomatis menghitung selisih lebih/kurang dan merekap total penjualan per metode bayar.`,
  },
  {
    category: "Operasi Harian",
    question: "Apakah kasir perlu login email setiap hari?",
    answer:
      `Tidak. Setelah perangkat terikat ke terminal kasir, kasir hanya perlu memasukkan PIN 4-digit untuk membuka sesi setiap hari. Lebih cepat, lebih aman, dan mengurangi kesalahan login di jam operasional sibuk.

PIN per karyawan bisa diatur oleh Owner atau Manager dari Web Admin.`,
  },
  {
    category: "Operasi Harian",
    question: "Bagaimana alur order untuk restoran dan kafe (FNB)?",
    answer:
      `Alur FNB dengan Kitchen Display System (KDS):

1. Kasir/Waiter pilih meja → tambah item menu → simpan order
2. Notifikasi otomatis masuk ke layar KDS di dapur
3. Koki terima order (status: PENDING)
4. Koki mulai masak (status: PREPARING)
5. Masakan siap (status: READY_TO_SERVE)
6. Waiter antar ke meja (status: SERVED)
7. Kasir proses pembayaran → transaksi COMPLETED

Status setiap item bisa dipantau real-time oleh kasir dan waiter dari App Kasir, tanpa harus bolak-balik ke dapur.`,
  },
  {
    category: "Operasi Harian",
    question: "Apakah bisa split payment (bayar dengan dua metode sekaligus)?",
    answer:
      `Ya. Loka Kasir mendukung split payment — pelanggan bisa membayar sebagian dengan tunai dan sisanya dengan QRIS atau kartu dalam satu transaksi yang sama. Setiap porsi pembayaran dicatat terpisah dan terangkum di laporan.`,
  },
  {
    category: "Operasi Harian",
    question: "Bagaimana cara memberikan diskon ke pelanggan?",
    answer:
      `Ada tiga cara memberikan diskon:

• Diskon otomatis — dibuat di Web Admin, berlaku otomatis untuk produk/kategori tertentu atau seluruh transaksi, bisa dibatasi periode waktu
• Diskon manual — kasir input nominal atau persentase langsung di transaksi
• Diskon supervisor — untuk diskon besar yang butuh otorisasi, Manager/Supervisor bisa approve dengan PIN mereka tanpa kasir perlu logout

Diskon dapat dikombinasikan dalam satu transaksi.`,
  },
  {
    category: "Operasi Harian",
    question: "Bagaimana jika koneksi internet terputus saat transaksi?",
    answer:
      `App Kasir berjalan dengan mode offline otomatis. Saat internet terputus, transaksi tetap bisa diproses dan tersimpan di perangkat. Saat koneksi kembali, semua data langsung tersinkronisasi ke server dan laporan di Web Admin otomatis diperbarui.

Catatan: mode offline tidak mendukung pembayaran non-tunai yang memerlukan verifikasi online (QRIS, kartu).`,
  },
  {
    category: "Operasi Harian",
    question: "Bagaimana cara melakukan refund atau pembatalan transaksi?",
    answer:
      `• Pembatalan (Cancel) — bisa dilakukan sebelum transaksi dibayar. Stok produk dikembalikan otomatis.
• Refund — dilakukan setelah transaksi lunas. Status transaksi berubah menjadi "refunded", stok dikembalikan, dan tercatat di laporan sebagai pengembalian.

Kedua aksi ini memerlukan izin yang bisa dikonfigurasi per role. Secara default hanya Kasir ke atas yang bisa cancel, sedangkan Refund butuh otorisasi Manager.`,
  },
  {
    category: "Operasi Harian",
    question: "Apakah bisa mencetak struk ke printer thermal?",
    answer:
      `Ya. App Kasir mendukung berbagai printer thermal populer melalui koneksi Bluetooth maupun USB. Struk dicetak otomatis setelah pembayaran selesai, atau bisa manual. Ukuran dan konten struk bisa dikustomisasi dari pengaturan outlet.`,
  },

  // ─── Produk & Inventori ──────────────────────────────────────────────────────

  {
    category: "Produk & Inventori",
    question: "Bagaimana cara menambah produk ke dalam sistem?",
    answer:
      `Ada dua cara menambah produk:

1. Manual — dari menu Produk di Web Admin, isi nama, kategori, harga modal, harga jual, dan opsi stok. Bisa tambah variasi (ukuran/warna/rasa) per produk.

2. Import CSV — untuk bisnis dengan banyak produk, download template CSV dari tombol "Import CSV", isi data, lalu upload sekaligus. Sistem akan buat kategori baru otomatis jika belum ada.

Setelah produk dibuat, stok awal per outlet bisa langsung diisi.`,
  },
  {
    category: "Produk & Inventori",
    question: "Apa itu variasi produk dan bagaimana cara menggunakannya?",
    answer:
      `Variasi produk adalah pilihan berbeda dari satu produk yang sama — misalnya Kopi Susu ukuran S, M, L, atau Kaos dengan berbagai warna dan ukuran. Setiap variasi punya harga dan stok tersendiri.

Cara setup:
1. Buat atribut variasi (contoh: "Ukuran" dengan opsi S, M, L)
2. Di form produk, aktifkan "Punya Variasi"
3. Harga dan stok diisi per kombinasi variasi

Di App Kasir, kasir memilih variasi langsung saat menambah item ke keranjang.`,
  },
  {
    category: "Produk & Inventori",
    question: "Bagaimana cara memantau stok yang hampir habis?",
    answer:
      `Ada dua lapisan pemantauan stok menipis:

Produk jadi (semua paket):
Setiap produk memiliki batas stok minimum yang bisa diatur per outlet. Ketika stok turun di bawah batas tersebut, muncul indikator peringatan di halaman Stok Saat Ini.

Bahan Baku (paket Lite & Pro):
Setiap bahan baku memiliki field "Stok Minimum (Alert)". Ketika stok bahan turun di bawah angka tersebut, muncul banner peringatan berwarna oranye di bagian atas halaman Bahan Baku — menampilkan daftar bahan yang perlu segera direstok beserta stok saat ini vs minimum yang ditetapkan.`,
  },
  {
    category: "Produk & Inventori",
    question: "Apa itu Bundle dan bagaimana cara membuatnya?",
    answer:
      `Bundle adalah paket yang menggabungkan beberapa produk menjadi satu harga spesial — misalnya "Paket Hemat" berisi Nasi + Lauk + Minuman dengan harga diskon dibanding beli satuan.

Cara membuat: di menu Library → Bundle, pilih produk-produk yang masuk bundle, tentukan harga bundle. Saat bundle terjual, stok masing-masing komponen produk akan berkurang sesuai komposisinya.`,
  },
  {
    category: "Produk & Inventori",
    question: "Bagaimana cara transfer stok antar outlet atau cabang?",
    answer:
      `Dari menu Transfer Stok di Web Admin:

1. Buat permintaan transfer — pilih outlet asal, outlet tujuan, produk, dan jumlah
2. Status: PENDING (menunggu konfirmasi)
3. Outlet tujuan approve transfer → status: APPROVED
4. Selesaikan transfer → status: COMPLETED
5. Stok outlet asal berkurang, stok outlet tujuan bertambah
6. Semua pergerakan tercatat di Riwayat Stok

Transfer butuh izin khusus (inventory.transfer) yang dapat dikonfigurasi per role.`,
  },

  // ─── HPP & Bahan Baku ────────────────────────────────────────────────────────

  {
    category: "HPP & Bahan Baku",
    question: "Apa itu HPP dan mengapa penting untuk bisnis saya?",
    answer:
      `HPP (Harga Pokok Penjualan) adalah total biaya bahan yang diperlukan untuk membuat satu produk. Mengetahui HPP secara akurat membantu Anda:

• Menentukan harga jual yang tidak merugi
• Mengetahui margin keuntungan riil per produk
• Mengidentifikasi produk mana yang paling menguntungkan
• Membuat keputusan bisnis berbasis data, bukan perkiraan

Tanpa HPP yang tepat, Anda mungkin menjual produk dengan harga yang terlihat menguntungkan padahal sebenarnya merugi setelah memperhitungkan biaya bahan dan overhead.`,
  },
  {
    category: "HPP & Bahan Baku",
    question: "Bagaimana cara mengelola bahan baku dan menghitung HPP otomatis?",
    answer:
      `Alur lengkap HPP di Loka Kasir:

1. Daftarkan Bahan Baku — nama, satuan (kg/liter/butir)
2. Stok Masuk — input jumlah dan harga beli per satuan
   → HPP rata-rata dihitung otomatis dengan metode Moving Average
3. Buat Resep/BOM di produk — tambahkan bahan baku dan jumlah per porsi
   → HPP Dasar produk terhitung real-time dari avg HPP × jumlah bahan
4. Atur OPEX — biaya tetap bulanan ÷ target penjualan = overhead per item
5. Rekomendasi Harga — saran harga jual otomatis: HPP + overhead + margin target`,
  },
  {
    category: "HPP & Bahan Baku",
    question: "Apa itu metode Moving Average untuk HPP?",
    answer:
      `Moving Average adalah cara menghitung HPP rata-rata yang mempertimbangkan seluruh riwayat pembelian, bukan hanya harga terakhir.

Rumusnya:
HPP Baru = (Stok Lama × HPP Lama + Jumlah Masuk × Harga Beli) ÷ (Stok Lama + Jumlah Masuk)

Contoh:
• Stok: 10 kg, HPP: Rp 12.000/kg
• Beli baru: 20 kg × Rp 14.000/kg
• HPP Baru: (10×12.000 + 20×14.000) ÷ 30 = Rp 13.333/kg

Dengan cara ini, naik-turunnya harga bahan baku tidak langsung memukul margin Anda secara ekstrem.`,
  },
  {
    category: "HPP & Bahan Baku",
    question: "Bagaimana cara membuat resep produk (BOM)?",
    answer:
      `BOM (Bill of Materials) adalah daftar bahan baku beserta jumlahnya untuk membuat satu porsi/unit produk.

Cara membuat:
1. Buka halaman edit produk di Web Admin
2. Pilih tab "Resep"
3. Cari bahan baku di kolom pencarian
4. Atur jumlah yang dibutuhkan per porsi
5. Klik Simpan Resep

Sistem langsung menampilkan HPP Dasar (total biaya bahan) secara real-time. Saat produk tersebut terjual, stok bahan baku berkurang otomatis sesuai resep.`,
  },
  {
    category: "HPP & Bahan Baku",
    question: "Apakah stok bahan baku berkurang otomatis saat ada transaksi?",
    answer:
      `Ya. Setiap kali produk dengan resep (BOM) terjual dan transaksi dibayar lunas, sistem otomatis mengurangi stok setiap bahan baku sesuai jumlah di resep × qty produk yang terjual.

Proses ini berjalan di background (asynchronous) sehingga tidak memperlambat proses pembayaran. Jika karena alasan tertentu pengurangan gagal, Owner akan mendapat notifikasi untuk rekonsiliasi manual.`,
  },
  {
    category: "HPP & Bahan Baku",
    question: "Apa itu OPEX dan bagaimana pengaruhnya ke rekomendasi harga?",
    answer:
      `OPEX (Operational Expenditure) adalah biaya tetap bulanan bisnis yang tidak langsung terkait produksi, seperti sewa tempat, gaji admin, listrik, dan internet.

Pengaturan OPEX di menu Pengaturan Keuangan:
• Total Biaya Tetap Bulanan — contoh: Rp 5.000.000
• Target Volume Penjualan — contoh: 500 item/bulan
• → Overhead per item = Rp 5.000.000 ÷ 500 = Rp 10.000

Rekomendasi harga jual = (HPP Bahan + Overhead) × (1 + Margin%)
Contoh: (Rp 20.000 + Rp 10.000) × 1,30 = Rp 39.000 → dibulatkan ke Rp 39.000`,
  },
  {
    category: "HPP & Bahan Baku",
    question: "Bagaimana cara mencatat bahan baku yang terbuang/rusak (waste)?",
    answer:
      `Di halaman Bahan Baku, klik ikon Flame (🔥) di baris bahan yang ingin dicatat waste-nya. Isi jumlah yang terbuang dan catatan alasan (contoh: kadaluarsa, tumpah).

Sistem akan:
• Mengurangi stok bahan sesuai jumlah waste
• Mencatat movement tipe WASTE di riwayat (berbeda dari stok keluar biasa)
• Mempertahankan HPP rata-rata (waste tidak mengubah avg_cost)

Catatan waste penting untuk akurasi HPP dan analisis kebocoran biaya operasional.`,
  },
  {
    category: "HPP & Bahan Baku",
    question: "Apa itu Purchase Order dan bagaimana cara menggunakannya?",
    answer:
      `Purchase Order (PO) adalah dokumen pembelian resmi ke supplier untuk bahan baku. Alurnya:

1. Tambah Supplier — nama, kontak, telepon, email
2. Buat PO — nomor PO, pilih supplier, tambah item (bahan + qty + harga)
3. Status berubah: draft → ordered (saat dikonfirmasi ke supplier)
4. Terima Barang — saat barang datang, isi qty yang diterima dan harga final
   → Stok bahan baku otomatis bertambah
   → HPP Moving Average otomatis dihitung ulang
5. Status: partial_received (sebagian) atau received (semua diterima)

PO membantu melacak riwayat pembelian, harga dari supplier berbeda, dan rekonsiliasi stok.`,
  },

  // ─── Loyalty & Pelanggan ────────────────────────────────────────────────────

  {
    category: "Loyalty & Pelanggan",
    question: "Apakah Loka Kasir punya program loyalty poin untuk pelanggan?",
    answer:
      `Ya, tersedia di paket Pro. Program Loyalty memungkinkan pelanggan mengumpulkan poin dari setiap transaksi dan menukarnya sebagai diskon di kunjungan berikutnya.

Cara kerja:
• Owner mengatur konfigurasi: berapa poin per Rp 1.000 yang dibelanjakan, nilai tukar poin (1 poin = Rp X), dan minimum poin untuk redeem
• Poin terakumulasi otomatis (atau bisa ditambah manual oleh kasir/manager)
• Saat redeem, kasir menukar poin menjadi potongan harga
• Semua riwayat poin per pelanggan tercatat di Web Admin (tambah, redeem, saldo)

Contoh: 1 poin per Rp 1.000 belanja, 1 poin = Rp 100. Pelanggan belanja Rp 50.000 → dapat 50 poin → bisa ditukar Rp 5.000 diskon.`,
  },
  {
    category: "Loyalty & Pelanggan",
    question: "Apakah database pelanggan tersedia di semua paket?",
    answer:
      `Database pelanggan (nama, telepon, email, alamat) tersedia di paket Lite dan Pro. Paket Gratis tidak menyertakan fitur manajemen pelanggan.

Di paket Pro, setiap pelanggan juga memiliki saldo poin loyalty yang bisa dipantau dan dikelola langsung dari Web Admin.`,
  },

  // ─── Laporan & Analitik ──────────────────────────────────────────────────────

  {
    category: "Laporan & Analitik",
    question: "Laporan apa saja yang tersedia di Loka Kasir?",
    answer:
      `Loka Kasir menyediakan laporan berlapis sesuai paket:

Tersedia di semua paket (Gratis ke atas):
• Riwayat transaksi 30 hari — cari, filter, dan lihat detail setiap transaksi

Tersedia di paket Lite & Pro:
• Laporan Keuangan Shift — rekap kas per shift: kas awal, penjualan, refund, selisih kas, breakdown per metode bayar
• Analitik Lanjutan — peak hours, performa produk terlaris, perbandingan antar outlet, tren pendapatan mingguan/bulanan
• Riwayat Stok — semua pergerakan stok: masuk, keluar, penyesuaian, waste, transfer
• Export CSV — semua laporan bisa diunduh sebagai spreadsheet

Tersedia eksklusif di paket Pro:
• Laporan Profitabilitas HPP — per produk: Revenue, COGS, Gross Profit, Margin %
• Net Profit & Net Margin — setelah dikurangi biaya overhead (OPEX)
• Export Jurnal Akuntansi — format double-entry CSV kompatibel dengan Accurate & Buku Warung`,
  },
  {
    category: "Laporan & Analitik",
    question: "Apa itu Laporan Profitabilitas HPP?",
    answer:
      `Laporan Profitabilitas HPP menunjukkan seberapa menguntungkan setiap produk Anda setelah memperhitungkan biaya nyata (bukan sekadar omzet).

Setiap produk ditampilkan dengan:
• Terjual — jumlah unit yang terjual dalam periode
• Revenue — total pendapatan kotor
• Total COGS — (HPP bahan + overhead/item) × jumlah terjual
• Gross Profit — Revenue dikurangi Total COGS
• Margin % — persentase keuntungan kotor

Produk ditandai berdasarkan margin: hijau (≥30%), kuning (15–30%), merah (<15%). Tersedia untuk periode 7, 30, atau 90 hari terakhir.

Catatan: laporan ini hanya akurat untuk produk yang sudah memiliki resep/BOM.`,
  },
  {
    category: "Laporan & Analitik",
    question: "Apakah laporan bisa difilter per outlet atau cabang?",
    answer:
      `Ya. Semua laporan di Web Admin mendukung filter per outlet. Pilih outlet dari dropdown di header — laporan langsung diperbarui menampilkan data outlet yang dipilih.

Untuk tampilan keseluruhan bisnis (semua outlet digabung), pilih "Semua Outlet".`,
  },
  {
    category: "Laporan & Analitik",
    question: "Bisakah laporan diekspor ke Excel atau PDF?",
    answer:
      `Ya, laporan dapat diekspor dalam format CSV langsung dari halaman laporan (tersedia di paket Lite & Pro). CSV dapat dibuka di Microsoft Excel, Google Sheets, atau aplikasi spreadsheet lainnya.

Untuk paket Pro, tersedia tambahan Export Jurnal Akuntansi dalam format double-entry (debit/kredit) yang kompatibel dengan software akuntansi seperti Accurate atau Buku Warung — memudahkan rekonsiliasi keuangan bulanan.

Fitur ekspor PDF sedang dalam pengembangan.`,
  },

  // ─── Karyawan & Hak Akses ───────────────────────────────────────────────────

  {
    category: "Karyawan & Hak Akses",
    question: "Apa saja peran (role) yang tersedia dan apa bedanya?",
    answer:
      `Loka Kasir memiliki 6 peran bawaan:

• OWNER — akses penuh ke semua fitur, termasuk RBAC dan laporan keuangan
• ADMIN — sama seperti Manager, bisa akses Web Admin lengkap
• MANAGER — akses penuh kecuali mengubah hak akses (RBAC)
• KASIR — hanya App Kasir: buka shift, transaksi, bayar. Tidak bisa lihat laporan keuangan
• WAREHOUSE — inventori lengkap (bahan baku, PO, supplier) tanpa akses POS dan laporan keuangan
• WAITERS — buat order dan kelola meja di FNB, tidak bisa proses pembayaran

Setiap peran punya default izin yang bisa dikustomisasi per bisnis.`,
  },
  {
    category: "Karyawan & Hak Akses",
    question: "Bagaimana cara mengatur hak akses secara granular per karyawan?",
    answer:
      `Di menu Pengaturan → Pengaturan Hak Akses (RBAC), Owner dapat mengaktifkan atau menonaktifkan izin spesifik per role untuk bisnis mereka.

Contoh kustomisasi:
• Izinkan KASIR melihat ringkasan shift miliknya sendiri
• Nonaktifkan kemampuan MANAGER melihat laporan keuangan lengkap
• Izinkan WAREHOUSE membuat Purchase Order tapi tidak bisa hapus supplier
• Aktifkan Supervisor Override hanya untuk MANAGER ke atas

Perubahan berlaku secara instan — tidak perlu restart atau re-login.`,
  },
  {
    category: "Karyawan & Hak Akses",
    question: "Bagaimana cara menambah karyawan baru?",
    answer:
      `Dari Web Admin → menu Karyawan:
1. Klik "Tambah Karyawan"
2. Isi nama, email, nomor telepon, dan pilih role
3. Assign ke satu atau beberapa outlet
4. Karyawan menerima email undangan dan set password

Karyawan dengan role KASIR tidak perlu email setiap hari — mereka cukup gunakan PIN setelah perangkat terikat ke terminal.`,
  },
  {
    category: "Karyawan & Hak Akses",
    question: "Apa itu Supervisor Override dan kapan digunakan?",
    answer:
      `Supervisor Override memungkinkan Manager atau Supervisor mengotorisasi aksi tertentu — seperti void transaksi atau pemberian diskon besar — langsung di perangkat kasir, tanpa kasir harus logout.

Caranya: kasir meminta otorisasi di layar → Supervisor input PIN mereka → aksi disetujui dan tercatat atas nama siapa yang mengotorisasi.

Fitur ini mencegah kasir memiliki akses berlebihan sekaligus tidak mengganggu antrian pelanggan.`,
  },

  // ─── Teknis & Langganan ─────────────────────────────────────────────────────

  {
    category: "Teknis & Langganan",
    question: "Berapa banyak outlet dan pengguna yang bisa ditambahkan?",
    answer:
      `Tergantung paket yang dipilih:

• Gratis — 1 outlet, karyawan & transaksi tidak terbatas
• Trial (14 hari) — akses Pro penuh, multi-outlet diizinkan selama trial
• Lite — 1 outlet; untuk outlet kedua dan seterusnya perlu upgrade ke Pro
• Pro — multi-outlet tanpa batas; outlet pertama sudah termasuk harga paket, outlet tambahan dikenakan Rp 49.000/outlet/bulan

Untuk jumlah karyawan (user), semua paket tidak membatasi jumlah karyawan yang bisa didaftarkan. Upgrade atau downgrade paket bisa dilakukan kapan saja tanpa kehilangan data.`,
  },
  {
    category: "Teknis & Langganan",
    question: "Apakah ada biaya tambahan di luar harga langganan?",
    answer:
      `Tidak ada biaya tersembunyi. Harga langganan sudah mencakup semua fitur sesuai paket, update rutin, dan bantuan teknis.

Satu-satunya biaya tambahan yang mungkin berlaku adalah outlet tambahan pada paket Pro: Rp 49.000/outlet/bulan untuk outlet ke-2 dan seterusnya. Tidak ada biaya setup, biaya per transaksi, atau biaya per karyawan.`,
  },
  {
    category: "Teknis & Langganan",
    question: "Di perangkat apa saja App Kasir bisa dijalankan?",
    answer:
      `App Kasir tersedia di:
• iOS (iPhone & iPad) — App Store
• Android (smartphone & tablet) — Google Play Store

Web Admin dapat diakses dari browser apa pun (Chrome, Safari, Firefox, Edge) di PC, laptop, atau tablet.

Untuk performa terbaik di App Kasir, disarankan menggunakan perangkat dengan OS iOS 14+ atau Android 8+ dan RAM minimal 3 GB.`,
  },
  {
    category: "Teknis & Langganan",
    question: "Bagaimana keamanan data bisnis saya?",
    answer:
      `Data Anda dilindungi dengan:
• Enkripsi data dalam transit (HTTPS/TLS)
• Token JWT dengan masa berlaku terbatas untuk setiap sesi
• Autentikasi berbasis role — setiap pengguna hanya bisa mengakses data sesuai izinnya
• PIN kasir tidak disimpan sebagai plain text
• Backup data otomatis berkala

Kami tidak menjual atau berbagi data bisnis Anda kepada pihak ketiga.`,
  },
  {
    category: "Teknis & Langganan",
    question: "Bagaimana cara mendapatkan bantuan atau melaporkan masalah?",
    answer:
      `Ada beberapa cara menghubungi tim support kami:

• Email: help@lokakasir.id (respons dalam 1x24 jam kerja)
• Instagram: @lokakasir.id untuk update fitur dan tips penggunaan

Untuk pertanyaan umum, baca dokumentasi ini atau FAQ di atas. Untuk masalah teknis spesifik yang butuh penanganan cepat, hubungi via email dengan menyertakan nama bisnis dan deskripsi masalah.`,
  },
];
