import React from 'react';
import { 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Key, 
  ExternalLink, 
  Layers, 
  FileText, 
  Table2, 
  Code2, 
  Users,
  Terminal
} from 'lucide-react';
import { extractProjectRef } from '../lib/supabase';

interface HeaderProps {
  activeTab: 'tasks' | 'notes' | 'explorer' | 'sql' | 'auth';
  setActiveTab: (tab: 'tasks' | 'notes' | 'explorer' | 'sql' | 'auth') => void;
  isConnected: boolean;
  latencyMs: number;
  supabaseUrl: string;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isConnected,
  latencyMs,
  supabaseUrl,
  onOpenSettings,
}) => {
  const projectRef = extractProjectRef(supabaseUrl);

  const tabs = [
    { id: 'tasks', label: 'Tasks Board', icon: Layers },
    { id: 'notes', label: 'Notes & Docs', icon: FileText },
    { id: 'explorer', label: 'Table Explorer', icon: Table2 },
    { id: 'sql', label: 'SQL Migrations', icon: Code2 },
    { id: 'auth', label: 'Auth & Users', icon: Users },
  ] as const;

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.2 12.604a.396.396 0 0 0 .32.628h9.362v8.958a.396.396 0 0 0 .716.233l9.084-12.441a.396.396 0 0 0-.32-.628z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">Supabase Studio</h1>
              <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                PostgreSQL
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Connected to real-time PostgreSQL database & auth
            </p>
          </div>
        </div>

        {/* Status Badges & Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Connection Status Pill */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isConnected
                ? 'bg-emerald-950/60 border-emerald-700/50 text-emerald-300'
                : 'bg-rose-950/60 border-rose-700/50 text-rose-300'
            }`}
          >
            <span className="relative flex h-2 w-2">
              {isConnected && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isConnected ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
              ></span>
            </span>
            <span>{isConnected ? 'Supabase Online' : 'Offline'}</span>
            {isConnected && latencyMs > 0 && (
              <span className="text-[11px] text-emerald-400/80 font-mono">({latencyMs}ms)</span>
            )}
          </div>

          {/* Project Ref Link */}
          <a
            href={`https://supabase.com/dashboard/project/${projectRef}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Supabase Cloud Dashboard"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate max-w-[110px]">{projectRef}</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {/* Settings / Credentials */}
          <button
            onClick={onOpenSettings}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
            title="Configure connection credentials"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">API Keys</span>
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto no-scrollbar gap-1 border-t border-slate-800/60 pt-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 rounded-t-lg'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
