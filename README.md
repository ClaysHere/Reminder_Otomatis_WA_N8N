### Anggota Kelompok:
1. M. Fikri – 221110816
2. Irham Dinni Harahap – 221111602
3. Arda putra Sulistyo - 221111185



# 🤖 Reminder WhatsApp Automation using n8n

## 📘 Deskripsi Proyek
Proyek ini merupakan sistem **pengingat otomatis melalui WhatsApp** yang dibangun menggunakan **n8n** — platform workflow automation berbasis open-source.  
Sistem bekerja **tanpa frontend dan backend tradisional**, melainkan memanfaatkan **workflow n8n** yang menghubungkan antara **Google Sheets** dan **WhatsApp API** untuk mengirimkan pesan pengingat secara otomatis kepada pengguna sesuai jadwal.

---

## ⚙️ Arsitektur Sistem

📦 reminder-whatsapp-n8n/
</br>
├── 📂 backend/
</br>
│ ├── workflow.json ← File utama workflow n8n
</br>
│ ├── code-nodes/ ← Kumpulan script custom untuk node Function di n8n
</br>
│ │ ├── extract_whatsapp_number.js
</br>
│ │ ├── parse_message_to_json.js
</br>
│ │ ├── parse_data_spreadsheet.js
</br>
│ ├── env_example.txt ← Contoh konfigurasi environment variables
</br>
│ └── README_BACKEND.md ← Dokumentasi detail backend
</br>
│
</br>
├── 📂 frontend/
</br>
│ └── README_FRONTEND.md ← Penjelasan bahwa sistem berjalan via WhatsApp tanpa UI
</br>
│
</br>
├── 📂 video/
</br>
│ └── demo-link.txt ← Link video demo (Google Drive / YouTube)
</br>
│
</br>
├── 📄 anggota_kelompok.txt ← Daftar nama & NIM seluruh anggota kelompok
</br>
└── 📄 README.md ← Dokumentasi utama


---

## 💡 Fungsionalitas Utama

1. **Input Data Reminder**
   - Data pengingat (nama, kegiatan, tanggal, jam, nomor WhatsApp, catatan, dll.) disimpan di **Google Sheets**.
   - Kolom tambahan: `Pengingat Sebelum (menit)` untuk menentukan waktu pengiriman otomatis.

2. **Trigger Otomatis**
   - Node `Schedule Trigger` di n8n memeriksa jadwal secara berkala.
   - Node `Code (reminder_trigger.js)` menghitung waktu pengiriman berdasarkan selisih waktu sekarang dan jadwal reminder.

3. **Kirim Pesan WhatsApp**
   - Pesan dikirim otomatis menggunakan **HTTP Request Node** yang terhubung ke **WhatsApp API Gateway** (misalnya: CallMeBot, UltraMsg, atau API lokal).
   - Pesan berisi detail kegiatan dan waktu.

4. **Update Status**
   - Setelah pesan terkirim, workflow otomatis memperbarui kolom `Status` di Google Sheet menjadi `Done` hanya pada **baris pertama** yang cocok dengan nomor WhatsApp tersebut.

---

## 🧩 Teknologi yang Digunakan

| Komponen | Teknologi / Platform |
|-----------|----------------------|
| Automation Engine | [n8n](https://n8n.io/) |
| Database | Google Sheets |
| Messaging API | WhatsApp API (CallMeBot / UltraMsg / Custom API) |
| Runtime Script | Node.js (JavaScript pada Code Node) |
| Deployment | n8n Cloud / Self-hosted Docker |

---

## 🔧 Konfigurasi & Environment

Buat file `.env` di dalam folder `backend/` berdasarkan contoh berikut:

```bash
# === Example Environment Variables ===
WHATSAPP_API_URL=https://api.callmebot.com/whatsapp.php
WHATSAPP_API_KEY=YOUR_API_KEY_HERE
SPREADSHEET_ID=YOUR_GOOGLE_SHEET_ID
SHEET_NAME=Reminder
TIMEZONE=Asia/Jakarta
CHECK_INTERVAL_MINUTES=1
```

```plaintext
Pastikan:

SPREADSHEET_ID sesuai dengan ID Google Sheet kamu.

WHATSAPP_API_URL dan WHATSAPP_API_KEY menyesuaikan dengan layanan yang kamu pakai.

🚀 Cara Menjalankan Proyek

Jalankan n8n (lokal atau via cloud):
n8n start

Impor file workflow.json ke dalam n8n Editor.

Atur semua credential node (Google Sheet dan WhatsApp API).

Uji dengan mengirim pesan pengingat melalui workflow manual atau biarkan dijalankan otomatis sesuai jadwal.

🧠 Kompleksitas & Inovasi

Proyek ini menunjukkan penerapan automasi berbasis AI workflow sederhana, dengan logika pengolahan data terintegrasi menggunakan script Node.js di dalam n8n.
Tanpa perlu membuat frontend/backend tradisional, sistem ini tetap mendemonstrasikan:

Integrasi API (WhatsApp & Google Sheets)

Otomasi berbasis waktu dan kondisi

Data processing dan update dinamis

🏁 Kesimpulan

Proyek ini menggambarkan bagaimana AI workflow automation dapat digunakan untuk membuat sistem pengingat yang sepenuhnya otomatis, efisien, dan tanpa infrastruktur kompleks.
Melalui n8n, seluruh alur — mulai dari input data, pemrosesan waktu, pengiriman pesan, hingga pembaruan status — dapat dijalankan secara end-to-end dalam satu platform.
```
