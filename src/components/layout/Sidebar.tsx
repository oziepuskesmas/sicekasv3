import React, { useState } from 'react';
import { 
  Home, 
  CalendarCheck, 
  FileCheck, 
  Briefcase, 
  Calendar, 
  Terminal, 
  Sun, 
  Moon, 
  LogOut, 
  ChevronRight,
  Shield,
  User as UserIcon,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export type ViewType = 
  | 'beranda' 
  | 'poa-bulanan' 
  | 'tppol-jaspel' 
  | 'sppd-lpt' 
  | 'jadwal-kegiatan' 
  | 'developer-web';

interface SidebarProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  isCollapsed,
  onToggleCollapse,
}) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isSuperAdmin = user?.role === 'Super Admin' || user?.username === 'ozie';

  const navItems = [
    { id: 'beranda' as ViewType, label: 'Beranda', icon: Home, section: 'MENU UTAMA' },
    { id: 'poa-bulanan' as ViewType, label: 'POA Bulanan', icon: CalendarCheck, section: 'DOKUMEN' },
    { id: 'tppol-jaspel' as ViewType, label: 'TP POL (Jaspel)', icon: FileCheck, section: 'DOKUMEN' },
    { id: 'sppd-lpt' as ViewType, label: 'SPPD & LPT', icon: Briefcase, section: 'DOKUMEN', badge: 'PREVIEW A4' },
    { id: 'jadwal-kegiatan' as ViewType, label: 'Jadwal Kegiatan', icon: Calendar, section: 'DOKUMEN' },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 bottom-0 z-40 flex flex-col transition-all duration-300 ease-in-out border-r
        ${isCollapsed ? 'w-20' : 'w-64'} 
        bg-[#090d16]/95 backdrop-blur-xl border-teal-500/20`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-teal-500/15">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center p-1.5 shrink-0">
            <img src="/LOGO.png" alt="SICEKAS Logo" className="w-full h-full object-contain" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-base tracking-wide text-white leading-tight">
                SICEKAS <span className="text-teal-400 text-xs px-1.5 py-0.5 rounded bg-teal-500/20">v3.0</span>
              </span>
              <span className="text-[11px] text-teal-200/70 truncate">Puskesmas Banjaran Kota</span>
            </div>
          )}
        </div>
        <button 
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          title={isCollapsed ? 'Perluas Sidebar' : 'Lipat Sidebar'}
        >
          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Main Menu */}
        <div>
          {!isCollapsed && (
            <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Menu Utama
            </div>
          )}
          <nav className="space-y-1">
            {navItems.filter(item => item.section === 'MENU UTAMA').map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all relative group
                    ${isActive 
                      ? 'bg-gradient-to-r from-teal-500/20 to-teal-500/5 text-teal-300 border border-teal-500/30 shadow-[0_0_15px_rgba(45,212,191,0.15)]' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-teal-300'}`} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                  {isActive && <span className="absolute right-2 w-1.5 h-4 rounded-full bg-teal-400"></span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Documents Menu */}
        <div>
          {!isCollapsed && (
            <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Dokumen & Kegiatan
            </div>
          )}
          <nav className="space-y-1">
            {navItems.filter(item => item.section === 'DOKUMEN').map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all relative group
                    ${isActive 
                      ? 'bg-gradient-to-r from-teal-500/20 to-teal-500/5 text-teal-300 border border-teal-500/30 shadow-[0_0_15px_rgba(45,212,191,0.15)]' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-teal-300'}`} />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!isCollapsed && item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <span className="absolute right-2 w-1.5 h-4 rounded-full bg-teal-400"></span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Super Admin Section */}
        {isSuperAdmin && (
          <div>
            {!isCollapsed && (
              <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
                <Shield className="w-3 h-3" /> God Mode
              </div>
            )}
            <button
              onClick={() => onSelectView('developer-web')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group
                ${currentView === 'developer-web' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                  : 'text-amber-200/80 hover:text-white hover:bg-amber-500/10 border border-transparent'}`}
              title={isCollapsed ? 'Developer Web (Super Admin)' : undefined}
            >
              <div className="flex items-center gap-3 truncate">
                <Terminal className="w-5 h-5 shrink-0 text-amber-400" />
                {!isCollapsed && <span className="truncate">Developer Web</span>}
              </div>
              {!isCollapsed && (
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  ADMIN
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Footer / Theme & User */}
      <div className="p-3 border-t border-teal-500/15 space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 border border-white/5 transition-colors"
          title="Ganti Tema (Terang / Gelap)"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
              {!isCollapsed && <span>Mode Terang</span>}
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-blue-400 shrink-0" />
              {!isCollapsed && <span>Mode Gelap</span>}
            </>
          )}
        </button>

        {/* User Card */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-full flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-teal-500/20 hover:border-teal-500/40 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center font-bold text-teal-300 text-xs shrink-0">
              {user?.avatar || 'US'}
            </div>
            {!isCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <div className="text-xs font-semibold text-white truncate">{user?.nama || 'Petugas'}</div>
                <div className="text-[10px] text-teal-300/70 truncate">{user?.jabatan || user?.role}</div>
              </div>
            )}
            {!isCollapsed && <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
          </button>

          {/* Profile Dropdown Popover */}
          {showProfileMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-2 p-2 rounded-xl bg-[#0d1320] border border-teal-500/30 shadow-2xl space-y-1">
              <div className="px-2 py-1 text-xs text-slate-400 border-b border-white/5 mb-1 pb-1">
                <span className="font-semibold text-white">{user?.nama}</span>
                <p className="text-[10px] text-teal-400 truncate">{user?.nip}</p>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Keluar (Log Out)
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
