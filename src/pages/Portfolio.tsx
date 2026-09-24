import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface PortfolioProps {
  setCurrentPage: (page: string) => void;
}

interface ProjectData {
  id: string;
  category: '3d' | 'drone' | 'commercial' | 'marketing' | 'saas';
  categoryLabel: string;
  title: string;
  subtitle: string;
  client: string;
  turnaround: string;
  metricLabel: string;
  metricVal: string;
  gear: string;
  specs: string;
  quote: string;
  quoter: string;
  image: string;
  span: string;
  badge: string;
  accentColor: string;
}

export const Portfolio: React.FC<PortfolioProps> = ({ setCurrentPage }) => {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const projects: ProjectData[] = [
    {
      id: 'proj-1',
      category: '3d',
      categoryLabel: '3D Spatial Architecture',
      title: 'Luminary Skyrise',
      subtitle: '360° Photorealistic VR Walkthrough & BIM Model',
      client: 'Apex Urban Infrastructure',
      turnaround: '24 Days',
      metricLabel: 'Off-Plan Sales Lift',
      metricVal: '+310%',
      gear: 'Dual NVIDIA RTX 4090 Rendering Farm, Unreal Engine 5.4 Nanite, Leica BLK360 G2 Scanner',
      specs: 'Sub-millimeter BIM accuracy, 8K stereoscopic VR output, WebGL real-time interior material customization.',
      quote: "Imagine360tours' Unreal Engine pipeline allowed our global buyers to tour multi-million dollar penthouses before the foundation was even poured. Presales converted 310% above plan.",
      quoter: 'Marcus Vance, VP Development, Apex Urban',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtqs-sB0TMkTmDgQArhx10hkf3ARhiFRpsCqmtvFbsmn414J33HnBatYVhGRt29nmXI5kklvdNYrblytgoeN3AojSJLxNBmTkS9Htl91Sg5Qiw_rbxLqYi4NXKAfRwu8P-0WagUyEr6lbb5eEWK1OkfOeLhrjwB_h0N1XbtdaB-TVwSoX_hW1bKvDFdqhLDlGX358ahBpRtaQlUFfS14NJ0xbZ2ceJAi2iXkk0CbUleWfrEkOX26Cq',
      span: 'lg:col-span-7',
      badge: '8K STEREO VR',
      accentColor: 'text-primary',
    },
    {
      id: 'proj-2',
      category: 'drone',
      categoryLabel: 'Cinematic Drone Operations',
      title: 'Aura Coastline Luxury Resort',
      subtitle: '4K Cinema Drone Aerial Film & FPV Interior Flythrough',
      client: 'St. Regis Partner Group',
      turnaround: '14 Days',
      metricLabel: 'Organic Video Reach',
      metricVal: '4.2M Reach',
      gear: 'DJI Inspire 3 (Full-Frame 8K CinemaDNG), Custom FPV Naked CineLifter with RED Komodo-X, RTK Base Station',
      specs: 'Zero-latency microwave downlink, 120fps high-wind maritime stabilization, multi-spectral color graded in DaVinci Resolve Studio.',
      quote: 'The continuous FPV transition from the open ocean surf directly through the cantilevered presidential suite lobby is one of the most breathtaking visual assets ever commissioned in hospitality.',
      quoter: 'Elena Rostova, Global Brand Director, St. Regis Partner Group',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC43QTTkE9vQdi33UeAI7yBc03Qk0q79GjYeJXWZ-g6XtcLlxmYuI5OmqHFgs7Y5FUVhXZb6r2j2x87EAvNjeLSnjEeoxQBfHNc2k334I-jNrZuDgHH-F9V8wPWsS_InclJS4jTAwdOncyY3zBXWFx3P3VTIESf6ftLX1-uR5d0aS1QxMWg56RXwvhKz4U7wpxBlq7tBzptdA9p8NffYcuKjmfsb6Q6d7nCDcl766caGcZLk2N0ADFH',
      span: 'lg:col-span-5',
      badge: '8K CINEMADNG',
      accentColor: 'text-secondary',
    },
    {
      id: 'proj-3',
      category: 'drone',
      categoryLabel: 'Industrial Drone Inspection',
      title: 'SolarGrid Mega-Plant',
      subtitle: 'Thermal Drone Thermography & Defect Telemetry Mapping',
      client: 'CleanPower Infrastructure',
      turnaround: '8 Days',
      metricLabel: 'Inspection Speed',
      metricVal: '18x Faster',
      gear: 'DJI Matrice 350 RTK, Zenmuse H20T Radiometric Thermal Sensor, Custom Orthomosaic AI Defect Classifier',
      specs: 'Radiometric accuracy within ±2°C, sub-centimeter RTK georeferencing, automated GIS shapefile export.',
      quote: 'Imagine360tours surveyed 1.4 million photovoltaic cells in less than 48 hours flight time, detecting 340 micro-crack anomalies that would have taken human surveyors months to trace.',
      quoter: 'Dr. Aris Thorne, Chief Operations Officer, CleanPower Infra',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK63sh3c7juipKR8ExCC5-n3562zWB_weSKRk7AuYvbW5LtHSd1E4dhcIx51pcPxR8Hv_bscn8j32ESJYJEM2dJSzS_rdxiZL-cz3qGJaFhPHmpV8qZZAStS5KXzjMYcV9zwDemcLGy9WKSSCrbQzjYUK8ewnFaqp0IXMK92LCH8kMZNSH9p3ygkK52ci3qE7YaQvbHaaajf367Fw6mRd5789UOXy3tT26qtvx8Z10UZDBzAZsTqOY',
      span: 'lg:col-span-5',
      badge: 'RADIOMETRIC AI',
      accentColor: 'text-tertiary',
    },
    {
      id: 'proj-4',
      category: 'commercial',
      categoryLabel: 'Commercial Studio Production',
      title: 'Artisan Reserve Single-Malt',
      subtitle: 'Commercial Product Cinematography & Omni-Channel Campaign',
      client: 'Highland Distillers Co.',
      turnaround: '18 Days',
      metricLabel: 'E-Commerce Sellout',
      metricVal: '100% in 72h',
      gear: 'ARRI ALEXA Mini LF, Cooke Anamorphic/i Full Frame Plus Lenses, Bolt High-Speed Cinebot Motion Control',
      specs: '1,000fps high-speed robotic precision liquid pour, bespoke ambient sound design, 40+ customized cutdowns for global media.',
      quote: 'The robotic arm slow-motion liquid captures were hypnotic. Imagine360tours established an entirely new aesthetic baseline for our heritage whisky line, driving complete holiday stock sellout in 72 hours.',
      quoter: 'Alastair MacInnes, Head of Global Marketing, Highland Distillers',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-s6UqsejTGxFoAwlMWDq6Mr9g_7uumsoUKXiRHaXrpRjUvPEeClWvHcduKrz-uJ_8BBg3fFs02OVRrfkkrjVQqFqeoPjfdkDzt6nAihxNqPX8AgncNn7TyL3_4sBMFrDeiLcfP2s82Z0QZn5pMm0IJaU1PB5jDS7Bmkczi0JczeB_y4HluphpbD0lxy4wNbZMrCMXCwaLwGNEX86QwoYpoNxUbcMkGc3roQdlk2QQ8HdgFryQjhWA',
      span: 'lg:col-span-7',
      badge: 'ARRI ALEXA LF // 1000FPS',
      accentColor: 'text-primary',
    },
    {
      id: 'proj-5',
      category: 'saas',
      categoryLabel: 'Enterprise SaaS Billing Engine',
      title: 'FinScale Enterprise',
      subtitle: 'GST Billing & Real-Time POS Cloud Infrastructure',
      client: 'RetailHub Omnichannel',
      turnaround: '45 Days',
      metricLabel: 'Invoice Pipeline Speed',
      metricVal: '12,500 TPS',
      gear: 'Kubernetes Microservices, Apache Kafka, Golang Event Loop, React Vite UI, Multi-Region Postgres',
      specs: 'Sub-50ms sync with government tax portals, offline-first SQLite synchronization, distributed ledger audit logging.',
      quote: 'Moving to Imagine360tours FinScale engine reduced invoice generation latency from 1.8 seconds down to 18 milliseconds across our 480 storefronts, while automating complete tax compliance.',
      quoter: 'Siddharth Rao, Chief Technology Officer, RetailHub',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-DdLhi15AhvAyyYE0VlrvSr_Deel9LnqYeSVrTW8TudQadhCj1flI77wc0vR0AYWvrLy1rzFMbqzlBHjnOq48UiT4HnI8Rpmz2ctRklUBPpoPyDH7SgmbWBt2PXAkmaxIwWzb1DuRQ8bLbDLBfg0B7e2CqIY1pL-7Kh_NzH4ZPDPyA27xIKvUJfs6A--dSNF9_m90cKqr_3kXaxRG-QJuHZpwel5DBoPHfJwqZTpH1k-haOxurcXp',
      span: 'lg:col-span-6',
      badge: '18MS PIPELINE',
      accentColor: 'text-primary',
    },
    {
      id: 'proj-6',
      category: 'saas',
      categoryLabel: 'Hospitality Booking SaaS',
      title: 'Grand Horizon Boutique Hotels',
      subtitle: 'Central Reservation Engine & OTA Channel Sync System',
      client: 'Horizon Luxury Group',
      turnaround: '30 Days',
      metricLabel: 'Direct Booking Surge',
      metricVal: '+44% Conversion',
      gear: 'Node.js Microservices, Redis Distributed Locks, Next.js Edge Runtime, Webhook Sync Engine',
      specs: 'Sub-second bidirectional synchronization across Airbnb, Booking.com, and Expedia via two-way XML webhooks.',
      quote: 'We eliminated overbooking errors entirely across 12 resort properties while direct booking conversions jumped 44% thanks to the lightning-fast instant checkout experience.',
      quoter: "Camilla D'Souza, VP Digital Strategy, Horizon Group",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBayJaM_0E01jiJklRcpX0tAtDzjrde4v7JkUnHlqAsteBDzrixlDRc_LwWje4Rsl_VZ5dQs47o95cWJSZdz78D4-WKCqUGOmUtfV9b9RGUDfKZsQzYOIAShKkxR0SAG-kqPmuHPTxhan-toAsmxQKVEMsQEX1jnoU4KuK42RzUnwdwdiOIDrStCyBxIVelus_Nj9nXxloMYotnMw43RDOdi_n4D6p58TNegnHpUIHfw-OAdAvtwc3c',
      span: 'lg:col-span-6',
      badge: 'ZERO DRIFT SYNC',
      accentColor: 'text-secondary',
    },
  ];

  const filteredProjects = projects.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Telemetry & Header Section */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 w-[30rem] h-[30rem] rounded-full bg-secondary-container/20 blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col gap-6 relative z-10">
          {/* Breadcrumb & Monospace Telemetry */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-outline font-label-sm text-xs uppercase tracking-wider">
              <span className="text-primary font-bold">IMAGINE360 // PORTFOLIO</span>
              <span>/</span>
              <span className="text-on-surface-variant">ENGINEERING ARCHIVE</span>
              <span>/</span>
              <span className="text-tertiary">V4.9 LIVE</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-tertiary font-label-sm text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                64 RELEASES VERIFIED
              </div>
              <div className="hidden md:flex items-center gap-2 text-outline font-label-sm text-xs">
                <span className="material-symbols-outlined text-sm text-primary">terminal</span>
                INDEX LATENCY: 14MS
              </div>
            </div>
          </div>

          {/* Main Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-on-surface tracking-tight font-extrabold leading-tight">
                Curated Works &amp;{' '}
                <span className="bg-gradient-to-r from-primary via-primary-fixed to-secondary bg-clip-text text-transparent">
                  Engineering
                </span>{' '}
                Milestones
              </h1>
              <p className="mt-3 font-body-lg text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                Where hyper-scale enterprise software intersects cinematic lenscraft. Explore commissioned 3D spatial environments, LiDAR drone telemetry, high-impact brand campaigns, and mission-critical cloud engines.
              </p>
            </div>

            {/* Performance Summary Bento Pill */}
            <div className="flex items-center gap-6 p-4 rounded-xl bg-surface-container-low shadow-xl border border-surface-container-high shrink-0">
              <div className="flex flex-col">
                <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">
                  Total Render Hours
                </span>
                <span className="font-headline-sm text-lg sm:text-xl text-primary font-bold">
                  42,800+
                </span>
              </div>
              <div className="w-px h-10 bg-surface-container-highest"></div>
              <div className="flex flex-col">
                <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">
                  Flight Telemetry
                </span>
                <span className="font-headline-sm text-lg sm:text-xl text-tertiary font-bold">
                  1,820 KM
                </span>
              </div>
              <div className="w-px h-10 bg-surface-container-highest"></div>
              <div className="flex flex-col">
                <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">
                  SaaS Uptime
                </span>
                <span className="font-headline-sm text-lg sm:text-xl text-secondary font-bold">
                  99.992%
                </span>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="pt-4 pb-2 flex items-center justify-between gap-4 overflow-x-auto">
            <div className="flex items-center gap-2 shrink-0">
              {[
                { id: 'all', label: 'All Works', count: '64' },
                { id: '3d', label: '3D & VR Visualizations', count: '18' },
                { id: 'drone', label: 'Drone Cinematography', count: '22' },
                { id: 'commercial', label: 'Commercial Shoots', count: '14' },
                { id: 'marketing', label: 'Marketing Growth', count: '8' },
                { id: 'saas', label: 'SaaS Deployments', count: '6' },
              ].map((btn) => {
                const isActive = filter === btn.id;
                return (
                  <button
                    key={btn.id}
                    onClick={() => setFilter(btn.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-label-md text-xs transition-all ${
                      isActive
                        ? 'bg-primary text-on-primary font-semibold shadow-[0_0_18px_rgba(76,215,246,0.35)]'
                        : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span>{btn.label}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        isActive ? 'bg-on-primary/20 text-on-primary' : 'bg-surface-container-lowest text-outline'
                      }`}
                    >
                      {btn.count}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="hidden xl:flex items-center gap-2 shrink-0 font-label-sm text-xs text-outline">
              <span className="material-symbols-outlined text-sm">grid_view</span>
              <span>DISPLAY: DYNAMIC MOSAIC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Cards Mosaic Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group ${project.span} flex flex-col rounded-xl bg-surface-container-low shadow-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_0_32px_-6px_rgba(76,215,246,0.3)] hover:-translate-y-1 border border-surface-container-high/60`}
              >
                <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-surface-container">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/30 to-transparent"></div>

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-primary font-label-sm text-[11px] font-semibold tracking-wider uppercase">
                      {project.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-tertiary font-label-sm text-[11px]">
                      <span className="material-symbols-outlined text-xs">view_in_ar</span>
                      <span>{project.badge}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider block">
                        Client
                      </span>
                      <span className="font-headline-sm text-sm sm:text-base text-on-surface font-bold">
                        {project.client}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-label-sm text-xs text-tertiary block font-bold">
                        {project.metricVal}
                      </span>
                      <span className="font-label-sm text-[10px] text-outline">
                        {project.metricLabel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-2 font-label-sm text-xs text-outline">
                      <span className="text-primary font-semibold">MILESTONE #00{idx + 1}</span>
                      <span>//</span>
                      <span className="uppercase">{project.category}</span>
                    </div>
                    <h3 className="font-headline-md text-lg text-on-surface font-bold group-hover:text-primary transition-colors">
                      {project.title} - {project.subtitle}
                    </h3>
                    <p className="mt-2 font-body-md text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {project.quote}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 flex items-center justify-between border-t border-surface-container-high/60">
                    <span className="text-xs text-outline font-label-sm">
                      SLA: <strong className="text-on-surface">{project.turnaround}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1 font-label-sm text-xs text-primary font-bold group-hover:translate-x-1 transition-transform">
                      EXPLORE CASE STUDY <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination bar */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-surface-container-low border border-surface-container-high/60">
            <div className="flex items-center gap-2 font-label-sm text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-primary">data_object</span>
              <span>SHOWING {filteredProjects.length} OF 64 PRODUCTION MILESTONES</span>
              <span className="hidden sm:inline text-outline">• PAGE 01 / 11</span>
            </div>
            <button
              onClick={() => alert('All historical releases cached into local session.')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-xs font-semibold transition-all"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              <span>Load More Projects (8)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Case Study Detail Drawer / Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-background/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface-container-low shadow-2xl p-6 sm:p-8 flex flex-col gap-6 border border-surface-container-high">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Header */}
            <div className="pr-12">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-full bg-primary/20 text-primary font-label-sm text-xs font-bold uppercase tracking-wider">
                  {selectedProject.categoryLabel}
                </span>
                <span className="text-outline font-label-sm text-xs">• COMMISSION ARCHIVE</span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
                {selectedProject.title}
              </h2>
              <p className="text-body-lg text-xs sm:text-sm text-on-surface-variant mt-1">
                {selectedProject.subtitle}
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-surface-container border border-surface-container-high/50">
              <div>
                <span className="block font-label-sm text-[10px] text-outline uppercase tracking-wider">
                  Client Entity
                </span>
                <span className="block font-headline-sm text-sm text-on-surface font-bold truncate">
                  {selectedProject.client}
                </span>
              </div>
              <div>
                <span className="block font-label-sm text-[10px] text-outline uppercase tracking-wider">
                  Turnaround Time
                </span>
                <span className="block font-headline-sm text-sm text-primary font-bold">
                  {selectedProject.turnaround}
                </span>
              </div>
              <div>
                <span className="block font-label-sm text-[10px] text-outline uppercase tracking-wider">
                  {selectedProject.metricLabel}
                </span>
                <span className="block font-headline-sm text-sm text-tertiary font-bold">
                  {selectedProject.metricVal}
                </span>
              </div>
              <div>
                <span className="block font-label-sm text-[10px] text-outline uppercase tracking-wider">
                  Status
                </span>
                <span className="inline-flex items-center gap-1.5 font-label-sm text-xs text-tertiary font-bold mt-1">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                  SHIPPED &amp; LIVE
                </span>
              </div>
            </div>

            {/* Technical Gear & Specs Bento Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-container-high/60 flex flex-col justify-between border border-surface-container-high">
                <div>
                  <div className="flex items-center gap-2 text-primary font-label-sm text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="material-symbols-outlined text-base">memory</span>
                    <span>Hardware &amp; Software Rig</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface leading-relaxed">
                    {selectedProject.gear}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-label-sm text-[11px] text-outline">
                  <span>PIPELINE VERIFIED</span>
                  <span className="material-symbols-outlined text-sm text-tertiary">check_circle</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-high/60 flex flex-col justify-between border border-surface-container-high">
                <div>
                  <div className="flex items-center gap-2 text-secondary font-label-sm text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="material-symbols-outlined text-base">tune</span>
                    <span>Engineering Deliverables</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface leading-relaxed">
                    {selectedProject.specs}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-label-sm text-[11px] text-outline">
                  <span>QA PROTOCOL PASSED</span>
                  <span className="material-symbols-outlined text-sm text-tertiary">verified</span>
                </div>
              </div>
            </div>

            {/* Verified Client Quote Block */}
            <div className="relative p-6 rounded-xl bg-surface-container shadow-inner border border-surface-container-high">
              <span className="material-symbols-outlined text-4xl text-outline-variant/30 absolute top-4 right-4">
                format_quote
              </span>
              <p className="font-body-lg text-sm text-on-surface italic relative z-10 leading-relaxed">
                "{selectedProject.quote}"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                  I360
                </div>
                <div>
                  <span className="block font-body-sm text-xs text-on-surface font-bold">
                    {selectedProject.quoter}
                  </span>
                  <span className="block font-label-sm text-[10px] text-outline">
                    Verified Enterprise Deployment
                  </span>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-xs font-semibold transition-colors"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => {
                  addToCart(
                    `${selectedProject.title} Scope Commission`,
                    '$2,800.00',
                    selectedProject.categoryLabel
                  );
                  setSelectedProject(null);
                  setCurrentPage('book-online');
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-sm text-xs font-bold shadow-[0_0_20px_rgba(76,215,246,0.4)] transition-all"
              >
                <span>Inquire Similar Scope</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
