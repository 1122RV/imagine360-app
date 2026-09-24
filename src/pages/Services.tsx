import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface ServicesProps {
  setCurrentPage: (page: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ setCurrentPage }) => {
  const { addToCart, showToast } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVertical, setActiveVertical] = useState('vertical-drone');

  const scrollToVertical = (id: string) => {
    setActiveVertical(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Command & Filter Deck */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-surface-container-low via-background to-background">
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 w-[30rem] h-[30rem] rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col max-w-2xl">
              <div className="flex items-center gap-2 text-primary font-label-sm text-xs uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Enterprise Grade Execution Grid
              </div>
              <h1 className="font-headline-lg text-2xl sm:text-4xl lg:text-5xl text-on-surface tracking-tight font-extrabold leading-tight">
                Engineered for Impact:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed to-secondary">
                  6 Core Verticals
                </span>{' '}
                Under One Roof.
              </h1>
              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                High-cadence aerial logistics, precision spatial computing, cinematic studio film, digital growth pipelines, and mission-critical cloud software.
              </p>
            </div>

            {/* Telemetry Snapshot Card */}
            <div className="bg-surface-container-high/60 backdrop-blur-xl p-4 sm:p-5 rounded-xl shadow-lg flex items-center gap-6 border border-surface-container-highest shrink-0">
              <div className="flex flex-col">
                <span className="font-label-sm text-[11px] text-outline uppercase tracking-wider">
                  Deployable Units
                </span>
                <span className="font-headline-sm text-lg sm:text-xl text-primary font-bold">
                  24 Flight Cells
                </span>
              </div>
              <div className="w-px h-10 bg-outline-variant/30"></div>
              <div className="flex flex-col">
                <span className="font-label-sm text-[11px] text-outline uppercase tracking-wider">
                  Rendering SLA
                </span>
                <span className="font-headline-sm text-lg sm:text-xl text-tertiary font-bold">
                  &lt; 48h Turnaround
                </span>
              </div>
            </div>
          </div>

          {/* Search & Filtering Bar */}
          <div className="bg-surface-container p-3 rounded-xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-3 border border-surface-container-high">
            <div className="relative w-full lg:w-96 flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-outline">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search telemetry, capabilities (e.g. LiDAR, GST, BIM, 4K)..."
                className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-lg border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Vertical Jump Navigation Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
              {[
                { id: 'vertical-drone', label: '01. Drones & Geospatial' },
                { id: 'vertical-3d', label: '02. 3D & Spatial VR' },
                { id: 'vertical-film', label: '03. Commercial Film' },
                { id: 'vertical-marketing', label: '04. Digital Performance' },
                { id: 'vertical-billing', label: '05. Enterprise GST SaaS' },
                { id: 'vertical-booking', label: '06. Hospitality CRS' },
              ].map((v) => {
                const isActive = activeVertical === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => scrollToVertical(v.id)}
                    className={`px-3.5 py-2 rounded-lg font-label-sm text-xs whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-primary text-on-primary font-bold shadow-md'
                        : 'bg-surface-container-high hover:bg-surface-bright text-on-surface-variant'
                    }`}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* VERTICAL 01: DRONE SERVICES & GEOSPATIAL */}
        <section className="scroll-mt-28 flex flex-col gap-6" id="vertical-drone">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-2 border-b border-surface-container-high/40">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-md text-xs text-primary bg-primary/10 px-2 py-0.5 rounded font-mono">
                  V-01 // AIRBORNE OPS
                </span>
                <span className="font-label-sm text-xs text-tertiary flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>DGCA &amp; FAA Part 107 Certified
                </span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold mt-1">
                Drone Services &amp; Geospatial Operations
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-0.5">
                Sub-centimeter photogrammetry, cinematic heavy-lift Arri/RED stabilization, and autonomous industrial thermal audits.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-xs text-on-surface-variant">Telemetry Index:</span>
              <span className="font-label-sm text-xs text-on-primary bg-primary-container px-2 py-1 rounded font-bold">
                RTK/PPK GNSS Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Hero Capability Media Block */}
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden min-h-[380px] bg-surface-container flex flex-col justify-end p-6 sm:p-8 shadow-xl group border border-surface-container-high">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDcAKj8-3a2J3mRPluKnQ0psdQcu1Gjmp4HsZKGb6YkftsfxanoShTk99CFE-KyFCWgb_G77TYsrCK9iwpUMWV7SblLQJghZDLIFEqbvXoMbOQfkwq1_0IobdwyhPn4o0fPgduZY_rJcKIUy83uN-n4Qt-BCB50ryPEPeOAdzUrEsfDuILooOf5TgTBWWvX6hA7mwEU6rQE5qDs5F_4qmq7KKQ1xvTh2GznHrmRElef4fJRDXlSVpGN')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>
              <div className="relative z-10 flex flex-col gap-2">
                <span className="font-label-sm text-xs text-primary uppercase tracking-widest font-mono">
                  Autonomous Fleet Vector
                </span>
                <h3 className="font-headline-md text-xl sm:text-2xl text-on-surface font-bold">
                  Cinematography &amp; Photogrammetry Core
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Equipped with Phase One iXM 100MP, FLIR thermal radiometric sensors, and dual-operator DJI Ronin 4D aerial rigs.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="font-label-sm text-[11px] px-2.5 py-1 rounded-full bg-surface-container-high/80 text-on-surface">
                    LiDAR Cloud: 2M pts/sec
                  </span>
                  <span className="font-label-sm text-[11px] px-2.5 py-1 rounded-full bg-surface-container-high/80 text-on-surface">
                    Max Res: 8K RAW
                  </span>
                  <span className="font-label-sm text-[11px] px-2.5 py-1 rounded-full bg-surface-container-high/80 text-tertiary">
                    Live Downlink: 1080p60
                  </span>
                </div>
              </div>
            </div>

            {/* Capability Matrix List */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Item 1 */}
              <div className="bg-surface-container p-5 rounded-xl shadow-md hover:bg-surface-container-high transition-all flex flex-col justify-between border border-surface-container-high/40">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <span className="material-symbols-outlined text-primary text-xl">videocam</span>
                    <span className="font-label-sm text-[11px] text-on-surface-variant">SLA: 48h Edit</span>
                  </div>
                  <h4 className="font-headline-sm text-base text-on-surface font-semibold">
                    Aerial Cinematography &amp; Photography
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Film shoots, luxury commercials, music videos, dynamic FPV acrobatics, and luxury real estate high-speed flythroughs.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-surface-container-high/40 mt-4">
                  <div>
                    <span className="font-label-sm text-[10px] text-outline block uppercase">Dispatch Baseline</span>
                    <span className="font-headline-sm text-base text-primary font-bold">
                      $1,250<span className="font-body-sm text-xs text-on-surface-variant font-normal">/day</span>
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart('Aerial Cinematography Flight Package', '$1,250')}
                    className="px-3.5 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-xs font-bold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-1"
                  >
                    <span>Book Slot</span>
                    <span className="material-symbols-outlined text-sm">add_task</span>
                  </button>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-surface-container p-5 rounded-xl shadow-md hover:bg-surface-container-high transition-all flex flex-col justify-between border border-surface-container-high/40">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <span className="material-symbols-outlined text-primary text-xl">apartment</span>
                    <span className="font-label-sm text-[11px] text-on-surface-variant">SLA: 24h Web Sync</span>
                  </div>
                  <h4 className="font-headline-sm text-base text-on-surface font-semibold">
                    Real Estate &amp; Property Marketing
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Gigapixel 360 aerial panoramas, automated BIM milestone progression timelines, and zoned development flyovers.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-surface-container-high/40 mt-4">
                  <div>
                    <span className="font-label-sm text-[10px] text-outline block uppercase">Per Site Asset</span>
                    <span className="font-headline-sm text-base text-primary font-bold">
                      $680<span className="font-body-sm text-xs text-on-surface-variant font-normal">/lot</span>
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart('Real Estate 360 & Progress Package', '$680')}
                    className="px-3.5 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-xs font-bold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-1"
                  >
                    <span>Book Slot</span>
                    <span className="material-symbols-outlined text-sm">add_task</span>
                  </button>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-surface-container p-5 rounded-xl shadow-md hover:bg-surface-container-high transition-all flex flex-col justify-between border border-surface-container-high/40">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <span className="material-symbols-outlined text-tertiary text-xl">solar_power</span>
                    <span className="font-label-sm text-[11px] text-tertiary">Radiometric Cert</span>
                  </div>
                  <h4 className="font-headline-sm text-base text-on-surface font-semibold">
                    Industrial &amp; Thermal Inspection
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    High-voltage transmission line stringing, utility-scale solar thermography hotspot diagnostics, and structural bridge safety.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-surface-container-high/40 mt-4">
                  <div>
                    <span className="font-label-sm text-[10px] text-outline block uppercase">Mission Tier</span>
                    <span className="font-headline-sm text-base text-primary font-bold">
                      $1,850<span className="font-body-sm text-xs text-on-surface-variant font-normal">/audit</span>
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart('Thermal Radiometric Audit Mission', '$1,850')}
                    className="px-3.5 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-xs font-bold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-1"
                  >
                    <span>Book Slot</span>
                    <span className="material-symbols-outlined text-sm">add_task</span>
                  </button>
                </div>
              </div>

              {/* Item 4 */}
              <div className="bg-surface-container p-5 rounded-xl shadow-md hover:bg-surface-container-high transition-all flex flex-col justify-between border border-surface-container-high/40">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <span className="material-symbols-outlined text-secondary text-xl">layers</span>
                    <span className="font-label-sm text-[11px] text-on-surface-variant">GeoTIFF / LAS</span>
                  </div>
                  <h4 className="font-headline-sm text-base text-on-surface font-semibold">
                    Surveying &amp; Geospatial Mapping
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Centimeter-level 2D orthomosaics, classified LiDAR point clouds, digital elevation models (DEM), and cut/fill volumetrics.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-surface-container-high/40 mt-4">
                  <div>
                    <span className="font-label-sm text-[10px] text-outline block uppercase">Acreage Rate</span>
                    <span className="font-headline-sm text-base text-primary font-bold">
                      $950<span className="font-body-sm text-xs text-on-surface-variant font-normal">/100ac</span>
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart('Topographic LiDAR Survey Pack', '$950')}
                    className="px-3.5 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-xs font-bold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-1"
                  >
                    <span>Book Slot</span>
                    <span className="material-symbols-outlined text-sm">add_task</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VERTICAL 02: 3D VISUALIZATION & PHOTOREALISTIC RENDERING */}
        <section className="scroll-mt-28 flex flex-col gap-6" id="vertical-3d">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-2 border-b border-surface-container-high/40">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-md text-xs text-secondary bg-secondary/10 px-2 py-0.5 rounded font-mono">
                  V-02 // SPATIAL SYNTHESIS
                </span>
                <span className="font-label-sm text-xs text-primary flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Unreal Engine 5.4 Lumen / Raytraced
                </span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold mt-1">
                3D Visualization &amp; Photorealistic Rendering
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-0.5">
                Ray-traced interior/exterior hyper-renders, immersive CAD/BIM VR architectural spaces, and e-commerce CGI asset pipelines.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-xs text-on-surface-variant">Cloud Render Array:</span>
              <span className="font-label-sm text-xs text-on-secondary bg-secondary-fixed px-2 py-1 rounded font-bold">
                128x RTX 4090 Cluster
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container rounded-xl overflow-hidden shadow-lg flex flex-col justify-between border border-surface-container-high/50">
              <div className="relative h-48 bg-surface-container-high overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw68J8k6v8vf5Dir7IG0uxZQLQy0o2YzpzUkWquDYu00ASR35W_wO0LO8W67L1Qhcnmwm7xTwzPmz3RMEcOCfYOFMhePKl9gkpeq3JK0UcNz7xPggbFdnrGDCg0pym7qWNInWWeG0ootUR45b_dadQz8WPTNdOTDQOobjN4qFm5xFGQ_LQ5dUnkO1bwiQlcpF3ekdyqQ_jW-iFqbbwvctmrImldNlkiaURYzFtsc5R6pUtpHgxoKwe"
                  alt="VR Architecture"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-primary font-label-sm text-[11px]">
                  VR / WebGL Ready
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-headline-sm text-base text-on-surface font-semibold">
                    VR Architecture &amp; CAD/BIM Walkthroughs
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Full-scale immersive navigation for Meta Quest / Apple Vision Pro. Seamless Revit, Archicad, and Rhino CAD pipeline ingestion.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-surface-container-high/40 mt-4">
                  <div>
                    <span className="font-label-sm text-[10px] text-outline block uppercase">Fixed Turnkey</span>
                    <span className="font-headline-sm text-base text-primary font-bold">
                      $2,200<span className="font-body-sm text-xs text-on-surface-variant font-normal">/scene</span>
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart('Interactive BIM VR Walkthrough', '$2,200')}
                    className="px-3.5 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-xs font-bold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-1"
                  >
                    <span>Configure</span>
                    <span className="material-symbols-outlined text-sm">view_in_ar</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-surface-container rounded-xl overflow-hidden shadow-lg flex flex-col justify-between border border-surface-container-high/50">
              <div className="relative h-48 bg-surface-container-high overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpUEPqjSDJeDHZhbulmo5p2ZNp8Z8y720zqMRYuB30bKtn4SKxYFAObxJ134nRgiUio0TZfDiIZXv5B6wulwoIUqibXK9idV3_Uud3E7J-Sl9VhUcKx3AFqLOl5MkXvsMHDHQacjjeOntAh6_F-gnltSBBvROY2vIfClv-PGkeuFiEIulZL1UN4_5HpJTj8nJZDgvtzQOCi4XZ16XYJjluEjPg50j2kY5anwF9lEvefIQdgbrstnoz"
                  alt="Photorealistic Exterior"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-tertiary font-label-sm text-[11px]">
                  8K UHD Master
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-headline-sm text-base text-on-surface font-semibold">
                    Photorealistic Exterior &amp; Interior Renders
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Atmospheric lighting, physical PBR materials, custom landscaping flora, isometric 3D master floorplans, and cinematic camera cuts.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-surface-container-high/40 mt-4">
                  <div>
                    <span className="font-label-sm text-[10px] text-outline block uppercase">Per Camera Shot</span>
                    <span className="font-headline-sm text-base text-primary font-bold">
                      $450<span className="font-body-sm text-xs text-on-surface-variant font-normal">/still</span>
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart('High-Fidelity Still Render Pack', '$450')}
                    className="px-3.5 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-xs font-bold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-1"
                  >
                    <span>Configure</span>
                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-surface-container rounded-xl overflow-hidden shadow-lg flex flex-col justify-between border border-surface-container-high/50">
              <div className="relative h-48 bg-surface-container-high overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkGF-JjJgl4Sn_fXWvxBeng-LqoU6R-38SXnXe7UIoESLkeUC6kHkFm1_2qsYioKXEX-Qn4cZusvGxU52qEXktyDX-q5uphQeybHC0h2_blvFvRkZ4V1RdKVBdUs8QkEO3PZNGeQFztTHiYXUFcNkQtDirni3Ts8o7OLUyXOKJiXolJ_qq0CG7RMZwq3hxQa1e7InbULLnZeghDGcS0Le3nU3Av0_vw51UxyhCM9V6xxkbRIB_KPhE"
                  alt="Tech Hardware CGI"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-secondary font-label-sm text-[11px]">
                  Hardware / CMF
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-headline-sm text-base text-on-surface font-semibold">
                    Tech Hardware &amp; E-Commerce Visualization
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Exploded technical views, CMF material studies, high-resolution Amazon/Shopify turnkey spins, and real-time interactive WebGL viewers.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-surface-container-high/40 mt-4">
                  <div>
                    <span className="font-label-sm text-[10px] text-outline block uppercase">Product Tier</span>
                    <span className="font-headline-sm text-base text-primary font-bold">
                      $1,100<span className="font-body-sm text-xs text-on-surface-variant font-normal">/SKU</span>
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart('Industrial 3D Product Visualization', '$1,100')}
                    className="px-3.5 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-xs font-bold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-1"
                  >
                    <span>Configure</span>
                    <span className="material-symbols-outlined text-sm">devices</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VERTICAL 03: COMMERCIAL FILM */}
        <section className="scroll-mt-28 flex flex-col gap-6" id="vertical-film">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-2 border-b border-surface-container-high/40">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-md text-xs text-tertiary bg-tertiary/10 px-2 py-0.5 rounded font-mono">
                  V-03 // CINEMATIC STUDIO
                </span>
                <span className="font-label-sm text-xs text-on-surface-variant">
                  Arri Alexa Mini LF • Cooke Anamorphic Optics
                </span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold mt-1">
                Commercial &amp; Wedding Cinematic Production
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-0.5">
                Full-pipeline studio production: executive corporate profiles, high-octane automotive reels, luxury weddings, and viral social cuts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-surface-container p-5 rounded-xl shadow-md flex flex-col justify-between border border-surface-container-high/40">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined">badge</span>
                </div>
                <h4 className="font-headline-sm text-base text-on-surface font-semibold">Corporate Documentaries</h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Founder stories, investor pitch films, customer success testimonials, and enterprise recruitment campaigns filmed worldwide.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-surface-container-high/40 mt-4">
                <span className="font-headline-sm text-base text-primary font-bold">
                  $2,800<span className="text-xs font-normal text-on-surface-variant">/day</span>
                </span>
                <button
                  onClick={() => addToCart('Corporate Brand Film Production', '$2,800')}
                  className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-xs font-bold hover:shadow-md transition-all"
                >
                  Book
                </button>
              </div>
            </div>

            <div className="bg-surface-container p-5 rounded-xl shadow-md flex flex-col justify-between border border-surface-container-high/40">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined">restaurant</span>
                </div>
                <h4 className="font-headline-sm text-base text-on-surface font-semibold">Food &amp; Hospitality</h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  High-speed phantom macro liquid pours, culinary artistry storytelling, Michelin restaurant features, and hotel lifestyle ads.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-surface-container-high/40 mt-4">
                <span className="font-headline-sm text-base text-primary font-bold">
                  $2,100<span className="text-xs font-normal text-on-surface-variant">/shoot</span>
                </span>
                <button
                  onClick={() => addToCart('Food & Beverage Commercial Shoot', '$2,100')}
                  className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-xs font-bold hover:shadow-md transition-all"
                >
                  Book
                </button>
              </div>
            </div>

            <div className="bg-surface-container p-5 rounded-xl shadow-md flex flex-col justify-between border border-surface-container-high/40">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined">directions_car</span>
                </div>
                <h4 className="font-headline-sm text-base text-on-surface font-semibold">Automotive Motion</h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Chase car arm rigs, precision track drivers, night street neon sequences, and studio lighting turntables for performance vehicles.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-surface-container-high/40 mt-4">
                <span className="font-headline-sm text-base text-primary font-bold">
                  $3,900<span className="text-xs font-normal text-on-surface-variant">/session</span>
                </span>
                <button
                  onClick={() => addToCart('Automotive Dynamic Track Shoot', '$3,900')}
                  className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-xs font-bold hover:shadow-md transition-all"
                >
                  Book
                </button>
              </div>
            </div>

            <div className="bg-surface-container p-5 rounded-xl shadow-md flex flex-col justify-between border border-surface-container-high/40">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined">favorite</span>
                </div>
                <h4 className="font-headline-sm text-base text-on-surface font-semibold">Luxury Weddings</h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Multi-day cultural festivities, drone aerial entrances, 4K multi-cam ceremonial live-streams, and viral 60-second next-day reels.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-surface-container-high/40 mt-4">
                <span className="font-headline-sm text-base text-primary font-bold">
                  $3,400<span className="text-xs font-normal text-on-surface-variant">/package</span>
                </span>
                <button
                  onClick={() => addToCart('Luxury Destination Wedding Production', '$3,400')}
                  className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-xs font-bold hover:shadow-md transition-all"
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* VERTICAL 05: ENTERPRISE GST BILLING SOFTWARE */}
        <section className="scroll-mt-28 flex flex-col gap-6" id="vertical-billing">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-2 border-b border-surface-container-high/40">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-md text-xs text-primary bg-primary/10 px-2 py-0.5 rounded font-mono">
                  V-05 // SAAS PRODUCT
                </span>
                <span className="font-label-sm text-xs text-tertiary">NIC &amp; GSTN Direct API Gateway</span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold mt-1">
                Enterprise GST Billing &amp; Cloud Invoicing
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-0.5">
                High-volume multi-warehouse inventory, real-time E-Way bill generation, POS registers, and tamper-evident audit logs.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('gst-billing')}
              className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs text-primary font-bold hover:bg-surface-container-highest transition-colors"
            >
              Launch GST Simulator →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-surface-container rounded-xl p-6 shadow-xl flex flex-col justify-between border border-surface-container-high/40">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-xs text-primary uppercase tracking-wider font-semibold">
                    Cloud Engine Specs &amp; Architecture
                  </span>
                  <span className="px-2 py-0.5 rounded bg-tertiary/10 text-tertiary font-label-sm text-xs font-semibold">
                    SOC-2 Type II Compliant
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-surface-container-high/60 p-4 rounded-lg space-y-1">
                    <span className="material-symbols-outlined text-primary text-xl">receipt_long</span>
                    <h5 className="font-headline-sm text-sm text-on-surface font-semibold">1-Click E-Way &amp; E-Invoice</h5>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      Instant QR-encoded compliant invoice dispatch through government NIC servers with automatic retry fallbacks.
                    </p>
                  </div>
                  <div className="bg-surface-container-high/60 p-4 rounded-lg space-y-1">
                    <span className="material-symbols-outlined text-primary text-xl">warehouse</span>
                    <h5 className="font-headline-sm text-sm text-on-surface font-semibold">Multi-Location Stock &amp; POS</h5>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      Batch serial tracking, automated low-stock reorder triggers, offline-capable tablet POS terminals.
                    </p>
                  </div>
                  <div className="bg-surface-container-high/60 p-4 rounded-lg space-y-1">
                    <span className="material-symbols-outlined text-secondary text-xl">security</span>
                    <h5 className="font-headline-sm text-sm text-on-surface font-semibold">Granular Role-Based ACLs</h5>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      Limit cashier pricing override authority, conceal wholesale margins from floor staff, and log all session actions.
                    </p>
                  </div>
                  <div className="bg-surface-container-high/60 p-4 rounded-lg space-y-1">
                    <span className="material-symbols-outlined text-tertiary text-xl">fact_check</span>
                    <h5 className="font-headline-sm text-sm text-on-surface font-semibold">GSTR-1 &amp; 3B Reconciliation</h5>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      Auto-match purchase registers against GSTR-2B inward supplies to catch supplier default and maximize ITC.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-low p-4 rounded-lg border border-surface-container-high/30">
                <div>
                  <span className="font-label-sm text-[10px] text-outline uppercase">Included Service</span>
                  <p className="font-body-sm text-xs text-on-surface font-medium">Free Legacy Data Migration from Tally, Zoho, or Busy</p>
                </div>
                <span className="font-label-sm text-xs text-tertiary font-bold">API Status: 99.99% Up</span>
              </div>
            </div>

            {/* SaaS Pricing Tier Card */}
            <div className="bg-surface-container-high rounded-xl p-6 shadow-xl flex flex-col justify-between border border-primary/30">
              <div className="space-y-4">
                <div>
                  <span className="font-label-sm text-xs text-primary uppercase tracking-wider font-bold">
                    Enterprise Cloud License
                  </span>
                  <h3 className="font-headline-md text-xl text-on-surface font-bold mt-1">
                    Imagine360tours GST Pro
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Complete suite with dedicated database replica, SLA guarantee, and custom connector plugins.
                  </p>
                </div>
                <div className="py-2">
                  <div className="flex items-baseline gap-1">
                    <span className="font-headline-lg text-3xl text-primary font-extrabold">$89</span>
                    <span className="font-body-md text-xs text-on-surface-variant">/month billed annually</span>
                  </div>
                  <span className="font-label-sm text-[11px] text-tertiary block mt-1">Includes unlimited branches &amp; 15 seats</span>
                </div>
                <ul className="space-y-2 text-xs font-body-sm text-on-surface-variant">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-sm">check</span> Real-time E-Way Bills &amp; IRN Generation</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-sm">check</span> Thermal &amp; A4 Invoice Template Engine</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-sm">check</span> Integrated Payment Gateway QR (UPI/Cards)</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-sm">check</span> Tamper-Proof Cryptographic Audit Log</li>
                </ul>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => addToCart('Imagine360tours GST SaaS Annual License', '$89/mo')}
                  className="w-full py-3 rounded-lg bg-primary text-on-primary font-body-sm text-xs font-bold shadow-lg shadow-primary/20 hover:bg-primary-fixed transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">cloud_done</span>
                  <span>Deploy Instant Workspace</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* High-Impact Enterprise Onboarding Callout Banner */}
        <section className="w-full bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high p-8 sm:p-12 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-surface-container-highest">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
          <div className="flex flex-col max-w-2xl space-y-2 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
              <span className="font-label-sm text-xs text-tertiary uppercase tracking-wider font-semibold">
                Bespoke SLA &amp; Custom Integrations
              </span>
            </div>
            <h3 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
              Need a Multi-Vertical Enterprise Hybrid Contract?
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Combine commercial video production with on-site drone thermography, tailored 3D CAD walk-throughs, and dedicated billing instances at scale with unified account management.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 z-10 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => {
                addToCart('Solutions Architect Consultation Call', 'Complimentary');
                showToast('Solutions Architect consultation scheduled');
              }}
              className="px-6 py-3.5 rounded-xl bg-primary-container hover:bg-primary font-body-sm text-xs text-on-primary font-bold transition-all shadow-lg shadow-primary/20 text-center"
            >
              Schedule Solutions Architect Call
            </button>
            <button
              onClick={() => {
                showToast('Master Rate Sheet 2025 PDF download started');
              }}
              className="px-6 py-3.5 rounded-xl bg-surface-container-highest hover:bg-surface-bright font-body-sm text-xs text-on-surface font-medium transition-all text-center flex items-center justify-center gap-2 border border-surface-container-high"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Download 2025 Master Rate Sheet</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
