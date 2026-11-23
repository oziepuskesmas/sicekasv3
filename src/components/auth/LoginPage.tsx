import React, { useState, useEffect } from 'react';
import { Lock, User as UserIcon, ArrowRight, ShieldCheck, Sparkles, Eye, EyeOff, ChevronDown, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OFFICIAL_PEGAWAI } from '../../data/pegawai';
import { User } from '../../types/user';
import { api } from '../../services/api';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [pegawaiList, setPegawaiList] = useState<User[]>(OFFICIAL_PEGAWAI);
  const [selectedPegawai, setSelectedPegawai] = useState<User | null>(null);
  const [password, setPassword] = useState('bankot2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Fetch live users from Cloudflare D1 database on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get<User[]>('/users');
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setPegawaiList(res.data);
        }
      } catch (e) {
        // Fallback to OFFICIAL_PEGAWAI
      }
    };
    fetchUsers();
  }, []);

  const filteredPegawai = pegawaiList.filter(p =>
    p.nama.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.jabatan.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.nip.includes(searchFilter) ||
    p.username.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleSelectPegawai = (p: User) => {
    setSelectedPegawai(p);
    setPassword('bankot2026');
    setIsDropdownOpen(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPegawai) {
      setError('Silakan pilih nama pegawai Anda dari dropdown list.');
      return;
    }

    setLoading(true);
    setError(null);

    // Try authenticating with username, fallback with NIP or Nama
    const res = await login(selectedPegawai.username, password);
    setLoading(false);

    if (!res.success) {
      // Retry with NIP or Nama if needed
      const retryRes = await login(selectedPegawai.nip, password);
      if (!retryRes.success) {
        setError(res.error || retryRes.error || 'Login gagal. Periksa kembali akun Anda.');
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-[#06080d] overflow-hidden">
      {/* Ambient Atmospheric Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[350px] h-[350px] rounded-full bg-emerald-600/10 blur-[100px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md bg-[#0d1320]/95 border border-teal-500/25 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(13,148,136,0.15)] backdrop-blur-2xl">
        {/* Brand Header */}
        <div className="text-center mb-6">
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
          <div className="mb-5 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pegawai Dropdown Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5">
              Pilih Nama Pegawai (Database Bankot)
            </label>

            {/* Native Select for standard form handling & mobile simplicity */}
            <div className="relative mb-2">
              <select
                value={selectedPegawai ? selectedPegawai.username : ''}
                onChange={(e) => {
                  const found = pegawaiList.find(p => p.username === e.target.value);
                  if (found) handleSelectPegawai(found);
                }}
                className="w-full pl-3.5 pr-8 py-2.5 rounded-xl bg-slate-900 border border-teal-500/30 text-xs font-semibold text-white focus:outline-none focus:border-teal-400 transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>-- Klik untuk Pilih Pegawai ({pegawaiList.length} Terdaftar) --</option>
                {pegawaiList.map((p) => (
                  <option key={p.id} value={p.username}>
                    {p.no_urut ? `${p.no_urut}. ` : ''}{p.nama} — {p.jabatan}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-teal-400 absolute right-3 top-3 pointer-events-none" />
            </div>

            {/* Custom Searchable Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-xs text-left hover:border-teal-400/50 transition-all"
              >
                {selectedPegawai ? (
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-md bg-teal-500/20 text-teal-300 font-bold text-[10px] flex items-center justify-center shrink-0 border border-teal-500/30">
                      {selectedPegawai.avatar || 'PG'}
                    </span>
                    <div className="truncate">
                      <div className="text-white font-bold truncate">{selectedPegawai.nama}</div>
                      <div className="text-[10px] text-teal-300/70 truncate">{selectedPegawai.jabatan} &bull; {selectedPegawai.nip}</div>
                    </div>
                  </div>
                ) : (
                  <span className="text-slate-400 flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-slate-500" />
                    Cari & telusuri daftar nama pegawai...
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Options List */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 p-2 rounded-2xl bg-[#090d16] border border-teal-500/30 shadow-2xl max-h-64 overflow-y-auto space-y-1">
                  {/* Search inside Dropdown */}
                  <div className="p-1 mb-1">
                    <input
                      type="text"
                      placeholder="Ketik untuk memfilter nama/jabatan/NIP..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                      autoFocus
                    />
                  </div>

                  {filteredPegawai.length === 0 ? (
                    <div className="p-3 text-center text-xs text-slate-500">
                      Tidak ada pegawai yang cocok.
                    </div>
                  ) : (
                    filteredPegawai.map((p) => {
                      const isSelected = selectedPegawai?.username === p.username;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleSelectPegawai(p)}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                            isSelected 
                              ? 'bg-teal-500/20 border border-teal-500/40 text-teal-300' 
                              : 'hover:bg-white/5 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <span className="w-6 h-6 rounded-md bg-slate-800 text-teal-400 font-bold text-[10px] flex items-center justify-center shrink-0">
                              {p.avatar || 'PG'}
                            </span>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-white truncate">{p.nama}</p>
                              <p className="text-[10px] text-slate-400 truncate">{p.jabatan} &bull; {p.nip}</p>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-teal-400 shrink-0" />}
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5">
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-400 hover:from-teal-500 hover:to-emerald-300 shadow-[0_8px_25px_rgba(20,184,166,0.35)] hover:shadow-[0_8px_30px_rgba(20,184,166,0.5)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            <span>{loading ? 'Memverifikasi...' : 'Masuk ke Dashboard SICEKAS'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-white/5 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Sistem Operasional Resmi Puskesmas Banjaran Kota</span>
          </div>
        </div>
      </div>
    </div>
  );
};
