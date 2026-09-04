import React from 'react';
import {
  PhoneCall,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  ExternalLink,
  Navigation,
} from 'lucide-react';
import { useJewelry } from '../context/JewelryContext';
import { JewelryCategory } from '../types/jewelry';
import { ShreeHariLogo } from './brand/ShreeHariLogo';

export const Footer: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    setFilters,
    shopDetails,
    setIsHoursModalOpen,
  } = useJewelry();

  const handleCategoryClick = (cat: JewelryCategory) => {
    setFilters((prev) => ({ ...prev, category: cat }));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF8F5] dark:bg-[#13191F] border-t border-[#D9D1C7] dark:border-[#26313B] mt-12 text-[#3D3732] dark:text-[#FAF7F2] transition-colors">
      {/* Top Value Propositions */}
      <div className="border-b border-[#EBE5DE] dark:border-[#26313B] py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center sm:items-start gap-3 justify-center sm:justify-start">
            <div className="p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] text-[#C5A059] dark:text-[#E5C378] shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#3D3732] dark:text-[#FAF7F2] uppercase tracking-wider">
                {t.bisHallmarked}
              </h4>
              <p className="text-[11px] text-[#7D736A] dark:text-[#8E9CA8] mt-0.5">
                100% BIS 916 Hallmark certified with verified HUID laser stamping.
              </p>
            </div>
          </div>

          <div className="flex items-center sm:items-start gap-3 justify-center sm:justify-start">
            <div className="p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] text-[#C5A059] dark:text-[#E5C378] shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#3D3732] dark:text-[#FAF7F2] uppercase tracking-wider">
                {t.footer.customJewelryAvailable}
              </h4>
              <p className="text-[11px] text-[#7D736A] dark:text-[#8E9CA8] mt-0.5">
                Custom jewelry tailored to your exact karat, weight, and budget.
              </p>
            </div>
          </div>

          <div className="flex items-center sm:items-start gap-3 justify-center sm:justify-start">
            <div className="p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] text-[#5E8357] dark:text-[#7DAF74] shadow-2xs">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#3D3732] dark:text-[#FAF7F2] uppercase tracking-wider">
                Instant WhatsApp Support
              </h4>
              <p className="text-[11px] text-[#7D736A] dark:text-[#8E9CA8] mt-0.5">
                Send design codes directly for live stock availability and current gold rate estimation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        {/* Brand & Address Information */}
        <div className="md:col-span-2 space-y-3">
          <ShreeHariLogo variant="header" showSubtitle={true} showTagline={true} />

          <p className="text-[#7D736A] dark:text-[#8E9CA8] leading-relaxed max-w-md mt-2">
            {t.footer.tagline}
          </p>

          <div className="space-y-2.5 pt-2 text-[11px] text-[#635B53] dark:text-[#D4CCC2]">
            {/* Owner & Address */}
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#C5A059] dark:text-[#E5C378] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#3D3732] dark:text-[#FAF7F2] text-xs">
                  {shopDetails.name} • Owner: <span className="text-[#A67C2E] dark:text-[#E5C378]">{shopDetails.ownerName}</span>
                </p>
                <p className="text-[#635B53] dark:text-[#9DAEC0] mt-0.5 leading-relaxed">
                  {shopDetails.address}
                </p>
                <a
                  href={shopDetails.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#A67C2E] dark:text-[#E5C378] hover:underline font-bold mt-1 text-[11px]"
                >
                  <Navigation className="w-3 h-3" />
                  <span>{t.footer.viewOnMap} (Google Maps Location)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Operating Hours & Suggest New Hours Button */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C5A059] dark:text-[#E5C378] shrink-0" />
                <span className="font-semibold text-[#3D3732] dark:text-[#FAF7F2]">
                  Wed–Tue: 9:00 AM – 9:00 PM (Open 7 Days)
                </span>
              </div>
              <button
                onClick={() => setIsHoursModalOpen(true)}
                className="px-2 py-0.5 rounded-md bg-amber-100/70 hover:bg-amber-200 dark:bg-amber-950/50 dark:hover:bg-amber-900/60 text-[#A67C2E] dark:text-[#E5C378] text-[10px] font-bold border border-amber-300 dark:border-amber-800 transition-colors cursor-pointer"
              >
                View / Suggest Hours
              </button>
            </div>

            {/* Direct Phone Contacts */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1">
              <a
                href={`tel:${shopDetails.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-1.5 text-[#059669] dark:text-[#34D399] font-bold hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                <span>8000-461400 (Vishal Patadia)</span>
              </a>
              <a
                href={`tel:${shopDetails.secondaryPhone.replace(/\D/g, '')}`}
                className="flex items-center gap-1.5 text-[#059669] dark:text-[#34D399] font-bold hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                <span>96532-46571 (Showroom)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Categories */}
        <div>
          <h4 className="font-serif italic font-bold text-sm text-[#3D3732] dark:text-[#FAF7F2] mb-3">
            {t.allCategories}
          </h4>
          <ul className="space-y-1.5 text-[11px] text-[#635B53] dark:text-[#D4CCC2]">
            <li>
              <button
                onClick={() => handleCategoryClick('rings')}
                className="hover:text-[#A67C2E] dark:hover:text-[#E5C378] transition-colors cursor-pointer"
              >
                {t.categories.rings}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick('necklaces')}
                className="hover:text-[#A67C2E] dark:hover:text-[#E5C378] transition-colors cursor-pointer"
              >
                {t.categories.necklaces}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick('bangles')}
                className="hover:text-[#A67C2E] dark:hover:text-[#E5C378] transition-colors cursor-pointer"
              >
                {t.categories.bangles}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick('bridal_sets')}
                className="hover:text-[#A67C2E] dark:hover:text-[#E5C378] transition-colors cursor-pointer"
              >
                {t.categories.bridal_sets}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick('mangalsutra')}
                className="hover:text-[#A67C2E] dark:hover:text-[#E5C378] transition-colors cursor-pointer"
              >
                {t.categories.mangalsutra}
              </button>
            </li>
          </ul>
        </div>

        {/* Language Selection in Footer */}
        <div>
          <h4 className="font-serif italic font-bold text-sm text-[#3D3732] dark:text-[#FAF7F2] mb-3">
            Language / ભાષા / भाषा
          </h4>
          <p className="text-[11px] text-[#7D736A] dark:text-[#8E9CA8] mb-3">
            Switch catalog language:
          </p>
          <div className="space-y-1.5">
            <button
              onClick={() => setLanguage('en')}
              className={`w-full text-left px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                language === 'en'
                  ? 'bg-[#C5A059] dark:bg-[#E5C378] text-white dark:text-[#13191F] border-[#C5A059] dark:border-[#E5C378] font-bold'
                  : 'bg-white dark:bg-[#1E2730] text-[#635B53] dark:text-[#FAF7F2] border-[#D9D1C7] dark:border-[#2C3843] hover:bg-[#FAF8F5] dark:hover:bg-[#283542]'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('gu')}
              className={`w-full text-left px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                language === 'gu'
                  ? 'bg-[#C5A059] dark:bg-[#E5C378] text-white dark:text-[#13191F] border-[#C5A059] dark:border-[#E5C378] font-bold'
                  : 'bg-white dark:bg-[#1E2730] text-[#635B53] dark:text-[#FAF7F2] border-[#D9D1C7] dark:border-[#2C3843] hover:bg-[#FAF8F5] dark:hover:bg-[#283542]'
              }`}
            >
              ગુજરાતી (Gujarati)
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`w-full text-left px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                language === 'hi'
                  ? 'bg-[#C5A059] dark:bg-[#E5C378] text-white dark:text-[#13191F] border-[#C5A059] dark:border-[#E5C378] font-bold'
                  : 'bg-white dark:bg-[#1E2730] text-[#635B53] dark:text-[#FAF7F2] border-[#D9D1C7] dark:border-[#2C3843] hover:bg-[#FAF8F5] dark:hover:bg-[#283542]'
              }`}
            >
              हिन्दी (Hindi)
            </button>
          </div>
        </div>
      </div>

      {/* Copyright & Location confirmation */}
      <div className="border-t border-[#EBE5DE] dark:border-[#26313B] py-4 px-4 text-center text-[11px] text-[#7D736A] dark:text-[#8E9CA8] flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
        <p>© {new Date().getFullYear()} {shopDetails.name} • Vishal Patadia. Santej, Ahmedabad, Gujarat.</p>
        <a
          href={shopDetails.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#A67C2E] dark:text-[#E5C378] hover:underline"
        >
          <MapPin className="w-3 h-3" />
          <span>Shop 12 Mahakali Complex, Santej Chokdi, Ahmedabad - 382722</span>
        </a>
      </div>
    </footer>
  );
};

