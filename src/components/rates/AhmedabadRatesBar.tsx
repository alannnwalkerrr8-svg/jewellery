import React from 'react';
import {
  TrendingDown,
  Calculator,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useJewelry } from '../../context/JewelryContext';

export const AhmedabadRatesBar: React.FC = () => {
  const { liveRates, shopDetails, showLiveRates, setIsRateCalculatorOpen, t } = useJewelry();

  if (!showLiveRates) return null;

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#151D24] border-b border-[#D9D1C7] dark:border-[#26313B] text-[#3D3732] dark:text-[#E8EDF2] py-2 px-3 sm:px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        
        {/* Left: Ahmedabad Rates Strip */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none py-0.5">
          {/* Market Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#C5A059]/15 dark:bg-[#E5C378]/15 border border-[#C5A059]/30 dark:border-[#E5C378]/30 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[11px] font-bold text-[#A67C2E] dark:text-[#E5C378] tracking-tight whitespace-nowrap">
              {liveRates.city} Live Rates
            </span>
          </div>

          {/* 22K Gold */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E2730] border border-[#EBE5DE] dark:border-[#2C3843] shadow-2xs shrink-0 text-xs">
            <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] font-medium">22K Gold:</span>
            <span className="font-bold text-[#3D3732] dark:text-[#FAF7F2] font-mono">
              ₹{liveRates.gold22k.toLocaleString('en-IN')}/g
            </span>
            <span className="text-[10px] font-semibold text-[#EF4444] flex items-center">
              {liveRates.gold22kChange} ▼
            </span>
          </div>

          {/* 24K Gold */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E2730] border border-[#EBE5DE] dark:border-[#2C3843] shadow-2xs shrink-0 text-xs">
            <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] font-medium">24K Gold:</span>
            <span className="font-bold text-[#3D3732] dark:text-[#FAF7F2] font-mono">
              ₹{liveRates.gold24k.toLocaleString('en-IN')}/g
            </span>
            <span className="text-[10px] font-semibold text-[#EF4444] flex items-center">
              {liveRates.gold24kChange} ▼
            </span>
          </div>

          {/* 18K Gold */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E2730] border border-[#EBE5DE] dark:border-[#2C3843] shadow-2xs shrink-0 text-xs">
            <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] font-medium">18K:</span>
            <span className="font-bold text-[#3D3732] dark:text-[#FAF7F2] font-mono">
              ₹{liveRates.gold18k.toLocaleString('en-IN')}/g
            </span>
            <span className="text-[10px] font-semibold text-[#EF4444] flex items-center">
              {liveRates.gold18kChange} ▼
            </span>
          </div>

          {/* Silver */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E2730] border border-[#EBE5DE] dark:border-[#2C3843] shadow-2xs shrink-0 text-xs">
            <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] font-medium">Silver:</span>
            <span className="font-bold text-[#3D3732] dark:text-[#FAF7F2] font-mono">
              ₹{liveRates.silverPerKg.toLocaleString('en-IN')}/kg
            </span>
          </div>
        </div>

        {/* Right: Interactive Actions */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/* Open Rate Calculator Trigger */}
          <button
            onClick={() => setIsRateCalculatorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Price Calculator</span>
          </button>

          {/* Google Maps Shop Link */}
          <a
            href={shopDetails.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] hover:bg-[#FAF8F5] dark:hover:bg-[#26333F] text-[#3D3732] dark:text-[#FAF7F2] font-semibold text-xs shadow-2xs transition-all whitespace-nowrap"
            title="Open shop location on Google Maps"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C5A059] dark:text-[#E5C378]" />
            <span className="hidden sm:inline">Santej Chokdi Showroom</span>
            <span className="sm:hidden">Map</span>
            <ExternalLink className="w-3 h-3 text-[#7D736A] dark:text-[#8E9CA8]" />
          </a>
        </div>

      </div>
    </div>
  );
};
