import React, { useState } from 'react';
import { Lock, User, ArrowRight, ShieldCheck, Sparkles, Eye, EyeOff, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OFFICIAL_PEGAWAI } from '../../data/pegawai';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [usernameOrNip, setUsernameOrNip] = useState('');
  const [password, setPassword] = useState('bankot2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showQuickSelect, setShowQuickSelect] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPegawai = OFFICIAL_PEGAWAI.filter(p => 
    p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.jabatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.nip.includes(searchQuery) ||
    p.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPegawai = (p: typeof OFFICIAL_PEGAWAI[0]) => {
    setUsernameOrNip(p.username);
    setPassword('bankot2026');
    setShowQuickSelect(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameOrNip.trim()) {
      setError('Silakan pilih atau masukkan Username / NIP Anda.');
      return;
    }

    setLoading(true);
    setError(null);

    const res = await login(usernameOrNip, password);
    setLoading(false);

    if (!res.success) {
      setError(res.error || 'Login gagal. Periksa kembali akun Anda.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-[#06080d] overflow-hidden">
      {/* Ambient Atmospheric Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[350px] h-[350px] rounded-full bg-emerald-600/10 blur-[100px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md bg-[#0d1320]/90 border border-teal-500/25 rounded-3xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(13,148,136,0.15)] backdrop-blur-2xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-teal-500/20 to-teal-500/5 border border-teal-500/30 shadow-[0_0_20px_rgba(45,212,191,0.2)] mb-3">
            <img src="/LOGO.png" alt="SICEKAS Logo" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            SICEKAS <span className="text-teal-400 font-extrabold text-xs px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-500/30">v3.0</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Puskesmas Banjaran Kota &bull; Kab. Bandung
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Select Pegawai Trigger */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowQuickSelect(!showQuickSelect)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-teal-500/20 text-xs font-semibold text-teal-300 hover:border-teal-500/40 hover:bg-slate-900 transition-all"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              Pilih Cepat 39 Pegawai Resmi Bankot
            </span>
            <span className="text-[10px] bg-teal-500/20 px-2 py-0.5 rounded-md text-teal-300">
              {showQuickSelect ? 'Tutup' : 'Buka'}
            </span>
          </button>

          {/* Quick Select Modal / Dropdown List */}
          {showQuickSelect && (
            <div className="mt-2 p-2 rounded-2xl bg-[#090d16] border border-teal-500/30 shadow-2xl max-h-60 overflow-y-auto space-y-1">
              {/* Search within 39 Pegawai */}
              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari nama, NIP, atau jabatan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                />
              </div>

              {filteredPegawai.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPegawai(p)}
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left hover:bg-teal-500/10 transition-colors group"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-white group-hover:text-teal-300 truncate">
                      {p.nama}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {p.jabatan} &bull; {p.nip}
                    </p>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-teal-400 shrink-0">
                    {p.avatar}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Username atau NIP Pegawai
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Contoh: rina, ozie, atau NIP"
                value={usernameOrNip}
                onChange={(e) => setUsernameOrNip(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password Akun
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Default password: <code className="text-teal-400/90 font-mono">bankot2026</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-400 hover:from-teal-500 hover:to-emerald-300 shadow-[0_8px_25px_rgba(20,184,166,0.35)] hover:shadow-[0_8px_30px_rgba(20,184,166,0.5)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            <span>{loading ? 'Memverifikasi...' : 'Masuk ke Dashboard SICEKAS'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Sistem Operasional Resmi Puskesmas Banjaran Kota</span>
          </div>
        </div>
      </div>
    </div>
  );
};
