export interface PengikutItem {
  id: string;
  nama: string;
  nip: string;
  pangkat_gol: string;
  jabatan: string;
  keterangan: string;
}

export interface HasilKegiatanItem {
  id: string;
  uraian: string;
  sasaran_target: string;
  volume: string;
  keterangan: string;
}

export interface PetugasPelaporItem {
  id: string;
  nama: string;
  nip: string;
  jabatan: string;
  pangkat_gol?: string;
  is_checked?: boolean;
}

export interface SppdData {
  id?: string;
  no_surat: string;
  tanggal_surat: string;
  petugas_nip: string;
  petugas_nama: string;
  petugas_jabatan: string;
  petugas_pangkat_gol: string;
  maksud_perjalanan: string;
  alat_angkut: string;
  tempat_berangkat: string;
  tempat_tujuan: string;
  tanggal_berangkat: string;
  tanggal_kembali: string;
  lama_hari: number;
  instansi_beban: string;
  mata_anggaran: string;
  pengikut: PengikutItem[];
  keterangan_lain?: string;
}

export interface LptData {
  id?: string;
  no_surat: string;
  tanggal_laporan: string;
  maksud_tujuan: string;
  tempat_tujuan: string;
  tanggal_pelaksanaan: string;
  hasil_kegiatan: HasilKegiatanItem[];
  kendala_masalah: string;
  saran_pemecahan: string;
  petugas_pelapor: PetugasPelaporItem[];
  foto_dokumentasi?: string[];
}

export interface SppdTemplate {
  id: string;
  nama_template: string;
  template_type: 'sppd' | 'lpt' | 'full';
  username: string;
  no_surat?: string;
  maksud_kegiatan?: string;
  tempat_berangkat?: string;
  tempat_tujuan?: string;
  pengikut_data?: PengikutItem[];
  lpt_data?: Partial<LptData>;
  is_favorite: number;
  created_at: string;
}
