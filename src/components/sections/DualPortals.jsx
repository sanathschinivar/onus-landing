import React, { useState } from 'react';
import { Users, Building2, ArrowUpRight, CheckCircle2, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitToGoogleSheets } from '../../services/sheetsService';

export default function DualPortals({ initialTab = 'driver' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const [driverName, setDriverName] = useState('');
  const [driverEmail, setDriverEmail] = useState('');
  const [driverEvModel, setDriverEvModel] = useState('Tata Nexon EV');
  const [driverCity, setDriverCity] = useState('Bengaluru');
  const [driverSubmitted, setDriverSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [partnerCompany, setPartnerCompany] = useState('');
  const [partnerNetwork, setPartnerNetwork] = useState('');
  const [partnerGuns, setPartnerGuns] = useState('10 - 50 Guns');
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerPhone, setPartnerPhone] = useState('');
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  const handleDriverSubmit = (e) => {
    e.preventDefault();
    if (!driverEmail) return;

    submitToGoogleSheets({
      formType: 'EV Driver Waitlist (Portal)',
      name: driverName,
      email: driverEmail,
      evModel: driverEvModel,
      city: driverCity
    });

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#EF6156', '#299093', '#FFBD00', '#061A1E']
    });
    setDriverSubmitted(true);
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    if (!partnerEmail) return;

    submitToGoogleSheets({
      formType: 'CPO Partner Lead (Portal)',
      company: partnerCompany,
      networkBrand: partnerNetwork,
      contactPerson: partnerName,
      gunsCount: partnerGuns,
      email: partnerEmail,
      phone: partnerPhone
    });

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#299093', '#FFBD00', '#061A1E']
    });
    setPartnerSubmitted(true);
  };

  const handleCopyReferral = () => {
    const slug = driverName.toLowerCase().replace(/\s+/g, '') || 'vip';
    navigator.clipboard.writeText(`https://onuz.in?ref=${slug}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <section id="partner" className="py-20 sm:py-32 border-t border-[#D8D4C9] dark:border-[#1F2837] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="tech-chip mb-4 mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#EF6156]"></span>
            ACQUISITION & INTEGRATION TERMINAL
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#061A1E] dark:text-white font-['Syne'] leading-tight mb-4">
            Join the{' '}
            <span className="headline-pill bg-[#FFBD00] text-[#061A1E] text-[0.8em]">
              Network
            </span>
            .
          </h2>
          <p className="text-base sm:text-lg text-[#061A1E]/80 dark:text-slate-300">
            Priority access for EV drivers and seamless OCPI API integration for Charge Point Operators (CPOs).
          </p>

          {/* Segmented Switcher */}
          <div className="mt-6 sm:mt-8 inline-flex p-1.5 rounded-full bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] font-mono-tech text-xs">
            <button
              onClick={() => setActiveTab('driver')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold uppercase transition-all cursor-pointer flex items-center gap-2 text-[11px] sm:text-xs ${
                activeTab === 'driver'
                  ? 'bg-[#061A1E] text-white dark:bg-white dark:text-[#061A1E] shadow-sm'
                  : 'text-[#061A1E] dark:text-slate-300 hover:text-[#299093]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>EV DRIVERS</span>
            </button>
            <button
              onClick={() => setActiveTab('partner')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold uppercase transition-all cursor-pointer flex items-center gap-2 text-[11px] sm:text-xs ${
                activeTab === 'partner'
                  ? 'bg-[#061A1E] text-white dark:bg-white dark:text-[#061A1E] shadow-sm'
                  : 'text-[#061A1E] dark:text-slate-300 hover:text-[#299093]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>CPO PARTNERS</span>
            </button>
          </div>
        </div>

        {/* Form Container Card */}
        <div className="bg-white dark:bg-[#0E121A] border border-[#D8D4C9] dark:border-[#1F2837] rounded-3xl p-6 sm:p-12 shadow-xl relative">
          
          {/* DRIVER PORTAL */}
          {activeTab === 'driver' && (
            <div>
              {!driverSubmitted ? (
                <form onSubmit={handleDriverSubmit} className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#D8D4C9] dark:border-white/10 font-mono-tech text-xs">
                    <span className="font-bold text-[#299093] uppercase">
                      [PROTOCOL: DRIVER PRIORITY PASS]
                    </span>
                    <span className="text-[#8E8B82] dark:text-slate-400">
                      QUEUE: 1,482 REGISTERED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block font-mono-tech text-xs uppercase font-bold text-[#061A1E] dark:text-slate-300 mb-2">
                        [01 // YOUR FULL NAME]
                      </label>
                      <input
                        type="text"
                        required
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] text-sm text-[#061A1E] dark:text-white placeholder:text-[#8E8B82] focus:outline-none focus:border-[#061A1E] dark:focus:border-white transition-all font-mono-tech"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-tech text-xs uppercase font-bold text-[#061A1E] dark:text-slate-300 mb-2">
                        [02 // EMAIL ADDRESS]
                      </label>
                      <input
                        type="email"
                        required
                        value={driverEmail}
                        onChange={(e) => setDriverEmail(e.target.value)}
                        placeholder="e.g. rahul@domain.com"
                        className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] text-sm text-[#061A1E] dark:text-white placeholder:text-[#8E8B82] focus:outline-none focus:border-[#061A1E] dark:focus:border-white transition-all font-mono-tech"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-tech text-xs uppercase font-bold text-[#061A1E] dark:text-slate-300 mb-2">
                        [03 // EV VEHICLE MODEL]
                      </label>
                      <select
                        value={driverEvModel}
                        onChange={(e) => setDriverEvModel(e.target.value)}
                        className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] text-sm text-[#061A1E] dark:text-white focus:outline-none focus:border-[#061A1E] dark:focus:border-white transition-all font-mono-tech"
                      >
                        <option value="Tata Nexon EV">Tata Nexon EV</option>
                        <option value="Tata Punch EV / Tiago EV">Tata Punch EV / Tiago EV</option>
                        <option value="MG ZS EV / Comet">MG ZS EV / Comet</option>
                        <option value="Mahindra XUV400">Mahindra XUV400</option>
                        <option value="Hyundai Ioniq 5 / Kona">Hyundai Ioniq 5 / Kona</option>
                        <option value="BYD Atto 3 / Seal">BYD Atto 3 / Seal</option>
                        <option value="Kia EV6">Kia EV6</option>
                        <option value="Ather / Ola Electric 2W">Ather / Ola Electric 2W</option>
                        <option value="Other EV">Other Electric Vehicle</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono-tech text-xs uppercase font-bold text-[#061A1E] dark:text-slate-300 mb-2">
                        [04 // PRIMARY METRO HUB]
                      </label>
                      <select
                        value={driverCity}
                        onChange={(e) => setDriverCity(e.target.value)}
                        className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] text-sm text-[#061A1E] dark:text-white focus:outline-none focus:border-[#061A1E] dark:focus:border-white transition-all font-mono-tech"
                      >
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Pune">Pune</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="font-mono-tech text-xs text-[#8E8B82] dark:text-slate-400">
                      🔒 Zero spam. Priority notification upon unlocking.
                    </span>

                    <button type="submit" className="btn-onuz group w-full sm:w-auto h-12 px-8">
                      <span className="wipe-layer wipe-layer-1 bg-[#EF6156]" />
                      <span className="wipe-layer wipe-layer-2 bg-[#299093]" />
                      <span className="wipe-layer wipe-layer-3 bg-[#FFBD00]" />
                      <span className="btn-content">
                        <span className="group-hover:text-[#061A1E] transition-colors">SUBMIT & RESERVE SPOT</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:text-[#061A1E] transition-colors" />
                      </span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-6 sm:p-10 rounded-2xl bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-white/10 text-center font-mono-tech">
                  <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-[#299093] text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle2 className="w-7 sm:w-8 h-7 sm:h-8" />
                  </div>
                  
                  <span className="inline-block px-3 py-1 rounded-full bg-[#299093]/20 text-[#299093] text-xs font-bold uppercase mb-2">
                    RESERVATION TOKEN #1,483
                  </span>

                  <h3 className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-[#061A1E] dark:text-white mb-2">
                    Welcome to the Inner Circle, {driverName || 'Friend'}!
                  </h3>

                  <p className="text-xs sm:text-sm text-[#061A1E]/80 dark:text-slate-300 max-w-lg mx-auto mb-6 sm:mb-8">
                    Your spot is confirmed for the <strong>{driverEvModel}</strong> in <strong>{driverCity}</strong>. Check your inbox ({driverEmail}) for your early beta invite.
                  </p>

                  <div className="max-w-md mx-auto p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#0E121A] border border-[#D8D4C9] dark:border-white/10 flex items-center justify-between gap-3">
                    <span className="text-xs truncate text-[#061A1E] dark:text-slate-300">
                      https://onuz.in?ref={driverName.toLowerCase().replace(/\s+/g, '') || 'vip'}
                    </span>
                    <button
                      onClick={handleCopyReferral}
                      className="btn-onuz px-4 h-8 text-[10px] shrink-0"
                    >
                      <span className="btn-content">
                        {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? 'COPIED' : 'COPY'}</span>
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CPO PARTNER PORTAL */}
          {activeTab === 'partner' && (
            <div>
              {!partnerSubmitted ? (
                <form onSubmit={handlePartnerSubmit} className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#D8D4C9] dark:border-white/10 font-mono-tech text-xs">
                    <span className="font-bold text-[#EF6156] uppercase">
                      [OCPI 2.2 / OCPP 1.6 CPO ONBOARDING]
                    </span>
                    <span className="text-[#8E8B82] dark:text-slate-400">
                      14 NETWORKS CONNECTED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block font-mono-tech text-xs uppercase font-bold text-[#061A1E] dark:text-slate-300 mb-2">
                        [01 // OPERATOR / COMPANY NAME]
                      </label>
                      <input
                        type="text"
                        required
                        value={partnerCompany}
                        onChange={(e) => setPartnerCompany(e.target.value)}
                        placeholder="e.g. BoltVolt Energy Ltd"
                        className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] text-sm text-[#061A1E] dark:text-white placeholder:text-[#8E8B82] focus:outline-none focus:border-[#061A1E] dark:focus:border-white transition-all font-mono-tech"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-tech text-xs uppercase font-bold text-[#061A1E] dark:text-slate-300 mb-2">
                        [02 // NETWORK BRAND NAME]
                      </label>
                      <input
                        type="text"
                        value={partnerNetwork}
                        onChange={(e) => setPartnerNetwork(e.target.value)}
                        placeholder="e.g. VoltCharge Stations"
                        className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] text-sm text-[#061A1E] dark:text-white placeholder:text-[#8E8B82] focus:outline-none focus:border-[#061A1E] dark:focus:border-white transition-all font-mono-tech"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-tech text-xs uppercase font-bold text-[#061A1E] dark:text-slate-300 mb-2">
                        [03 // ACTIVE GUN CAPACITY]
                      </label>
                      <select
                        value={partnerGuns}
                        onChange={(e) => setPartnerGuns(e.target.value)}
                        className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] text-sm text-[#061A1E] dark:text-white focus:outline-none focus:border-[#061A1E] dark:focus:border-white transition-all font-mono-tech"
                      >
                        <option value="1 - 10 Guns">1 - 10 Guns (Pilot Hub)</option>
                        <option value="10 - 50 Guns">10 - 50 Guns (Regional)</option>
                        <option value="50 - 200 Guns">50 - 200 Guns (Multi-City)</option>
                        <option value="200+ Guns">200+ Guns (National Grid)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono-tech text-xs uppercase font-bold text-[#061A1E] dark:text-slate-300 mb-2">
                        [04 // CONTACT EXECUTIVE]
                      </label>
                      <input
                        type="text"
                        required
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        placeholder="e.g. Amit Kapoor (Head of Infra)"
                        className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] text-sm text-[#061A1E] dark:text-white placeholder:text-[#8E8B82] focus:outline-none focus:border-[#061A1E] dark:focus:border-white transition-all font-mono-tech"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-tech text-xs uppercase font-bold text-[#061A1E] dark:text-slate-300 mb-2">
                        [05 // CORPORATE EMAIL]
                      </label>
                      <input
                        type="email"
                        required
                        value={partnerEmail}
                        onChange={(e) => setPartnerEmail(e.target.value)}
                        placeholder="e.g. amit@cpo-domain.in"
                        className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] text-sm text-[#061A1E] dark:text-white placeholder:text-[#8E8B82] focus:outline-none focus:border-[#061A1E] dark:focus:border-white transition-all font-mono-tech"
                      />
                    </div>

                    <div>
                      <label className="block font-mono-tech text-xs uppercase font-bold text-[#061A1E] dark:text-slate-300 mb-2">
                        [06 // DIRECT PHONE]
                      </label>
                      <input
                        type="tel"
                        value={partnerPhone}
                        onChange={(e) => setPartnerPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] text-sm text-[#061A1E] dark:text-white placeholder:text-[#8E8B82] focus:outline-none focus:border-[#061A1E] dark:focus:border-white transition-all font-mono-tech"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="font-mono-tech text-xs text-[#8E8B82] dark:text-slate-400">
                      ⚡ Complete sandbox OCPI credentials provided in 24 business hours.
                    </span>

                    <button type="submit" className="btn-onuz group w-full sm:w-auto h-12 px-8">
                      <span className="wipe-layer wipe-layer-1 bg-[#299093]" />
                      <span className="wipe-layer wipe-layer-2 bg-[#FFBD00]" />
                      <span className="wipe-layer wipe-layer-3 bg-[#EF6156]" />
                      <span className="btn-content">
                        <span className="group-hover:text-white transition-colors">SUBMIT INQUIRY</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:text-white transition-colors" />
                      </span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-6 sm:p-10 rounded-2xl bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-white/10 text-center font-mono-tech">
                  <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-[#EF6156] text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle2 className="w-7 sm:w-8 h-7 sm:h-8" />
                  </div>
                  
                  <span className="inline-block px-3 py-1 rounded-full bg-[#EF6156]/20 text-[#EF6156] text-xs font-bold uppercase mb-2">
                    CPO INQUIRY LOGGED
                  </span>

                  <h3 className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-[#061A1E] dark:text-white mb-2">
                    Thank you, {partnerName}!
                  </h3>

                  <p className="text-xs sm:text-sm text-[#061A1E]/80 dark:text-slate-300 max-w-lg mx-auto mb-4">
                    Our platform integration engineering team will contact <strong>{partnerEmail}</strong> with our OCPI 2.2 API specs.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
