import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface DroneOperationsProps {
  setCurrentPage: (page: string) => void;
}

export const DroneOperations: React.FC<DroneOperationsProps> = ({ setCurrentPage }) => {
  const { addToCart, showToast } = useCart();

  const [altitude, setAltitude] = useState(125);
  const [overlap, setOverlap] = useState(80);
  const [payload, setPayload] = useState('ixm');
  const [computing, setComputing] = useState(false);
  const [feasibilityInput, setFeasibilityInput] = useState('');

  const targetGsd = (altitude * 0.0112).toFixed(1);
  const duration = Math.round(overlap * 0.48);
  const pointCount = ((150 - altitude) * 0.42).toFixed(1);

  const handleCompute = () => {
    setComputing(true);
    setTimeout(() => {
      setComputing(false);
      showToast('Flight Grid Computed & RTK Checkpoints Locked!');
    }, 900);
  };

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-surface-container-lowest py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex items-center self-start gap-2 px-4 py-1.5 rounded-full bg-surface-container-high text-primary font-label-sm text-xs tracking-wider border border-surface-container-highest">
            <span className="inline-block w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
            <span>CERTIFIED INDUSTRIAL UAV FLEET // DGCA &amp; FAA CATEGORY 1 COMPLIANT // RTK-PPK PRECISION</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight font-extrabold leading-tight">
                Autonomous Industrial Drone Operations &amp;{' '}
                <span className="text-primary">Sub-Centimeter Aerial Photogrammetry</span>.
              </h1>
              <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
                From cinematic 8K master cinematography for luxury hospitality to millimeter-accurate LiDAR volumetric surveys, CAD terrain contours, and BIM digital twins. Authorized commercial flights with zero-delay airspace clearance.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="#simulator"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-xs sm:text-sm font-semibold transition-all shadow-[0_0_24px_rgba(6,182,212,0.35)]"
              >
                <span className="material-symbols-outlined text-base">radar</span>
                <span>Schedule UAV Flight Mission</span>
              </a>
              <a
                href="#capabilities"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface font-headline-sm text-xs sm:text-sm font-semibold transition-colors border border-surface-container-highest"
              >
                <span className="material-symbols-outlined text-base">grain</span>
                <span>Explore Photogrammetry Datasets</span>
              </a>
            </div>
          </div>

          {/* Telemetry Bar (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <div className="p-5 rounded-xl bg-surface-container flex flex-col gap-1 shadow-md border border-surface-container-high/40">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-[11px]">
                <span>GROUND SAMPLE DISTANCE</span>
                <span className="material-symbols-outlined text-primary text-base">straighten</span>
              </div>
              <span className="font-display text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
                ±1.2cm
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">
                RTK &amp; PPK dual-frequency ground-locked positioning
              </span>
            </div>

            <div className="p-5 rounded-xl bg-surface-container flex flex-col gap-1 shadow-md border border-surface-container-high/40">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-[11px]">
                <span>INDUSTRIAL FLEET SIZE</span>
                <span className="material-symbols-outlined text-primary text-base">flight_takeoff</span>
              </div>
              <span className="font-display text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
                18+ UAVs
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">
                DJI M350 RTK, Inspire 3 8K, WingtraOne Gen II VTOL
              </span>
            </div>

            <div className="p-5 rounded-xl bg-surface-container flex flex-col gap-1 shadow-md border border-surface-container-high/40">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-[11px]">
                <span>AIRSPACE CLEARANCE</span>
                <span className="material-symbols-outlined text-tertiary text-base">verified</span>
              </div>
              <span className="font-display text-2xl sm:text-3xl text-tertiary font-extrabold tracking-tight">
                100% DGCA
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">
                FAA Part 107 &amp; DigitalSky green/yellow zone approved
              </span>
            </div>

            <div className="p-5 rounded-xl bg-surface-container flex flex-col gap-1 shadow-md border border-surface-container-high/40">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-[11px]">
                <span>COMMERCIAL LOGGED TIME</span>
                <span className="material-symbols-outlined text-primary text-base">schedule</span>
              </div>
              <span className="font-display text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
                10,000+
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">
                Flight hours with an unbroken zero-incident safety record
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE LIVE FLIGHT SIMULATOR */}
      <section className="w-full bg-surface-container-low py-16 px-4 sm:px-6 lg:px-8 border-y border-surface-container-high/30" id="simulator">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-label-md text-xs text-primary tracking-wider uppercase font-bold">
              INTERACTIVE FLIGHT COCKPIT // MISSION CONTROL SIMULATOR
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">
              Live UAV Telemetry &amp; Autonomous Grid Planner
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-2xl">
              Simulate commercial flight paths, GSD resolution, battery cycling, and live LiDAR point cloud density across mission profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Controller Panel */}
            <div className="lg:col-span-5 bg-surface-container rounded-xl p-5 sm:p-6 flex flex-col justify-between gap-6 shadow-xl border border-surface-container-high/50">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/50">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="font-label-md text-xs text-on-surface font-bold">MISSION CONFIGURATOR</span>
                  </div>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">GRID: RTK-NTRIP</span>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase">DEPLOYMENT TARGET</label>
                  <select className="w-full bg-surface-container-lowest text-on-surface font-body-md text-xs p-2.5 rounded-lg border border-surface-container-high focus:outline-none">
                    <option>Aura Mar Coastal Resort &amp; Infrastructure (350 Ha)</option>
                    <option>Mumbai Metro Line 4 Overhead Corridor (28 Km)</option>
                    <option>Oberoi Luxury Valley Villas &amp; Golf Reserve (180 Ha)</option>
                  </select>
                </div>

                {/* Sensor Payload Toggles */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase">ACTIVE SENSOR PAYLOAD</label>
                  {[
                    { id: 'ixm', label: 'Phase One iXM-100 (100MP Nadir)' },
                    { id: 'l2', label: 'Zenmuse L2 (LiDAR Volumetric)' },
                    { id: 'x9', label: 'Zenmuse X9-8K Air (Cinematography)' },
                  ].map((p) => {
                    const isSelected = payload === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPayload(p.id)}
                        className={`text-left p-2.5 rounded-lg font-label-sm text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-surface-bright text-primary font-bold shadow-sm'
                            : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        <span>{p.label}</span>
                        <span className="material-symbols-outlined text-sm">
                          {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Sliders */}
                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex justify-between font-label-sm text-xs mb-1">
                      <span className="text-on-surface-variant">FLIGHT ALTITUDE (AGL)</span>
                      <span className="text-primary font-bold">{altitude}m AGL {altitude === 125 ? '(LEGAL CEILING)' : ''}</span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={125}
                      value={altitude}
                      onChange={(e) => setAltitude(Number(e.target.value))}
                      className="w-full accent-cyan-400 bg-surface-container-lowest h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between font-label-sm text-xs mb-1">
                      <span className="text-on-surface-variant">GRID FORWARD / SIDE OVERLAP</span>
                      <span className="text-on-surface font-bold">{overlap}% / {Math.max(60, overlap - 5)}%</span>
                    </div>
                    <input
                      type="range"
                      min={60}
                      max={85}
                      value={overlap}
                      onChange={(e) => setOverlap(Number(e.target.value))}
                      className="w-full accent-cyan-400 bg-surface-container-lowest h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Readout matrix */}
                <div className="grid grid-cols-3 gap-2 bg-surface-container-lowest p-3 rounded-lg text-center border border-surface-container-high/40">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Target GSD</span>
                    <span className="font-label-md text-xs sm:text-sm text-primary font-bold">{targetGsd} cm/px</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Duration</span>
                    <span className="font-label-md text-xs sm:text-sm text-on-surface font-bold">{duration} min</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Point Cloud</span>
                    <span className="font-label-md text-xs sm:text-sm text-tertiary font-bold">{pointCount}M PTS</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCompute}
                disabled={computing}
                className="w-full py-3 rounded-lg bg-surface-bright hover:bg-primary hover:text-on-primary text-on-surface font-headline-sm text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-surface-container-highest"
              >
                <span className="material-symbols-outlined text-base">
                  {computing ? 'refresh' : 'play_circle'}
                </span>
                <span>{computing ? 'Computing Photogrammetry Grid...' : 'Compute Flight Path & GSD Density'}</span>
              </button>
            </div>

            {/* Right Telemetry Viewport */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-4 flex flex-col gap-4 shadow-2xl relative border border-surface-container-high">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-surface-container px-4 py-2 rounded-lg font-label-sm text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                  <span className="text-on-surface font-semibold">STATUS: AUTONOMOUS FLIGHT ACTIVE</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant text-[11px]">
                  <span>SATS: <strong className="text-primary font-bold">24 (RTK FIX)</strong></span>
                  <span>WIND: <strong className="text-on-surface">4.2 KT NE</strong></span>
                  <span>BATTERY: <strong className="text-tertiary font-bold">84%</strong></span>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden flex-1 min-h-[340px] flex items-center justify-center">
                <img
                  className="w-full h-full object-cover rounded-lg shadow-inner"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA09GvgcLizZfupJA-K3e7M1GwF4jWsk_CoIh1y1TtbmDRCV0mDNChGxBgjZQdzui9NMn9oBHxe7aMkkJYom6IzkOCsqgzCxMLtdYNyJnUzfHIlEldXkdDUQ2dbeK6wK8lpEEU1YixBCaokLtZrCScYksqYr6M4rIU-pyUICjdcjPdaLF6aVjLb58A0Kp4OeAjWf3E-LKHQ_EA6VLre19fH4dFFcKXse-oGFXVb4pDblU-NHRZtTr8j"
                  alt="Aerial Drone Survey Telemetry"
                />

                <div className="absolute top-4 left-4 bg-surface-container-lowest/80 backdrop-blur-md p-2.5 rounded font-label-sm text-[11px] text-on-surface border border-surface-container-high">
                  <div className="text-primary font-bold">AURA MAR DEVELOPMENT — AERIAL SURVEY</div>
                  <div className="text-on-surface-variant text-[10px]">PHASE 3 PROGRESS: 64% // POINT DENSITY: 9.5M PTS</div>
                </div>

                <div className="absolute bottom-4 left-4 bg-surface-container-lowest/85 backdrop-blur-md px-3 py-1 rounded font-label-sm text-[10px] text-on-surface-variant border border-surface-container-high">
                  Phase One iXM-100, 50mm // ISO 200, f/5.6, 1/640 sec // RTK POSITIONED
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <span className="font-label-sm text-[11px] text-on-surface-variant">
                  Cloud photogrammetry pipeline running at 100MP nadir resolution
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart('GeoTIFF Orthomosaic Dataset', '$750.00', 'Drone Photogrammetry');
                    }}
                    className="px-3 py-1.5 rounded bg-surface-container hover:bg-surface-bright font-label-sm text-xs text-on-surface transition-colors flex items-center gap-1 border border-surface-container-high"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>GeoTIFF Orthomosaic</span>
                  </button>
                  <button
                    onClick={() => setCurrentPage('3d-visualization')}
                    className="px-3 py-1.5 rounded bg-primary-container hover:bg-primary font-label-sm text-xs text-on-primary font-semibold transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">view_in_ar</span>
                    <span>Inspect 3D Mesh</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TRANSPARENT MISSION PRICING */}
      <section className="w-full bg-surface py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
            <span className="font-label-md text-xs text-primary tracking-wider uppercase font-bold">
              FLIGHT RETENTION &amp; DEPLOYMENT
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">
              Predictable Flight Deployments &amp; Survey Packages
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant">
              Transparent, enterprise-grade pricing with insured DGCA-licensed crew and post-processing deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="p-6 rounded-xl bg-surface-container flex flex-col justify-between gap-6 shadow-lg border border-surface-container-high/40">
              <div className="flex flex-col gap-3">
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">
                  ENTRY FLIGHT • UP TO 25 ACRES
                </span>
                <h3 className="font-headline-sm text-base text-on-surface font-semibold">
                  Site Recon &amp; Cinematic Capture
                </h3>
                <div className="my-2">
                  <span className="font-headline-lg text-3xl text-on-surface font-bold">₹32,000</span>
                  <span className="text-xs text-on-surface-variant"> / mission ($420 USD)</span>
                </div>
                <ul className="space-y-2 text-xs font-body-sm text-on-surface-variant">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> 4K 60FPS uncompressed video footage</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> 50 high-res aerial stills (HDR graded)</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> 48-hour turnaround delivery</li>
                </ul>
              </div>
              <button
                onClick={() => {
                  addToCart('Site Recon & Cinematic Flight', '$420.00', 'Drone Operations');
                  setCurrentPage('book-online');
                }}
                className="w-full py-2.5 rounded-lg bg-surface-bright hover:bg-primary hover:text-on-primary text-on-surface font-headline-sm text-xs font-semibold transition-colors"
              >
                Book Cinematic Mission
              </button>
            </div>

            <div className="p-6 rounded-xl bg-surface-container-high flex flex-col justify-between gap-6 shadow-2xl relative border border-primary/50">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-[10px] font-bold shadow-md">
                RECOMMENDED // SURVEY GRADE
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <span className="font-label-sm text-[10px] text-primary uppercase font-bold">
                  PHOTOGRAMMETRY • UP TO 100 ACRES
                </span>
                <h3 className="font-headline-sm text-base text-on-surface font-semibold">
                  Precision Photogrammetry &amp; Orthomosaic
                </h3>
                <div className="my-2">
                  <span className="font-headline-lg text-3xl text-primary font-bold">₹75,000</span>
                  <span className="text-xs text-on-surface-variant"> / mission ($980 USD)</span>
                </div>
                <ul className="space-y-2 text-xs font-body-sm text-on-surface">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> Sub-2cm GSD RTK GeoTIFF Orthophoto</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> 3D textured mesh (OBJ / FBX / GLTF)</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> Digital Elevation Models (DSM/DTM)</li>
                </ul>
              </div>
              <button
                onClick={() => {
                  addToCart('Precision Photogrammetry Flight Grid', '$980.00', 'Drone Operations');
                  setCurrentPage('book-online');
                }}
                className="w-full py-2.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-xs font-semibold shadow-md transition-all"
              >
                Deploy Photogrammetry Grid
              </button>
            </div>

            <div className="p-6 rounded-xl bg-surface-container flex flex-col justify-between gap-6 shadow-lg border border-surface-container-high/40">
              <div className="flex flex-col gap-3">
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">
                  ENTERPRISE LIDAR • UP TO 300+ ACRES
                </span>
                <h3 className="font-headline-sm text-base text-on-surface font-semibold">
                  Enterprise LiDAR &amp; BIM Digital Twin
                </h3>
                <div className="my-2">
                  <span className="font-headline-lg text-3xl text-on-surface font-bold">₹1,85,000</span>
                  <span className="text-xs text-on-surface-variant"> / mission ($2,400 USD)</span>
                </div>
                <ul className="space-y-2 text-xs font-body-sm text-on-surface-variant">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> Zenmuse L2 multi-echo LiDAR scan</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> Classified LAS point cloud</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">check</span> Autodesk Revit alignment</li>
                </ul>
              </div>
              <button
                onClick={() => {
                  addToCart('Enterprise LiDAR & BIM Survey', '$2,400.00', 'Drone Operations');
                  setCurrentPage('book-online');
                }}
                className="w-full py-2.5 rounded-lg bg-surface-bright hover:bg-primary hover:text-on-primary text-on-surface font-headline-sm text-xs font-semibold transition-colors"
              >
                Configure Enterprise LiDAR
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Flight Feasibility Check Banner */}
      <section className="w-full bg-surface-container-lowest py-16 px-4 sm:px-6 lg:px-8 border-t border-surface-container-high/30">
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-surface-container to-surface-container-high p-8 sm:p-10 text-center flex flex-col items-center gap-6 shadow-2xl border border-surface-container-highest">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="font-label-md text-xs text-primary tracking-wider uppercase font-bold">
              RAPID DISPATCH OPERATIONS DESK
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">
              Ready to Deploy Industrial UAVs to Your Site?
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant">
              Enter your project coordinates, site address, or upload a KML boundary. Our flight ops desk will provide an airspace clearance audit within 2 hours.
            </p>
          </div>

          <div className="w-full max-w-xl flex flex-col sm:flex-row gap-2 bg-surface-container-lowest p-2 rounded-xl border border-surface-container-high">
            <div className="flex-1 flex items-center px-3 gap-2">
              <span className="material-symbols-outlined text-on-surface-variant text-lg">location_on</span>
              <input
                type="text"
                value={feasibilityInput}
                onChange={(e) => setFeasibilityInput(e.target.value)}
                placeholder="Enter Site Address, Lat/Long, or GeoJSON coordinates..."
                className="w-full bg-transparent text-on-surface text-xs focus:outline-none placeholder:text-outline"
              />
            </div>
            <button
              onClick={() => {
                showToast('Airspace clearance check: Zone Alpha Green (Permit Instant)');
                setFeasibilityInput('');
              }}
              className="px-5 py-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-xs font-semibold transition-all whitespace-nowrap shadow-md"
            >
              Instant Feasibility Check
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
