import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  ShieldCheck, 
  Sparkles, 
  Play, 
  CheckCircle2,
  Database,
  Layers,
  FileText,
  Boxes
} from 'lucide-react';
import { SQL_PRESETS, extractProjectRef, getActiveCredentials } from '../lib/supabase';

export const SqlSnippets: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState('tasks');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const creds = getActiveCredentials();
  const projectRef = extractProjectRef(creds.url);

  const selectedPreset = SQL_PRESETS.find((p) => p.id === selectedPresetId) || SQL_PRESETS[0];

  const handleCopy = (id: string, sql: string) => {
    navigator.clipboard.writeText(sql);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getPresetIcon = (id: string) => {
    switch (id) {
      case 'tasks':
        return Layers;
      case 'notes':
        return FileText;
      case 'items':
        return Boxes;
      default:
        return Database;
    }
  };

  return (
    <div className="space-y-6">
      {/* 3-Step Guided Workflow Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Database Schema Migration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Deploy PostgreSQL Tables to Supabase
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Run these curated SQL migrations directly in your Supabase SQL Editor to enable live PostgreSQL tables, Row Level Security (RLS) policies, and sample records.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center mb-2">
                1
              </div>
              <h4 className="text-sm font-semibold text-white">Select & Copy Schema</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Choose a pre-built table template below and click <strong>Copy SQL</strong>.
              </p>
            </div>
            <div className="mt-3 text-[11px] text-emerald-400/90 font-mono">1-click clipboard</div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center mb-2">
                2
              </div>
              <h4 className="text-sm font-semibold text-white">Open Supabase Editor</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Click the direct link to open the new SQL query tab in your Supabase project.
              </p>
            </div>
            <a
              href={`https://supabase.com/dashboard/project/${projectRef}/sql/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-medium"
            >
              <span>Launch SQL Editor</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 font-bold text-xs flex items-center justify-center mb-2">
                3
              </div>
              <h4 className="text-sm font-semibold text-white">Paste & Click Run</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Paste the SQL code and hit <strong>Run</strong> (or press <kbd className="bg-slate-800 px-1 py-0.5 rounded text-[10px]">Ctrl</kbd> + <kbd className="bg-slate-800 px-1 py-0.5 rounded text-[10px]">Enter</kbd>).
              </p>
            </div>
            <div className="mt-3 text-[11px] text-purple-400/90 font-mono">Instant creation</div>
          </div>
        </div>
      </div>

      {/* Schema Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SQL_PRESETS.map((preset) => {
          const isSelected = preset.id === selectedPresetId;
          const Icon = getPresetIcon(preset.id);
          return (
            <button
              key={preset.id}
              onClick={() => setSelectedPresetId(preset.id)}
              className={`text-left p-4 rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-950/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                  {preset.tableName}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white">{preset.name}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {preset.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Code Viewer & Action Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {/* Code Card Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-semibold text-slate-200">
              migration_{selectedPreset.tableName}.sql
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(selectedPreset.id, selectedPreset.sql)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-md transition-all"
            >
              {copiedId === selectedPreset.id ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy SQL Code</span>
                </>
              )}
            </button>

            <a
              href={`https://supabase.com/dashboard/project/${projectRef}/sql/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
            >
              <span>Open in Supabase</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-x-auto">
          <pre className="text-xs sm:text-sm font-mono text-emerald-300 leading-relaxed">
            {selectedPreset.sql}
          </pre>
        </div>

        {/* Footer info explaining RLS */}
        <div className="px-6 py-4 bg-slate-900/40 border-t border-slate-800/80 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Row Level Security (RLS) Included:</strong> The snippet above automatically enables RLS and configures policies so your web client can read and write data smoothly using the Anon Key.
          </p>
        </div>
      </div>
    </div>
  );
};
