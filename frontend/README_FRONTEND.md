# 🧭 Frontend – WhatsApp-Based Interaction System

## 📌 Deskripsi
Proyek ini **tidak memiliki antarmuka (UI) frontend tradisional**, karena seluruh proses interaksi dilakukan **langsung melalui platform WhatsApp**.  
Dengan kata lain, **WhatsApp menjadi frontend alami** bagi pengguna untuk menerima notifikasi dan reminder otomatis.

---

## 💬 Cara Kerja "Frontend WhatsApp"
1. **Pengguna hanya perlu menyimpan nomor WhatsApp bot** (gateway) di kontak mereka.
2. **Bot WhatsApp otomatis mengirim pesan pengingat** berdasarkan jadwal yang tersimpan di Google Sheets.
3. Pengguna bisa **membalas pesan secara manual** jika diinginkan (fitur opsional, tergantung API gateway).
4. Sistem menampilkan:
   - Nama kegiatan
   - Waktu pelaksanaan
   - Catatan tambahan
   - Notifikasi bahwa reminder telah dikirim

---

## ⚙️ Alur Proses Singkat
1. Workflow di **n8n** membaca jadwal dari Google Sheets.
2. Saat waktu pengingat tiba, sistem:
   - Mengirim pesan WhatsApp ke nomor pengguna.
   - Mengupdate status di Google Sheets menjadi “Terkirim ✅”.
3. Semua interaksi pengguna terjadi **langsung di WhatsApp**, tanpa perlu membuka website atau aplikasi lain.

---

## 🧠 Teknologi yang Digunakan
| Komponen | Keterangan |
|-----------|-------------|
| Platform | WhatsApp Messenger |
| Gateway/API | WhatsApp API / Chat-API / UltraMsg / Fonnte |
| Format Pesan | Teks dinamis berbasis JSON dari n8n |
| Backend Komunikasi | Workflow n8n (Node HTTP Request) |

---

## 📱 Contoh Pesan Dikirim ke Pengguna
