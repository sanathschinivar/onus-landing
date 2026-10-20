import React from 'react';
import { ROADMAP_MILESTONES } from '../../constants/data';
import { useCountdown } from '../../hooks/useCountdown';

export default function CountdownMilestones() {
  // Target Launch Date: Nov 15, 2026
  const timeLeft = useCountdown('2026-11-15T00:00:00+05:30', true);

  return (
    <section className="py-20 sm:py-32 border-t border-[#D8D4C9] dark:border-[#1F2837] relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="tech-chip mb-4">
              <span className="w-2 h-2 rounded-full bg-[#299093]"></span>
              SYSTEM ROADMAP & DEPLOYMENT SCHEDULE
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#061A1E] dark:text-white font-['Syne'] leading-tight">
              Public App{' '}
              <span className="headline-pill bg-[#061A1E] text-white dark:bg-white dark:text-[#061A1E] text-[0.8em]">
                Rollout
              </span>
              .
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#061A1E]/80 dark:text-slate-300 max-w-xl">
            We are concluding private beta testing with fleet operators and opening early access batches every 14 days.
          </p>
        </div>

        {/* Digital Architectural Countdown Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {[
            { label: 'DAYS REMAINING', val: timeLeft.days },
            { label: 'HOURS', val: String(timeLeft.hours).padStart(2, '0') },
            { label: 'MINUTES', val: String(timeLeft.minutes).padStart(2, '0') },
            { label: 'SECONDS', val: String(timeLeft.seconds).padStart(2, '0') }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-[#0E121A] border border-[#D8D4C9] dark:border-[#1F2837] text-center shadow-sm flex flex-col justify-center items-center"
            >
              <span className="font-['Syne'] font-extrabold text-3xl sm:text-6xl md:text-7xl text-[#061A1E] dark:text-white leading-none mb-1 sm:mb-2">
                {item.val}
              </span>
              <span className="font-mono-tech text-[9px] sm:text-xs font-bold uppercase tracking-widest text-[#8E8B82] dark:text-slate-400">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Roadmap Milestones Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {ROADMAP_MILESTONES.map((m, idx) => (
            <div 
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] hover:border-[#061A1E] dark:hover:border-white transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-mono-tech text-xs mb-4">
                  <span className="text-[#8E8B82] dark:text-slate-400 font-bold">{m.phase}</span>
                  <span 
                    className="font-bold px-2 py-0.5 rounded-full uppercase text-[10px]"
                    style={{ 
                      backgroundColor: `${m.statusColor}20`,
                      color: m.statusColor 
                    }}
                  >
                    {m.status}
                  </span>
                </div>

                <h3 className="font-['Syne'] font-bold text-lg sm:text-xl text-[#061A1E] dark:text-white mb-2">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#061A1E]/75 dark:text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>

              <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-[#D8D4C9]/60 dark:border-white/10 font-mono-tech text-[11px] text-[#8E8B82] dark:text-slate-400">
                VERIFIED PROTOCOL • ONUZ LABS
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
