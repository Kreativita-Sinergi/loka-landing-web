import { pick, type Locale } from "./localized";

/**
 * Teks halaman `/privacy-policy`.
 *
 * PERINGATAN, sama seperti `accountDeletion.ts` dan lebih keras lagi: ini
 * dokumen hukum yang ditinjau Google Play, Apple, dan Microsoft. Isinya harus
 * BERMAKNA SAMA di keempat bahasa — nama pemroses data, apa yang dikumpulkan,
 * berapa lama disimpan. Menghaluskan kalimat di satu bahasa sampai maknanya
 * bergeser bukan perbaikan gaya bahasa, melainkan pernyataan yang berbeda
 * tentang apa yang kami lakukan terhadap data orang.
 *
 * Terjemahan ini disusun untuk kesetaraan makna, dan SEBAIKNYA DITINJAU
 * seseorang yang memahami kewajiban hukum di pasar tujuan sebelum diandalkan
 * sebagai dokumen kepatuhan di sana.
 */
type PermissionCopy = {
  name: string;
  technicalId: string;
  platforms: string;
  why: string;
  dataCollected: string;
};

type PrivacyCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lastUpdated: string;
  intro: string;
  scopeLead: string;
  scopeTail: string;
  permissionsHeading: string;
  labelOptional: string;
  labelRequired: string;
  labelPlatforms: string;
  labelWhy: string;
  labelData: string;
  permissions: PermissionCopy[];
  otherDataHeading: string;
  otherData: { label: string; body: string }[];
  processorsHeading: string;
  processorsLead: string;
  processors: { label: string; body: string }[];
  retentionHeading: string;
  retentionActive: string;
  retentionDeleteLead: string;
  retentionDeleteLink: string;
  retentionDeleteTail: string;
  retentionToken: string;
  retentionLegal: string;
  protectionHeading: string;
  protection: string[];
  rightsHeading: string;
  rightsLead: string;
  rightsPlatforms: { label: string; body: string }[];
  rightsContactLead: string;
  contactHeading: string;
  contactEmail: string;
  contactPhone: string;
  contactDeveloper: string;
  copyright: string;
};

const copyByLocale: Record<Locale, PrivacyCopy> = {
  id: {
    metaTitle: "Kebijakan Privasi",
    metaDescription:
      "Kebijakan Privasi Loka Kasir menjelaskan data yang dikumpulkan aplikasi di Android, iOS, macOS, dan Windows, izin yang diminta beserta alasannya, serta cara kami melindungi data pengguna.",
    title: "Kebijakan Privasi",
    lastUpdated: "Terakhir diperbarui: 10 Agustus 2026",
    intro:
      "Aplikasi Loka Kasir dikembangkan oleh Kreativita Sinergi sebagai solusi kasir digital (POS) untuk UMKM. Halaman ini menjelaskan izin yang diminta oleh aplikasi, alasan penggunaannya, dan data apa saja yang dikumpulkan.",
    scopeLead:
      "Kebijakan ini berlaku untuk seluruh versi Loka Kasir — aplikasi Android (Google Play), iOS dan iPadOS (App Store), macOS (Mac App Store), Windows (Microsoft Store), serta Web Admin di ",
    scopeTail:
      ". Semuanya memakai satu akun dan satu server yang sama. Karena kemampuan tiap sistem operasi berbeda, sebagian izin di bawah hanya berlaku di platform tertentu — hal itu dicantumkan pada masing-masing izin.",
    permissionsHeading: "Izin Aplikasi & Penggunaannya",
    labelOptional: "Opsional",
    labelRequired: "Diperlukan",
    labelPlatforms: "Berlaku di: ",
    labelWhy: "Mengapa dibutuhkan: ",
    labelData: "Data yang dikumpulkan: ",
    permissions: [
      {
        name: "Notifikasi",
        technicalId: "POST_NOTIFICATIONS (Android)",
        platforms: "Android, iOS, macOS, Windows",
        why: "Mengirim pemberitahuan real-time untuk pesanan masuk, peringatan stok menipis, konfirmasi pembayaran, dan informasi penting terkait operasional bisnis Anda.",
        dataCollected:
          "Pada Android dan iOS, token perangkat FCM (Firebase Cloud Messaging) untuk pengiriman notifikasi. Pada macOS dan Windows tidak ada token yang dikirim: notifikasi di sana dibuat secara lokal oleh aplikasi berdasarkan data yang sudah diambil dari server.",
      },
      {
        name: "Bluetooth",
        technicalId: "BLUETOOTH_CONNECT, BLUETOOTH_SCAN (Android)",
        platforms: "Android, iOS",
        why: "Menghubungkan dan berkomunikasi dengan printer struk termal nirkabel (Bluetooth) untuk mencetak struk transaksi langsung dari aplikasi kasir.",
        dataCollected:
          "Nama dan alamat perangkat Bluetooth di sekitar. Data ini hanya digunakan untuk pairing printer dan tidak disimpan di server. Pada macOS dan Windows izin ini tidak diminta — struk dikirim ke printer yang sudah terpasang di sistem operasi.",
      },
      {
        name: "Kamera",
        technicalId: "CAMERA (Android)",
        platforms: "Android, iOS, macOS",
        why: "Memindai barcode atau QR code produk saat menambah atau mencari produk di daftar menu/stok, sehingga input data lebih cepat dan akurat.",
        dataCollected:
          "Tidak ada gambar yang disimpan. Kamera hanya aktif saat sesi pemindaian berlangsung. Pada Windows aplikasi tidak mengakses kamera sama sekali — pemindai barcode USB dibaca sebagai papan ketik biasa.",
      },
      {
        name: "Galeri / Berkas Foto (tanpa izin khusus)",
        technicalId: "Android Photo Picker — tidak memerlukan permission",
        platforms: "Android, iOS, macOS, Windows",
        why: "Mengunggah foto produk ke katalog dan logo bisnis yang tampil di struk transaksi. Aplikasi menggunakan pemilih berkas bawaan sistem operasi, sehingga tidak memerlukan izin akses ke seluruh galeri.",
        dataCollected:
          "Hanya gambar yang dipilih sendiri oleh pengguna yang diunggah ke server (Cloudinary) dan dikaitkan dengan akun bisnis. Aplikasi tidak dapat mengakses gambar lain di galeri.",
      },
      {
        name: "Akses Notifikasi (Konfirmasi QRIS Statis)",
        technicalId: "BIND_NOTIFICATION_LISTENER_SERVICE (Android)",
        platforms: "Android saja",
        why: 'Khusus untuk fitur opsional "Konfirmasi Otomatis QRIS Statis". Pembayaran QRIS statis masuk langsung ke rekening merchant tanpa gateway, sehingga tidak ada konfirmasi resmi yang bisa diterima aplikasi. Dengan izin ini, aplikasi membaca notifikasi dana masuk dari aplikasi bank/e-wallet MILIK PEMILIK TOKO di perangkat yang sama, lalu mencocokkan nominalnya dengan tagihan yang sedang menunggu agar transaksi dapat dilunasi otomatis — menggantikan konfirmasi manual kasir.',
        dataCollected:
          "Hanya notifikasi dari daftar aplikasi perbankan/e-wallet yang telah ditentukan yang dibaca. Notifikasi dari aplikasi lain (pesan pribadi, media sosial, email, dan sebagainya) tidak pernah dibaca, disimpan, maupun dikirim. Teks notifikasi pembayaran yang terbaca dikirim ke server Loka Kasir untuk dicocokkan dan disimpan sebagai bukti pembayaran yang bisa dilihat pemilik di Web Admin. Fitur ini MATI secara bawaan dan hanya aktif bila pemilik toko mengaktifkannya sendiri serta memberikan izin secara manual di Pengaturan Android. Fitur ini tidak tersedia di iOS, macOS, maupun Windows.",
      },
    ],
    otherDataHeading: "Data Lain yang Dikumpulkan",
    otherData: [
      { label: "Data Akun:", body: "Nama, nomor telepon, email, dan kata sandi (terenkripsi bcrypt) yang diperlukan untuk autentikasi." },
      { label: "Data Bisnis:", body: "Nama bisnis, jenis usaha, data outlet, produk, dan stok yang dimasukkan pengguna." },
      { label: "Data Transaksi:", body: "Riwayat penjualan, item, harga, metode pembayaran, dan laporan keuangan bisnis." },
      { label: "Notifikasi Pembayaran (opsional):", body: "Bila fitur Konfirmasi Otomatis QRIS Statis diaktifkan, teks notifikasi dana masuk dari aplikasi bank/e-wallet milik pemilik toko dikirim ke server untuk dicocokkan dengan transaksi. Data ini hanya dipakai untuk memverifikasi pembayaran, tidak dibagikan ke pihak ketiga, dan bisa dihapus dengan mematikan fitur tersebut lalu menghubungi kami." },
    ],
    processorsHeading: "Pihak Ketiga yang Memproses Data",
    processorsLead:
      "Kami tidak menjual data pengguna. Layanan berikut memproses sebagian data atas nama kami semata-mata agar aplikasi dapat berfungsi:",
    processors: [
      { label: "Firebase Cloud Messaging (Google):", body: "menerima token perangkat untuk mengirim notifikasi ke aplikasi Android dan iOS. Tidak digunakan pada versi macOS dan Windows." },
      { label: "Firebase Crashlytics (Google):", body: "menerima laporan kerusakan aplikasi berisi data diagnostik seperti model perangkat, versi sistem operasi, dan jejak kesalahan. Hanya aktif pada versi rilis Android dan iOS, dan tidak berisi data transaksi maupun kata sandi." },
      { label: "Cloudinary:", body: "menyimpan gambar yang Anda unggah sendiri, yaitu foto produk dan logo bisnis." },
      { label: "Toko aplikasi (Google Play, Apple App Store, Microsoft Store):", body: "menangani pemasangan dan pembaruan aplikasi. Kami tidak menerima data pribadi Anda dari mereka selain informasi pembelian bila ada." },
    ],
    retentionHeading: "Penyimpanan & Retensi Data",
    retentionActive:
      "Data akun, bisnis, dan transaksi disimpan selama akun Anda aktif, karena riwayat penjualan memang perlu tersedia untuk pembukuan Anda sendiri.",
    retentionDeleteLead: "Bila Anda menghapus akun melalui ",
    retentionDeleteLink: "halaman penghapusan akun",
    retentionDeleteTail:
      ", data dihapus dari sistem aktif paling lambat 7 hari kerja setelah permintaan terverifikasi, dan salinannya pada cadangan sistem terhapus paling lambat 30 hari setelahnya.",
    retentionToken:
      "Token perangkat untuk notifikasi dihapus saat Anda keluar dari aplikasi (logout) atau mencopot pemasangan aplikasi.",
    retentionLegal:
      "Sebagian data dapat kami simpan lebih lama bila diwajibkan oleh peraturan perpajakan atau hukum yang berlaku.",
    protectionHeading: "Perlindungan Data",
    protection: [
      "Semua komunikasi antara aplikasi dan server menggunakan enkripsi HTTPS/TLS.",
      "Kata sandi disimpan menggunakan hash bcrypt — tidak dapat dibaca.",
      "Gambar disimpan di Cloudinary dengan kontrol akses ketat.",
      "Data sesi lokal di perangkat disimpan menggunakan Flutter Secure Storage.",
      "Kami tidak menjual data pengguna kepada pihak ketiga manapun.",
    ],
    rightsHeading: "Hak Pengguna",
    rightsLead:
      "Anda dapat mencabut izin aplikasi kapan saja. Mencabut izin tertentu tidak akan menonaktifkan akun Anda, namun fitur terkait izin tersebut tidak akan tersedia. Caranya berbeda di tiap sistem operasi:",
    rightsPlatforms: [
      { label: "Android:", body: "Pengaturan › Aplikasi › Loka Kasir › Izin. Khusus Akses Notifikasi, lewat Pengaturan › Notifikasi › Akses notifikasi khusus — atau cukup matikan “Konfirmasi Otomatis” pada pengaturan outlet di Web Admin." },
      { label: "iOS dan iPadOS:", body: "Settings › Loka Kasir." },
      { label: "macOS:", body: "System Settings › Privacy & Security, pilih kategori izinnya (mis. Kamera atau Notifications)." },
      { label: "Windows:", body: "aplikasi tidak meminta izin kamera maupun Bluetooth karena kedua fitur itu tidak tersedia di sana. Notifikasi dapat dimatikan melalui Settings › System › Notifications." },
    ],
    rightsContactLead: "Untuk permintaan akses, koreksi, atau penghapusan data, hubungi kami di ",
    contactHeading: "Hubungi Kami",
    contactEmail: "Email:",
    contactPhone: "Telepon:",
    contactDeveloper: "Developer:",
    copyright: "Seluruh hak cipta dilindungi.",
  },
  en: {
    metaTitle: "Privacy Policy",
    metaDescription:
      "The Loka Kasir privacy policy: what the app collects on Android, iOS, macOS, and Windows, which permissions it asks for and why, and how we protect your data.",
    title: "Privacy Policy",
    lastUpdated: "Last updated: 10 August 2026",
    intro:
      "Loka Kasir is developed by Kreativita Sinergi as a point-of-sale system for small businesses. This page explains the permissions the app asks for, why it needs them, and what data is collected.",
    scopeLead:
      "This policy covers every version of Loka Kasir — Android (Google Play), iOS and iPadOS (App Store), macOS (Mac App Store), Windows (Microsoft Store), and Web Admin at ",
    scopeTail:
      ". They all use the same account and the same server. Because operating systems differ in what they allow, some permissions below apply only on certain platforms; each one says where it applies.",
    permissionsHeading: "Permissions and What They're For",
    labelOptional: "Optional",
    labelRequired: "Required",
    labelPlatforms: "Applies on: ",
    labelWhy: "Why it's needed: ",
    labelData: "What is collected: ",
    permissions: [
      {
        name: "Notifications",
        technicalId: "POST_NOTIFICATIONS (Android)",
        platforms: "Android, iOS, macOS, Windows",
        why: "To deliver alerts as they happen: incoming orders, low stock, payment confirmations, and other things that affect how the day runs.",
        dataCollected:
          "On Android and iOS, an FCM (Firebase Cloud Messaging) device token so notifications can be delivered. On macOS and Windows no token is sent — notifications there are produced locally by the app from data it has already fetched.",
      },
      {
        name: "Bluetooth",
        technicalId: "BLUETOOTH_CONNECT, BLUETOOTH_SCAN (Android)",
        platforms: "Android, iOS",
        why: "To connect to wireless thermal receipt printers and print receipts directly from the register app.",
        dataCollected:
          "The names and addresses of nearby Bluetooth devices. Used only for pairing a printer, never stored on our servers. On macOS and Windows the permission isn't requested — receipts go to whichever printer the operating system already has installed.",
      },
      {
        name: "Camera",
        technicalId: "CAMERA (Android)",
        platforms: "Android, iOS, macOS",
        why: "To scan product barcodes and QR codes when adding or looking up items, which is both faster and less error-prone than typing.",
        dataCollected:
          "No images are stored. The camera is active only during a scan. On Windows the app doesn't access the camera at all — a USB barcode scanner is read as an ordinary keyboard.",
      },
      {
        name: "Photo library (no special permission)",
        technicalId: "Android Photo Picker — no permission required",
        platforms: "Android, iOS, macOS, Windows",
        why: "To upload product photos to your catalogue and the business logo that appears on receipts. The app uses the operating system's own file picker, so it never needs access to your whole photo library.",
        dataCollected:
          "Only the images you pick yourself are uploaded to our storage provider (Cloudinary) and attached to your business account. The app cannot see any other image on the device.",
      },
      {
        name: "Notification access (automatic QR payment confirmation)",
        technicalId: "BIND_NOTIFICATION_LISTENER_SERVICE (Android)",
        platforms: "Android only",
        why: "Only for the optional automatic confirmation of static QR payments. Static QR payments land straight in the merchant's bank account without a gateway, so there is no official confirmation the app could receive. With this permission the app reads incoming-payment notifications from THE SHOP OWNER'S OWN banking or e-wallet apps on the same device and matches the amount against the bill waiting at the counter, so the sale can settle itself instead of the cashier confirming by hand.",
        dataCollected:
          "Only notifications from a defined list of banking and e-wallet apps are read. Notifications from anything else — private messages, social media, email — are never read, stored, or transmitted. The text of a matched payment notification is sent to our server to be reconciled and kept as proof of payment, visible to the owner in Web Admin. The feature is OFF by default and only works if the owner enables it and grants the permission by hand in Android settings. It does not exist on iOS, macOS, or Windows.",
      },
    ],
    otherDataHeading: "Other Data We Collect",
    otherData: [
      { label: "Account data:", body: "name, phone number, email address, and password (hashed with bcrypt), needed to sign you in." },
      { label: "Business data:", body: "business name, business type, outlets, products, and stock — everything you enter yourself." },
      { label: "Transaction data:", body: "sales history, line items, prices, payment methods, and your financial reports." },
      { label: "Payment notifications (optional):", body: "if automatic QR payment confirmation is switched on, the text of incoming-payment notifications from the owner's own banking or e-wallet app is sent to our server to be matched against a sale. It is used only to verify payment, never shared with third parties, and can be removed by switching the feature off and contacting us." },
    ],
    processorsHeading: "Third Parties That Process Data",
    processorsLead:
      "We do not sell user data. The following services process some data on our behalf, purely so the app can work:",
    processors: [
      { label: "Firebase Cloud Messaging (Google):", body: "receives device tokens in order to deliver notifications to the Android and iOS apps. Not used by the macOS or Windows versions." },
      { label: "Firebase Crashlytics (Google):", body: "receives crash reports containing diagnostics such as device model, OS version, and a stack trace. Enabled only in Android and iOS release builds, and it contains neither transaction data nor passwords." },
      { label: "Cloudinary:", body: "stores the images you upload yourself — product photos and your business logo." },
      { label: "App stores (Google Play, Apple App Store, Microsoft Store):", body: "handle installation and updates. We receive no personal data from them beyond purchase information where applicable." },
    ],
    retentionHeading: "Storage and Retention",
    retentionActive:
      "Account, business, and transaction data are kept for as long as your account is active, because your own bookkeeping depends on that history staying available.",
    retentionDeleteLead: "If you delete your account through the ",
    retentionDeleteLink: "account deletion page",
    retentionDeleteTail:
      ", data is removed from active systems within 7 working days at the latest once the request is verified, and copies in system backups are gone within 30 days after that.",
    retentionToken:
      "Notification device tokens are deleted when you log out of the app or uninstall it.",
    retentionLegal:
      "Some data may be kept longer where tax or other applicable legislation requires it.",
    protectionHeading: "How Your Data Is Protected",
    protection: [
      "All traffic between the apps and the server is encrypted with HTTPS/TLS.",
      "Passwords are stored as bcrypt hashes — they cannot be read back.",
      "Images are stored on Cloudinary under strict access control.",
      "Local session data on the device is held in Flutter Secure Storage.",
      "We do not sell user data to anyone.",
    ],
    rightsHeading: "Your Rights",
    rightsLead:
      "You can revoke any permission at any time. Revoking one doesn't disable your account; it only means the feature that relies on it stops working. The steps differ per operating system:",
    rightsPlatforms: [
      { label: "Android:", body: "Settings › Apps › Loka Kasir › Permissions. For notification access specifically, Settings › Notifications › Special app access — or simply turn off automatic confirmation in the outlet settings in Web Admin." },
      { label: "iOS and iPadOS:", body: "Settings › Loka Kasir." },
      { label: "macOS:", body: "System Settings › Privacy & Security, then the relevant category (Camera or Notifications, for example)." },
      { label: "Windows:", body: "the app requests neither camera nor Bluetooth permission, because neither feature exists there. Notifications can be turned off under Settings › System › Notifications." },
    ],
    rightsContactLead: "To request access to your data, a correction, or deletion, write to us at ",
    contactHeading: "Contact Us",
    contactEmail: "Email:",
    contactPhone: "Phone:",
    contactDeveloper: "Developer:",
    copyright: "All rights reserved.",
  },
  ms: {
    metaTitle: "Dasar Privasi",
    metaDescription:
      "Dasar Privasi Loka Kasir: data yang dikumpul aplikasi pada Android, iOS, macOS, dan Windows, kebenaran yang diminta beserta sebabnya, dan cara kami melindungi data anda.",
    title: "Dasar Privasi",
    lastUpdated: "Kemas kini terakhir: 10 Ogos 2026",
    intro:
      "Loka Kasir dibangunkan oleh Kreativita Sinergi sebagai sistem mesin daftar tunai (POS) untuk perniagaan kecil. Halaman ini menerangkan kebenaran yang diminta aplikasi, sebabnya, dan data apa yang dikumpul.",
    scopeLead:
      "Dasar ini merangkumi semua versi Loka Kasir — Android (Google Play), iOS dan iPadOS (App Store), macOS (Mac App Store), Windows (Microsoft Store), serta Web Admin di ",
    scopeTail:
      ". Kesemuanya menggunakan akaun dan pelayan yang sama. Oleh sebab keupayaan setiap sistem pengendalian berbeza, sebahagian kebenaran di bawah hanya terpakai pada platform tertentu; setiap satu menyatakan di mana ia terpakai.",
    permissionsHeading: "Kebenaran dan Tujuannya",
    labelOptional: "Pilihan",
    labelRequired: "Diperlukan",
    labelPlatforms: "Terpakai pada: ",
    labelWhy: "Kenapa diperlukan: ",
    labelData: "Apa yang dikumpul: ",
    permissions: [
      {
        name: "Pemberitahuan",
        technicalId: "POST_NOTIFICATIONS (Android)",
        platforms: "Android, iOS, macOS, Windows",
        why: "Menghantar makluman sebaik ia berlaku: pesanan masuk, stok hampir habis, pengesahan bayaran, dan perkara lain yang mempengaruhi operasi harian.",
        dataCollected:
          "Pada Android dan iOS, token peranti FCM (Firebase Cloud Messaging) supaya pemberitahuan boleh dihantar. Pada macOS dan Windows tiada token dihantar — pemberitahuan di sana dijana secara setempat oleh aplikasi daripada data yang sudah diambil.",
      },
      {
        name: "Bluetooth",
        technicalId: "BLUETOOTH_CONNECT, BLUETOOTH_SCAN (Android)",
        platforms: "Android, iOS",
        why: "Menyambung kepada pencetak resit terma tanpa wayar dan mencetak resit terus daripada aplikasi kaunter.",
        dataCollected:
          "Nama dan alamat peranti Bluetooth berdekatan. Digunakan hanya untuk memasangkan pencetak, tidak pernah disimpan pada pelayan kami. Pada macOS dan Windows kebenaran ini tidak diminta — resit dihantar ke pencetak yang sudah dipasang pada sistem pengendalian.",
      },
      {
        name: "Kamera",
        technicalId: "CAMERA (Android)",
        platforms: "Android, iOS, macOS",
        why: "Mengimbas kod bar dan kod QR produk semasa menambah atau mencari item, yang lebih pantas dan kurang tersilap berbanding menaip.",
        dataCollected:
          "Tiada imej disimpan. Kamera aktif hanya semasa pengimbasan. Pada Windows aplikasi tidak mengakses kamera langsung — pengimbas kod bar USB dibaca sebagai papan kekunci biasa.",
      },
      {
        name: "Pustaka foto (tanpa kebenaran khas)",
        technicalId: "Android Photo Picker — tiada kebenaran diperlukan",
        platforms: "Android, iOS, macOS, Windows",
        why: "Memuat naik gambar produk ke katalog anda dan logo perniagaan yang muncul pada resit. Aplikasi menggunakan pemilih fail sistem pengendalian, jadi ia tidak perlu akses kepada keseluruhan pustaka foto anda.",
        dataCollected:
          "Hanya imej yang anda pilih sendiri dimuat naik ke penyedia storan kami (Cloudinary) dan dikaitkan dengan akaun perniagaan anda. Aplikasi tidak dapat melihat imej lain pada peranti.",
      },
      {
        name: "Akses pemberitahuan (pengesahan automatik bayaran QR)",
        technicalId: "BIND_NOTIFICATION_LISTENER_SERVICE (Android)",
        platforms: "Android sahaja",
        why: "Hanya untuk ciri pilihan pengesahan automatik bayaran QR statik. Bayaran QR statik masuk terus ke akaun bank peniaga tanpa gerbang pembayaran, jadi tiada pengesahan rasmi yang boleh diterima aplikasi. Dengan kebenaran ini, aplikasi membaca pemberitahuan wang masuk daripada aplikasi bank atau e-dompet MILIK PEMILIK KEDAI pada peranti yang sama, lalu memadankan jumlahnya dengan bil yang sedang menunggu di kaunter.",
        dataCollected:
          "Hanya pemberitahuan daripada senarai aplikasi bank dan e-dompet yang ditetapkan dibaca. Pemberitahuan lain — mesej peribadi, media sosial, e-mel — tidak pernah dibaca, disimpan, atau dihantar. Teks pemberitahuan bayaran yang sepadan dihantar ke pelayan kami untuk dipadankan dan disimpan sebagai bukti bayaran yang boleh dilihat pemilik di Web Admin. Ciri ini MATI secara lalai dan hanya berfungsi jika pemilik menghidupkannya sendiri serta memberikan kebenaran secara manual dalam tetapan Android. Ia tidak wujud pada iOS, macOS, atau Windows.",
      },
    ],
    otherDataHeading: "Data Lain Yang Kami Kumpul",
    otherData: [
      { label: "Data akaun:", body: "nama, nombor telefon, alamat e-mel, dan kata laluan (dicincang dengan bcrypt), diperlukan untuk log masuk." },
      { label: "Data perniagaan:", body: "nama perniagaan, jenis perniagaan, cawangan, produk, dan stok — semuanya yang anda masukkan sendiri." },
      { label: "Data transaksi:", body: "sejarah jualan, item, harga, kaedah bayaran, dan laporan kewangan anda." },
      { label: "Pemberitahuan bayaran (pilihan):", body: "jika pengesahan automatik bayaran QR dihidupkan, teks pemberitahuan wang masuk daripada aplikasi bank atau e-dompet pemilik dihantar ke pelayan kami untuk dipadankan dengan jualan. Ia digunakan hanya untuk mengesahkan bayaran, tidak pernah dikongsi dengan pihak ketiga, dan boleh dibuang dengan mematikan ciri itu lalu menghubungi kami." },
    ],
    processorsHeading: "Pihak Ketiga Yang Memproses Data",
    processorsLead:
      "Kami tidak menjual data pengguna. Perkhidmatan berikut memproses sebahagian data bagi pihak kami, semata-mata supaya aplikasi berfungsi:",
    processors: [
      { label: "Firebase Cloud Messaging (Google):", body: "menerima token peranti untuk menghantar pemberitahuan ke aplikasi Android dan iOS. Tidak digunakan oleh versi macOS dan Windows." },
      { label: "Firebase Crashlytics (Google):", body: "menerima laporan ranap yang mengandungi diagnostik seperti model peranti, versi sistem pengendalian, dan surih tindanan. Hanya aktif pada binaan keluaran Android dan iOS, dan tidak mengandungi data transaksi mahupun kata laluan." },
      { label: "Cloudinary:", body: "menyimpan imej yang anda muat naik sendiri — gambar produk dan logo perniagaan." },
      { label: "Gedung aplikasi (Google Play, Apple App Store, Microsoft Store):", body: "menguruskan pemasangan dan kemas kini. Kami tidak menerima data peribadi anda daripada mereka selain maklumat pembelian jika berkenaan." },
    ],
    retentionHeading: "Penyimpanan dan Pengekalan",
    retentionActive:
      "Data akaun, perniagaan, dan transaksi disimpan selagi akaun anda aktif, kerana perakaunan anda sendiri bergantung pada sejarah itu kekal ada.",
    retentionDeleteLead: "Jika anda memadam akaun melalui ",
    retentionDeleteLink: "halaman penghapusan akaun",
    retentionDeleteTail:
      ", data dibuang daripada sistem aktif dalam tempoh selewat-lewatnya 7 hari bekerja selepas permohonan disahkan, dan salinan dalam sandaran sistem hilang dalam tempoh 30 hari selepas itu.",
    retentionToken:
      "Token peranti untuk pemberitahuan dipadam apabila anda log keluar daripada aplikasi atau menyahpasangnya.",
    retentionLegal:
      "Sebahagian data mungkin disimpan lebih lama jika dikehendaki oleh undang-undang cukai atau undang-undang lain yang berkenaan.",
    protectionHeading: "Cara Data Anda Dilindungi",
    protection: [
      "Semua trafik antara aplikasi dan pelayan disulitkan dengan HTTPS/TLS.",
      "Kata laluan disimpan sebagai cincangan bcrypt — ia tidak boleh dibaca semula.",
      "Imej disimpan pada Cloudinary dengan kawalan akses yang ketat.",
      "Data sesi setempat pada peranti disimpan dalam Flutter Secure Storage.",
      "Kami tidak menjual data pengguna kepada sesiapa.",
    ],
    rightsHeading: "Hak Anda",
    rightsLead:
      "Anda boleh menarik balik mana-mana kebenaran pada bila-bila masa. Menariknya tidak menutup akaun anda; ia hanya bermakna ciri yang bergantung padanya berhenti berfungsi. Caranya berbeza mengikut sistem pengendalian:",
    rightsPlatforms: [
      { label: "Android:", body: "Tetapan › Apl › Loka Kasir › Kebenaran. Untuk akses pemberitahuan, Tetapan › Pemberitahuan › Akses apl khas — atau matikan sahaja pengesahan automatik dalam tetapan cawangan di Web Admin." },
      { label: "iOS dan iPadOS:", body: "Settings › Loka Kasir." },
      { label: "macOS:", body: "System Settings › Privacy & Security, kemudian kategori berkenaan (contohnya Camera atau Notifications)." },
      { label: "Windows:", body: "aplikasi tidak meminta kebenaran kamera mahupun Bluetooth kerana kedua-dua ciri itu tiada di sana. Pemberitahuan boleh dimatikan di Settings › System › Notifications." },
    ],
    rightsContactLead: "Untuk memohon akses kepada data anda, pembetulan, atau penghapusan, e-mel kami di ",
    contactHeading: "Hubungi Kami",
    contactEmail: "E-mel:",
    contactPhone: "Telefon:",
    contactDeveloper: "Pembangun:",
    copyright: "Hak cipta terpelihara.",
  },
  ja: {
    metaTitle: "プライバシーポリシー",
    metaDescription:
      "Loka Kasir のプライバシーポリシー。Android・iOS・macOS・Windows の各アプリが収集する情報、求める権限とその理由、そしてデータの保護方法についてご説明します。",
    title: "プライバシーポリシー",
    lastUpdated: "最終更新：2026年8月10日",
    intro:
      "Loka Kasir は、小規模事業者向けのPOSレジとして Kreativita Sinergi が開発しています。このページでは、アプリが求める権限とその理由、そして収集する情報についてご説明します。",
    scopeLead:
      "本ポリシーは Loka Kasir のすべての版に適用されます。Android（Google Play）、iOS・iPadOS（App Store）、macOS（Mac App Store）、Windows（Microsoft Store）、および管理画面（",
    scopeTail:
      "）です。いずれも同じアカウントと同じサーバーを使用します。OSごとにできることが異なるため、以下の権限には特定のプラットフォームにのみ該当するものがあります。該当範囲は各項目に記載しています。",
    permissionsHeading: "権限と、その用途",
    labelOptional: "任意",
    labelRequired: "必須",
    labelPlatforms: "対象：",
    labelWhy: "必要な理由：",
    labelData: "収集する情報：",
    permissions: [
      {
        name: "通知",
        technicalId: "POST_NOTIFICATIONS（Android）",
        platforms: "Android・iOS・macOS・Windows",
        why: "新しい注文、在庫僅少、入金の確認など、その日の営業に関わることをその場でお知らせするためです。",
        dataCollected:
          "Android と iOS では、通知を届けるための FCM（Firebase Cloud Messaging）デバイストークン。macOS と Windows ではトークンの送信はありません。これらでは、すでに取得済みのデータからアプリが端末内で通知を生成しています。",
      },
      {
        name: "Bluetooth",
        technicalId: "BLUETOOTH_CONNECT, BLUETOOTH_SCAN（Android）",
        platforms: "Android・iOS",
        why: "ワイヤレスのサーマルレシートプリンターに接続し、レジアプリから直接レシートを印刷するためです。",
        dataCollected:
          "近くにある Bluetooth 機器の名称とアドレス。プリンターのペアリングにのみ使用し、当社サーバーには保存しません。macOS と Windows ではこの権限は要求せず、OSに設定済みのプリンターへ出力します。",
      },
      {
        name: "カメラ",
        technicalId: "CAMERA（Android）",
        platforms: "Android・iOS・macOS",
        why: "商品の登録や検索の際に、バーコードやQRコードを読み取るためです。手入力より速く、打ち間違いも起きません。",
        dataCollected:
          "画像は保存しません。カメラが動作するのは読み取りの最中のみです。Windows ではカメラにはまったくアクセスせず、USBバーコードリーダーは通常のキーボードとして扱われます。",
      },
      {
        name: "写真の選択（特別な権限は不要）",
        technicalId: "Android Photo Picker — 権限不要",
        platforms: "Android・iOS・macOS・Windows",
        why: "商品写真や、レシートに表示する店舗ロゴをアップロードするためです。OS標準のファイル選択画面を使うため、写真全体へのアクセス権は必要ありません。",
        dataCollected:
          "お客様ご自身が選んだ画像のみが、当社の画像保管サービス（Cloudinary）にアップロードされ、店舗アカウントに紐づけられます。それ以外の画像をアプリが見ることはできません。",
      },
      {
        name: "通知へのアクセス（QR決済の自動確認）",
        technicalId: "BIND_NOTIFICATION_LISTENER_SERVICE（Android）",
        platforms: "Android のみ",
        why: "任意機能である「静的QR決済の自動確認」専用です。静的QR決済は決済ゲートウェイを介さず加盟店の口座へ直接入金されるため、アプリが受け取れる公式な入金通知が存在しません。この権限により、同じ端末にある「店舗オーナーご自身の」銀行・電子マネーアプリの入金通知を読み取り、その金額をレジで会計待ちの伝票と突き合わせます。",
        dataCollected:
          "読み取るのは、あらかじめ定めた銀行・電子マネーアプリの通知だけです。それ以外の通知（個人のメッセージ、SNS、メールなど）は、読み取ることも、保存することも、送信することもありません。一致した入金通知の文面は、照合のため当社サーバーへ送られ、管理画面でオーナーが確認できる入金の証跡として保存されます。この機能は初期状態ではオフで、オーナーご自身が有効化し、Androidの設定で手動で権限を許可した場合にのみ動作します。iOS・macOS・Windows にはこの機能はありません。",
      },
    ],
    otherDataHeading: "その他に収集する情報",
    otherData: [
      { label: "アカウント情報：", body: "氏名、電話番号、メールアドレス、パスワード（bcrypt でハッシュ化）。ログインに必要な情報です。" },
      { label: "店舗情報：", body: "店舗名、業種、各店舗、商品、在庫など、お客様ご自身が入力された内容。" },
      { label: "取引情報：", body: "売上履歴、明細、価格、支払い方法、および各種レポート。" },
      { label: "入金通知（任意）：", body: "QR決済の自動確認を有効にした場合、オーナーご自身の銀行・電子マネーアプリの入金通知の文面が、売上との照合のため当社サーバーへ送信されます。入金の確認以外には使用せず、第三者に提供することもありません。機能をオフにしたうえでご連絡いただければ削除できます。" },
    ],
    processorsHeading: "データを取り扱う第三者",
    processorsLead:
      "当社はユーザーのデータを販売しません。以下のサービスは、アプリを動かすためだけに、当社に代わって一部のデータを処理します。",
    processors: [
      { label: "Firebase Cloud Messaging（Google）：", body: "Android・iOS アプリへ通知を届けるため、デバイストークンを受け取ります。macOS版・Windows版では使用していません。" },
      { label: "Firebase Crashlytics（Google）：", body: "端末の機種、OSのバージョン、スタックトレースなどの診断情報を含むクラッシュレポートを受け取ります。Android・iOS のリリース版でのみ有効で、取引データやパスワードは含まれません。" },
      { label: "Cloudinary：", body: "お客様がアップロードした画像（商品写真と店舗ロゴ）を保管します。" },
      { label: "各アプリストア（Google Play、Apple App Store、Microsoft Store）：", body: "アプリの配信と更新を担います。購入情報を除き、当社がストアからお客様の個人情報を受け取ることはありません。" },
    ],
    retentionHeading: "保存と保持期間",
    retentionActive:
      "アカウント情報・店舗情報・取引情報は、アカウントが有効である間は保存します。お客様ご自身の記帳のために、売上の履歴が残っている必要があるためです。",
    retentionDeleteLead: "",
    retentionDeleteLink: "アカウント削除のページ",
    retentionDeleteTail:
      " からアカウントを削除された場合、依頼の確認後、遅くとも7営業日以内に稼働中のシステムから削除し、バックアップ内の複製もその後30日以内に消去されます。",
    retentionToken:
      "通知用のデバイストークンは、アプリからログアウトされた時点、またはアプリを削除された時点で消去されます。",
    retentionLegal:
      "税法その他の適用される法令で求められる場合には、一部の情報をより長く保存することがあります。",
    protectionHeading: "データの保護",
    protection: [
      "アプリとサーバー間の通信はすべて HTTPS/TLS で暗号化しています。",
      "パスワードは bcrypt でハッシュ化して保存しており、元に戻して読むことはできません。",
      "画像は Cloudinary に、厳格なアクセス制御のもとで保管しています。",
      "端末内のセッション情報は Flutter Secure Storage に保存しています。",
      "ユーザーのデータを第三者に販売することはありません。",
    ],
    rightsHeading: "お客様の権利",
    rightsLead:
      "権限はいつでも取り消せます。取り消してもアカウントが無効になることはなく、その権限を使う機能が動かなくなるだけです。手順はOSごとに異なります。",
    rightsPlatforms: [
      { label: "Android：", body: "設定 › アプリ › Loka Kasir › 権限。通知へのアクセスについては 設定 › 通知 › 特別なアプリアクセス から。あるいは管理画面の店舗設定で「自動確認」をオフにするだけでも構いません。" },
      { label: "iOS・iPadOS：", body: "設定 › Loka Kasir。" },
      { label: "macOS：", body: "システム設定 › プライバシーとセキュリティ から該当する項目（カメラ、通知など）。" },
      { label: "Windows：", body: "カメラと Bluetooth はそもそも機能として存在しないため、権限を要求していません。通知は 設定 › システム › 通知 からオフにできます。" },
    ],
    rightsContactLead: "データの開示、訂正、削除のご依頼は、",
    contactHeading: "お問い合わせ",
    contactEmail: "メール：",
    contactPhone: "電話：",
    contactDeveloper: "開発元：",
    copyright: "All rights reserved.",
  },
};

/** Ikon dan penanda wajib/opsional sama di semua bahasa — keduanya fakta produk. */
export const permissionShape = [
  { icon: "🔔", optional: false },
  { icon: "📡", optional: true },
  { icon: "📷", optional: true },
  { icon: "🖼️", optional: true },
  { icon: "💰", optional: true },
];

export const getPrivacy = (locale: Locale) => pick(copyByLocale, locale);
