import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const { cart, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen } = useAuth();
  const [isSaaSDropdownOpen, setIsSaaSDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: '3d-visualization', label: '3D Visualization' },
    { id: 'drone-operations', label: 'Drone Ops' },
    { id: 'commercial-shoots', label: 'Commercial Film' },
    { id: 'digital-marketing', label: 'Growth Engine' },
  ];

  const saasLinks = [
    { id: 'gst-billing', label: 'GST Billing SaaS', desc: 'Automated tax & invoice workflow' },
    { id: 'hospitality-crs', label: 'Hospitality CRS', desc: 'Centralized spatial reservations' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.25)] border-b border-surface-container-high/40">
        {/* Top Micro-Telemetry Ribbon */}
        <div className="w-full bg-surface-container-lowest px-4 sm:px-6 lg:px-8 py-1 flex items-center justify-between overflow-x-auto text-[11px] font-label-sm border-b border-surface-container-high/30">
          <div className="flex items-center gap-3 sm:gap-4 whitespace-nowrap text-on-surface-variant">
            <div className="flex items-center gap-1.5 text-tertiary">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-semibold">ENGINE: WEBGL 2.0 (60 FPS STABLE)</span>
            </div>
            <span className="opacity-30">/</span>
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-primary font-bold">BIM/CAD:</span>
              <span>READY (IFC4 &amp; REVIT PIPELINE)</span>
            </div>
            <span className="opacity-30 hidden sm:inline">/</span>
            <div className="hidden md:flex items-center gap-1">
              <span className="text-secondary font-bold">NODES:</span>
              <span>128/128 CLOUD GPUs ONLINE</span>
            </div>
          </div>
          <div className="flex items-center gap-3 font-label-sm text-on-surface-variant whitespace-nowrap">
            <span className="hidden xl:inline">LATENCY: 14MS</span>
            <span className="px-1.5 py-0.5 rounded bg-surface-container text-tertiary font-bold">
              REGION: US-EAST
            </span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="h-20 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <img
                alt="Imagine360tours"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida/AEtjO1UNuqIAHA04wfwPUjq5DOXFcV8ShioKym_-Wc6PC4sVt5mXe0StohNARuHySXnNHaHeRIVKPHtuvh_9SkCF5biUlLPhclLAv0Dzbe2XAZSn_7awl4Kzv8oCzpDIbrLLoTeQ1QB-DXEvhEFFrOygNAzvueOiLeS7e5vE5PYMPBF9QX8EZEyJKOfCZ4B4M65rEkz-HKGarQvXj0bhQ0FKGjhXbwjfi9slckbrEusQKWTCdUfuOLFSNZ2ssKo"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-base sm:text-lg text-on-surface tracking-tight uppercase font-extrabold group-hover:text-primary transition-colors leading-none">
                  Imagine<span className="text-primary">360</span>tours
                </span>
                <span className="hidden lg:inline-flex items-center text-[10px] font-label-sm text-primary tracking-wider uppercase mt-0.5">
                  SYSTEMS // ENTERPRISE
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  className={`px-3 py-2 rounded-lg font-body-sm text-xs 2xl:text-sm font-medium transition-all ${
                    isActive
                      ? 'text-primary font-bold bg-surface-container-high'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* SaaS Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsSaaSDropdownOpen(true)}
              onMouseLeave={() => setIsSaaSDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg font-body-sm text-xs 2xl:text-sm font-medium transition-all ${
                  currentPage === 'gst-billing' || currentPage === 'hospitality-crs'
                    ? 'text-primary font-bold bg-surface-container-high'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
                }`}
              >
                <span>SaaS Solutions</span>
                <span className="material-symbols-outlined text-sm leading-none">expand_more</span>
              </button>

              {isSaaSDropdownOpen && (
                <div className="absolute left-0 top-full pt-1 z-50">
                  <div className="w-64 p-2 rounded-xl bg-surface-container-high border border-surface-container-highest shadow-2xl flex flex-col gap-1 backdrop-blur-xl">
                    {saasLinks.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCurrentPage(item.id);
                          setIsSaaSDropdownOpen(false);
                        }}
                        className="flex flex-col p-2.5 rounded-lg hover:bg-surface-container-highest text-left transition-colors"
                      >
                        <span className="font-body-sm text-xs text-on-surface font-semibold">
                          {item.label}
                        </span>
                        <span className="font-label-sm text-[11px] text-on-surface-variant">
                          {item.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setCurrentPage('book-online')}
              className={`px-3 py-2 rounded-lg font-body-sm text-xs 2xl:text-sm font-medium transition-all ${
                currentPage === 'book-online'
                  ? 'text-primary font-bold bg-surface-container-high'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
              }`}
            >
              Book Online
            </button>

            <button
              onClick={() => setCurrentPage('client-dashboard')}
              className={`px-3 py-2 rounded-lg font-body-sm text-xs 2xl:text-sm font-medium transition-all ${
                currentPage === 'client-dashboard'
                  ? 'text-primary font-bold bg-surface-container-high'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
              }`}
            >
              Client Area
            </button>
          </nav>

          {/* Action cluster on right */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View shopping cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-surface-container-high hover:bg-surface-container-highest hover:text-on-surface transition-all text-on-surface-variant"
            >
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-on-primary font-label-sm text-[11px] font-bold shadow-[0_0_12px_rgba(76,215,246,0.5)]">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Book Session CTA */}
            <button
              onClick={() => setCurrentPage('book-online')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-primary-container hover:bg-primary font-body-sm text-xs text-on-primary font-bold transition-all shadow-[0_0_24px_-4px_rgba(6,182,212,0.3)]"
            >
              Book Session
            </button>

            {/* User Profile Avatar / Access Modal Trigger */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="relative block w-9 h-9 rounded-full overflow-hidden ring-1 ring-outline-variant hover:ring-primary transition-all shrink-0"
              title="Open Access Control / Sign In"
            >
              <img
                alt="User avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XzXsbI_8JUfDt9h-pa8QL9e9nZviXl0Qpd5JV4C4OBa0MLOdt2hAHkjK9fL5ffZ41SVlWi4nm-ACnp-2IFn-K1vvc-QIjbOh7PtpdnqwAVVCwnlzXLQrE1Z3Y3UKF-Z0cM3zVB9xKarAOmAbNKQwyNedvPxH5O0bIB6oX_udQO9jhtRB36bvbkmxguu3D3dTNNCOTywU108oKqGOadBQA6iJJboRyJh1eD8aFOofp-qBlCKaKCG6eoJzc"
              />
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-surface-container-lowest border-t border-surface-container-high px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg font-body-sm text-sm ${
                  currentPage === link.id
                    ? 'text-primary font-bold bg-surface-container-high'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-surface-container-high">
              <span className="text-[10px] font-label-sm text-outline px-3 uppercase tracking-wider block mb-1">
                SaaS Platforms
              </span>
              {saasLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg font-body-sm text-sm ${
                    currentPage === item.id
                      ? 'text-primary font-bold bg-surface-container-high'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="pt-2 border-t border-surface-container-high">
              <button
                onClick={() => {
                  setCurrentPage('book-online');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-primary font-bold"
              >
                Book Online Dispatch
              </button>
              <button
                onClick={() => {
                  setCurrentPage('client-dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-tertiary font-bold"
              >
                Client Dashboard
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
