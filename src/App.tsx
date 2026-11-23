import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './components/auth/LoginPage';
import { Sidebar, ViewType } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { BerandaView } from './components/views/BerandaView';
import { PoaView } from './components/views/PoaView';
import { TpPolView } from './components/views/TpPolView';
import { SppdView } from './components/views/SppdView';
import { JadwalView } from './components/views/JadwalView';
import { DeveloperWebView } from './components/views/DeveloperWebView';

export const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('beranda');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const getViewMeta = () => {
    switch (currentView) {
      case 'beranda':
        return {
          title: 'Beranda SICEKAS',
          subtitle: 'Ringkasan Kinerja & Capaian Pelayanan Puskesmas Banjaran Kota',
          category: 'PORTAL UTAMA',
        };
      case 'poa-bulanan':
        return {
          title: 'Plan of Action (POA) Bulanan',
          subtitle: 'Perencanaan & Realisasi Kegiatan Bantuan Operasional Kesehatan (BOK)',
          category: 'DOKUMEN BOK',
        };
      case 'tppol-jaspel':
        return {
          title: 'TP POL (Jasa Pelayanan)',
          subtitle: 'Penilaian Indikator Disiplin, Pelayanan, Administrasi & Perilaku',
          category: 'KLAIM JASPEL',
        };
      case 'sppd-lpt':
        return {
          title: 'SPPD & LPT Cetak Presisi A4',
          subtitle: 'Surat Perintah Perjalanan Dinas & Laporan Perjalanan Tugas Terpadu',
          category: 'SURAT DINAS',
        };
      case 'jadwal-kegiatan':
        return {
          title: 'Jadwal Kegiatan & Kolaborasi',
          subtitle: 'Agenda Luar Gedung & Notifikasi Kolaborasi Lintas Program',
          category: 'JADWAL LAPANGAN',
        };
      case 'developer-web':
        return {
          title: 'Developer Web & God Mode',
          subtitle: 'Cloudflare D1 Database SQL Runner & R2 Object Storage Manager',
          category: 'SUPER ADMIN',
        };
      default:
        return {
          title: 'SICEKAS v3.0',
          subtitle: 'Puskesmas Banjaran Kota',
          category: 'PORTAL',
        };
    }
  };

  const meta = getViewMeta();

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 flex flex-col">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Topbar Header */}
      <Topbar
        title={meta.title}
        subtitle={meta.subtitle}
        category={meta.category}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* Main Content Area */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out pt-20 pb-12 px-4 sm:px-6 md:px-8
          ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}
      >
        <div className="max-w-7xl mx-auto">
          {currentView === 'beranda' && <BerandaView onNavigate={setCurrentView} />}
          {currentView === 'poa-bulanan' && <PoaView />}
          {currentView === 'tppol-jaspel' && <TpPolView />}
          {currentView === 'sppd-lpt' && <SppdView />}
          {currentView === 'jadwal-kegiatan' && <JadwalView />}
          {currentView === 'developer-web' && <DeveloperWebView />}
        </div>
      </main>
    </div>
  );
};
