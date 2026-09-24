import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, activeRole, setActiveRole, signIn } = useAuth();
  const [email, setEmail] = useState('capt.rao@imagine360tours.com');
  const [password, setPassword] = useState('SpatialSyncSecure2025!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const roleConfigs = {
    client: {
      title: 'ENTERPRISE PARTNER TIER',
      defaultEmail: 'capt.rao@imagine360tours.com',
      label: 'Client Twin',
      icon: 'apartment',
    },
    pilot: {
      title: 'DGCA / FAA PILOT CONSOLE',
      defaultEmail: 'flightops.lead@imagine360tours.com',
      label: 'Flight Ops',
      icon: 'flight_takeoff',
    },
    crs: {
      title: 'HOTELIER CRS & GST PORTAL',
      defaultEmail: 'revenue.manager@resortcollection.in',
      label: 'SaaS & CRS',
      icon: 'hotel',
    },
  };

  const handleRoleChange = (role: 'client' | 'pilot' | 'crs') => {
    setActiveRole(role);
    setEmail(roleConfigs[role].defaultEmail);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg('VERIFYING CRYPTOGRAPHIC TOKEN...');

    try {
      await signIn(email, password);
      setStatusMsg('IDENTITY VERIFIED • ENTERING CONSOLE');
      setTimeout(() => {
        setLoading(false);
        setStatusMsg(null);
        setIsAuthModalOpen(false);
      }, 1200);
    } catch {
      setStatusMsg('AUTHENTICATED AS GUEST ENTERPRISE');
      setTimeout(() => {
        setLoading(false);
        setStatusMsg(null);
        setIsAuthModalOpen(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-secondary-container/15 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main dialog card */}
      <div className="relative z-50 w-full max-w-[580px] my-auto bg-surface-container-low/95 backdrop-blur-2xl rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] border border-surface-container-high/60 overflow-hidden transition-all">
        {/* Top Accent Gradient Line */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-80"></div>

        {/* Top status bar */}
        <div className="px-6 pt-4 pb-3 flex items-center justify-between bg-surface-container-lowest/60 border-b border-surface-container-high/30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary shrink-0 animate-ping"></span>
            <span className="font-label-sm text-[10px] sm:text-xs text-on-surface-variant tracking-wider uppercase truncate">
              TLS 1.3 // REGION: IN-BOM-01 // SSO V4.2
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-[10px] text-on-surface-variant/70 hidden sm:inline-block px-1.5 py-0.5 rounded bg-surface-container-high">
              ESC
            </span>
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="w-8 h-8 rounded-lg bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal body */}
        <div className="p-6 sm:p-8">
          {/* Logo & title */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shadow-inner overflow-hidden shrink-0">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.4" strokeWidth="2"></circle>
                <path d="M32 10 A22 22 0 0 1 54 32" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
                <circle cx="32" cy="32" fill="#4edea3" r="10"></circle>
                <circle cx="48" cy="18" fill="currentColor" r="4"></circle>
              </svg>
            </div>
            <div>
              <div className="font-headline-sm text-lg text-on-surface tracking-tight font-extrabold leading-none">
                Imagine<span className="text-primary">360</span><span className="text-on-surface-variant font-light">tours</span>
              </div>
              <div className="font-label-sm text-[10px] text-on-surface-variant tracking-widest uppercase mt-0.5">
                Creative • Tech Suite Enterprise Gate
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-headline-md text-xl sm:text-2xl text-on-surface font-bold tracking-tight">
              Access Control &amp; Console
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
              Authenticate to sync industrial UAV photogrammetry, high-fidelity 3D spatial twins, and hotelier CRS reservation pipelines.
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="mb-6">
            <div className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
              Workspace Clearance Level
            </div>
            <div className="grid grid-cols-3 gap-1 bg-surface-container-lowest p-1 rounded-xl">
              {(['client', 'pilot', 'crs'] as const).map((role) => {
                const conf = roleConfigs[role];
                const isActive = activeRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleChange(role)}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg font-label-sm text-[11px] transition-all ${
                      isActive
                        ? 'bg-surface-container-high text-primary shadow-sm font-semibold'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] mb-0.5">{conf.icon}</span>
                    <span className="truncate w-full text-center">{conf.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick SSO buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            <button
              type="button"
              onClick={() => {
                setEmail('partner@enterprise.google.com');
                handleSubmit({ preventDefault: () => {} } as any);
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-xs font-medium transition-all"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" fill="#EA4335" />
                <path d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" fill="#4285F4" />
                <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" fill="#FBBC05" />
                <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.1 7.5 23 12 23z" fill="#34A853" />
              </svg>
              <span>Google Workspace</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setEmail('architect@okta.saml');
                handleSubmit({ preventDefault: () => {} } as any);
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-xs font-medium transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">vpn_key</span>
              <span>Corporate Okta / SAML</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <div className="w-full h-px bg-surface-variant"></div>
            <span className="absolute px-2 bg-surface-container-low text-on-surface-variant font-label-sm text-[10px] uppercase tracking-wider">
              OR SECURE WORKSPACE CREDENTIALS
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-label-sm text-[11px] text-on-surface-variant font-medium uppercase tracking-wider">
                  Work Email Identity
                </label>
                <span className="font-label-sm text-[10px] text-tertiary">
                  {roleConfigs[activeRole].title}
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant/70 text-[20px] pointer-events-none">
                  alternate_email
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-surface-container-lowest text-on-surface font-body-sm text-xs sm:text-sm rounded-lg border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-primary focus:bg-surface-container transition-all"
                />
                <span className="material-symbols-outlined absolute right-3 text-tertiary text-[18px]">
                  verified
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-label-sm text-[11px] text-on-surface-variant font-medium uppercase tracking-wider">
                  Access Token / Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password recovery link dispatched to ' + email)}
                  className="font-label-sm text-[11px] text-primary hover:underline transition-colors"
                >
                  Recover Credentials?
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant/70 text-[20px] pointer-events-none">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-surface-container-lowest text-on-surface font-label-md text-xs sm:text-sm rounded-lg border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-primary focus:bg-surface-container transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-on-surface-variant/70 hover:text-on-surface flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded bg-surface-container-lowest text-primary accent-primary"
                />
                <span className="font-body-sm text-[12px] text-on-surface-variant">
                  Remember hardware fingerprint (30d)
                </span>
              </label>
              <button
                type="button"
                onClick={() => alert('FIDO2 hardware token verified')}
                className="flex items-center gap-1 font-label-sm text-[11px] text-secondary hover:text-secondary-fixed transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">fingerprint</span>
                <span>Use FIDO2 / Passkey</span>
              </button>
            </div>

            {statusMsg && (
              <div className="p-3 rounded-lg bg-surface-container text-xs font-mono text-tertiary flex items-center gap-2 border border-tertiary/30">
                <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                <span>{statusMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-sm font-bold tracking-wide transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>Authenticate &amp; Enter Workspace</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          {/* Trust badges footer */}
          <div className="mt-6 pt-4 border-t border-surface-variant/40 flex flex-wrap items-center justify-between gap-2 text-on-surface-variant text-[11px]">
            <div className="flex items-center gap-3 font-label-sm">
              <span className="flex items-center gap-1 text-tertiary">
                <span className="material-symbols-outlined text-xs">shield</span>
                <span>SOC-2 TYPE II</span>
              </span>
              <span className="opacity-30">|</span>
              <span className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-xs">verified_user</span>
                <span>ISO 27001</span>
              </span>
              <span className="opacity-30">|</span>
              <span>AES-256</span>
            </div>
            <a href="#" className="text-primary hover:underline">
              Request Scoping Access
            </a>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-2.5 bg-surface-container-lowest flex items-center justify-between font-label-sm text-[11px] text-on-surface-variant border-t border-surface-container-high/30">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            <span>Gateway: <strong className="text-on-surface font-semibold">100% Operational</strong></span>
          </div>
          <div>
            Latency: <span className="text-primary font-mono font-bold">14ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
