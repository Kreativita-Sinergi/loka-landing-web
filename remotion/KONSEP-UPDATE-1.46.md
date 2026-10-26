# Konsep Video — Update Loka Kasir 1.40 → 1.46

Untuk Instagram Reels, TikTok, dan Threads. Semua video dibuat dengan Remotion
dari komponen yang sama dengan video fitur di situs, jadi tampilannya selalu
sama dengan yang ada di lokakasir.id.

## Ide besar

**"Kasir cuma buat nyatat? Sekarang Loka kasih rapor."**

Selama ini aplikasi kasir dipersepsikan sebagai alat mencatat. Versi 1.46
mengubah itu: Loka memberi nilai A–E untuk toko, lalu memberi tahu apa yang
perlu ditambah, dikurangi, dan dibenahi. Hook-nya memakai rasa penasaran
("toko saya dapat nilai berapa?"), lalu badannya membuktikan bahwa ini bukan
sekadar satu fitur: ada 7 update besar dalam 10 hari (16–25 Oktober 2026).

Nada: santai, pendek, tanpa kata ganti "Anda/kamu" di layar supaya cocok di
semua platform. Semua teks penting tampil di layar, karena kebanyakan orang
menonton tanpa suara.

## Format

| Komposisi | Ukuran | Durasi | Untuk |
| --- | --- | --- | --- |
| `Update146-Reel` | 1080×1920 (9:16) | ±37 detik | Reels, TikTok, Story, video Threads layar penuh |
| `Update146-Threads` | 1080×1350 (4:5) | ±37 detik | Feed Threads & Instagram (ukuran terbesar di feed) |
| `Update146-RaporToko` | 9:16 | ±18 detik | Seri satu fitur per hari |
| `Update146-GrupEkstra` | 9:16 | ±17 detik | 〃 |
| `Update146-SaldoMember` | 9:16 | ±18 detik | 〃 |
| `Update146-TokoBangunan` | 9:16 | ±17 detik | 〃 |
| `Update146-MejaGratis` | 9:16 | ±18 detik | 〃 |

Teks di format 9:16 dijaga di antara y 250–1600 supaya tidak tertutup tombol
like/komentar dan caption Instagram/TikTok.

## Storyboard video rangkuman (`Update146-Reel` / `Update146-Threads`)

| Detik | Adegan | Teks di layar | Gerak |
| --- | --- | --- | --- |
| 0,0–2,6 | **Hook** | "Kasir cuma buat nyatat?" → lingkaran rapor dengan huruf **B** dibanting ke tengah → "Sekarang Loka kasih rapor." | Kata naik satu per satu; huruf B memantul dan layar bergetar sesaat |
| 2,6–4,2 | **Hitung versi** | UPDATE LOKA KASIR · **1.40 → 1.46** · "7 update dalam 10 hari" | Angka berganti makin cepat lalu berhenti kuning |
| 4,2–9,4 | **01 Rapor Toko** (1.46) | "Tiap Senin, toko dapat rapor A–E" · "Plus saran: stok habis, paket, menu turun" | Nilai B 78/100 → daftar saran → ketuk "Jadikan paket" |
| 9,4–13,8 | **02 Grup Ekstra** (1.44–1.45.1) | "Snack ×3, level 3, tetap rapi" · "Tiap ekstra punya −/+ sendiri, struk merinci harganya" | Grup Level wajib bergetar merah → pilih Level 3 → struk keluar |
| 13,8–18,5 | **03 Saldo & Member** (1.45–1.45.1) | "Pelanggan punya saldo & kartu member" · "Bayar pakai saldo, cek saldo lewat QR" | Pakai saldo setengah + tunai → Lunas → kartu member ber-QR |
| 18,5–23,5 | **04 Toko Bangunan** (1.43) | "Jual kabel per meter, kaca per m²" · "Surat jalan tanpa harga, cetak atau PDF" | Ketik 12,5 meter → masuk keranjang → surat jalan melayang keluar |
| 23,5–28,2 | **05 Biliar & PS** (1.41–1.42) | "Meja gratis hari ini, diundi!" · "Sewa “bayar dulu”: timer jalan setelah lunas" | Sorotan berputar di 8 meja, berhenti di Meja 3 → QR tamu "GRATIS hari ini" |
| 28,2–32,4 | **Dan masih banyak lagi** | Radar Kebocoran · Pojok Pajak 0,5% · Lab Harga · QR penilaian di struk · Panggil Balik · Paket per varian · Buku Bon · Komisi salon · Booking lapangan online · Harga GoFood/Grab · Lancar saat sinyal lemah · Alarm pesanan QR | Stiker-stiker pil muncul bergiliran |
| 32,4–36,6 | **Ajakan** | Logo Loka · "Update gratis, langsung dari Play Store." · **Coba gratis 30 hari** · lokakasir.id · link di bio | Lingkaran biru menyapu layar, tombol kuning berdenyut |

Garis progres lima bagian di atas layar selama segmen fitur, supaya penonton
tahu masih ada fitur berikutnya dan bertahan sampai akhir.

### Musik & efek suara

Musik dari Mixkit (Stock Music Free License: boleh untuk media sosial dan iklan
online, tanpa atribusi; tidak untuk TV/radio atau media fisik). Pilih lewat prop
`track`:

| `track` | Lagu | Karakter | Drop |
| --- | --- | --- | --- |
| `golden` (bawaan) | Golden Storm — Diego Nava | EDM 123 BPM, build-up lalu drop besar | 45,35 dtk |
| `karma` | Karma — Michael Ramir C. | EDM 128 BPM, energi rata sampai akhir | 15,0 dtk |
| `trap` | Trap Electro Vibes — Alejandro Magaña | Trap 110 BPM, lebih "hype" | 12,1 dtk |

Hook (2,6 detik pertama) diisi bagian build-up lagu, dan **drop jatuh tepat saat
angka versi muncul**. Di atasnya ada efek suara yang mengikuti gambar: impact
saat huruf B dibanting, tik tiap angka versi berganti, whoosh di setiap
pergantian fitur, pop untuk tiap stiker "Dan masih banyak lagi", lalu whoosh
besar + hantaman logo di ajakan.

Berkas audio **tidak di-commit** (repo ini publik dan lisensi Mixkit melarang
menyebarkan berkas mentahnya). Unduh dulu sebelum studio/render:

```bash
./remotion/fetch-audio.sh
```

Kalau diunggah ke TikTok/Instagram, musik boleh dimatikan lalu diganti lagu tren
dari pustaka aplikasinya — semua informasi sudah ada di teks.

## Seri satu fitur (5 hari)

Tiap video satu fitur diputar utuh dari video fitur situs (sekitar 13–14 detik)
lalu ditutup ajakan yang sama. Urutan unggah yang disarankan, dimulai dengan
rangkuman:

| Hari | Video | Hook caption |
| --- | --- | --- |
| 1 | `Update146-Reel` + `Update146-Threads` | Kasir cuma buat nyatat? Sekarang Loka kasih rapor. |
| 2 | `Update146-RaporToko` | Toko kamu dapat nilai berapa minggu ini? |
| 3 | `Update146-GrupEkstra` | Pesan seblak level 3, snack 3, kwetiau 1. Kasirnya nggak pusing. |
| 4 | `Update146-SaldoMember` | Pelanggan setia sekarang bisa nabung di toko kamu. |
| 5 | `Update146-TokoBangunan` | Jual kabel 12,5 meter? Ketik aja. |
| 6 | `Update146-MejaGratis` | Meja biliar gratis hari ini — diundi di depan tamu. |

## Caption Instagram / TikTok (video rangkuman)

> Kasir cuma buat nyatat? Sekarang Loka kasih rapor. 📊
>
> 7 update dalam 10 hari, gratis untuk semua pengguna Loka Kasir:
> 🏅 Rapor Toko — nilai A–E tiap Senin + saran yang bisa langsung dikerjakan
> 🌶️ Grup ekstra — level, topping, dan jumlah per ekstra
> 💳 Saldo pelanggan & kartu member ber-QR
> 🧱 Toko bangunan — jual per meter & m², surat jalan tanpa harga
> 🎱 Biliar & PS — meja gratis hari ini, sewa bayar dulu
> ➕ Radar Kebocoran, Pojok Pajak 0,5%, Lab Harga, QR penilaian di struk, Buku Bon, dan banyak lagi
>
> Update aplikasinya di Play Store, atau coba gratis 30 hari di lokakasir.id (link di bio).
>
> #aplikasikasir #kasirumkm #umkmindonesia #lokakasir #posumkm #usahakuliner #tokobangunan #biliar

## Thread (Threads / X)

Post pertama berisi video `Update146-Threads`; sisanya teks pendek, satu fitur
per balasan supaya enak dibagikan ulang.

1. Kasir cuma buat nyatat? Di Loka Kasir 1.46, toko kamu sekarang dapat rapor. 🧵 7 update dalam 10 hari, ini rangkumannya 👇 *(video 4:5)*
2. 🏅 **Rapor Toko** — tiap Senin jam 8 pagi, toko dapat nilai A–E dari 5 pilar: penjualan, untung, menu, pelanggan, kontrol. Plus saran yang diurutkan dari rupiah terbesar: stok laris yang habis, menu yang turun, produk yang cocok dijadikan paket.
3. 🔍 **Radar Kebocoran** — batal nota, refund, diskon manual, dan kas kurang tiap kasir dibandingkan dengan rekannya. Yang janggal langsung kelihatan, tanpa harus curiga duluan.
4. 🧾 **Pojok Pajak** — PPh Final 0,5% dihitung dari omzet, pengingat setor tiap tanggal 10. Alat bantu hitung, bukan nasihat pajak.
5. 🌶️ **Grup ekstra** — buat "Level" dan "Topping" sekali, pasang ke semua menu. Snack ×3 + kwetiau ×1 dalam satu porsi, struk merinci harganya satu per satu. Lahir dari masukan warung seblak prasmanan.
6. 💳 **Saldo pelanggan & kartu member** — pelanggan bisa nitip saldo, bayar sebagian pakai saldo, cek sisa saldo sendiri lewat QR di kartu member.
7. 🧱 **Toko bangunan** — jual per sak, batang, meter, sampai m². Surat jalan tanpa harga, aman dibawa sopir.
8. 🎱 **Biliar & PS** — meja gratis hari ini (bisa diundi!), QR meja menampilkan "GRATIS hari ini", dan sewa "bayar dulu" yang timernya baru jalan setelah lunas.
9. Semua ini update gratis. Pengguna lama tinggal update di Play Store, yang baru bisa coba semua fitur Pro gratis 30 hari: lokakasir.id

## Render

Dari folder `loka-landing-web`:

```bash
./remotion/fetch-audio.sh                  # sekali saja: unduh musik & efek suara
npm run video:studio                       # pratinjau semua komposisi
npx remotion render remotion/index.ts Update146-Reel     out/Update146-Reel.mp4
npx remotion render remotion/index.ts Update146-Threads  out/Update146-Threads.mp4
npx remotion render remotion/index.ts Update146-Reel out/Update146-Reel-trap.mp4 --props='{"format":"reel","track":"trap"}'
npx remotion render remotion/index.ts Update146-RaporToko out/Update146-RaporToko.mp4
npx remotion still  remotion/index.ts Update146-Reel     out/cover.jpg --frame=62   # sampul: huruf B
```

Hasil render terakhir disimpan di `../output/instagram/update-1.46/`.

## Catatan akurasi

- Angka di video adalah data toko demo (Kedai Loka, Seblak Loka, Toko Bangunan
  Sumber Jaya, Biliar Loka), bukan data pelanggan.
- Rapor Toko, Radar, Lab Harga, Panggil Balik, Pojok Pajak, saldo pelanggan,
  dan paket adalah fitur **Pro**. Caption tidak menjanjikan fitur ini di paket
  Gratis.
- Batas setor pajak Oktober 2026 jatuh Minggu 15 November, jadi bergeser ke
  Senin 16 November — itulah tanggal di video Rapor Toko.
