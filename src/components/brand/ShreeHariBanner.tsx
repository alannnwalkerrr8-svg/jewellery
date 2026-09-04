import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Gem,
  Award,
  ArrowRight,
  Heart,
  Scale,
} from 'lucide-react';
import { useJewelry } from '../../context/JewelryContext';

export const ShreeHariBanner: React.FC = () => {
  const { t, setFilters, setIsFavoritesOpen, favorites } = useJewelry();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF6F0] via-[#FAF8F5] to-[#FFFFFF] dark:from-[#1A1613] dark:via-[#1E1A17] dark:to-[#12100E] border-b border-[#D9D1C7] dark:border-[#332C26] transition-colors duration-300">
      {/* Background Decorative Gold Filigree Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-radial from-[#C5A059]/10 dark:from-[#E5C378]/10 to-transparent rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-radial from-[#721C24]/5 dark:from-[#E85D6B]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-9">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          {/* Left Brand Identity and Grand Typography */}
          <div className="w-full lg:max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Top Quality Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] text-[11px] font-semibold text-[#8A6729] dark:text-[#E5C378] shadow-2xs mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5E8357] dark:text-[#7DAF74]" />
              <span>100% BIS 916 Hallmarked Certified Gold & Diamonds</span>
            </div>

            {/* Main Brand Name Banner Display */}
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 my-1">
              {/* Crescent Pendant Ornament */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 relative flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full drop-shadow-sm"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Left Crescent Arch */}
                  <path
                    d="M32 15 C 10 35, 12 70, 36 88 C 18 72, 18 36, 32 15 Z"
                    className="fill-[#C5A059] dark:fill-[#E5C378]"
                  />
                  {/* Necklace Arch */}
                  <path
                    d="M24 24 C 36 38, 46 44, 50 46 C 54 44, 64 38, 76 24"
                    className="stroke-[#C5A059] dark:stroke-[#E5C378]"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Center Drop Filigree */}
                  <path
                    d="M50 32 C 40 45, 36 60, 50 74 C 64 60, 60 45, 50 32 Z"
                    className="stroke-[#C5A059] dark:stroke-[#E5C378] fill-[#FFFDF9] dark:fill-[#1E1A17]"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="50"
                    cy="55"
                    r="8"
                    className="stroke-[#C5A059] dark:stroke-[#E5C378] fill-white dark:fill-[#2B231C]"
                    strokeWidth="1.5"
                  />
                  {/* Diamond Gem */}
                  <polygon
                    points="50,50 54,53 54,57 50,60 46,57 46,53"
                    className="fill-[#EBF4FA] dark:fill-[#FAF7F2] stroke-[#7D736A] dark:stroke-[#E5C378]"
                    strokeWidth="0.8"
                  />
                  {/* Bottom Hanging Golden Bead */}
                  <circle cx="50" cy="79" r="3.2" className="fill-[#C5A059] dark:fill-[#E5C378]" />
                </svg>
              </div>

              {/* Two-Tone Title */}
              <div className="text-left">
                <div className="flex items-baseline tracking-normal">
                  <h1 className="font-serif italic font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#721C24] dark:text-[#E85D6B] tracking-tight">
                    SHREE
                  </h1>
                  <span className="ml-2 font-serif font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#A67C2E] dark:text-[#E5C378] tracking-tight">
                    HARI
                  </span>
                </div>
                {/* JEWELLERS Flourish Divider */}
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="h-[1px] w-6 sm:w-10 bg-[#C5A059] dark:bg-[#E5C378] opacity-70"></span>
                  <span className="font-serif text-[11px] sm:text-sm md:text-base tracking-[0.25em] uppercase font-bold text-[#8A6729] dark:text-[#E5C378]">
                    JEWELLERS
                  </span>
                  <span className="h-[1px] w-6 sm:w-10 bg-[#C5A059] dark:bg-[#E5C378] opacity-70"></span>
                </div>
              </div>
            </div>

            {/* Core Brand Motto: TRUST • PURITY • ELEGANCE */}
            <div className="mt-2 py-1 px-3 bg-[#C5A059]/10 dark:bg-[#E5C378]/10 rounded-lg border border-[#C5A059]/20 dark:border-[#E5C378]/20 inline-block">
              <span className="text-xs sm:text-sm font-serif tracking-[0.3em] uppercase font-semibold text-[#635132] dark:text-[#E5C378]">
                TRUST • PURITY • ELEGANCE
              </span>
            </div>

            {/* Description Subtitle */}
            <p className="mt-3 text-xs sm:text-sm text-[#7D736A] dark:text-[#A89E92] leading-relaxed max-w-xl text-center lg:text-left">
              Explore our handcrafted gold, antique kundan, bridal polki, and certified diamond jewelry. Stamped with official BIS HUID certification and backed by lifetime purity assurance.
            </p>

            {/* Action Buttons */}
            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 w-full sm:w-auto">
              {/* WhatsApp Showroom Inquiry */}
              <a
                href="https://wa.me/919876543210?text=Hello%20Shree%20Hari%20Jewellers,%20I%20would%20like%20to%20inquire%20about%20your%20latest%20jewelry%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-[#5E8357] hover:bg-[#4E7047] dark:bg-[#4E7047] dark:hover:bg-[#3F5B3A] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Showroom</span>
              </a>

              {/* View Bridal Collection */}
              <button
                onClick={() => setFilters((prev) => ({ ...prev, category: 'bridal_sets' }))}
                className="py-2.5 px-4 rounded-xl bg-[#FFFFFF] dark:bg-[#25201C] hover:bg-[#FAF8F5] dark:hover:bg-[#332C26] text-[#3D3732] dark:text-[#FAF7F2] text-xs sm:text-sm font-semibold border border-[#D9D1C7] dark:border-[#3D352E] flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <Gem className="w-4 h-4 text-[#C5A059] dark:text-[#E5C378]" />
                <span>Bridal Sets</span>
              </button>

              {/* View Saved Items */}
              {favorites.length > 0 && (
                <button
                  onClick={() => setIsFavoritesOpen(true)}
                  className="py-2.5 px-4 rounded-xl bg-[#FAF8F5] dark:bg-[#25201C] hover:bg-[#EBE5DE] dark:hover:bg-[#332C26] text-[#721C24] dark:text-[#E85D6B] text-xs sm:text-sm font-semibold border border-[#EBE5DE] dark:border-[#3D352E] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Saved ({favorites.length})</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Showcase Highlights: 3 Distinct Value Cards */}
          <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 sm:gap-3 shrink-0">
            {/* 1. BIS Purity */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#221D19] border border-[#D9D1C7] dark:border-[#3D352E] shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF6F0] dark:bg-[#2E2722] text-[#C5A059] dark:text-[#E5C378] flex items-center justify-center shrink-0 border border-[#E8DFD0] dark:border-[#42372E]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#3D3732] dark:text-[#FAF7F2]">
                  100% BIS Hallmarked
                </h4>
                <p className="text-[11px] text-[#7D736A] dark:text-[#A89E92]">
                  Official 6-digit HUID laser engraved guarantee.
                </p>
              </div>
            </div>

            {/* 2. Custom Crafted */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#221D19] border border-[#D9D1C7] dark:border-[#3D352E] shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF6F0] dark:bg-[#2E2722] text-[#C5A059] dark:text-[#E5C378] flex items-center justify-center shrink-0 border border-[#E8DFD0] dark:border-[#42372E]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#3D3732] dark:text-[#FAF7F2]">
                  Custom Made to Order
                </h4>
                <p className="text-[11px] text-[#7D736A] dark:text-[#A89E92]">
                  Tailored to your specific weight, karat & budget.
                </p>
              </div>
            </div>

            {/* 3. Live Transparent Rates */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#221D19] border border-[#D9D1C7] dark:border-[#3D352E] shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF6F0] dark:bg-[#2E2722] text-[#5E8357] dark:text-[#7DAF74] flex items-center justify-center shrink-0 border border-[#E8DFD0] dark:border-[#42372E]">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#3D3732] dark:text-[#FAF7F2]">
                  Transparent Weight & Rates
                </h4>
                <p className="text-[11px] text-[#7D736A] dark:text-[#A89E92]">
                  Accurate gold karatage and live market pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
