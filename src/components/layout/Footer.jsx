import React, { useState } from 'react';
import { Zap, CheckCircle2, ArrowUpRight, ArrowUp, Activity, ShieldCheck, Globe, Send, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitToGoogleSheets } from '../../services/sheetsService';

export default function Footer({ onOpenWaitlist, onOpenPartner }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);

    submitToGoogleSheets({
      formType: 'Newsletter Protocol Dispatch (Footer)',
      email: email,
      timestamp: new Date().toISOString()
    });

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.9 },
      colors: ['#299093', '#EF6156', '#FFBD00', '#00D68F']
    });

    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
    }, 400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-[#D8D4C9] dark:border-[#1F2837] bg-[#F5F3ED] dark:bg-[#07090E] transition-colors pt-16 pb-12 sm:pt-24 sm:pb-16 overflow-hidden">
      
      {/* Background Subtle Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#299093_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04] dark:opacity-[0.07] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative">

        {/* Main Architectural Capsule Card */}
        <div className="bg-white dark:bg-[#0E121A] border border-[#D8D4C9] dark:border-[#1F2837] rounded-3xl sm:rounded-[44px] p-6 sm:p-12 lg:p-16 shadow-xl mb-12 relative overflow-hidden">
          
          {/* Top Row: Brand Monogram + Status Pill + Scroll to Top */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-[#D8D4C9] dark:border-white/10">
            
            {/* Brand Identity */}
            <div className="flex items-center gap-3.5">
              <div 
                onClick={scrollToTop}
                className="w-12 h-12 rounded-full bg-[#061A1E] dark:bg-white text-white dark:text-[#061A1E] flex items-center justify-center font-bold shadow-md cursor-pointer hover:scale-105 transition-transform shrink-0"
                title="Return to top"
              >
                <Zap className="w-6 h-6 fill-current stroke-current" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-['Syne'] font-extrabold text-3xl tracking-tighter text-[#061A1E] dark:text-white">
                    ONUZ
                  </span>
                  <span className="font-mono-tech text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#299093]/15 text-[#299093] dark:text-[#38b2b6] border border-[#299093]/30">
                    BETA 2026
                  </span>
                </div>
                <p className="font-mono-tech text-[10px] tracking-wider uppercase text-[#8E8B82] dark:text-slate-400">
                  Universal EV Charging Operating System
                </p>
              </div>
            </div>

            {/* Live Telemetry & Node Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D68F]/10 border border-[#00D68F]/30 text-[#00D68F] font-mono-tech text-xs">
                <span className="w-2 h-2 rounded-full bg-[#00D68F] animate-pulse" />
                <span>GRID DISPATCH: 99.99% HEALTH</span>
              </div>

              <button
                onClick={scrollToTop}
                type="button"
                className="w-10 h-10 rounded-full border border-[#D8D4C9] dark:border-[#374151] bg-[#F5F3ED] dark:bg-[#131924] text-[#061A1E] dark:text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
                aria-label="Scroll to top"
                title="Back to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Middle Content: Directory Columns + Protocol Dispatch Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 py-12 border-b border-[#D8D4C9] dark:border-white/10">
            
            {/* Col 1: Mission Statement & Protocol Standards */}
            <div className="lg:col-span-4 space-y-5">
              <span className="font-mono-tech text-xs font-bold text-[#8E8B82] dark:text-slate-400 tracking-wider uppercase block">
                [CORE ARCHITECTURE]
              </span>
              <p className="text-xl sm:text-2xl font-['Syne'] font-bold text-[#061A1E] dark:text-white leading-tight">
                Every charger. One app. <span className="text-[#299093] dark:text-[#38b2b6]">Zero queue anxiety.</span>
              </p>
              <p className="text-sm text-[#061A1E]/75 dark:text-slate-300 leading-relaxed font-sans">
                Universal OCPI 2.2 broker aggregating Tata Power, Zeon, Shell, ChargeZone, and Statiq into a single automated slot hold & one-tap payment engine.
              </p>

              <div className="pt-2 font-mono-tech text-xs text-[#8E8B82] space-y-1.5">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#299093]" />
                  <span>OCPI v2.2.1-d2 & OCPP v1.6J / 2.0.1</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#EF6156]" />
                  <span>HQ: 100 Ft Rd, Indiranagar, Bengaluru, KA 560038</span>
                </div>
              </div>
            </div>

            {/* Col 2: Navigation Directory */}
            <div className="lg:col-span-2 space-y-3 font-mono-tech text-xs uppercase">
              <span className="font-bold text-[#061A1E] dark:text-white tracking-wider block mb-4">
                [SYSTEM DIRECTORY]
              </span>
              <ul className="space-y-2.5 text-[#061A1E]/80 dark:text-slate-300 font-semibold">
                <li>
                  <a href="#overview" className="hover:text-[#299093] dark:hover:text-[#38b2b6] transition-colors block py-0.5">
                    [01] SYSTEM
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-[#299093] dark:hover:text-[#38b2b6] transition-colors block py-0.5">
                    [02] FEATURES
                  </a>
                </li>
                <li>
                  <a href="#simulator" className="hover:text-[#299093] dark:hover:text-[#38b2b6] transition-colors block py-0.5">
                    [03] APP OS SIM
                  </a>
                </li>
                <li>
                  <a href="#networks" className="hover:text-[#299093] dark:hover:text-[#38b2b6] transition-colors block py-0.5">
                    [04] NETWORKS
                  </a>
                </li>
                <li>
                  <a href="#partner" onClick={onOpenPartner} className="hover:text-[#299093] dark:hover:text-[#38b2b6] transition-colors block py-0.5">
                    [05] CPO PORTAL
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#299093] dark:hover:text-[#38b2b6] transition-colors block py-0.5">
                    [06] FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: CPO & Enterprise Integrations */}
            <div className="lg:col-span-2 space-y-3 font-mono-tech text-xs uppercase">
              <span className="font-bold text-[#061A1E] dark:text-white tracking-wider block mb-4">
                [OPERATORS & CPOS]
              </span>
              <ul className="space-y-2.5 text-[#061A1E]/80 dark:text-slate-300 font-semibold">
                <li>
                  <button onClick={onOpenPartner} className="hover:text-[#299093] dark:hover:text-[#38b2b6] transition-colors text-left block py-0.5 cursor-pointer">
                    CPO REVENUE ONBOARDING
                  </button>
                </li>
                <li>
                  <a href="#networks" className="hover:text-[#299093] dark:hover:text-[#38b2b6] transition-colors block py-0.5">
                    OCPI 2.2 ROAMING FEED
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-[#299093] dark:hover:text-[#38b2b6] transition-colors block py-0.5">
                    SMART QUEUE REASONING
                  </a>
                </li>
                <li>
                  <button onClick={onOpenWaitlist} className="hover:text-[#EF6156] transition-colors text-left block py-0.5 cursor-pointer">
                    DRIVER EARLY ACCESS
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Technical Protocol Dispatch Form */}
            <div className="lg:col-span-4 space-y-4">
              <span className="font-mono-tech text-xs font-bold text-[#061A1E] dark:text-white tracking-wider uppercase block">
                [PROTOCOL DISPATCH / BETA UPDATES]
              </span>
              <p className="text-xs text-[#061A1E]/70 dark:text-slate-400 leading-relaxed font-sans">
                Subscribe for private beta releases, CPO interoperability updates, and highway EV corridor launch announcements.
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-2.5">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="driver@onuz.in"
                      className="flex-1 px-4 py-3 rounded-full bg-[#F5F3ED] dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] text-xs text-[#061A1E] dark:text-white font-mono-tech placeholder:text-[#8E8B82] focus:outline-none focus:border-[#061A1E] dark:focus:border-white transition-colors"
                    />
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="btn-onuz px-5 h-11 text-xs group shrink-0"
                    >
                      <span className="wipe-layer wipe-layer-1 bg-[#299093]" />
                      <span className="wipe-layer wipe-layer-2 bg-[#EF6156]" />
                      <span className="wipe-layer wipe-layer-3 bg-[#FFBD00]" />
                      <span className="btn-content flex items-center gap-1.5">
                        <span className="group-hover:text-[#061A1E] transition-colors">
                          {loading ? 'SYNCING...' : 'DISPATCH'}
                        </span>
                        <Send className="w-3.5 h-3.5 group-hover:text-[#061A1E]" />
                      </span>
                    </button>
                  </div>
                  <p className="text-[10px] font-mono-tech text-[#8E8B82]">
                    * NO SPAM. Strictly technical release announcements & beta invites.
                  </p>
                </form>
              ) : (
                <div className="p-4 rounded-2xl bg-[#00D68F]/15 border border-[#00D68F]/30 text-xs font-mono-tech text-[#00D68F] flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Subscribed successfully! Welcome to ONUZ Protocol Dispatch.</span>
                </div>
              )}
            </div>

          </div>

          {/* Bottom Bar: Copyright, Compliance, Links */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-xs text-[#8E8B82] dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span>© 2026 ONUZ PROTOCOL (onuz.in).</span>
              <span className="hidden sm:inline">•</span>
              <span>ALL RIGHTS RESERVED.</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
              <span className="text-[#061A1E] dark:text-white font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00D68F]" />
                OCPI 2.2 CERTIFIED
              </span>
              <span>•</span>
              <span className="hover:text-[#061A1E] dark:hover:text-white transition-colors cursor-pointer">PRIVACY PROTOCOL</span>
              <span>•</span>
              <span className="hover:text-[#061A1E] dark:hover:text-white transition-colors cursor-pointer">TERMS OF GRID</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}

