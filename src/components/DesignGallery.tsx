import React from 'react';
import {
  Sparkles,
  RotateCcw,
  Upload,
  Layers,
  Inbox,
} from 'lucide-react';
import { useJewelry } from '../context/JewelryContext';
import { DesignCard } from './DesignCard';

export const DesignGallery: React.FC = () => {
  const {
    t,
    filteredDesigns,
    filters,
    resetFilters,
    viewMode,
    setIsUploadModalOpen,
  } = useJewelry();

  if (filteredDesigns.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] text-[#C5A059] dark:text-[#E5C378] flex items-center justify-center mb-4 shadow-sm">
          <Inbox className="w-8 h-8" />
        </div>
        <h3 className="font-serif italic text-xl font-bold text-[#3D3732] dark:text-[#FAF7F2] mb-1">
          {t.noDesignsFound}
        </h3>
        <p className="text-sm text-[#7D736A] dark:text-[#A89E92] max-w-md mx-auto mb-6">
          {t.noDesignsMatch}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#25201C] hover:bg-[#EBE5DE] dark:hover:bg-[#332C26] text-[#3D3732] dark:text-[#FAF7F2] border border-[#D9D1C7] dark:border-[#3D352E] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetFilters}</span>
          </button>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] dark:bg-[#E5C378] dark:hover:bg-[#D4AF37] text-white dark:text-[#1E1A17] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{t.uploadDesign}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Category or Search Headline */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-serif italic text-xl sm:text-2xl font-bold text-[#3D3732] dark:text-[#FAF7F2]">
            {filters.category === 'all'
              ? t.categories.all
              : t.categories[filters.category]}
          </h2>
          <p className="text-xs text-[#7D736A] dark:text-[#A89E92] mt-0.5">
            {filteredDesigns.length} {t.totalDesigns}
            {filters.searchQuery && ` matching "${filters.searchQuery}"`}
            {filters.metalType !== 'all' && ` • ${t.metalTypes[filters.metalType]}`}
            {filters.occasion !== 'all' && ` • ${t.occasions[filters.occasion]}`}
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div
        className={`grid gap-3 sm:gap-5 md:gap-6 ${
          viewMode === 'compact'
            ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
            : 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {filteredDesigns.map((design) => (
          <DesignCard key={design.id} design={design} />
        ))}
      </div>
    </div>
  );
};
