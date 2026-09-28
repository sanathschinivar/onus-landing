import React, { useState, useEffect } from 'react';
import { Zap, ArrowUpRight, CheckCircle2, RefreshCw, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitToGoogleSheets } from '../../services/sheetsService';
import { useLatencyPing } from '../../hooks/useLatencyPing';

export default function Hero({ onOpenWaitlist, onOpenPartner }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isPlugged, setIsPlugged] = useState(true);
  
  const [liveKw, setLiveKw] = useState(148);
  const [voltage, setVoltage] = useState(800);
  const [liveAmps, setLiveAmps] = useState(185);
  const [liveGunsCount, setLiveGunsCount] = useState(18428);
  const [holdTimerSeconds, setHoldTimerSeconds] = useState(900);
  const [isHoldActive, setIsHoldActive] = useState(true);

  // Modular latency ping hook
  const { latencyMs, isTesting, measureLatency } = useLatencyPing();

  useEffect(() => {
    const gunsInterval = setInterval(() => {
      setLiveGunsCount(prev => prev + (Math.random() > 0.4 ? 1 : -1));
    }, 6000);
    return () => clearInterval(gunsInterval);
  }, []);

  useEffect(() => {
    if (!isHoldActive) return;
    const countdown = setInterval(() => {
      setHoldTimerSeconds(prev => (prev > 0 ? prev - 1 : 900));
    }, 1000);
    return () => clearInterval(countdown);
  }, [isHoldActive]);

  useEffect(() => {
    if (!isPlugged) {
      setLiveKw(0);
      setLiveAmps(0);
      return;
    }
    const interval = setInterval(() => {
      const newKw = Math.floor(144 + Math.random() * 12);
      setLiveKw(newKw);
      const calculatedAmps = Number(((newKw * 1000) / voltage).toFixed(1));
      setLiveAmps(calculatedAmps);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlugged, voltage]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    submitToGoogleSheets({
      formType: 'EV Driver Waitlist (Hero Top)',
      email: email,
      spotNumber: '#1483'
    });

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#EF6156', '#299093', '#FFBD00', '#061A1E']
    });

    setSubmitted(true);
  };

  return (
    <section id="overview" className="relative pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Protocol Status Telemetry Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 sm:pb-8 border-b border-[#D8D4C9] dark:border-[#1F2837] mb-8 sm:mb-12 text-xs font-mono-tech uppercase text-[#8E8B82] dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#299093] animate-ping-soft shrink-0" />
            <span className="font-bold text-[#061A1E] dark:text-white">OCPI 2.2 PROTOCOL ACTIVE</span>
            <span className="hidden sm:inline">• PAN-INDIA AGGREGATION</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <span>[NETWORKS: 14]</span>
            <span className="font-semibold">[GUNS: {liveGunsCount.toLocaleString()}]</span>
            
            <button
              onClick={measureLatency}
              title="Click to perform real-time latency ping test"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EF6156]/15 text-[#EF6156] border border-[#EF6156]/30 font-bold hover:bg-[#EF6156]/25 transition-all cursor-pointer text-[11px]"
            >
              <RefreshCw className={`w-3 h-3 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{latencyMs}MS LATENCY</span>
            </button>
          </div>
        </div>

        {/* Typographic Hero Banner */}
        <div className="max-w-5xl mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-extrabold tracking-tight text-[#061A1E] dark:text-white leading-[1.1] sm:leading-[1.02]">
            Every{' '}
            <span className="headline-pill bg-[#061A1E] text-white dark:bg-white dark:text-[#061A1E] text-[0.8em]">
              Charger
            </span>
            .{' '}
            <br className="hidden sm:block" />
            One{' '}
            <span className="headline-pill bg-[#EF6156] text-white text-[0.8em]">
              App
            </span>
            .{' '}
            <br className="hidden md:block" />
            The universal{' '}
            <span className="headline-pill bg-[#299093] text-white text-[0.8em]">
              Intelligence
            </span>{' '}
            layer for EV charging.
          </h1>

          <div className="mt-6 sm:mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pt-2">
            <p className="text-base sm:text-xl text-[#061A1E]/80 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
              Finding the perfect charging slot? <strong className="font-bold text-[#061A1E] dark:text-white underline decoration-[#EF6156] decoration-4 underline-offset-4">That's ONUZ.</strong> Universal slot reservation, real-time queue intelligence, and one-tap checkout across Tata Power, Zeon, Shell, and ChargeZone.
            </p>

            {/* Quick Hero Waitlist Form */}
            <div className="w-full md:max-w-md shrink-0">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address..."
                    className="flex-1 px-4 py-3 rounded-full bg-white dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] text-sm text-[#061A1E] dark:text-white placeholder:text-[#8E8B82] focus:outline-none focus:border-[#061A1E] dark:focus:border-white transition-all shadow-sm"
                  />
                  <button type="submit" className="btn-onuz group shrink-0">
                    <span className="wipe-layer wipe-layer-1 bg-[#EF6156]" />
                    <span className="wipe-layer wipe-layer-2 bg-[#299093]" />
                    <span className="wipe-layer wipe-layer-3 bg-[#FFBD00]" />
                    <span className="btn-content">
                      <span className="group-hover:text-[#061A1E] transition-colors">CLAIM SPOT</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:text-[#061A1E] transition-colors" />
                    </span>
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-2xl bg-[#299093]/15 border border-[#299093]/40 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#299093] text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono-tech text-xs font-bold text-[#299093] uppercase">
                      PRIORITY PASS #1,483 ALLOCATED
                    </div>
                    <div className="text-xs text-[#061A1E] dark:text-slate-300">
                      Check your inbox for VIP confirmation & referral perk.
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-2 text-[11px] font-mono-tech text-[#8E8B82] dark:text-slate-400 flex items-center gap-2">
                <span>⚡ NO CREDIT CARD REQUIRED</span>
                <span>•</span>
                <span>EXCLUSIVE PERKS</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Architectural Monoliths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 sm:pt-10">
          
          {/* Left Pillar: Real-Time Network Telemetry */}
          <div className="bg-white dark:bg-[#0E121A] border border-[#D8D4C9] dark:border-[#1F2837] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#061A1E] dark:hover:border-white transition-all">
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <span className="tech-chip">
                  <span className="w-2 h-2 rounded-full bg-[#299093]"></span>
                  TELEMETRY MATRIX
                </span>
                <span className="font-mono-tech text-xs text-[#8E8B82]">[01 / SYNC]</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#061A1E] dark:text-white mb-2 font-['Syne']">
                Pan-India Charger Mesh
              </h3>
              <p className="text-xs sm:text-sm text-[#061A1E]/75 dark:text-slate-400 leading-relaxed mb-6">
                Direct OCPI API telemetry streams gun occupancy, pricing tariffs, and fault diagnostics across 14 networks in sub-second cycles.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#D8D4C9]/60 dark:border-white/10 font-mono-tech text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#8E8B82]">Z-Factor Reliability:</span>
                <span className="font-bold text-[#061A1E] dark:text-white">99.82%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8E8B82]">Active Reservoirs:</span>
                <span className="font-bold text-[#299093]">{liveGunsCount.toLocaleString()} Guns</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8E8B82]">Average Booking Time:</span>
                <span className="font-bold text-[#EF6156]">1.2 Seconds</span>
              </div>
            </div>
          </div>

          {/* Center Pillar: Kinetic Plug Core */}
          <div className="bg-[#061A1E] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl border border-[#061A1E]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#299093]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#EF6156]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 font-mono-tech text-xs uppercase tracking-wider text-[#FFBD00]">
                  <Activity className="w-3.5 h-3.5 animate-spin" />
                  KINETIC SIMULATOR
                </span>
                <span className="font-mono-tech text-xs text-slate-400">[LIVE CORE]</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-1 font-['Syne']">
                Instant Slot Lock
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Click connector to toggle virtual charger engagement.
              </p>
            </div>

            {/* Interactive Functional Plug Simulation Widget */}
            <div className="my-4 sm:my-6 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center relative z-10">
              <div className="w-full flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isPlugged ? 'bg-[#00D68F] animate-ping-soft' : 'bg-slate-500'}`} />
                  <span className="font-mono-tech text-[11px] sm:text-xs uppercase font-bold text-slate-200">
                    {isPlugged ? 'CCS2 LOCKED' : 'DISCONNECTED'}
                  </span>
                </div>
                <div className="text-right font-mono-tech">
                  <span className="text-base sm:text-lg font-bold text-[#FFBD00]">
                    {liveKw} kW
                  </span>
                  <div className="text-[10px] text-slate-400">
                    {liveAmps}A @ {voltage}V
                  </div>
                </div>
              </div>

              {/* Voltage Selector */}
              <div className="w-full grid grid-cols-2 gap-2 mb-3 font-mono-tech text-[10px]">
                <button
                  type="button"
                  onClick={() => setVoltage(800)}
                  className={`py-1 rounded-lg border transition-all cursor-pointer ${
                    voltage === 800 ? 'bg-[#299093] text-white border-transparent' : 'bg-white/5 text-slate-300 border-white/10'
                  }`}
                >
                  800V ULTRA
                </button>
                <button
                  type="button"
                  onClick={() => setVoltage(400)}
                  className={`py-1 rounded-lg border transition-all cursor-pointer ${
                    voltage === 400 ? 'bg-[#299093] text-white border-transparent' : 'bg-white/5 text-slate-300 border-white/10'
                  }`}
                >
                  400V STD
                </button>
              </div>

              {/* Dynamic 15-Min Hold Countdown */}
              {isPlugged && (
                <div className="w-full mb-3 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between font-mono-tech text-[11px]">
                  <span className="text-slate-400">RESERVATION HOLD:</span>
                  <span className="text-[#00D68F] font-bold">{formatTimer(holdTimerSeconds)}</span>
                </div>
              )}

              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  const nextState = !isPlugged;
                  setIsPlugged(nextState);
                  setIsHoldActive(nextState);
                  if (nextState) {
                    setHoldTimerSeconds(900);
                    confetti({
                      particleCount: 50,
                      spread: 60,
                      origin: { y: 0.7 },
                      colors: ['#299093', '#FFBD00']
                    });
                  }
                }}
                className="w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-full font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
                style={{
                  backgroundColor: isPlugged ? '#EF6156' : '#299093',
                  color: '#FFFFFF'
                }}
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>{isPlugged ? 'RELEASE 15-MIN HOLD' : 'ENGAGE 15-MIN HOLD'}</span>
              </button>
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs font-mono-tech text-slate-400 border-t border-white/10 pt-3 sm:pt-4">
              <span>VEHICLE: KA-01-EV</span>
              <span className={isPlugged ? 'text-[#00D68F]' : 'text-slate-400'}>
                {isPlugged ? 'HOLD VERIFIED' : 'STANDBY'}
              </span>
            </div>
          </div>

          {/* Right Pillar: Unified Single Wallet */}
          <div className="bg-white dark:bg-[#0E121A] border border-[#D8D4C9] dark:border-[#1F2837] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#061A1E] dark:hover:border-white transition-all">
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <span className="tech-chip">
                  <span className="w-2 h-2 rounded-full bg-[#EF6156]"></span>
                  ZERO APP SWITCHING
                </span>
                <span className="font-mono-tech text-xs text-[#8E8B82]">[03 / PAY]</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#061A1E] dark:text-white mb-2 font-['Syne']">
                One Account. One Invoice.
              </h3>
              <p className="text-xs sm:text-sm text-[#061A1E]/75 dark:text-slate-400 leading-relaxed mb-6">
                Forget maintaining 8 different pre-paid wallet balances. Pay once via UPI, Fastag, or AutoPay with consolidated monthly GST tax filing.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#D8D4C9]/60 dark:border-white/10 font-mono-tech text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#8E8B82]">Settlement Protocol:</span>
                <span className="font-bold text-[#061A1E] dark:text-white">Instant UPI 2.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8E8B82]">Corporate GST Compliance:</span>
                <span className="font-bold text-[#299093]">Automated 100%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8E8B82]">Supported Wallets:</span>
                <span className="font-bold text-[#FFBD00]">Universal AutoPay</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
