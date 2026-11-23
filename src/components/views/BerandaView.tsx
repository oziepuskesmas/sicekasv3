import React from 'react';
import { 
  Activity, 
  Calendar, 
  FileText, 
  Award, 
  Users, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ViewType } from '../layout/Sidebar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BerandaViewProps {
  onNavigate: (view: ViewType) => void;
}

export const BerandaView: React.FC<BerandaViewProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    datasets: [
      {
        label: 'Capaian POA BOK (%)',
        data: [82, 85, 88, 91, 89, 94, 96, 95, 98, 97, 99, 100],
        borderColor: '#2dd4bf',
        backgroundColor: 'rgba(45, 212, 191, 0.12)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#2dd4bf',
        pointBorderColor: '#0d1320',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Indeks Skor TP POL Jaspel',
        data: [91, 92, 93, 94, 92, 95, 96, 95, 96, 96, 97, 98],
        borderColor: '#38bdf8',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
        pointBackgroundColor: '#38bdf8',
        pointRadius: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#94a3b8',
          font: { family: 'Plus Jakarta Sans', size: 11 },
        },
      },
      tooltip: {
        backgroundColor: '#0d1320',
        titleColor: '#2dd4bf',
        bodyColor: '#f8fafc',
        borderColor: 'rgba(45, 212, 191, 0.3)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', font: { size: 10 } },
      },
      y: {
        min: 70,
        max: 100,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', font: { size: 10 } },
      },
    },
  };

  const kpis = [
    {
      title: 'Target POA BOK 2026',
      value: '100%',
      subtext: '40 Program Terlaksana',
      icon: Activity,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/25',
    },
    {
      title: 'Surat SPPD & LPT Terbit',
      value: '142',
      subtext: 'Bulan Ini: 18 Berkas A4',
      icon: FileText,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/25',
      action: () => onNavigate('sppd-lpt'),
    },
    {
      title: 'Rata-rata Skor TP POL',
      value: '96.4',
      subtext: 'Status: Terverifikasi',
      icon: Award,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/25',
      action: () => onNavigate('tppol-jaspel'),
    },
    {
      title: 'Pegawai Aktif Bertugas',
      value: '39',
      subtext: 'Puskesmas Banjaran Kota',
      icon: Users,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/25',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0d2a29] via-[#0b1f23] to-[#0d1320] border border-teal-500/30 shadow-[0_15px_35px_rgba(13,148,136,0.15)]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              SICEKAS v3.0 Modern Edge Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Selamat Bertugas, <span className="text-teal-300">{user?.nama || 'Petugas'}</span>
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl font-medium">
              Sistem Informasi Catat Pelaporan Puskesmas Banjaran Kota. Seluruh berkas POA, klaim Jaspel TP POL, dan cetak SPPD/LPT siap digunakan secara efisien.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('sppd-lpt')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 border border-teal-400/40 shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Buat SPPD / LPT Baru</span>
            </button>
            <button
              onClick={() => onNavigate('poa-bulanan')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-teal-300 bg-slate-900/80 hover:bg-slate-900 border border-teal-500/30 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Buka Kalender BOK</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              onClick={kpi.action}
              className={`p-5 rounded-2xl bg-[#0d1320]/80 border ${kpi.bg} shadow-lg transition-all ${kpi.action ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">{kpi.title}</span>
                <div className={`p-2 rounded-xl ${kpi.bg}`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <div className="text-2xl font-black text-white tracking-tight">{kpi.value}</div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                <span>{kpi.subtext}</span>
                {kpi.action && <ArrowUpRight className="w-3.5 h-3.5 text-teal-400" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Analytics Chart & Quick Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Healthcare Performance Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0d1320]/90 border border-teal-500/20 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-400" />
                Tren Kinerja Pelayanan & Anggaran BOK 2026
              </h3>
              <p className="text-xs text-slate-400">Grafik kumulatif bulanan Puskesmas Banjaran Kota</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
              Tahun Anggaran 2026
            </span>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Info & Activity Sidebar Card */}
        <div className="p-6 rounded-3xl bg-[#0d1320]/90 border border-teal-500/20 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              Status Instansi Resmi
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Fasilitas Pelayanan</span>
                <p className="text-xs font-bold text-white">UPTD Puskesmas Banjaran Kota</p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-teal-400" /> Kec. Banjaran, Kab. Bandung
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Kepala Puskesmas</span>
                <p className="text-xs font-bold text-white">dr. Rina Indriati</p>
                <p className="text-[10px] text-teal-300">NIP. 19740404 201411 2 001</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Kecepatan & Infrastruktur</span>
                <p className="text-xs font-bold text-emerald-400">Cloudflare D1 & Pages (Edge)</p>
                <p className="text-[10px] text-slate-400">Latency: &lt; 25ms &bull; 0 Downtime</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 mt-4">
            <button
              onClick={() => onNavigate('sppd-lpt')}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 transition-all text-center block"
            >
              Buka Form Pembuatan SPPD & LPT &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
