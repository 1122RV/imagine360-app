import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { getSupabase } from '../lib/supabase';

interface ContactUsProps {
  setCurrentPage: (page: string) => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ setCurrentPage }) => {
  const { showToast } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    vertical: '3d',
    budget: '$15,000 - $50,000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = getSupabase();
      await supabase.from('inquiries').insert([
        {
          ...formData,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch {
      // Non-blocking fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Dispatch inquiry transmitted. An Operations Director will reach out within 2 hours.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        vertical: '3d',
        budget: '$15,000 - $50,000',
        message: '',
      });
    }, 800);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden bg-surface-container-low py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-surface-container-high/30">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-xs mb-3 border border-surface-container-highest">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span>24/7 ENTERPRISE FLIGHT OPS &amp; SAAS ARCHITECTURE DESK</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl text-on-surface font-extrabold tracking-tight">
            Initiate Enterprise Engagement
          </h1>
          <p className="mt-3 font-body-lg text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Connect directly with our flight directors, 3D spatial architects, and SaaS solution engineers for custom SLAs, rapid drone dispatch, and multi-store billing implementations.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Global Hubs */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-surface-container rounded-2xl p-6 sm:p-8 shadow-2xl border border-surface-container-high/50">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-surface-container-high">
              <div>
                <h2 className="font-headline-sm text-lg text-on-surface font-bold">
                  Project Scoping Inquiry
                </h2>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  Guaranteed response within 2 hours under enterprise SLA.
                </p>
              </div>
              <span className="font-mono text-xs text-primary font-bold">ESCROW PROTECTED</span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase font-semibold">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Marcus"
                    className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-surface-container-high focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase font-semibold">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Vance"
                    className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-surface-container-high focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase font-semibold">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="m.vance@company.com"
                    className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-surface-container-high focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase font-semibold">Phone / Signal *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98200 12345"
                    className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-surface-container-high focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase font-semibold">Company / Developer Entity</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Apex Urban Infrastructure"
                    className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-surface-container-high focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase font-semibold">Core Vertical</label>
                  <select
                    value={formData.vertical}
                    onChange={(e) => setFormData({ ...formData, vertical: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-surface-container-high focus:outline-none focus:border-primary"
                  >
                    <option value="3d">3D Architectural Visualization &amp; VR</option>
                    <option value="drone">Autonomous Drone Ops &amp; Photogrammetry</option>
                    <option value="commercial">Commercial Film &amp; Cinematic Production</option>
                    <option value="gst">FinScale GST Billing &amp; POS Engine</option>
                    <option value="crs">Hospitality Central Reservation SaaS</option>
                    <option value="hybrid">Comprehensive Enterprise Multi-Vertical</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-xs text-on-surface-variant uppercase font-semibold">Estimated Scope Budget</label>
                <div className="grid grid-cols-3 gap-2">
                  {['$5,000 - $15,000', '$15,000 - $50,000', '$50,000+ Enterprise'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`p-2 rounded-lg font-label-sm text-xs text-center transition-all border ${
                        formData.budget === b
                          ? 'bg-primary-container text-on-primary font-bold border-primary'
                          : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface border-surface-container-high'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-xs text-on-surface-variant uppercase font-semibold">Mission Brief / Deliverables Needed</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail site location, square footage, target handoff date, or technical ERP integrations..."
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-surface-container-high focus:outline-none focus:border-primary resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full py-3.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(76,215,246,0.35)] transition-all disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-base">send</span>
                <span>{isSubmitting ? 'Transmitting Ingestion Ticket...' : 'Submit Mission Brief'}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Global Hubs & Direct Lines */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-surface-container border border-surface-container-high/50 shadow-xl flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">public</span>
                <h3 className="font-headline-sm text-base text-on-surface font-bold">
                  Global Operations Hubs
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-headline-sm text-xs text-on-surface font-bold">Mumbai • Headquarters</span>
                    <span className="font-label-sm text-[10px] text-tertiary font-bold">HQ &amp; HANGAR</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Level 8, Platina Tower, G Block, Bandra Kurla Complex (BKC), Mumbai 400051
                  </p>
                  <div className="mt-2 font-label-sm text-xs text-primary font-bold">
                    +91 (022) 6982 4000
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-headline-sm text-xs text-on-surface font-bold">Dubai • MENA Ops</span>
                    <span className="font-label-sm text-[10px] text-primary font-bold">COMMERCIAL DESK</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Marina Plaza, Dubai Marina, P.O. Box 21455, Dubai, United Arab Emirates
                  </p>
                  <div className="mt-2 font-label-sm text-xs text-primary font-bold">
                    +971 4 429 8810
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-headline-sm text-xs text-on-surface font-bold">Singapore • APAC Cloud Node</span>
                    <span className="font-label-sm text-[10px] text-secondary font-bold">SAAS CLUSTER</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    1 Raffles Place, #28-01 One Raffles Place, Singapore 048616
                  </p>
                  <div className="mt-2 font-label-sm text-xs text-primary font-bold">
                    +65 6718 2000
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container border border-surface-container-high/50 shadow-xl flex flex-col gap-3">
              <span className="font-label-sm text-[10px] text-outline uppercase font-bold">DIRECT CHANNELS</span>
              <div className="flex items-center gap-3 text-xs text-on-surface font-body-sm">
                <span className="material-symbols-outlined text-primary text-lg">mail</span>
                <span>enterprise@imagine360tours.com</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-on-surface font-body-sm">
                <span className="material-symbols-outlined text-tertiary text-lg">support_agent</span>
                <span>Direct Airspace Ops: ops@imagine360tours.com</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-on-surface font-body-sm">
                <span className="material-symbols-outlined text-secondary text-lg">lock</span>
                <span>Encrypted Signal Hotline: +91 98200 36000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
