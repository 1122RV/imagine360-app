import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface ClientDashboardProps {
  setCurrentPage: (page: string) => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ setCurrentPage }) => {
  const { user } = useAuth();
  const { showToast } = useCart();
  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  const missions = [
    {
      id: 'I360-8420',
      title: 'Oberoi Skyvillas 360° Photogrammetry & BIM Model',
      category: '3D Spatial',
      status: 'In Post-Production',
      progress: 82,
      pilot: 'Devon Vance (DGCA-309)',
      deliverable: 'Unreal Engine 5.4 Nanite & BIM IFC4',
      eta: 'Tomorrow, 14:00 IST',
      badgeColor: 'text-primary bg-primary/10',
    },
    {
      id: 'I360-8421',
      title: 'Aura Coastline Luxury Resort FPV Interior Flythrough',
      category: 'Cinematic Drone',
      status: 'Color Grading (DaVinci)',
      progress: 65,
      pilot: 'Vikram Joshi (FAA-9921)',
      deliverable: '8K CinemaDNG RAW Master',
      eta: 'Oct 28, 2025',
      badgeColor: 'text-secondary bg-secondary/10',
    },
    {
      id: 'I360-8422',
      title: 'FinScale GST API Integration & POS Sandbox',
      category: 'SaaS Platform',
      status: 'Live Sandbox Active',
      progress: 98,
      pilot: 'FinScale Cloud Ops',
      deliverable: 'Sub-380ms NIC Direct Gateway',
      eta: 'Active Production',
      badgeColor: 'text-tertiary bg-tertiary/10',
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-container border border-surface-container-high/50 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-on-primary font-display text-xl font-bold shadow-lg">
              {user?.email?.charAt(0).toUpperCase() || 'E'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline-md text-xl sm:text-2xl text-on-surface font-extrabold">
                  Enterprise Client Command Center
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-tertiary/15 text-tertiary font-label-sm text-[11px] font-bold">
                  SLA GOLD ACTIVE
                </span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant mt-0.5">
                Logged in as <strong className="text-on-surface">{user?.email || 'enterprise-client@imagine360tours.com'}</strong> • Org ID: <span className="font-mono text-primary font-bold">ORG-I360-GLOBAL</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage('book-online')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-xs font-bold shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Commission New Mission</span>
            </button>
          </div>
        </div>

        {/* High-Level Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-surface-container-low border border-surface-container-high/40 shadow-sm flex flex-col gap-1">
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">Active Missions</span>
            <span className="font-display text-3xl text-primary font-extrabold">03 In-Flight</span>
            <span className="font-body-sm text-[11px] text-tertiary mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">verified</span> All Milestones on Schedule
            </span>
          </div>

          <div className="p-5 rounded-xl bg-surface-container-low border border-surface-container-high/40 shadow-sm flex flex-col gap-1">
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">Total Assets In Vault</span>
            <span className="font-display text-3xl text-on-surface font-extrabold">142 Deliverables</span>
            <span className="font-body-sm text-[11px] text-on-surface-variant mt-1">
              84.2 GB Photogrammetry &amp; 8K RAW
            </span>
          </div>

          <div className="p-5 rounded-xl bg-surface-container-low border border-surface-container-high/40 shadow-sm flex flex-col gap-1">
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">SaaS API Consumed</span>
            <span className="font-display text-3xl text-secondary font-extrabold">1.48M Calls</span>
            <span className="font-body-sm text-[11px] text-on-surface-variant mt-1">
              Avg Latency: 16.4ms • 99.99% Uptime
            </span>
          </div>

          <div className="p-5 rounded-xl bg-surface-container-low border border-surface-container-high/40 shadow-sm flex flex-col gap-1">
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">Escrow Balance</span>
            <span className="font-display text-3xl text-tertiary font-extrabold">$14,500</span>
            <span className="font-body-sm text-[11px] text-on-surface-variant mt-1">
              Protected by Milestone Smart Escrow
            </span>
          </div>
        </div>

        {/* Active Missions Tracking */}
        <section className="p-6 rounded-2xl bg-surface-container border border-surface-container-high/50 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">satellite_alt</span>
              <h2 className="font-headline-sm text-base text-on-surface font-bold">
                Live Mission Pipeline Tracking
              </h2>
            </div>
            <span className="font-label-sm text-xs text-outline font-mono">CADENCE: CONTINUOUS</span>
          </div>

          <div className="flex flex-col gap-3">
            {missions.map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/40 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-primary">{m.id}</span>
                    <span className="text-outline-variant">•</span>
                    <span className="font-label-sm text-xs text-on-surface-variant">{m.category}</span>
                    <span className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] font-bold ${m.badgeColor}`}>
                      {m.status}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-sm text-on-surface font-bold">{m.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-on-surface-variant font-body-sm">
                    <span>Assigned Lead: <strong className="text-on-surface">{m.pilot}</strong></span>
                    <span>Deliverable: <strong className="text-on-surface">{m.deliverable}</strong></span>
                    <span>Est. Handoff: <strong className="text-tertiary">{m.eta}</strong></span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 w-full lg:w-56 shrink-0">
                  <div className="w-full flex justify-between text-xs font-label-sm">
                    <span className="text-outline">Completion</span>
                    <span className="text-primary font-bold font-mono">{m.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-tertiary transition-all duration-500"
                      style={{ width: `${m.progress}%` }}
                    ></div>
                  </div>
                  <button
                    onClick={() => showToast(`Opening Live Telemetry Stream for ${m.id}`)}
                    className="mt-1 text-xs font-label-sm text-primary hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>View Ingest Telemetry</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Asset Vault & Downloads */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 p-6 rounded-2xl bg-surface-container border border-surface-container-high/50 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-xl">cloud_download</span>
                <h2 className="font-headline-sm text-base text-on-surface font-bold">
                  Master Asset Vault (Direct CDN)
                </h2>
              </div>
              <span className="font-label-sm text-xs text-tertiary font-bold">AES-256 ENCRYPTED</span>
            </div>

            <div className="space-y-2">
              {[
                { name: 'Skyvillas_BIM_Master_IFC4.zip', size: '2.4 GB', type: 'Autodesk Revit & BIM', date: 'Yesterday' },
                { name: 'AuraCoast_8K_CinemaDNG_Grade.mov', size: '14.8 GB', type: 'ProRes 4444 XQ', date: '3 Days Ago' },
                { name: 'SolarGrid_Thermal_Thermography_Orthomosaic.tif', size: '6.1 GB', type: 'GeoTIFF 16-Bit', date: 'Oct 12' },
                { name: 'Artisan_Reserve_1000FPS_CleanMaster.mp4', size: '1.2 GB', type: 'H.265 Master', date: 'Oct 04' },
              ].map((file) => (
                <div
                  key={file.name}
                  className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high/40 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="material-symbols-outlined text-primary text-xl">folder_zip</span>
                    <div className="min-w-0">
                      <div className="font-body-sm text-xs font-semibold text-on-surface truncate">{file.name}</div>
                      <div className="font-label-sm text-[10px] text-outline">
                        {file.type} • {file.size} • {file.date}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast(`Starting secure high-speed download for ${file.name}`)}
                    className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-sm text-xs font-bold flex items-center gap-1 transition-colors shrink-0"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* API Key & Webhook Config */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-surface-container border border-surface-container-high/50 shadow-xl flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-secondary text-xl">key</span>
                <h2 className="font-headline-sm text-base text-on-surface font-bold">API &amp; Webhook Credentials</h2>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed mb-4">
                Use your organization master token to stream drone telemetry, sync GST invoice pipelines, or embed 3D spatial models.
              </p>

              <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high/40 space-y-2">
                <span className="font-label-sm text-[10px] text-outline uppercase font-bold">PRODUCTION API KEY</span>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-on-surface font-bold">
                    {apiKeyVisible ? 'i360_live_84f9011ab49c23ea9' : 'i360_live_••••••••••••••••'}
                  </span>
                  <button
                    onClick={() => setApiKeyVisible(!apiKeyVisible)}
                    className="text-xs text-primary hover:underline font-label-sm"
                  >
                    {apiKeyVisible ? 'Hide' : 'Reveal'}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => showToast('API Token copied to clipboard!')}
                className="w-full py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-headline-sm text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">content_copy</span>
                <span>Copy Token</span>
              </button>
              <button
                onClick={() => showToast('Regenerating client secret...')}
                className="w-full py-2 rounded-lg text-outline hover:text-error font-label-sm text-xs transition-colors"
              >
                Rotate Secret Key
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
