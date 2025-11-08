# 💬 Sistem Pengingat WhatsApp (Backend)

## 📚 Daftar Isi
- [Gambaran Umum](#gambaran-umum)
- [Fitur Utama](#fitur-utama)
- [Prasyarat](#prasyarat)
- [Langkah-Langkah Instalasi](#langkah-langkah-instalasi)
  1. [Konfigurasi Google Sheets](#1-konfigurasi-google-sheets)
  2. [Konfigurasi WhatsApp Business API](#2-konfigurasi-whatsapp-business-api)
  3. [Konfigurasi Workflow n8n](#3-konfigurasi-workflow-n8n)
- [Arsitektur Workflow](#arsitektur-workflow)
- [Panduan Membangun Workflow](#panduan-membangun-workflow)
  - [Bagian 1: Sistem Pengingat Otomatis](#bagian-1-sistem-pengingat-otomatis)
  - [Bagian 2: Bot WhatsApp Interaktif](#bagian-2-bot-whatsapp-interaktif)
- [Cara Menggunakan](#cara-menggunakan)
- [Pemecahan Masalah](#pemecahan-masalah)
- [Kustomisasi](#kustomisasi)
- [Praktik Terbaik](#praktik-terbaik)
- [Dukungan dan Referensi](#dukungan-dan-referensi)
- [Lisensi](#lisensi)

---

## 🧭 Gambaran Umum
Workflow **n8n** ini membangun sistem pengingat WhatsApp yang cerdas dan otomatis, yang mampu:

- Mengirim pengingat otomatis berdasarkan data di **Google Sheets**
- Membuat pengingat baru melalui pesan WhatsApp
- Menandai tugas sebagai **selesai** langsung dari WhatsApp
- Mendukung pengingat berulang dengan interval yang dapat disesuaikan

---

## ✨ Fitur Utama
✅ **Penjadwalan Otomatis** – Mengecek jadwal setiap 5 menit  
✅ **Komunikasi Dua Arah** – Pengguna bisa membalas bot lewat WhatsApp  
✅ **Integrasi Google Sheets** – Semua data disimpan di spreadsheet  
✅ **Perhitungan Waktu Pintar** – Menyesuaikan waktu pengingat secara dinamis  
✅ **Normalisasi Nomor HP** – Mengubah format nomor agar konsisten (contoh: `628xxxx`)  
✅ **Pelacakan Status** – Otomatis tandai “Selesai” saat pengguna membalas  
✅ **Pengingat Berulang** – Kirim ulang pesan pengingat berdasarkan interval

---

## 🧩 Prasyarat
Sebelum mulai, pastikan kamu sudah memiliki:

- **n8n Instance** – Bisa self-hosted atau cloud (`n8n.cloud`)
- **Akun Google** – Untuk akses ke Google Sheets
- **Akun WhatsApp Business** – Dengan akses API aktif
- **Akun Meta Developer** – Untuk kredensial WhatsApp Business API

---

## ⚙️ Langkah-Langkah Instalasi

### 1. Konfigurasi Google Sheets
#### 🪜 Langkah 1.1: Membuat Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru, beri nama **jadwal**
3. Di baris pertama (Row 1), isi header berikut:

| Nama | Kegiatan | Tanggal | Jam | Nomor Whatsapp | Catatan | Pengingat Sebelum (menit) | Interval (menit) | Status |
|------|-----------|----------|------|-----------------|-----------|-----------------------------|-------------------|---------|

#### 🪜 Langkah 1.2: Deskripsi Kolom
| Kolom | Keterangan |
|--------|-------------|
| **Nama** | Nama pengguna |
| **Kegiatan** | Deskripsi kegiatan/tugas |
| **Tanggal** | Format tanggal `YYYY-MM-DD` |
| **Jam** | Format waktu `HH:MM` |
| **Nomor Whatsapp** | Nomor HP (format internasional, contoh `6285172010442`) |
| **Catatan** | Keterangan tambahan |
| **Pengingat Sebelum (menit)** | Waktu pengingat sebelum acara (contoh: 5) |
| **Interval (menit)** | Jarak antar pengingat berulang (contoh: 10) |
| **Status** | Kosong / “Done” |

#### 🪜 Langkah 1.3: Contoh Data
| Nama | Kegiatan | Tanggal | Jam | Nomor Whatsapp | Catatan | Pengingat Sebelum (menit) | Interval (menit) | Status |
|------|-----------|----------|------|-----------------|-----------|-----------------------------|-------------------|---------|
| John Doe | Meeting Tim | 2025-01-15 | 14:00 | 6285172010442 | Bawa presentasi | 5 | 3 |  |

#### 🪜 Langkah 1.4: Mendapatkan Spreadsheet ID
1. Lihat URL spreadsheet-mu  
   `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`
2. Simpan `[SPREADSHEET_ID]` untuk digunakan di file `.env`

---

### 2. Konfigurasi WhatsApp Business API

#### 🪜 Langkah 2.1: Buat Akun Meta Developer
1. Buka [Meta for Developers](https://developers.facebook.com/)
2. Login dan buat aplikasi baru
3. Pilih tipe aplikasi **Business**

#### 🪜 Langkah 2.2: Tambahkan Produk WhatsApp
1. Pada dashboard aplikasi, klik **Add Product**
2. Pilih **WhatsApp**
3. Klik **Set Up** dan ikuti petunjuk konfigurasi

#### 🪜 Langkah 2.3: Ambil Kredensial API
Catat informasi berikut dari menu WhatsApp > API Setup:
- **Phone Number ID**
- **Access Token** (token permanen)
- **Webhook Verify Token** (buat string rahasia sendiri)

Webhook ini nanti akan dikonfigurasi di n8n.

---

### 3. Konfigurasi Workflow n8n

#### 🪜 Langkah 3.1: Buat Workflow Baru
1. Masuk ke dashboard n8n  
2. Klik **Create New Workflow**  
3. Beri nama **WhatsApp Reminder System**

#### 🪜 Langkah 3.2: Tambahkan Kredensial Google Sheets
1. Buka **Settings > Credentials**
2. Tambahkan kredensial baru → pilih **Google Sheets OAuth2 API**
3. Ikuti proses otorisasi Google
4. Simpan kredensial

#### 🪜 Langkah 3.3: Tambahkan Kredensial WhatsApp
1. Masuk ke **Settings > Credentials**
2. Tambahkan kredensial baru → pilih **HTTP Request / WhatsApp API**
3. Masukkan **Access Token**
4. Simpan

---

## 🧠 Arsitektur Workflow
Workflow ini terdiri dari dua bagian utama:

### 🧩 Bagian 1 – Sistem Pengingat Otomatis
> Schedule Trigger → Get Rows → Hitung Waktu → Kirim Pesan WhatsApp  

### 💬 Bagian 2 – Bot WhatsApp Interaktif
> WhatsApp Trigger → Switch → (Sudah / Pengingat / Halo) → Proses Data → Update Sheet → Kirim Konfirmasi

---

## 🧱 Panduan Membangun Workflow

### 🧭 Bagian 1: Sistem Pengingat Otomatis
1. **Schedule Trigger** – Jalankan setiap 5 menit  
2. **Google Sheets (Get Rows)** – Ambil data jadwal  
3. **Code Node** – Hitung waktu pengingat  
4. **WhatsApp Node** – Kirim pesan otomatis ke nomor yang sesuai  

🧩 Contoh isi pesan:
Halo {{ $json["Nama"] }} 👋
Kegiatan kamu: {{ $json["Kegiatan"] }}
Waktu: {{ $json["Jam"] }}
Catatan: {{ $json["Catatan"] }}
🔔 Pengingat sebelum: {{ $json["Pengingat Sebelum (menit)"] }} menit


---

### 💬 Bagian 2: Bot WhatsApp Interaktif

#### Mode Interaksi:
| Pesan | Fungsi |
|--------|---------|
| **sudah** | Tandai kegiatan sebagai “Selesai” |
| **pengingat** | Tambahkan pengingat baru |
| **halo** | Tampilkan format pengisian pengingat |

---

## 🚀 Cara Menggunakan

### Untuk Pengguna
#### 📝 Membuat Pengingat
1. Kirim pesan `halo` untuk melihat format pengisian  
2. Balas dengan format seperti berikut:


Nama : John Doe
Kegiatan : Meeting Tim
Tanggal : 2025-11-07
Jam : 17:00
Catatan : Presentasi mingguan
Pengingat Sebelum : 5 menit
Interval Reminder : Setiap 3 menit

3. Sistem otomatis menyimpan ke Google Sheets  
4. Pengguna akan menerima konfirmasi dan pengingat otomatis

#### ✅ Menandai Tugas Selesai
Kirim pesan `sudah`, sistem otomatis menandai status menjadi **Done**

---

### Untuk Admin
- Semua jadwal dapat dilihat dan dikelola di **Google Sheets**
- Bisa menambah / menghapus / mengedit langsung dari sheet
- Workflow n8n akan menyesuaikan otomatis

---

## 🧩 Pemecahan Masalah

| Masalah | Penyebab | Solusi |
|----------|-----------|--------|
| Pengingat tidak terkirim | Workflow belum aktif | Aktifkan toggle “Active” di n8n |
| Tidak ada pesan masuk | Webhook salah | Periksa URL webhook di Meta Developer |
| Nomor tidak cocok | Format nomor tidak sesuai | Gunakan format `628xxxxxxxxxx` |
| Status tidak berubah | Kolom pencocokan salah | Pastikan “Column to Match On” = “Nomor Whatsapp” |
| Reminder tidak ditambahkan | Format pesan salah | Gunakan format `Key : Value` dengan tanda titik dua |

---

## ⚙️ Kustomisasi

- **Interval Workflow** → ubah di Schedule Trigger (default: 5 menit)  
- **Template Pesan** → ubah isi node WhatsApp  
- **Penambahan Kolom Baru** → tambahkan di Google Sheets dan update node “Code”  
- **Multi Bahasa** → duplikasi “Switch Node” untuk tiap bahasa  
- **Zona Waktu Lokal** → ubah `TIMEZONE` di `.env`  

---

## 💡 Praktik Terbaik
- Gunakan format nomor internasional (mis. `6285172010442`)
- Uji coba workflow dengan nomor kamu sendiri terlebih dahulu
- Rutin cek **Execution Log** di n8n
- Backup Google Sheets secara berkala
- Jaga keamanan **Access Token**
- Patuhi batas pengiriman pesan dari WhatsApp API

---

## 🧾 Dukungan dan Referensi
📘 Dokumentasi n8n: [https://docs.n8n.io](https://docs.n8n.io)  
📘 WhatsApp Business API: [https://developers.facebook.com/docs/whatsapp](https://developers.facebook.com/docs/whatsapp)  
📘 Google Sheets API: [https://developers.google.com/sheets/api](https://developers.google.com/sheets/api)

---

## ⚖️ Lisensi
Workflow ini disediakan **gratis** untuk tujuan edukasi dan proyek komersial ringan.  
Gunakan dengan bijak dan pastikan kredensial API tidak disebarkan secara publik.

---

**📦 Direktori terkait:**

backend/
├── workflow.json
├── code-nodes/
│ ├── extract_whatsapp_number.js
│ ├── parse_message_to_json.js
│ ├── reminder_trigger.js
│ └── update_status.js
├── env_example.txt
└── README_BACKEND.md
