export interface JadwalItem {
  id: string;
  tanggal: string;
  bulan: number;
  tahun: number;
  nama_kegiatan: string;
  keterangan?: string;
  lokasi?: string;
  petugas_nip: string;
  petugas_nama: string;
  petugas_jabatan?: string;
  rekan_kolaborasi?: string;
  status: 'Disetujui' | 'Pending' | 'Ditolak';
  created_at?: string;
  updated_at?: string;
}

export interface CollabRequest {
  id: string;
  from_nip: string;
  from_nama: string;
  from_jabatan?: string;
  from_username?: string;
  to_nip?: string;
  to_nama: string;
  to_jabatan?: string;
  to_username?: string;
  tanggal: string;
  bulan: number;
  tahun: number;
  no_kegiatan: number;
  nama_kegiatan: string;
  keterangan?: string;
  lokasi?: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at?: string;
  updated_at?: string;
}
