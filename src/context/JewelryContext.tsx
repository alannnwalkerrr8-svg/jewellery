import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { JewelryDesign, FilterState, Language, JewelryCategory, ThemeMode, WeightUnit, AhmedabadLiveRates, UserRole, ShopDetails } from '../types/jewelry';
import { INITIAL_JEWELRY_DESIGNS } from '../data/initialDesigns';
import { translations, Translations } from '../i18n/translations';

export const AHMEDABAD_SHOP_DETAILS: ShopDetails = {
  name: 'Shree Hari Jewellers',
  ownerName: 'Vishal Patadia',
  tagline: 'Trust • Purity • Elegance',
  address: 'Shop 12 mahakali complex Santej chokdi, Bhadaj-Santej Rd, Gandhinagar, Santej, Ahmedabad, Gujarat 382722',
  shortAddress: 'Shop 12, Mahakali Complex, Santej Chokdi, Ahmedabad',
  googleMapsUrl: 'https://share.google/HRy5V7PzNP0qiUEIT',
  phone: '8000-461400',
  secondaryPhone: '96532-46571',
  phones: ['8000-461400', '96532-46571'],
  whatsapp: '918000461400',
  whatsappSecondary: '919653246571',
  hours: 'Mon - Sun: 9:00 AM – 9:00 PM (Open All 7 Days)',
  weeklySchedule: [
    { day: 'Wednesday', hours: '9:00 AM – 9:00 PM' },
    { day: 'Thursday', hours: '9:00 AM – 9:00 PM' },
    { day: 'Friday', hours: '9:00 AM – 9:00 PM', note: 'Krishna Janmashtami / Festivals • Hours might differ', isSpecial: true },
    { day: 'Saturday', hours: '9:00 AM – 9:00 PM' },
    { day: 'Sunday', hours: '9:00 AM – 9:00 PM' },
    { day: 'Monday', hours: '9:00 AM – 9:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM – 9:00 PM' },
  ],
};

export const INITIAL_AHMEDABAD_RATES: AhmedabadLiveRates = {
  city: 'Ahmedabad',
  date: '2 September 2026',
  gold24k: 15207,
  gold24kChange: -207,
  gold22k: 13940,
  gold22kChange: -190,
  gold18k: 11407,
  gold18kChange: -155,
  silverPerKg: 245000,
  silverPerGram: 245,
  silverChange: -1200,
  platinumPerGram: 3850,
  platinumChange: 15,
};

export interface SuggestedHourItem {
  id: string;
  name: string;
  phone: string;
  preferredDay: string;
  preferredTime: string;
  note: string;
  createdAt: string;
}

interface JewelryContextType {
  designs: JewelryDesign[];
  filteredDesigns: JewelryDesign[];
  filters: FilterState;
  language: Language;
  t: Translations;
  favorites: string[];
  viewMode: 'grid' | 'masonry' | 'compact';
  selectedDesign: JewelryDesign | null;
  isUploadModalOpen: boolean;
  isFavoritesOpen: boolean;
  isFilterDrawerOpen: boolean;
  isSettingsOpen: boolean;
  isRateCalculatorOpen: boolean;
  isHoursModalOpen: boolean;
  isRoleSwitcherOpen: boolean;
  isEditModalOpen: boolean;
  editingDesign: JewelryDesign | null;
  userRole: UserRole;
  isAdmin: boolean;
  isUploadEnabled: boolean;
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  weightUnit: WeightUnit;
  showLiveRates: boolean;
  categoryCounts: Record<JewelryCategory, number>;
  liveRates: AhmedabadLiveRates;
  shopDetails: ShopDetails;
  suggestedHoursList: SuggestedHourItem[];
  
  // Actions
  setLanguage: (lang: Language) => void;
  setUserRole: (role: UserRole) => void;
  setIsUploadEnabled: (enabled: boolean) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  setViewMode: (mode: 'grid' | 'masonry' | 'compact') => void;
  setSelectedDesign: (design: JewelryDesign | null) => void;
  setIsUploadModalOpen: (open: boolean) => void;
  setIsFavoritesOpen: (open: boolean) => void;
  setIsFilterDrawerOpen: (open: boolean) => void;
  setIsSettingsOpen: (open: boolean) => void;
  setIsRateCalculatorOpen: (open: boolean) => void;
  setIsHoursModalOpen: (open: boolean) => void;
  setIsRoleSwitcherOpen: (open: boolean) => void;
  setIsEditModalOpen: (open: boolean) => void;
  setEditingDesign: (design: JewelryDesign | null) => void;
  startEditDesign: (design: JewelryDesign) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setWeightUnit: (unit: WeightUnit) => void;
  setShowLiveRates: (show: boolean) => void;
  toggleFavorite: (id: string) => void;
  addDesign: (design: Omit<JewelryDesign, 'id' | 'uploadedAt' | 'likesCount'>) => JewelryDesign;
  updateDesign: (id: string, updatedData: Partial<JewelryDesign>) => void;
  deleteDesign: (id: string) => void;
  resetToDefaults: () => void;
  formatWeight: (grams: number) => string;
  getLocalizedText: (textObj: { en: string; gu?: string; hi?: string } | string) => string;
  submitSuggestedHours: (data: { name: string; phone: string; preferredDay: string; preferredTime: string; note: string }) => void;
  calculateEstimate: (weightGrams: number, purity?: '22k' | '24k' | '18k' | 'silver', makingPercent?: number) => {
    baseRate: number;
    baseValue: number;
    makingCharges: number;
    gstAmount: number;
    totalAmount: number;
  };
}

const defaultFilters: FilterState = {
  searchQuery: '',
  category: 'all',
  metalType: 'all',
  occasion: 'all',
  weightRange: 'all',
  hallmarkedOnly: false,
  trendingOnly: false,
  sortBy: 'newest',
};

const JewelryContext = createContext<JewelryContextType | undefined>(undefined);

const STORAGE_DESIGNS_KEY = 'shree_hari_jewelry_designs_v1';
const STORAGE_LANG_KEY = 'shree_hari_jewelry_lang_v1';
const STORAGE_FAVS_KEY = 'shree_hari_jewelry_favs_v1';
const STORAGE_THEME_KEY = 'shree_hari_jewelry_theme_v1';
const STORAGE_UNIT_KEY = 'shree_hari_jewelry_unit_v1';
const STORAGE_RATES_KEY = 'shree_hari_jewelry_rates_v1';

export const JewelryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Theme state & effect
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_THEME_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved;
      }
    } catch {}
    return 'light';
  });

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const resolvedTheme: 'light' | 'dark' = theme === 'system' ? (systemIsDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }
  }, [resolvedTheme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_THEME_KEY, newTheme);
    } catch {}
  };

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  // 2. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      if (saved === 'en' || saved === 'gu' || saved === 'hi') {
        return saved;
      }
    } catch {}
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch {}
  };

  const t = translations[language] || translations.en;

  // 3. Weight unit preference
  const [weightUnit, setWeightUnitState] = useState<WeightUnit>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_UNIT_KEY);
      if (saved === 'grams' || saved === 'tola') {
        return saved;
      }
    } catch {}
    return 'grams';
  });

  const setWeightUnit = (unit: WeightUnit) => {
    setWeightUnitState(unit);
    try {
      localStorage.setItem(STORAGE_UNIT_KEY, unit);
    } catch {}
  };

  const formatWeight = (grams: number): string => {
    if (weightUnit === 'tola') {
      // 1 Tola = 11.6638 grams
      const tolaVal = (grams / 11.6638).toFixed(2);
      if (language === 'gu') {
        return `${tolaVal} તોલા (${grams}g)`;
      } else if (language === 'hi') {
        return `${tolaVal} तोला (${grams}g)`;
      }
      return `${tolaVal} Tola (${grams}g)`;
    }
    if (language === 'gu') {
      return `${grams} ગ્રામ`;
    } else if (language === 'hi') {
      return `${grams} ग्राम`;
    }
    return `${grams} g`;
  };

  // 4. Live Rates visibility toggle
  const [showLiveRates, setShowLiveRatesState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_RATES_KEY);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch {}
    return true;
  });

  const setShowLiveRates = (show: boolean) => {
    setShowLiveRatesState(show);
    try {
      localStorage.setItem(STORAGE_RATES_KEY, JSON.stringify(show));
    } catch {}
  };

  // 5. Designs list
  const [designs, setDesigns] = useState<JewelryDesign[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DESIGNS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    return INITIAL_JEWELRY_DESIGNS;
  });

  // Save designs when changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DESIGNS_KEY, JSON.stringify(designs));
    } catch {}
  }, [designs]);

  // 6. Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FAVS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['des-001', 'des-006'];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_FAVS_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 7. UI Modals, Role, and controls
  const STORAGE_ROLE_KEY = 'shree_hari_jewelry_role_v1';
  const STORAGE_SUGGESTED_HOURS_KEY = 'shree_hari_suggested_hours_v1';
  const STORAGE_UPLOAD_ENABLED_KEY = 'shree_hari_upload_enabled_v1';

  // Safety feature: Image Upload enabled state (requires code 2212 to enable)
  const [isUploadEnabled, setIsUploadEnabledState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_UPLOAD_ENABLED_KEY);
      return saved === 'true';
    } catch {}
    return false;
  });

  const setIsUploadEnabled = (enabled: boolean) => {
    setIsUploadEnabledState(enabled);
    try {
      localStorage.setItem(STORAGE_UPLOAD_ENABLED_KEY, String(enabled));
    } catch {}
  };

  // Role Management: 'admin' (Vishal Patadia) vs 'customer' (view-only)
  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ROLE_KEY);
      if (saved === 'admin' || saved === 'customer') {
        return saved;
      }
    } catch {}
    return 'admin';
  });

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    try {
      localStorage.setItem(STORAGE_ROLE_KEY, role);
    } catch {}
  };

  // Privilege check is tied directly to isUploadEnabled (Safety Toggle feature)
  const isAdmin = isUploadEnabled;

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry' | 'compact'>('grid');
  const [selectedDesign, setSelectedDesign] = useState<JewelryDesign | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isRateCalculatorOpen, setIsRateCalculatorOpen] = useState<boolean>(false);
  const [isHoursModalOpen, setIsHoursModalOpen] = useState<boolean>(false);
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingDesign, setEditingDesign] = useState<JewelryDesign | null>(null);
  const [liveRates] = useState<AhmedabadLiveRates>(INITIAL_AHMEDABAD_RATES);
  const shopDetails = AHMEDABAD_SHOP_DETAILS;

  // Suggested Showroom Hours
  const [suggestedHoursList, setSuggestedHoursList] = useState<SuggestedHourItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SUGGESTED_HOURS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const submitSuggestedHours = (data: { name: string; phone: string; preferredDay: string; preferredTime: string; note: string }) => {
    const newItem: SuggestedHourItem = {
      id: `sug-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
    };
    setSuggestedHoursList((prev) => [newItem, ...prev]);
    try {
      localStorage.setItem(STORAGE_SUGGESTED_HOURS_KEY, JSON.stringify([newItem, ...suggestedHoursList]));
    } catch {}
  };

  const startEditDesign = (design: JewelryDesign) => {
    setEditingDesign(design);
    setIsEditModalOpen(true);
  };

  const updateDesign = (id: string, updatedData: Partial<JewelryDesign>) => {
    setDesigns((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updatedData } : d))
    );
    if (selectedDesign?.id === id) {
      setSelectedDesign((prev) => (prev ? { ...prev, ...updatedData } : null));
    }
  };

  // Calculation helper
  const calculateEstimate = (
    weightGrams: number,
    purity: '22k' | '24k' | '18k' | 'silver' = '22k',
    makingPercent: number = 12
  ) => {
    let ratePerGram = liveRates.gold22k;
    if (purity === '24k') ratePerGram = liveRates.gold24k;
    else if (purity === '18k') ratePerGram = liveRates.gold18k;
    else if (purity === 'silver') ratePerGram = liveRates.silverPerGram;

    const baseValue = Math.round(weightGrams * ratePerGram);
    const makingCharges = Math.round((baseValue * makingPercent) / 100);
    const gstAmount = Math.round(((baseValue + makingCharges) * 3) / 100);
    const totalAmount = baseValue + makingCharges + gstAmount;

    return {
      baseRate: ratePerGram,
      baseValue,
      makingCharges,
      gstAmount,
      totalAmount,
    };
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // 8. Add & delete design & reset
  const addDesign = (designData: Omit<JewelryDesign, 'id' | 'uploadedAt' | 'likesCount'>): JewelryDesign => {
    const newDesign: JewelryDesign = {
      ...designData,
      id: `des-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      uploadedAt: new Date().toISOString(),
      likesCount: 1,
    };
    setDesigns((prev) => [newDesign, ...prev]);
    return newDesign;
  };

  const deleteDesign = (id: string) => {
    setDesigns((prev) => prev.filter((d) => d.id !== id));
    if (selectedDesign?.id === id) {
      setSelectedDesign(null);
    }
  };

  const resetToDefaults = () => {
    setDesigns(INITIAL_JEWELRY_DESIGNS);
    try {
      localStorage.setItem(STORAGE_DESIGNS_KEY, JSON.stringify(INITIAL_JEWELRY_DESIGNS));
    } catch {}
  };

  // 9. Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<JewelryCategory, number> = {
      all: designs.length,
      rings: 0,
      necklaces: 0,
      bangles: 0,
      earrings: 0,
      mangalsutra: 0,
      pendants: 0,
      bridal_sets: 0,
      chains: 0,
      bracelets: 0,
      nosepins: 0,
      payal: 0,
      coins_bars: 0,
    };
    designs.forEach((d) => {
      if (counts[d.category] !== undefined) {
        counts[d.category]++;
      }
    });
    return counts;
  }, [designs]);

  // 10. Localized text helper
  const getLocalizedText = (textObj: { en: string; gu?: string; hi?: string } | string): string => {
    if (typeof textObj === 'string') return textObj;
    if (!textObj) return '';
    if (language === 'gu' && textObj.gu) return textObj.gu;
    if (language === 'hi' && textObj.hi) return textObj.hi;
    return textObj.en || textObj.gu || textObj.hi || '';
  };

  // 11. Filtered & Sorted Designs calculation
  const filteredDesigns = useMemo(() => {
    return designs
      .filter((design) => {
        // Search query check (title en/gu/hi, code, tags, description)
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase().trim();
          const titleEn = design.title.en?.toLowerCase() || '';
          const titleGu = design.title.gu?.toLowerCase() || '';
          const titleHi = design.title.hi?.toLowerCase() || '';
          const code = design.code.toLowerCase();
          const descEn = design.description.en?.toLowerCase() || '';
          const tagsStr = design.tags.join(' ').toLowerCase();

          const matchesSearch =
            titleEn.includes(query) ||
            titleGu.includes(query) ||
            titleHi.includes(query) ||
            code.includes(query) ||
            descEn.includes(query) ||
            tagsStr.includes(query);

          if (!matchesSearch) return false;
        }

        // Category filter
        if (filters.category !== 'all' && design.category !== filters.category) {
          return false;
        }

        // Metal type filter
        if (filters.metalType !== 'all' && design.metalType !== filters.metalType) {
          return false;
        }

        // Occasion filter
        if (filters.occasion !== 'all' && design.occasion !== filters.occasion) {
          return false;
        }

        // Weight range filter
        if (filters.weightRange !== 'all') {
          const wt = design.approxWeightGrams;
          if (filters.weightRange === 'under_5' && wt >= 5) return false;
          if (filters.weightRange === '5_15' && (wt < 5 || wt > 15)) return false;
          if (filters.weightRange === '15_30' && (wt < 15 || wt > 30)) return false;
          if (filters.weightRange === '30_60' && (wt < 30 || wt > 60)) return false;
          if (filters.weightRange === 'above_60' && wt < 60) return false;
        }

        // Hallmarked filter
        if (filters.hallmarkedOnly && !design.hallmarked) {
          return false;
        }

        // Trending filter
        if (filters.trendingOnly && !design.isTrending) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'newest') {
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        }
        if (filters.sortBy === 'weight_low_high') {
          return a.approxWeightGrams - b.approxWeightGrams;
        }
        if (filters.sortBy === 'weight_high_low') {
          return b.approxWeightGrams - a.approxWeightGrams;
        }
        if (filters.sortBy === 'popular') {
          return (b.likesCount || 0) - (a.likesCount || 0);
        }
        return 0;
      });
  }, [designs, filters]);

  return (
    <JewelryContext.Provider
      value={{
        designs,
        filteredDesigns,
        filters,
        language,
        t,
        favorites,
        viewMode,
        selectedDesign,
        isUploadModalOpen,
        isFavoritesOpen,
        isFilterDrawerOpen,
        isSettingsOpen,
        isRateCalculatorOpen,
        isHoursModalOpen,
        isRoleSwitcherOpen,
        isEditModalOpen,
        editingDesign,
        userRole,
        isAdmin,
        isUploadEnabled,
        theme,
        resolvedTheme,
        weightUnit,
        showLiveRates,
        categoryCounts,
        liveRates,
        shopDetails,
        suggestedHoursList,
        setLanguage,
        setUserRole,
        setIsUploadEnabled,
        setFilters,
        resetFilters,
        setViewMode,
        setSelectedDesign,
        setIsUploadModalOpen,
        setIsFavoritesOpen,
        setIsFilterDrawerOpen,
        setIsSettingsOpen,
        setIsRateCalculatorOpen,
        setIsHoursModalOpen,
        setIsRoleSwitcherOpen,
        setIsEditModalOpen,
        setEditingDesign,
        startEditDesign,
        setTheme,
        toggleTheme,
        setWeightUnit,
        setShowLiveRates,
        toggleFavorite,
        addDesign,
        updateDesign,
        deleteDesign,
        resetToDefaults,
        formatWeight,
        getLocalizedText,
        submitSuggestedHours,
        calculateEstimate,
      }}
    >
      {children}
    </JewelryContext.Provider>
  );
};

export const useJewelry = () => {
  const context = useContext(JewelryContext);
  if (!context) {
    throw new Error('useJewelry must be used within a JewelryProvider');
  }
  return context;
};
