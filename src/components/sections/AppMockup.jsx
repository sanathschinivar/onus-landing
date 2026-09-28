import React, { useState, useEffect } from 'react';
import { Search, MapPin, CheckCircle, X, Radio, ArrowUpRight, BatteryCharging, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STATIONS_DATA } from '../../constants/data';

export default function AppMockup() {
  const [activeTab, setActiveTab] = useState('radar');
  const [selectedNetwork, setSelectedNetwork] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStation, setActiveStation] = useState(null);
  const [bookedSlot, setBookedSlot] = useState(null);
  const [customVehicleReg, setCustomVehicleReg] = useState('KA-01-EV-2026');
  
  const [socPercent, setSocPercent] = useState(58);
  const [chargingKw, setChargingKw] = useState(118);
  const [energyDelivered, setEnergyDelivered] = useState(26.4);
  const [isCharging, setIsCharging] = useState(true);
  const [currentTariff, setCurrentTariff] = useState(18.5);
  const [nfcTapped, setNfcTapped] = useState(false);

  useEffect(() => {
    if (!isCharging) return;
    const interval = setInterval(() => {
      setSocPercent(prev => (prev < 99 ? prev + 1 : 99));
      setEnergyDelivered(prev => Number((prev + 0.35).toFixed(2)));
      setChargingKw(Math.floor(115 + Math.random() * 9));
    }, 2200);
    return () => clearInterval(interval);
  }, [isCharging]);

  const networks = ['All', 'Zeon Charging', 'Tata Power', 'Shell Recharge', 'ChargeZone'];

  const filteredStations = STATIONS_DATA.filter(station => {
    const matchesNetwork = selectedNetwork === 'All' || station.network === selectedNetwork;
    const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          station.latLng.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesNetwork && matchesSearch;
  });

  const confirmReservation = (station) => {
    const booking = {
      station,
      time: 'Next 15 Minutes (Instant Hold)',
      bookingId: 'ONUZ-' + Math.floor(100000 + Math.random() * 900000),
      slotNumber: 'Slot #' + Math.floor(1 + Math.random() * 4),
      vehicleReg: customVehicleReg
    };
    setBookedSlot(booking);
    setCurrentTariff(station.tariffNum);
    setActiveStation(null);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#299093', '#EF6156', '#FFBD00']
    });
  };

  const handleNfcTap = () => {
    setNfcTapped(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#00D68F', '#299093']
    });
    setTimeout(() => setNfcTapped(false), 3000);
  };

  return (
    <section id="simulator" className="py-20 sm:py-32 border-t border-[#D8D4C9] dark:border-[#1F2837] relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="tech-chip mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FFBD00]"></span>
              INTERACTIVE CLIENT TERMINAL
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#061A1E] dark:text-white font-['Syne'] leading-tight">
              Test the{' '}
              <span className="headline-pill bg-[#EF6156] text-white text-[0.8em]">
                Live OS
              </span>
              .
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#061A1E]/80 dark:text-slate-300 max-w-xl">
            Simulate real-time slot locking, examine live gun occupancy across Bangalore hubs, and test our automated charging telemetry.
          </p>
        </div>

        {/* Chassis Frame */}
        <div className="bg-white dark:bg-[#0E121A] border border-[#D8D4C9] dark:border-[#1F2837] rounded-3xl p-5 sm:p-10 shadow-xl">
          
          {/* Top Chassis Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-[#D8D4C9] dark:border-white/10">
            {/* Terminal Tab Switcher */}
            <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs">
              <button
                onClick={() => setActiveTab('radar')}
                className={`px-3.5 sm:px-4 py-2 rounded-full font-bold uppercase transition-all cursor-pointer text-[11px] sm:text-xs ${
                  activeTab === 'radar'
                    ? 'bg-[#061A1E] text-white dark:bg-white dark:text-[#061A1E]'
                    : 'bg-[#FAF9F5] dark:bg-white/10 text-[#061A1E] dark:text-white border border-[#D8D4C9] dark:border-transparent hover:border-[#061A1E]'
                }`}
              >
                [01] LIVE RADAR MAP
              </button>
              <button
                onClick={() => setActiveTab('session')}
                className={`px-3.5 sm:px-4 py-2 rounded-full font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 text-[11px] sm:text-xs ${
                  activeTab === 'session'
                    ? 'bg-[#061A1E] text-white dark:bg-white dark:text-[#061A1E]'
                    : 'bg-[#FAF9F5] dark:bg-white/10 text-[#061A1E] dark:text-white border border-[#D8D4C9] dark:border-transparent hover:border-[#061A1E]'
                }`}
              >
                <span>[02] ACTIVE SESSION</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D68F] animate-ping-soft" />
              </button>
              <button
                onClick={() => setActiveTab('wallet')}
                className={`px-3.5 sm:px-4 py-2 rounded-full font-bold uppercase transition-all cursor-pointer text-[11px] sm:text-xs ${
                  activeTab === 'wallet'
                    ? 'bg-[#061A1E] text-white dark:bg-white dark:text-[#061A1E]'
                    : 'bg-[#FAF9F5] dark:bg-white/10 text-[#061A1E] dark:text-white border border-[#D8D4C9] dark:border-transparent hover:border-[#061A1E]'
                }`}
              >
                [03] RFID PASS
              </button>
            </div>

            {/* Live Status indicator */}
            <div className="font-mono-tech text-xs flex items-center gap-3 text-[#8E8B82] dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-[#299093] font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                SIMULATOR 100% ONLINE
              </span>
              <span className="hidden sm:inline">LATENCY: 8MS</span>
            </div>
          </div>

          {/* VIEWPORT CONTENT */}
          <div className="pt-6 sm:pt-8">
            
            {/* VIEW 1: LIVE RADAR MAP */}
            {activeTab === 'radar' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                
                {/* Search & Network Filter */}
                <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#8E8B82]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Indiranagar, MG Road, Shell..."
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] text-sm text-[#061A1E] dark:text-white placeholder:text-[#8E8B82] focus:outline-none focus:border-[#061A1E] dark:focus:border-white transition-all font-mono-tech"
                    />
                  </div>

                  {/* Network Pills */}
                  <div className="flex flex-wrap gap-1.5 font-mono-tech text-[10px] sm:text-[11px]">
                    {networks.map((net) => (
                      <button
                        key={net}
                        onClick={() => setSelectedNetwork(net)}
                        className={`px-3 py-1 rounded-full uppercase font-bold transition-all cursor-pointer ${
                          selectedNetwork === net
                            ? 'bg-[#EF6156] text-white'
                            : 'bg-[#FAF9F5] dark:bg-[#131924] text-[#061A1E] dark:text-slate-300 border border-[#D8D4C9] dark:border-[#1F2837] hover:border-[#061A1E]'
                        }`}
                      >
                        {net}
                      </button>
                    ))}
                  </div>

                  {/* Station List */}
                  <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                    {filteredStations.map((station) => (
                      <div
                        key={station.id}
                        onClick={() => setActiveStation(station)}
                        className="p-4 sm:p-5 rounded-2xl border border-[#D8D4C9] dark:border-[#1F2837] bg-[#FAF9F5] dark:bg-[#131924] hover:border-[#061A1E] dark:hover:border-white transition-all cursor-pointer group shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span 
                            className="font-mono-tech text-[10px] font-bold px-2 py-0.5 rounded-full uppercase text-white"
                            style={{ backgroundColor: station.tagColor }}
                          >
                            {station.networkTag}
                          </span>
                          <span className={`font-mono-tech text-[11px] font-bold ${
                            station.availableSlots > 0 ? 'text-[#299093]' : 'text-[#EF6156]'
                          }`}>
                            {station.availableSlots > 0 ? `${station.availableSlots}/${station.totalSlots} FREE` : 'BUSY'}
                          </span>
                        </div>

                        <h4 className="font-['Syne'] font-bold text-sm sm:text-base text-[#061A1E] dark:text-white group-hover:text-[#EF6156] transition-colors">
                          {station.name}
                        </h4>

                        <div className="flex items-center gap-3 text-xs font-mono-tech text-[#8E8B82] dark:text-slate-400 mt-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#EF6156]" />
                            {station.distance}
                          </span>
                          <span>•</span>
                          <span className="font-bold text-[#061A1E] dark:text-white">{station.speed}</span>
                          <span>•</span>
                          <span className="text-[#299093] font-bold">{station.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Radar Map Viewport */}
                <div className="lg:col-span-7 bg-[#061A1E] dark:bg-[#0E121A] rounded-3xl p-5 sm:p-8 text-white relative min-h-[420px] sm:min-h-[480px] flex flex-col justify-between overflow-hidden border border-[#061A1E] dark:border-[#1F2837]">
                  
                  <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#299093_1px,transparent_1px)] [background-size:24px_24px]" />

                  <div className="relative z-10 flex items-center justify-between font-mono-tech text-xs pb-3 sm:pb-4 border-b border-white/10">
                    <span className="flex items-center gap-2 text-[#00D68F]">
                      <span className="w-2 h-2 rounded-full bg-[#00D68F] animate-ping-soft" />
                      GPS RADAR: BENGALURU
                    </span>
                    <span className="text-slate-400">12.9716° N, 77.5946° E</span>
                  </div>

                  {/* Interactive Map Nodes Graphic */}
                  <div className="relative z-10 my-auto py-8 sm:py-12 flex flex-col items-center justify-center text-center">
                    
                    <div className="relative w-full max-w-md h-56 sm:h-64 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm p-4 overflow-hidden">
                      
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 sm:w-48 h-40 sm:h-48 rounded-full border border-[#299093]/30 animate-ping-soft pointer-events-none" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#EF6156] border-2 border-white shadow-lg z-20" title="Your Vehicle" />

                      <button 
                        onClick={() => setActiveStation(STATIONS_DATA[0])}
                        className="absolute top-4 sm:top-6 left-6 sm:left-12 p-1.5 sm:p-2 rounded-xl bg-[#299093] text-white text-[9px] sm:text-[10px] font-mono-tech font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer"
                      >
                        ZEON 120kW
                      </button>

                      <button 
                        onClick={() => setActiveStation(STATIONS_DATA[1])}
                        className="absolute bottom-6 sm:bottom-8 left-10 sm:left-20 p-1.5 sm:p-2 rounded-xl bg-white text-[#061A1E] text-[9px] sm:text-[10px] font-mono-tech font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer"
                      >
                        TATA 60kW
                      </button>

                      <button 
                        onClick={() => setActiveStation(STATIONS_DATA[2])}
                        className="absolute top-8 sm:top-12 right-6 sm:right-12 p-1.5 sm:p-2 rounded-xl bg-[#FFBD00] text-[#061A1E] text-[9px] sm:text-[10px] font-mono-tech font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer"
                      >
                        SHELL 150kW
                      </button>

                      <button 
                        onClick={() => setActiveStation(STATIONS_DATA[4])}
                        className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 p-1.5 sm:p-2 rounded-xl bg-[#299093] text-white text-[9px] sm:text-[10px] font-mono-tech font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer"
                      >
                        CHARGEZONE 240kW
                      </button>
                    </div>

                    <div className="mt-3 font-mono-tech text-[11px] text-slate-400">
                      Tap station pin to trigger instant OCPI reservation hold.
                    </div>
                  </div>

                  {/* Active reservation banner */}
                  {bookedSlot && (
                    <div className="relative z-10 p-3 sm:p-4 rounded-2xl bg-[#00D68F]/15 border border-[#00D68F]/40 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <CheckCircle className="w-5 h-5 text-[#00D68F] shrink-0" />
                        <div className="text-left font-mono-tech">
                          <div className="text-xs font-bold text-[#00D68F] uppercase">
                            SLOT CONFIRMED: {bookedSlot.slotNumber}
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-slate-300 truncate">
                            {bookedSlot.station.name}
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveTab('session')}
                        className="btn-onuz px-3 sm:px-4 py-1.5 h-7 sm:h-8 text-[10px] shrink-0"
                      >
                        <span className="btn-content">VIEW</span>
                      </button>
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* VIEW 2: LIVE SESSION */}
            {activeTab === 'session' && (
              <div className="bg-[#061A1E] dark:bg-[#0E121A] text-white rounded-3xl p-6 sm:p-12 relative overflow-hidden border border-[#061A1E] dark:border-[#1F2837]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
                  
                  {/* Battery Ring */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-40 sm:w-48 h-40 sm:h-48 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                        <circle 
                          cx="60" 
                          cy="60" 
                          r="50" 
                          stroke="#299093" 
                          strokeWidth="8" 
                          fill="none" 
                          strokeDasharray="314.15" 
                          strokeDashoffset={314.15 * (1 - socPercent / 100)}
                          strokeLinecap="round"
                          className="transition-all duration-700"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <BatteryCharging className="w-5 sm:w-6 h-5 sm:h-6 text-[#00D68F] animate-bounce mb-1" />
                        <span className="font-['Syne'] text-3xl sm:text-4xl font-extrabold">{socPercent}%</span>
                        <span className="font-mono-tech text-[10px] text-slate-400">STATE OF CHARGE</span>
                      </div>
                    </div>

                    <div className="mt-3 font-mono-tech text-xs text-[#00D68F] font-bold">
                      {isCharging ? '⚡ HIGH VOLTAGE DC FLOWING' : 'SESSION PAUSED'}
                    </div>
                  </div>

                  {/* Telemetry Gauges */}
                  <div className="flex-1 w-full space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 font-mono-tech">
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
                        <span className="text-slate-400 text-[10px] uppercase">Power Delivery</span>
                        <div className="text-xl sm:text-2xl font-bold text-[#FFBD00] mt-1">{chargingKw} kW</div>
                        <span className="text-slate-500 text-[10px]">Peak 150 kW</span>
                      </div>
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
                        <span className="text-slate-400 text-[10px] uppercase">Delivered Units</span>
                        <div className="text-xl sm:text-2xl font-bold text-white mt-1">{energyDelivered} kWh</div>
                        <span className="text-slate-500 text-[10px]">~{Math.round(energyDelivered * 6.8)} km</span>
                      </div>
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
                        <span className="text-slate-400 text-[10px] uppercase">Tally Amount</span>
                        <div className="text-xl sm:text-2xl font-bold text-[#00D68F] mt-1">₹{(energyDelivered * currentTariff).toFixed(1)}</div>
                        <span className="text-slate-500 text-[10px]">Rate @ ₹{currentTariff}/kWh</span>
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono-tech text-xs">
                      <div>
                        <span className="text-slate-400">SESSION:</span>
                        <span className="font-bold text-white ml-2">ONUZ-SES-88219</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setChargingKw(prev => Math.min(prev + 20, 240))}
                          className="px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 font-bold uppercase text-[10px] cursor-pointer"
                        >
                          + BOOST
                        </button>
                        <button
                          onClick={() => setIsCharging(!isCharging)}
                          className="px-4 py-1.5 rounded-full font-bold uppercase text-[11px] transition-all cursor-pointer"
                          style={{
                            backgroundColor: isCharging ? '#EF6156' : '#299093',
                            color: '#FFFFFF'
                          }}
                        >
                          {isCharging ? 'STOP' : 'RESUME'}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* VIEW 3: RFID PASS */}
            {activeTab === 'wallet' && (
              <div className="bg-[#FAF9F5] dark:bg-[#131924] rounded-3xl p-6 sm:p-12 border border-[#D8D4C9] dark:border-[#1F2837] flex flex-col items-center justify-center text-center">
                <div className="w-full max-w-md bg-[#061A1E] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-black relative overflow-hidden">
                  
                  <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/15">
                    <span className="font-['Syne'] font-extrabold text-lg">ONUZ PASS</span>
                    <span className="font-mono-tech text-xs text-[#FFBD00] uppercase font-bold">VIP ADOPTER</span>
                  </div>

                  <div className="my-6 text-left font-mono-tech space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">HOLDER:</span>
                      <span className="font-bold text-white">EARLY ADOPTER #1,483</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">VEHICLE VIN:</span>
                      <span className="font-bold text-[#00D68F]">{customVehicleReg}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">UNIVERSAL BILLING:</span>
                      <span className="font-bold text-white">14 NETWORKS</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/15 flex flex-col items-center gap-3">
                    <div className="h-9 w-full flex items-center justify-between px-2">
                      {Array.from({ length: 32 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="h-full bg-white" 
                          style={{ width: i % 3 === 0 ? '3px' : i % 2 === 0 ? '2px' : '1px' }} 
                        />
                      ))}
                    </div>
                    
                    <button
                      onClick={handleNfcTap}
                      className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#00D68F] font-mono-tech text-xs font-bold uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {nfcTapped ? <Check className="w-4 h-4" /> : <Radio className="w-4 h-4 animate-pulse" />}
                      <span>{nfcTapped ? 'NFC DISPATCHED' : 'TAP TO SIMULATE NFC'}</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 text-xs font-mono-tech text-[#8E8B82] dark:text-slate-400 max-w-sm">
                  Tap phone or show QR barcode at any partner gun to bypass app downloads.
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Reservation Modal Overlay */}
      {activeStation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#0E121A] border border-[#061A1E] dark:border-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setActiveStation(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-[#061A1E] dark:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="tech-chip mb-3">
              <span className="w-2 h-2 rounded-full bg-[#299093]"></span>
              HARDWARE HANDSHAKE
            </div>

            <h3 className="font-['Syne'] font-extrabold text-2xl text-[#061A1E] dark:text-white mb-1">
              Reserve Slot
            </h3>
            <p className="text-xs text-[#061A1E]/70 dark:text-slate-400 mb-4 font-mono-tech">
              {activeStation.name} • {activeStation.speed}
            </p>

            <div className="mb-4">
              <label className="block font-mono-tech text-xs uppercase font-bold text-[#061A1E] dark:text-slate-300 mb-1">
                Vehicle Registration:
              </label>
              <input
                type="text"
                value={customVehicleReg}
                onChange={(e) => setCustomVehicleReg(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] dark:bg-[#131924] border border-[#D8D4C9] dark:border-[#1F2837] text-xs font-mono-tech font-bold text-[#061A1E] dark:text-white uppercase"
              />
            </div>

            <div className="space-y-2 p-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-[#131924] font-mono-tech text-xs mb-5">
              <div className="flex justify-between">
                <span className="text-[#8E8B82]">Reservation Window:</span>
                <span className="font-bold text-[#061A1E] dark:text-white">15 Minutes Hold</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E8B82]">Energy Rate:</span>
                <span className="font-bold text-[#299093]">{activeStation.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E8B82]">Reservation Fee:</span>
                <span className="font-bold text-[#00D68F] uppercase">₹0.00 (Free)</span>
              </div>
            </div>

            <button
              onClick={() => confirmReservation(activeStation)}
              className="btn-onuz w-full h-11 text-sm group"
            >
              <span className="wipe-layer wipe-layer-1 bg-[#EF6156]" />
              <span className="wipe-layer wipe-layer-2 bg-[#299093]" />
              <span className="wipe-layer wipe-layer-3 bg-[#FFBD00]" />
              <span className="btn-content">
                <span className="group-hover:text-[#061A1E] transition-colors">CONFIRM & HOLD GUN</span>
                <ArrowUpRight className="w-4 h-4 group-hover:text-[#061A1E] transition-colors" />
              </span>
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
