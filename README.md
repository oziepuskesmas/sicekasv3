# SICEKAS v3.0

**Sistem Informasi Catat Pelaporan Puskesmas Banjaran Kota**  
*Dinas Kesehatan Pemerintah Kabupaten Bandung*

---

## 🌟 Tentang SICEKAS v3.0

SICEKAS v3.0 adalah evolusi modern dari sistem operasional dan pelaporan terpadu tenaga kesehatan Puskesmas Banjaran Kota. Versi 3.0 dibangun dengan arsitektur modern berbasis komponen modular, desain antarmuka responsif yang elegan, dan backend *serverless edge* bertenaga **Cloudflare Pages + D1 Database + R2 Object Storage**.

### Modul Utama:
1. **Beranda & Healthcare KPI Analytics**: Visualisasi capaian indikator kesehatan bulanan dan tren serapan anggaran BOK dengan Chart.js.
2. **POA Bulanan (Plan of Action BOK)**: Kalender kegiatan bulanan, integrasi jadwal hari libur nasional & cuti bersama SKB 3 Menteri, dan rekap alokasi anggaran program.
3. **SPPD & LPT Generator (Live Realtime Split A4 View)**:
   - Form input terpadu di sisi kiri dengan simulasi lembar A4 live di sisi kanan.
   - Kop surat resmi Pemkab Bandung & tanda tangan barcode digital Kepala Puskesmas `dr. Rina Indriati`.
   - Cetak presisi A4 (*Zero-Overflow Engine*) langsung siap cetak atau simpan ke PDF.
4. **TP POL (Klaim Jaspel)**: Kalkulator skor otomatis untuk 4 pilar kinerja (Kehadiran 30%, Pelayanan 35%, Administrasi 20%, Perilaku 15%) serta verifikasi status.
5. **Jadwal Kegiatan & Kolaborasi**: Pengajuan dan konfirmasi jadwal tugas luar gedung antar 39 pegawai resmi puskesmas.
6. **Developer Web (God Mode)**: Khusus Super Admin untuk menjalankan SQL Query langsung ke Cloudflare D1, audit logs, dan manajemen file Cloudflare R2.

---

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Icons**: Lucide Icons
- **Charts**: Chart.js + react-chartjs-2
- **Backend / Edge Gateway**: Cloudflare Pages Functions (`functions/api/[[route]].ts`)
- **Database**: Cloudflare D1 (Serverless Distributed SQLite)
- **Object Storage**: Cloudflare R2 (`sicekas-storage`)
- **Hosting & CDN**: Cloudflare Pages (`sicekas-v3`)

---

## 🛠️ Panduan Pengembangan Lokal

```bash
# Clone repository
git clone https://github.com/oziepuskesmas/sicekasv3.git
cd sicekasv3

# Install dependencies (disarankan di drive lokal/NTFS)
npm install

# Jalankan server development
npm run dev

# Build untuk produksi
npm run build
```

---

## 🏛️ Instansi Terkait

- **Fasilitas Pelayanan**: UPTD Puskesmas Banjaran Kota
- **Alamat**: Jl. Stasion No. 42 Kec. Banjaran, Kabupaten Bandung, Jawa Barat 40377
- **Kepala Puskesmas**: dr. Rina Indriati (NIP. 19740404 201411 2 001)
- **Super Admin / Lead Developer**: Mochamad Fauzie, S.Gz
