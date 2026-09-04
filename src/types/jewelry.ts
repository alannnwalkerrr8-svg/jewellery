export type Language = 'en' | 'gu' | 'hi';

export type ThemeMode = 'light' | 'dark' | 'system';

export type WeightUnit = 'grams' | 'tola';

export type UserRole = 'admin' | 'customer';

export interface DaySchedule {
  day: string;
  hours: string;
  note?: string;
  isSpecial?: boolean;
}

export interface ShopDetails {
  name: string;
  ownerName: string;
  tagline: string;
  address: string;
  shortAddress: string;
  googleMapsUrl: string;
  phone: string;
  secondaryPhone: string;
  phones: string[];
  whatsapp: string;
  whatsappSecondary: string;
  hours: string;
  weeklySchedule: DaySchedule[];
}

export type JewelryCategory =
  | 'all'
  | 'rings'
  | 'necklaces'
  | 'bangles'
  | 'earrings'
  | 'mangalsutra'
  | 'pendants'
  | 'bridal_sets'
  | 'chains'
  | 'bracelets'
  | 'nosepins'
  | 'payal'
  | 'coins_bars';

export type MetalType =
  | 'all'
  | 'gold_22k'
  | 'gold_18k'
  | 'gold_24k'
  | 'diamond'
  | 'kundan_polki'
  | 'platinum'
  | 'silver_925'
  | 'rose_gold';

export type OccasionType =
  | 'all'
  | 'bridal'
  | 'festive'
  | 'daily_wear'
  | 'temple'
  | 'party'
  | 'modern';

export type GenderType = 'women' | 'men' | 'unisex' | 'kids';

export interface JewelryDesign {
  id: string;
  code: string; // e.g. JW-2026
  title: {
    en: string;
    gu: string;
    hi: string;
  };
  category: JewelryCategory;
  metalType: MetalType;
  purity: string; // e.g. "22K (916)", "18K (750)"
  approxWeightGrams: number;
  imageUrl: string;
  additionalImages?: string[];
  occasion: OccasionType;
  gender?: GenderType;
  tags: string[];
  description: {
    en: string;
    gu: string;
    hi: string;
  };
  isTrending?: boolean;
  isNewArrival?: boolean;
  hallmarked: boolean;
  uploadedAt: string; // ISO date string
  likesCount: number;
}

export interface AhmedabadLiveRates {
  city: string;
  date: string;
  gold24k: number;
  gold24kChange: number;
  gold22k: number;
  gold22kChange: number;
  gold18k: number;
  gold18kChange: number;
  silverPerKg: number;
  silverPerGram: number;
  silverChange: number;
  platinumPerGram: number;
  platinumChange: number;
}

export interface FilterState {
  searchQuery: string;
  category: JewelryCategory;
  metalType: MetalType;
  occasion: OccasionType;
  weightRange: 'all' | 'under_5' | '5_15' | '15_30' | '30_60' | 'above_60';
  hallmarkedOnly: boolean;
  trendingOnly: boolean;
  sortBy: 'newest' | 'weight_low_high' | 'weight_high_low' | 'popular';
}
