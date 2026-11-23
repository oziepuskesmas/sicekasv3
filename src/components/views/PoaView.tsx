import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Search, 
  Filter, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PoaItem } from '../../types/poa';
import { INDONESIAN_HOLIDAYS_2026 } from '../../data/holidays';
import { KEGIATAN_BOK_LIST } from '../../data/programs';
import { api } from '../../services/api';

export const PoaView: React.FC = () => {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [poaList, setPoaList] = useState<PoaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New POA form state
  const [formData, setFormData] = useState({
    tanggal: '2026-08-10',
    program_kesehatan: KEGIATAN_BOK_LIST[0],
    uraian_kegiatan: '',
    target_sasaran: 'Sasaran Balita & Ibu Hamil',
    lokasi_pelaksanaan: 'Posyandu Desa Banjaran',
    vol_kegiatan: 1,
    anggaran_bok: 250000,
  });

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const fetchPoa = async () => {
    setLoading(true);
    const res = await api.get<PoaItem[]>('/poa', {
      bulan: selectedMonth,
      tahun: selectedYear,
    });
    setLoading(false);
    if (res.success && res.data) {
      setPoaList(res.data);
    } else {
      // Default sample records if database table is currently empty
      setPoaList([
        {
          id: 'poa-1',
          tanggal: `2026-${String(selectedMonth).padStart(2, '0')}-08`,
          bulan: selectedMonth,
          tahun: selectedYear,
          petugas_nip: user?.nip || '19740404 201411 2 001',
          petugas_nama: user?.nama || 'Petugas Puskesmas',
          program_kesehatan: 'Pemeriksaan Ibu Hamil Terintegrasi (K1-K6)',
          uraian_kegiatan: 'Pemeriksaan antenatal care (ANC) terpadu di Posyandu Melati',
          target_sasaran: '15 Ibu Hamil',
          lokasi_pelaksanaan: 'Posyandu Melati RW 04',
          vol_kegiatan: 1,
          satuan: 'Kegiatan',
          anggaran_bok: 350000,
          sumber_dana: 'BOK Puskesmas',
          status: 'Aktif',
        },
        {
          id: 'poa-2',
          tanggal: `2026-${String(selectedMonth).padStart(2, '0')}-15`,
          bulan: selectedMonth,
          tahun: selectedYear,
          petugas_nip: user?.nip || '19740404 201411 2 001',
          petugas_nama: user?.nama || 'Petugas Puskesmas',
          program_kesehatan: 'Pemberian Makanan Tambahan (PMT) Balita',
          uraian_kegiatan: 'Penyaluran PMT pemulihan berbasis pangan lokal untuk balita gizi kurang',
          target_sasaran: '10 Balita',
          lokasi_pelaksanaan: 'Desa Tarajusari',
          vol_kegiatan: 1,
          satuan: 'Kegiatan',
          anggaran_bok: 500000,
          sumber_dana: 'BOK Puskesmas',
          status: 'Terlaksana',
        },
      ]);
    }
  };

  useEffect(() => {
    fetchPoa();
  }, [selectedMonth, selectedYear]);

  const handleCreatePoa = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPoa: PoaItem = {
      id: `poa-${Date.now()}`,
      tanggal: formData.tanggal,
      bulan: selectedMonth,
      tahun: selectedYear,
      petugas_nip: user?.nip || '19740404 201411 2 001',
      petugas_nama: user?.nama || 'Petugas Puskesmas',
      program_kesehatan: formData.program_kesehatan,
      uraian_kegiatan: formData.uraian_kegiatan,
      target_sasaran: formData.target_sasaran,
      lokasi_pelaksanaan: formData.lokasi_pelaksanaan,
      vol_kegiatan: formData.vol_kegiatan,
      satuan: 'Kegiatan',
      anggaran_bok: formData.anggaran_bok,
      sumber_dana: 'BOK Puskesmas',
      status: 'Aktif',
    };

    await api.post('/poa/save', newPoa);
    setPoaList([newPoa, ...poaList]);
    setShowAddModal(false);
  };

  const totalAnggaran = poaList.reduce((acc, curr) => acc + (curr.anggaran_bok || 0), 0);

  const filteredPoa = poaList.filter(p =>
    p.uraian_kegiatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.program_kesehatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.lokasi_pelaksanaan && p.lokasi_pelaksanaan.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0d1320]/90 border border-teal-500/20 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-teal-400" />
            Plan of Action (POA) Bulanan BOK Puskesmas
          </h2>
          <p className="text-xs text-slate-400">
            Puskesmas Banjaran Kota &bull; Periode {months[selectedMonth - 1]} {selectedYear}
          </p>
        </div>

        {/* Month Selector Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedMonth(prev => prev > 1 ? prev - 1 : 12)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-teal-500/30 text-xs font-bold text-teal-300 focus:outline-none"
          >
            {months.map((m, idx) => (
              <option key={idx} value={idx + 1}>{m}</option>
            ))}
          </select>
          <button
            onClick={() => setSelectedMonth(prev => prev < 12 ? prev + 1 : 1)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="ml-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 border border-teal-400/40 shadow-lg shadow-teal-500/20 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Tambah Rencana
          </button>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#0d1320]/80 border border-teal-500/20 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Total Rencana Kegiatan</span>
            <div className="text-2xl font-bold text-white">{poaList.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1320]/80 border border-teal-500/20 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Estimasi Alokasi BOK</span>
            <div className="text-2xl font-bold text-teal-400">
              Rp {totalAnggaran.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1320]/80 border border-teal-500/20 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Sumber Pembiayaan</span>
            <div className="text-sm font-bold text-white mt-1">BOK Puskesmas DAK Non-Fisik</div>
          </div>
          <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Cari uraian kegiatan, program, atau lokasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
        />
      </div>

      {/* POA Items Table */}
      <div className="rounded-3xl bg-[#0d1320]/90 border border-teal-500/20 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-bold border-b border-white/5">
              <tr>
                <th className="py-3 px-4">Tgl</th>
                <th className="py-3 px-4">Program Kesehatan</th>
                <th className="py-3 px-4">Uraian Kegiatan</th>
                <th className="py-3 px-4">Sasaran & Lokasi</th>
                <th className="py-3 px-4">Volume</th>
                <th className="py-3 px-4 text-right">Alokasi BOK</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPoa.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    Belum ada rencana kegiatan untuk bulan {months[selectedMonth - 1]} {selectedYear}.
                  </td>
                </tr>
              ) : (
                filteredPoa.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-teal-300 whitespace-nowrap">
                      {item.tanggal || '-'}
                    </td>
                    <td className="py-3 px-4 font-bold text-white max-w-[200px] truncate">
                      {item.program_kesehatan}
                    </td>
                    <td className="py-3 px-4 text-slate-300 max-w-[260px] truncate">
                      {item.uraian_kegiatan}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      <div>{item.target_sasaran || '-'}</div>
                      <div className="text-[10px] text-teal-400/80">{item.lokasi_pelaksanaan || '-'}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">
                      {item.vol_kegiatan} {item.satuan}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-white whitespace-nowrap">
                      Rp {(item.anggaran_bok || 0).toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                        item.status === 'Terlaksana'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#0d1320] border border-teal-500/30 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-teal-400" />
              Tambah Rencana Kegiatan POA BOK
            </h3>
            <form onSubmit={handleCreatePoa} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Tanggal Kegiatan</label>
                <input
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Program Kesehatan</label>
                <select
                  value={formData.program_kesehatan}
                  onChange={(e) => setFormData({ ...formData, program_kesehatan: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  {KEGIATAN_BOK_LIST.map((prog, i) => (
                    <option key={i} value={prog}>{prog}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Uraian Detail Kegiatan</label>
                <textarea
                  rows={2}
                  placeholder="Deskripsi kegiatan..."
                  value={formData.uraian_kegiatan}
                  onChange={(e) => setFormData({ ...formData, uraian_kegiatan: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Lokasi Kegiatan</label>
                  <input
                    type="text"
                    value={formData.lokasi_pelaksanaan}
                    onChange={(e) => setFormData({ ...formData, lokasi_pelaksanaan: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Estimasi Anggaran (Rp)</label>
                  <input
                    type="number"
                    value={formData.anggaran_bok}
                    onChange={(e) => setFormData({ ...formData, anggaran_bok: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold"
                >
                  Simpan Rencana
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
