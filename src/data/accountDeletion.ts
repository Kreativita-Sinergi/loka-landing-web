import { pick, type Locale } from "./localized";

/**
 * Teks halaman `/hapus-akun`.
 *
 * PERINGATAN: halaman ini bukan copy pemasaran. Ia janji tertulis tentang apa
 * yang dihapus dan kapan, dan Google Play menilai keberadaannya sebagai syarat
 * publikasi. Karena itu ANGKA DAN JANJINYA HARUS SAMA PERSIS di keempat bahasa
 * — 7 hari kerja, 30 hari untuk cadangan — dan bila salah satunya diubah,
 * semuanya harus ikut berubah dalam satu perubahan yang sama.
 *
 * Terjemahan di bawah ini disusun agar bermakna sama, bukan agar terdengar
 * bagus. Sebelum tayang, sebaiknya ditinjau seseorang yang memahami kewajiban
 * hukum di pasar tujuan — terutama bagian retensi.
 */
type StepCopy = {
  title: string;
  /** Bagian sebelum tautan email. */
  lead: string;
  /** Bagian sesudah tautan email; kosongkan bila langkahnya tanpa tautan. */
  tail: string;
};

type AccountDeletionCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lastUpdated: string;
  intro: string;
  stepsHeading: string;
  steps: StepCopy[];
  deletedHeading: string;
  deletedLead: string;
  deleted: { label: string; body: string }[];
  retentionHeading: string;
  retention: string[];
  partialHeading: string;
  partialBody: string;
  contactHeading: string;
  contactEmail: string;
  contactPhone: string;
  contactDeveloper: string;
  rights: string;
};

const copyByLocale: Record<Locale, AccountDeletionCopy> = {
  id: {
    metaTitle: "Hapus Akun & Data",
    metaDescription:
      "Cara meminta penghapusan akun Loka Kasir beserta seluruh data terkait, jenis data yang dihapus, dan periode retensinya.",
    title: "Hapus Akun & Data",
    lastUpdated: "Terakhir diperbarui: 8 Juli 2026",
    intro:
      "Halaman ini menjelaskan cara meminta penghapusan akun aplikasi Loka Kasir (dikembangkan oleh Kreativita Sinergi) beserta seluruh data yang terkait dengan akun tersebut, sesuai persyaratan Google Play Store.",
    stepsHeading: "Langkah Meminta Penghapusan Akun",
    steps: [
      {
        title: "Kirim permintaan penghapusan",
        lead: "Kirim email ke ",
        tail: " dengan subjek “Permintaan Hapus Akun”, atau hubungi kami via telepon/WhatsApp di +62 853-9373-7313.",
      },
      {
        title: "Sertakan data akun terdaftar",
        lead: "Cantumkan nomor telepon atau email yang terdaftar di akun Loka Kasir Anda beserta nama bisnis. Permintaan harus dikirim dari email/nomor yang terdaftar sebagai verifikasi kepemilikan akun.",
        tail: "",
      },
      {
        title: "Verifikasi & konfirmasi",
        lead: "Tim kami akan memverifikasi kepemilikan akun dan mengirimkan konfirmasi. Setelah Anda mengonfirmasi, akun beserta datanya dihapus maksimal 7 hari kerja.",
        tail: "",
      },
    ],
    deletedHeading: "Data yang Dihapus",
    deletedLead:
      "Setelah permintaan diproses, data berikut dihapus permanen dan tidak dapat dipulihkan:",
    deleted: [
      { label: "Data Akun:", body: "nama, nomor telepon, email, dan kata sandi." },
      { label: "Data Bisnis:", body: "nama bisnis, outlet, produk, stok, karyawan, dan pengaturan." },
      { label: "Data Transaksi:", body: "riwayat penjualan, laporan, dan data pembayaran." },
      { label: "Media:", body: "foto produk dan logo bisnis yang tersimpan di server kami." },
    ],
    retentionHeading: "Periode Retensi Data",
    retention: [
      "Penghapusan dari sistem aktif dilakukan maksimal 7 hari kerja setelah permintaan terverifikasi.",
      "Salinan pada cadangan (backup) sistem terhapus otomatis maksimal 30 hari setelahnya.",
      "Catatan transaksi tertentu dapat disimpan lebih lama hanya jika diwajibkan oleh peraturan perundang-undangan (mis. kewajiban perpajakan), dalam bentuk yang tidak lagi terhubung dengan akun Anda.",
    ],
    partialHeading: "Penghapusan Sebagian Data",
    partialBody:
      "Jika Anda hanya ingin menghapus sebagian data (mis. foto produk atau data outlet tertentu) tanpa menghapus akun, sampaikan detailnya melalui kontak yang sama di bawah — kami akan membantu memprosesnya.",
    contactHeading: "Hubungi Kami",
    contactEmail: "Email:",
    contactPhone: "Telepon / WhatsApp:",
    contactDeveloper: "Developer:",
    rights: "Seluruh hak cipta dilindungi.",
  },
  en: {
    metaTitle: "Delete Your Account & Data",
    metaDescription:
      "How to request deletion of your Loka Kasir account and all associated data, what gets deleted, and how long anything is retained.",
    title: "Delete Your Account & Data",
    lastUpdated: "Last updated: 8 July 2026",
    intro:
      "This page explains how to request deletion of your Loka Kasir account (developed by Kreativita Sinergi) and all data associated with it, in line with Google Play Store requirements.",
    stepsHeading: "How to Request Deletion",
    steps: [
      {
        title: "Send the deletion request",
        lead: "Email ",
        tail: " with the subject “Account Deletion Request”, or contact us by phone or WhatsApp on +62 853-9373-7313.",
      },
      {
        title: "Include your registered account details",
        lead: "Give the phone number or email address registered to your Loka Kasir account, along with the business name. The request must come from the registered email or number, which is how we verify that the account is yours.",
        tail: "",
      },
      {
        title: "Verification and confirmation",
        lead: "We verify ownership of the account and send you a confirmation. Once you confirm, the account and its data are deleted within 7 working days at the latest.",
        tail: "",
      },
    ],
    deletedHeading: "What Gets Deleted",
    deletedLead:
      "Once the request is processed, the following is permanently deleted and cannot be recovered:",
    deleted: [
      { label: "Account data:", body: "name, phone number, email address, and password." },
      { label: "Business data:", body: "business name, outlets, products, stock, staff, and settings." },
      { label: "Transaction data:", body: "sales history, reports, and payment records." },
      { label: "Media:", body: "product photos and business logos stored on our servers." },
    ],
    retentionHeading: "Retention Periods",
    retention: [
      "Deletion from active systems happens within 7 working days at the latest, once the request is verified.",
      "Copies held in system backups are removed automatically within 30 days after that.",
      "Certain transaction records may be kept longer only where legislation requires it (tax obligations, for example), in a form no longer linked to your account.",
    ],
    partialHeading: "Deleting Only Part of Your Data",
    partialBody:
      "If you'd rather delete only some data — a set of product photos, or one outlet — without closing the account, send us the details through the same contact below and we'll handle it.",
    contactHeading: "Contact Us",
    contactEmail: "Email:",
    contactPhone: "Phone / WhatsApp:",
    contactDeveloper: "Developer:",
    rights: "All rights reserved.",
  },
  ms: {
    metaTitle: "Padam Akaun & Data",
    metaDescription:
      "Cara memohon penghapusan akaun Loka Kasir berserta semua data berkaitan, apa yang dipadam, dan tempoh penyimpanannya.",
    title: "Padam Akaun & Data",
    lastUpdated: "Kemas kini terakhir: 8 Julai 2026",
    intro:
      "Halaman ini menerangkan cara memohon penghapusan akaun Loka Kasir (dibangunkan oleh Kreativita Sinergi) berserta semua data yang berkaitan dengannya, selaras dengan keperluan Google Play Store.",
    stepsHeading: "Langkah Memohon Penghapusan",
    steps: [
      {
        title: "Hantar permohonan penghapusan",
        lead: "E-mel kepada ",
        tail: " dengan subjek “Permohonan Padam Akaun”, atau hubungi kami melalui telefon atau WhatsApp di +62 853-9373-7313.",
      },
      {
        title: "Sertakan maklumat akaun berdaftar",
        lead: "Nyatakan nombor telefon atau alamat e-mel yang berdaftar dengan akaun Loka Kasir anda, berserta nama perniagaan. Permohonan mesti dihantar daripada e-mel atau nombor berdaftar, dan itulah cara kami mengesahkan akaun tersebut milik anda.",
        tail: "",
      },
      {
        title: "Pengesahan dan pengesahan semula",
        lead: "Kami mengesahkan pemilikan akaun dan menghantar pengesahan kepada anda. Setelah anda mengesahkan, akaun berserta datanya dipadam dalam tempoh selewat-lewatnya 7 hari bekerja.",
        tail: "",
      },
    ],
    deletedHeading: "Apa Yang Dipadam",
    deletedLead:
      "Setelah permohonan diproses, yang berikut dipadam secara kekal dan tidak boleh dipulihkan:",
    deleted: [
      { label: "Data akaun:", body: "nama, nombor telefon, alamat e-mel, dan kata laluan." },
      { label: "Data perniagaan:", body: "nama perniagaan, cawangan, produk, stok, pekerja, dan tetapan." },
      { label: "Data transaksi:", body: "sejarah jualan, laporan, dan rekod pembayaran." },
      { label: "Media:", body: "gambar produk dan logo perniagaan yang tersimpan pada pelayan kami." },
    ],
    retentionHeading: "Tempoh Penyimpanan",
    retention: [
      "Penghapusan daripada sistem aktif dilakukan dalam tempoh selewat-lewatnya 7 hari bekerja selepas permohonan disahkan.",
      "Salinan dalam sandaran sistem dipadam secara automatik dalam tempoh 30 hari selepas itu.",
      "Rekod transaksi tertentu mungkin disimpan lebih lama hanya jika dikehendaki undang-undang (contohnya kewajipan cukai), dalam bentuk yang tidak lagi terikat dengan akaun anda.",
    ],
    partialHeading: "Memadam Sebahagian Data Sahaja",
    partialBody:
      "Jika anda hanya mahu memadam sebahagian data — beberapa gambar produk, atau satu cawangan — tanpa menutup akaun, hantarkan butirannya melalui hubungan yang sama di bawah dan kami akan uruskan.",
    contactHeading: "Hubungi Kami",
    contactEmail: "E-mel:",
    contactPhone: "Telefon / WhatsApp:",
    contactDeveloper: "Pembangun:",
    rights: "Hak cipta terpelihara.",
  },
  ja: {
    metaTitle: "アカウントとデータの削除",
    metaDescription:
      "Loka Kasir のアカウントと関連データの削除を依頼する方法、削除される内容、そして保持期間についてご説明します。",
    title: "アカウントとデータの削除",
    lastUpdated: "最終更新：2026年7月8日",
    intro:
      "このページでは、Loka Kasir（開発：Kreativita Sinergi）のアカウントと、それに紐づくすべてのデータの削除を依頼する方法をご説明します。Google Play ストアの要件に沿った内容です。",
    stepsHeading: "削除依頼の手順",
    steps: [
      {
        title: "削除の依頼を送る",
        lead: "件名を「アカウント削除の依頼」として ",
        tail: " 宛にメールをお送りください。お電話または WhatsApp（+62 853-9373-7313）でも承ります。",
      },
      {
        title: "登録済みのアカウント情報を添える",
        lead: "Loka Kasir に登録されている電話番号またはメールアドレスと、店舗名をご記入ください。ご本人確認のため、依頼は登録済みのメールアドレスまたは番号からお送りいただく必要があります。",
        tail: "",
      },
      {
        title: "確認とご返信",
        lead: "こちらでアカウントの所有者確認を行い、確認のご連絡を差し上げます。お客様のご確認後、アカウントとデータは遅くとも7営業日以内に削除されます。",
        tail: "",
      },
    ],
    deletedHeading: "削除される内容",
    deletedLead: "依頼を受け付けたのち、次の情報は完全に削除され、復元はできません。",
    deleted: [
      { label: "アカウント情報：", body: "氏名、電話番号、メールアドレス、パスワード。" },
      { label: "店舗情報：", body: "店舗名、各店舗、商品、在庫、スタッフ、各種設定。" },
      { label: "取引情報：", body: "売上履歴、レポート、決済の記録。" },
      { label: "画像：", body: "当社のサーバーに保存されている商品写真と店舗ロゴ。" },
    ],
    retentionHeading: "保持期間",
    retention: [
      "稼働中のシステムからの削除は、依頼の確認後、遅くとも7営業日以内に行います。",
      "バックアップ内の複製は、その後30日以内に自動的に削除されます。",
      "一部の取引記録は、法令で求められる場合に限り（税務上の義務など）、お客様のアカウントとは結びつかない形でより長く保持されることがあります。",
    ],
    partialHeading: "一部のデータだけを削除する場合",
    partialBody:
      "アカウントは残したまま、一部のデータ（商品写真や特定の店舗など）だけを削除したい場合は、下記の同じ窓口に内容をお知らせください。こちらで対応いたします。",
    contactHeading: "お問い合わせ",
    contactEmail: "メール：",
    contactPhone: "電話 / WhatsApp：",
    contactDeveloper: "開発元：",
    rights: "All rights reserved.",
  },
};

export const getAccountDeletion = (locale: Locale) => pick(copyByLocale, locale);
