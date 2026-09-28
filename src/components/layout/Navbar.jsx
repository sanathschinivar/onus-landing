import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';

export default function Navbar({ onOpenWaitlist, onOpenPartner, darkMode, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#F5F3ED]/95 dark:bg-[#07090E]/95 backdrop-blur-md border-b border-[#D8D4C9] dark:border-[#1F2837] transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Brand Monogram */}
          <div 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#061A1E] dark:bg-white flex items-center justify-center text-white dark:text-[#061A1E] transition-transform duration-300 group-hover:scale-105 shadow-sm shrink-0">
              <Zap className="w-4 sm:w-5 h-4 sm:h-5 fill-current stroke-current" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                <span className="font-['Syne'] font-extrabold text-xl sm:text-2xl tracking-tighter text-[#061A1E] dark:text-white leading-none">
                  ONUZ
                </span>
                <span className="font-mono-tech text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#299093]/15 text-[#299093] dark:text-[#38b2b6] border border-[#299093]/30">
                  BETA
                </span>
              </div>
              <span className="font-mono-tech text-[8px] sm:text-[9px] tracking-wider uppercase text-[#8E8B82] dark:text-slate-400">
                UNIVERSAL EV CHARGING
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (>= 1024px only) */}
          <nav className="navbar-desktop-only hidden lg:flex items-center gap-6 xl:gap-8 font-mono-tech text-xs tracking-wider uppercase font-semibold text-[#061A1E]/80 dark:text-slate-300">
            <a href="#overview" className="hover:text-[#299093] dark:hover:text-[#38b2b6] transition-colors py-1">
              [01] SYSTEM
            </a>
            <a href="#features" className="hover:text-[#299093] dark:hover:text-[#38b2b6] transition-colors py-1">
              [02] FEATURES
            </a>
            <a href="#simulator" className="hover:text-[#299093] dark:hover:text-[#38b2b6] transition-colors py-1 flex items-center gap-1.5">
              <span>[03] APP OS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF6156] animate-pulse"></span>
            </a>
            <a href="#networks" className="hover:text-[#299093] dark:hover:text-[#38b2b6] transition-colors py-1">
              [04] NETWORKS
            </a>
            <a href="#partner" className="hover:text-[#299093] dark:hover:text-[#38b2b6] transition-colors py-1">
              [05] CPO PORTAL
            </a>
            <a href="#faq" className="hover:text-[#299093] dark:hover:text-[#38b2b6] transition-colors py-1">
              [06] FAQ
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Theme Toggle Button (Always visible on all screen sizes) */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 shrink-0 ${
                darkMode 
                  ? 'bg-[#131924] border-[#374151] text-[#FFBD00]' 
                  : 'bg-white border-[#D8D4C9] text-[#061A1E]'
              }`}
              aria-label="Toggle Theme"
              title={darkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {darkMode ? (
                <Sun className="w-4 sm:w-5 h-4 sm:h-5 text-[#FFBD00]" />
              ) : (
                <Moon className="w-4 sm:w-5 h-4 sm:h-5 text-[#061A1E]" />
              )}
            </button>

            {/* Desktop-Only Lead Buttons (>= 1024px) */}
            <div className="navbar-desktop-only hidden lg:flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenPartner}
                className="btn-onuz-outline group"
              >
                <span className="wipe-layer wipe-layer-1 bg-[#FFBD00]" />
                <span className="wipe-layer wipe-layer-2 bg-[#EF6156]" />
                <span className="wipe-layer wipe-layer-3 bg-[#061A1E]" />
                <span className="btn-content">
                  <span>FOR CPOS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>

              <button
                type="button"
                onClick={onOpenWaitlist}
                className="btn-onuz group"
              >
                <span className="wipe-layer wipe-layer-1 bg-[#EF6156]" />
                <span className="wipe-layer wipe-layer-2 bg-[#299093]" />
                <span className="wipe-layer wipe-layer-3 bg-[#FFBD00]" />
                <span className="btn-content">
                  <span className="group-hover:text-[#061A1E] transition-colors duration-300">EARLY ACCESS</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-[#061A1E] transition-colors duration-300" />
                </span>
              </button>
            </div>

            {/* Hamburger Button (Small Screens < 1024px) */}
            <div className="navbar-mobile-only flex lg:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0 ${
                  darkMode 
                    ? 'bg-[#131924] border-[#374151] text-white' 
                    : 'bg-white border-[#D8D4C9] text-[#061A1E]'
                }`}
                aria-label="Open Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Full-Screen Mobile Drawer for Small Screens */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-only lg:hidden fixed inset-0 z-50 bg-[#F5F3ED] dark:bg-[#07090E] text-[#061A1E] dark:text-white flex flex-col justify-between p-6 sm:p-8 animate-in fade-in duration-200 overflow-y-auto">
          
          {/* Drawer Header with Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-[#D8D4C9] dark:border-[#1F2837] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#061A1E] dark:bg-white text-white dark:text-[#061A1E] flex items-center justify-center font-bold">
                <Zap className="w-4 h-4 fill-current stroke-current" />
              </div>
              <span className="font-['Syne'] font-extrabold text-2xl tracking-tighter">
                ONUZ
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle in Drawer */}
              <button
                type="button"
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-md ${
                  darkMode 
                    ? 'bg-[#131924] border-[#374151] text-[#FFBD00]' 
                    : 'bg-white border-[#D8D4C9] text-[#061A1E]'
                }`}
                aria-label="Toggle Theme"
              >
                {darkMode ? <Sun className="w-5 h-5 text-[#FFBD00]" /> : <Moon className="w-5 h-5 text-[#061A1E]" />}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-[#D8D4C9] dark:border-[#1F2837] bg-white dark:bg-[#131924] text-[#061A1E] dark:text-white flex items-center justify-center shadow-md active:scale-95"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Navigation Links */}
          <div className="py-6 space-y-2 font-mono-tech uppercase text-base">
            <a 
              href="#overview" 
              onClick={() => handleNavClick('overview')}
              className="block py-3 border-b border-[#D8D4C9]/60 dark:border-white/10 flex items-center justify-between hover:text-[#299093] transition-colors"
            >
              <span>[01] SYSTEM OVERVIEW</span>
              <ArrowUpRight className="w-4 h-4 text-[#8E8B82]" />
            </a>
            <a 
              href="#features" 
              onClick={() => handleNavClick('features')}
              className="block py-3 border-b border-[#D8D4C9]/60 dark:border-white/10 flex items-center justify-between hover:text-[#299093] transition-colors"
            >
              <span>[02] FEATURES & REASONING</span>
              <ArrowUpRight className="w-4 h-4 text-[#8E8B82]" />
            </a>
            <a 
              href="#simulator" 
              onClick={() => handleNavClick('simulator')}
              className="block py-3 border-b border-[#D8D4C9]/60 dark:border-white/10 flex items-center justify-between hover:text-[#299093] transition-colors"
            >
              <span>[03] APP SIMULATOR</span>
              <span className="w-2 h-2 rounded-full bg-[#EF6156] animate-pulse"></span>
            </a>
            <a 
              href="#networks" 
              onClick={() => handleNavClick('networks')}
              className="block py-3 border-b border-[#D8D4C9]/60 dark:border-white/10 flex items-center justify-between hover:text-[#299093] transition-colors"
            >
              <span>[04] CONNECTED NETWORKS</span>
              <ArrowUpRight className="w-4 h-4 text-[#8E8B82]" />
            </a>
            <a 
              href="#partner" 
              onClick={() => { setMobileMenuOpen(false); onOpenPartner(); }}
              className="block py-3 border-b border-[#D8D4C9]/60 dark:border-white/10 flex items-center justify-between hover:text-[#299093] transition-colors"
            >
              <span>[05] FOR CPO PARTNERS</span>
              <ArrowUpRight className="w-4 h-4 text-[#8E8B82]" />
            </a>
            <a 
              href="#faq" 
              onClick={() => handleNavClick('faq')}
              className="block py-3 border-b border-[#D8D4C9]/60 dark:border-white/10 flex items-center justify-between hover:text-[#299093] transition-colors"
            >
              <span>[06] FAQ</span>
              <ArrowUpRight className="w-4 h-4 text-[#8E8B82]" />
            </a>
          </div>

          {/* Dedicated Full-Width Lead Buttons inside Hamburger Drawer with Multi-Layer Colorful Wipe */}
          <div className="pt-4 pb-2 space-y-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setTimeout(() => setMobileMenuOpen(false), 200);
                onOpenWaitlist();
              }}
              className="w-full btn-onuz h-12 text-sm justify-center shadow-lg group"
            >
              <span className="wipe-layer wipe-layer-1 bg-[#EF6156]" />
              <span className="wipe-layer wipe-layer-2 bg-[#299093]" />
              <span className="wipe-layer wipe-layer-3 bg-[#FFBD00]" />
              <span className="btn-content">
                <span className="group-hover:text-[#061A1E] transition-colors duration-300">EARLY ACCESS / WAITLIST</span>
                <ArrowUpRight className="w-4 h-4 group-hover:text-[#061A1E] transition-colors duration-300" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setTimeout(() => setMobileMenuOpen(false), 200);
                onOpenPartner();
              }}
              className="w-full btn-onuz-outline h-12 text-sm justify-center group"
            >
              <span className="wipe-layer wipe-layer-1 bg-[#FFBD00]" />
              <span className="wipe-layer wipe-layer-2 bg-[#EF6156]" />
              <span className="wipe-layer wipe-layer-3 bg-[#061A1E]" />
              <span className="btn-content">
                <span className="group-hover:text-white transition-colors duration-300">FOR CPO OPERATORS</span>
                <ArrowUpRight className="w-4 h-4 group-hover:text-white transition-colors duration-300" />
              </span>
            </button>
          </div>

        </div>
      )}
    </>
  );
}
