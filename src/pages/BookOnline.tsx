import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { getSupabase } from '../lib/supabase';

interface BookOnlineProps {
  setCurrentPage: (page: string) => void;
}

export const BookOnline: React.FC<BookOnlineProps> = ({ setCurrentPage }) => {
  const { cart, addToCart, removeFromCart, clearCart, showToast } = useCart();

  // Step state
  const [selectedCategory, setSelectedCategory] = useState<string>('drone');
  const [selectedTier, setSelectedTier] = useState<string>('pro');
  const [selectedDate, setSelectedDate] = useState<number>(18);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');
  const [siteAddress, setSiteAddress] = useState('Imagine360 Tower, G Block, BKC Financial District');
  const [lotSize, setLotSize] = useState('48,500 Sq Ft (Commercial Campus)');
  const [seats, setSeats] = useState(5);
  const [promoInput, setPromoInput] = useState('IMAGINE360-Q4');
  const [isProcessing, setIsProcessing] = useState(false);

  // Addons
  const [addons, setAddons] = useState({
    express: true,
    rawDLog: true,
    rtmp: false,
    gstSplit: false,
  });

  const categories = [
    {
      id: '3d',
      title: '3D Architectural Render',
      desc: 'Photoreal interior/exterior CGI & spatial light physics simulation.',
      price: '$850',
      time: 'EST. 48h',
      icon: 'view_in_ar',
    },
    {
      id: 'drone',
      title: 'Commercial Drone Shoot',
      desc: 'FAA/DGCA pilot fleet, 6K RAW cinema-grade aerial photogrammetry.',
      price: '$1,250',
      time: 'RTK LOCKED',
      icon: 'flight_takeoff',
    },
    {
      id: 'film',
      title: 'Corporate Film Video',
      desc: 'Executive interviews, factory tour b-roll, high-key studio staging.',
      price: '$2,100',
      time: 'CREW 3-4',
      icon: 'videocam',
    },
    {
      id: 'marketing',
      title: 'Digital Marketing Audit',
      desc: 'CAC/LTV architecture, attribution tracking, landing page CRO sprint.',
      price: '$650',
      time: 'DEEP METRIC',
      icon: 'query_stats',
    },
    {
      id: 'saas',
      title: 'Billing SaaS Onboarding',
      desc: 'Automated Stripe/GST ledger sync, sandbox pipeline & team seat config.',
      price: '$1,400',
      time: 'ENTERPRISE',
      icon: 'point_of_sale',
    },
    {
      id: 'custom',
      title: 'Bespoke Hybrid Mission',
      desc: 'Multi-city drone + spatial scan',
      price: 'Custom',
      time: 'HYBRID',
      icon: 'add_box',
    },
  ];

  // Pricing calculations
  const parseNum = (s: string) => {
    const n = parseFloat(s.replace(/[^0-9.]/g, ''));
    return isNaN(n) ? 0 : n;
  };

  const subtotal = cart.reduce((acc, i) => acc + parseNum(i.price), 0);
  const addonsCost = (addons.express ? 250 : 0) + (addons.rawDLog ? 128 : 0) + (addons.rtmp ? 490 : 0);
  const totalBase = subtotal + addonsCost;
  const discount = totalBase * 0.1;
  const gstTax = (totalBase - discount) * 0.18;
  const escrow = 50.0;
  const grandTotal = Math.max(0, totalBase - discount + gstTax + escrow);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const supabase = getSupabase();
      await supabase.from('bookings').insert([
        {
          target_date: `2025-11-${selectedDate}`,
          slot: selectedSlot,
          site: siteAddress,
          items: cart,
          total: grandTotal,
          status: 'confirmed',
          created_at: new Date().toISOString(),
        },
      ]);
    } catch {
      // Non-blocking fallback
    }

    setTimeout(() => {
      setIsProcessing(false);
      showToast('Dispatch Session Confirmed! Reference #I360-' + Math.floor(1000 + Math.random() * 9000));
      clearCart();
      setCurrentPage('client-dashboard');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-[1720px] mx-auto">
        {/* Top Micro-Telemetry Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 px-4 py-2 rounded-xl bg-surface-container-low border border-surface-container-high/40 text-xs font-label-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="text-tertiary uppercase tracking-wider font-bold">Flight Mesh Active</span>
            </div>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface-variant">DGCA ZONE: ALPHA-7 (AUTHORIZED)</span>
            <span className="text-outline-variant hidden lg:inline">/</span>
            <span className="hidden lg:inline text-on-surface-variant">SLA GUARANTEE: 24H DELIVERABLE READY</span>
          </div>
          <div className="flex items-center gap-2 text-primary font-bold">
            <span>DISPATCH CADENCE: 99.4% REALTIME</span>
            <span className="material-symbols-outlined text-base">satellite_alt</span>
          </div>
        </div>

        {/* Main Grid: 8 Cols Flow + 4 Cols Sticky Cart */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left Column: 5 Steps */}
          <div className="xl:col-span-8 flex flex-col gap-8">
            {/* Header progress tracker */}
            <div className="p-6 rounded-xl bg-surface-container border border-surface-container-high/50 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="font-label-sm text-xs uppercase tracking-widest text-primary font-bold">
                    MISSION PIPELINE
                  </span>
                  <h1 className="font-headline-md text-xl sm:text-2xl text-on-surface mt-1 font-bold">
                    Production Dispatch Configurator
                  </h1>
                </div>
                <div className="flex items-center gap-2 bg-surface-container-high px-4 py-1.5 rounded-full border border-surface-container-highest">
                  <span className="font-label-sm text-xs text-on-surface-variant">Step</span>
                  <span className="font-label-md text-xs text-primary font-bold">3 / 5</span>
                  <span className="font-label-sm text-xs text-tertiary">· SCHEDULE ALLOCATED</span>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <div className="h-1.5 rounded-full bg-primary"></div>
                <div className="h-1.5 rounded-full bg-primary"></div>
                <div className="h-1.5 rounded-full bg-primary"></div>
                <div className="h-1.5 rounded-full bg-surface-container-highest"></div>
                <div className="h-1.5 rounded-full bg-surface-container-highest"></div>
              </div>
            </div>

            {/* STEP 1: Service Category Selection */}
            <section className="p-6 rounded-xl bg-surface-container border border-surface-container-high/50 shadow-md flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-primary-container text-on-primary font-label-md text-xs flex items-center justify-center font-bold">
                    01
                  </span>
                  <h2 className="font-headline-sm text-lg text-on-surface font-semibold">Service Category</h2>
                </div>
                <span className="font-label-sm text-xs text-primary uppercase font-bold tracking-wider">
                  PRIMARY DISPATCH
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        addToCart(cat.title, cat.price, 'Pipeline Service');
                      }}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 relative border ${
                        isSelected
                          ? 'bg-surface-container-highest shadow-md ring-1 ring-primary/60 border-primary/40'
                          : 'bg-surface-container-high hover:bg-surface-container-highest border-transparent'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-primary/20 text-primary font-label-sm text-[10px] px-2 py-0.5 rounded-full">
                          <span className="material-symbols-outlined text-xs">check_circle</span>
                          <span>SELECTED</span>
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined">{cat.icon}</span>
                        </div>
                        <span className="font-label-sm text-[11px] text-on-surface-variant font-mono">
                          {cat.time}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-sm text-on-surface font-semibold mb-1">
                        {cat.title}
                      </h3>
                      <p className="font-body-sm text-xs text-on-surface-variant mb-3 leading-relaxed">
                        {cat.desc}
                      </p>
                      <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/40">
                        <span className="font-label-md text-xs text-tertiary font-bold">{cat.price}</span>
                        <span className="material-symbols-outlined text-sm text-outline hover:text-primary">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* STEP 2: Package Tier Selection */}
            <section className="p-6 rounded-xl bg-surface-container border border-surface-container-high/50 shadow-md flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-primary-container text-on-primary font-label-md text-xs flex items-center justify-center font-bold">
                    02
                  </span>
                  <h2 className="font-headline-sm text-lg text-on-surface font-semibold">Package Tier &amp; Deliverables</h2>
                </div>
                <span className="font-label-sm text-xs text-secondary uppercase font-bold">
                  COMMERCIAL DRONE TIER
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Standard */}
                <div
                  onClick={() => setSelectedTier('standard')}
                  className={`p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between border ${
                    selectedTier === 'standard'
                      ? 'bg-surface-container-highest ring-1 ring-primary border-primary/50'
                      : 'bg-surface-container-high hover:bg-surface-container-highest border-transparent'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
                        STANDARD
                      </span>
                      <span className="font-label-sm text-[10px] text-outline">HALF-DAY</span>
                    </div>
                    <h3 className="font-headline-sm text-base text-on-surface font-semibold">Standard 4K</h3>
                    <div className="mt-2 mb-4">
                      <span className="font-headline-lg text-2xl text-primary font-extrabold">$750</span>
                      <span className="font-body-sm text-xs text-on-surface-variant">/ flight</span>
                    </div>
                    <ul className="space-y-2 mb-4 text-xs font-body-sm text-on-surface-variant">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-xs">check</span> 4K UltraHD 60fps
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-xs">check</span> 10 Aerial Still Stills
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-xs">check</span> Color Corrected Rec709
                      </li>
                    </ul>
                  </div>
                  <button className="w-full py-2 rounded-lg bg-surface-container-highest font-label-md text-xs text-on-surface font-bold">
                    {selectedTier === 'standard' ? 'Selected ✓' : 'Select Standard'}
                  </button>
                </div>

                {/* Pro HDR */}
                <div
                  onClick={() => setSelectedTier('pro')}
                  className={`p-5 rounded-xl cursor-pointer relative shadow-xl border ${
                    selectedTier === 'pro'
                      ? 'bg-surface-container-highest ring-2 ring-primary border-primary'
                      : 'bg-surface-container-high hover:bg-surface-container-highest border-transparent'
                  }`}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-[10px] font-bold shadow-md uppercase">
                    Engineers Choice
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2 mt-1">
                      <span className="font-label-sm text-[10px] text-primary uppercase tracking-wider font-bold">
                        PRO ARCHITECTURE
                      </span>
                      <span className="font-label-sm text-[10px] text-tertiary font-bold">BEST VALUE</span>
                    </div>
                    <h3 className="font-headline-sm text-base text-on-surface font-semibold">Pro HDR + Raw BIM</h3>
                    <div className="mt-2 mb-4">
                      <span className="font-headline-lg text-2xl text-primary font-extrabold">$1,250</span>
                      <span className="font-body-sm text-xs text-on-surface-variant">/ flight</span>
                    </div>
                    <ul className="space-y-2 mb-4 text-xs font-body-sm text-on-surface">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-xs">verified</span> 6K ProRes 422HQ &amp; HDR
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-xs">verified</span> 360° Interactive Air Panorama
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-xs">verified</span> Point Cloud &amp; OBJ Orthomosaic
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-xs">verified</span> DGCA Pilot &amp; Co-Pilot Fleet
                      </li>
                    </ul>
                  </div>
                  <button className="w-full py-2 rounded-lg bg-primary text-on-primary font-label-md text-xs font-bold transition-all shadow-[0_0_16px_rgba(76,215,246,0.3)]">
                    {selectedTier === 'pro' ? 'Active Tier ✓' : 'Select Pro'}
                  </button>
                </div>

                {/* Enterprise */}
                <div
                  onClick={() => setSelectedTier('enterprise')}
                  className={`p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between border ${
                    selectedTier === 'enterprise'
                      ? 'bg-surface-container-highest ring-1 ring-primary border-primary/50'
                      : 'bg-surface-container-high hover:bg-surface-container-highest border-transparent'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-sm text-[10px] text-secondary uppercase tracking-wider">
                        ENTERPRISE
                      </span>
                      <span className="font-label-sm text-[10px] text-secondary-fixed">MULTI-SITE</span>
                    </div>
                    <h3 className="font-headline-sm text-base text-on-surface font-semibold">Enterprise Multi-Day</h3>
                    <div className="mt-2 mb-4">
                      <span className="font-headline-lg text-2xl text-primary font-extrabold">$3,200</span>
                      <span className="font-body-sm text-xs text-on-surface-variant">/ 3-day window</span>
                    </div>
                    <ul className="space-y-2 mb-4 text-xs font-body-sm text-on-surface-variant">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-xs">check</span> Multi-Battery Continuous Relays
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-xs">check</span> LiDAR Density 300 pts/m²
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-xs">check</span> Custom Flight Clearance Escort
                      </li>
                    </ul>
                  </div>
                  <button className="w-full py-2 rounded-lg bg-surface-container-highest font-label-md text-xs text-on-surface font-bold">
                    {selectedTier === 'enterprise' ? 'Selected ✓' : 'Select Enterprise'}
                  </button>
                </div>
              </div>
            </section>

            {/* STEP 3: Operational Availability & Date Selection */}
            <section className="p-6 rounded-xl bg-surface-container border border-surface-container-high/50 shadow-md flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-primary-container text-on-primary font-label-md text-xs flex items-center justify-center font-bold">
                    03
                  </span>
                  <h2 className="font-headline-sm text-lg text-on-surface font-semibold">
                    Operational Availability &amp; Date Selection
                  </h2>
                </div>
                <div className="flex items-center gap-3 text-xs font-label-sm">
                  <span className="inline-flex items-center gap-1 text-tertiary">
                    <span className="w-2 h-2 rounded-full bg-tertiary"></span> Available
                  </span>
                  <span className="inline-flex items-center gap-1 text-error">
                    <span className="w-2 h-2 rounded-full bg-error"></span> Booked
                  </span>
                  <span className="inline-flex items-center gap-1 text-secondary">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span> Weather Cleared
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Calendar View */}
                <div className="lg:col-span-7 bg-surface-container-low p-4 rounded-xl border border-surface-container-high/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">calendar_month</span>
                      <span className="font-headline-sm text-sm text-on-surface font-bold">November 2025</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center font-label-sm text-[11px] text-on-surface-variant mb-2">
                    <span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span><span>SU</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center font-label-md text-xs">
                    {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((d) => {
                      const isSelected = selectedDate === d;
                      const isBooked = d === 12 || d === 21;
                      return (
                        <button
                          key={d}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setSelectedDate(d)}
                          className={`py-2 rounded-lg transition-all ${
                            isSelected
                              ? 'bg-primary text-on-primary font-bold shadow-[0_0_14px_rgba(76,215,246,0.6)]'
                              : isBooked
                              ? 'text-error/40 bg-error/5 cursor-not-allowed'
                              : 'text-on-surface hover:bg-surface-container-high'
                          }`}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high/50">
                    <span className="font-label-sm text-[10px] text-on-surface-variant block mb-0.5">TARGET DATE</span>
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-xs text-on-surface font-semibold">
                        Tue, Nov {selectedDate}, 2025
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-[10px] font-bold">
                        SOLAR CLEAR
                      </span>
                    </div>
                  </div>

                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase mt-1 font-bold">
                    AVAILABLE FLIGHT SLOTS
                  </span>

                  {[
                    { time: '07:30 AM', label: 'Golden Hour Dawn', metric: '98% Lumen' },
                    { time: '10:00 AM', label: 'Optimal Solar Zenith', metric: 'Optimal' },
                    { time: '01:30 PM', label: 'High Contrast Direct', metric: 'Available' },
                  ].map((s) => {
                    const isSelected = selectedSlot === s.time;
                    return (
                      <button
                        key={s.time}
                        type="button"
                        onClick={() => setSelectedSlot(s.time)}
                        className={`p-3 rounded-lg flex items-center justify-between text-left transition-colors ${
                          isSelected
                            ? 'bg-primary-container text-on-primary font-bold shadow-md'
                            : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">wb_sunny</span>
                          <span className="font-label-md text-xs">{s.time} - {s.label}</span>
                        </div>
                        <span className="text-[11px] font-mono">{s.metric}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* STEP 4: Site Coordinates & Architectural Specs */}
            <section className="p-6 rounded-xl bg-surface-container border border-surface-container-high/50 shadow-md flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-primary-container text-on-primary font-label-md text-xs flex items-center justify-center font-bold">
                    04
                  </span>
                  <h2 className="font-headline-sm text-lg text-on-surface font-semibold">
                    Site Coordinates &amp; Architectural Specs
                  </h2>
                </div>
                <span className="font-label-sm text-xs text-primary uppercase font-bold tracking-wider">
                  GEODETIC TELEMETRY
                </span>
              </div>

              {/* Map Preview */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-inner border border-surface-container-high">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDcoBv3ZyKuyVeeX0rNyzdwTVJeQPMtLDSw66uL0rvtkqq8FjGD2i0XsMRf8JJuWie0yKQVSQ7mM2jjNJFTs-QgB9nGBnD89BIB0otQiZuCuQHIh9CrFenbqi0izWRQ3US6-X8fiMAUIc_NJ4UPlzWzSJCN0EUZeNSZJqFYLHc-_zBK4b5Yu6Njly0R9VVEPSlinZ2RA9K6J6sMfKPkLwGbfG0SrbdaDnxO0pLSC0rKMK-cDGQa9B0B')`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-surface-container-lowest/30 pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-xs font-label-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">my_location</span>
                    <span className="text-on-surface">LAT: 19.0657° N · LNG: 72.8687° E · ELEV: 14m</span>
                  </div>
                  <span className="text-tertiary uppercase font-bold">AIRSPACE CLEARANCE: LEVEL A</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase">Site Address / Project Venue</label>
                  <input
                    type="text"
                    value={siteAddress}
                    onChange={(e) => setSiteAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-surface-container-high focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase">Floor Area / Lot Size</label>
                  <input
                    type="text"
                    value={lotSize}
                    onChange={(e) => setLotSize(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-surface-container-high focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase">Platform Review Seats</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={seats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-surface-container-high focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </section>

            {/* STEP 5: Accelerators & Add-On Modules */}
            <section className="p-6 rounded-xl bg-surface-container border border-surface-container-high/50 shadow-md flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-primary-container text-on-primary font-label-md text-xs flex items-center justify-center font-bold">
                    05
                  </span>
                  <h2 className="font-headline-sm text-lg text-on-surface font-semibold">
                    Accelerators &amp; Add-On Modules
                  </h2>
                </div>
                <span className="font-label-sm text-xs text-outline uppercase font-bold">
                  EXPEDITE OPTIONS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest cursor-pointer transition-colors border border-surface-container-highest">
                  <input
                    type="checkbox"
                    checked={addons.express}
                    onChange={(e) => setAddons({ ...addons, express: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-primary accent-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-xs text-on-surface font-bold">Priority 24h Express Delivery</span>
                      <span className="font-label-md text-xs text-tertiary font-bold">+$250</span>
                    </div>
                    <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                      High-speed ingest, rapid color pass, and direct cloud link delivery within 24 hours.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest cursor-pointer transition-colors border border-surface-container-highest">
                  <input
                    type="checkbox"
                    checked={addons.rawDLog}
                    onChange={(e) => setAddons({ ...addons, rawDLog: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-primary accent-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-headline-sm text-xs text-on-surface font-bold">Raw D-Log Cinema License</span>
                      <span className="font-label-md text-xs text-tertiary font-bold">+$128</span>
                    </div>
                    <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                      Full perpetual commercial rights to master uncompressed 10-bit color footage.
                    </p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Right Column: Persistent Sticky Side Cart (4 Cols) */}
          <aside className="xl:col-span-4 flex flex-col gap-4 xl:sticky xl:top-24">
            <div className="p-6 rounded-2xl bg-surface-container shadow-2xl flex flex-col gap-4 border border-surface-container-high">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/50">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">shopping_bag</span>
                  <h3 className="font-headline-sm text-base text-on-surface font-bold">Booking Cart</h3>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-[11px] font-bold">
                    {cart.length} Services
                  </span>
                </div>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="font-label-sm text-xs text-on-surface-variant hover:text-error transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">delete_sweep</span> Clear
                  </button>
                )}
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high/40 shadow-sm relative group"
                  >
                    <div className="flex gap-3">
                      {item.image && (
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-surface-container-highest relative">
                          <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-headline-sm text-xs text-on-surface font-semibold truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-outline hover:text-error transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        </div>
                        <div className="flex items-center gap-1 font-label-sm text-[11px] text-primary mt-0.5">
                          <span className="material-symbols-outlined text-xs">event</span>
                          <span>Nov {selectedDate}, 2025 · {selectedSlot}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1 pt-1 border-t border-surface-container-high/40">
                          <span className="font-label-sm text-[10px] text-tertiary">{item.badge || 'Verified SLA'}</span>
                          <span className="font-label-md text-xs text-on-surface font-bold text-primary">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo code */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo Code"
                    className="flex-1 pl-3 pr-2 py-2 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-xs uppercase border border-surface-container-high focus:outline-none focus:border-primary"
                  />
                  <button
                    onClick={() => showToast('Promo code applied!')}
                    className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-sm text-xs font-bold transition-all"
                  >
                    Apply
                  </button>
                </div>
                <span className="font-label-sm text-[10px] text-tertiary flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">check</span>
                  Code applied: 10% Tech Partner Credit
                </span>
              </div>

              {/* Cost breakdown */}
              <div className="p-3.5 rounded-xl bg-surface-container-low space-y-1.5 text-xs border border-surface-container-high/40">
                <div className="flex items-center justify-between text-on-surface-variant font-body-sm">
                  <span>Subtotal ({cart.length} Services)</span>
                  <span className="font-label-md text-on-surface font-semibold">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                {addonsCost > 0 && (
                  <div className="flex items-center justify-between text-on-surface-variant font-body-sm">
                    <span>Priority 24h &amp; Addons</span>
                    <span className="font-label-md text-on-surface font-semibold">+${addonsCost.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-tertiary font-body-sm">
                  <span>Partner Credit (10%)</span>
                  <span className="font-label-md font-semibold">-${discount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-body-sm">
                  <span>Platform GST (18%)</span>
                  <span className="font-label-md text-on-surface font-semibold">+${gstTax.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-body-sm">
                  <span>Service Guarantee Escrow</span>
                  <span className="font-label-md text-on-surface font-semibold">$50.00</span>
                </div>
                <div className="pt-2 border-t border-surface-container-high flex items-center justify-between text-sm font-bold">
                  <span className="text-on-surface">ESTIMATED TOTAL DUE</span>
                  <span className="text-primary font-mono text-base font-extrabold">
                    ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(76,215,246,0.35)] transition-all disabled:opacity-50"
              >
                <span>{isProcessing ? 'Locking Dispatch Pipeline...' : 'Proceed to Checkout'}</span>
                <span className="material-symbols-outlined text-base">lock</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
