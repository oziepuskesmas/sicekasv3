export interface TpPolItem {
  id: string;
  bulan: number;
  tahun: number;
  petugas_nip: string;
  petugas_nama: string;
  petugas_jabatan: string;
  skor_kehadiran: number;
  skor_pelayanan: number;
  skor_administrasi: number;
  skor_perilaku: number;
  total_skor: number;
  catatan?: string;
  form_data?: string;
  status_verifikasi: 'Terverifikasi' | 'Menunggu Verifikasi' | 'Perbaikan';
  verified_by?: string;
  verified_at?: string;
  created_at?: string;
  updated_at?: string;
}
