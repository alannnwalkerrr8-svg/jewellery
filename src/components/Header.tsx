import React from 'react';
import {
  Search,
  Upload,
  Heart,
  SlidersHorizontal,
  X,
  PhoneCall,
  Settings,
  Sun,
  Moon,
  MapPin,
  Clock,
} from 'lucide-react';
import { useJewelry } from '../context/JewelryContext';
import { Language } from '../types/jewelry';
import { ShreeHariLogo } from './brand/ShreeHariLogo';

export const Header: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    filters,
    setFilters,
    favorites,
    setIsFavoritesOpen,
    setIsUploadModalOpen,
    setIsFilterDrawerOpen,
    setIsSettingsOpen,
    setIsHoursModalOpen,
    isUploadEnabled,
    theme,
    resolvedTheme,
    toggleTheme,
    showLiveRates,
    liveRates,
    shopDetails,
  } = useJewelry();

  const languages: { code: Language; label: string; nativeName: string }[] = [
    { code: 'en', label: 'English', nativeName: 'EN' },
    { code: 'gu', label: 'Gujarati', nativeName: 'ગુજ' },
    { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleClearSearch = () => {
    setFilters((prev) => ({ ...prev, searchQuery: '' }));
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] dark:bg-[#181E24] border-b border-[#D9D1C7] dark:border-[#2C3843] shadow-xs transition-colors duration-300">
      {/* Top Gold Barometer & Language/Settings Notice */}
      {showLiveRates && (
        <div className="bg-[#FAF8F5] dark:bg-[#13191F] border-b border-[#EBE5DE] dark:border-[#26313B] px-3 sm:px-4 py-1 text-xs text-[#7D736A] dark:text-[#8E9CA8] transition-colors overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            {/* Realtime Animated Gold and Silver Price Ticker (Sliding Right to Left) */}
            <div className="flex-1 min-w-0 overflow-hidden relative flex items-center">
              {/* Subtle edge fades */}
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-[#FAF8F5] dark:from-[#13191F] to-transparent z-10 pointer-events-none" />
              
              <div className="animate-rates-marquee items-center gap-6 text-[11px] select-none py-0.5 whitespace-nowrap">
                {/* First Copy */}
                <div className="flex items-center gap-4 shrink-0">
                  <span className="flex items-center gap-1 font-bold text-[#A67C2E] dark:text-[#E5C378]">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span>Live Market Rates:</span>
                  </span>
                  <span className="text-[#3D3732] dark:text-[#E8EDF2] font-mono">
                    <strong className="font-sans font-semibold text-[#A67C2E] dark:text-[#E5C378]">22K:</strong> ₹{liveRates.gold22k.toLocaleString('en-IN')}/g <span className="text-[#EF4444] text-[10px]">▼ {liveRates.gold22kChange}</span>
                  </span>
                  <span className="text-[#D9D1C7] dark:text-[#2C3843]">•</span>
                  <span className="text-[#3D3732] dark:text-[#E8EDF2] font-mono">
                    <strong className="font-sans font-semibold text-[#A67C2E] dark:text-[#E5C378]">24K:</strong> ₹{liveRates.gold24k.toLocaleString('en-IN')}/g <span className="text-[#EF4444] text-[10px]">▼ {liveRates.gold24kChange}</span>
                  </span>
                  <span className="text-[#D9D1C7] dark:text-[#2C3843]">•</span>
                  <span className="text-[#3D3732] dark:text-[#E8EDF2] font-mono">
                    <strong className="font-sans font-semibold text-[#A67C2E] dark:text-[#E5C378]">18K:</strong> ₹{liveRates.gold18k.toLocaleString('en-IN')}/g <span className="text-[#EF4444] text-[10px]">▼ {liveRates.gold18kChange}</span>
                  </span>
                  <span className="text-[#D9D1C7] dark:text-[#2C3843]">•</span>
                  <span className="text-[#3D3732] dark:text-[#E8EDF2] font-mono">
                    <strong className="font-sans font-semibold text-[#7D736A] dark:text-[#D4CCC2]">Silver:</strong> ₹{liveRates.silverPerKg.toLocaleString('en-IN')}/kg (₹{liveRates.silverPerGram}/g)
                  </span>
                  <span className="text-[#D9D1C7] dark:text-[#2C3843]">•</span>
                  <span className="text-[#3D3732] dark:text-[#E8EDF2] font-mono">
                    <strong className="font-sans font-semibold text-[#A67C2E] dark:text-[#E5C378]">1 Tola (22K):</strong> ₹{(liveRates.gold22k * 10).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[#D9D1C7] dark:text-[#2C3843]">•</span>
                  <span className="text-[#3D3732] dark:text-[#E8EDF2] font-mono">
                    <strong className="font-sans font-semibold text-[#A67C2E] dark:text-[#E5C378]">1 Tola (24K):</strong> ₹{(liveRates.gold24k * 10).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[#D9D1C7] dark:text-[#2C3843]">|</span>
                </div>

                {/* Second Copy (for continuous right to left marquee slide) */}
                <div className="flex items-center gap-4 shrink-0">
                  <span className="flex items-center gap-1 font-bold text-[#A67C2E] dark:text-[#E5C378]">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span>Live Market Rates:</span>
                  </span>
                  <span className="text-[#3D3732] dark:text-[#E8EDF2] font-mono">
                    <strong className="font-sans font-semibold text-[#A67C2E] dark:text-[#E5C378]">22K:</strong> ₹{liveRates.gold22k.toLocaleString('en-IN')}/g <span className="text-[#EF4444] text-[10px]">▼ {liveRates.gold22kChange}</span>
                  </span>
                  <span className="text-[#D9D1C7] dark:text-[#2C3843]">•</span>
                  <span className="text-[#3D3732] dark:text-[#E8EDF2] font-mono">
                    <strong className="font-sans font-semibold text-[#A67C2E] dark:text-[#E5C378]">24K:</strong> ₹{liveRates.gold24k.toLocaleString('en-IN')}/g <span className="text-[#EF4444] text-[10px]">▼ {liveRates.gold24kChange}</span>
                  </span>
                  <span className="text-[#D9D1C7] dark:text-[#2C3843]">•</span>
                  <span className="text-[#3D3732] dark:text-[#E8EDF2] font-mono">
                    <strong className="font-sans font-semibold text-[#A67C2E] dark:text-[#E5C378]">18K:</strong> ₹{liveRates.gold18k.toLocaleString('en-IN')}/g <span className="text-[#EF4444] text-[10px]">▼ {liveRates.gold18kChange}</span>
                  </span>
                  <span className="text-[#D9D1C7] dark:text-[#2C3843]">•</span>
                  <span className="text-[#3D3732] dark:text-[#E8EDF2] font-mono">
                    <strong className="font-sans font-semibold text-[#7D736A] dark:text-[#D4CCC2]">Silver:</strong> ₹{liveRates.silverPerKg.toLocaleString('en-IN')}/kg (₹{liveRates.silverPerGram}/g)
                  </span>
                  <span className="text-[#D9D1C7] dark:text-[#2C3843]">•</span>
                  <span className="text-[#3D3732] dark:text-[#E8EDF2] font-mono">
                    <strong className="font-sans font-semibold text-[#A67C2E] dark:text-[#E5C378]">1 Tola (22K):</strong> ₹{(liveRates.gold22k * 10).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[#D9D1C7] dark:text-[#2C3843]">•</span>
                  <span className="text-[#3D3732] dark:text-[#E8EDF2] font-mono">
                    <strong className="font-sans font-semibold text-[#A67C2E] dark:text-[#E5C378]">1 Tola (24K):</strong> ₹{(liveRates.gold24k * 10).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[#D9D1C7] dark:text-[#2C3843]">|</span>
                </div>
              </div>

              <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-[#FAF8F5] dark:from-[#13191F] to-transparent z-10 pointer-events-none" />
            </div>

            {/* Quick Contact, Hours, Language & Quick Theme */}
            <div className="flex items-center gap-1.5 sm:gap-2 ml-auto text-[11px] shrink-0">
              {/* Santej Chokdi Showroom Link (No repeated Ahmedabad) */}
              <a
                href={shopDetails.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1 text-[#C5A059] dark:text-[#E5C378] hover:underline font-medium transition-colors"
                title="Google Maps Location: Santej Chokdi"
              >
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-[160px]">Santej Chokdi Showroom</span>
              </a>

              {/* Showroom Hours Quick Trigger */}
              <button
                id="header-hours-btn"
                onClick={() => setIsHoursModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100/70 dark:bg-amber-950/50 hover:bg-amber-200 text-[#A67C2E] dark:text-[#E5C378] font-semibold text-[10px] border border-amber-300/60 dark:border-amber-800/60 transition-colors cursor-pointer"
                title="Click to view weekly schedule or suggest new hours"
              >
                <Clock className="w-3 h-3" />
                <span>9 AM – 9 PM</span>
              </button>

              {/* Direct Phone Numbers */}
              <div className="hidden xl:flex items-center gap-1.5">
                <a
                  href={`tel:8000461400`}
                  className="flex items-center gap-1 text-[#5E8357] dark:text-[#7DAF74] hover:text-[#4B6B46] dark:hover:text-[#96C88D] font-medium transition-colors"
                  title="Call Vishal Patadia (Primary)"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>8000-461400</span>
                </a>
                <span className="text-[#D9D1C7] dark:text-[#2C3843]">|</span>
                <a
                  href={`tel:9653246571`}
                  className="flex items-center gap-1 text-[#5E8357] dark:text-[#7DAF74] hover:text-[#4B6B46] dark:hover:text-[#96C88D] font-medium transition-colors"
                  title="Call Showroom (Secondary)"
                >
                  <span>96532-46571</span>
                </a>
              </div>

              {/* Language Switcher Buttons (Inline) */}
              <div className="flex items-center bg-[#FAF8F5] dark:bg-[#1E2730] p-0.5 rounded-lg border border-[#D9D1C7] dark:border-[#2C3843]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] rounded-md font-semibold transition-all cursor-pointer ${
                      language === lang.code
                        ? 'bg-[#C5A059] dark:bg-[#E5C378] text-white dark:text-[#13191F] shadow-xs'
                        : 'text-[#635B53] dark:text-[#8E9CA8] hover:text-[#3D3732] dark:hover:text-[#FAF7F2] hover:bg-[#EBE5DE] dark:hover:bg-[#283542]'
                    }`}
                    title={lang.label}
                  >
                    {lang.nativeName}
                  </button>
                ))}
              </div>

              {/* Quick Dark/Light Theme Toggle */}
              <button
                id="quick-theme-toggle-header"
                onClick={toggleTheme}
                className="p-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] text-[#635B53] dark:text-[#E5C378] hover:bg-[#EBE5DE] dark:hover:bg-[#283542] transition-colors cursor-pointer"
                title={`Current: ${theme}. Click to switch theme`}
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-[#E5C378]" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-[#7D736A]" />
                )}
              </button>

              {/* Settings Trigger - Only Setting Icon, no "App" text */}
              <button
                id="open-settings-header-btn"
                onClick={() => setIsSettingsOpen(true)}
                className="p-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] text-[#635B53] dark:text-[#8E9CA8] hover:text-[#C5A059] dark:hover:text-[#E5C378] hover:bg-[#EBE5DE] dark:hover:bg-[#283542] transition-colors cursor-pointer flex items-center justify-center"
                title={t.settings.title}
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
          {/* Official Shree Hari Jewellers Branding Logo */}
          <div className="shrink-0">
            <ShreeHariLogo variant="header" showSubtitle={true} showTagline={false} />
          </div>

          {/* Search Bar - Desktop & Tablet */}
          <div className="flex-1 max-w-lg mx-2 hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-[#7D736A] dark:text-[#9E9387] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={handleSearchChange}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] placeholder-[#7D736A] dark:placeholder-[#9E9387] focus:outline-none focus:border-[#C5A059] dark:focus:border-[#E5C378] focus:bg-[#FFFFFF] dark:focus:bg-[#1E1A17] transition-all"
              />
              {filters.searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#7D736A] dark:text-[#9E9387] hover:text-[#3D3732] dark:hover:text-[#FAF7F2] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Actions: Filter Mobile, Saved, Upload Image (when enabled) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] text-[#4A433F] dark:text-[#E8E2D9] hover:bg-[#EBE5DE] dark:hover:bg-[#332C26] transition-colors cursor-pointer relative"
              title={t.filters}
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C5A059] dark:text-[#E5C378]" />
            </button>

            {/* Saved / Favorites Button */}
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] text-[#4A433F] dark:text-[#E8E2D9] hover:bg-[#EBE5DE] dark:hover:bg-[#332C26] transition-colors flex items-center gap-1.5 cursor-pointer relative"
              title={t.savedDesigns}
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-[#C5A059] dark:text-[#E5C378] fill-[#C5A059] dark:fill-[#E5C378]' : 'text-[#7D736A] dark:text-[#9E9387]'}`} />
              <span className="hidden sm:inline text-xs font-medium text-[#3D3732] dark:text-[#FAF7F2]">
                {t.savedDesigns}
              </span>
              {favorites.length > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white dark:text-[#1E1A17] bg-[#C5A059] dark:bg-[#E5C378] rounded-full">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Upload Image Button - Shows near Saved Favorites ONLY when enabled via code 2212 in settings */}
            {isUploadEnabled && (
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-2.5 sm:px-3.5 py-2 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] dark:bg-[#E5C378] dark:hover:bg-[#D4AF37] text-white dark:text-[#1E1A17] font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs cursor-pointer transition-all hover:shadow-sm active:scale-[0.98]"
                id="btn-upload-design-header"
                title="Upload Jewelry Design (Image Upload Enabled)"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden xs:inline">{t.uploadDesign}</span>
                <span className="xs:hidden">Upload</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile/Tablet Search Bar */}
        <div className="mt-2 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7D736A] dark:text-[#9E9387] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={handleSearchChange}
              placeholder={t.searchPlaceholder}
              className="w-full pl-8 pr-8 py-2 text-xs bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] placeholder-[#7D736A] dark:placeholder-[#9E9387] focus:outline-none focus:border-[#C5A059] dark:focus:border-[#E5C378] focus:bg-[#FFFFFF] dark:focus:bg-[#1E1A17]"
            />
            {filters.searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#7D736A] dark:text-[#9E9387]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
