import React from 'react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-surface-container-high/40">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Top 6 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 mb-12">
          {/* Col 1 */}
          <div>
            <h4 className="font-label-sm text-xs uppercase text-primary mb-4 tracking-wider font-semibold">
              3D Visualization
            </h4>
            <ul className="space-y-2 text-xs font-body-sm text-on-surface-variant">
              <li
                onClick={() => setCurrentPage('3d-visualization')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Spatial Rendering
              </li>
              <li
                onClick={() => setCurrentPage('3d-visualization')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Real-time Configurator
              </li>
              <li
                onClick={() => setCurrentPage('3d-visualization')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Architectural Walkthroughs
              </li>
              <li
                onClick={() => setCurrentPage('3d-visualization')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                CAD Synthesis
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-label-sm text-xs uppercase text-primary mb-4 tracking-wider font-semibold">
              Drone Operations
            </h4>
            <ul className="space-y-2 text-xs font-body-sm text-on-surface-variant">
              <li
                onClick={() => setCurrentPage('drone-operations')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Aerial Photogrammetry
              </li>
              <li
                onClick={() => setCurrentPage('drone-operations')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Cinematic Capture
              </li>
              <li
                onClick={() => setCurrentPage('drone-operations')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                LiDAR Mapping
              </li>
              <li
                onClick={() => setCurrentPage('drone-operations')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Inspection Services
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-label-sm text-xs uppercase text-primary mb-4 tracking-wider font-semibold">
              Commercial Shoots
            </h4>
            <ul className="space-y-2 text-xs font-body-sm text-on-surface-variant">
              <li
                onClick={() => setCurrentPage('commercial-shoots')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Brand Campaigns
              </li>
              <li
                onClick={() => setCurrentPage('commercial-shoots')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Studio Production
              </li>
              <li
                onClick={() => setCurrentPage('commercial-shoots')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Product Editorial
              </li>
              <li
                onClick={() => setCurrentPage('commercial-shoots')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Post-Production VFX
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-label-sm text-xs uppercase text-primary mb-4 tracking-wider font-semibold">
              Digital Marketing
            </h4>
            <ul className="space-y-2 text-xs font-body-sm text-on-surface-variant">
              <li
                onClick={() => setCurrentPage('digital-marketing')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Growth Engineering
              </li>
              <li
                onClick={() => setCurrentPage('digital-marketing')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Performance Media
              </li>
              <li
                onClick={() => setCurrentPage('digital-marketing')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Brand Architecture
              </li>
              <li
                onClick={() => setCurrentPage('digital-marketing')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Analytics Telemetry
              </li>
            </ul>
          </div>

          {/* Col 5 */}
          <div>
            <h4 className="font-label-sm text-xs uppercase text-primary mb-4 tracking-wider font-semibold">
              Billing Software
            </h4>
            <ul className="space-y-2 text-xs font-body-sm text-on-surface-variant">
              <li
                onClick={() => setCurrentPage('gst-billing')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Enterprise Invoicing
              </li>
              <li
                onClick={() => setCurrentPage('gst-billing')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Usage Metering
              </li>
              <li
                onClick={() => setCurrentPage('gst-billing')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Revenue Reconciliation
              </li>
              <li
                onClick={() => setCurrentPage('gst-billing')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Tax Engine &amp; APIs
              </li>
            </ul>
          </div>

          {/* Col 6 */}
          <div>
            <h4 className="font-label-sm text-xs uppercase text-primary mb-4 tracking-wider font-semibold">
              Booking Engine
            </h4>
            <ul className="space-y-2 text-xs font-body-sm text-on-surface-variant">
              <li
                onClick={() => setCurrentPage('hospitality-crs')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Resource Scheduling
              </li>
              <li
                onClick={() => setCurrentPage('hospitality-crs')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Crew Dispatch
              </li>
              <li
                onClick={() => setCurrentPage('book-online')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Client Self-Service
              </li>
              <li
                onClick={() => setCurrentPage('hospitality-crs')}
                className="hover:text-on-surface transition-colors cursor-pointer"
              >
                Deposit Automation
              </li>
            </ul>
          </div>
        </div>

        {/* Operational Nodes Ribbon */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-4 bg-surface-container-low/50 px-4 sm:px-6 py-4 rounded-xl border border-surface-container-high/40">
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high font-label-sm text-xs text-tertiary">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              All Production Nodes Operational
            </div>
            <span className="font-body-sm text-xs text-on-surface-variant">
              © 2025 Imagine360tours Global Technologies Inc. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-body-sm text-on-surface-variant">
            <a href="#" className="hover:text-on-surface transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-on-surface transition-colors">
              Accessibility Statement
            </a>
            <div className="flex items-center gap-2 pl-2">
              <button
                onClick={() => setCurrentPage('client-dashboard')}
                aria-label="Terminal"
                className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors"
              >
                <span className="material-symbols-outlined text-sm">terminal</span>
              </button>
              <button
                onClick={() => setCurrentPage('services')}
                aria-label="Network"
                className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors"
              >
                <span className="material-symbols-outlined text-sm">public</span>
              </button>
              <button
                onClick={() => setCurrentPage('gst-billing')}
                aria-label="API"
                className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors"
              >
                <span className="material-symbols-outlined text-sm">code</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
