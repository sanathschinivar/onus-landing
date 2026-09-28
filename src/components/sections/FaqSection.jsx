import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../../constants/data';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-32 border-t border-[#D8D4C9] dark:border-[#1F2837] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="tech-chip mb-4">
              <span className="w-2 h-2 rounded-full bg-[#EF6156]"></span>
              SYSTEM ARCHITECTURE FAQ
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#061A1E] dark:text-white font-['Syne'] leading-tight">
              Frequently Asked{' '}
              <span className="headline-pill bg-[#299093] text-white text-[0.8em]">
                Questions
              </span>
              .
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#061A1E]/80 dark:text-slate-300 max-w-md">
            Everything you need to know about the ONUZ protocol, universal reservation, and CPO integrations.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-white dark:bg-[#0E121A] border-[#061A1E] dark:border-white shadow-md' 
                    : 'bg-[#FAF9F5] dark:bg-[#131924]/60 border-[#D8D4C9] dark:border-[#1F2837] hover:border-[#8E8B82]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-8 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-6">
                    <span className="font-mono-tech text-xs sm:text-sm font-bold text-[#8E8B82] pt-1 sm:pt-0">
                      [{faq.num}]
                    </span>
                    <h3 className="font-['Syne'] font-bold text-base sm:text-xl text-[#061A1E] dark:text-white">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`w-7 sm:w-8 h-7 sm:h-8 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                    isOpen 
                      ? 'bg-[#061A1E] text-white dark:bg-white dark:text-[#061A1E] border-transparent' 
                      : 'border-[#D8D4C9] dark:border-white/20 text-[#061A1E] dark:text-white'
                  }`}>
                    {isOpen ? <Minus className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> : <Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-8 sm:pb-8 pt-0 text-xs sm:text-base text-[#061A1E]/80 dark:text-slate-300 leading-relaxed font-sans border-t border-[#D8D4C9]/40 dark:border-white/10 mt-1">
                    <p className="pt-3 sm:pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
