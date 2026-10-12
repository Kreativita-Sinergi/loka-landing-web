/**
 * Data teks video fitur. Dipisah dari komponennya supaya daftar tab bisa
 * tampil seketika, sementara Remotion Player & isi video dimuat belakangan.
 */
export type FeatureVideoId =
  | 'QrOrder'
  | 'RentalTimer'
  | 'BookingLapangan'
  | 'QrisOtomatis'
  | 'ProdukPO'
  | 'SatuanBerat'
  | 'BarangTitipan'
  | 'SupplierPO'
  | 'Laporan'
  | 'Referal'
  | 'SemuaUsaha';

export type FeatureVideoMeta = {
  id: FeatureVideoId;
  icon: 'qr' | 'timer' | 'calendar' | 'zap' | 'package' | 'scale' | 'handshake' | 'truck' | 'chart' | 'gift' | 'store';
  tab: string;
  title: string;
  desc: string;
};

export const FEATURE_VIDEO_META: FeatureVideoMeta[] = [
  { id: 'QrOrder', icon: 'qr', tab: 'QR Order', title: 'Pelanggan pesan sendiri dari meja', desc: 'Scan QR di meja, pilih menu dari HP, pesanan langsung masuk ke kasir dan papan dapur. Tamu bisa memantau statusnya sendiri.' },
  { id: 'RentalTimer', icon: 'timer', tab: 'Rental PS & Biliar', title: 'Timer sewa yang menagih sendiri', desc: 'Paket hitung mundur atau argo per jam. Tamu cek sisa waktu dan minta perpanjang lewat QR meja, promo jam sepi berlaku otomatis.' },
  { id: 'BookingLapangan', icon: 'calendar', tab: 'Booking Lapangan', title: 'Booking lapangan tanpa bentrok', desc: 'Padel, futsal, mini soccer, dan badminton dalam satu kalender. Tarif jam sibuk dan DP terhitung sendiri.' },
  { id: 'QrisOtomatis', icon: 'zap', tab: 'QRIS Otomatis', title: 'QRIS lunas tanpa cek mutasi', desc: 'Notifikasi dana masuk di HP pemilik dicocokkan otomatis dengan tagihan yang menunggu. Nota lunas, struk langsung tercetak.' },
  { id: 'ProdukPO', icon: 'package', tab: 'Produk PO', title: 'Jual produk PO walau stok belum ada', desc: 'Tandai produk pre-order, terima DP, lalu pantau Menunggu → Siap → Diambil. Stok baru terpotong saat barang diserahkan.' },
  { id: 'SatuanBerat', icon: 'scale', tab: 'Satuan Berat', title: 'Jual per kilo, ons, atau gram', desc: 'Harga tampil per kg, ons, atau gram. Ketik beratnya, subtotal langsung terhitung, cocok untuk kopi, sayur, daging, dan barang curah.' },
  { id: 'BarangTitipan', icon: 'handshake', tab: 'Barang Titipan', title: 'Titipan tercatat, setoran jelas', desc: 'Catat penitip dan hak per barang. Yang terjual terhitung otomatis, setoran dan retur sisa cukup sekali tekan.' },
  { id: 'SupplierPO', icon: 'truck', tab: 'Supplier & PO', title: 'Belanja stok lewat Purchase Order', desc: 'Simpan supplier, kirim PO, terima barang sebagian atau penuh. Stok dan HPP bahan baku ikut diperbarui.' },
  { id: 'Laporan', icon: 'chart', tab: 'Laporan Lengkap', title: 'Untung-rugi kelihatan jelas', desc: 'Omzet, laba kotor, produk terlaris, jam ramai, sampai laba per produk dari HPP. Bisa dipantau dari mana saja.' },
  { id: 'Referal', icon: 'gift', tab: 'Program Referal', title: 'Ajak teman, saldo Anda bertambah', desc: 'Teman hemat hingga Rp50.000 di pembayaran pertamanya, Anda dapat saldo hingga Rp59.000 untuk memotong tagihan langganan.' },
  { id: 'SemuaUsaha', icon: 'store', tab: 'Semua Jenis Usaha', title: 'Satu aplikasi, banyak jenis usaha', desc: 'Kafe, rental, lapangan, bengkel, konter HP, apotek, laundry, sampai toko retail, plus kasbon, absensi, dan mode offline.' },
];
