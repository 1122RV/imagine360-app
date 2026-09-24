import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface ThreeDVisualizationProps {
  setCurrentPage: (page: string) => void;
}

export const ThreeDVisualization: React.FC<ThreeDVisualizationProps> = ({ setCurrentPage }) => {
  const { addToCart, showToast } = useCart();

  // Interactive Viewport State
  const [selectedFloor, setSelectedFloor] = useState('Calacatta Gold');
  const [selectedWood, setSelectedWood] = useState('American Walnut');
  const [selectedLight, setSelectedLight] = useState('Golden Hour Dusk');
  const [activeCamera, setActiveCamera] = useState<'living' | 'deck' | 'lounge'>('living');
  const [isDxr, setIsDxr] = useState(true);
  const [embedCopied, setEmbedCopied] = useState(false);

  const cameraScenes = {
    living: {
      name: 'Living Pavilion • Dusk Arc',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGTF4kj9ZGT8bJWEh56asY4TZPjU6p4N79y-_vqKfbzVSWfdME9ANl_SH3ucZt69eR1XpglyYfdq53EGsUSdAgSEOrFP5nT1ZwhAtRiFIIGbyEXQLW6W9AEsXq7VZPPAZZW8FUrPkvXuEl9VW9ukkmi3OX5q_axx5NaYLtwyLPlx06d0BeHA4IXqkM3NM5mkuSKmybNoImbMrdQ6WPBbeqFPoudJqaAHK0qYtbXjhnkHFABNIhbu_s',
    },
    deck: {
      name: 'Infinity Pool & Master Deck',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpUEPqjSDJeDHZhbulmo5p2ZNp8Z8y720zqMRYuB30bKtn4SKxYFAObxJ134nRgiUio0TZfDiIZXv5B6wulwoIUqibXK9idV3_Uud3E7J-Sl9VhUcKx3AFqLOl5MkXvsMHDHQacjjeOntAh6_F-gnltSBBvROY2vIfClv-PGkeuFiEIulZL1UN4_5HpJTj8nJZDgvtzQOCi4XZ16XYJjluEjPg50j2kY5anwF9lEvefIQdgbrstnoz',
    },
    lounge: {
      name: 'Sunset Horizon Lounge',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBw68J8k6v8vf5Dir7IG0uxZQLQy0o2YzpzUkWquDYu00ASR35W_wO0LO8W67L1Qhcnmwm7xTwzPmz3RMEcOCfYOFMhePKl9gkpeq3JK0UcNz7xPggbFdnrGDCg0pym7qWNInWWeG0ootUR45b_dadQz8WPTNdOTDQOobjN4qFm5xFGQ_LQ5dUnkO1bwiQlcpF3ekdyqQ_jW-iFqbbwvctmrImldNlkiaURYzFtsc5R6pUtpHgxoKwe',
    },
  };

  const handleCopyEmbed = () => {
    navigator.clipboard?.writeText(
      '<script src="https://engine.imagine360tours.com/v4/spatial-embed.js" data-scene="living-pavilion" data-dxr="true"></script>'
    );
    setEmbedCopied(true);
    showToast('WebXR Embed script copied to clipboard!');
    setTimeout(() => setEmbedCopied(false), 3000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO & TELEMETRY CLUSTER */}
      <section className="relative w-full overflow-hidden bg-surface py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high shadow-sm mb-4 border border-surface-container-highest">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span className="font-label-sm text-xs text-tertiary tracking-wider uppercase font-semibold">
              NEXT-GEN SPATIAL COMPUTING // PHOTOREALISTIC 3D &amp; VR SUITE
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-on-surface max-w-5xl tracking-tight leading-tight mb-4 font-extrabold">
            Cinematic 3D Architectural Visualization &amp; Interactive VR Walkthroughs.
          </h1>

          <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed mb-8">
            Bridge imagination and reality with millimetric accuracy. We engineer photorealistic CGI architectural renders, browser-native 60FPS WebGL virtual tours, and BIM-compliant digital twins for elite hospitality, commercial developments, and luxury real estate.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mb-12 w-full sm:w-auto">
            <a
              href="#interactive-simulator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-headline-sm text-xs sm:text-sm font-semibold tracking-wide shadow-xl hover:bg-primary-fixed transition-all"
            >
              <span className="material-symbols-outlined text-base">view_in_ar</span>
              <span>Launch Interactive 3D Viewport</span>
            </a>
            <a
              href="#pricing-tiers"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-surface-container-high text-on-surface font-headline-sm text-xs sm:text-sm font-semibold hover:bg-surface-container-highest transition-all border border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-base">shuffle_on</span>
              <span>Explore VR Walkthrough Deck</span>
            </a>
          </div>

          {/* Operational KPI Metrics Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col text-left p-4 sm:p-5 rounded-xl bg-surface-container-low shadow-sm border border-surface-container-high/40">
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase">Rendering SLA</span>
                <span className="material-symbols-outlined text-primary text-base">cloud_sync</span>
              </div>
              <span className="font-headline-md text-xl sm:text-2xl text-primary font-bold tracking-tight">
                &lt; 4h Turnaround
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                Distributed 128-GPU Cloud Farm
              </span>
            </div>

            <div className="flex flex-col text-left p-4 sm:p-5 rounded-xl bg-surface-container-low shadow-sm border border-surface-container-high/40">
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase">Spatial Precision</span>
                <span className="material-symbols-outlined text-tertiary text-base">square_foot</span>
              </div>
              <span className="font-headline-md text-xl sm:text-2xl text-tertiary font-bold tracking-tight">
                ±1.2mm CAD Acc.
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                Revit, Rhino &amp; ArchiCAD Sync
              </span>
            </div>

            <div className="flex flex-col text-left p-4 sm:p-5 rounded-xl bg-surface-container-low shadow-sm border border-surface-container-high/40">
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase">Viewport Engine</span>
                <span className="material-symbols-outlined text-secondary text-base">speed</span>
              </div>
              <span className="font-headline-md text-xl sm:text-2xl text-secondary font-bold tracking-tight">
                60 FPS Native
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                Zero-Plugin Browser WebGL
              </span>
            </div>

            <div className="flex flex-col text-left p-4 sm:p-5 rounded-xl bg-surface-container-low shadow-sm border border-surface-container-high/40">
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase">Engagement Lift</span>
                <span className="material-symbols-outlined text-primary text-base">trending_up</span>
              </div>
              <span className="font-headline-md text-xl sm:text-2xl text-on-surface font-bold tracking-tight">
                +410% Dwell Time
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                Vs. Conventional 2D Floorplans
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LIVE INTERACTIVE SIMULATOR (DUAL-PANEL CONSOLE) */}
      <section className="w-full bg-surface-container-lowest py-16 px-4 sm:px-6 lg:px-8" id="interactive-simulator">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-label-sm text-xs text-primary mb-1">
                <span className="material-symbols-outlined text-base">terminal</span>
                <span>HARDWARE-ACCELERATED RENDER BENCH</span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold tracking-tight">
                Interactive WebGL 3D Viewport &amp; Material Swapper Console
              </h2>
            </div>
            <div className="flex items-center gap-2 font-label-sm text-xs text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-lg border border-surface-container-high">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span>STREAMING DXR ACTIVE // LATENCY 14MS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-surface-container-low rounded-2xl p-4 sm:p-6 shadow-xl border border-surface-container-high/40">
            {/* Left Panel: Viewport */}
            <div className="lg:col-span-8 flex flex-col rounded-xl bg-surface-container-lowest overflow-hidden relative border border-surface-container-high">
              <div className="z-20 flex items-center justify-between px-4 py-2.5 bg-surface/80 backdrop-blur-md border-b border-surface-container-high">
                <div className="flex items-center gap-3 font-label-sm text-xs">
                  <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-semibold">
                    VIEWPORT 01
                  </span>
                  <span className="text-on-surface">{cameraScenes[activeCamera].name}</span>
                </div>
                <div className="flex items-center gap-4 font-label-sm text-xs text-on-surface-variant">
                  <span className="hidden sm:inline">FOV: 74°</span>
                  <span className="text-tertiary font-bold">60.0 FPS</span>
                  <button
                    onClick={() => setIsDxr(!isDxr)}
                    className="px-2 py-0.5 rounded bg-surface-container text-on-surface hover:text-primary transition-colors text-[11px]"
                  >
                    {isDxr ? 'Path-Traced (DXR)' : 'Rasterized Preview'}
                  </button>
                </div>
              </div>

              {/* Viewport Image and Hotspots */}
              <div className="relative w-full aspect-[16/9] min-h-[360px] overflow-hidden flex items-center justify-center bg-surface">
                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  src={cameraScenes[activeCamera].img}
                  alt={cameraScenes[activeCamera].name}
                />

                {/* Hotspot 01: Flooring */}
                <div className="absolute bottom-[22%] left-[34%] z-30 group/pin">
                  <button className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 backdrop-blur-md text-primary hover:bg-primary hover:text-on-primary transition-all">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
                    <span className="material-symbols-outlined text-base">center_focus_strong</span>
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 rounded-lg bg-surface/95 backdrop-blur-xl shadow-2xl opacity-0 pointer-events-none group-hover/pin:opacity-100 group-hover/pin:pointer-events-auto transition-opacity z-40 border border-surface-container-high text-left">
                    <div className="font-label-sm text-[10px] text-primary uppercase font-bold">
                      Hotspot 01 • Material
                    </div>
                    <div className="font-body-sm text-xs text-on-surface font-semibold">
                      {selectedFloor}
                    </div>
                    <div className="font-label-sm text-[10px] text-on-surface-variant">
                      Specular Roughness: 0.04 // Reflectance 98%
                    </div>
                  </div>
                </div>

                {/* Hotspot 02: LED Cove */}
                <div className="absolute top-[28%] left-[52%] z-30 group/pin">
                  <button className="relative flex items-center justify-center w-8 h-8 rounded-full bg-tertiary/20 backdrop-blur-md text-tertiary hover:bg-tertiary hover:text-on-tertiary transition-all">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-60"></span>
                    <span className="material-symbols-outlined text-base">lightbulb</span>
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 p-3 rounded-lg bg-surface/95 backdrop-blur-xl shadow-2xl opacity-0 pointer-events-none group-hover/pin:opacity-100 group-hover/pin:pointer-events-auto transition-opacity z-40 border border-surface-container-high text-left">
                    <div className="font-label-sm text-[10px] text-tertiary uppercase font-bold">
                      Hotspot 02 • Luminaire
                    </div>
                    <div className="font-body-sm text-xs text-on-surface font-semibold">
                      Recessed Warm Cove LED
                    </div>
                    <div className="font-label-sm text-[10px] text-on-surface-variant">
                      Color Temp: 2700K // 1,450 lm/m
                    </div>
                  </div>
                </div>

                {/* Camera Switcher Dock */}
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1 p-1 rounded-lg bg-surface/90 backdrop-blur-md border border-surface-container-high">
                  {(['living', 'deck', 'lounge'] as const).map((cam) => {
                    const isSelected = activeCamera === cam;
                    const labels = { living: 'Living Pavilion', deck: 'Infinity Deck', lounge: 'Sunset Lounge' };
                    return (
                      <button
                        key={cam}
                        onClick={() => setActiveCamera(cam)}
                        className={`px-2.5 py-1 rounded font-label-sm text-[11px] transition-all ${
                          isSelected
                            ? 'bg-primary text-on-primary font-semibold shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        {labels[cam]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Panel: Material & Lighting Swapper */}
            <div className="lg:col-span-4 flex flex-col gap-4 p-4 rounded-xl bg-surface-container border border-surface-container-high/60">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/50">
                <span className="font-headline-sm text-sm text-on-surface font-bold">Spatial Configurator</span>
                <span className="px-2 py-0.5 rounded-full bg-tertiary/10 font-label-sm text-[10px] text-tertiary font-semibold">
                  SYNCED
                </span>
              </div>

              {/* Palette 1: Flooring */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-[11px] text-on-surface-variant uppercase flex justify-between">
                  <span>01 • Primary Flooring</span>
                  <span className="text-primary font-semibold">{selectedFloor}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Calacatta Gold', 'Smoked French Oak', 'Belgian Bluestone'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setSelectedFloor(item)}
                      className={`p-2 rounded-lg bg-surface-container-high text-left flex flex-col gap-1 transition-all ${
                        selectedFloor === item ? 'ring-1 ring-primary shadow-sm' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="w-full h-7 rounded bg-gradient-to-tr from-slate-200 to-white opacity-90"></div>
                      <span className="font-label-sm text-[10px] text-on-surface truncate">{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Palette 2: Joinery */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-[11px] text-on-surface-variant uppercase flex justify-between">
                  <span>02 • Architectural Joinery</span>
                  <span className="text-secondary font-semibold">{selectedWood}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['American Walnut', 'Ebonized Ash', 'Bleached Oak'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setSelectedWood(item)}
                      className={`p-2 rounded-lg bg-surface-container-high text-left flex flex-col gap-1 transition-all ${
                        selectedWood === item ? 'ring-1 ring-secondary shadow-sm' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="w-full h-7 rounded bg-gradient-to-tr from-amber-950 to-stone-800"></div>
                      <span className="font-label-sm text-[10px] text-on-surface truncate">{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Telemetry specs readout */}
              <div className="p-3 rounded-lg bg-surface-container-lowest flex flex-col gap-1.5 font-label-sm text-[11px] border border-surface-container-high/40">
                <div className="flex justify-between text-on-surface-variant">
                  <span>POLYGON BUDGET</span>
                  <span className="text-on-surface font-semibold">1.84M Triangles</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>TEXTURE PIPELINE</span>
                  <span className="text-on-surface font-semibold">8K PBR Roughness</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>SPATIAL COMPLIANCE</span>
                  <span className="text-tertiary font-semibold">Vision Pro • Meta Quest 3</span>
                </div>
              </div>

              <button
                onClick={handleCopyEmbed}
                className="w-full mt-auto py-2.5 px-4 rounded-lg bg-primary-container text-on-primary font-headline-sm text-xs font-semibold flex items-center justify-center gap-2 hover:bg-primary transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-base">
                  {embedCopied ? 'check' : 'code'}
                </span>
                <span>{embedCopied ? 'Embed Script Copied!' : '1-Click Export WebXR Embed'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PRICING PACKAGES */}
      <section className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8" id="pricing-tiers">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
            <span className="font-label-sm text-xs text-tertiary uppercase font-bold tracking-wider">
              PREDICTABLE DEPLOYMENT PACKAGES
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold tracking-tight">
              Architectural Retainers &amp; Project Tiers
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant">
              Transparent, enterprise-grade pricing with dedicated render cluster SLA and commercial usage licenses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-sm border border-surface-container-high/40">
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">
                TIER 01 // STABLE STILLS
              </span>
              <h3 className="font-headline-sm text-base text-on-surface font-semibold mt-1">Essential Spatial Render</h3>
              <div className="my-4">
                <span className="font-headline-lg text-3xl text-on-surface font-extrabold">$249</span>
                <span className="text-xs text-on-surface-variant"> / view</span>
              </div>
              <ul className="space-y-2 mb-6 text-xs text-on-surface-variant font-body-sm">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">check</span> 4K Photorealistic Still Render
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">check</span> 2 Iterative Material Passes
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">check</span> 48-Hour SLA
                </li>
              </ul>
              <button
                onClick={() => {
                  addToCart('Essential Spatial Render', '$249.00', '3D Visualization');
                  setCurrentPage('book-online');
                }}
                className="w-full mt-auto py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold transition-colors"
              >
                Order Spatial Renders
              </button>
            </div>

            <div className="relative flex flex-col p-6 rounded-2xl bg-surface-container shadow-2xl border border-primary/50">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-[10px] font-bold uppercase tracking-wider">
                MOST POPULAR
              </div>
              <span className="font-label-sm text-[10px] text-primary uppercase font-bold mt-1">
                TIER 02 // WEBGL INTERACTIVE
              </span>
              <h3 className="font-headline-sm text-base text-on-surface font-semibold mt-1">Interactive 3D Walkthrough</h3>
              <div className="my-4">
                <span className="font-headline-lg text-3xl text-primary font-extrabold">$620</span>
                <span className="text-xs text-on-surface-variant"> / property</span>
              </div>
              <ul className="space-y-2 mb-6 text-xs text-on-surface font-body-sm">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span> WebGL Interactive Tour
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span> 10 Specification Hotspots
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span> WebXR Headset Ready
                </li>
              </ul>
              <button
                onClick={() => {
                  addToCart('Interactive 3D Walkthrough', '$620.00', '3D Visualization');
                  setCurrentPage('book-online');
                }}
                className="w-full mt-auto py-2.5 rounded-lg bg-primary text-on-primary text-xs font-bold shadow-lg hover:bg-primary-fixed transition-colors"
              >
                Deploy 3D Walkthrough
              </button>
            </div>

            <div className="flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-sm border border-surface-container-high/40">
              <span className="font-label-sm text-[10px] text-secondary uppercase font-bold">
                TIER 03 // FULL DIGITAL TWIN
              </span>
              <h3 className="font-headline-sm text-base text-on-surface font-semibold mt-1">Enterprise Digital Twin</h3>
              <div className="my-4">
                <span className="font-headline-lg text-3xl text-on-surface font-extrabold">$1,650</span>
                <span className="text-xs text-on-surface-variant"> / tier</span>
              </div>
              <ul className="space-y-2 mb-6 text-xs text-on-surface-variant font-body-sm">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">check</span> Full BIM/CAD (IFC4 &amp; Revit)
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">check</span> Runtime Finishes Configurator
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">check</span> 4K Choreographed Video Tour
                </li>
              </ul>
              <button
                onClick={() => {
                  addToCart('Enterprise Spatial Digital Twin', '$1,650.00', '3D Visualization');
                  setCurrentPage('book-online');
                }}
                className="w-full mt-auto py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold transition-colors"
              >
                Schedule Enterprise Scoping
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
