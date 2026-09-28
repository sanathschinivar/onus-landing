import React from 'react';
import { Zap } from 'lucide-react';
import { CONNECTED_NETWORKS } from '../../constants/data';

export default function NetworksTicker() {
  return (
    <section id="networks" className="py-16 sm:py-20 border-t border-[#D8D4C9] dark:border-[#1F2837] overflow-hidden">
      
      {/* Top Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
        <div>
          <div className="tech-chip mb-3">
            <span className="w-2 h-2 rounded-full bg-[#299093]"></span>
            INTEGRATED ECOSYSTEM
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-[#061A1E] dark:text-white font-['Syne']">
            Connected Charging Networks
          </h3>
        </div>
        <p className="font-mono-tech text-xs uppercase tracking-wider text-[#8E8B82] dark:text-slate-400">
          [OCPI 2.2 PROTOCOL • UNIFIED SINGLE APIS]
        </p>
      </div>

      {/* Infinite Seamless Scrolling Ticker Marquee */}
      <div className="relative w-full overflow-hidden py-4">
        
        {/* Left & Right Editorial Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-[#F5F3ED] dark:from-[#07090E] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-[#F5F3ED] dark:from-[#07090E] to-transparent z-10 pointer-events-none" />

        <div className="ticker-marquee flex items-center gap-4">
          {[...CONNECTED_NETWORKS, ...CONNECTED_NETWORKS].map((net, idx) => (
            <div 
              key={idx}
              className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-[#0E121A] border border-[#D8D4C9] dark:border-[#1F2837] hover:border-[#061A1E] dark:hover:border-white transition-all flex items-center gap-4 shrink-0 shadow-sm"
            >
              <div 
                className="w-8 sm:w-9 h-8 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0"
                style={{ backgroundColor: net.tagColor }}
              >
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-['Syne'] font-bold text-sm text-[#061A1E] dark:text-white">
                  {net.name}
                </span>
                <div className="flex items-center gap-2 font-mono-tech text-[10px] text-[#8E8B82] dark:text-slate-400">
                  <span className="text-[#299093] font-bold">{net.guns}</span>
                  <span>•</span>
                  <span>{net.power}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
