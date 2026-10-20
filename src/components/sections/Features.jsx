import React, { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import { SYSTEM_MODULES, CORRIDOR_HUBS } from '../../constants/data';

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);
  const activeModule = SYSTEM_MODULES[activeTab];

  const [selectedCorridor, setSelectedCorridor] = useState('blr-mys');
  const [autoPayEnabled, setAutoPayEnabled] = useState(true);
  const [gridVoltage, setGridVoltage] = useState(415);
  const [transformerLoad, setTransformerLoad] = useState(64);

  useEffect(() => {
    if (activeModule.id !== 'cpo') return undefined;
    const gridTimer = setInterval(() => {
      setGridVoltage(415 + Math.floor((Math.random() - 0.5) * 4));
      setTransformerLoad(Math.floor(62 + Math.random() * 8));
    }, 2500);
    return () => clearInterval(gridTimer);
  }, [activeModule.id]);

  return (
    <section id="features" className="py-20 sm:py-32 border-t border-[#D8D4C9] dark:border-[#1F2837] relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Top Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="tech-chip mb-4">
              <span className="w-2 h-2 rounded-full bg-[#EF6156]"></span>
              SYSTEM ARCHITECTURE & REASONING
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#061A1E] dark:text-white font-['Syne'] leading-tight">
              Intelligence on{' '}
              <span className="headline-pill bg-[#299093] text-white text-[0.8em]">
                every network
              </span>
              .
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#061A1E]/80 dark:text-slate-300 max-w-xl">
            We address the core friction points in India's EV charging ecosystem: fragmented apps, uncertain availability, and locked-in pre-paid balances.
          </p>
        </div>

        {/* Stepper Navigation & Console Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Interactive Module Selector */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">
            {SYSTEM_MODULES.map((mod, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  type="button"
                  key={mod.id}
                  onClick={() => setActiveTab(idx)}
                  aria-pressed={isActive}
                  className={`w-full text-left p-5 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-white dark:bg-[#0E121A] border-[#061A1E] dark:border-white shadow-md' 
                      : 'bg-[#FAF9F5] dark:bg-[#131924]/60 border-[#D8D4C9] dark:border-[#1F2837] opacity-80 hover:opacity-100 hover:border-[#8E8B82]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 font-mono-tech text-xs">
                    <span 
                      className="font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: isActive ? `${mod.accentColor}20` : 'transparent',
                        color: mod.accentColor 
                      }}
                    >
                      {mod.tag}
                    </span>
                    <span className="text-[#8E8B82] dark:text-slate-400">
                      [0{idx + 1} / 03]
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-bold text-[#061A1E] dark:text-white font-['Syne'] mb-2">
                    {mod.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#061A1E]/75 dark:text-slate-400 leading-relaxed mb-4">
                    {mod.subtitle}
                  </p>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#D8D4C9]/60 dark:border-white/10">
                    <span 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isActive ? 'w-16' : 'w-2 bg-[#D8D4C9] dark:bg-white/20'
                      }`}
                      style={{ backgroundColor: isActive ? mod.accentColor : undefined }}
                    />
                    <span className="font-mono-tech text-[10px] uppercase font-bold text-[#8E8B82] dark:text-slate-400">
                      {isActive ? 'ACTIVE FOCUS' : 'CLICK TO VIEW'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Telemetry Console */}
          <div className="lg:col-span-7 bg-[#061A1E] dark:bg-[#0E121A] text-white rounded-3xl p-6 sm:p-12 border border-[#061A1E] dark:border-[#1F2837] relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[480px] sm:min-h-[520px]">
            
            <div 
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-40 transition-colors duration-700"
              style={{ backgroundColor: activeModule.accentColor }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10 font-mono-tech text-xs">
                <span className="flex items-center gap-2 text-[#00D68F]">
                  <span className="w-2 h-2 rounded-full bg-[#00D68F] animate-ping-soft" />
                  REAL-TIME TELEMETRY CONSOLE
                </span>
                <span className="text-slate-400 font-bold uppercase">
                  {activeModule.tag}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold mb-3 sm:mb-4 font-['Syne'] leading-tight text-white">
                {activeModule.title}
              </h3>

              <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl mb-6 sm:mb-8">
                {activeModule.description}
              </p>
            </div>

            {/* Visual Simulator per Module */}
            <div className="relative z-10 p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-6 sm:mb-8">
              {activeModule.previewType === 'queueRadar' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tech">
                    <div className="flex gap-1.5">
                      {Object.keys(CORRIDOR_HUBS).map((cKey) => (
                        <button
                          key={cKey}
                          onClick={() => setSelectedCorridor(cKey)}
                          className={`px-2 py-1 rounded text-[10px] uppercase font-bold cursor-pointer transition-all ${
                            selectedCorridor === cKey ? 'bg-[#EF6156] text-white' : 'bg-white/10 text-slate-300'
                          }`}
                        >
                          {cKey.toUpperCase()}
                        </button>
                      ))}
                    </div>
                    <span className="text-[#EF6156] font-bold">CONGESTION: LOW</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center font-mono-tech text-xs">
                    {CORRIDOR_HUBS[selectedCorridor].hubs.map((hub, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-slate-400 text-[10px] truncate">{hub.name}</div>
                        <div className="font-bold text-sm mt-1" style={{ color: hub.status }}>{hub.wait}</div>
                        <div className="text-[10px] text-slate-500">{hub.guns}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModule.previewType === 'walletPass' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-slate-400">UNIFIED RECHARGE PASS</span>
                    <button 
                      onClick={() => setAutoPayEnabled(!autoPayEnabled)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-all cursor-pointer ${
                        autoPayEnabled ? 'bg-[#FFBD00] text-[#061A1E]' : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {autoPayEnabled ? 'AUTO-DEBIT ENABLED' : 'MANUAL'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/15">
                    <div className="flex items-center gap-3">
                      <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-[#FFBD00] text-[#061A1E] flex items-center justify-center font-bold shrink-0">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm">ONUZ One-Invoice UPI</div>
                        <div className="text-[11px] sm:text-xs text-slate-400 font-mono-tech">Linked: rahul@okhdfcbank</div>
                      </div>
                    </div>
                    <div className="text-right font-mono-tech">
                      <div className="text-[10px] text-slate-400 uppercase">GST Credit</div>
                      <div className="text-xs font-bold text-[#00D68F]">18% Auto</div>
                    </div>
                  </div>
                </div>
              )}

              {activeModule.previewType === 'gridHub' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-slate-400">CPO SUBSTATION AI</span>
                    <span className="text-[#00D68F] font-bold">LOAD BALANCING 100%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono-tech">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-slate-400 text-[10px]">Transformer:</span>
                      <div className="text-base sm:text-lg font-bold text-[#00D68F] mt-0.5">{transformerLoad}% Utilized</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-slate-400 text-[10px]">Grid Feed:</span>
                      <div className="text-base sm:text-lg font-bold text-white mt-0.5">{gridVoltage}V Stable</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Specification Badges */}
            <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10 font-mono-tech text-xs">
              {activeModule.specs.map((sp, i) => (
                <div key={i}>
                  <div className="text-slate-400 text-[9px] sm:text-[10px] uppercase truncate">{sp.label}</div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">{sp.val}</div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
