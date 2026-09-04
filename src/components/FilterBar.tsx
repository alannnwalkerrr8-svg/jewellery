import React from 'react';
import {
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Grid3X3,
  LayoutGrid,
  List,
  Scale,
  Gem,
  Calendar,
} from 'lucide-react';
import { useJewelry } from '../context/JewelryContext';
import { MetalType, OccasionType } from '../types/jewelry';

export const FilterBar: React.FC = () => {
  const {
    t,
    filters,
    setFilters,
    resetFilters,
    filteredDesigns,
    viewMode,
    setViewMode,
  } = useJewelry();

  const activeFilterCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.metalType !== 'all' ? 1 : 0) +
    (filters.occasion !== 'all' ? 1 : 0) +
    (filters.weightRange !== 'all' ? 1 : 0) +
    (filters.hallmarkedOnly ? 1 : 0) +
    (filters.trendingOnly ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#181412] border-b border-[#D9D1C7] dark:border-[#332C26] py-3 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Metal Type Dropdown */}
          <div className="relative">
            <select
              value={filters.metalType}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  metalType: e.target.value as MetalType,
                }))
              }
              className="appearance-none bg-[#FFFFFF] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] text-[#3D3732] dark:text-[#FAF7F2] text-xs rounded-xl pl-3 pr-8 py-1.5 font-medium focus:outline-none focus:border-[#C5A059] dark:focus:border-[#E5C378] cursor-pointer shadow-2xs"
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
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7D736A] dark:text-[#A89E92] text-[10px]">
              ▼
            </div>
          </div>

          {/* Occasion Dropdown */}
          <div className="relative hidden md:block">
            <select
              value={filters.occasion}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  occasion: e.target.value as OccasionType,
                }))
              }
              className="appearance-none bg-[#FFFFFF] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] text-[#3D3732] dark:text-[#FAF7F2] text-xs rounded-xl pl-3 pr-8 py-1.5 font-medium focus:outline-none focus:border-[#C5A059] dark:focus:border-[#E5C378] cursor-pointer shadow-2xs"
            >
              <option value="all">{t.occasions.all}</option>
              <option value="bridal">{t.occasions.bridal}</option>
              <option value="festive">{t.occasions.festive}</option>
              <option value="daily_wear">{t.occasions.daily_wear}</option>
              <option value="temple">{t.occasions.temple}</option>
              <option value="party">{t.occasions.party}</option>
              <option value="modern">{t.occasions.modern}</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7D736A] dark:text-[#A89E92] text-[10px]">
              ▼
            </div>
          </div>

          {/* Weight Range Dropdown */}
          <div className="relative">
            <select
              value={filters.weightRange}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  weightRange: e.target.value as any,
                }))
              }
              className="appearance-none bg-[#FFFFFF] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] text-[#3D3732] dark:text-[#FAF7F2] text-xs rounded-xl pl-3 pr-8 py-1.5 font-medium focus:outline-none focus:border-[#C5A059] dark:focus:border-[#E5C378] cursor-pointer shadow-2xs"
            >
              <option value="all">{t.weightRanges.all}</option>
              <option value="under_5">{t.weightRanges.under_5}</option>
              <option value="5_15">{t.weightRanges['5_15']}</option>
              <option value="15_30">{t.weightRanges['15_30']}</option>
              <option value="30_60">{t.weightRanges['30_60']}</option>
              <option value="above_60">{t.weightRanges.above_60}</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7D736A] dark:text-[#A89E92] text-[10px]">
              ▼
            </div>
          </div>

          {/* Trending Toggle Pill */}
          <button
            onClick={() =>
              setFilters((prev) => ({ ...prev, trendingOnly: !prev.trendingOnly }))
            }
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              filters.trendingOnly
                ? 'bg-[#C5A059]/15 dark:bg-[#E5C378]/20 border-[#C5A059] dark:border-[#E5C378] text-[#A67C2E] dark:text-[#E5C378] font-semibold'
                : 'bg-[#FFFFFF] dark:bg-[#25201C] border-[#D9D1C7] dark:border-[#3D352E] text-[#635B53] dark:text-[#D4CCC2] hover:text-[#3D3732] dark:hover:text-[#FAF7F2]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] dark:text-[#E5C378]" />
            <span>{t.trending}</span>
          </button>

          {/* Hallmarked Only Toggle */}
          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                hallmarkedOnly: !prev.hallmarkedOnly,
              }))
            }
            className={`hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              filters.hallmarkedOnly
                ? 'bg-[#5E8357]/15 dark:bg-[#7DAF74]/20 border-[#5E8357] dark:border-[#7DAF74] text-[#4B6B46] dark:text-[#7DAF74] font-semibold'
                : 'bg-[#FFFFFF] dark:bg-[#25201C] border-[#D9D1C7] dark:border-[#3D352E] text-[#635B53] dark:text-[#D4CCC2] hover:text-[#3D3732] dark:hover:text-[#FAF7F2]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#5E8357] dark:text-[#7DAF74]" />
            <span>{t.hallmarkedOnly}</span>
          </button>

          {/* Reset Filters */}
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-[11px] text-[#9E4A40] dark:text-[#E88378] hover:text-[#7D342C] dark:hover:text-[#F3ABA3] px-2 py-1 rounded-lg hover:bg-[#9E4A40]/10 transition-colors cursor-pointer"
              title={t.resetFilters}
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.resetFilters}</span>
            </button>
          )}
        </div>

        {/* Right: Results Count, Sort By & View Mode */}
        <div className="flex items-center gap-3 ml-auto text-xs">
          {/* Results counter */}
          <span className="text-[#7D736A] dark:text-[#A89E92] font-medium hidden sm:inline">
            <strong className="text-[#3D3732] dark:text-[#FAF7F2] font-semibold">
              {filteredDesigns.length}
            </strong>{' '}
            {t.totalDesigns}
          </span>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#7D736A] dark:text-[#A89E92] text-[11px] hidden md:inline">
              {t.sortBy}:
            </span>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as any,
                }))
              }
              className="bg-[#FFFFFF] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] text-[#3D3732] dark:text-[#FAF7F2] text-xs rounded-xl px-2.5 py-1.5 font-medium focus:outline-none focus:border-[#C5A059] dark:focus:border-[#E5C378] cursor-pointer shadow-2xs"
            >
              <option value="newest">{t.sortOptions.newest}</option>
              <option value="popular">{t.sortOptions.popular}</option>
              <option value="weight_low_high">
                {t.sortOptions.weight_low_high}
              </option>
              <option value="weight_high_low">
                {t.sortOptions.weight_high_low}
              </option>
            </select>
          </div>

          {/* View mode toggle */}
          <div className="hidden sm:flex items-center bg-[#FFFFFF] dark:bg-[#25201C] p-0.5 rounded-xl border border-[#D9D1C7] dark:border-[#3D352E]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#C5A059] dark:bg-[#E5C378] text-white dark:text-[#1E1A17]'
                  : 'text-[#7D736A] dark:text-[#A89E92] hover:text-[#3D3732] dark:hover:text-[#FAF7F2]'
              }`}
              title="Grid View"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'compact'
                  ? 'bg-[#C5A059] dark:bg-[#E5C378] text-white dark:text-[#1E1A17]'
                  : 'text-[#7D736A] dark:text-[#A89E92] hover:text-[#3D3732] dark:hover:text-[#FAF7F2]'
              }`}
              title="Compact View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
