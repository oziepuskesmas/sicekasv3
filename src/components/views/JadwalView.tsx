import React, { useState } from 'react';
import { Calendar, Users, MapPin, CheckCircle, Clock, Plus, Sparkles, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OFFICIAL_PEGAWAI } from '../../data/pegawai';
import { KEGIATAN_BOK_LIST } from '../../data/programs';

interface JadwalItem {
  id: string;
  tanggal: string;
  nama_kegiatan: string;
  lokasi: string;
  petugas_nama: string;
  rekan_kolaborasi: string;
  status: 'Disetujui' | 'Pending' | 'Ditolak';
}

export const JadwalView: React.FC = () => {
  const { user } = useAuth();
  const [showCollabModal, setShowCollabModal] = useState(false);

  const [jadwalList, setJadwalList] = useState<JadwalItem[]>([
    {
      id: 'j-1',
      tanggal: '2026-08-12',
      nama_kegiatan: 'Pemeriksaan Kesehatan Berkala Peserta Didik (Skrining UKS)',
      lokasi: 'SDN Banjaran 01',
      petugas_nama: 'Satrianita, SKM',
      rekan_kolaborasi: 'Asep Yanto, AMKG & drg. Regina Desi',
      status: 'Disetujui',
    },
    {
      id: 'j-2',
      tanggal: '2026-08-14',
      nama_kegiatan: 'Pelayanan Skrining Kanker Leher Rahim (IVA Test) & SADANIS',
      lokasi: 'Poskesdes Ciapus',
      petugas_nama: 'Teti Nuryati, S.Keb, Bdn',
      rekan_kolaborasi: 'N. Yayat Rohayati, AM.Keb & Eva Farida, S.Keb',
      status: 'Disetujui',
    },
    {
      id: 'j-3',
      tanggal: '2026-08-19',
      nama_kegiatan: 'Pemberian Makanan Tambahan (PMT) Pemulihan Balita Gizi Kurang',
      lokasi: 'Posyandu Melati 3 Desa Sindangpanon',
      petugas_nama: 'Mochamad Fauzie, S.Gz',
      rekan_kolaborasi: 'Sheila Nurlaila, A.Md.Gz',
      status: 'Pending',
    },
  ]);

  // Request Collab Form State
  const [collabForm, setCollabForm] = useState({
    tanggal: '2026-08-20',
    nama_kegiatan: KEGIATAN_BOK_LIST[0],
    lokasi: 'Desa Kamasan',
    to_petugas: OFFICIAL_PEGAWAI[1].nama,
  });

  const handleSendCollab = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: JadwalItem = {
      id: `j-${Date.now()}`,
      tanggal: collabForm.tanggal,
      nama_kegiatan: collabForm.nama_kegiatan,
      lokasi: collabForm.lokasi,
      petugas_nama: user?.nama || 'Petugas Puskesmas',
      rekan_kolaborasi: collabForm.to_petugas,
      status: 'Pending',
    };
    setJadwalList([newItem, ...jadwalList]);
    setShowCollabModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-[#0d1320]/90 border border-teal-500/20 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-400" />
            Jadwal Kegiatan Lapangan & Kolaborasi Lintas Program
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Koordinasi kegiatan luar gedung Puskesmas Banjaran Kota
          </p>
        </div>

        <button
          onClick={() => setShowCollabModal(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 border border-teal-400/40 shadow-lg shadow-teal-500/20 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Ajukan Kolaborasi Tugas
        </button>
      </div>

      {/* Jadwal Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jadwalList.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-[#0d1320]/90 border border-teal-500/20 shadow-lg flex flex-col justify-between space-y-4 hover:border-teal-500/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-teal-300 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
                  {item.tanggal}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                  item.status === 'Disetujui'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}>
                  {item.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white leading-snug">
                {item.nama_kegiatan}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="truncate">{item.lokasi}</span>
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Penanggung Jawab:</span>
                <span className="font-bold text-white">{item.petugas_nama}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rekan Kolaborasi:</span>
                <span className="text-teal-300 font-semibold">{item.rekan_kolaborasi}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Ajukan Kolaborasi */}
      {showCollabModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#0d1320] border border-teal-500/30 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-teal-400" />
              Kirim Permintaan Kolaborasi Kegiatan
            </h3>
            <form onSubmit={handleSendCollab} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Tanggal Kegiatan</label>
                <input
                  type="date"
                  value={collabForm.tanggal}
                  onChange={(e) => setCollabForm({ ...collabForm, tanggal: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Pilih Rekan Pegawai yang Diajak</label>
                <select
                  value={collabForm.to_petugas}
                  onChange={(e) => setCollabForm({ ...collabForm, to_petugas: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  {OFFICIAL_PEGAWAI.map((p) => (
                    <option key={p.id} value={p.nama}>
                      {p.nama} ({p.jabatan})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Program / Agenda Kegiatan</label>
                <select
                  value={collabForm.nama_kegiatan}
                  onChange={(e) => setCollabForm({ ...collabForm, nama_kegiatan: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  {KEGIATAN_BOK_LIST.map((prog, i) => (
                    <option key={i} value={prog}>{prog}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Lokasi Pelaksanaan</label>
                <input
                  type="text"
                  value={collabForm.lokasi}
                  onChange={(e) => setCollabForm({ ...collabForm, lokasi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setShowCollabModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
                >
                  Kirim Undangan Kolaborasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
