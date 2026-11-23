export interface PoaItem {
  id: string;
  tanggal?: string;
  bulan: number;
  tahun: number;
  petugas_nip: string;
  petugas_nama: string;
  petugas_jabatan?: string;
  program_kesehatan: string;
  uraian_kegiatan: string;
  keterangan?: string;
  target_sasaran?: string;
  lokasi_pelaksanaan?: string;
  vol_kegiatan: number;
  satuan: string;
  anggaran_bok: number;
  sumber_dana: string;
  status: 'Aktif' | 'Terlaksana' | 'Dibatalkan';
  created_at?: string;
  updated_at?: string;
}

export interface HolidayItem {
  tanggal: string;
  nama: string;
  is_cuti_bersama?: boolean;
}
