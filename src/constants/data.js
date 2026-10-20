// Core Data Constants for ONUZ Platform

export const CONNECTED_NETWORKS = [
  { name: 'Tata Power EZ Charge', guns: '5,400+ Guns', power: '60kW - 120kW', tagColor: '#061A1E' },
  { name: 'Zeon Charging', guns: '2,800+ Guns', power: '120kW - 240kW', tagColor: '#299093' },
  { name: 'Shell Recharge', guns: '1,200+ Guns', power: '150kW HyperHubs', tagColor: '#FFBD00' },
  { name: 'Jio-bp pulse', guns: '3,100+ Guns', power: '60kW DC Fast', tagColor: '#EF6156' },
  { name: 'ChargeZone', guns: '2,400+ Guns', power: '240kW Ultra', tagColor: '#299093' },
  { name: 'Statiq Grid', guns: '1,900+ Guns', power: 'Pan-India', tagColor: '#061A1E' },
  { name: 'Relux Electric', guns: '850+ Guns', power: 'Expressway', tagColor: '#EF6156' },
  { name: 'Kazam Energy', guns: '1,600+ AC/DC', power: 'Urban Nodes', tagColor: '#FFBD00' }
];

export const STATIONS_DATA = [
  {
    id: 1,
    name: 'Zeon UltraHub - Indiranagar 100ft',
    network: 'Zeon Charging',
    networkTag: 'ZEON',
    tagColor: '#299093',
    distance: '1.2 km',
    speed: '120 kW Dual DC',
    tariffNum: 18.0,
    price: '₹18.0 / kWh',
    availableSlots: 3,
    totalSlots: 4,
    status: 'Available',
    plugTypes: ['CCS2 Fast', 'Type 2 AC'],
    latLng: 'Indiranagar, Bengaluru'
  },
  {
    id: 2,
    name: 'Tata Power EZ Charge - MG Road Metro',
    network: 'Tata Power',
    networkTag: 'TATA POWER',
    tagColor: '#061A1E',
    distance: '2.5 km',
    speed: '60 kW DC Fast',
    tariffNum: 19.5,
    price: '₹19.5 / kWh',
    availableSlots: 1,
    totalSlots: 2,
    status: 'Available',
    plugTypes: ['CCS2 Fast'],
    latLng: 'MG Road, Bengaluru'
  },
  {
    id: 3,
    name: 'Shell Recharge Corridor - Koramangala',
    network: 'Shell Recharge',
    networkTag: 'SHELL',
    tagColor: '#FFBD00',
    distance: '3.8 km',
    speed: '150 kW HyperHub',
    tariffNum: 20.0,
    price: '₹20.0 / kWh',
    availableSlots: 3,
    totalSlots: 4,
    status: 'Available',
    plugTypes: ['CCS2 Fast', 'CHAdeMO'],
    latLng: 'Koramangala 5th Block'
  },
  {
    id: 4,
    name: 'Jio-bp pulse - Outer Ring Road',
    network: 'Jio-bp pulse',
    networkTag: 'JIO-BP',
    tagColor: '#EF6156',
    distance: '4.1 km',
    speed: '60 kW DC',
    tariffNum: 18.5,
    price: '₹18.5 / kWh',
    availableSlots: 0,
    totalSlots: 2,
    status: 'Busy',
    plugTypes: ['CCS2 Fast'],
    latLng: 'Bellandur ORR, Bengaluru'
  },
  {
    id: 5,
    name: 'ChargeZone Highway Point - Electronic City',
    network: 'ChargeZone',
    networkTag: 'CHARGEZONE',
    tagColor: '#299093',
    distance: '6.4 km',
    speed: '240 kW Ultra Express',
    tariffNum: 17.5,
    price: '₹17.5 / kWh',
    availableSlots: 5,
    totalSlots: 6,
    status: 'Available',
    plugTypes: ['CCS2 Fast', 'Type 2 AC'],
    latLng: 'Electronic City Phase 1'
  }
];

export const SYSTEM_MODULES = [
  {
    id: 'queue',
    tag: 'MODULE 01',
    accentColor: '#EF6156',
    title: 'Predictive Queue Intelligence',
    subtitle: 'Machine-learning models predict station congestion before you arrive',
    description: 'Using real-time telemetry from connected vehicles and historical station utilization patterns, ONUZ accurately forecasts gun availability 30 to 60 minutes in advance, rerouting you away from bottlenecked hubs.',
    specs: [
      { label: 'Forecast Window', val: '30–60 Min' },
      { label: 'Demo Refresh', val: 'Illustrative' },
      { label: 'Route Options', val: 'Nearby Hubs' }
    ],
    previewType: 'queueRadar'
  },
  {
    id: 'wallet',
    tag: 'MODULE 02',
    accentColor: '#FFBD00',
    title: 'Unified One-Tap AutoPay',
    subtitle: 'Universal billing across every Indian CPO network',
    description: 'Stop maintaining separate pre-loaded balances across 8 different operator wallets. ONUZ links with your UPI, Fastag, or credit card for automatic post-charge deduction, accompanied by a single consolidated monthly GST tax invoice.',
    specs: [
      { label: 'Supported Gateways', val: 'UPI, Cards, Fastag' },
      { label: 'Tax Compliant', val: 'Consolidated GST' },
      { label: 'Preload Required', val: '₹0.00' }
    ],
    previewType: 'walletPass'
  },
  {
    id: 'cpo',
    tag: 'MODULE 03',
    accentColor: '#061A1E',
    title: 'CPO Grid Balancing & Yield AI',
    subtitle: 'Dynamic throughput optimization for charging operators',
    description: 'For Charge Point Operators (CPOs), ONUZ is designed to help route demand across nearby hubs, improve charger utilization, and account for local grid constraints.',
    specs: [
      { label: 'Optimization Focus', val: 'Utilization' },
      { label: 'Grid Constraints', val: 'Peak Load' },
      { label: 'Protocol Scope', val: 'OCPI / OCPP' }
    ],
    previewType: 'gridHub'
  }
];

export const CORRIDOR_HUBS = {
  'blr-mys': {
    title: 'BENGALURU → MYSORE EXPY',
    hubs: [
      { name: 'TATA MANDYA', wait: '0 WAIT', guns: '2 Guns Open', status: '#00D68F' },
      { name: 'SHELL RAMANAGARA', wait: '4 MIN', guns: '1 Gun Finishing', status: '#FFBD00' },
      { name: 'ZEON BIDADI', wait: 'BUSY', guns: 'Full 4/4', status: '#EF6156' }
    ]
  },
  'mum-pun': {
    title: 'MUMBAI → PUNE EXPY',
    hubs: [
      { name: 'CHARGEZONE KHALAPUR', wait: '0 WAIT', guns: '4 Guns Open', status: '#00D68F' },
      { name: 'JIO-BP LONAVALA', wait: '2 MIN', guns: '2 Guns Open', status: '#00D68F' },
      { name: 'TATA TALBEGAON', wait: '12 MIN', guns: 'Queue 2 Cars', status: '#EF6156' }
    ]
  },
  'del-agr': {
    title: 'DELHI → AGRA YAMUNA EXPY',
    hubs: [
      { name: 'STATIQ MATHURA', wait: '0 WAIT', guns: '3 Guns Open', status: '#00D68F' },
      { name: 'ZEON JEWAR', wait: '5 MIN', guns: '1 Gun Finishing', status: '#FFBD00' },
      { name: 'SHELL GREATER NOIDA', wait: '0 WAIT', guns: '6 Guns Open', status: '#00D68F' }
    ]
  }
};

export const ROADMAP_MILESTONES = [
  {
    phase: 'PHASE 01',
    status: 'COMPLETE',
    statusColor: '#299093',
    title: 'OCPI Integration Architecture',
    desc: 'Protocol scope and onboarding flows defined for future charging network integrations.'
  },
  {
    phase: 'PHASE 02',
    status: 'IN DESIGN',
    statusColor: '#FFBD00',
    title: 'Station Data & Payment Pilot',
    desc: 'Preparing station availability and payment flows for pilot validation in Bengaluru and Delhi NCR.'
  },
  {
    phase: 'PHASE 03',
    status: 'NOV 2026',
    statusColor: '#EF6156',
    title: 'Public iOS & Android Store Launch',
    desc: 'Full public rollout with multi-network station discovery, auto-pay, and corporate billing.'
  }
];

export const FAQ_ITEMS = [
  {
    num: '01',
    question: "What is ONUZ and how does it solve EV charger fragmentation in India?",
    answer: "ONUZ (meaning 'On Us') is India's all-in-one EV charging network aggregator. Instead of downloading separate apps for Zeon, Tata Power EZ Charge, Shell Recharge, and ChargeZone, ONUZ brings live station status, pricing, and gun availability into one application via OCPI 2.2 APIs."
  },
  {
    num: '02',
    question: "Do I need separate pre-paid wallets for different charging operators?",
    answer: "No! With ONUZ, you maintain one single wallet and account. You can pay via UPI, Credit Cards, or Auto-Debit, and receive one consolidated monthly GST tax invoice covering all your charges across all operator networks."
  },
  {
    num: '03',
    question: "Are early waitlist members eligible for exclusive launch perks?",
    answer: "Yes! Early adopters who join the ONUZ waitlist receive priority app download links and VIP referral rewards."
  },
  {
    num: '04',
    question: "How can Charge Point Operators (CPOs) partner with ONUZ?",
    answer: "CPOs can contact ONUZ to discuss connecting their network data and exploring demand routing through OCPI and OCPP integrations."
  },
  {
    num: '05',
    question: "Which EV vehicle models are supported by ONUZ?",
    answer: "ONUZ supports all 4-wheeler and 2-wheeler electric vehicles with standard CCS2, Type 2 AC, CHAdeMO, and GB/T connectors, including Tata Nexon EV, Punch EV, MG ZS EV, Comet, Hyundai Ioniq 5, Mahindra XUV400, BYD Atto 3/Seal, Kia EV6, Ather, Ola, and more."
  }
];
