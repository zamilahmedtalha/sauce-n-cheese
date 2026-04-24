export interface ProductData {
  id: string;
  slug: string;
  name: string;
  category: 'burgers' | 'fries' | 'wings' | 'drinks';
  description: string;
  basePrice: number;
  image: string;
  videoHover?: string;
  spicy: boolean;
  bestseller: boolean;
  newest: boolean;
  lowCal: boolean;
  sizes: {
    name: 'S' | 'M' | 'L' | 'XL';
    priceAdd: number;
    grams: number;
  }[];
  allergens: string[];
  nutrition: {
    cal: number;
    fat: number; // g
    sugar: number; // g
    sodium: number; // mg
  };
}

export const products: ProductData[] = [
  {
    id: 'b1',
    slug: 'monster-smash',
    name: 'Monster Smash',
    category: 'burgers',
    description: 'Double smashed beef patties, liquid gold cheese, caramelized onions, signature sauce.',
    basePrice: 850,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1599&auto=format&fit=crop',
    spicy: false,
    bestseller: true,
    newest: false,
    lowCal: false,
    sizes: [
      { name: 'S', priceAdd: 0, grams: 400 },
      { name: 'M', priceAdd: 75, grams: 600 },
      { name: 'L', priceAdd: 150, grams: 900 },
      { name: 'XL', priceAdd: 250, grams: 1200 }
    ],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    nutrition: { cal: 850, fat: 48, sugar: 12, sodium: 1100 }
  },
  {
    id: 'b2',
    slug: 'inferno-crisp',
    name: 'Inferno Crisp',
    category: 'burgers',
    description: 'Crispy fried chicken breast, ghost pepper infused oil, jalapeños, cooling slaw.',
    basePrice: 900,
    image: 'https://images.unsplash.com/photo-1615557627447-0d53c5cd8fc3?q=80&w=1471&auto=format&fit=crop',
    spicy: true,
    bestseller: true,
    newest: true,
    lowCal: false,
    sizes: [
      { name: 'S', priceAdd: 0, grams: 350 },
      { name: 'M', priceAdd: 80, grams: 500 },
      { name: 'L', priceAdd: 160, grams: 750 },
      { name: 'XL', priceAdd: 260, grams: 1000 }
    ],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Soy'],
    nutrition: { cal: 920, fat: 52, sugar: 8, sodium: 1400 }
  },
  {
    id: 'b3',
    slug: 'truffle-shroom',
    name: 'Truffle Shroom',
    category: 'burgers',
    description: 'Quarter pounder, sauteed wild mushrooms, swiss cheese, white truffle mayo.',
    basePrice: 950,
    image: 'https://images.unsplash.com/photo-1594212699903-a15e612cb3e4?q=80&w=1471&auto=format&fit=crop',
    spicy: false,
    bestseller: false,
    newest: true,
    lowCal: false,
    sizes: [
      { name: 'S', priceAdd: 0, grams: 400 },
      { name: 'M', priceAdd: 90, grams: 650 },
      { name: 'L', priceAdd: 180, grams: 950 },
      { name: 'XL', priceAdd: 280, grams: 1250 }
    ],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Sulfites'],
    nutrition: { cal: 780, fat: 42, sugar: 6, sodium: 950 }
  },
  {
    id: 'f1',
    slug: 'loaded-volcano-fries',
    name: 'Volcano Fries',
    category: 'fries',
    description: 'Crinkle cut fries drowning in liquid cheese pump, bacon bits, jalapeño dust.',
    basePrice: 450,
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=80&w=1470&auto=format&fit=crop',
    spicy: true,
    bestseller: true,
    newest: false,
    lowCal: false,
    sizes: [
      { name: 'S', priceAdd: 0, grams: 250 },
      { name: 'M', priceAdd: 100, grams: 400 },
      { name: 'L', priceAdd: 200, grams: 600 },
      { name: 'XL', priceAdd: 300, grams: 850 }
    ],
    allergens: ['Dairy', 'Soy', 'Gluten'],
    nutrition: { cal: 650, fat: 38, sugar: 4, sodium: 1600 }
  },
  {
    id: 'w1',
    slug: 'liquid-gold-wings',
    name: 'Gold Wings',
    category: 'wings',
    description: '6 piece crispy wings tossed in our signature sweet mustard liquid gold BBQ.',
    basePrice: 550,
    image: 'https://images.unsplash.com/photo-1608039755401-74207736181e?q=80&w=1470&auto=format&fit=crop',
    spicy: false,
    bestseller: false,
    newest: true,
    lowCal: false,
    sizes: [
      { name: 'S', priceAdd: 0, grams: 300 },
      { name: 'M', priceAdd: 250, grams: 600 }, // 12 pc
      { name: 'L', priceAdd: 500, grams: 900 }, // 18 pc
      { name: 'XL', priceAdd: 750, grams: 1200 } // 24 pc
    ],
    allergens: ['Soy', 'Gluten'],
    nutrition: { cal: 500, fat: 28, sugar: 18, sodium: 800 }
  }
];
