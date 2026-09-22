# Portofolio Profesional & Layanan Interaktif Web (Coastal Teal & Warm Sand Edition)

> **Tugas Mandiri Praktikum Minggu 02**  
> **Mata Kuliah:** Pemrograman dan Pengujian Aplikasi Web (12S3101)  
> **Program Studi:** S1 Sistem Informasi • Fakultas Informatika dan Teknik Elektro  
> **Institusi:** Institut Teknologi Del, Sitoluama, Laguboti, Sumatera Utara  
> **Dosen Pengampu:** Chandro Pardede, S.Kom., M.Sc.  

---

## Identitas Mahasiswa & Profil Profesional (LinkedIn Verified)

| Informasi | Detail |
| :--- | :--- |
| **Nama Lengkap** | **Nicolas J Grace Butarbutar** |
| **NIM** | **12S24038** |
| **Program Studi** | S1 Sistem Informasi (2024 &ndash; 2028) |
| **Fakultas / Kampus** | Fakultas Informatika & Teknik Elektro (FITE) • Institut Teknologi Del |
| **Asal Sekolah** | SMA Swasta W. R. Supratman 2 Medan (2021 &ndash; 2024) |
| **Headline Profesional** | *Information Systems Student at Institut Teknologi Del \| Aspiring Data Enthusiast, Web Developer, and Cyber Security Enthusiast \| Open to Internship Opportunities* |
| **Lokasi / Domisili** | Medan, Sumatera Utara, Indonesia & Sitoluama, Laguboti |
| **Surel Resmi** | `nicolaszuliaaan@gmail.com` |
| **WhatsApp Kontak** | `+62 853-5937-3663` |
| **Profil LinkedIn** | [linkedin.com/in/nicolasjgracebutarbutar](nicolasjgracebutarbutar) |
| **Profil GitHub** | [github.com/NicolasButarbutar](NicolasButarbutar) |
| **Nama Repositori Tugas** | `ppw-2026-week2-12S24038` |
| **Tautan Repositori GitHub** | [https://github.com/NicolasButarbutar/ppw-2026-week2-12S24038](PPW-2026-WEEK2-12S24038) |
| **Tautan Live Demo GitHub Pages** | https://NicolasButarbutar.github.io/ppw-2026-week2-12S24038/|

---


## Matriks Pemenuhan Kriteria & Rubrik Penilaian (100% Bobot)

| No | Komponen Penilaian | Bobot | Kriteria Evaluasi Modul | Bukti Implementasi pada Proyek |
| :---: | :--- | :---: | :--- | :--- |
| **1** | **Struktur Semantik HTML5** | **20%** | Memanfaatkan tag semantik `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` secara tepat tanpa *div-soup* berlebihan. Struktur dokumen valid dan logis. | &check; Memuat `<header>`, `<nav>`, `<main>`, 6 `<section>` tematik (`#tentang`, `#pengalaman`, `#sertifikasi`, `#portofolio`, `#metodologi`, `#layanan`), kartu karya `<article>`, sidebar `<aside>`, serta `<footer>` resmi. Dilengkapi *Skip Link* aksesibilitas. |
| **2** | **Penyajian Data (List & Table)** | **15%** | Tabel semantik lengkap (`<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<caption>`, `scope="col/row"`) dengan styling rapi; penggunaan HTML lists konsisten untuk hierarki informasi. | &check; Memuat tabel data semantik lengkap `modern-table` berisi seluruh sertifikasi BINUS & prestasi USU Olympiad dengan `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, dan atribut `scope="col/row"`. Memuat minimal dua jenis list: `<ul>` (top skills & organisasi), `<ol>` (rincian pengalaman programming club & 4 tahap alur kerja rekayasa), dan `<dl>` (metadata identitas resmi). |
| **3** | **Desain Form & Aksesibilitas** | **20%** | Kontrol input lengkap (minimal 6 jenis), pengelompokan `<fieldset>` & `<legend>`, keterhubungan label eksplisit, atribut validasi native, dan keyboard accessible (WCAG 2.2). | &check; Formulir memiliki 2 blok `<fieldset>` & `<legend>`, 8 jenis input kontrol (`text`, `email`, `tel`, `number`, `radio`, `checkbox`, `select`, `textarea`), seluruhnya memiliki pasangan eksplisit `<label for="...">`, `aria-describedby` ke hint text, `aria-required="true"`, dan fokus ring tebal. Terintegrasi tombol submit otomatis ke WhatsApp resmi (**085359373663**). |
| **4** | **Estetika & Tata Letak Modern CSS** | **25%** | External CSS (`style.css`), Universal Box Sizing Reset, palet harmonis 60-30-10, tipografi modern, rounded corner, soft drop shadow, transisi hover, tata letak Flexbox/Grid, responsif media query (`@media (max-width: 768px)`). | &check; Berkas `style.css` eksternal terpisah, universal reset `*, *::before, *::after { box-sizing: border-box; }`, aturan warna 60-30-10 dengan 4 palet swatch pengguna, CSS Grid multi-kolom, Flexbox nav/hero, hover lift `translateY(-4px)`, bayangan halus berlapis, serta responsif di berbagai resolusi layar. |
| **5** | **Git & Deployment GitHub Pages** | **20%** | Repositori terstruktur rapi, commit message jelas, README.md informatif (deskripsi + panduan), dan link GitHub Pages berfungsi live tanpa galat. | &check; Struktur repositori bersih (`index.html`, `style.css`, `README.md`), penamaan repositori standar `ppw-2026-week2-12S24038`, dan panduan deployment terperinci. |

---

## Panduan Inisialisasi Git & Deployment GitHub Pages

Sesuai dengan **Bagian VI. Panduan Pengumpulan Tugas** pada modul:

```bash
# 1. Inisialisasi Git repository lokal
git init

# 2. Tambahkan seluruh berkas ke staging area
git add .

# 3. Buat commit perdana dengan pesan standar modul
git commit -m "feat: complete week 2 html5 and modern css assignment"

# 4. Hubungkan remote repository GitHub
# (Pastikan Anda telah membuat repositori baru di GitHub dengan nama: ppw-2026-week2-12S24038)
git remote add origin https://github.com/NicolasButarbutar/ppw-2026-week2-12S24038.git

# 5. Tetapkan nama cabang utama ke 'main'
git branch -M main

# 6. Unggah kode ke repositori GitHub
git push -u origin main
```

### Aktivasi GitHub Pages:
1. Buka repositori Anda di GitHub: `https://github.com/NicolasButarbutar/ppw-2026-week2-12S24038`.
2. Klik tab **Settings** &rarr; menu **Pages** di sebelah kiri.
3. Pada **Build and deployment > Branch**, pilih **`main`** lalu klik **Save**.
4. Website akan aktif secara live di: `https://NicolasButarbutar.github.io/ppw-2026-week2-12S24038/`.
5. Kumpulkan URL Repositori dan URL Live Demo ke form perkuliahan: `https://forms.gle/XSsAm2Ukb4Av5pjLA`.

---

*Dikembangkan untuk memenuhi standar mutu akademik Institut Teknologi Del & profil profesional LinkedIn Nicolas J Grace Butarbutar.*
