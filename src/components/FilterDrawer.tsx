import React from 'react';
import {
  X,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useJewelry } from '../context/JewelryContext';
import { JewelryCategory, MetalType, OccasionType } from '../types/jewelry';

export const FilterDrawer: React.FC = () => {
  const {
    t,
    filters,
    setFilters,
    resetFilters,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    categoryCounts,
  } = useJewelry();

  if (!isFilterDrawerOpen) return null;

  const categories: JewelryCategory[] = [
    'all',
    'rings',
    'necklaces',
    'bangles',
    'earrings',
    'mangalsutra',
    'pendants',
    'bridal_sets',
    'chains',
    'bracelets',
    'nosepins',
    'payal',
    'coins_bars',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-[#FFFFFF] dark:bg-[#1E1A17] border-l border-[#D9D1C7] dark:border-[#3D352E] w-full max-w-xs h-full shadow-2xl flex flex-col justify-between transition-colors">
        {/* Header */}
        <div className="p-4 border-b border-[#EBE5DE] dark:border-[#332C26] flex items-center justify-between bg-[#FAF8F5] dark:bg-[#25201C]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#C5A059] dark:text-[#E5C378]" />
            <h3 className="font-serif italic text-base font-bold text-[#3D3732] dark:text-[#FAF7F2]">
              {t.filters}
            </h3>
          </div>
          <button
            onClick={() => setIsFilterDrawerOpen(false)}
            className="p-1 rounded-lg text-[#7D736A] dark:text-[#A89E92] hover:text-[#3D3732] dark:hover:text-[#FAF7F2] hover:bg-[#FAF8F5] dark:hover:bg-[#332C26] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Options */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
          {/* Category */}
          <div>
            <label className="block font-semibold text-[#4A433F] dark:text-[#D4CCC2] mb-2 uppercase tracking-wider text-[11px]">
              {t.allCategories}
            </label>
            <div className="space-y-1">
              {categories.map((cat) => {
                const isSelected = filters.category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, category: cat }))
                    }
                    className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#C5A059] dark:bg-[#E5C378] text-white dark:text-[#1E1A17] font-semibold'
                        : 'bg-[#FAF8F5] dark:bg-[#25201C] text-[#635B53] dark:text-[#FAF7F2] hover:bg-[#EBE5DE] dark:hover:bg-[#332C26]'
                    }`}
                  >
                    <span>{t.categories[cat]}</span>
                    <span className="text-[10px] opacity-80">
                      ({categoryCounts[cat] || 0})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metal Type */}
          <div>
            <label className="block font-semibold text-[#4A433F] dark:text-[#D4CCC2] mb-1.5 uppercase tracking-wider text-[11px]">
              Metal & Purity
            </label>
            <select
              value={filters.metalType}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  metalType: e.target.value as MetalType,
                }))
              }
              className="w-full px-3 py-2 bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] font-medium"
            >
              <option value="all">{t.metalTypes.all}</option>
              <option value="gold_22k">{t.metalTypes.gold_22k}</option>
              <option value="gold_18k">{t.metalTypes.gold_18k}</option>
              <option value="gold_24k">{t.metalTypes.gold_24k}</option>
              <option value="diamond">{t.metalTypes.diamond}</option>
              <option value="kundan_polki">{t.metalTypes.kundan_polki}</option>
              <option value="rose_gold">{t.metalTypes.rose_gold}</option>
              <option value="platinum">{t.metalTypes.platinum}</option>
              <option value="silver_925">{t.metalTypes.silver_925}</option>
            </select>
          </div>

          {/* Occasion */}
          <div>
            <label className="block font-semibold text-[#4A433F] dark:text-[#D4CCC2] mb-1.5 uppercase tracking-wider text-[11px]">
              Occasion
            </label>
            <select
              value={filters.occasion}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  occasion: e.target.value as OccasionType,
                }))
              }
              className="w-full px-3 py-2 bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] font-medium"
            >
              <option value="all">{t.occasions.all}</option>
              <option value="bridal">{t.occasions.bridal}</option>
              <option value="festive">{t.occasions.festive}</option>
              <option value="daily_wear">{t.occasions.daily_wear}</option>
              <option value="temple">{t.occasions.temple}</option>
              <option value="party">{t.occasions.party}</option>
              <option value="modern">{t.occasions.modern}</option>
            </select>
          </div>

          {/* Weight Range */}
          <div>
            <label className="block font-semibold text-[#4A433F] dark:text-[#D4CCC2] mb-1.5 uppercase tracking-wider text-[11px]">
              {t.approxWeight}
            </label>
            <select
              value={filters.weightRange}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  weightRange: e.target.value as any,
                }))
              }
              className="w-full px-3 py-2 bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] font-medium"
            >
              <option value="all">{t.weightRanges.all}</option>
              <option value="under_5">{t.weightRanges.under_5}</option>
              <option value="5_15">{t.weightRanges['5_15']}</option>
              <option value="15_30">{t.weightRanges['15_30']}</option>
              <option value="30_60">{t.weightRanges['30_60']}</option>
              <option value="above_60">{t.weightRanges.above_60}</option>
            </select>
          </div>

          {/* Toggles */}
          <div className="space-y-2 pt-2 border-t border-[#EBE5DE] dark:border-[#332C26]">
            <label className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#25201C] cursor-pointer">
              <span className="flex items-center gap-1.5 text-xs text-[#3D3732] dark:text-[#FAF7F2]">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059] dark:text-[#E5C378]" />
                <span>{t.trending}</span>
              </span>
              <input
                type="checkbox"
                checked={filters.trendingOnly}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    trendingOnly: e.target.checked,
                  }))
                }
                className="rounded accent-[#C5A059]"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#25201C] cursor-pointer">
              <span className="flex items-center gap-1.5 text-xs text-[#3D3732] dark:text-[#FAF7F2]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5E8357] dark:text-[#7DAF74]" />
                <span>{t.hallmarkedOnly}</span>
              </span>
              <input
                type="checkbox"
                checked={filters.hallmarkedOnly}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    hallmarkedOnly: e.target.checked,
                  }))
                }
                className="rounded accent-[#5E8357]"
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EBE5DE] dark:border-[#332C26] bg-[#FAF8F5] dark:bg-[#25201C] flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="flex-1 py-2 px-3 rounded-xl bg-white dark:bg-[#1E1A17] border border-[#D9D1C7] dark:border-[#3D352E] text-[#7D736A] dark:text-[#A89E92] hover:text-[#3D3732] dark:hover:text-[#FAF7F2] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetFilters}</span>
          </button>
          <button
            onClick={() => setIsFilterDrawerOpen(false)}
            className="flex-1 py-2 px-3 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] dark:bg-[#E5C378] dark:hover:bg-[#D4AF37] text-white dark:text-[#1E1A17] text-xs font-semibold shadow-xs cursor-pointer transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
