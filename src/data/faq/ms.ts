import { IFAQ } from "@/types";
import { siteDetails } from "../siteDetails";

/** Lihat catatan di `en.ts`: dua soalan tentang kunjungan ke lokasi dan angka rupiah sengaja tidak disertakan. */
export const faqsMs: IFAQ[] = [

  // ─── Bermula ────────────────────────────────────────────────────────────────

  {
    category: "Bermula",
    question: "Bagaimana cara mendaftar dan mula menggunakannya?",
    answer:
      `Ada dua jalan masuk, dan kedua-duanya berakhir di tempat yang sama — satu akaun yang boleh digunakan di mana-mana:
• Melalui pelayar — buka ${siteDetails.dashboardUrl}/register daripada komputer riba atau telefon, tanpa memasang apa-apa
• Melalui aplikasi — pasang daripada Google Play (Android) atau Microsoft Store (Windows), kemudian daftar di dalamnya

Kedua-duanya meminta maklumat pemilik, jenis perniagaan anda (makanan, runcit, atau perkhidmatan), dan cawangan pertama. Kod pengesahan dihantar ke e-mel anda. Selepas itu anda mendapat 30 hari percuma dengan semua ciri terbuka — tanpa kad, tanpa komitmen.

Susunan penyediaan yang munasabah:
1. Buka akaun dan cipta cawangan pertama
2. Tambah pekerja dan tetapkan apa yang boleh dilakukan setiap peranan
3. Cipta kategori dan tambah produk
4. Pasang aplikasi kaunter pada peranti kedai, kemudian daftarkan terminalnya
5. Cuba satu jualan percubaan

Laporan, inventori, dan berbilang cawangan semuanya berada di Web Admin, di ${siteDetails.dashboardUrl}, menggunakan akaun yang sama.`,
  },
  {
    category: "Bermula",
    question: "Apa yang perlu siap sebelum jualan pertama?",
    answer:
      `Sebelum juruwang melayan pelanggan pertama, pastikan:

• Cawangan sudah dicipta dan ditetapkan
• Terminal kaunter sudah didaftarkan dan terikat pada peranti
• Sekurang-kurangnya satu produk wujud, berserta harga jualan
• Sekurang-kurangnya seorang pekerja mempunyai peranan juruwang
• Kaedah pembayaran yang anda terima sudah dihidupkan

Jika perniagaan anda menjual makanan, tambah juga meja dan hidupkan paparan dapur sekiranya ada dapur.`,
  },
  {
    category: "Bermula",
    question: "Adakah tempoh percubaan percuma?",
    answer:
      `Ya — 30 hari dengan semua ciri Pro terbuka, sehingga 5 cawangan, transaksi tanpa had, tanpa kad kredit, dan tiada apa-apa yang perlu dibatalkan.

Satu perkara yang baik diketahui: 30 hari itu dikira dari jualan pertama anda, bukan dari hari anda mendaftar. Jadi anda boleh membuka akaun, mengambil masa memasukkan produk, dan memasang aplikasi apabila benar-benar bersedia — semuanya tidak memakan tempoh percubaan.

Apabila tamat, anda memilih:
• Percuma — kaunter asas, 1 cawangan, sehingga 500 jualan sebulan, percuma selamanya
• Lite — 1 cawangan, berserta pekerja, pelanggan, diskaun, stok, dan laporan syif
• Pro — berbilang cawangan, serta analitik, kehadiran, pembekal, pesanan belian, kos makanan, cadangan harga, keuntungan produk, dan kesetiaan pelanggan`,
  },
  {
    category: "Bermula",
    question: "Apa bezanya aplikasi kaunter dengan Web Admin?",
    answer:
      `Aplikasi kaunter ialah yang digunakan pekerja anda di kedai — mengambil pesanan, menerima bayaran, membuka dan menutup syif, serta paparan dapur. Juruwang log masuk dengan PIN, bukan alamat e-mel.

Web Admin berjalan dalam pelayar dan itulah tempat pemilik atau pengurus bekerja — laporan, produk dan harga, pekerja, pengiraan kos, dan tetapan. Kedua-duanya bercakap dengan sistem yang sama, jadi jualan di kaunter muncul dalam laporan anda serta-merta.`,
  },
  {
    category: "Bermula",
    question: "Perniagaan jenis apa yang sesuai?",
    answer:
      `Ia menyesuaikan diri dengan pelbagai jenis:

• Restoran dan kafe — meja, paparan dapur, makan di sini / bungkus / penghantaran
• Kedai runcit dan kedai mamak — jualan pantas, stok yang ringkas
• Runcit dan fesyen — varian mengikut saiz dan warna, berbilang cawangan
• Kedai roti dan minuman — resipi untuk mengira kos bahan
• Bengkel dan perkhidmatan — kerja yang turut menggunakan alat ganti

Jenis perniagaan menentukan aliran pesanan: runcit selesai serta-merta (bayar dan siap), manakala makanan dan minuman melalui keadaan dapur — menunggu, sedang disediakan, siap, dihidang.`,
  },

  // ─── Operasi Harian ─────────────────────────────────────────────────────────

  {
    category: "Operasi Harian",
    question: "Bagaimana rupa hari biasa di kaunter?",
    answer:
      `1. Buka syif — masukkan wang tunai permulaan, pilih terminal
2. Buat jualan — pilih item, tetapkan kuantiti, kenakan diskaun jika ada
3. Pilih kaedah bayaran — mana-mana yang anda hidupkan
4. Sahkan bayaran — baki dikira untuk anda
5. Resit — cetak, atau hantar melalui WhatsApp atau e-mel
6. Tutup syif — kira laci dan baca ringkasannya

Satu jualan biasanya mengambil 30 hingga 60 saat.`,
  },
  {
    category: "Operasi Harian",
    question: "Apa itu syif, dan kenapa juruwang perlu membukanya?",
    answer:
      `Syif ialah sesi kerja yang setiap jualan dilekatkan padanya. Juruwang membukanya dahulu supaya:

• Setiap jualan masuk ke sesi yang betul
• Hari itu boleh dipecahkan mengikut orang, bukan hanya mengikut tarikh
• Wang di laci boleh disemak berbanding jangkaan sistem
• Anda tahu bila kedai sebenarnya buka dan tutup

Semasa tutup, juruwang mengira wang tunai sebenar. Sistem mengira perbezaannya dan menjumlahkan jualan mengikut kaedah bayaran.`,
  },
  {
    category: "Operasi Harian",
    question: "Perlukah juruwang log masuk dengan e-mel setiap hari?",
    answer:
      `Tidak. Setelah peranti terikat pada terminal, juruwang membuka sesi dengan PIN 4 digit. Lebih pantas, lebih selamat di kaunter yang sibuk, dan mengelakkan masalah kata laluan ketika orang sedang beratur.

Pemilik dan pengurus menetapkan PIN setiap orang daripada Web Admin.`,
  },
  {
    category: "Operasi Harian",
    question: "Bagaimana aliran kerja untuk restoran atau kafe?",
    answer:
      `Dengan paparan dapur:

1. Juruwang atau pelayan memilih meja, menambah item, dan menyimpan pesanan
2. Ia terus muncul di skrin dapur
3. Dapur menerimanya (menunggu)
4. Masakan bermula (sedang disediakan)
5. Hidangan siap (sedia dihidang)
6. Pelayan menghantarnya (dihidang)
7. Juruwang menyelesaikan bayaran dan jualan selesai

Semua orang nampak keadaan setiap item daripada aplikasi, jadi tiada siapa perlu berjalan ke dapur untuk bertanya.`,
  },
  {
    category: "Operasi Harian",
    question: "Kaedah pembayaran apa yang disokong?",
    answer:
      `Tunai, pembayaran QR, kad debit dan kredit, serta pindahan bank. Yang mana muncul di kaunter terpulang sepenuhnya kepada anda — anda menghidupkannya di Web Admin.

Setiap jualan menggunakan satu kaedah bayaran. Memecah satu bil kepada beberapa kaedah tidak disokong.`,
  },
  {
    category: "Operasi Harian",
    question: "Bagaimana diskaun berfungsi?",
    answer:
      `Tiga cara:

• Automatik — ditetapkan di Web Admin, dikenakan sendiri pada produk, kategori, atau keseluruhan jualan, boleh dihadkan mengikut tempoh
• Manual — juruwang memasukkan jumlah atau peratusan semasa jualan
• Diluluskan penyelia — untuk diskaun besar, pengurus meluluskannya dengan PIN sendiri tanpa juruwang perlu log keluar

Ketiga-tiganya boleh digabungkan dalam satu jualan.`,
  },
  {
    category: "Operasi Harian",
    question: "Bagaimana jika internet terputus semasa jualan?",
    answer:
      `Kaunter terus berjalan. Jualan diproses dan disimpan pada peranti, dan semuanya dimuat naik sendiri sebaik talian kembali — laporan anda mengejar tanpa anda buat apa-apa.

Satu pengecualian ialah kaedah bayaran yang perlu disahkan dalam talian, seperti QR dan kad. Tunai berjalan seperti biasa.`,
  },
  {
    category: "Operasi Harian",
    question: "Bagaimana bayaran balik dan pembatalan dibuat?",
    answer:
      `• Batal — sebelum jualan dibayar. Stok kembali secara automatik.
• Bayaran balik — selepas ia dibayar. Jualan ditanda sebagai dipulangkan, stok kembali, dan ia muncul dalam laporan sebagai wang keluar semula.

Kedua-duanya adalah kebenaran yang anda kawal mengikut peranan. Secara lalai juruwang boleh membatalkan, manakala bayaran balik memerlukan kelulusan pengurus.`,
  },
  {
    category: "Operasi Harian",
    question: "Boleh cetak ke pencetak terma?",
    answer:
      `Boleh — jenama pencetak terma yang biasa, melalui Bluetooth atau USB. Resit dicetak automatik sebaik bayaran selesai, atau atas permintaan. Saiz kertas dan kandungan resit boleh ditetapkan bagi setiap cawangan.`,
  },

  // ─── Produk & Stok ──────────────────────────────────────────────────────────

  {
    category: "Produk & Stok",
    question: "Bagaimana cara menambah produk?",
    answer:
      `Dua cara:

1. Satu demi satu — daripada menu Produk di Web Admin: nama, kategori, kos, harga jualan, dan pilihan stok. Anda boleh menambah varian (saiz, warna, perisa).

2. Import CSV — untuk katalog yang besar, muat turun templat, isikan, dan muat naik kesemuanya. Kategori yang belum wujud akan dicipta untuk anda.

Setelah produk wujud, anda boleh memasukkan stok permulaannya bagi setiap cawangan.`,
  },
  {
    category: "Produk & Stok",
    question: "Apa itu varian produk?",
    answer:
      `Varian ialah versi berbeza bagi produk yang sama — kopi saiz kecil, sederhana, besar, atau baju dalam beberapa warna dan saiz. Setiap varian mempunyai harga dan stok tersendiri.

Cara menyediakannya:
1. Cipta atributnya (contohnya "Saiz" dengan S, M, L)
2. Hidupkan "ada varian" pada produk
3. Masukkan harga dan stok bagi setiap gabungan

Di kaunter, juruwang memilih varian semasa menambah item.`,
  },
  {
    category: "Produk & Stok",
    question: "Bagaimana saya tahu stok hampir habis?",
    answer:
      `Dua lapisan.

Produk siap (semua pelan):
Setiap produk mempunyai paras stok minimum yang anda tetapkan bagi setiap cawangan. Jatuh di bawahnya, amaran muncul di halaman Stok Semasa.

Bahan mentah (Pro):
Setiap bahan ada ambang amarannya sendiri. Apabila satu jatuh di bawahnya, sepanduk jingga muncul di bahagian atas halaman Bahan Mentah, menyenaraikan apa yang perlu ditempah semula.`,
  },
  {
    category: "Produk & Stok",
    question: "Apa itu pakej (bundle)?",
    answer:
      `Pakej menjual beberapa produk bersama pada satu harga istimewa — set nasi, lauk, dan minuman pada harga lebih rendah daripada membelinya berasingan.

Ciptanya di Library → Bundle: pilih produknya dan tetapkan harga pakej. Apabila ia terjual, stok setiap komponen berkurang mengikutnya.`,
  },
  {
    category: "Produk & Stok",
    question: "Bagaimana memindahkan stok antara cawangan?",
    answer:
      `Daripada Pemindahan Stok di Web Admin:

1. Buat permintaan — cawangan asal, destinasi, produk, kuantiti
2. Ia menunggu kelulusan
3. Cawangan destinasi meluluskannya
4. Selesaikan pemindahan
5. Stok keluar dari satu cawangan dan masuk ke satu lagi
6. Kedua-dua pergerakan muncul dalam sejarah stok

Pemindahan memerlukan kebenaran tersendiri yang boleh diberikan mengikut peranan.`,
  },

  // ─── Kos & Bahan ────────────────────────────────────────────────────────────

  {
    category: "Kos & Bahan",
    question: "Kenapa penting tahu kos setiap item?",
    answer:
      `Kos barang ialah berapa sebenarnya bahan dalam satu item berharga kepada anda. Mengetahuinya dengan tepat membolehkan anda:

• Menetapkan harga yang tidak diam-diam merugikan
• Melihat margin sebenar setiap produk
• Mengetahui produk mana yang berbaloi ditonjolkan
• Membuat keputusan daripada angka, bukan gerak hati

Tanpanya, sangat mungkin anda menjual sesuatu yang nampak untung tetapi sebenarnya tidak, selepas bahan dan overhed dikira.`,
  },
  {
    category: "Kos & Bahan",
    question: "Bagaimana pengiraan kos automatik berfungsi?",
    answer:
      `1. Daftarkan bahan mentah — nama dan unit (kg, liter, biji)
2. Rekod stok masuk — kuantiti dan harga belian
   → kos purata dikemas kini automatik, secara purata bergerak
3. Tambah resipi pada produk — bahan apa, berapa banyak setiap hidangan
   → kos asas produk dikira secara langsung daripada kos purata × kuantiti
4. Tetapkan overhed — kos tetap bulanan ÷ jangkaan jualan = overhed setiap item
5. Baca cadangan harga — kos + overhed + margin sasaran anda`,
  },
  {
    category: "Kos & Bahan",
    question: "Apa itu kaedah purata bergerak?",
    answer:
      `Ia mengira kos purata anda merentas keseluruhan sejarah pembelian, bukan melompat kepada harga belian terkini sahaja.

Kos baharu = (stok lama × kos lama + kuantiti masuk × harga belian) ÷ (stok lama + kuantiti masuk)

Kesannya: satu pembelian yang mahal tidak tiba-tiba memesongkan margin anda.`,
  },
  {
    category: "Kos & Bahan",
    question: "Bagaimana membina resipi produk?",
    answer:
      `Resipi menyenaraikan bahan dan kuantitinya untuk satu hidangan.

1. Buka produk di Web Admin
2. Pergi ke tab Resipi
3. Cari setiap bahan
4. Tetapkan berapa banyak diperlukan setiap hidangan
5. Simpan

Kos asasnya muncul serta-merta. Selepas itu, menjual produk tersebut akan menolak bahannya secara automatik.`,
  },
  {
    category: "Kos & Bahan",
    question: "Adakah bahan berkurang automatik apabila ada jualan?",
    answer:
      `Ya. Setiap kali produk yang mempunyai resipi terjual dan dibayar, setiap bahan berkurang mengikut kuantiti resipi didarab jumlah yang terjual.

Ia berjalan di latar belakang supaya tidak melambatkan pembayaran. Jika pengurangan gagal atas apa jua sebab, pemilik dimaklumkan untuk penyesuaian secara manual.`,
  },
  {
    category: "Kos & Bahan",
    question: "Apa itu overhed, dan bagaimana ia mempengaruhi harga?",
    answer:
      `Overhed ialah kos tetap bulanan untuk terus beroperasi yang tidak terikat pada mana-mana item — sewa, gaji pentadbiran, elektrik, internet.

Di Tetapan Kewangan anda memasukkan:
• Jumlah kos tetap bulanan
• Jumlah jualan yang anda sasarkan
• → overhed setiap item = satu dibahagi satu lagi

Cadangan harga = (kos bahan + overhed) × (1 + margin sasaran anda).`,
  },
  {
    category: "Kos & Bahan",
    question: "Bagaimana merekod bahan rosak atau terbuang?",
    answer:
      `Di halaman Bahan Mentah, gunakan ikon api pada baris bahan berkenaan. Masukkan berapa banyak yang hilang dan sebabnya (luput, tumpah, dan sebagainya).

Sistem kemudian:
• Mengurangkan stok sebanyak itu
• Merekodkannya sebagai pembaziran, berbeza daripada stok keluar biasa
• Membiarkan kos purata anda tidak berubah — pembaziran tidak mengubah harga yang anda bayar

Merekodnya dengan betul menjaga ketepatan kos dan menjadikan kebocoran kelihatan.`,
  },
  {
    category: "Kos & Bahan",
    question: "Bagaimana pesanan belian berfungsi?",
    answer:
      `Pesanan belian ialah pesanan rasmi kepada pembekal.

1. Tambah pembekal — nama, orang hubungan, telefon, e-mel
2. Cipta PO — nombor, pembekal, dan item berserta kuantiti dan harga
3. Tandakan ia dipesan setelah disahkan dengan pembekal
4. Terima barang — masukkan apa yang benar-benar sampai dan harga akhirnya
   → stok bertambah, dan kos purata dikira semula
5. Ia ditutup sebagai diterima sebahagian atau sepenuhnya

PO memberi anda sejarah pembelian, perbandingan antara pembekal, dan sesuatu untuk menyemak stok.`,
  },

  // ─── Pelanggan & Kesetiaan ──────────────────────────────────────────────────

  {
    category: "Pelanggan & Kesetiaan",
    question: "Ada program mata kesetiaan?",
    answer:
      `Ada, pada pelan Pro. Pelanggan mengumpul mata semasa membeli dan menggunakannya sebagai diskaun pada kunjungan berikutnya.

Anda menetapkan peraturannya: berapa mata bagi setiap jumlah belanja, nilai satu mata, dan minimum sebelum boleh ditebus. Mata terkumpul dengan sendirinya, dan pekerja juga boleh menambahnya secara manual. Setiap perubahan direkod bagi setiap pelanggan di Web Admin.

Tiada aplikasi keahlian berasingan terlibat; semuanya berlaku di kaunter.`,
  },
  {
    category: "Pelanggan & Kesetiaan",
    question: "Adakah rekod pelanggan ada pada semua pelan?",
    answer:
      `Rekod pelanggan — nama, telefon, e-mel, alamat — ada pada Lite dan Pro. Pelan percuma tidak termasuk pengurusan pelanggan.

Pada Pro, setiap pelanggan turut membawa baki mata kesetiaan yang boleh anda lihat dan laraskan dari Web Admin.`,
  },

  // ─── Laporan ────────────────────────────────────────────────────────────────

  {
    category: "Laporan",
    question: "Laporan apa yang saya dapat?",
    answer:
      `Ia berlapis.

Semua pelan, termasuk percuma:
• Sejarah transaksi 30 hari — boleh dicari dan ditapis, dengan butiran penuh

Lite dan Pro:
• Laporan kewangan syif — wang permulaan, jualan, bayaran balik, perbezaan, dan pecahan mengikut kaedah bayaran
• Eksport CSV bagi transaksi dan kewangan syif

Pro sahaja:
• Analitik lebih mendalam — waktu puncak, produk paling laris, perbandingan cawangan, aliran hasil mingguan dan bulanan
• Sejarah penuh pergerakan stok — masuk, keluar, pelarasan, pembaziran, pemindahan
• Keuntungan setiap produk — hasil, kos barang, untung kasar, margin
• Untung bersih dan margin bersih, selepas overhed`,
  },
  {
    category: "Laporan",
    question: "Apa yang ditunjukkan laporan keuntungan?",
    answer:
      `Berapa banyak setiap produk benar-benar memberi anda untung setelah kos sebenar dikira, bukan sekadar berapa banyak ia menjana jualan.

Bagi setiap produk: unit terjual, hasil, jumlah kos barang (bahan serta overhed setiap item), untung kasar, dan peratus margin.

Produk diberi warna mengikut margin — hijau pada 30% ke atas, kuning antara 15% dan 30%, merah di bawah 15% — bagi 7, 30, atau 90 hari lepas.

Satu perkara: ia hanya tepat untuk produk yang mempunyai resipi, kerana di situlah kosnya datang.`,
  },
  {
    category: "Laporan",
    question: "Boleh tapis laporan mengikut cawangan?",
    answer:
      `Boleh. Setiap laporan di Web Admin menerima penapis cawangan daripada senarai di bahagian atas, dan dikemas kini sebaik anda menukarnya.

Pilih "Semua cawangan" untuk keseluruhan perniagaan digabungkan.`,
  },
  {
    category: "Laporan",
    question: "Boleh eksport ke Excel atau PDF?",
    answer:
      `Laporan dieksport ke CSV terus daripada halaman laporan, pada Lite dan Pro. CSV boleh dibuka dalam Excel, Google Sheets, atau mana-mana aplikasi hamparan.

Pro turut mengeksport jurnal perakaunan catatan bergu (debit dan kredit) untuk diserahkan kepada perisian perakaunan anda, yang menjadikan penyesuaian bulanan jauh lebih mudah.

Eksport PDF masih dalam pembinaan.`,
  },

  // ─── Pekerja & Kebenaran ────────────────────────────────────────────────────

  {
    category: "Pekerja & Kebenaran",
    question: "Apa peranan yang ada?",
    answer:
      `Enam sebagai permulaan:

• Pemilik — semuanya, termasuk kebenaran dan laporan kewangan
• Pentadbir — akses Web Admin penuh, seperti pengurus
• Pengurus — semuanya kecuali menukar kebenaran
• Juruwang — aplikasi kaunter sahaja: syif, jualan, bayaran. Tiada laporan kewangan
• Stor — inventori penuh (bahan, PO, pembekal) tanpa akses kaunter dan kewangan
• Pelayan — mengambil pesanan dan menguruskan meja, tetapi tidak boleh menerima bayaran

Tetapan lalai setiap peranan boleh diubah untuk perniagaan anda.`,
  },
  {
    category: "Pekerja & Kebenaran",
    question: "Boleh halusi apa yang setiap peranan boleh buat?",
    answer:
      `Boleh — Tetapan → Kebenaran, di mana anda menghidupkan dan mematikan keupayaan individu bagi setiap peranan.

Contohnya: benarkan juruwang melihat ringkasan syif mereka sendiri; halang pengurus membuka laporan kewangan penuh; benarkan pekerja stor membuat pesanan belian tetapi tidak memadam pembekal.

Perubahan berkuat kuasa serta-merta — tiada siapa perlu log keluar dan masuk semula.`,
  },
  {
    category: "Pekerja & Kebenaran",
    question: "Bagaimana menambah pekerja baharu?",
    answer:
      `Daripada Web Admin → Pekerja:
1. Tambah pekerja
2. Masukkan nama, e-mel, telefon, dan peranan
3. Tetapkan mereka ke satu atau beberapa cawangan
4. Mereka menerima jemputan melalui e-mel dan menetapkan kata laluan sendiri

Juruwang tidak memerlukan e-mel itu setiap hari — setelah peranti terikat pada terminal, PIN sudah memadai.`,
  },
  {
    category: "Pekerja & Kebenaran",
    question: "Apa itu kelulusan penyelia?",
    answer:
      `Ia membolehkan pengurus meluluskan sesuatu yang sensitif — membatalkan jualan, diskaun besar — terus di kaunter, tanpa juruwang log keluar.

Juruwang meminta kelulusan pada skrin, penyelia memasukkan PIN mereka, dan tindakan itu diteruskan dengan rekod siapa yang meluluskannya.

Ia mengelakkan juruwang memerlukan kebenaran yang tidak sepatutnya, tanpa melambatkan barisan.`,
  },

  // ─── Teknikal & Pelan ───────────────────────────────────────────────────────

  {
    category: "Teknikal & Pelan",
    question: "Berapa cawangan dan pengguna yang boleh ditambah?",
    answer:
      `Cawangan bergantung pada pelan:

• Percuma — 1 cawangan, sehingga 500 jualan sebulan
• 30 hari percuma — akses Pro penuh, sehingga 5 cawangan
• Lite — 1 cawangan; cawangan kedua bermakna berpindah ke Pro
• Pro — cawangan tanpa had; yang pertama sudah termasuk dan setiap tambahan dikenakan bayaran bulanan

Pekerja tanpa had pada semua pelan, termasuk percuma. Anda boleh naik atau turun pelan bila-bila masa tanpa kehilangan data.`,
  },
  {
    category: "Teknikal & Pelan",
    question: "Ada kos lain di luar langganan?",
    answer:
      `Tiada yang tersembunyi. Langganan merangkumi ciri dalam pelan anda, kemas kini berterusan, dan sokongan.

Satu-satunya tambahan ialah cawangan tambahan pada Pro, dikenakan bagi setiap cawangan bermula yang kedua. Tiada bayaran pemasangan, tiada bayaran setiap transaksi, dan tiada bayaran setiap pengguna — kami tidak pernah mengambil peratusan daripada jualan anda.`,
  },
  {
    category: "Teknikal & Pelan",
    question: "Aplikasi kaunter boleh berjalan pada peranti apa?",
    answer:
      `Ia percuma pada dua platform:
- Telefon dan tablet Android, daripada Google Play
- PC dan komputer riba Windows 10 dan 11, daripada Microsoft Store

Web Admin berjalan dalam mana-mana pelayar — Chrome, Safari, Firefox, Edge — pada PC, komputer riba, atau tablet.

Untuk pengalaman yang selesa: Android 8 ke atas dengan RAM 3 GB, atau Windows 10 versi 1809 ke atas. Binaan Windows sengaja kecil: muat turun kira-kira 30 MB dan penggunaan memori kira-kira 200 MB, jadi komputer riba lama dengan 2 GB pun masih boleh.`,
  },
  {
    category: "Teknikal & Pelan",
    question: "Bagaimana data perniagaan saya dilindungi?",
    answer:
      `• Disulitkan semasa penghantaran (HTTPS/TLS)
• Token sesi yang tamat tempoh
• Akses berdasarkan peranan, jadi setiap orang hanya sampai ke apa yang dibenarkan
• PIN juruwang tidak pernah disimpan sebagai teks biasa
• Sandaran automatik secara berkala

Kami tidak menjual atau berkongsi data perniagaan anda dengan pihak ketiga.`,
  },
  {
    category: "Teknikal & Pelan",
    question: "Boleh saya minta ciri yang belum ada?",
    answer:
      `Boleh, dan anda tidak perlu menjadi pelanggan berbayar. Jika ada cara kerja perniagaan anda yang belum disokong — laporan tertentu, format resit, peranti yang mahu disambung — hantarkan kepada kami melalui WhatsApp, Instagram @lokakasir.id, atau help@lokakasir.id.

Sertakan nama perniagaan, jenisnya, apa yang anda perlukan, dan sebabnya. Semakin jelas konteksnya, semakin mudah kami menilainya.

Setiap permintaan dibaca. Yang paling ramai perlukan dibina dahulu dan dikeluarkan sebagai kemas kini percuma untuk semua.`,
  },
  {
    category: "Teknikal & Pelan",
    question: "Adakah anda terbuka untuk kerjasama?",
    answer:
      `Ya — dengan perniagaan pelbagai saiz dan jenis: pasar mini, pasar raya, kafe, restoran, runcit, borong, dan perkhidmatan.

Perkara yang boleh dibincangkan: menyesuaikan sistem dengan cara anda sudah beroperasi, melaksanakannya merentas rangkaian atau francais, serta kerjasama penjual semula dan rakan pemasangan tempatan.

Hubungi kami dengan nama perniagaan, jenisnya, bilangan cawangan, bandar, dan apa yang anda fikirkan.`,
  },
  {
    category: "Teknikal & Pelan",
    question: "Bagaimana mendapatkan bantuan?",
    answer:
      `• E-mel help@lokakasir.id — dijawab dalam satu hari bekerja
• Instagram @lokakasir.id untuk kemas kini dan petua

Untuk soalan umum, jawapan di atas ialah jalan terpantas. Untuk sesuatu yang khusus dan mendesak, e-mel kami dengan nama perniagaan dan apa yang berlaku.`,
  },
];
