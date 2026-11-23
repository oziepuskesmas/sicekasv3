import React, { useState } from 'react';
import { Award, CheckCircle, AlertTriangle, FileCheck, Upload, Sparkles, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const TpPolView: React.FC = () => {
  const { user } = useAuth();

  const [skorKehadiran, setSkorKehadiran] = useState(100);
  const [skorPelayanan, setSkorPelayanan] = useState(95);
  const [skorAdministrasi, setSkorAdministrasi] = useState(92);
  const [skorPerilaku, setSkorPerilaku] = useState(96);
  const [catatan, setCatatan] = useState('Pelayanan poli dan kegiatan luar gedung terlaksana penuh.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Total calculated score (weighted 30% Kehadiran, 35% Pelayanan, 20% Administrasi, 15% Perilaku)
  const totalSkor = Number(
    (
      skorKehadiran * 0.3 +
      skorPelayanan * 0.35 +
      skorAdministrasi * 0.2 +
      skorPerilaku * 0.15
    ).toFixed(2)
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-[#0d1320]/90 border border-teal-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-teal-400" />
            TP POL &bull; Penilaian Pelayanan Obat dan Layanan (Jaspel)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Indikator kinerja bulanan pegawai &bull; UPTD Puskesmas Banjaran Kota
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" /> Terverifikasi Kepala Puskesmas
          </span>
        </div>
      </div>

      {/* Score Overview & Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Sliders & Inputs */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0d1320]/90 border border-teal-500/20 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              Kalkulator Indikator Kinerja Jaspel Pegawai
            </h3>
            <span className="text-xs text-slate-400 font-mono">Bulan: Agustus 2026</span>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Kehadiran */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">1. Skor Kehadiran & Disiplin (Bobot 30%)</span>
                <span className="font-mono text-teal-300 font-bold text-sm">{skorKehadiran}</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={skorKehadiran}
                onChange={(e) => setSkorKehadiran(Number(e.target.value))}
                className="w-full accent-teal-400"
              />
              <p className="text-[10px] text-slate-500">Tepat waktu, presensi biometric, dan apel pagi</p>
            </div>

            {/* Pelayanan */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">2. Skor Kualitas Pelayanan (Bobot 35%)</span>
                <span className="font-mono text-teal-300 font-bold text-sm">{skorPelayanan}</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={skorPelayanan}
                onChange={(e) => setSkorPelayanan(Number(e.target.value))}
                className="w-full accent-teal-400"
              />
              <p className="text-[10px] text-slate-500">Standar operasional prosedur (SOP) & kepuasan pasien</p>
            </div>

            {/* Administrasi */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">3. Skor Kelengkapan Administrasi (Bobot 20%)</span>
                <span className="font-mono text-teal-300 font-bold text-sm">{skorAdministrasi}</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={skorAdministrasi}
                onChange={(e) => setSkorAdministrasi(Number(e.target.value))}
                className="w-full accent-teal-400"
              />
              <p className="text-[10px] text-slate-500">Laporan bulanan, SPPD/LPT, dan rekam medis</p>
            </div>

            {/* Perilaku */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">4. Skor Perilaku & Kerjasama (Bobot 15%)</span>
                <span className="font-mono text-teal-300 font-bold text-sm">{skorPerilaku}</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={skorPerilaku}
                onChange={(e) => setSkorPerilaku(Number(e.target.value))}
                className="w-full accent-teal-400"
              />
              <p className="text-[10px] text-slate-500">Integritas, kolaborasi lintas program, dan etika kerja</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Catatan Evaluasi / Bukti Kegiatan
              </label>
              <textarea
                rows={2}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-emerald-400 font-medium">
                {savedSuccess && '✓ Evaluasi skor Jaspel berhasil disimpan!'}
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 border border-teal-400/40 shadow-lg shadow-teal-500/20 transition-all"
              >
                Simpan & Ajukan Verifikasi
              </button>
            </div>
          </form>
        </div>

        {/* Score Result Gauge Card */}
        <div className="p-6 rounded-3xl bg-[#0d1320]/90 border border-teal-500/20 shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-center py-6 border-b border-white/5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Indeks Kinerja Terbobot
              </span>
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400 mt-2 font-mono">
                {totalSkor}
              </div>
              <div className="inline-block mt-3 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30">
                Kategori Sangat Baik (A)
              </div>
            </div>

            <div className="space-y-3 mt-6 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Pegawai:</span>
                <span className="font-bold text-white">{user?.nama || 'dr. Rina Indriati'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Jabatan:</span>
                <span className="text-slate-300">{user?.jabatan || 'Kepala Puskesmas'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">Estimasi Jaspel:</span>
                <span className="font-mono font-bold text-teal-300">100% Penuh</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-[11px] text-teal-300 mt-6">
            💡 Skor TP POL otomatis terintegrasi dengan laporan capaian POA dan dokumen SPPD/LPT yang telah disetujui.
          </div>
        </div>
      </div>
    </div>
  );
};
