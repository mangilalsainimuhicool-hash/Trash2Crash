/**
 * Centralized Material & Pricing Configuration for Trash2Cash
 * 
 * Single source of truth for:
 * - Waste material categories
 * - Recyclability status
 * - Value rates per KG
 * - Typical unit weights (for single object estimation)
 * - Deterministic value calculations
 */

export const MATERIAL_CONFIG = {
  plastic: {
    id: 'plastic',
    category: 'Plastic',
    wasteType: 'Plastic Bottle',
    material: 'PET Plastic',
    recyclable: true,
    valuePerKg: 32, // ₹32/kg (0.25 kg = ₹8)
    avgUnitWeightKg: 0.25,
    color: '#2563eb',
    badgeClass: 'badge-plastic',
    description: 'Clean PET water bottles, HDPE detergent jugs, rigid containers.'
  },
  paper: {
    id: 'paper',
    category: 'Paper',
    wasteType: 'Paper Sheets / Newsprint',
    material: 'Office Paper / Kraft Paper',
    recyclable: true,
    valuePerKg: 18, // ₹18/kg
    avgUnitWeightKg: 0.20,
    color: '#0284c7',
    badgeClass: 'badge-paper',
    description: 'Dry newspapers, office paper, notebooks, and print sheets.'
  },
  cardboard: {
    id: 'cardboard',
    category: 'Cardboard',
    wasteType: 'Cardboard Box / Packaging',
    material: 'Corrugated Cardboard',
    recyclable: true,
    valuePerKg: 15, // ₹15/kg
    avgUnitWeightKg: 0.30,
    color: '#d97706',
    badgeClass: 'badge-cardboard',
    description: 'Corrugated cartons, packaging boxes, and shipping parcels.'
  },
  metal: {
    id: 'metal',
    category: 'Metal',
    wasteType: 'Metal Beverage Can',
    material: 'Aluminium / Tin Alloy',
    recyclable: true,
    valuePerKg: 40, // ₹40/kg
    avgUnitWeightKg: 0.15,
    color: '#475569',
    badgeClass: 'badge-metal',
    description: 'Aluminium soda cans, tin food cans, and clean metal scrap.'
  },
  glass: {
    id: 'glass',
    category: 'Glass',
    wasteType: 'Glass Bottle / Jar',
    material: 'Silica Glass',
    recyclable: true,
    valuePerKg: 10, // ₹10/kg
    avgUnitWeightKg: 0.35,
    color: '#0891b2',
    badgeClass: 'badge-glass',
    description: 'Clean beverage bottles, condiment jars, and intact glassware.'
  },
  organic: {
    id: 'organic',
    category: 'Organic',
    wasteType: 'Organic / Food Waste',
    material: 'Biodegradable Compostable',
    recyclable: false, // Compostable, non-cash scrap
    valuePerKg: 0,
    avgUnitWeightKg: 0.25,
    color: '#16a34a',
    badgeClass: 'badge-organic',
    description: 'Fruit peels, vegetable scraps, and leftover organic food waste.'
  },
  ewaste: {
    id: 'ewaste',
    category: 'E-Waste',
    wasteType: 'Electronic / Battery Waste',
    material: 'Electronic Components / PCB',
    recyclable: true,
    valuePerKg: 60, // ₹60/kg
    avgUnitWeightKg: 0.25,
    color: '#dc2626',
    badgeClass: 'badge-ewaste',
    description: 'Batteries, cables, circuit boards, and discarded gadgets.'
  },
  mixed: {
    id: 'mixed',
    category: 'Mixed Waste',
    wasteType: 'Mixed / Unknown Waste',
    material: 'Non-segregated / Multi-layer',
    recyclable: false,
    valuePerKg: 0,
    avgUnitWeightKg: 0.15,
    color: '#64748b',
    badgeClass: 'badge-mixed',
    description: 'Complex multi-layer packaging that cannot be recycled.'
  }
};

/**
 * Get configuration by category or material key
 */
export function getMaterialConfig(key) {
  if (!key) return MATERIAL_CONFIG.mixed;
  const normalizedKey = String(key).toLowerCase().trim();

  if (normalizedKey === 'plastic' || normalizedKey.includes('plastic') || normalizedKey.includes('pet') || normalizedKey.includes('hdpe') || normalizedKey.includes('bottle')) {
    return MATERIAL_CONFIG.plastic;
  }
  if (normalizedKey === 'cardboard' || normalizedKey.includes('cardboard') || normalizedKey.includes('carton') || normalizedKey.includes('box')) {
    return MATERIAL_CONFIG.cardboard;
  }
  if (normalizedKey === 'paper' || normalizedKey.includes('paper') || normalizedKey.includes('sheet') || normalizedKey.includes('newspaper')) {
    return MATERIAL_CONFIG.paper;
  }
  if (normalizedKey === 'metal' || normalizedKey.includes('metal') || normalizedKey.includes('can') || normalizedKey.includes('aluminium') || normalizedKey.includes('tin')) {
    return MATERIAL_CONFIG.metal;
  }
  if (normalizedKey === 'glass' || normalizedKey.includes('glass') || normalizedKey.includes('jar')) {
    return MATERIAL_CONFIG.glass;
  }
  if (normalizedKey === 'organic' || normalizedKey.includes('organic') || normalizedKey.includes('food') || normalizedKey.includes('peel') || normalizedKey.includes('fruit') || normalizedKey.includes('vegetable')) {
    return MATERIAL_CONFIG.organic;
  }
  if (normalizedKey === 'ewaste' || normalizedKey.includes('ewaste') || normalizedKey.includes('electronic') || normalizedKey.includes('battery') || normalizedKey.includes('cable')) {
    return MATERIAL_CONFIG.ewaste;
  }

  return MATERIAL_CONFIG[normalizedKey] || MATERIAL_CONFIG.mixed;
}

/**
 * Deterministically compute estimated value from material and weight
 * Formula: weight (kg) × material rate (₹/kg)
 */
export function calculateEstimatedValue(materialConfig, weightKg) {
  if (!materialConfig || !materialConfig.recyclable || !materialConfig.valuePerKg) {
    return 0;
  }
  const weight = Number(weightKg) || materialConfig.avgUnitWeightKg || 0.25;
  const rate = Number(materialConfig.valuePerKg) || 0;
  return Math.round(weight * rate);
}

/**
 * 7 Canonical Waste Categories for Manual Image Upload Selection
 */
export const MANUAL_CATEGORIES = [
  {
    id: 'plastic',
    label: 'Plastic',
    icon: '🧴',
    material: 'PET Plastic',
    wasteType: 'Plastic Recyclable',
    rate: 32,
    recyclable: true,
    subtext: 'PET/HDPE Bottles, Jars, Containers'
  },
  {
    id: 'paper',
    label: 'Paper',
    icon: '📄',
    material: 'Office Paper / Kraft',
    wasteType: 'Paper Recyclable',
    rate: 18,
    recyclable: true,
    subtext: 'Newspaper, Office Sheets, Books'
  },
  {
    id: 'cardboard',
    label: 'Cardboard',
    icon: '📦',
    material: 'Corrugated Cardboard',
    wasteType: 'Cardboard Box',
    rate: 15,
    recyclable: true,
    subtext: 'Cartons, Packaging & Shipping Boxes'
  },
  {
    id: 'metal',
    label: 'Metal',
    icon: '🥫',
    material: 'Aluminium / Tin Alloy',
    wasteType: 'Metal Beverage Can',
    rate: 40,
    recyclable: true,
    subtext: 'Aluminium Cans, Tin Food Cans, Foil'
  },
  {
    id: 'glass',
    label: 'Glass',
    icon: '🫙',
    material: 'Silica Glass',
    wasteType: 'Glass Bottle / Jar',
    rate: 10,
    recyclable: true,
    subtext: 'Beverage Bottles, Condiment Jars'
  },
  {
    id: 'organic',
    label: 'Organic',
    icon: '🍌',
    material: 'Biodegradable Compostable',
    wasteType: 'Organic Food Waste',
    rate: 0,
    recyclable: false,
    subtext: 'Fruit Peels, Veggie Scraps (Compost)'
  },
  {
    id: 'ewaste',
    label: 'E-Waste',
    icon: '🔋',
    material: 'Electronic Components',
    wasteType: 'Electronic / Battery Waste',
    rate: 60,
    recyclable: true,
    subtext: 'Batteries, Cables, Gadgets, PCBs'
  }
];
