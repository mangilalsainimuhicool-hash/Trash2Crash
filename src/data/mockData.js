export const WASTE_RATES = {
  paper: 18,
  plastic: 25,
  metal: 40,
  ewaste: 60,
  cardboard: 15,
  other: 10
};

export const WASTE_CATEGORIES = [
  {
    id: 'paper',
    name: 'Paper',
    rate: 18,
    unit: 'kg',
    icon: 'Newspaper',
    emoji: '📰',
    popular: true,
    tagline: 'Save trees & conserve clean water',
    description: 'Newspapers, cardboard boxes, old textbooks, office stationery, paper bags, and mixed magazines.',
    acceptedItems: [
      'Newspapers & Gazettes',
      'Corrugated Cardboard Boxes',
      'School & College Textbooks',
      'White Office & Printer Paper',
      'Magazines & Envelopes'
    ],
    notAccepted: [
      'Wet or greasy paper (e.g., pizza boxes)',
      'Wax-coated paper cups & plates',
      'Used tissue / carbon paper'
    ],
    environmentalImpact: 'Recycling 54 kg of paper saves 1 mature tree and 2,600 liters of fresh water.'
  },
  {
    id: 'plastic',
    name: 'Plastic',
    rate: 25,
    unit: 'kg',
    icon: 'Bottle',
    emoji: '🧴',
    popular: true,
    tagline: 'Stop landfill pollution & ocean waste',
    description: 'PET water bottles, HDPE milk jugs, rigid plastic containers, food packaging, and clean plastic drums.',
    acceptedItems: [
      'PET Beverage & Mineral Water Bottles',
      'HDPE Shampoo & Detergent Jugs',
      'Rigid buckets, tubs, & chairs',
      'Clean polythene packaging covers',
      'Plastic crates & containers'
    ],
    notAccepted: [
      'Thin single-use wrappers contaminated with oil',
      'Thermocol / Styrofoam (expanded polystyrene)',
      'Hazardous pesticide or medical bottles'
    ],
    environmentalImpact: 'Recycling 1 ton of plastic saves 5,774 kWh of electricity and 16.3 barrels of crude oil.'
  },
  {
    id: 'metal',
    name: 'Metal',
    rate: 40,
    unit: 'kg',
    icon: 'Hammer',
    emoji: '🔩',
    popular: false,
    tagline: 'Infinite recyclability with zero quality loss',
    description: 'Iron scraps, aluminum beverage cans, copper wiring, brass utensils, tins, and kitchen cookware.',
    acceptedItems: [
      'Aluminum beverage cans & foil trays',
      'Iron rods, grilles, and scrap metal',
      'Brass utensils, taps & fittings',
      'Clean copper wires and stripped pipes',
      'Tin cans and stainless steel utensils'
    ],
    notAccepted: [
      'Aerosol spray cans with residual chemicals',
      'Radioactive or toxic contaminated scrap',
      'Paint cans with wet chemical paint'
    ],
    environmentalImpact: 'Recycling metal uses 95% less energy than producing virgin metal from raw bauxite ore.'
  },
  {
    id: 'ewaste',
    name: 'E-Waste',
    rate: 60,
    unit: 'kg',
    icon: 'Cpu',
    emoji: '💻',
    popular: true,
    tagline: 'Safely recover precious & rare earth metals',
    description: 'Obsolete smartphones, defunct laptops, circuit boards, power cables, old printers, and electronics.',
    acceptedItems: [
      'Old smartphones, tablets & feature phones',
      'Desktop CPUs, motherboards & RAM sticks',
      'Laptops, power adapters & chargers',
      'Printers, keypads & PC peripherals',
      'Small kitchen electric appliances'
    ],
    notAccepted: [
      'Cracked CRT televisions / mercury lamps',
      'Leaking or bloated lithium battery packs',
      'Broken CFL bulbs and tube lights'
    ],
    environmentalImpact: 'Safe recycling prevents heavy metals like Lead, Cadmium, and Mercury from poisoning groundwater.'
  },
  {
    id: 'cardboard',
    name: 'Cardboard',
    rate: 15,
    unit: 'kg',
    icon: 'Boxes',
    emoji: '📦',
    popular: false,
    tagline: 'High volume packaging repurposing',
    description: 'Clean shipping cartons, corrugated boxes, cereal boxes, and heavy craft packaging boards.',
    acceptedItems: [
      'Brown Shipping & Delivery Cartons',
      'Corrugated Storage Boxes',
      'Unsoiled Food Product Cartons',
      'Shoe Boxes & Packaging Liners'
    ],
    notAccepted: [
      'Greasy pizza boxes with cheese/oil',
      'Wax/plastic composite cartons',
      'Water-damaged mouldy boxes'
    ],
    environmentalImpact: 'Recycling 1 ton of cardboard saves 9 cubic yards of landfill space and 4,000 gallons of water.'
  },
  {
    id: 'other',
    name: 'Other Recyclable',
    rate: 10,
    unit: 'kg',
    icon: 'Recycle',
    emoji: '♻️',
    popular: false,
    tagline: 'Assorted verified recyclable scraps',
    description: 'Glass bottles, broken clean plastics, mixed wires, and sorted dry packaging materials.',
    acceptedItems: [
      'Clear Glass Bottles & Jars',
      'Mixed Dry Packaging Materials',
      'Stripped Electrical Wires',
      'Hard Plastics & Household Tools'
    ],
    notAccepted: [
      'Wet kitchen organic refuse',
      'Biomedical or toxic chemical containers',
      'Mirror glass or light bulbs'
    ],
    environmentalImpact: 'Diverts secondary miscellaneous dry items into secondary industrial production loops.'
  }
];

export const INITIAL_USER = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  phone: '+91 98765 43210',
  address: 'Flat 402, Green Meadows, 14th Cross',
  city: 'Bengaluru',
  pincode: '560034',
  memberSince: 'March 2024'
};

export const INITIAL_STATS = {
  totalWasteSold: 127,
  totalEarnings: 3420,
  pickupsCompleted: 8,
  co2Saved: 64
};

export const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-7281',
    date: '2026-08-28',
    wasteType: 'Plastic',
    quantity: 24,
    rate: 25,
    earnings: 600,
    status: 'Completed',
    paymentMethod: 'UPI'
  },
  {
    id: 'TXN-6914',
    date: '2026-08-15',
    wasteType: 'Paper',
    quantity: 35,
    rate: 18,
    earnings: 630,
    status: 'Completed',
    paymentMethod: 'Cash'
  },
  {
    id: 'TXN-5820',
    date: '2026-07-30',
    wasteType: 'Metal',
    quantity: 18,
    rate: 40,
    earnings: 720,
    status: 'Completed',
    paymentMethod: 'UPI'
  },
  {
    id: 'TXN-5102',
    date: '2026-07-12',
    wasteType: 'E-Waste',
    quantity: 12,
    rate: 60,
    earnings: 720,
    status: 'Completed',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'TXN-4421',
    date: '2026-06-25',
    wasteType: 'Plastic',
    quantity: 15,
    rate: 25,
    earnings: 375,
    status: 'Completed',
    paymentMethod: 'UPI'
  },
  {
    id: 'TXN-3910',
    date: '2026-06-08',
    wasteType: 'Paper',
    quantity: 21,
    rate: 18,
    earnings: 378,
    status: 'Completed',
    paymentMethod: 'Cash'
  },
  {
    id: 'TXN-2804',
    date: '2026-09-04',
    wasteType: 'E-Waste',
    quantity: 8,
    rate: 60,
    earnings: 480,
    status: 'Scheduled',
    paymentMethod: 'UPI'
  },
  {
    id: 'TXN-2198',
    date: '2026-09-02',
    wasteType: 'Metal',
    quantity: 14,
    rate: 40,
    earnings: 560,
    status: 'Processing',
    paymentMethod: 'UPI'
  }
];

export const INITIAL_UPCOMING_PICKUPS = [
  {
    id: 'TTC-94812',
    wasteType: 'E-Waste',
    quantity: 8,
    rate: 60,
    estimatedEarnings: 480,
    date: '2026-09-05',
    timeSlot: '9:00 AM - 12:00 PM',
    address: 'Flat 402, Green Meadows, 14th Cross, Bengaluru, 560034',
    status: 'Scheduled',
    agentName: 'Ramesh Kumar (Recycle Partner #402)',
    agentPhone: '+91 98450 11223'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Select Your Waste',
    subtitle: 'Segregate with ease',
    description: 'Sort your dry recyclables into Paper, Plastic, Metal, Cardboard or E-Waste using our simple accepted items guide.',
    icon: 'CheckCircle2'
  },
  {
    step: '02',
    title: 'Enter Quantity',
    subtitle: 'Transparent instant rates',
    description: 'Enter your estimated weight in kilograms. Our dynamic real-time calculator estimates your payout instantly.',
    icon: 'Calculator'
  },
  {
    step: '03',
    title: 'Schedule Pickup',
    subtitle: 'Zero-effort doorstep visit',
    description: 'Choose your preferred date and convenient 3-hour time slot. Our verified green agent arrives right at your doorstep.',
    icon: 'CalendarClock'
  },
  {
    step: '04',
    title: 'Get Paid',
    subtitle: 'Immediate cash or UPI transfer',
    description: 'Items are weighed in front of you on certified digital scales. Receive instantaneous payment via UPI or cash.',
    icon: 'Coins'
  }
];

export const IMPACT_METRICS = [
  {
    label: 'Waste Recycled',
    value: '52,400+ kg',
    subtext: 'Diverted from toxic landfills',
    icon: 'Recycle'
  },
  {
    label: 'CO₂ Reduced',
    value: '26,800+ kg',
    subtext: 'Offset carbon footprint',
    icon: 'Leaf'
  },
  {
    label: 'Active Users',
    value: '14,200+',
    subtext: 'Eco-conscious citizens',
    icon: 'Users'
  },
  {
    label: 'Pickups Completed',
    value: '9,850+',
    subtext: '100% verified digital weighing',
    icon: 'Truck'
  }
];

export const TIME_SLOTS = [
  '9:00 AM - 12:00 PM',
  '12:00 PM - 3:00 PM',
  '3:00 PM - 6:00 PM'
];

// ==========================================
// AI & CAMPUS INTELLIGENCE DATASETS
// ==========================================

export const AI_WASTE_CLASSIFICATIONS = [
  {
    id: 'wet',
    name: 'Wet Waste',
    color: '#16a34a',
    badgeClass: 'badge-wet',
    icon: 'Apple',
    examples: 'Food waste, cooked leftovers, vegetable peels, fruit skins, tea leaves, compostable organic scraps',
    binColor: 'Green Bin',
    handling: 'Sent to on-campus aerobic compost digester or biogas plant'
  },
  {
    id: 'dry',
    name: 'Dry Waste',
    color: '#2563eb',
    badgeClass: 'badge-dry',
    icon: 'Package',
    examples: 'Plastic bottles, cartons, aluminium cans, paper cups, milk pouches, cardboard boxes, clean wrappers',
    binColor: 'Blue Bin',
    handling: 'Sorted at campus Material Recovery Facility (MRF) and baled for mill recycling'
  },
  {
    id: 'sanitary',
    name: 'Sanitary Waste',
    color: '#dc2626',
    badgeClass: 'badge-sanitary',
    icon: 'HeartPulse',
    examples: 'Sanitary pads, diapers, medical bandages, cotton swabs, soiled tissues, hygiene wraps',
    binColor: 'Red / Marked Bin',
    handling: 'Incinerated in bio-medical thermal sterilizers per municipal health guidelines'
  },
  {
    id: 'special',
    name: 'Special / E-Waste',
    color: '#ea580c',
    badgeClass: 'badge-special',
    icon: 'Zap',
    examples: 'Dead batteries, circuit boards, LED tubes, chemical reagent bottles, CFLs, aerosol spray cans',
    binColor: 'Orange / Black Bin',
    handling: 'Safe custody transfer to authorized State Pollution Control Board e-waste dismantlers'
  }
];

export const CAMPUS_INTELLIGENCE_STATS = {
  totalWasteEvents: 1248,
  segregationAccuracy: 84.2,
  contaminationRate: 15.8,
  recyclableWasteKg: 726,
  topProblemArea: 'Canteen',
  activeSensors: 14,
  cleanlinessScore: 82
};

export const CAMPUS_LOCATIONS = [
  {
    id: 'library',
    name: 'Central Library',
    accuracy: 94,
    status: 'Excellent',
    statusColor: 'green',
    totalEvents: 182,
    contaminationRate: 6,
    primaryWaste: 'Paper, Notebooks, Water Bottles',
    trend: '+4% this week',
    alert: null
  },
  {
    id: 'lab',
    name: 'Science & Engineering Lab',
    accuracy: 89,
    status: 'Good',
    statusColor: 'green',
    totalEvents: 215,
    contaminationRate: 11,
    primaryWaste: 'Special E-waste, Cardboard, Packaging',
    trend: '+2% this week',
    alert: null
  },
  {
    id: 'classrooms',
    name: 'Classroom Block A & B',
    accuracy: 87,
    status: 'Good',
    statusColor: 'green',
    totalEvents: 340,
    contaminationRate: 13,
    primaryWaste: 'Paper, Stationery, Plastic Bottles',
    trend: 'Stable',
    alert: null
  },
  {
    id: 'parking',
    name: 'Main Parking & Lawns',
    accuracy: 85,
    status: 'Good',
    statusColor: 'green',
    totalEvents: 110,
    contaminationRate: 15,
    primaryWaste: 'PET bottles, Snack Wrappers',
    trend: '+1% this week',
    alert: null
  },
  {
    id: 'hostel',
    name: 'Student Hostels (H1 & H2)',
    accuracy: 81,
    status: 'Moderate',
    statusColor: 'yellow',
    totalEvents: 286,
    contaminationRate: 19,
    primaryWaste: 'E-commerce boxes, Food delivery packages',
    trend: '-3% this week',
    alert: 'Cardboard accumulation observed near H1 ground floor'
  },
  {
    id: 'canteen',
    name: 'Central Food Court & Canteen',
    accuracy: 63,
    status: 'Needs Attention',
    statusColor: 'red',
    totalEvents: 415,
    contaminationRate: 37,
    primaryWaste: 'Food-contaminated plastic plates, Beverage cups, Gravy-soaked paper',
    trend: '-8% this week',
    alert: 'High contamination rate (37%) near Beverage Counter B. Immediate bin signage needed.'
  }
];

export const CAMPUS_CLEANLINESS_DATA = {
  overallScore: 82,
  auditDate: 'September 2026',
  zones: {
    clean: [
      { name: 'Central Library', score: 96, binsCount: 8, lastCleaned: '25 mins ago' },
      { name: 'Administrative Block', score: 94, binsCount: 6, lastCleaned: '40 mins ago' },
      { name: 'Classroom Block A', score: 90, binsCount: 12, lastCleaned: '1 hour ago' },
      { name: 'Robotics & Tech Lab', score: 92, binsCount: 4, lastCleaned: '1.5 hours ago' }
    ],
    moderate: [
      { name: 'Student Hostel H1 Corridor', score: 81, binsCount: 10, lastCleaned: '2 hours ago' },
      { name: 'Sports Complex & Pavilion', score: 78, binsCount: 6, lastCleaned: '3 hours ago' },
      { name: 'Vehicle Parking Zone', score: 84, binsCount: 4, lastCleaned: '2 hours ago' }
    ],
    attention: [
      { name: 'Canteen Beverage Counter', score: 58, binsCount: 6, lastCleaned: '45 mins ago', issue: 'Mixed gravy and PET bottles' },
      { name: 'Hostel H2 Rear Courtyard', score: 62, binsCount: 4, lastCleaned: '4 hours ago', issue: 'Overflowing delivery cartons' }
    ]
  },
  recentIncidents: [
    {
      id: 'INC-402',
      location: 'Canteen Bin #3',
      wasteType: 'Food Waste thrown into Dry Bin',
      time: '12:45 PM Today',
      severity: 'Medium',
      status: 'Resolved',
      action: 'Bin cleaned & warning audio trigger played'
    },
    {
      id: 'INC-401',
      location: 'Science Lab 204',
      wasteType: 'Li-ion battery in Paper basket',
      time: '10:15 AM Today',
      severity: 'High',
      status: 'Resolved',
      action: 'Relocated to Hazardous E-Waste container'
    },
    {
      id: 'INC-400',
      location: 'Hostel H1 Lounge',
      wasteType: 'Unflattened delivery cardboard stack',
      time: '09:00 AM Today',
      severity: 'Low',
      status: 'Pending Collection',
      action: 'Scheduled for 3:00 PM porter pickup'
    }
  ]
};

export const AI_CAMPUS_INSIGHTS = [
  {
    id: 'INS-01',
    severity: 'critical',
    title: 'Canteen Contamination Spike during Lunch Peak (12:30 PM - 2:00 PM)',
    description: 'Camera sensor CAM-04 at Canteen Counter B recorded a 37% contamination rate. Over 74% of errors occur when students discard oily gravy plates into Dry Recyclable bins.',
    evidence: '415 detection events • 153 contaminated items logged this week',
    recommendedAction: 'Install 2 designated Organic Food Scrap Chutes directly beside the tray return counter. Add high-contrast bilingual visual signage.',
    impactEstimate: 'Estimated to improve Canteen Segregation Accuracy from 63% to 88% within 5 days.'
  },
  {
    id: 'INS-02',
    severity: 'moderate',
    title: 'Surge in High-Grade Cardboard in Student Hostel H1',
    description: 'Post-weekend deliveries generated over 48 kg of clean corrugated cardboard. Bins reached 90% volume capacity by 11:00 AM.',
    evidence: 'Hostel H1 generated 48 kg cardboard • Value ~₹720 recyclable revenue',
    recommendedAction: 'Place a dedicated flat-pack cardboard cage on H1 Ground Floor. Schedule automated morning clearing on Mondays and Thursdays.',
    impactEstimate: 'Prevents bin overflows and recovers ₹2,800/month in institutional scrap revenue.'
  },
  {
    id: 'INS-03',
    severity: 'info',
    title: 'Exemplary Compliance in Central Library',
    description: 'Library users achieved 94% segregation accuracy with zero organic food contamination throughout the semester exam period.',
    evidence: '182 clean dry events • 0 food waste violations detected',
    recommendedAction: 'Recognize the Library Green Student Council with Campus Eco Credits.',
    impactEstimate: 'Sets benchmark behavior standard for academic buildings.'
  }
];

export const QR_TRACKING_SAMPLES = [
  {
    trackingId: 'TRASH2CASH-001245',
    batchName: 'Hostel H1 Recyclable Plastics & Cartons',
    weightKg: 24.5,
    wasteType: 'Plastic & Cardboard',
    collectionLocation: 'Student Hostel H1 - Bin Cluster B',
    collectionTime: '04 Sep 2026, 11:30 AM',
    agentName: 'Suresh Kumar (Campus Green Porter #14)',
    status: 'Sent to Recycler',
    steps: [
      { label: 'Collected at Source', time: '11:30 AM', completed: true },
      { label: 'Verified on Bluetooth Scale (24.5 kg)', time: '11:42 AM', completed: true },
      { label: 'Segregation Check Passed (98%)', time: '12:05 PM', completed: true },
      { label: 'Dispatched to Baler Recycler Facility', time: '01:15 PM', completed: true }
    ],
    payoutCredited: '₹540.00 to Campus Green Fund'
  },
  {
    trackingId: 'TRASH2CASH-001244',
    batchName: 'Admin Block Clean Paper Scraps',
    weightKg: 38.0,
    wasteType: 'Office Paper',
    collectionLocation: 'Admin Block Records Room',
    collectionTime: '03 Sep 2026, 04:15 PM',
    agentName: 'Manoj Singh (Partner #08)',
    status: 'Verified',
    steps: [
      { label: 'Collected at Source', time: '04:15 PM', completed: true },
      { label: 'Verified on Bluetooth Scale (38.0 kg)', time: '04:30 PM', completed: true },
      { label: 'En Route to Mill', time: 'Pending', completed: false }
    ],
    payoutCredited: '₹684.00 Pending Clearance'
  }
];

export const DEMO_DETECTION_EVENTS = [
  {
    id: 'DET-101',
    object: 'Plastic Water Bottle',
    confidence: 94,
    category: 'Dry Waste',
    classificationId: 'dry',
    binUsed: 'Blue Bin (Dry)',
    status: 'Correct',
    isContaminated: false,
    location: 'Canteen Counter B',
    timestamp: '10:42 AM',
    box: { x: 28, y: 35, width: 44, height: 42 },
    details: 'Empty PET mineral water bottle with cap intact. Suitable for immediate baling.',
    rewardValue: '₹2.50'
  },
  {
    id: 'DET-102',
    object: 'Banana Peel',
    confidence: 97,
    category: 'Wet Waste',
    classificationId: 'wet',
    binUsed: 'Green Bin (Wet)',
    status: 'Correct',
    isContaminated: false,
    location: 'Canteen Refreshment Table',
    timestamp: '10:43 AM',
    box: { x: 38, y: 45, width: 34, height: 32 },
    details: 'Organic fruit residue. Routed to aerobic campus compost digester.',
    rewardValue: '1 Eco Point'
  },
  {
    id: 'DET-103',
    object: 'Food-Contaminated Plastic Container',
    confidence: 91,
    category: 'Dry Waste',
    classificationId: 'dry',
    binUsed: 'Blue Bin (Dry)',
    status: 'Incorrect',
    isContaminated: true,
    expectedCategory: 'Dry (Clean) or Cleaned before disposal',
    detectedCategory: 'Wet / Gravy Contamination (38% soiled)',
    location: 'Canteen Counter B',
    timestamp: '10:45 AM',
    box: { x: 20, y: 25, width: 58, height: 50 },
    details: '⚠️ CONTAMINATION DETECTED: Oily butter chicken gravy residue inside single-use plastic takeaway bowl.',
    recommendation: 'Requires rinsing or redirection to separate soiled plastics wash line.'
  },
  {
    id: 'DET-104',
    object: 'Aluminium Beverage Can',
    confidence: 96,
    category: 'Dry Waste',
    classificationId: 'dry',
    binUsed: 'Blue Bin (Dry)',
    status: 'Correct',
    isContaminated: false,
    location: 'Central Library Lawn',
    timestamp: '10:47 AM',
    box: { x: 35, y: 30, width: 36, height: 45 },
    details: 'Clean crushed soda can. 100% infinitely recyclable high-grade metal.',
    rewardValue: '₹4.00'
  },
  {
    id: 'DET-105',
    object: 'Cardboard Packaging Box',
    confidence: 93,
    category: 'Dry Waste',
    classificationId: 'dry',
    binUsed: 'Blue Bin (Dry)',
    status: 'Correct',
    isContaminated: false,
    location: 'Hostel H1 Entryway',
    timestamp: '10:50 AM',
    box: { x: 22, y: 28, width: 54, height: 48 },
    details: 'Clean corrugated box. Flatted and free of tape. Excellent bulk paper value.',
    rewardValue: '₹3.50'
  },
  {
    id: 'DET-106',
    object: 'Used Disinfectant Tissue',
    confidence: 89,
    category: 'Sanitary Waste',
    classificationId: 'sanitary',
    binUsed: 'Red Bin (Sanitary)',
    status: 'Correct',
    isContaminated: false,
    location: 'Bio-Chem Laboratory',
    timestamp: '10:53 AM',
    box: { x: 42, y: 40, width: 30, height: 35 },
    details: 'Hygiene and sanitization wipe. Properly discarded into hazardous/sanitary disposal line.',
    rewardValue: 'Compliance Logged'
  }
];
