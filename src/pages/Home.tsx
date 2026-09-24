import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  const { addToCart } = useCart();
  const [portfolioTab, setPortfolioTab] = useState<'all' | '3d' | 'drone' | 'saas'>('all');

  // Interactive dynamic estimation calculator
  const [capability, setCapability] = useState<'visual' | 'drone' | 'commercial' | 'saas'>('visual');
  const [scaleSlider, setScaleSlider] = useState<number>(1);
  const [reserveText, setReserveText] = useState('Instant Lock');

  const baseRates = {
    visual: [2400, 5800, 14000],
    drone: [1800, 4200, 9500],
    commercial: [3200, 7500, 18500],
    saas: [850, 2200, 6800],
  };

  const tierNames = ['Standard Tier', 'Enterprise Expansion', 'Full Autonomous Fleet'];
  const currentCost = baseRates[capability][scaleSlider - 1];

  const handleInstantLock = () => {
    setReserveText('Allocated ✓');
    addToCart(
      `${capability.toUpperCase()} - ${tierNames[scaleSlider - 1]}`,
      `$${currentCost.toLocaleString()}`,
      'Direct Allocation',
      'Instant Lock'
    );
    setTimeout(() => {
      setReserveText('Instant Lock');
    }, 2500);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-surface-container-lowest -mt-20 pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(76,215,246,0.18),transparent_70%)] pointer-events-none"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-tertiary/10 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high mb-6 shadow-sm border border-surface-container-highest">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="font-label-sm text-xs uppercase tracking-widest text-primary font-semibold">
              Imagine360tours Operational Matrix // V4.2
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl max-w-5xl tracking-tight text-on-surface mb-6 font-extrabold leading-tight">
            Where Hyper-Real Creative Meets{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed to-secondary">
              High-Precision Tech
            </span>
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-3xl mb-8 leading-relaxed">
            From cinematic 4K drone cinematography and photorealistic 3D VR renders to GST billing SaaS and hospitality booking engines. Engineered for uncompromising enterprise scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-12">
            <button
              onClick={() => setCurrentPage('services')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-on-primary font-body-md text-sm font-bold shadow-xl hover:bg-primary-fixed transition-all"
            >
              <span>Explore All Services</span>
              <span className="material-symbols-outlined text-lg">arrow_downward</span>
            </button>
            <button
              onClick={() => setCurrentPage('book-online')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-md text-sm font-semibold transition-all border border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-primary text-lg">calendar_today</span>
              <span>Book Discovery Session</span>
            </button>
          </div>

          {/* Verified Enterprise Proof Strip */}
          <div className="w-full bg-surface-container-low/60 backdrop-blur-xl rounded-2xl p-6 shadow-md border border-surface-container-high/40">
            <p className="font-label-sm text-xs uppercase tracking-wider text-outline mb-4 font-semibold">
              Trusted by Global Operators &amp; Venture Ecosystems
            </p>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center justify-items-center opacity-85">
              <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-xs tracking-wider">
                <span className="material-symbols-outlined text-primary text-xl">domain</span> AURA LUX RESORTS
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-xs tracking-wider">
                <span className="material-symbols-outlined text-primary text-xl">architecture</span> KRONOS REALTY
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-xs tracking-wider">
                <span className="material-symbols-outlined text-primary text-xl">flight_takeoff</span> AEROFLEET GLOBAL
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-xs tracking-wider">
                <span className="material-symbols-outlined text-primary text-xl">account_balance</span> VALENCE CAPITAL
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-xs tracking-wider">
                <span className="material-symbols-outlined text-primary text-xl">hotel</span> IMAGINE360 HOSPITALITY
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-xs tracking-wider">
                <span className="material-symbols-outlined text-primary text-xl">factory</span> VERTEX INFRASTRUCTURE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Telemetry / Metrics Section */}
      <section className="w-full bg-surface-container-low py-12 px-4 sm:px-6 lg:px-8 border-y border-surface-container-high/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container p-6 rounded-xl shadow-md flex flex-col justify-between border border-surface-container-high/50">
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-sm text-xs uppercase text-outline">Execution Velocity</span>
                <span className="p-2 rounded-lg bg-surface-container-high text-primary">
                  <span className="material-symbols-outlined">schedule</span>
                </span>
              </div>
              <div>
                <div className="font-display text-4xl text-on-surface font-extrabold tracking-tight">99.4%</div>
                <div className="font-body-sm text-xs text-on-surface-variant mt-1">SLA Verified On-Time Delivery</div>
              </div>
              <div className="mt-4 w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full w-[99.4%]"></div>
              </div>
            </div>

            <div className="bg-surface-container p-6 rounded-xl shadow-md flex flex-col justify-between border border-surface-container-high/50">
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-sm text-xs uppercase text-outline">Flight Operations</span>
                <span className="p-2 rounded-lg bg-surface-container-high text-tertiary">
                  <span className="material-symbols-outlined">flight</span>
                </span>
              </div>
              <div>
                <div className="font-display text-4xl text-on-surface font-extrabold tracking-tight">450+</div>
                <div className="font-body-sm text-xs text-on-surface-variant mt-1">Regulated Drone Missions Flown</div>
              </div>
              <div className="mt-4 w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full rounded-full w-[88%]"></div>
              </div>
            </div>

            <div className="bg-surface-container p-6 rounded-xl shadow-md flex flex-col justify-between border border-surface-container-high/50">
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-sm text-xs uppercase text-outline">SaaS Cloud Throughput</span>
                <span className="p-2 rounded-lg bg-surface-container-high text-secondary">
                  <span className="material-symbols-outlined">receipt_long</span>
                </span>
              </div>
              <div>
                <div className="font-display text-4xl text-on-surface font-extrabold tracking-tight">12M+</div>
                <div className="font-body-sm text-xs text-on-surface-variant mt-1">Monthly Billing Events Computed</div>
              </div>
              <div className="mt-4 w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full w-[94%]"></div>
              </div>
            </div>

            <div className="bg-surface-container p-6 rounded-xl shadow-md flex flex-col justify-between border border-surface-container-high/50">
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-sm text-xs uppercase text-outline">Enterprise Quality Index</span>
                <span className="p-2 rounded-lg bg-surface-container-high text-primary-fixed">
                  <span className="material-symbols-outlined">star</span>
                </span>
              </div>
              <div>
                <div className="font-display text-4xl text-on-surface font-extrabold tracking-tight">4.9/5</div>
                <div className="font-body-sm text-xs text-on-surface-variant mt-1">Verified Audit Satisfaction</div>
              </div>
              <div className="mt-4 w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary-fixed h-full rounded-full w-[98%]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core 6-Pillar Interactive Service Matrix */}
      <section className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8 relative" id="services-matrix">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-label-md text-xs uppercase tracking-wider text-primary font-bold">
                System Capabilities
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface mt-1 font-bold">
                The 6-Pillar Modular Matrix
              </h2>
            </div>
            <p className="font-body-md text-sm text-on-surface-variant max-w-md">
              Synchronizing physical production with cloud computing. Select any module to preview production specs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pillar 1: 3D Visualization */}
            <div className="group bg-surface-container p-6 rounded-xl shadow-md hover:bg-surface-container-high transition-all flex flex-col justify-between border border-surface-container-high/50">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-sm text-xs text-primary px-2.5 py-1 rounded bg-surface-container-high font-mono">
                    PILLAR 01 // CGI
                  </span>
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
                    view_in_ar
                  </span>
                </div>
                <h3 className="font-headline-sm text-lg text-on-surface font-semibold mb-2">3D Visualization &amp; VR</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">
                  Photorealistic spatial engineering for architectural masterplans, luxury interiors, and immersive web 3D.
                </p>
                <ul className="space-y-2 mb-6 text-xs text-on-surface font-body-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> VR Architecture &amp; Real-Time Walkthroughs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> Photorealistic Raytraced Renders
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> 3D Schematic Floorplans &amp; CAD Assembly
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> 360° Spherical Panoramic Systems
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setCurrentPage('3d-visualization')}
                className="w-full py-2.5 rounded bg-surface-container-highest hover:bg-primary hover:text-on-primary text-center font-label-md text-xs uppercase tracking-wider text-on-surface transition-colors font-semibold"
              >
                Configure Render Pipeline
              </button>
            </div>

            {/* Pillar 2: Commercial & Media Shoots */}
            <div className="group bg-surface-container p-6 rounded-xl shadow-md hover:bg-surface-container-high transition-all flex flex-col justify-between border border-surface-container-high/50">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-sm text-xs text-secondary px-2.5 py-1 rounded bg-surface-container-high font-mono">
                    PILLAR 02 // PRODUCTION
                  </span>
                  <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">
                    video_camera_front
                  </span>
                </div>
                <h3 className="font-headline-sm text-lg text-on-surface font-semibold mb-2">Commercial &amp; Media Shoots</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">
                  Full-spectrum cinema-grade studio shoots, broadcast commercials, and high-impact corporate documentation.
                </p>
                <ul className="space-y-2 mb-6 text-xs text-on-surface font-body-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span> Brand Narrative &amp; Corporate Keynotes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span> Culinary F&amp;B &amp; Product Commercials
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span> Luxury Hospitality &amp; Real Estate Portfolios
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span> Automotive Motion &amp; High-Speed Rigging
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setCurrentPage('commercial-shoots')}
                className="w-full py-2.5 rounded bg-surface-container-highest hover:bg-secondary hover:text-on-secondary text-center font-label-md text-xs uppercase tracking-wider text-on-surface transition-colors font-semibold"
              >
                Book Production Crew
              </button>
            </div>

            {/* Pillar 3: Drone Operations */}
            <div className="group bg-surface-container p-6 rounded-xl shadow-md hover:bg-surface-container-high transition-all flex flex-col justify-between border border-surface-container-high/50">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-sm text-xs text-tertiary px-2.5 py-1 rounded bg-surface-container-high font-mono">
                    PILLAR 03 // AERIAL
                  </span>
                  <span className="material-symbols-outlined text-tertiary group-hover:scale-110 transition-transform">
                    travel_explore
                  </span>
                </div>
                <h3 className="font-headline-sm text-lg text-on-surface font-semibold mb-2">Drone Operations &amp; UAV</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">
                  DGCA/FAA compliant aerial photogrammetry, cinematic capture, and multispectral remote sensing telemetry.
                </p>
                <ul className="space-y-2 mb-6 text-xs text-on-surface font-body-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span> 4K/6K Raw Cinematic Drone Footage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span> Industrial &amp; Renewable Asset Inspection
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span> Topographical Surveying &amp; LiDAR Mapping
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span> Precision Agriculture &amp; Health Indices
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setCurrentPage('drone-operations')}
                className="w-full py-2.5 rounded bg-surface-container-highest hover:bg-tertiary hover:text-on-tertiary text-center font-label-md text-xs uppercase tracking-wider text-on-surface transition-colors font-semibold"
              >
                Dispatch Drone Flight
              </button>
            </div>

            {/* Pillar 4: Digital Marketing & Growth */}
            <div className="group bg-surface-container p-6 rounded-xl shadow-md hover:bg-surface-container-high transition-all flex flex-col justify-between border border-surface-container-high/50">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-sm text-xs text-primary px-2.5 py-1 rounded bg-surface-container-high font-mono">
                    PILLAR 04 // REVENUE
                  </span>
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
                    insights
                  </span>
                </div>
                <h3 className="font-headline-sm text-lg text-on-surface font-semibold mb-2">Digital Growth &amp; Acquisition</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">
                  High-intent performance marketing engines, enterprise SEO telemetry, and multi-channel acquisition funnels.
                </p>
                <ul className="space-y-2 mb-6 text-xs text-on-surface font-body-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> Algorithmic SEO &amp; Content Graphing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> Precision Google Ads &amp; Paid Search (SEM)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> Meta &amp; LinkedIn B2B Ad Engineering
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> Automated Retention &amp; LTV Nurturing
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setCurrentPage('digital-marketing')}
                className="w-full py-2.5 rounded bg-surface-container-highest hover:bg-primary hover:text-on-primary text-center font-label-md text-xs uppercase tracking-wider text-on-surface transition-colors font-semibold"
              >
                Initiate Campaign Engine
              </button>
            </div>

            {/* Pillar 5: SaaS Billing Software */}
            <div className="group bg-surface-container p-6 rounded-xl shadow-md hover:bg-surface-container-high transition-all flex flex-col justify-between border border-surface-container-high/50">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-sm text-xs text-secondary px-2.5 py-1 rounded bg-surface-container-high font-mono">
                    PILLAR 05 // SAAS FINTECH
                  </span>
                  <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">
                    payments
                  </span>
                </div>
                <h3 className="font-headline-sm text-lg text-on-surface font-semibold mb-2">Billing Software SaaS</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">
                  Autonomous invoicing, GST/VAT reconciliation, multi-warehouse inventory, and enterprise POS endpoints.
                </p>
                <ul className="space-y-2 mb-6 text-xs text-on-surface font-body-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span> 1-Click Automated GST &amp; E-Way Generation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span> Multi-Store Inventory &amp; Barcode Sync
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span> Modern Retail Point of Sale (POS)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span> Real-Time Profitability &amp; Tax Audit Logs
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setCurrentPage('gst-billing')}
                className="w-full py-2.5 rounded bg-surface-container-highest hover:bg-secondary hover:text-on-secondary text-center font-label-md text-xs uppercase tracking-wider text-on-surface transition-colors font-semibold"
              >
                Deploy Billing Sandbox
              </button>
            </div>

            {/* Pillar 6: Booking Engine & Hospitality */}
            <div className="group bg-surface-container p-6 rounded-xl shadow-md hover:bg-surface-container-high transition-all flex flex-col justify-between border border-surface-container-high/50">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-sm text-xs text-tertiary px-2.5 py-1 rounded bg-surface-container-high font-mono">
                    PILLAR 06 // HOSPITALITY
                  </span>
                  <span className="material-symbols-outlined text-tertiary group-hover:scale-110 transition-transform">
                    concierge
                  </span>
                </div>
                <h3 className="font-headline-sm text-lg text-on-surface font-semibold mb-2">Booking Engine &amp; Channel Mgr</h3>
                <p className="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">
                  Centralized reservation system (CRS) with sub-second OTA rate sync, dynamic yield engines, and custom direct engines.
                </p>
                <ul className="space-y-2 mb-6 text-xs text-on-surface font-body-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span> Real-Time 2-Way OTA Connectivity
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span> High-Conversion Direct Web Booking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span> Multi-Property Cluster Central Dashboards
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span> Algorithmic Competitor Rate Intelligence
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setCurrentPage('hospitality-crs')}
                className="w-full py-2.5 rounded bg-surface-container-highest hover:bg-tertiary hover:text-on-tertiary text-center font-label-md text-xs uppercase tracking-wider text-on-surface transition-colors font-semibold"
              >
                Integrate Booking CRS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Production Artifacts Section */}
      <section className="w-full bg-surface-container-low py-16 px-4 sm:px-6 lg:px-8 border-y border-surface-container-high/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-label-md text-xs uppercase tracking-wider text-primary font-bold">
                Proof of Execution
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface mt-1 font-bold">
                Featured Production Artifacts
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex p-1.5 rounded-xl bg-surface-container-high border border-surface-container-highest">
              <button
                onClick={() => setPortfolioTab('all')}
                className={`px-4 py-1.5 rounded-lg font-label-md text-xs transition-all ${
                  portfolioTab === 'all'
                    ? 'bg-primary text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                All Fields
              </button>
              <button
                onClick={() => setPortfolioTab('3d')}
                className={`px-4 py-1.5 rounded-lg font-label-md text-xs transition-all ${
                  portfolioTab === '3d'
                    ? 'bg-primary text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                3D Visuals
              </button>
              <button
                onClick={() => setPortfolioTab('drone')}
                className={`px-4 py-1.5 rounded-lg font-label-md text-xs transition-all ${
                  portfolioTab === 'drone'
                    ? 'bg-primary text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Drone Reels
              </button>
              <button
                onClick={() => setPortfolioTab('saas')}
                className={`px-4 py-1.5 rounded-lg font-label-md text-xs transition-all ${
                  portfolioTab === 'saas'
                    ? 'bg-primary text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Enterprise SaaS
              </button>
            </div>
          </div>

          {/* Bento Grid Portfolio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(portfolioTab === 'all' || portfolioTab === '3d') && (
              <div
                onClick={() => setCurrentPage('portfolio')}
                className="group relative h-96 rounded-xl overflow-hidden bg-surface-container shadow-md cursor-pointer"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDbpVqLPa9PnHIRhXMjsJjAWAYrXKN2U9Qd0smx85qUX2FGkTvp0DwG6IX1o6FBH0VfrRBL6gj5ORZyUyznENB8rnFxgj9TBAiR68FP6uACphTlKUXnEPZXkqCWA2unqpM7-98W2j7K6ml5XYMON_AkrOysaWhp-qiLYofQFGpiIg5nKEPmYo83R0Z5SL4VT29XQaYUwlhc3VXhHNemYBoHYfXfzGe1CzUQJKGreK35o_71DcPa62Cq')`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent p-6 flex flex-col justify-end">
                  <span className="font-label-sm text-xs text-primary uppercase font-bold tracking-widest mb-1">
                    Spatial Architecture
                  </span>
                  <h4 className="font-headline-sm text-lg text-on-surface mb-2 font-bold">
                    The Solis Cliffside Residence
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2">
                    Complete 8K hyper-real rendering suite and WebGL virtual walk-through for international property auction.
                  </p>
                </div>
              </div>
            )}

            {(portfolioTab === 'all' || portfolioTab === 'drone') && (
              <div
                onClick={() => setCurrentPage('portfolio')}
                className="group relative h-96 rounded-xl overflow-hidden bg-surface-container shadow-md cursor-pointer"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBA3_nhNSIQBG-iZUmkuQpP-tWeWvrPAOx3oRm23sDP4U3Ee3tluQp_XnLT45ghIuWJyTihvOl-g6M1CzqMjOFz6wPFjcgHDjjifWaW04HhWq6Sd-EVlIpqpn_hncuak0PMo_RIgfITET0wU7jA0qWks5nQwPgzQsnciFHkNc_C1S25L1Xr5_-yhc_GDoNzOtnDF55E4yEXpGvEQ7OHcbm35OdzD660dd_yZ9bEHoe9j_zFeoKCE2Kw')`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent p-6 flex flex-col justify-end">
                  <span className="font-label-sm text-xs text-tertiary uppercase font-bold tracking-widest mb-1">
                    Aerial Remote Sensing
                  </span>
                  <h4 className="font-headline-sm text-lg text-on-surface mb-2 font-bold">
                    Nordic Grid Infrastructure
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2">
                    500km utility corridor photogrammetry and thermal defect inspection with AI auto-tagging.
                  </p>
                </div>
              </div>
            )}

            {(portfolioTab === 'all' || portfolioTab === 'saas') && (
              <div
                onClick={() => setCurrentPage('portfolio')}
                className="group relative h-96 rounded-xl overflow-hidden bg-surface-container shadow-md cursor-pointer"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXUIfoUSBL1n74pdDI2WoSzjEF1oePYLxab5IN9bINDLzVCZV93hYd5jUAB52Ly8n7bzL_kzZ0k1WVIogUET4NaIK9679j6nUTFuNOBZJldGK5uYIrJpQ1d_NjpsjsZ1SuDj0d_hvXtspLfvfLZlowFZ1A3jA2R-9Jf_7IPLKs-UiBaag3sUfVoRu_3WCDigqzWNfnNPizCxLEQxUk71FUtcxUyFJk54-OJd2uX4Ulxk7ONWYU9JwY')`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent p-6 flex flex-col justify-end">
                  <span className="font-label-sm text-xs text-secondary uppercase font-bold tracking-widest mb-1">
                    Fintech Core Engine
                  </span>
                  <h4 className="font-headline-sm text-lg text-on-surface mb-2 font-bold">
                    GST-Flow Cloud Engine
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2">
                    Deployed across 840 multi-location retail distribution hubs handling $40M weekly volume.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Live Booking Teaser Card & Calculator */}
      <section className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8" id="interactive-booking">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-surface-container via-surface-container-high to-surface-container p-6 sm:p-10 rounded-2xl shadow-xl border border-surface-container-highest">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Value Prop */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest text-primary font-label-sm text-xs uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Production &amp; SaaS Dispatch
                </div>
                <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
                  Deploy Elite Creative Or Scalable Systems In Days
                </h2>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  Reserve our licensed drone crews, dedicated 3D visualization compute nodes, or spin up an enterprise billing sandbox instantly. Zero paperwork overhead.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="p-2 rounded bg-surface-container-highest text-tertiary material-symbols-outlined shrink-0">
                      verified_user
                    </span>
                    <div>
                      <h5 className="font-body-md text-sm font-bold text-on-surface">Guaranteed Turnaround SLA</h5>
                      <p className="font-body-sm text-xs text-on-surface-variant">
                        Contractual delivery deadlines with real-time project milestone tracking in your Client Area.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="p-2 rounded bg-surface-container-highest text-secondary material-symbols-outlined shrink-0">
                      lock
                    </span>
                    <div>
                      <h5 className="font-body-md text-sm font-bold text-on-surface">SOC2 &amp; DGCA Enterprise Compliant</h5>
                      <p className="font-body-sm text-xs text-on-surface-variant">
                        All aerial operations fully insured; all financial SaaS infrastructure encrypted end-to-end.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Dynamic Estimation Card */}
              <div className="lg:col-span-6 bg-surface-container-lowest p-6 rounded-xl shadow-lg border border-surface-container-high/60">
                <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
                  <h3 className="font-headline-sm text-base text-on-surface font-semibold">Direct Session Builder</h3>
                  <span className="font-label-sm text-xs text-tertiary bg-surface-container-high px-2 py-0.5 rounded font-bold">
                    SLOTS OPEN
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block font-label-sm text-xs uppercase text-on-surface-variant mb-2">
                      1. Select Primary Capability
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['visual', 'drone', 'commercial', 'saas'] as const).map((cap) => {
                        const labels = {
                          visual: '3D & CGI',
                          drone: 'Drone Ops',
                          commercial: 'Brand Shoot',
                          saas: 'SaaS Engine',
                        };
                        const isSelected = capability === cap;
                        return (
                          <button
                            key={cap}
                            type="button"
                            onClick={() => setCapability(cap)}
                            className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-colors text-left ${
                              isSelected
                                ? 'bg-primary-container text-on-primary font-bold'
                                : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface'
                            }`}
                          >
                            <span className="font-body-sm text-xs">{labels[cap]}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-label-sm text-xs uppercase text-on-surface-variant">
                        2. Scale / Volume Requirement
                      </label>
                      <span className="font-label-md text-xs text-primary font-bold">
                        {tierNames[scaleSlider - 1]}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      value={scaleSlider}
                      onChange={(e) => setScaleSlider(Number(e.target.value))}
                      className="w-full accent-cyan-400 bg-surface-container-high h-2 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between font-label-sm text-[11px] text-outline mt-1">
                      <span>Single Pilot</span>
                      <span>Multi-Location</span>
                      <span>Enterprise Fleet</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-surface-container-high flex items-center justify-between">
                    <div>
                      <div className="font-label-sm text-xs text-outline">Starting Allocation:</div>
                      <div className="font-headline-md text-xl sm:text-2xl text-on-surface font-black">
                        ${currentCost.toLocaleString()}{' '}
                        <span className="font-body-sm text-xs text-outline font-normal">/ milestone</span>
                      </div>
                    </div>
                    <button
                      onClick={handleInstantLock}
                      type="button"
                      className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-body-sm text-xs font-bold shadow-md transition-all"
                    >
                      {reserveText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Endorsements Section */}
      <section className="w-full bg-surface-container-lowest py-16 px-4 sm:px-6 lg:px-8 border-t border-surface-container-high/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-md text-xs uppercase tracking-wider text-primary font-bold">
              Partner Endorsements
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface mt-1 font-bold">
              Validated by Industry Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container p-6 rounded-xl shadow-md flex flex-col justify-between border border-surface-container-high/40">
              <div>
                <div className="flex text-tertiary mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm">star</span>
                  ))}
                </div>
                <p className="font-body-md text-xs sm:text-sm text-on-surface mb-6 italic leading-relaxed">
                  "Imagine360tours delivered our luxury resort's 3D VR previews 3 weeks ahead of scheduled launch. The architectural precision converted 80% of our pre-opening private villas."
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary">
                  DR
                </div>
                <div>
                  <div className="font-body-sm text-xs font-bold text-on-surface">Devon Reynolds</div>
                  <div className="font-label-sm text-[11px] text-on-surface-variant">Director, Aura Luxury Holdings</div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container p-6 rounded-xl shadow-md flex flex-col justify-between border border-surface-container-high/40">
              <div>
                <div className="flex text-tertiary mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm">star</span>
                  ))}
                </div>
                <p className="font-body-md text-xs sm:text-sm text-on-surface mb-6 italic leading-relaxed">
                  "Switching our nationwide distributor billing to the Imagine360tours SaaS engine eliminated invoicing latency completely. GST reconciliations that took days now resolve instantly."
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-secondary">
                  AM
                </div>
                <div>
                  <div className="font-body-sm text-xs font-bold text-on-surface">Aanya Mehta</div>
                  <div className="font-label-sm text-[11px] text-on-surface-variant">Chief Operating Officer, Vayu Retail</div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container p-6 rounded-xl shadow-md flex flex-col justify-between border border-surface-container-high/40">
              <div>
                <div className="flex text-tertiary mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm">star</span>
                  ))}
                </div>
                <p className="font-body-md text-xs sm:text-sm text-on-surface mb-6 italic leading-relaxed">
                  "Their drone inspection teams surveyed our 250MW solar installation with pinpoint LiDAR accuracy. Zero safety violations, impeccable telemetry, and stellar high-resolution reporting."
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary-fixed">
                  CS
                </div>
                <div>
                  <div className="font-body-sm text-xs font-bold text-on-surface">Christian Schneider</div>
                  <div className="font-label-sm text-[11px] text-on-surface-variant">VP Engineering, Solis Energy Europa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Converting Footer CTA Banner */}
      <section className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container p-8 sm:p-12 shadow-2xl border border-surface-container-highest">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <span className="font-label-md text-xs uppercase tracking-wider text-primary font-bold">
                  Action Vector
                </span>
                <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">
                  Ready to elevate your creative output and digital infrastructure?
                </h2>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  Connect with our principal architects and technical producers today. We engineer solutions that scale without degradation.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
                <button
                  onClick={() => setCurrentPage('book-online')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-on-primary font-body-md text-sm font-bold shadow-xl hover:bg-primary-fixed transition-all"
                >
                  <span className="material-symbols-outlined">bolt</span>
                  <span>Schedule Immediate Briefing</span>
                </button>
                <button
                  onClick={() => setCurrentPage('services')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-on-surface font-body-md text-sm font-semibold transition-all border border-surface-container-highest"
                >
                  <span>View Interactive Catalog</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
