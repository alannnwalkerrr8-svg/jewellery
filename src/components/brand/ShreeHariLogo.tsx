import React from 'react';

interface ShreeHariLogoProps {
  variant?: 'header' | 'full' | 'icon' | 'banner';
  className?: string;
  showSubtitle?: boolean;
  showTagline?: boolean;
}

export const ShreeHariLogo: React.FC<ShreeHariLogoProps> = ({
  variant = 'header',
  className = '',
  showSubtitle = true,
  showTagline = false,
}) => {
  if (variant === 'icon') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background subtle shield */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="22"
            className="fill-[#FAF6F0] dark:fill-[#25201C] stroke-[#E8DFD0] dark:stroke-[#3D352E]"
            strokeWidth="1.5"
          />

          {/* Top Delicate Necklace Chain Arch */}
          <path
            d="M20 22 C 32 36, 45 42, 50 44 C 55 42, 68 36, 80 22"
            className="stroke-[#C5A059] dark:stroke-[#E5C378]"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Chain beads */}
          {[22, 28, 35, 42, 58, 65, 72, 78].map((cx, i) => (
            <circle
              key={i}
              cx={cx}
              cy={24 + Math.sin((cx / 100) * Math.PI) * 14}
              r="1.2"
              className="fill-[#C5A059] dark:fill-[#E5C378]"
            />
          ))}

          {/* Central Ornate Drop Pendant Frame */}
          <path
            d="M50 30 C 43 40, 39 52, 50 66 C 61 52, 57 40, 50 30 Z"
            className="stroke-[#C5A059] dark:stroke-[#E5C378] fill-[#FAF8F5]/80 dark:fill-[#1E1A17]/80"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Inner Golden Halo */}
          <circle
            cx="50"
            cy="52"
            r="8"
            className="stroke-[#C5A059] dark:stroke-[#E5C378]"
            strokeWidth="1.5"
          />

          {/* Brilliant Cut Diamond Core */}
          <polygon
            points="50,47 54,50 54,54 50,57 46,54 46,50"
            className="fill-white stroke-[#7D736A] dark:stroke-[#E8DFD0]"
            strokeWidth="0.8"
          />
          <polygon
            points="50,47 52,52 50,57 48,52"
            className="fill-[#EBF4FA] dark:fill-[#E8DFD0]"
          />

          {/* Bottom Pendant Hanging Bead */}
          <circle
            cx="50"
            cy="71"
            r="2.5"
            className="fill-[#C5A059] dark:fill-[#E5C378] stroke-[#8F7030] dark:stroke-[#C5A059]"
            strokeWidth="0.5"
          />

          {/* Mini Flourish Accents */}
          <circle cx="36" cy="34" r="1.5" className="fill-[#C5A059] dark:fill-[#E5C378]" />
          <circle cx="64" cy="34" r="1.5" className="fill-[#C5A059] dark:fill-[#E5C378]" />
        </svg>
      </div>
    );
  }

  // Header and Full Variant
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Visual Pendant Icon */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FAF6F0] dark:bg-[#25201C] border border-[#E8DFD0] dark:border-[#3D352E] flex items-center justify-center shrink-0 shadow-2xs p-1">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Necklace Drape */}
          <path
            d="M18 20 C 32 36, 45 42, 50 44 C 55 42, 68 36, 82 20"
            className="stroke-[#C5A059] dark:stroke-[#E5C378]"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Ornate Drop Tear */}
          <path
            d="M50 28 C 41 40, 37 54, 50 68 C 63 54, 59 40, 50 28 Z"
            className="stroke-[#C5A059] dark:stroke-[#E5C378] fill-[#FFFDF9] dark:fill-[#1E1A17]"
            strokeWidth="2.2"
          />
          {/* Diamond Center */}
          <circle
            cx="50"
            cy="52"
            r="8"
            className="fill-white dark:fill-[#2B231C] stroke-[#C5A059] dark:stroke-[#E5C378]"
            strokeWidth="1.5"
          />
          <polygon
            points="50,47 54,50 54,54 50,57 46,54 46,50"
            className="fill-[#EBF4FA] dark:fill-[#E8DFD0]"
          />
          {/* Bottom Drop */}
          <circle
            cx="50"
            cy="73"
            r="2.8"
            className="fill-[#C5A059] dark:fill-[#E5C378]"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        {/* SHREE HARI */}
        <div className="flex items-baseline tracking-normal font-serif leading-none">
          <span className="font-serif italic font-extrabold text-lg sm:text-xl md:text-2xl text-[#721C24] dark:text-[#E85D6B] tracking-tight">
            SHREE
          </span>
          <span className="ml-1.5 font-serif font-extrabold text-lg sm:text-xl md:text-2xl text-[#A67C2E] dark:text-[#E5C378] tracking-tight">
            HARI
          </span>
        </div>

        {/* JEWELLERS with Flourishes */}
        {showSubtitle && (
          <div className="flex items-center gap-1 mt-0.5">
            <span className="h-[1px] w-3 bg-[#C5A059] dark:bg-[#E5C378] opacity-60"></span>
            <span className="font-serif text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold text-[#8A6729] dark:text-[#E5C378]">
              JEWELLERS
            </span>
            <span className="h-[1px] w-3 bg-[#C5A059] dark:bg-[#E5C378] opacity-60"></span>
          </div>
        )}

        {showTagline && (
          <span className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-[#7D736A] dark:text-[#A89E92] font-medium mt-0.5">
            TRUST • PURITY • ELEGANCE
          </span>
        )}
      </div>
    </div>
  );
};
