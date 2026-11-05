# JurnaLink Awards 2026

Microsite kompetisi jurnalistik Jalin dan Kompas TV, dibuat dengan HTML, CSS, dan JavaScript tanpa framework atau proses build.

## Menjalankan

Buka `index.html` langsung di browser atau gunakan ekstensi Live Server di VS Code. Tidak perlu instalasi dependency. Font Albert Sans dimuat dari Google Fonts dan membutuhkan koneksi internet.

## Struktur

- `index.html` — konten halaman, kategori, hadiah, juri, formulir, timeline, dan syarat ketentuan.
- `assets/css/styles.css` — tampilan dan pengaturan responsif.
- `assets/img/` — logo, ilustrasi, dan gambar pendukung.
- `assets/js/navigation.js` — navigasi dan perilaku header.
- `assets/js/reveal.js` — efek fade-in konten saat halaman dibuka atau digulir.
- `assets/js/submission.js` — penanganan formulir submission.
- `design ai/` — berkas desain sumber.

## Pengaturan hero

- Desktop (lebar mulai 1024px): `hero-character.png`, judul 48px.
- Mobile (lebar di bawah 1024px): `hero-character-m.png`, judul 40px.
- Kedua karakter menggunakan elemen `<img>` dengan posisi absolute dan berganti tanpa transisi.
- Teks mobile berada di atas karakter melalui z-index. Jarak vertikalnya diatur lewat `margin-top` pada `.hero-copy` dalam media query mobile.
- Animasi reveal menggunakan opacity tanpa translate X/Y.

## Formulir dan publikasi

Formulir belum terhubung ke backend; data tidak dikirim. Konfigurasikan endpoint dan penanganan pengiriman di `assets/js/submission.js` sebelum digunakan untuk pendaftaran.

Untuk publikasi, unggah `index.html` beserta folder `assets/` ke hosting statis dengan struktur folder yang sama.
