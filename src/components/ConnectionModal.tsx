import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, RefreshCw, ExternalLink, Key, Database, ShieldCheck } from 'lucide-react';
import { getActiveCredentials, setCustomCredentials, resetCredentials, checkConnectionHealth, extractProjectRef } from '../lib/supabase';

interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCredentialsChanged: () => void;
}

export const ConnectionModal: React.FC<ConnectionModalProps> = ({
  isOpen,
  onClose,
  onCredentialsChanged,
}) => {
  if (!isOpen) return null;

  const currentCreds = getActiveCredentials();
  const [url, setUrl] = useState(currentCreds.url);
  const [anonKey, setAnonKey] = useState(currentCreds.anonKey);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    tested: boolean;
    success: boolean;
    latencyMs?: number;
    error?: string;
  } | null>(null);
  const [showKey, setShowKey] = useState(false);

  const projectRef = extractProjectRef(url);

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      // Temporarily test with inputs
      const health = await checkConnectionHealth();
      setTestResult({
        tested: true,
        success: health.connected,
        latencyMs: health.latencyMs,
        error: health.error,
      });
    } catch (e: any) {
      setTestResult({
        tested: true,
        success: false,
        error: e.message || 'Connection test failed',
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    setCustomCredentials(url, anonKey);
    onCredentialsChanged();
    onClose();
  };

  const handleReset = () => {
    resetCredentials();
    const defaults = getActiveCredentials();
    setUrl(defaults.url);
    setAnonKey(defaults.anonKey);
    onCredentialsChanged();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Supabase Connection Settings</h2>
              <p className="text-xs text-slate-400">Manage credentials and verify connection health</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Quick Info Banner */}
          <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-200/90 leading-relaxed">
              <p className="font-medium text-emerald-300 mb-1">Active Supabase Project</p>
              Your app communicates with Supabase over HTTPS using the Anon Key. Safe for browser usage when Row Level Security (RLS) is enabled.
            </div>
          </div>

          {/* Project Reference & Direct Link */}
          <div className="flex items-center justify-between bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 px-4">
            <div>
              <span className="text-xs text-slate-400 block">Project Reference ID</span>
              <span className="font-mono text-sm text-emerald-400 font-semibold">{projectRef}</span>
            </div>
            <a
              href={`https://supabase.com/dashboard/project/${projectRef}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-700/70 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors border border-slate-600/60"
            >
              <span>Open Supabase Dashboard</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Supabase URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Supabase Project URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-project.supabase.co"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              The base URL of your Supabase instance (e.g. <code className="text-slate-400">https://{projectRef}.supabase.co</code>)
            </p>
          </div>

          {/* Anon Key */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Supabase Anon / Public Key
              </label>
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="text-xs text-emerald-400 hover:underline"
              >
                {showKey ? 'Hide Key' : 'Reveal Key'}
              </button>
            </div>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5c..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Public anon key with JWT role: <code className="text-slate-400">anon</code>.
            </p>
          </div>

          {/* Connection Test Result */}
          {testResult && (
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${
                testResult.success
                  ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-700/60 text-rose-300'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <div className="flex-1">
                {testResult.success ? (
                  <span>
                    Successfully reached Supabase! Latency: <strong>{testResult.latencyMs}ms</strong>.
                  </span>
                ) : (
                  <span>Failed to connect: {testResult.error}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleTest}
              disabled={testing}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Testing...' : 'Test Connection'}</span>
            </button>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-slate-200 px-2 py-2 transition-colors"
            >
              Reset to Env Defaults
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-xs font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm shadow-emerald-900/50 transition-colors"
            >
              Save Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
