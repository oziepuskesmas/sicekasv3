import React, { useState, useEffect } from 'react';
import { Clock, Bell, User as UserIcon, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TopbarProps {
  title: string;
  subtitle: string;
  category: string;
  sidebarCollapsed: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({
  title,
  subtitle,
  category,
  sidebarCollapsed,
}) => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setCurrentDate(now.toLocaleDateString('id-ID', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header 
      className={`fixed top-0 right-0 z-30 h-16 transition-all duration-300 ease-in-out border-b
        ${sidebarCollapsed ? 'left-20' : 'left-64'} 
        bg-[#06080d]/80 backdrop-blur-md border-teal-500/15 px-6 flex items-center justify-between`}
    >
      {/* Title & Category */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold tracking-widest text-teal-400 uppercase bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
            {category}
          </span>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">&bull;</span>
          <span className="text-xs text-slate-400 truncate hidden sm:inline">{subtitle}</span>
        </div>
        <h1 className="text-lg font-bold text-white tracking-tight leading-none mt-1">
          {title}
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Date Live Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-teal-500/20 text-xs font-medium text-slate-300">
          <Clock className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
          <span>{currentDate}</span>
        </div>

        {/* User Role Tag */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/25">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-xs font-bold text-teal-300 truncate max-w-[140px]">
            {user?.role || 'Petugas'}
          </span>
        </div>
      </div>
    </header>
  );
};
