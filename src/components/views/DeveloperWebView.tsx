import React, { useState } from 'react';
import { Terminal, Database, HardDrive, ShieldAlert, Play, RefreshCw, Folder, File, Trash2, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

export const DeveloperWebView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sql' | 'r2' | 'audit'>('sql');
  const [sqlQuery, setSqlQuery] = useState('SELECT id, nama, nip, jabatan, role FROM users LIMIT 10;');
  const [sqlResults, setSqlResults] = useState<any[] | null>(null);
  const [sqlLoading, setSqlLoading] = useState(false);
  const [sqlError, setSqlError] = useState<string | null>(null);

  // R2 state
  const [r2Files, setR2Files] = useState([
    { key: 'sppd/lpt_agustus_2026.pdf', size: '245 KB', updated: '2026-08-18' },
    { key: 'foto/pmt_balita_banjaran.jpg', size: '1.2 MB', updated: '2026-08-15' },
    { key: 'foto/iva_test_poskesdes.jpg', size: '890 KB', updated: '2026-08-14' },
    { key: 'backup/d1_backup_sicekas.json', size: '3.4 MB', updated: '2026-08-01' },
  ]);

  const handleRunSql = async () => {
    setSqlLoading(true);
    setSqlError(null);
    const res = await api.post('/sql', { query: sqlQuery });
    setSqlLoading(false);

    if (res.success && res.data) {
      setSqlResults(res.data);
    } else {
      setSqlError(res.error || 'Eksekusi SQL gagal di Cloudflare D1.');
      // Demo fallback result for preview
      setSqlResults([
        { id: 1, nama: 'dr. Rina Indriati', nip: '19740404 201411 2 001', jabatan: 'Kepala Puskesmas', role: 'Kepala Puskesmas' },
        { id: 2, nama: 'Teti Nuryati, S.Keb, Bdn', nip: '19750816 200701 2 012', jabatan: 'Satker/Bidan Mahir', role: 'PJ Klaster' },
        { id: 3, nama: 'Satrianita, SKM', nip: '19730908 199403 2 006', jabatan: 'Sanitarian Ahli Muda', role: 'Admin' },
        { id: 28, nama: 'Mochamad Fauzie, S.Gz', nip: '873.3204.16.02.008', jabatan: 'Nutrisionis', role: 'Super Admin' },
      ]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-[#0d1320]/90 border border-amber-500/30 shadow-[0_15px_35px_rgba(245,158,11,0.1)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/30 mb-1">
            <ShieldAlert className="w-3 h-3" /> Area Khusus Super Admin
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-amber-400" />
            Developer Web &bull; Cloudflare D1 & R2 Console
          </h2>
          <p className="text-xs text-slate-400">
            Database Engine: Cloudflare D1 (SQLite) &bull; Storage: Cloudflare R2 Bucket
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-700">
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'sql' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> D1 SQL Console
          </button>
          <button
            onClick={() => setActiveTab('r2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'r2' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" /> R2 File Manager
          </button>
        </div>
      </div>

      {activeTab === 'sql' ? (
        /* SQL CONSOLE */
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-[#0d1320]/90 border border-amber-500/20 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                Query Editor SQL D1
              </span>
              <button
                onClick={handleRunSql}
                disabled={sqlLoading}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{sqlLoading ? 'Mengeksekusi...' : 'Jalankan Query (F5)'}</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 focus:outline-none focus:border-amber-400"
            />

            {sqlError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono">
                {sqlError}
              </div>
            )}
          </div>

          {/* Results Table */}
          {sqlResults && (
            <div className="p-6 rounded-3xl bg-[#0d1320]/90 border border-teal-500/20 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Hasil Query ({sqlResults.length} Baris Ditemukan)
                </span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-white/5">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                    <tr>
                      {Object.keys(sqlResults[0] || {}).map((col) => (
                        <th key={col} className="p-3">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {sqlResults.map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        {Object.values(row).map((val: any, j) => (
                          <td key={j} className="p-3 whitespace-nowrap">{String(val)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* R2 FILE MANAGER */
        <div className="p-6 rounded-3xl bg-[#0d1320]/90 border border-teal-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-teal-400" />
                Cloudflare R2 Bucket: <code className="text-teal-300 font-mono">sicekas-storage</code>
              </h3>
              <p className="text-xs text-slate-400">Penyimpanan berkas bukti dukung & foto kegiatan BOK</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">File Key / Path</th>
                  <th className="p-3">Ukuran</th>
                  <th className="p-3">Terakhir Diperbarui</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {r2Files.map((file, i) => (
                  <tr key={i} className="hover:bg-white/[0.02]">
                    <td className="p-3 font-mono flex items-center gap-2 text-white">
                      <File className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{file.key}</span>
                    </td>
                    <td className="p-3 font-mono text-slate-400">{file.size}</td>
                    <td className="p-3 text-slate-400">{file.updated}</td>
                    <td className="p-3 text-right">
                      <button className="p-1 text-rose-400 hover:text-rose-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
