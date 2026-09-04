import React from 'react';
import {
  Sparkles,
  CircleDot,
  Crown,
  Layers,
  Heart,
  Gem,
  Link as LinkIcon,
  Circle,
  Award,
  Disc,
} from 'lucide-react';
import { useJewelry } from '../context/JewelryContext';
import { JewelryCategory } from '../types/jewelry';

interface CategoryItem {
  id: JewelryCategory;
  icon: React.ElementType;
}

const CATEGORY_LIST: CategoryItem[] = [
  { id: 'all', icon: Sparkles },
  { id: 'rings', icon: CircleDot },
  { id: 'necklaces', icon: Crown },
  { id: 'bangles', icon: Circle },
  { id: 'earrings', icon: Gem },
  { id: 'mangalsutra', icon: Heart },
  { id: 'pendants', icon: Gem },
  { id: 'bridal_sets', icon: Crown },
  { id: 'chains', icon: LinkIcon },
  { id: 'bracelets', icon: Layers },
  { id: 'nosepins', icon: CircleDot },
  { id: 'payal', icon: Disc },
  { id: 'coins_bars', icon: Award },
];

export const CategoryNav: React.FC = () => {
  const { t, filters, setFilters, categoryCounts } = useJewelry();

  const handleCategorySelect = (category: JewelryCategory) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#1A1613] border-b border-[#EBE5DE] dark:border-[#332C26] sticky top-[98px] sm:top-[106px] z-30 shadow-2xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-2.5">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORY_LIST.map((cat) => {
            const Icon = cat.icon;
            const isSelected = filters.category === cat.id;
            const count = categoryCounts[cat.id] || 0;
            const label = t.categories[cat.id] || cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#C5A059] dark:bg-[#E5C378] text-white dark:text-[#1E1A17] shadow-xs font-semibold'
                    : 'bg-[#FAF8F5] dark:bg-[#25201C] text-[#635B53] dark:text-[#D4CCC2] hover:bg-[#EBE5DE] dark:hover:bg-[#332C26] hover:text-[#3D3732] dark:hover:text-[#FAF7F2] border border-[#D9D1C7]/60 dark:border-[#3D352E]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white dark:text-[#1E1A17]' : 'text-[#A67C2E] dark:text-[#E5C378]'}`} />
                <span>{label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? 'bg-white/20 dark:bg-black/20 text-white dark:text-[#1E1A17]'
                      : 'bg-[#EBE5DE] dark:bg-[#332C26] text-[#7D736A] dark:text-[#A89E92]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
