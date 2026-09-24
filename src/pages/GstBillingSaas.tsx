import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface GstBillingSaasProps {
  setCurrentPage: (page: string) => void;
}

export const GstBillingSaas: React.FC<GstBillingSaasProps> = ({ setCurrentPage }) => {
  const { addToCart, showToast } = useCart();

  // Simulator State
  const [selectedClientKey, setSelectedClientKey] = useState('mh');
  const [isInterState, setIsInterState] = useState(false);
  const [item1Qty, setItem1Qty] = useState(1);
  const [item1Rate, setItem1Rate] = useState(45000);
  const [item2Qty, setItem2Qty] = useState(1);
  const [item2Rate, setItem2Rate] = useState(28000);
  const [activeDocTab, setActiveDocTab] = useState<'standard' | 'eway' | 'thermal'>('standard');
  const [irnHash, setIrnHash] = useState('e4b29c94892c90fa189c490efba12389104fae109d73');
  const [isGenerating, setIsGenerating] = useState(false);

  const clients = {
    mh: {
      name: 'Horizon Apex Towers Pvt Ltd',
      gstin: '27AABCH1234F1Z8',
      pos: '27-MAHARASHTRA',
      inter: false,
    },
    dl: {
      name: 'Quantum Spatial Logistics LLP',
      gstin: '07AACQ5678K1ZQ',
      pos: '07-DELHI',
      inter: true,
    },
    ka: {
      name: 'OmniRetail Global Ventures',
      gstin: '29AABCO9012L1ZV',
      pos: '29-KARNATAKA',
      inter: true,
    },
  };

  const handleClientChange = (val: string) => {
    setSelectedClientKey(val);
    const c = clients[val as keyof typeof clients];
    setIsInterState(c.inter);
  };

  // Calculations
  const tot1 = Math.max(0, item1Qty) * Math.max(0, item1Rate);
  const tot2 = Math.max(0, item2Qty) * Math.max(0, item2Rate);
  const subtotal = tot1 + tot2;

  const cgst = isInterState ? 0 : subtotal * 0.09;
  const sgst = isInterState ? 0 : subtotal * 0.09;
  const igst = isInterState ? subtotal * 0.18 : 0;
  const totalPayable = subtotal + cgst + sgst + igst;

  const handleGenerateIrn = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const hex = Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setIrnHash(hex);
      setIsGenerating(false);
      showToast('IRN Generated & Pushed to NIC Portal (200 OK)');
    }, 600);
  };

  const client = clients[selectedClientKey as keyof typeof clients];

  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Telemetry & Trust Ribbon */}
      <section className="w-full bg-surface-container-lowest px-4 sm:px-6 lg:px-8 py-2.5 border-b border-surface-container-high/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-label-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-tertiary">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
              <span className="font-semibold tracking-wide">NIC IRP GATEWAY: 14ms (ONLINE)</span>
            </div>
            <span className="text-outline-variant">/</span>
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
              <span>GSTN GSP CONNECTED (PROD-01)</span>
            </div>
            <span className="text-outline-variant hidden sm:inline">/</span>
            <div className="hidden sm:flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-secondary">lock</span>
              <span>ISO 27001 &amp; SOC-2 TYPE II AUDITED</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-on-surface-variant">
            <span className="text-primary font-bold">₹482.4M+</span>
            <span>Invoiced This Month</span>
            <span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-bold">
              v3.4.8-RELEASE
            </span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative w-full bg-surface-container-low px-4 sm:px-6 lg:px-8 py-12 lg:py-20 overflow-hidden border-b border-surface-container-high/40">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[840px] h-[360px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col gap-10 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-xs border border-surface-container-highest">
                <span className="material-symbols-outlined text-sm text-primary">bolt</span>
                <span>NEXT-GEN FINSCALE ENTERPRISE SAAS</span>
                <span className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-secondary text-[10px] font-bold">
                  NIC APPROVED
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight font-extrabold leading-tight">
                Autonomous{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed to-secondary">
                  GST Billing
                </span>
                , E-Invoicing &amp; Multi-Store Engine.
              </h1>
              <p className="font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Direct government sandbox connectivity with sub-second IRN allocation, automated E-Way bills, multi-godown real-time stock sync, and automated GSTR-1, 2B, and 3B input tax credit reconciliation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="#simulator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-on-primary font-headline-sm text-xs sm:text-sm font-bold shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                <span className="material-symbols-outlined text-lg">play_circle</span>
                <span>Test Live Sandbox</span>
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-high text-on-surface font-body-md text-xs sm:text-sm hover:bg-surface-container-highest transition-all border border-surface-container-highest"
              >
                <span className="material-symbols-outlined text-base text-primary">calendar_month</span>
                <span>Schedule Enterprise Pilot</span>
              </a>
            </div>
          </div>

          {/* Trust Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-md flex flex-col gap-1 border border-surface-container-high/40">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-[11px] uppercase">
                <span>E-Invoice Speed</span>
                <span className="material-symbols-outlined text-primary text-base">speed</span>
              </div>
              <div className="font-headline-lg text-xl sm:text-2xl text-on-surface font-bold">&lt; 380ms</div>
              <p className="font-body-sm text-[11px] text-on-surface-variant">Direct API to Govt IRP portal</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-md flex flex-col gap-1 border border-surface-container-high/40">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-[11px] uppercase">
                <span>Tax Reconciliation</span>
                <span className="material-symbols-outlined text-tertiary text-base">fact_check</span>
              </div>
              <div className="font-headline-lg text-xl sm:text-2xl text-on-surface font-bold">100% ITC</div>
              <p className="font-body-sm text-[11px] text-on-surface-variant">Zero credit leakage vs GSTR-2B</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-md flex flex-col gap-1 border border-surface-container-high/40">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-[11px] uppercase">
                <span>POS Transaction Rate</span>
                <span className="material-symbols-outlined text-secondary text-base">point_of_sale</span>
              </div>
              <div className="font-headline-lg text-xl sm:text-2xl text-on-surface font-bold">12,000/s</div>
              <p className="font-body-sm text-[11px] text-on-surface-variant">Offline-first edge architecture</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-md flex flex-col gap-1 border border-surface-container-high/40">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-[11px] uppercase">
                <span>Platform SLA</span>
                <span className="material-symbols-outlined text-primary text-base">verified</span>
              </div>
              <div className="font-headline-lg text-xl sm:text-2xl text-on-surface font-bold">99.995%</div>
              <p className="font-body-sm text-[11px] text-on-surface-variant">Fault-tolerant distributed nodes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Simulator Section */}
      <section className="w-full bg-surface-container px-4 sm:px-6 lg:px-8 py-16" id="simulator">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-label-sm text-xs mb-1 uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-sm">terminal</span>
                <span>Interactive Simulator</span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">
                Test Drive the GST Engine Right Now
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant">
                Configure line items, calculate real-time taxes, and generate valid e-invoices with simulated NIC hash codes.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-lg text-xs font-label-sm text-tertiary border border-surface-container-high">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span>SANDBOX MODE: SIMULATOR V4.2 ACTIVE</span>
            </div>
          </div>

          {/* Simulator Console Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-surface-container-lowest p-4 sm:p-6 rounded-2xl shadow-2xl border border-surface-container-high/50">
            {/* Left: Input Console */}
            <div className="lg:col-span-6 flex flex-col gap-4 bg-surface-container-low p-5 rounded-xl border border-surface-container-high/50">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/40">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-error inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-tertiary inline-block"></span>
                  <span className="font-label-sm text-xs text-on-surface-variant ml-2 uppercase font-semibold">
                    Invoice Builder Console
                  </span>
                </div>
                <span className="font-label-sm text-xs text-primary font-bold">DOC: INV-2025-0894</span>
              </div>

              {/* Recipient */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-xs text-on-surface-variant uppercase">
                  Billed Recipient / Client Entity
                </label>
                <select
                  value={selectedClientKey}
                  onChange={(e) => handleClientChange(e.target.value)}
                  className="w-full bg-surface-container-high text-on-surface px-3 py-2 rounded-lg font-body-sm text-xs focus:outline-none border border-surface-container-highest"
                >
                  <option value="mh">Horizon Apex Towers Pvt Ltd (GSTIN: 27AABCH1234F1Z8 - Maharashtra)</option>
                  <option value="dl">Quantum Spatial Logistics LLP (GSTIN: 07AACQ5678K1ZQ - Delhi)</option>
                  <option value="ka">OmniRetail Global Ventures (GSTIN: 29AABCO9012L1ZV - Karnataka)</option>
                </select>
              </div>

              {/* Supply Type */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsInterState(false)}
                  className={`px-3 py-2 rounded-lg font-label-sm text-xs flex items-center justify-center gap-1.5 transition-colors ${
                    !isInterState
                      ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">home_work</span>
                  <span>Intra-State (CGST + SGST)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsInterState(true)}
                  className={`px-3 py-2 rounded-lg font-label-sm text-xs flex items-center justify-center gap-1.5 transition-colors ${
                    isInterState
                      ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">flight</span>
                  <span>Inter-State (IGST 18%)</span>
                </button>
              </div>

              {/* Line items */}
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-surface-container flex items-center justify-between gap-2 border border-surface-container-high/40">
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-xs text-on-surface font-semibold">
                      3D Architectural Walkthrough
                    </span>
                    <span className="font-label-sm text-[10px] text-primary">SAC 998315 • 18% Tax</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <input
                      type="number"
                      min={0}
                      value={item1Qty}
                      onChange={(e) => setItem1Qty(Number(e.target.value))}
                      className="w-12 bg-surface-container-high text-center text-on-surface rounded p-1 font-mono text-xs border border-surface-container-highest"
                    />
                    <span className="text-on-surface-variant">x ₹</span>
                    <input
                      type="number"
                      value={item1Rate}
                      onChange={(e) => setItem1Rate(Number(e.target.value))}
                      className="w-20 bg-surface-container-high text-right text-on-surface rounded p-1 font-mono text-xs border border-surface-container-highest"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-surface-container flex items-center justify-between gap-2 border border-surface-container-high/40">
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-xs text-on-surface font-semibold">
                      Drone LiDAR Cadastral Survey
                    </span>
                    <span className="font-label-sm text-[10px] text-primary">SAC 998719 • 18% Tax</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <input
                      type="number"
                      min={0}
                      value={item2Qty}
                      onChange={(e) => setItem2Qty(Number(e.target.value))}
                      className="w-12 bg-surface-container-high text-center text-on-surface rounded p-1 font-mono text-xs border border-surface-container-highest"
                    />
                    <span className="text-on-surface-variant">x ₹</span>
                    <input
                      type="number"
                      value={item2Rate}
                      onChange={(e) => setItem2Rate(Number(e.target.value))}
                      className="w-20 bg-surface-container-high text-right text-on-surface rounded p-1 font-mono text-xs border border-surface-container-highest"
                    />
                  </div>
                </div>
              </div>

              {/* Tax Calculations Readout */}
              <div className="p-4 rounded-xl bg-surface-container-highest flex flex-col gap-1.5 text-xs">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Taxable Subtotal:</span>
                  <span className="font-mono text-on-surface font-bold">
                    ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                {!isInterState ? (
                  <>
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Central GST (CGST @ 9%):</span>
                      <span className="font-mono text-on-surface">
                        ₹{cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-on-surface-variant">
                      <span>State GST (SGST @ 9%):</span>
                      <span className="font-mono text-on-surface">
                        ₹{sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Integrated GST (IGST @ 18%):</span>
                    <span className="font-mono text-on-surface">
                      ₹{igst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-on-surface pt-2 border-t border-surface-container font-bold">
                  <span>Total Invoice Payable:</span>
                  <span className="text-primary font-mono font-extrabold">
                    ₹{totalPayable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerateIrn}
                disabled={isGenerating}
                className="w-full py-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-base">
                  {isGenerating ? 'refresh' : 'qr_code_2'}
                </span>
                <span>{isGenerating ? 'Dispatching to NIC Gateway...' : '1-Click Dispatch: Push to NIC IRP'}</span>
              </button>
            </div>

            {/* Right: Live Rendered Invoice Document Preview */}
            <div className="lg:col-span-6 flex flex-col gap-4 bg-surface-container-low p-5 rounded-xl border border-surface-container-high/50">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex p-1 rounded-lg bg-surface-container-high">
                  <button
                    onClick={() => setActiveDocTab('standard')}
                    className={`px-3 py-1 rounded-md font-label-sm text-xs font-bold transition-colors ${
                      activeDocTab === 'standard' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    GST Invoice
                  </button>
                  <button
                    onClick={() => setActiveDocTab('eway')}
                    className={`px-3 py-1 rounded-md font-label-sm text-xs font-bold transition-colors ${
                      activeDocTab === 'eway' ? 'bg-secondary text-on-secondary' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    E-Way Bill
                  </button>
                  <button
                    onClick={() => setActiveDocTab('thermal')}
                    className={`px-3 py-1 rounded-md font-label-sm text-xs font-bold transition-colors ${
                      activeDocTab === 'thermal' ? 'bg-tertiary text-on-tertiary' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Thermal POS
                  </button>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-[11px] flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  IRN CONFIRMED
                </span>
              </div>

              {/* Document Display Box */}
              <div className="p-4 rounded-xl bg-surface-container-lowest font-body-sm text-xs text-on-surface shadow-inner flex flex-col gap-3 min-h-[340px] border border-surface-container-high/50">
                <div className="flex justify-between items-start pb-2 border-b border-surface-container-high">
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-on-surface uppercase">
                      IMAGINE360 ENTERPRISE TECH PRIVATE LIMITED
                    </span>
                    <span className="font-label-sm text-[10px] text-outline">
                      GSTIN: 27AAACI7894M1ZY • MAHARASHTRA (27)
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-surface-container-high rounded p-1 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-2xl">qr_code_2</span>
                  </div>
                </div>

                {/* IRN hash display */}
                <div className="p-2 rounded bg-surface-container-high flex flex-col gap-1 font-label-sm text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant uppercase font-semibold">GOVT IRN:</span>
                    <span className="text-tertiary truncate max-w-[260px] font-mono">{irnHash}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Ack No: <strong className="text-on-surface font-mono">1120251992038</strong></span>
                    <span>Place of Supply: <strong className="text-primary font-mono">{client.pos}</strong></span>
                  </div>
                </div>

                <div className="flex justify-between text-[11px] py-1 border-b border-surface-container-high/40">
                  <div className="flex flex-col">
                    <span className="text-outline uppercase text-[9px]">Billed To:</span>
                    <span className="font-semibold text-on-surface">{client.name}</span>
                    <span className="font-label-sm text-outline font-mono text-[10px]">{client.gstin}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-on-surface">
                    <span>3D Walkthrough ({item1Qty}x)</span>
                    <span className="font-mono">₹{tot1.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-on-surface">
                    <span>LiDAR Drone Inspection ({item2Qty}x)</span>
                    <span className="font-mono">₹{tot2.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="mt-auto pt-2 flex justify-between items-center bg-surface-container p-2.5 rounded-lg border border-surface-container-high/50">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-tertiary text-sm">check_circle</span>
                    <span className="font-label-sm text-[10px] text-tertiary font-bold">NIC SIGNED</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-on-surface-variant mr-2">Grand Total:</span>
                    <span className="font-headline-sm text-sm text-primary font-bold font-mono">
                      ₹{totalPayable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-[11px] px-1">
                <span className="flex items-center gap-1 text-tertiary">
                  <span className="material-symbols-outlined text-sm">cloud_done</span>
                  Synced with E-Way Bill Portal &amp; GSTN
                </span>
                <button
                  onClick={() => showToast('Invoice JSON export generated')}
                  className="hover:text-primary transition-colors flex items-center gap-1 font-bold"
                >
                  <span className="material-symbols-outlined text-xs">download</span> JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="w-full bg-surface-container-low px-4 sm:px-6 lg:px-8 py-16" id="pricing">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
            <span className="font-label-sm text-xs text-primary uppercase tracking-widest font-bold">
              Predictable Investment
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">
              Transparent Subscriptions. Zero Hidden Friction.
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant">
              All tiers include unlimited GST updates, government compliance patches, and bank-grade data encryption.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Starter */}
            <div className="p-6 rounded-2xl bg-surface-container flex flex-col gap-4 shadow-md border border-surface-container-high/40">
              <span className="font-label-sm text-xs text-on-surface-variant uppercase font-bold">Starter Retail</span>
              <div className="flex items-baseline gap-1 my-2">
                <span className="font-display text-3xl text-on-surface font-extrabold">₹499</span>
                <span className="text-xs text-on-surface-variant">/ month</span>
              </div>
              <ul className="space-y-2 text-xs font-body-sm text-on-surface-variant">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> Up to 1,000 Invoices / mo</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> POS Fast Thermal Billing</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> 1 Godown / Store Location</li>
              </ul>
              <button
                onClick={() => {
                  addToCart('GST SaaS Starter Retail License', '₹499/mo', 'SaaS Platform');
                  setCurrentPage('book-online');
                }}
                className="mt-auto w-full py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-headline-sm text-xs font-bold transition-all"
              >
                Start 14-Day Trial
              </button>
            </div>

            {/* Business Pro */}
            <div className="relative p-6 rounded-2xl bg-surface-container-lowest flex flex-col gap-4 shadow-2xl border border-primary/50">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-[10px] font-bold shadow-md">
                RECOMMENDED • TRADERS &amp; AGENCIES
              </div>
              <span className="font-label-sm text-xs text-primary uppercase font-bold mt-1">Business Pro</span>
              <div className="flex items-baseline gap-1 my-2">
                <span className="font-display text-3xl text-primary font-extrabold">₹1,299</span>
                <span className="text-xs text-on-surface-variant">/ month</span>
              </div>
              <ul className="space-y-2 text-xs font-body-sm text-on-surface">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-xs">check</span> Unlimited Invoices &amp; Quotations</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-xs">check</span> Direct E-Invoice &amp; E-Way Bill API</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-xs">check</span> Up to 5 Warehouses / Branches</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-xs">check</span> GSTR-2B Reconciliation Radar</li>
              </ul>
              <button
                onClick={() => {
                  addToCart('GST SaaS Business Pro License', '₹1,299/mo', 'SaaS Platform');
                  setCurrentPage('book-online');
                }}
                className="mt-auto w-full py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-xs font-bold transition-all shadow-md"
              >
                Deploy Business Pro
              </button>
            </div>

            {/* Enterprise */}
            <div className="p-6 rounded-2xl bg-surface-container flex flex-col gap-4 shadow-md border border-surface-container-high/40">
              <span className="font-label-sm text-xs text-secondary uppercase font-bold">Enterprise Unlimited</span>
              <div className="flex items-baseline gap-1 my-2">
                <span className="font-display text-3xl text-on-surface font-extrabold">₹3,499</span>
                <span className="text-xs text-on-surface-variant">/ month</span>
              </div>
              <ul className="space-y-2 text-xs font-body-sm text-on-surface-variant">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-xs">check</span> Unlimited Warehouses &amp; Users</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-xs">check</span> Dedicated High-Speed NIC Pipe</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-xs">check</span> REST API &amp; Webhooks Integration</li>
              </ul>
              <button
                onClick={() => {
                  addToCart('GST SaaS Enterprise Cluster License', '₹3,499/mo', 'SaaS Platform');
                  setCurrentPage('book-online');
                }}
                className="mt-auto w-full py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-headline-sm text-xs font-bold transition-all"
              >
                Talk to Solutions Architect
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
