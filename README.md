# Website Bakso Boom Enggal Kasmaran

Website statis untuk UMKM **Bakso Boom Enggal Kasmaran**, warung mie bakso dan mie pangsit. Dibuat sebagai tugas kuliah Teknik Komputer berdasarkan hasil wawancara dengan penjual.

Website ini memperkenalkan usaha, menampilkan daftar menu dan harga, serta membantu pelanggan menghitung perkiraan biaya untuk pesanan acara (minimal 50 porsi).

## Fitur

- **5 halaman**: Beranda, Menu & Harga, Pesanan Acara, Tentang, Kontak
- **Menu & harga** 10 item (mie bakso, mie pangsit, lontong) sesuai daftar menu di warung
- **Label Rekomendasi** pada Mie Bakso Boom dan Mie Pangsit Boom
- **Kalkulator pesanan acara**
  - Mengatur jumlah tiap menu dengan tombol tambah/kurangi atau mengetik langsung
  - Menghitung total porsi dan perkiraan biaya otomatis
  - Mengecek minimal 50 porsi (lontong tidak dihitung sebagai porsi)
  - Menyalin ringkasan pesanan
  - Tombol "Kirim lewat WhatsApp" yang muncul setelah pesanan mencapai 50 porsi
- **Mode terang dan gelap** (mengikuti pengaturan perangkat, bisa diganti manual, pilihan tersimpan)
- **Responsif** untuk HP, tablet, dan desktop
- **Kontak & lokasi** dengan peta Google Maps dan link WhatsApp

## Teknologi

HTML5, CSS3 (CSS variables, Grid, Flexbox), dan JavaScript murni tanpa framework dan tanpa library tambahan. Font Poppins dimuat dari Google Fonts.

## Struktur Folder

```
bakso-boom/
├── index.html            Beranda
├── menu.html             Menu & Harga
├── pesanan-acara.html    Kalkulator pesanan acara
├── tentang.html          Tentang usaha
├── kontak.html           Kontak & lokasi
├── css/
│   └── style.css         Seluruh gaya (tema terang/gelap, responsif)
├── js/
│   ├── data.js           Data menu, nomor WhatsApp, minimal porsi
│   └── main.js           Tema, navigasi HP, kalkulator pesanan
└── images/               Foto warung, mie, dapur, dan daftar menu
```

## Cara Menjalankan

1. Ekstrak folder proyek.
2. Buka `index.html` di browser.

Agar font dan peta Google Maps tampil, perangkat perlu terhubung ke internet. Untuk pengembangan, bisa juga memakai ekstensi **Live Server** di VS Code, atau menjalankan `python -m http.server` di dalam folder proyek lalu membuka `http://localhost:8000`.

## Deploy

**Cloudflare Pages (drag & drop)**
1. Buka Cloudflare Dashboard, masuk ke Workers & Pages, lalu Create, Pages, Upload assets.
2. Tarik seluruh isi folder proyek (bukan zip-nya), lalu Deploy.

**Cloudflare Pages (via Git)**
1. Unggah proyek ke repositori GitHub.
2. Hubungkan repositori di Cloudflare Pages, kosongkan build command, dan isi output directory dengan `/` (folder utama).

## Mengubah Isi Website

| Yang ingin diubah | Lokasi |
|---|---|
| Nomor WhatsApp | `js/data.js` (`waNumber`, format `628...` tanpa 0 di depan) dan `kontak.html` |
| Harga atau nama menu | `index.html`, `menu.html`, `pesanan-acara.html`, dan `js/data.js` (harga muncul di keempat file ini) |
| Minimal porsi pesanan acara | `js/data.js` (`minPorsi`) dan teks di `pesanan-acara.html` |
| Label Rekomendasi | Tambah atau hapus `<span class="badge">Rekomendasi</span>` pada nama menu |
| Warna utama | `css/style.css`, variabel `--merah` dan `--kuning` di bagian atas |
| Foto | Ganti file di folder `images/` (pertahankan nama file atau ubah di HTML) |
| Jam buka | Teks "10.00 – 22.00 WITA" di semua halaman |

## Informasi Usaha (dari wawancara)

- Nama usaha: Bakso Boom Enggal Kasmaran
- Jam buka: 10.00 – 22.00 WITA
- Pembayaran: tunai dan QRIS
- Layanan antar dan pesan online: tidak tersedia
- Pesanan acara: diterima mulai 50 porsi
- Lokasi: lihat halaman Kontak (Google Maps)

## Catatan

- Usaha belum memiliki logo. Tanda "BB" pada website hanya logo sementara.
- Alamat lengkap belum dicantumkan, lokasi saat ini mengandalkan peta Google Maps.
- Perkiraan biaya pada kalkulator hanya estimasi. Harga akhir, jadwal, dan pengiriman dibicarakan langsung dengan penjual.
- Deskripsi isi menu seperti "Tennes" dan "Boom" belum ditambahkan karena belum ada keterangan dari penjual.

## Pembuat

Muh. Syafaat Aslam, mahasiswa Teknik Komputer.
