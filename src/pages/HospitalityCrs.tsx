import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface HospitalityCrsProps {
  setCurrentPage: (page: string) => void;
}

export const HospitalityCrs: React.FC<HospitalityCrsProps> = ({ setCurrentPage }) => {
  const { addToCart, showToast } = useCart();

  const [currentRoom, setCurrentRoom] = useState<'suite' | 'penthouse'>('suite');
  const [isStopSell, setIsStopSell] = useState(false);
  const [currentSurge, setCurrentSurge] = useState(15);
  const [syncing, setSyncing] = useState(false);
  const [logTime, setLogTime] = useState('14:22:08 UTC');
  const [logText, setLogText] = useState(
    '[OK] Booking.com Reservation #BD-9824 acknowledged -> Inventory auto-decremented across 45 connected channels in 164ms.'
  );

  const roomData = {
    suite: { name: 'Deluxe Ocean Suite', basePrice: 340, inventory: 8 },
    penthouse: { name: 'Executive Villa', basePrice: 620, inventory: 3 },
  };

  const calculatedPrice = Math.round(roomData[currentRoom].basePrice * (1 + currentSurge / 100));
  const activeInv = isStopSell ? 0 : roomData[currentRoom].inventory;
  const priceDisplay = isStopSell ? 'STOP SELL' : `$${calculatedPrice}`;

  const handlePushSync = () => {
    setSyncing(true);
    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + ' UTC';
      setLogTime(timeStr);
      setSyncing(false);
      setLogText(
        `[${timeStr}] SYNC DISPATCH: ${roomData[currentRoom].name} rate adjusted to $${calculatedPrice} across 45 channels in 142ms. Zero error packets.`
      );
      showToast('2-Way OTA Webhook Sync Dispatched to all 45+ OTAs!');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Telemetry Ribbon */}
      <section className="w-full bg-surface-container-lowest px-4 sm:px-6 lg:px-8 py-2.5 border-b border-surface-container-high/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-label-sm">
          <div className="flex items-center gap-2 text-primary font-bold">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span>HOSPITALITY CLOUD SUITE // CRS &amp; OTA GATEWAY v4.6 LIVE</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-on-surface-variant">
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface">
              2-Way Sync: <strong className="text-tertiary">&lt;180ms</strong>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface">
              Connected: <strong className="text-primary">45+ OTAs</strong>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface">
              Direct Commission: <strong className="text-secondary">0.00%</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="w-full relative px-4 sm:px-6 lg:px-8 py-12 lg:py-20 bg-gradient-to-b from-surface via-surface-container-low to-surface border-b border-surface-container-high/30">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high font-label-sm text-xs text-primary mb-4 border border-surface-container-highest">
            <span className="material-symbols-outlined text-sm">hotel</span>
            <span>NEXT-GEN CENTRAL RESERVATION ARCHITECTURE</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl max-w-5xl text-on-surface mb-4 font-extrabold leading-tight">
            Autonomous Hotel Channel Manager &amp; Direct Booking Engine.
          </h1>

          <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-3xl mb-8 leading-relaxed">
            Eliminate overbookings with sub-second bi-directional OTA inventory sync across Booking.com, Airbnb, Expedia, Agoda, and MakeMyTrip. Power your direct guest acquisitions with zero-commission booking widgets and real-time AI yield rate shopping.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              onClick={() => {
                addToCart('Imagine360 Channel Manager CRS License', '$120/mo', 'Hospitality SaaS');
                setCurrentPage('book-online');
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary font-body-md text-xs sm:text-sm font-semibold text-on-primary shadow-xl hover:bg-primary-fixed transition-all"
            >
              <span className="material-symbols-outlined text-base">rocket_launch</span>
              <span>Deploy Live Sandbox</span>
            </button>
            <button
              onClick={() => showToast('Hotel Architecture Walkthrough scheduled')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-high font-body-md text-xs sm:text-sm font-semibold text-on-surface shadow-md hover:bg-surface-container-highest transition-colors border border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-base text-primary">calendar_month</span>
              <span>Schedule Hotel Architecture Demo</span>
            </button>
          </div>

          {/* KPI Metrics Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface-container-lowest p-4 rounded-xl shadow-lg border border-surface-container-high/40">
            <div className="flex flex-col items-center justify-center p-3 text-center">
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase mb-1">OTA Sync Latency</span>
              <span className="font-headline-md text-xl sm:text-2xl text-primary font-bold">&lt; 180ms</span>
              <span className="text-xs text-tertiary flex items-center gap-1 mt-0.5">Instant Push</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 text-center">
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase mb-1">Overbooking Rate</span>
              <span className="font-headline-md text-xl sm:text-2xl text-tertiary font-bold">0.00%</span>
              <span className="text-xs text-on-surface-variant mt-0.5">Guaranteed SLA</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 text-center">
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase mb-1">Direct Booking Lift</span>
              <span className="font-headline-md text-xl sm:text-2xl text-secondary font-bold">+38.4%</span>
              <span className="text-xs text-on-surface-variant mt-0.5">Portfolio Average</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 text-center">
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase mb-1">Global Coverage</span>
              <span className="font-headline-md text-xl sm:text-2xl text-on-surface font-bold">45+ Channels</span>
              <span className="text-xs text-primary mt-0.5">2-Way API Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 font-label-sm text-xs text-primary uppercase mb-1 font-bold">
                <span className="material-symbols-outlined text-base">dashboard_customize</span>
                <span>Interactive Simulator</span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">
                Live Central Reservation &amp; Multi-OTA Console
              </h2>
            </div>
            <div className="font-label-sm text-xs text-on-surface-variant flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
              <span>NODE-CRS-MUMBAI-04 ACTIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Inventory Controller */}
            <div className="lg:col-span-5 bg-surface-container rounded-xl p-6 shadow-xl flex flex-col justify-between gap-6 border border-surface-container-high/40">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
                  <span className="font-headline-sm text-sm text-on-surface font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">tune</span>
                    Inventory &amp; Rate Controller
                  </span>
                  <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-primary font-bold">
                    2-WAY MASTER
                  </span>
                </div>

                {/* Property selector */}
                <div className="space-y-1">
                  <label className="font-label-sm text-[11px] text-on-surface-variant uppercase">
                    Active Property Profile
                  </label>
                  <div className="w-full p-3 bg-surface-container-high rounded-lg flex items-center justify-between border border-surface-container-highest">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-base">villa</span>
                      <span className="font-body-md text-xs text-on-surface font-semibold">
                        Aura Grand Resort &amp; Spa (Goa)
                      </span>
                    </div>
                    <span className="font-label-sm text-[10px] text-tertiary font-bold">ONLINE</span>
                  </div>
                </div>

                {/* Room Selector */}
                <div className="space-y-1">
                  <label className="font-label-sm text-[11px] text-on-surface-variant uppercase">
                    Room Category &amp; Allocation
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentRoom('suite')}
                      className={`p-3 rounded-lg text-left transition-all border ${
                        currentRoom === 'suite'
                          ? 'bg-surface-container-highest border-primary/50 shadow-sm'
                          : 'bg-surface-container-high opacity-60 hover:opacity-100 border-transparent'
                      }`}
                    >
                      <div className="font-body-sm text-xs font-semibold text-primary">Deluxe Ocean Suite</div>
                      <div className="font-label-sm text-[10px] text-on-surface mt-0.5">
                        $340/night • <span className="text-tertiary font-bold">8 rooms left</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentRoom('penthouse')}
                      className={`p-3 rounded-lg text-left transition-all border ${
                        currentRoom === 'penthouse'
                          ? 'bg-surface-container-highest border-primary/50 shadow-sm'
                          : 'bg-surface-container-high opacity-60 hover:opacity-100 border-transparent'
                      }`}
                    >
                      <div className="font-body-sm text-xs font-semibold text-on-surface">Executive Villa</div>
                      <div className="font-label-sm text-[10px] text-on-surface-variant mt-0.5">
                        $620/night • 3 rooms left
                      </div>
                    </button>
                  </div>
                </div>

                {/* Rate Surge Slider */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-label-sm text-on-surface-variant">Bulk Rate Surge (High Season)</label>
                    <span className="font-label-md text-secondary font-bold">+{currentSurge}% (${calculatedPrice})</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    value={currentSurge}
                    onChange={(e) => setCurrentSurge(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-surface-container-highest h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Stop sell toggle */}
                <div className="p-3 bg-surface-container-high rounded-lg flex items-center justify-between border border-surface-container-highest">
                  <div>
                    <div className="font-body-sm text-xs font-medium text-on-surface">Stop Sell (CTA)</div>
                    <div className="font-label-sm text-[10px] text-on-surface-variant">Instant Blackout</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsStopSell(!isStopSell)}
                    className={`w-11 h-6 rounded-full p-1 flex items-center transition-colors ${
                      isStopSell ? 'bg-error-container justify-end' : 'bg-surface-container-highest justify-start'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${isStopSell ? 'bg-error' : 'bg-outline'}`}></div>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePushSync}
                disabled={syncing}
                className="w-full py-3.5 px-4 rounded-lg bg-primary hover:bg-primary-container font-body-md text-xs font-bold text-on-primary shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-base">
                  {syncing ? 'refresh' : 'bolt'}
                </span>
                <span>{syncing ? 'Transmitting Multi-OTA Webhook Cluster...' : 'Push 2-Way Sync to All 45+ Channels'}</span>
              </button>
            </div>

            {/* Right: Channels Telemetry */}
            <div className="lg:col-span-7 bg-surface-container rounded-xl p-6 shadow-xl flex flex-col justify-between border border-surface-container-high/40">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-container-high/40">
                  <div>
                    <h3 className="font-headline-sm text-sm text-on-surface font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary text-base">cloud_sync</span>
                      Live 2-Way Channel Gateway Telemetry
                    </h3>
                    <span className="font-label-sm text-[10px] text-on-surface-variant">
                      Real-time bi-directional webhook transmission matrix
                    </span>
                  </div>
                  <span className="font-label-sm text-[10px] px-2.5 py-1 rounded-full bg-tertiary-container/30 text-tertiary font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> ZERO DESYNC
                  </span>
                </div>

                {/* Channel List */}
                <div className="space-y-2">
                  <div className="p-3 bg-surface-container-high rounded-lg flex items-center justify-between border border-surface-container-highest">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-sm">home_work</span>
                      </div>
                      <div>
                        <div className="font-body-md text-xs text-on-surface font-semibold flex items-center gap-2">
                          Imagine360 Direct Web &amp; Mobile CRS
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-secondary-container text-secondary">
                            0% COMM
                          </span>
                        </div>
                        <div className="font-label-sm text-[10px] text-on-surface-variant">Primary Channel</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-label-md text-xs text-tertiary font-bold">0ms (Local)</div>
                      <div className="font-label-sm text-[10px] text-on-surface font-mono">
                        {activeInv} Rooms • {priceDisplay}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-surface-container-high rounded-lg flex items-center justify-between border border-surface-container-highest">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-on-surface font-bold text-xs">
                        B.
                      </div>
                      <div>
                        <div className="font-body-md text-xs text-on-surface font-medium">Booking.com Premier Partner</div>
                        <div className="font-label-sm text-[10px] text-on-surface-variant">Content, ARI &amp; Reservations Sync</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-label-md text-xs text-primary font-bold">142ms</div>
                      <div className="font-label-sm text-[10px] text-on-surface-variant font-mono">
                        {isStopSell ? 'STOPPED' : 'Synced'} • {activeInv} Rooms ({priceDisplay})
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-surface-container-high rounded-lg flex items-center justify-between border border-surface-container-highest">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-on-surface font-bold text-xs">
                        Ab
                      </div>
                      <div>
                        <div className="font-body-md text-xs text-on-surface font-medium">Airbnb Direct XML/JSON API</div>
                        <div className="font-label-sm text-[10px] text-on-surface-variant">Instant Book &amp; Calendar Locking</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-label-md text-xs text-primary font-bold">165ms</div>
                      <div className="font-label-sm text-[10px] text-on-surface-variant font-mono">
                        {isStopSell ? 'LOCKED' : 'Synced'} • {activeInv} Rooms ({priceDisplay})
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-surface-container-high rounded-lg flex items-center justify-between border border-surface-container-highest">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-on-surface font-bold text-xs">
                        Ex
                      </div>
                      <div>
                        <div className="font-body-md text-xs text-on-surface font-medium">Expedia Partner Central</div>
                        <div className="font-label-sm text-[10px] text-on-surface-variant">Multi-Currency Rate Mapping</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-label-md text-xs text-primary font-bold">188ms</div>
                      <div className="font-label-sm text-[10px] text-on-surface-variant font-mono">
                        {isStopSell ? 'BLOCKED' : 'Synced'} • {activeInv} Rooms ({priceDisplay})
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Stream Ticker */}
              <div className="mt-4 p-3 bg-surface-container-lowest rounded-lg font-mono text-[11px] border border-surface-container-high/50">
                <div className="flex items-center justify-between text-on-surface-variant border-b border-surface-container-highest pb-1 mb-1">
                  <span className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-xs">terminal</span> REAL-TIME RECONCILIATION LOG
                  </span>
                  <span className="text-on-surface-variant font-mono">{logTime}</span>
                </div>
                <p className="text-tertiary leading-relaxed">{logText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-surface-container-lowest border-t border-surface-container-high/30">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
            <span className="font-label-sm text-xs text-tertiary uppercase font-bold tracking-wider">
              PREDICTABLE INFRASTRUCTURE
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">
              Transparent, Value-Engineered Pricing Tiers
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant">
              No hidden transaction fees. No percentage commissions on your hard-earned guest reservations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="p-6 bg-surface-container rounded-xl shadow-lg flex flex-col justify-between border border-surface-container-high/40">
              <div>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">
                  Boutique &amp; Homestays
                </span>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="font-headline-lg text-3xl text-on-surface font-extrabold">₹1,999</span>
                  <span className="text-xs text-on-surface-variant">/ month</span>
                </div>
                <ul className="space-y-2 text-xs font-body-sm text-on-surface">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-xs">check</span> Up to 15 Rooms / Keys</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-xs">check</span> Unlimited 2-Way OTA Channel Sync</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-xs">check</span> Direct Booking Engine (0% Commission)</li>
                </ul>
              </div>
              <button
                onClick={() => {
                  addToCart('Boutique Hospitality CRS License', '₹1,999/mo', 'Hospitality SaaS');
                  setCurrentPage('book-online');
                }}
                className="mt-6 w-full py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-xs transition-colors"
              >
                Deploy Boutique Tier
              </button>
            </div>

            <div className="p-6 bg-surface-container-high rounded-xl shadow-2xl flex flex-col justify-between relative border border-primary/50">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary font-label-sm text-[10px] text-on-primary font-bold shadow-md uppercase">
                MOST RECOMMENDED FOR RESORTS
              </div>
              <div className="pt-2">
                <span className="font-label-sm text-[10px] text-primary uppercase font-bold">Hotels &amp; Resorts</span>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="font-headline-lg text-3xl text-primary font-extrabold">₹4,499</span>
                  <span className="text-xs text-on-surface-variant">/ month</span>
                </div>
                <ul className="space-y-2 text-xs font-body-sm text-on-surface">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> Up to 60 Rooms / Keys</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> All 45+ OTA Channels Bi-Directional</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> Automated AI Rate Shopper</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> Native 360° Virtual Tour Player</li>
                </ul>
              </div>
              <button
                onClick={() => {
                  addToCart('Hotels & Resorts CRS License', '₹4,499/mo', 'Hospitality SaaS');
                  setCurrentPage('book-online');
                }}
                className="mt-6 w-full py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-lg transition-all"
              >
                Activate Resort License
              </button>
            </div>

            <div className="p-6 bg-surface-container rounded-xl shadow-lg flex flex-col justify-between border border-surface-container-high/40">
              <div>
                <span className="font-label-sm text-[10px] text-secondary uppercase font-bold">
                  Hotel Chains &amp; Groups
                </span>
                <div className="flex items-baseline gap-1 my-3">
                  <span className="font-headline-lg text-3xl text-secondary font-extrabold">Custom Scale</span>
                </div>
                <ul className="space-y-2 text-xs font-body-sm text-on-surface">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-xs">check</span> Unlimited Properties &amp; Rooms</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-xs">check</span> Dedicated Single-Tenant CRS Cluster</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-xs">check</span> Custom Opera / Protel / Infor Webhooks</li>
                </ul>
              </div>
              <button
                onClick={() => {
                  showToast('Enterprise Hospitality scoping request recorded');
                }}
                className="mt-6 w-full py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-xs transition-colors"
              >
                Talk to Enterprise Architects
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
