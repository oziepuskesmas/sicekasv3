import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Save, 
  Plus, 
  Trash2, 
  Download, 
  Sparkles, 
  UserCheck, 
  Building2,
  Calendar,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OFFICIAL_PEGAWAI } from '../../data/pegawai';
import { KEGIATAN_BOK_LIST } from '../../data/programs';

export const SppdView: React.FC = () => {
  const { user } = useAuth();
  const [activeDocTab, setActiveDocTab] = useState<'sppd' | 'lpt'>('sppd');

  // SPPD Main Form State
  const [noSurat, setNoSurat] = useState('090/042/PKM-BKT/VIII/2026');
  const [tanggalSurat, setTanggalSurat] = useState('18 Agustus 2026');
  const [pegawaiNama, setPegawaiNama] = useState(user?.nama || 'Teti Nuryati, S.Keb, Bdn');
  const [pegawaiNip, setPegawaiNip] = useState(user?.nip || '19750816 200701 2 012');
  const [pegawaiJabatan, setPegawaiJabatan] = useState(user?.jabatan || 'Satker/Bidan Mahir');
  const [pegawaiGolongan, setPegawaiGolongan] = useState(user?.golongan || 'III/b');

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

  // Pengikut
  const [pengikut, setPengikut] = useState([
    { id: '1', nama: 'Eva Farida, S.Keb', nip: '19840508 201704 2 011', jabatan: 'Bidan Mahir' },
    { id: '2', nama: 'N. Yayat Rohayati, AM.Keb', nip: '19690613 198903 2 005', jabatan: 'Bidan Penyelia' },
  ]);

  // LPT Details
  const [lptHasil, setLptHasil] = useState([
    { uraian: 'Pemeriksaan tensi darah, TFU, dan lokia ibu nifas', volume: '6 Orang' },
    { uraian: 'Pemeriksaan tali pusat dan refleks neonatus', volume: '6 Bayi' },
    { uraian: 'Edukasi ASI Eksklusif dan tanda bahaya masa nifas', volume: '6 Keluarga' },
  ]);
  const [lptKendala, setLptKendala] = useState('Sebagian ibu nifas sedang berada di rumah keluarga/mertua pada saat kunjungan pagi.');
  const [lptSaran, setLptSaran] = useState('Melakukan konfirmasi jadwal via Bidan Desa atau kader Posyandu sehari sebelum kunjungan rumah.');

  const handlePrint = () => {
    window.print();
  };

  const handleAddPengikut = () => {
    setPengikut([...pengikut, { id: String(Date.now()), nama: '', nip: '', jabatan: '' }]);
  };

  const handleRemovePengikut = (idx: number) => {
    setPengikut(pengikut.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar (Non-Print) */}
      <div className="print:hidden p-6 rounded-3xl bg-[#0d1320]/90 border border-teal-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-400" />
            Generator SPPD & LPT Cetak Presisi A4
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Surat Perintah Perjalanan Dinas & Laporan Perjalanan Tugas Resmi Puskesmas Banjaran Kota
          </p>
        </div>

        {/* View Document Tab Switcher & Print Button */}
        <div className="flex items-center gap-3">
          <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-700">
            <button
              onClick={() => setActiveDocTab('sppd')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeDocTab === 'sppd' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Lembar 1: Surat SPPD
            </button>
            <button
              onClick={() => setActiveDocTab('lpt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeDocTab === 'lpt' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Lembar 2: Laporan (LPT)
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 border border-teal-400/40 shadow-lg shadow-teal-500/20 flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> Cetak Lembar A4
          </button>
        </div>
      </div>

      {/* Split View Container: Left Form Inputs, Right Live Realtime A4 Sheet Preview */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Editor (Hidden on Print) */}
        <div className="print:hidden xl:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-[#0d1320]/90 border border-teal-500/20 shadow-xl space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Layers className="w-4 h-4 text-teal-400" />
              Editor Dokumen SPPD & LPT
            </h3>

            {/* Quick Populate From 39 Pegawai */}
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Pilih Pegawai yang Ditugaskan</label>
              <select
                value={pegawaiNama}
                onChange={(e) => {
                  const sel = OFFICIAL_PEGAWAI.find(p => p.nama === e.target.value);
                  if (sel) {
                    setPegawaiNama(sel.nama);
                    setPegawaiNip(sel.nip);
                    setPegawaiJabatan(sel.jabatan);
                    setPegawaiGolongan(sel.golongan);
                  }
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium"
              >
                {OFFICIAL_PEGAWAI.map((p) => (
                  <option key={p.id} value={p.nama}>{p.nama} ({p.jabatan})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Nomor Surat SPPD</label>
                <input
                  type="text"
                  value={noSurat}
                  onChange={(e) => setNoSurat(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Tanggal Surat</label>
                <input
                  type="text"
                  value={tanggalSurat}
                  onChange={(e) => setTanggalSurat(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Maksud Perjalanan Dinas</label>
              <textarea
                rows={2}
                value={maksudPerjalanan}
                onChange={(e) => setMaksudPerjalanan(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Tempat Tujuan</label>
                <input
                  type="text"
                  value={tempatTujuan}
                  onChange={(e) => setTempatTujuan(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Alat Angkutan</label>
                <input
                  type="text"
                  value={alatAngkut}
                  onChange={(e) => setAlatAngkut(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
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
            <div className="pt-2 border-t border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-300">Pengikut Perjalanan Dinas</span>
                <button
                  type="button"
                  onClick={handleAddPengikut}
                  className="text-teal-400 hover:text-teal-300 text-[11px] font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah
                </button>
              </div>
              <div className="space-y-2">
                {pengikut.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Nama & Gelar Pengikut"
                      value={item.nama}
                      onChange={(e) => {
                        const next = [...pengikut];
                        next[idx].nama = e.target.value;
                        setPengikut(next);
                      }}
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-[11px]"
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
          </div>
        </div>

        {/* Right Column: Exact Live A4 Replica Simulation (Print Ready) */}
        <div className="xl:col-span-7 w-full flex justify-center">
          <div 
            id="sppd-printable-area"
            className="w-full max-w-[210mm] min-h-[297mm] bg-white text-black p-[15mm] rounded-2xl shadow-2xl font-serif text-[11pt] leading-normal print:p-0 print:m-0 print:shadow-none print:rounded-none print:w-full print:max-w-none"
          >
            {activeDocTab === 'sppd' ? (
              /* SPPD DOCUMENT PAGE */
              <div className="space-y-3">
                {/* Kop Surat Resmi Pemkab Bandung & Puskesmas Banjaran Kota */}
                <div className="flex items-center gap-4 border-b-2 border-black pb-2 mb-3">
                  <img src="/kabbandung.png" alt="Logo Pemkab Bandung" className="w-16 h-20 object-contain shrink-0" />
                  <div className="flex-1 text-center font-sans">
                    <h4 className="text-xs uppercase font-bold tracking-wider">Pemerintah Kabupaten Bandung</h4>
                    <h3 className="text-sm uppercase font-bold tracking-wider">Dinas Kesehatan</h3>
                    <h2 className="text-base uppercase font-extrabold tracking-tight">UPTD Puskesmas Banjaran Kota</h2>
                    <p className="text-[8.5pt] leading-tight mt-0.5">
                      Jl. Stasion No. 42 Kec. Banjaran, Kabupaten Bandung, Jawa Barat 40377
                      <br />Email: pkmbanjarankota@gmail.com &bull; Telp. (022) 5940xxx
                    </p>
                  </div>
                </div>

                <div className="text-center font-sans mb-3">
                  <h3 className="font-extrabold text-sm underline tracking-wide">SURAT PERINTAH PERJALANAN DINAS (SPPD)</h3>
                  <p className="text-[9.5pt]">Nomor: {noSurat}</p>
                </div>

                {/* SPPD Table */}
                <table className="w-full border-collapse border border-black text-[9.5pt]">
                  <tbody>
                    <tr>
                      <td className="border border-black p-1.5 w-8 text-center font-bold">1.</td>
                      <td className="border border-black p-1.5 w-60">Pejabat Pembuat Komitmen</td>
                      <td className="border border-black p-1.5">Kepala UPTD Puskesmas Banjaran Kota</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5 text-center font-bold">2.</td>
                      <td className="border border-black p-1.5">Nama / NIP Pegawai yang diperintah</td>
                      <td className="border border-black p-1.5 font-bold">
                        {pegawaiNama}
                        <div className="text-[8.5pt] font-normal">{pegawaiNip}</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5 text-center font-bold">3.</td>
                      <td className="border border-black p-1.5">
                        a. Pangkat dan Golongan<br />
                        b. Jabatan / Instansi
                      </td>
                      <td className="border border-black p-1.5">
                        a. {pegawaiGolongan}<br />
                        b. {pegawaiJabatan} / {instansiBeban}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5 text-center font-bold">4.</td>
                      <td className="border border-black p-1.5">Maksud Perjalanan Dinas</td>
                      <td className="border border-black p-1.5">{maksudPerjalanan}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5 text-center font-bold">5.</td>
                      <td className="border border-black p-1.5">Alat Angkutan yang dipergunakan</td>
                      <td className="border border-black p-1.5">{alatAngkut}</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5 text-center font-bold">6.</td>
                      <td className="border border-black p-1.5">
                        a. Tempat Berangkat<br />
                        b. Tempat Tujuan
                      </td>
                      <td className="border border-black p-1.5">
                        a. {tempatBerangkat}<br />
                        b. {tempatTujuan}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5 text-center font-bold">7.</td>
                      <td className="border border-black p-1.5">
                        a. Lamanya Perjalanan Dinas<br />
                        b. Tanggal Berangkat<br />
                        c. Tanggal Harus Kembali
                      </td>
                      <td className="border border-black p-1.5">
                        a. {lamaHari} ({lamaHari === 1 ? 'Satu' : lamaHari}) Hari<br />
                        b. {tanggalBerangkat}<br />
                        c. {tanggalKembali}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5 text-center font-bold">8.</td>
                      <td className="border border-black p-1.5">Pengikut: Nama</td>
                      <td className="border border-black p-1.5">
                        {pengikut.length === 0 ? '-' : (
                          <ol className="list-decimal list-inside space-y-0.5">
                            {pengikut.map((p, i) => (
                              <li key={i}>{p.nama}</li>
                            ))}
                          </ol>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1.5 text-center font-bold">9.</td>
                      <td className="border border-black p-1.5">
                        Pembebanan Anggaran<br />
                        a. Instansi<br />
                        b. Mata Anggaran
                      </td>
                      <td className="border border-black p-1.5">
                        <br />
                        a. {instansiBeban}<br />
                        b. {mataAnggaran}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Tanda Tangan & Barcode Digital Signature */}
                <div className="pt-4 flex justify-between items-end font-sans text-[9pt]">
                  <div className="w-48 text-center">
                    <p>Mengetahui Pegawai,</p>
                    <div className="h-16 flex items-center justify-center font-script text-slate-500 italic">
                      (Tanda Tangan)
                    </div>
                    <p className="font-bold underline">{pegawaiNama}</p>
                    <p className="text-[8pt]">{pegawaiNip}</p>
                  </div>

                  <div className="w-56 text-center">
                    <p>Dikeluarkan di: Banjaran</p>
                    <p>Pada tanggal: {tanggalSurat}</p>
                    <p className="font-bold mt-1">Kepala UPTD Puskesmas Banjaran Kota,</p>
                    <div className="h-16 flex items-center justify-center my-1">
                      <img src="/barcode_rina.png" alt="Barcode Digital dr. Rina" className="h-14 object-contain" />
                    </div>
                    <p className="font-bold underline">dr. RINA INDRIATI</p>
                    <p className="text-[8pt]">NIP. 19740404 201411 2 001</p>
                  </div>
                </div>
              </div>
            ) : (
              /* LPT DOCUMENT PAGE */
              <div className="space-y-3 font-sans">
                {/* Kop Surat LPT */}
                <div className="flex items-center gap-4 border-b-2 border-black pb-2 mb-3">
                  <img src="/kabbandung.png" alt="Logo Pemkab Bandung" className="w-16 h-20 object-contain shrink-0" />
                  <div className="flex-1 text-center">
                    <h4 className="text-xs uppercase font-bold tracking-wider">Pemerintah Kabupaten Bandung</h4>
                    <h3 className="text-sm uppercase font-bold tracking-wider">Dinas Kesehatan</h3>
                    <h2 className="text-base uppercase font-extrabold tracking-tight">UPTD Puskesmas Banjaran Kota</h2>
                    <p className="text-[8.5pt] leading-tight mt-0.5">
                      Jl. Stasion No. 42 Kec. Banjaran, Kabupaten Bandung, Jawa Barat 40377
                    </p>
                  </div>
                </div>

                <div className="text-center mb-3">
                  <h3 className="font-extrabold text-sm underline tracking-wide">LAPORAN PERJALANAN TUGAS (LPT)</h3>
                  <p className="text-[9pt]">Dasar Surat Perintah Tugas Nomor: {noSurat}</p>
                </div>

                <div className="space-y-2 text-[9.5pt]">
                  <div>
                    <span className="font-bold">I. Dasar Pelaksanaan:</span>
                    <p className="pl-4">Surat Perintah Tugas Kepala UPTD Puskesmas Banjaran Kota Nomor: {noSurat}</p>
                  </div>

                  <div>
                    <span className="font-bold">II. Maksud dan Tujuan Kegiatan:</span>
                    <p className="pl-4">{maksudPerjalanan}</p>
                  </div>

                  <div>
                    <span className="font-bold">III. Waktu dan Tempat Pelaksanaan:</span>
                    <p className="pl-4">Tanggal {tanggalBerangkat} bertempat di {tempatTujuan}</p>
                  </div>

                  <div>
                    <span className="font-bold">IV. Hasil Pelaksanaan Kegiatan:</span>
                    <table className="w-full mt-1 border-collapse border border-black text-[9pt]">
                      <thead className="bg-slate-100 font-bold">
                        <tr>
                          <th className="border border-black p-1 w-8 text-center">No</th>
                          <th className="border border-black p-1 text-left">Uraian Hasil Kegiatan</th>
                          <th className="border border-black p-1 w-24 text-center">Volume/Output</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lptHasil.map((h, i) => (
                          <tr key={i}>
                            <td className="border border-black p-1 text-center font-bold">{i + 1}</td>
                            <td className="border border-black p-1">{h.uraian}</td>
                            <td className="border border-black p-1 text-center font-semibold">{h.volume}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <span className="font-bold">V. Kendala / Masalah yang Dihadapi:</span>
                    <p className="pl-4">{lptKendala}</p>
                  </div>

                  <div>
                    <span className="font-bold">VI. Saran dan Tindak Lanjut:</span>
                    <p className="pl-4">{lptSaran}</p>
                  </div>
                </div>

                {/* Tanda Tangan Pelapor Kolektif */}
                <div className="pt-6">
                  <div className="text-right text-[9pt] mb-2">
                    Banjaran, {tanggalSurat}
                  </div>
                  <div className="font-bold text-[9pt] mb-2">Petugas Pelapor:</div>
                  <table className="w-full border-collapse border border-black text-[8.5pt]">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border border-black p-1 w-8">No</th>
                        <th className="border border-black p-1 text-left">Nama Petugas</th>
                        <th className="border border-black p-1 text-left">NIP / NRP</th>
                        <th className="border border-black p-1 w-28 text-center">Tanda Tangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black p-1 text-center">1.</td>
                        <td className="border border-black p-1 font-bold">{pegawaiNama}</td>
                        <td className="border border-black p-1">{pegawaiNip}</td>
                        <td className="border border-black p-1 text-center italic text-slate-400">1. ....................</td>
                      </tr>
                      {pengikut.map((p, idx) => (
                        <tr key={idx}>
                          <td className="border border-black p-1 text-center">{idx + 2}.</td>
                          <td className="border border-black p-1 font-bold">{p.nama}</td>
                          <td className="border border-black p-1">{p.nip || '-'}</td>
                          <td className="border border-black p-1 text-center italic text-slate-400">
                            {idx + 2}. ....................
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
