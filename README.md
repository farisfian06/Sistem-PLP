# Sistem PLP (Pengenalan Lingkungan Persekolahan)

Sistem PLP adalah aplikasi web untuk mengelola proses Pengenalan Lingkungan Persekolahan (PLP) atau praktik mengajar di sekolah menengah kejuruan (SMK). Aplikasi ini memfasilitasi seluruh proses mulai dari pendaftaran mahasiswa, penempatan di SMK, hingga pencatatan dan validasi kegiatan harian (logbook).

## Teknologi yang Digunakan

### Backend
- [Laravel](https://laravel.com/) - Framework PHP untuk pengembangan web
- MySQL - Database relasional

### Frontend
- [React](https://reactjs.org/) - Library JavaScript untuk membangun antarmuka pengguna
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript dengan pengetikan statis
- [Inertia.js](https://inertiajs.com/) - Library untuk menghubungkan Laravel dengan React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [Flowbite React](https://flowbite-react.com/) - Komponen UI berbasis Tailwind CSS
- [React Icons](https://react-icons.github.io/react-icons/) - Library ikon untuk React

### Build Tools
- [Vite](https://vitejs.dev/) - Build tool dan development server
- [Laravel Vite Plugin](https://github.com/laravel/vite-plugin) - Plugin untuk integrasi Vite dengan Laravel

## Fitur Utama

### Manajemen Pengguna
- Multi-role: Mahasiswa, Guru, Dosen Pembimbing, Kaprodi, Dosen Koordinator, dan Akademik
- Autentikasi dan otorisasi berbasis peran

### Pendaftaran PLP
- Mahasiswa dapat mendaftar untuk program PLP
- Memilih keminatan (spesialisasi)
- Memilih preferensi SMK (2 pilihan)
- Input nilai PLP 1 dan Micro Teaching

### Penempatan dan Pembagian
- Admin dapat menempatkan mahasiswa ke SMK
- Penugasan dosen pembimbing dan guru pamong
- Pengelolaan data SMK dan penanggung jawab

### Logbook
- Mahasiswa dapat mencatat kegiatan harian
- Dokumentasi kegiatan dengan detail waktu
- Sistem persetujuan dua tingkat (guru pamong dan dosen pembimbing)
- Status logbook: pending, approved, rejected

### Dashboard dan Laporan
- Tampilan ringkasan untuk semua pengguna
- Akses ke data sesuai dengan peran pengguna

## Instalasi

### Prasyarat
- PHP >= 8.1
- Composer
- Node.js dan npm
- MySQL

### Langkah Instalasi

1. Clone repositori
   ```bash
   git clone https://github.com/farisfian06/Sistem-PLP.git
   cd Sistem-PLP
   ```

2. Instal dependensi PHP
   ```bash
   composer install
   ```

3. Instal dependensi JavaScript
   ```bash
   npm install
   ```

4. Salin file .env.example menjadi .env dan konfigurasi database
   ```bash
   cp .env.example .env
   ```

5. Generate application key
   ```bash
   php artisan key:generate
   ```

6. Jalankan migrasi database
   ```bash
   php artisan migrate
   ```

7. Kompilasi aset frontend
   ```bash
   npm run build
   ```

8. Jalankan server development
   ```bash
   php artisan serve
   ```

9. Akses aplikasi di browser: http://localhost:8000

## Penggunaan

### Login
- Gunakan kredensial yang sesuai dengan peran Anda
- Sistem akan mengarahkan ke dashboard yang sesuai dengan peran

### Untuk Mahasiswa
1. Daftar untuk program PLP
2. Isi logbook kegiatan harian
3. Lihat status persetujuan logbook

### Untuk Guru Pamong dan Dosen Pembimbing
1. Validasi logbook mahasiswa
2. Pantau kemajuan mahasiswa

### Untuk Admin (Kaprodi, Dosen Koordinator, Akademik)
1. Kelola data pengguna
2. Kelola data SMK
3. Lakukan penempatan mahasiswa
4. Pantau seluruh kegiatan PLP

## Struktur Proyek

```
Sistem-PLP/
├── app/                    # Kode PHP aplikasi
│   ├── Http/               
│   │   ├── Controllers/    # Controller aplikasi
│   │   └── Middleware/     # Middleware aplikasi
│   └── Models/             # Model database
├── database/               # Migrasi dan seeder database
├── resources/              
│   ├── js/                 # Kode frontend React
│   │   ├── Components/     # Komponen React
│   │   └── Pages/          # Halaman React
│   └── views/              # Template blade
├── routes/                 # Definisi rute aplikasi
└── public/                 # Aset publik
```

## Kontributor

- [Faris Ihsan Alifian](https://github.com/farisfian06)
- [Halilintar Daiva Dirgantara](https://github.com/HalDaiva)
- [Ila Virnanda Fitriana](https://github.com/ila-vf)

## Kontak

Untuk pertanyaan atau dukungan, silakan hubungi [halilintardaiva@student.ub.ac.id](mailto:halilintardaiva@student.ub.ac.id)
