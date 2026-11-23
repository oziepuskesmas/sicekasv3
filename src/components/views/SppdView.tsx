import React, { useState } from 'react';
import { 
  Printer, 
  Plus, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw,
  FileCheck2,
  QrCode,
  Eye
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OFFICIAL_PEGAWAI } from '../../data/pegawai';
import { KEGIATAN_BOK_LIST } from '../../data/programs';

interface PengikutItem {
  id: string;
  nama: string;
  nip: string;
  keterangan: string;
}

export const SppdView: React.FC = () => {
  const { user } = useAuth();
  
  // Tab View Selection: Lembar 1, Lembar 2 (Visum), Lembar 3 (LPT), or Semua (All 3)
  const [activeTab, setActiveTab] = useState<'depan' | 'belakang' | 'lpt' | 'semua'>('depan');

  // SPPD Main State
  const [noSurat, setNoSurat] = useState('090/042/PKM-BKT/VIII/2026');
  const [tanggalSurat, setTanggalSurat] = useState('18 Agustus 2026');
  
  // Pegawai Utama (Default Mochamad Fauzie, S.Gz as in photo, or active user)
  const defaultPegawai = OFFICIAL_PEGAWAI.find(p => p.nama.toLowerCase().includes('fauzie')) || OFFICIAL_PEGAWAI[0];
  const [pegawaiNama, setPegawaiNama] = useState(defaultPegawai?.nama || 'Mochamad Fauzie, S.Gz');
  const [pegawaiNip, setPegawaiNip] = useState(defaultPegawai?.nip || '873.3204.16.02.008');
  const [pegawaiJabatan, setPegawaiJabatan] = useState(defaultPegawai?.jabatan || 'Nutrisionis');
  const [pegawaiGolongan, setPegawaiGolongan] = useState(defaultPegawai?.golongan || 'BLUD');

  const [maksudPerjalanan, setMaksudPerjalanan] = useState(
    'Pelayanan Kesehatan Ibu Nifas dan Neonatus (KF & KN) di Wilayah Kerja Desa Banjaran'
  );
  const [alatAngkut, setAlatAngkut] = useState('Kendaraan Pribadi / Roda Dua');
  const [tempatBerangkat, setTempatBerangkat] = useState('Puskesmas Banjaran Kota');
  const [tempatTujuan, setTempatTujuan] = useState('Desa Banjaran & Desa Tarajusari');
  const [tanggalBerangkat, setTanggalBerangkat] = useState('18 Agustus 2026');
  const [tanggalKembali, setTanggalKembali] = useState('18 Agustus 2026');
  const [lamaHari, setLamaHari] = useState(1);
  const [instansiBeban, setInstansiBeban] = useState('Puskesmas Banjaran Kota');
  const [mataAnggaran, setMataAnggaran] = useState('BOK DAK Non Fisik Puskesmas 2026');

  // Pengikut List
  const [pengikut, setPengikut] = useState<PengikutItem[]>([
    { id: '1', nama: 'Eva Farida, S.Keb', nip: '', keterangan: 'Pengikut' },
    { id: '2', nama: 'N. Yayat Rohayati, AM.Keb', nip: '', keterangan: 'Pengikut' }
  ]);

  // Visum Belakang State
  const [visumTiba1, setVisumTiba1] = useState('Desa Banjaran');
  const [visumTibaTgl1, setVisumTibaTgl1] = useState('18 Agustus 2026');
  const [visumKepala1, setVisumKepala1] = useState('Kepala Desa Banjaran');
  const [visumBrgkt1, setVisumBrgkt1] = useState('Desa Banjaran');
  const [visumKe1, setVisumKe1] = useState('Desa Tarajusari');
  const [visumBrgktTgl1, setVisumBrgktTgl1] = useState('18 Agustus 2026');
  const [visumKepalaKanan1, setVisumKepalaKanan1] = useState('Kepala Desa Banjaran');

  const [visumTiba2, setVisumTiba2] = useState('Desa Tarajusari');
  const [visumTibaTgl2, setVisumTibaTgl2] = useState('18 Agustus 2026');
  const [visumKepala2, setVisumKepala2] = useState('Kepala Desa Tarajusari');
  const [visumBrgkt2, setVisumBrgkt2] = useState('Desa Tarajusari');
  const [visumKe2, setVisumKe2] = useState('Puskesmas Banjaran Kota');
  const [visumBrgktTgl2, setVisumBrgktTgl2] = useState('18 Agustus 2026');
  const [visumKepalaKanan2, setVisumKepalaKanan2] = useState('Kepala Desa Tarajusari');

  // LPT State
  const [lptDasar, setLptDasar] = useState('SPT Nomor 090/042/PKM-BKT/VIII/2026 tanggal 18 Agustus 2026');
  const [lptTujuan, setLptTujuan] = useState('Pelayanan Kesehatan Ibu Nifas dan Neonatus (KF & KN) di Wilayah Kerja Desa Banjaran');
  const [lptProses, setLptProses] = useState(
    'Pelayanan kesehatan ibu nifas dan neonatus (KF & KN) dilaksanakan secara langsung ke rumah sasaran di Desa Banjaran dan Desa Tarajusari. Pemeriksaan fisik pada ibu nifas meliputi pemeriksaan tanda-tanda vital, involusi uterus, lokhea, dan edukasi perawatan payudara serta ASI eksklusif. Pemeriksaan pada neonatus meliputi penimbangan berat badan, pemeriksaan refleks, tanda bahaya bayi baru lahir, dan skrining awal kelainan bawaan.'
  );
  const [lptMasalah, setLptMasalah] = useState(
    'Pelaksanaan kunjungan lapangan berjalan dengan tertib dan lancar. Tidak ada hambatan berarti yang dihadapi dalam proses pelayanan.'
  );
  const [lptKesimpulan, setLptKesimpulan] = useState(
    'Sasaran ibu nifas dan neonatus telah mendapatkan pelayanan sesuai standar operasional Puskesmas Banjaran Kota. Disarankan untuk terus meningkatkan koordinasi dengan kader posyandu setempat untuk pemantauan pasca persalinan lanjutan.'
  );

  // Settings
  const [showBarcode, setShowBarcode] = useState(true);

  // Handle Employee Dropdown Selection
  const handleSelectPegawai = (name: string) => {
    const found = OFFICIAL_PEGAWAI.find(p => p.nama === name);
    if (found) {
      setPegawaiNama(found.nama);
      setPegawaiNip(found.nip || '');
      setPegawaiJabatan(found.jabatan || 'Nutrisionis');
      setPegawaiGolongan(found.golongan || 'BLUD');
    } else {
      setPegawaiNama(name);
    }
  };

  // Quick Preset BOK Activity
  const handleSelectPresetBok = (kegiatan: string) => {
    setMaksudPerjalanan(kegiatan);
    setLptTujuan(kegiatan);
    setLptDasar(`SPT Nomor ${noSurat} tanggal ${tanggalSurat}`);
    setLptProses(`Kegiatan ${kegiatan} dilaksanakan oleh tim pelaksana Puskesmas Banjaran Kota dengan mendatangi sasaran di ${tempatTujuan}. Petugas melakukan pencatatan, penyuluhan terarah, serta tindak lanjut sesuai standar pelayanan operasional.`);
  };

  // Pengikut handlers
  const handleAddPengikut = () => {
    setPengikut([
      ...pengikut,
      { id: Date.now().toString(), nama: '', nip: '', keterangan: 'Pengikut' }
    ]);
  };

  const handleRemovePengikut = (index: number) => {
    setPengikut(pengikut.filter((_, i) => i !== index));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Studio Header & Actions */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5 rounded-3xl bg-[#0d1320]/80 border border-teal-500/20 backdrop-blur-xl shadow-xl no-print">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/30">
              Format Resmi Puskesmas Banjaran Kota
            </span>
            <span className="text-xs text-slate-400">Standar BOK DAK 2026</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">SPPD & LPT Studio</h2>
          <p className="text-sm text-slate-400">
            Cetak dokumen Surat Perjalanan Dinas (Lembar 1, Visum Lembar 2) dan LPT sesuai format resmi
          </p>
        </div>

        {/* Tab & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="flex bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('depan')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'depan' 
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Lembar Depan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('belakang')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'belakang' 
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Lembar Visum
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('lpt')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'lpt' 
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Dokumen LPT
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('semua')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'semua' 
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua Lembar
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-black text-xs hover:brightness-110 shadow-lg shadow-teal-500/25 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak A4 / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Controls & Right Document Preview */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Editor (no-print) */}
        <div className="xl:col-span-5 space-y-5 no-print">
          
          {/* Quick Preset Selector */}
          <div className="p-4 rounded-3xl bg-[#0d1320]/80 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-teal-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Preset Cepat BOK Bankot
              </span>
              <span className="text-[10px] text-slate-500">Auto-fill form</span>
            </div>
            <select
              onChange={(e) => {
                if (e.target.value) handleSelectPresetBok(e.target.value);
              }}
              defaultValue=""
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-teal-400"
            >
              <option value="" disabled>-- Pilih Jenis Kegiatan BOK Puskesmas --</option>
              {KEGIATAN_BOK_LIST.map((k, idx) => (
                <option key={idx} value={k}>{k}</option>
              ))}
            </select>
          </div>

          {/* Form Settings & Fields */}
          <div className="p-5 rounded-3xl bg-[#0d1320]/80 border border-slate-800 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-sm text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-teal-400" />
                Data SPPD & Pelaksana
              </span>
              
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={showBarcode}
                  onChange={(e) => setShowBarcode(e.target.checked)}
                  className="rounded text-teal-500 focus:ring-0 bg-slate-900 border-slate-700"
                />
                <span className="flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-teal-400" /> Barcode TTD
                </span>
              </label>
            </div>

            {/* Nomor & Tanggal Surat */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Nomor Surat SPPD</label>
                <input
                  type="text"
                  value={noSurat}
                  onChange={(e) => setNoSurat(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-teal-400"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Tanggal Surat</label>
                <input
                  type="text"
                  value={tanggalSurat}
                  onChange={(e) => setTanggalSurat(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-400"
                />
              </div>
            </div>

            {/* Dropdown Pegawai Pelaksana (39 Official Pegawai) */}
            <div className="text-xs">
              <label className="block text-slate-400 mb-1 font-semibold">
                Pilih Pegawai Pelaksana (39 Pegawai Bankot)
              </label>
              <select
                value={pegawaiNama}
                onChange={(e) => handleSelectPegawai(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-teal-300 font-semibold text-xs focus:border-teal-400 mb-2"
              >
                {OFFICIAL_PEGAWAI.map((p, idx) => (
                  <option key={idx} value={p.nama}>
                    {p.nama} {p.nip ? `(${p.nip})` : ''} - {p.jabatan}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="NIP / NRP"
                  value={pegawaiNip}
                  onChange={(e) => setPegawaiNip(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-[11px]"
                />
                <input
                  type="text"
                  placeholder="Pangkat/Gol"
                  value={pegawaiGolongan}
                  onChange={(e) => setPegawaiGolongan(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-[11px]"
                />
                <input
                  type="text"
                  placeholder="Jabatan"
                  value={pegawaiJabatan}
                  onChange={(e) => setPegawaiJabatan(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-[11px]"
                />
              </div>
            </div>

            {/* Maksud Perjalanan Dinas */}
            <div className="text-xs">
              <label className="block text-slate-400 mb-1 font-semibold">Maksud Perjalanan Dinas</label>
              <textarea
                rows={2}
                value={maksudPerjalanan}
                onChange={(e) => setMaksudPerjalanan(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-400"
              />
            </div>

            {/* Transport & Rute */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Alat Angkutan</label>
                <input
                  type="text"
                  value={alatAngkut}
                  onChange={(e) => setAlatAngkut(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Tempat Berangkat</label>
                <input
                  type="text"
                  value={tempatBerangkat}
                  onChange={(e) => setTempatBerangkat(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-slate-400 mb-1 font-semibold">Tempat Tujuan</label>
                <input
                  type="text"
                  value={tempatTujuan}
                  onChange={(e) => setTempatTujuan(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>

            {/* Tanggal & Durasi */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Tgl Berangkat</label>
                <input
                  type="text"
                  value={tanggalBerangkat}
                  onChange={(e) => setTanggalBerangkat(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-[11px]"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Tgl Kembali</label>
                <input
                  type="text"
                  value={tanggalKembali}
                  onChange={(e) => setTanggalKembali(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-[11px]"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Lama (Hari)</label>
                <input
                  type="number"
                  value={lamaHari}
                  onChange={(e) => setLamaHari(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-[11px]"
                />
              </div>
            </div>

            {/* Pengikut Section */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-300 text-xs">Pengikut Perjalanan Dinas</span>
                <button
                  type="button"
                  onClick={handleAddPengikut}
                  className="text-teal-400 hover:text-teal-300 text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Pengikut
                </button>
              </div>
              <div className="space-y-2">
                {pengikut.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs w-4">{idx + 1}.</span>
                    <input
                      type="text"
                      placeholder="Nama & Gelar Pengikut"
                      value={item.nama}
                      onChange={(e) => {
                        const next = [...pengikut];
                        next[idx].nama = e.target.value;
                        setPengikut(next);
                      }}
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePengikut(idx)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Pembebanan Anggaran */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Instansi</label>
                <input
                  type="text"
                  value={instansiBeban}
                  onChange={(e) => setInstansiBeban(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Mata Anggaran</label>
                <input
                  type="text"
                  value={mataAnggaran}
                  onChange={(e) => setMataAnggaran(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>

          </div>

          {/* LPT Text Form Fields */}
          <div className="p-5 rounded-3xl bg-[#0d1320]/80 border border-slate-800 shadow-xl space-y-3">
            <span className="font-bold text-sm text-teal-300 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4" /> Isian Dokumen LPT
            </span>

            <div className="text-xs">
              <label className="block text-slate-400 mb-1 font-semibold">1. Dasar</label>
              <input
                type="text"
                value={lptDasar}
                onChange={(e) => setLptDasar(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>

            <div className="text-xs">
              <label className="block text-slate-400 mb-1 font-semibold">2. Tujuan Perjalanan</label>
              <input
                type="text"
                value={lptTujuan}
                onChange={(e) => setLptTujuan(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>

            <div className="text-xs">
              <label className="block text-slate-400 mb-1 font-semibold">3a. Proses Pelaksanaan</label>
              <textarea
                rows={3}
                value={lptProses}
                onChange={(e) => setLptProses(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>

            <div className="text-xs">
              <label className="block text-slate-400 mb-1 font-semibold">3b. Permasalahan yang Dihadapi</label>
              <textarea
                rows={2}
                value={lptMasalah}
                onChange={(e) => setLptMasalah(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>

            <div className="text-xs">
              <label className="block text-slate-400 mb-1 font-semibold">4. Kesimpulan / Saran</label>
              <textarea
                rows={2}
                value={lptKesimpulan}
                onChange={(e) => setLptKesimpulan(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Live Printable Document Preview (EXACT A4 REPLICA) */}
        <div className="xl:col-span-7 w-full flex flex-col items-center">
          
          {/* ================================================================= */}
          {/* 1. LEMBAR DEPAN (SPPD)                                            */}
          {/* ================================================================= */}
          {(activeTab === 'depan' || activeTab === 'semua') && (
            <div 
              id="sppdSheetDepan"
              className={`sppd-doc-sheet-exact ${activeTab === 'semua' ? 'print-page-break' : ''}`}
            >
              {/* Kop Surat Resmi */}
              <div className="sppd-kop-container">
                <img 
                  src="/kabbandung.png" 
                  onError={(e) => {
                    const w = window as any;
                    if (w.SPPD_ASSETS && w.SPPD_ASSETS.logo) {
                      e.currentTarget.src = w.SPPD_ASSETS.logo;
                    }
                  }}
                  alt="Logo Pemkab Bandung" 
                  className="sppd-kop-logo" 
                />
                <div className="sppd-kop-text">
                  <div className="sppd-kop-line1">PEMERINTAH KABUPATEN BANDUNG</div>
                  <div className="sppd-kop-line2">DINAS KESEHATAN</div>
                  <div className="sppd-kop-line3">UPTD PUSKESMAS BANJARAN KOTA</div>
                  <div className="sppd-kop-line4">Jl. Stasion No. 42 Kec. Banjaran, Kabupaten Bandung, Jawa Barat 40377</div>
                  <div className="sppd-kop-line5">Email: pkmbanjarankota@gmail.com • Telp. (022) 5940xxx</div>
                </div>
              </div>
              <div className="sppd-kop-divider"></div>

              {/* Title Header */}
              <div className="sppd-title-center-box">
                <div className="sppd-title">SURAT PERINTAH PERJALANAN DINAS (SPPD)</div>
                <div className="sppd-subtitle">Nomor: {noSurat}</div>
              </div>

              {/* Exact SPPD Table (Gambar 1) */}
              <table className="exact-sppd-table">
                <tbody>
                  <tr>
                    <td className="sppd-num-col">1.</td>
                    <td className="sppd-desc-col">Pejabat Pembuat Komitmen</td>
                    <td className="sppd-val-col">Kepala UPTD Puskesmas Banjaran Kota</td>
                  </tr>

                  <tr>
                    <td className="sppd-num-col">2.</td>
                    <td className="sppd-desc-col">Nama / NIP Pegawai yang diperintah</td>
                    <td className="sppd-val-col">
                      <div style={{ fontWeight: 'bold' }}>{pegawaiNama}</div>
                      <div style={{ marginTop: '2px', fontSize: '9pt' }}>{pegawaiNip}</div>
                    </td>
                  </tr>

                  <tr>
                    <td className="sppd-num-col">3.</td>
                    <td className="sppd-desc-col">
                      <div>a. Pangkat dan Golongan</div>
                      <div style={{ marginTop: '2px' }}>b. Jabatan / Instansi</div>
                    </td>
                    <td className="sppd-val-col">
                      <div>a. {pegawaiGolongan}</div>
                      <div style={{ marginTop: '2px' }}>b. {pegawaiJabatan} / {instansiBeban}</div>
                    </td>
                  </tr>

                  <tr style={{ minHeight: '50px' }}>
                    <td className="sppd-num-col">4.</td>
                    <td className="sppd-desc-col">Maksud Perjalanan Dinas</td>
                    <td className="sppd-val-col">{maksudPerjalanan}</td>
                  </tr>

                  <tr>
                    <td className="sppd-num-col">5.</td>
                    <td className="sppd-desc-col">Alat Angkutan yang dipergunakan</td>
                    <td className="sppd-val-col">{alatAngkut}</td>
                  </tr>

                  <tr>
                    <td className="sppd-num-col">6.</td>
                    <td className="sppd-desc-col">
                      <div>a. Tempat Berangkat</div>
                      <div style={{ marginTop: '2px' }}>b. Tempat Tujuan</div>
                    </td>
                    <td className="sppd-val-col">
                      <div>a. {tempatBerangkat}</div>
                      <div style={{ marginTop: '2px' }}>b. {tempatTujuan}</div>
                    </td>
                  </tr>

                  <tr>
                    <td className="sppd-num-col">7.</td>
                    <td className="sppd-desc-col">
                      <div>a. Lamanya Perjalanan Dinas</div>
                      <div style={{ marginTop: '2px' }}>b. Tanggal Berangkat</div>
                      <div style={{ marginTop: '2px' }}>c. Tanggal Harus Kembali</div>
                    </td>
                    <td className="sppd-val-col">
                      <div>a. {lamaHari} ({lamaHari === 1 ? 'Satu' : lamaHari}) Hari</div>
                      <div style={{ marginTop: '2px' }}>b. {tanggalBerangkat}</div>
                      <div style={{ marginTop: '2px' }}>c. {tanggalKembali}</div>
                    </td>
                  </tr>

                  <tr>
                    <td className="sppd-num-col">8.</td>
                    <td className="sppd-desc-col">Pengikut: Nama</td>
                    <td className="sppd-val-col">
                      {pengikut.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          {pengikut.map((p, idx) => (
                            <div key={idx}>{idx + 1}. {p.nama}</div>
                          ))}
                        </div>
                      ) : (
                        <div>-</div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="sppd-num-col">9.</td>
                    <td className="sppd-desc-col">
                      <div>Pembebanan Anggaran</div>
                      <div style={{ marginTop: '2px' }}>a. Instansi</div>
                      <div style={{ marginTop: '2px' }}>b. Mata Anggaran</div>
                    </td>
                    <td className="sppd-val-col">
                      <div style={{ height: '14px' }}></div>
                      <div style={{ marginTop: '2px' }}>a. {instansiBeban}</div>
                      <div style={{ marginTop: '2px' }}>b. {mataAnggaran}</div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Signatures Front Block (Exact Layout) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '15px' }}>
                
                {/* Left Signature: Mengetahui Pegawai */}
                <div style={{ width: '240px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10pt' }}>Mengetahui Pegawai,</div>
                  <div style={{ height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontStyle: 'italic', color: '#64748b' }}>
                    (Tanda Tangan)
                  </div>
                  <div style={{ fontWeight: 'bold', textDecoration: 'underline', fontSize: '10.5pt' }}>
                    {pegawaiNama}
                  </div>
                  <div style={{ fontSize: '9pt', marginTop: '1px' }}>{pegawaiNip}</div>
                </div>

                {/* Right Signature: Kepala UPTD Puskesmas Banjaran Kota */}
                <div style={{ width: '280px', textAlign: 'center' }}>
                  <table style={{ width: '100%', border: 'none', borderCollapse: 'collapse', textAlign: 'left', fontSize: '10pt', marginBottom: '4px' }}>
                    <tbody>
                      <tr>
                        <td style={{ width: '95px', padding: 0 }}>Dikeluarkan di</td>
                        <td style={{ width: '10px', padding: 0 }}>:</td>
                        <td style={{ padding: 0 }}>Banjaran</td>
                      </tr>
                      <tr>
                        <td style={{ padding: 0 }}>Pada tanggal</td>
                        <td style={{ padding: 0 }}>:</td>
                        <td style={{ padding: 0 }}>{tanggalSurat}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div style={{ fontWeight: 'bold', fontSize: '10pt', marginTop: '4px' }}>
                    Kepala UPTD Puskesmas Banjaran Kota,
                  </div>

                  <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2px 0' }}>
                    {showBarcode ? (
                      <img 
                        src="/barcode_rina.png" 
                        onError={(e) => {
                          const w = window as any;
                          if (w.SPPD_ASSETS && w.SPPD_ASSETS.barcode) {
                            e.currentTarget.src = w.SPPD_ASSETS.barcode;
                          }
                        }}
                        alt="Barcode TTD" 
                        style={{ width: '55px', height: '55px', objectFit: 'contain' }} 
                      />
                    ) : (
                      <div style={{ height: '55px' }}></div>
                    )}
                  </div>

                  <div style={{ fontWeight: 'bold', textDecoration: 'underline', fontSize: '10.5pt' }}>
                    dr. RINA INDRIATI
                  </div>
                  <div style={{ fontWeight: 'bold', fontSize: '9pt', marginTop: '1px' }}>
                    NIP. 19740404 201411 2 001
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* 2. LEMBAR BELAKANG (VISUM SPPD)                                   */}
          {/* ================================================================= */}
          {(activeTab === 'belakang' || activeTab === 'semua') && (
            <div 
              id="sppdSheetBelakang"
              className={`sppd-doc-sheet-exact ${activeTab === 'semua' ? 'print-page-break' : ''}`}
              style={{ marginTop: activeTab === 'semua' ? '0' : '0' }}
            >
              <table className="sppd-back-outer-table">
                <tbody>
                  {/* Row 0: Top Departure Block */}
                  <tr className="sppd-visum-row">
                    <td style={{ width: '50%' }}></td>
                    <td style={{ width: '50%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '135px' }}>
                        <table className="nested-sppd-tbl">
                          <tbody>
                            <tr>
                              <td style={{ width: '100px' }}>Berangkat dari</td>
                              <td style={{ width: '10px' }}>:</td>
                              <td>{tempatBerangkat}</td>
                            </tr>
                            <tr>
                              <td colSpan={3} style={{ fontSize: '8pt', paddingLeft: '2px', color: '#475569' }}>
                                (Tempat kedudukan)
                              </td>
                            </tr>
                            <tr>
                              <td>Ke</td>
                              <td>:</td>
                              <td>{tempatTujuan}</td>
                            </tr>
                            <tr>
                              <td>Pada Tanggal</td>
                              <td>:</td>
                              <td>{tanggalBerangkat}</td>
                            </tr>
                          </tbody>
                        </table>

                        <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '2px' }}>
                          <p style={{ margin: 0, fontWeight: 'bold', fontSize: '9.5pt', lineHeight: 1.15 }}>
                            Kepala UPTD Puskesmas Banjaran Kota
                          </p>
                          <div style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {showBarcode && (
                              <img 
                                src="/barcode_rina.png" 
                                alt="Barcode TTD" 
                                style={{ width: '40px', height: '40px', objectFit: 'contain' }} 
                              />
                            )}
                          </div>
                          <p style={{ fontWeight: 'bold', textDecoration: 'underline', fontSize: '9.5pt', margin: 0 }}>
                            dr. Rina Indriati
                          </p>
                          <p style={{ fontWeight: 'bold', fontSize: '8.5pt', margin: '1px 0 0 0' }}>
                            NIP. 19740404 201411 2 001
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Row I */}
                  <tr className="sppd-visum-row">
                    <td style={{ width: '50%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '135px' }}>
                        <table className="nested-sppd-tbl">
                          <tbody>
                            <tr>
                              <td style={{ width: '22px' }}>I.</td>
                              <td style={{ width: '85px' }}>Tiba di</td>
                              <td style={{ width: '10px' }}>:</td>
                              <td>{visumTiba1}</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>Pada Tanggal</td>
                              <td>:</td>
                              <td>{visumTibaTgl1}</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>Kepala</td>
                              <td>:</td>
                              <td>{visumKepala1}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div style={{ marginTop: 'auto', paddingLeft: '6px' }}>
                          <p style={{ margin: 0, fontSize: '9.5pt' }}>(......................................................)</p>
                          <p style={{ margin: '1px 0 0 0', fontSize: '9pt' }}>NIP.</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ width: '50%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '135px' }}>
                        <table className="nested-sppd-tbl">
                          <tbody>
                            <tr>
                              <td style={{ width: '100px' }}>Berangkat dari</td>
                              <td style={{ width: '10px' }}>:</td>
                              <td>{visumBrgkt1}</td>
                            </tr>
                            <tr>
                              <td>Ke</td>
                              <td>:</td>
                              <td>{visumKe1}</td>
                            </tr>
                            <tr>
                              <td>Pada Tanggal</td>
                              <td>:</td>
                              <td>{visumBrgktTgl1}</td>
                            </tr>
                            <tr>
                              <td>Kepala</td>
                              <td>:</td>
                              <td>{visumKepalaKanan1}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div style={{ marginTop: 'auto', paddingLeft: '6px' }}>
                          <p style={{ margin: 0, fontSize: '9.5pt' }}>(......................................................)</p>
                          <p style={{ margin: '1px 0 0 0', fontSize: '9pt' }}>NIP.</p>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Row II */}
                  <tr className="sppd-visum-row">
                    <td style={{ width: '50%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '135px' }}>
                        <table className="nested-sppd-tbl">
                          <tbody>
                            <tr>
                              <td style={{ width: '22px' }}>II.</td>
                              <td style={{ width: '85px' }}>Tiba di</td>
                              <td style={{ width: '10px' }}>:</td>
                              <td>{visumTiba2}</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>Pada Tanggal</td>
                              <td>:</td>
                              <td>{visumTibaTgl2}</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>Kepala</td>
                              <td>:</td>
                              <td>{visumKepala2}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div style={{ marginTop: 'auto', paddingLeft: '6px' }}>
                          <p style={{ margin: 0, fontSize: '9.5pt' }}>(......................................................)</p>
                          <p style={{ margin: '1px 0 0 0', fontSize: '9pt' }}>NIP.</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ width: '50%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '135px' }}>
                        <table className="nested-sppd-tbl">
                          <tbody>
                            <tr>
                              <td style={{ width: '100px' }}>Berangkat dari</td>
                              <td style={{ width: '10px' }}>:</td>
                              <td>{visumBrgkt2}</td>
                            </tr>
                            <tr>
                              <td>Ke</td>
                              <td>:</td>
                              <td>{visumKe2}</td>
                            </tr>
                            <tr>
                              <td>Pada Tanggal</td>
                              <td>:</td>
                              <td>{visumBrgktTgl2}</td>
                            </tr>
                            <tr>
                              <td>Kepala</td>
                              <td>:</td>
                              <td>{visumKepalaKanan2}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div style={{ marginTop: 'auto', paddingLeft: '6px' }}>
                          <p style={{ margin: 0, fontSize: '9.5pt' }}>(......................................................)</p>
                          <p style={{ margin: '1px 0 0 0', fontSize: '9pt' }}>NIP.</p>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Row III: Extra Empty */}
                  <tr className="sppd-visum-row">
                    <td style={{ width: '50%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '135px' }}>
                        <table className="nested-sppd-tbl">
                          <tbody>
                            <tr>
                              <td style={{ width: '22px' }}>III.</td>
                              <td style={{ width: '85px' }}>Tiba di</td>
                              <td style={{ width: '10px' }}>:</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>Pada Tanggal</td>
                              <td>:</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>Kepala</td>
                              <td>:</td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                        <div style={{ marginTop: 'auto', paddingLeft: '6px' }}>
                          <p style={{ margin: 0, fontSize: '9.5pt' }}>(......................................................)</p>
                          <p style={{ margin: '1px 0 0 0', fontSize: '9pt' }}>NIP.</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ width: '50%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '135px' }}>
                        <table className="nested-sppd-tbl">
                          <tbody>
                            <tr>
                              <td style={{ width: '100px' }}>Berangkat dari</td>
                              <td style={{ width: '10px' }}>:</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Ke</td>
                              <td>:</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Pada Tanggal</td>
                              <td>:</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Kepala</td>
                              <td>:</td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                        <div style={{ marginTop: 'auto', paddingLeft: '6px' }}>
                          <p style={{ margin: 0, fontSize: '9.5pt' }}>(......................................................)</p>
                          <p style={{ margin: '1px 0 0 0', fontSize: '9pt' }}>NIP.</p>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Row IV & V */}
                  <tr className="sppd-visum-row">
                    <td style={{ width: '50%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '135px' }}>
                        <table className="nested-sppd-tbl">
                          <tbody>
                            <tr>
                              <td style={{ width: '22px' }}>IV.</td>
                              <td style={{ width: '85px' }}>Tiba di</td>
                              <td style={{ width: '10px' }}>:</td>
                              <td>{tempatBerangkat}</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>Pada Tanggal</td>
                              <td>:</td>
                              <td>{tanggalKembali}</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td>Kepala</td>
                              <td>:</td>
                              <td>Kepala UPTD Puskesmas Banjaran Kota</td>
                            </tr>
                          </tbody>
                        </table>

                        <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '2px' }}>
                          <p style={{ margin: 0, fontWeight: 'bold', fontSize: '9.5pt', lineHeight: 1.15 }}>
                            Kepala UPTD Puskesmas Banjaran Kota
                          </p>
                          <div style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {showBarcode && (
                              <img 
                                src="/barcode_rina.png" 
                                alt="Barcode TTD" 
                                style={{ width: '40px', height: '40px', objectFit: 'contain' }} 
                              />
                            )}
                          </div>
                          <p style={{ fontWeight: 'bold', textDecoration: 'underline', fontSize: '9.5pt', margin: 0 }}>
                            dr. Rina Indriati
                          </p>
                          <p style={{ fontWeight: 'bold', fontSize: '8.5pt', margin: '1px 0 0 0' }}>
                            NIP. 19740404 201411 2 001
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ width: '50%', padding: '6px 8px' }}>
                      <table className="nested-sppd-tbl">
                        <tbody>
                          <tr>
                            <td style={{ width: '22px', verticalAlign: 'top', fontWeight: 'bold' }}>V.</td>
                            <td style={{ fontSize: '9pt', lineHeight: 1.4, textAlign: 'justify' }}>
                              Telah diperiksa, dengan keterangan bahwa perjalanan tersebut diatas benar dilakukan atas perintahnya dan semata-mata untuk kepentingan jabatan dalam waktu yang sesingkat-singkatnya.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* Row VI */}
                  <tr>
                    <td colSpan={2} style={{ padding: '3px 8px', fontSize: '9pt' }}>
                      VI. Catatan Lain-lain
                    </td>
                  </tr>

                  {/* Row VII */}
                  <tr>
                    <td colSpan={2} style={{ padding: '4px 8px', fontSize: '8.5pt', lineHeight: 1.3 }}>
                      <div style={{ fontWeight: 'bold' }}>VII. PERHATIAN</div>
                      <div style={{ paddingLeft: '15px', textAlign: 'justify' }}>
                        PPK yang menerbitkan SPD, pegawai yang memerlukan perjalanan dinas, para pejabat yang mengesahkan tanggal berangkat/ tiba, serta bendahara pengeluaran bertanggung jawab berdasarkan peraturan-peraturan Keuangan Negara apabila Negara menderita rugi akibat kesalahan, kelalaian dan kealpaannya.
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Bottom Signature: Kuasa Pengguna Anggaran */}
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '280px', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontWeight: 'bold', fontSize: '10pt', lineHeight: 1.2 }}>
                    Kuasa Pengguna Anggaran<br />
                    Puskesmas Banjaran Kota
                  </p>
                  <div style={{ height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2px 0' }}>
                    {showBarcode && (
                      <img 
                        src="/barcode_rina.png" 
                        alt="Barcode TTD" 
                        style={{ width: '42px', height: '42px', objectFit: 'contain' }} 
                      />
                    )}
                  </div>
                  <p style={{ fontWeight: 'bold', textDecoration: 'underline', fontSize: '10.5pt', margin: 0 }}>
                    dr. Rina Indriati
                  </p>
                  <p style={{ fontWeight: 'bold', fontSize: '9pt', margin: '1px 0 0 0' }}>
                    NIP. 19740404 201411 2 001
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* 3. DOKUMEN LAPORAN PELAKSANAAN TUGAS (LPT)                        */}
          {/* ================================================================= */}
          {(activeTab === 'lpt' || activeTab === 'semua') && (
            <div 
              id="lptSheetDoc"
              className="sppd-doc-sheet-exact"
              style={{ marginTop: activeTab === 'semua' ? '0' : '0' }}
            >
              {/* LPT Kop Surat */}
              <div className="sppd-kop-container">
                <img 
                  src="/kabbandung.png" 
                  onError={(e) => {
                    const w = window as any;
                    if (w.SPPD_ASSETS && w.SPPD_ASSETS.logo) {
                      e.currentTarget.src = w.SPPD_ASSETS.logo;
                    }
                  }}
                  alt="Logo Pemkab Bandung" 
                  className="sppd-kop-logo" 
                />
                <div className="sppd-kop-text">
                  <div className="sppd-kop-line1">PEMERINTAH KABUPATEN BANDUNG</div>
                  <div className="sppd-kop-line2">DINAS KESEHATAN</div>
                  <div className="sppd-kop-line3">UPTD PUSKESMAS BANJARAN KOTA</div>
                  <div className="sppd-kop-line4">Jl. Stasion No. 42 Kec. Banjaran, Kabupaten Bandung, Jawa Barat 40377</div>
                  <div className="sppd-kop-line5">Email: pkmbanjarankota@gmail.com • Telp. (022) 5940xxx</div>
                </div>
              </div>
              <div className="sppd-kop-divider"></div>

              {/* Title Header LPT */}
              <div style={{ textAlign: 'center', margin: '12px 0 16px 0' }}>
                <h2 style={{ fontSize: '13pt', fontWeight: 'bold', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  LAPORAN PELAKSANAAN TUGAS
                </h2>
              </div>

              {/* LPT Content Body */}
              <div style={{ paddingLeft: '15px', paddingRight: '15px', fontSize: '10pt', lineHeight: 1.5 }}>
                
                {/* 1. Dasar */}
                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ width: '160px', flexShrink: 0 }}>1. Dasar</div>
                  <div style={{ width: '15px', textAlign: 'center', flexShrink: 0 }}>:</div>
                  <div style={{ flex: 1 }}>{lptDasar}</div>
                </div>

                {/* 2. Tujuan Perjalanan */}
                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ width: '160px', flexShrink: 0 }}>2. Tujuan Perjalanan</div>
                  <div style={{ width: '15px', textAlign: 'center', flexShrink: 0 }}>:</div>
                  <div style={{ flex: 1 }}>{lptTujuan}</div>
                </div>

                {/* 3. Hasil kunjungan */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ marginBottom: '6px' }}>3. Hasil kunjungan, antara lain :</div>
                  
                  {/* a. Proses Pelaksanaan */}
                  <div style={{ marginLeft: '20px', marginBottom: '8px' }}>
                    <div style={{ marginBottom: '4px' }}>a. Proses pelaksanaan :</div>
                    <div style={{ marginLeft: '16px', textAlign: 'justify', lineHeight: 1.55 }}>
                      {lptProses}
                    </div>
                  </div>

                  {/* b. Permasalahan yang dihadapi */}
                  <div style={{ marginLeft: '20px' }}>
                    <div style={{ marginBottom: '4px' }}>b. Permasalahan yang dihadapi :</div>
                    <div style={{ marginLeft: '16px', textAlign: 'justify', lineHeight: 1.55 }}>
                      {lptMasalah}
                    </div>
                  </div>
                </div>

                {/* 4. Kesimpulan/ Saran perbaikan */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ marginBottom: '4px' }}>4. Kesimpulan/ Saran perbaikan :</div>
                  <div style={{ marginLeft: '36px', textAlign: 'justify', lineHeight: 1.55 }}>
                    {lptKesimpulan}
                  </div>
                </div>

              </div>

              {/* LPT Signatures Wrapper: Vertikal Bertingkat di Sebelah Kanan */}
              <div style={{ marginTop: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '260px', textAlign: 'left' }}>
                  <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <div style={{ fontSize: '10pt' }}>Banjaran, {tanggalSurat}</div>
                    <div style={{ fontSize: '10pt', marginTop: '2px' }}>Pelapor,</div>
                  </div>

                  {/* Daftar Petugas Pelapor Bertingkat */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    
                    {/* Petugas 1 (Utama) */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', fontSize: '9.5pt' }}>
                      <span style={{ width: '20px', flexShrink: 0, fontWeight: 'bold' }}>1.</span>
                      <div>
                        <div style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{pegawaiNama}</div>
                        <div style={{ fontSize: '8.5pt' }}>{pegawaiNip}</div>
                      </div>
                    </div>

                    {/* Petugas Pengikut (2, 3, ...) */}
                    {pengikut.map((item, idx) => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', fontSize: '9.5pt' }}>
                        <span style={{ width: '20px', flexShrink: 0, fontWeight: 'bold' }}>{idx + 2}.</span>
                        <div>
                          <div style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{item.nama}</div>
                          {item.nip && <div style={{ fontSize: '8.5pt' }}>{item.nip}</div>}
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
