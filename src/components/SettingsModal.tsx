import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Sun, 
  Moon, 
  Laptop, 
  Globe, 
  Scale, 
  TrendingUp, 
  RotateCcw, 
  Check, 
  Phone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Upload,
  KeyRound,
  AlertCircle,
  Lock,
  Unlock,
} from 'lucide-react';
import { useJewelry } from '../context/JewelryContext';
import { Language, ThemeMode, WeightUnit, UserRole } from '../types/jewelry';

export const SettingsModal: React.FC = () => {
  const { 
    isSettingsOpen, 
    setIsSettingsOpen, 
    t, 
    theme, 
    setTheme, 
    language, 
    setLanguage, 
    weightUnit, 
    setWeightUnit, 
    showLiveRates, 
    setShowLiveRates,
    resetToDefaults,
    shopDetails,
    setIsHoursModalOpen,
    isUploadEnabled,
    setIsUploadEnabled,
  } = useJewelry();

  const [resetSuccess, setResetSuccess] = useState(false);
  const [showCodePrompt, setShowCodePrompt] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [codeSuccess, setCodeSuccess] = useState('');

  if (!isSettingsOpen) return null;

  const handleToggleUpload = (targetChecked: boolean) => {
    if (targetChecked) {
      // User is attempting to enable: prompt for confirmation code 2212
      setShowCodePrompt(true);
      setEnteredCode('');
      setCodeError('');
      setCodeSuccess('');
    } else {
      // User is disabling: disable directly
      setIsUploadEnabled(false);
      setShowCodePrompt(false);
      setCodeSuccess('');
      setCodeError('');
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredCode.trim() === '2212') {
      setIsUploadEnabled(true);
      setShowCodePrompt(false);
      setCodeError('');
      setCodeSuccess('Authorization confirmed! Image upload, edit, and delete features are now active.');
      setTimeout(() => setCodeSuccess(''), 5000);
    } else {
      setCodeError('Incorrect code. Please enter the valid authorization code.');
    }
  };

  const handleResetCatalog = () => {
    if (window.confirm(t.settings.restoreConfirm)) {
      resetToDefaults();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  const themeOptions: { mode: ThemeMode; label: string; desc: string; icon: typeof Sun }[] = [
    { 
      mode: 'light', 
      label: t.settings.lightTheme, 
      desc: 'Warm Ivory & Royal Gold', 
      icon: Sun 
    },
    { 
      mode: 'dark', 
      label: t.settings.darkTheme, 
      desc: 'Velvet Obsidian & Antique Gold', 
      icon: Moon 
    },
    { 
      mode: 'system', 
      label: t.settings.systemTheme, 
      desc: 'Matches Device Setting', 
      icon: Laptop 
    },
  ];

  const languageOptions: { code: Language; name: string; nativeName: string; region: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English', region: 'Global & India' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'ગુજરાત / અમદાવાદ / સુરત' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'भारत / मुम्बई / दिल्ली' },
  ];

  const weightOptions: { unit: WeightUnit; title: string; desc: string }[] = [
    { unit: 'grams', title: t.settings.unitGrams, desc: 'e.g. 14.50 g' },
    { unit: 'tola', title: t.settings.unitTola, desc: 'e.g. 1.24 Tola (14.5g)' },
  ];

  return (
    <div 
      id="settings-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsSettingsOpen(false);
      }}
    >
      <div 
        id="settings-modal-card"
        className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#FAF7F2] dark:bg-[#1E1A17] text-[#3D3732] dark:text-[#E8E2D9] border border-[#D9D1C7] dark:border-[#3D352E] rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#EBE5DE] dark:border-[#332C26] bg-[#FFFFFF] dark:bg-[#25201C]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF4E8] dark:bg-[#332A1F] border border-[#E8D9BE] dark:border-[#4D3E29] flex items-center justify-center text-[#C5A059] dark:text-[#E5C378]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif-luxury text-[#2C2621] dark:text-[#FAF7F2]">
                {t.settings.title}
              </h2>
              <p className="text-xs text-[#7A7166] dark:text-[#A89E92]">
                {t.settings.subtitle}
              </p>
            </div>
          </div>
          <button
            id="close-settings-modal-btn"
            onClick={() => setIsSettingsOpen(false)}
            className="p-2 rounded-xl text-[#7A7166] hover:text-[#2C2621] dark:text-[#A89E92] dark:hover:text-[#FAF7F2] hover:bg-[#F2EEE9] dark:hover:bg-[#332C26] transition-colors"
            title={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Showroom Details & Timings Quick Card */}
          <section id="showroom-info-section" className="p-4 rounded-xl bg-white dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-4 h-4 text-[#C5A059] dark:text-[#E5C378]" />
                  <h3 className="text-xs font-bold text-[#3D3732] dark:text-[#FAF7F2]">
                    Showroom Timings & Location
                  </h3>
                </div>
                <p className="text-[11px] text-[#7A7166] dark:text-[#A89E92]">
                  9:00 AM – 9:00 PM (All 7 Days) • Santej Chokdi, Ahmedabad
                </p>
                <p className="text-[11px] text-[#059669] dark:text-[#34D399] font-medium mt-1">
                  Contacts: 8000-461400 / 96532-46571 (Owner: {shopDetails.ownerName})
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSettingsOpen(false);
                  setIsHoursModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#1E1A17] border border-[#D9D1C7] dark:border-[#3D352E] text-xs font-bold text-[#A67C2E] dark:text-[#E5C378] hover:bg-amber-50 dark:hover:bg-[#332A1F] transition-colors cursor-pointer shrink-0"
              >
                View / Suggest Hours
              </button>
            </div>
          </section>

          {/* Safety Feature: Image & Design Upload Toggle (Requires Code 2212) */}
          <section id="upload-safety-feature-section" className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] shadow-2xs">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl border mt-0.5 ${
                  isUploadEnabled
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                    : 'bg-[#FAF4E8] dark:bg-[#332A1F] border-[#E8D9BE] dark:border-[#4A3E31] text-[#A67C2E] dark:text-[#E5C378]'
                }`}>
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#4A433F] dark:text-[#D4CCC2]">
                      Image Upload Safety Feature
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      isUploadEnabled
                        ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700'
                        : 'bg-gray-100 dark:bg-[#2A2420] text-gray-600 dark:text-gray-400 border-gray-300 dark:border-[#423932]'
                    }`}>
                      {isUploadEnabled ? 'Upload Enabled' : 'Upload Disabled'}
                    </span>
                  </div>
                  <p className="text-xs text-[#7A7166] dark:text-[#A89E92] mt-1">
                    {isUploadEnabled
                      ? 'Image upload, edit, and delete features are active.'
                      : 'Toggle to enable image upload and design management features.'}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="shrink-0 pt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="toggle-image-upload-safety"
                    checked={isUploadEnabled}
                    onChange={(e) => handleToggleUpload(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#D9D1C7] dark:bg-[#3D352E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D9D1C7] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
                </label>
              </div>
            </div>

            {/* Confirmation Code Prompt Card */}
            {showCodePrompt && (
              <div className="mt-3.5 p-3.5 rounded-xl bg-white dark:bg-[#1E1A17] border border-amber-300 dark:border-amber-700 shadow-sm animate-fadeIn">
                <div className="flex items-center gap-2 mb-2">
                  <KeyRound className="w-4 h-4 text-[#C5A059] dark:text-[#E5C378]" />
                  <h4 className="text-xs font-bold text-[#3D3732] dark:text-[#FAF7F2]">
                    Enter Confirmation Code to Enable Image Upload
                  </h4>
                </div>
                <p className="text-[11px] text-[#7A7166] dark:text-[#A89E92] mb-3">
                  Enter authorization code to enable image upload, edit, and delete features.
                </p>

                <form onSubmit={handleVerifyCode} className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        autoFocus
                        maxLength={6}
                        value={enteredCode}
                        onChange={(e) => {
                          setEnteredCode(e.target.value);
                          setCodeError('');
                        }}
                        placeholder="Enter Code"
                        className="w-full pl-8 pr-3 py-2 text-xs font-mono tracking-widest bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-lg text-[#3D3732] dark:text-[#FAF7F2] focus:outline-none focus:border-[#C5A059] dark:focus:border-[#E5C378]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-[#C5A059] hover:bg-[#B38E46] dark:bg-[#E5C378] dark:hover:bg-[#D4AF37] text-white dark:text-[#1E1A17] text-xs font-bold rounded-lg shadow-xs cursor-pointer transition-colors whitespace-nowrap"
                    >
                      Confirm Code
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCodePrompt(false);
                        setCodeError('');
                      }}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#2C241F] dark:hover:bg-[#382F28] text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                  </div>

                  {codeError && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{codeError}</span>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Success banner */}
            {codeSuccess && (
              <div className="mt-3 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{codeSuccess}</span>
              </div>
            )}
          </section>

          {/* 1. Theme Setting */}
          <section id="theme-settings-section">
            <div className="flex items-center space-x-2 mb-2">
              <Sun className="w-4 h-4 text-[#C5A059] dark:text-[#E5C378]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#4A433F] dark:text-[#D4CCC2]">
                {t.settings.theme}
              </h3>
            </div>
            <p className="text-xs text-[#7A7166] dark:text-[#A89E92] mb-3">
              {t.settings.themeDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {themeOptions.map((opt) => {
                const isSelected = theme === opt.mode;
                const IconComponent = opt.icon;
                return (
                  <button
                    key={opt.mode}
                    id={`theme-opt-${opt.mode}`}
                    onClick={() => setTheme(opt.mode)}
                    className={`relative flex flex-col items-start p-3.5 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-[#C5A059] dark:border-[#E5C378] bg-[#FFFDF9] dark:bg-[#2B231C] ring-2 ring-[#C5A059]/20 shadow-sm'
                        : 'border-[#D9D1C7] dark:border-[#3D352E] bg-[#FFFFFF] dark:bg-[#241F1B] hover:border-[#C5A059]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className={`p-2 rounded-lg ${
                        isSelected 
                          ? 'bg-[#C5A059] text-white dark:bg-[#E5C378] dark:text-[#1E1A17]' 
                          : 'bg-[#F2EEE9] dark:bg-[#332C26] text-[#7A7166] dark:text-[#A89E92]'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      {isSelected && (
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C5A059] dark:bg-[#E5C378] text-white dark:text-[#1E1A17]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-sm text-[#2C2621] dark:text-[#FAF7F2]">
                      {opt.label}
                    </span>
                    <span className="text-[11px] text-[#7A7166] dark:text-[#9E9387] mt-0.5">
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. Language Setting */}
          <section id="language-settings-section" className="pt-4 border-t border-[#EBE5DE] dark:border-[#332C26]">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="w-4 h-4 text-[#C5A059] dark:text-[#E5C378]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#4A433F] dark:text-[#D4CCC2]">
                {t.settings.language}
              </h3>
            </div>
            <p className="text-xs text-[#7A7166] dark:text-[#A89E92] mb-3">
              {t.settings.languageDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {languageOptions.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    id={`lang-opt-${lang.code}`}
                    onClick={() => setLanguage(lang.code)}
                    className={`relative flex flex-col p-3.5 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-[#C5A059] dark:border-[#E5C378] bg-[#FFFDF9] dark:bg-[#2B231C] ring-2 ring-[#C5A059]/20 shadow-sm'
                        : 'border-[#D9D1C7] dark:border-[#3D352E] bg-[#FFFFFF] dark:bg-[#241F1B] hover:border-[#C5A059]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-base font-bold text-[#2C2621] dark:text-[#FAF7F2]">
                        {lang.nativeName}
                      </span>
                      {isSelected && (
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C5A059] dark:bg-[#E5C378] text-white dark:text-[#1E1A17]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-[#7A7166] dark:text-[#A89E92]">
                      {lang.name}
                    </span>
                    <span className="text-[10px] text-[#9E9387] dark:text-[#7D7469] mt-1">
                      {lang.region}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 3. Weight Unit Preference */}
          <section id="weight-unit-settings-section" className="pt-4 border-t border-[#EBE5DE] dark:border-[#332C26]">
            <div className="flex items-center space-x-2 mb-2">
              <Scale className="w-4 h-4 text-[#C5A059] dark:text-[#E5C378]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#4A433F] dark:text-[#D4CCC2]">
                {t.settings.weightUnit}
              </h3>
            </div>
            <p className="text-xs text-[#7A7166] dark:text-[#A89E92] mb-3">
              {t.settings.weightUnitDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {weightOptions.map((opt) => {
                const isSelected = weightUnit === opt.unit;
                return (
                  <button
                    key={opt.unit}
                    id={`weight-unit-${opt.unit}`}
                    onClick={() => setWeightUnit(opt.unit)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-[#C5A059] dark:border-[#E5C378] bg-[#FFFDF9] dark:bg-[#2B231C] ring-2 ring-[#C5A059]/20 shadow-sm'
                        : 'border-[#D9D1C7] dark:border-[#3D352E] bg-[#FFFFFF] dark:bg-[#241F1B] hover:border-[#C5A059]/50'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-sm text-[#2C2621] dark:text-[#FAF7F2] block">
                        {opt.title}
                      </span>
                      <span className="text-xs text-[#7A7166] dark:text-[#A89E92]">
                        {opt.desc}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C5A059] dark:bg-[#E5C378] text-white dark:text-[#1E1A17]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 4. Live Rates Bar Toggle */}
          <section id="rates-bar-settings-section" className="pt-4 border-t border-[#EBE5DE] dark:border-[#332C26]">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#D9D1C7] dark:border-[#3D352E] bg-[#FFFFFF] dark:bg-[#241F1B]">
              <div className="flex items-start space-x-3 pr-4">
                <div className="p-2 rounded-lg bg-[#FAF4E8] dark:bg-[#332A1F] text-[#C5A059] dark:text-[#E5C378] mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#2C2621] dark:text-[#FAF7F2]">
                    {t.settings.liveRatesBar}
                  </h4>
                  <p className="text-xs text-[#7A7166] dark:text-[#A89E92] mt-0.5">
                    {t.settings.liveRatesDesc}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="toggle-live-rates-switch"
                  checked={showLiveRates}
                  onChange={(e) => setShowLiveRates(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#D9D1C7] dark:bg-[#3D352E] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D9D1C7] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C5A059] dark:peer-checked:bg-[#E5C378]"></div>
              </label>
            </div>
          </section>

          {/* 5. Catalog Management / Reset */}
          <section id="catalog-data-section" className="pt-4 border-t border-[#EBE5DE] dark:border-[#332C26]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-xl border border-[#D9D1C7] dark:border-[#3D352E] bg-[#FFFFFF] dark:bg-[#241F1B] gap-3">
              <div>
                <h4 className="text-sm font-semibold text-[#2C2621] dark:text-[#FAF7F2] flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-[#7A7166] dark:text-[#A89E92]" />
                  {t.settings.restoreDefaults}
                </h4>
                <p className="text-xs text-[#7A7166] dark:text-[#A89E92] mt-0.5">
                  {t.settings.restoreDefaultsDesc}
                </p>
              </div>
              <button
                id="reset-catalog-btn"
                onClick={handleResetCatalog}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#D9D1C7] dark:border-[#4A4038] text-[#7A7166] dark:text-[#D4CCC2] hover:bg-[#F2EEE9] dark:hover:bg-[#332C26] hover:text-[#C5A059] dark:hover:text-[#E5C378] transition-colors whitespace-nowrap"
              >
                {t.settings.restoreDefaults}
              </button>
            </div>
            {resetSuccess && (
              <div className="mt-2 p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-800 dark:text-emerald-300 text-xs flex items-center space-x-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t.settings.restoredSuccess}</span>
              </div>
            )}
          </section>

          {/* Showroom Trust Badge */}
          <div className="p-3 rounded-xl bg-[#FAF4E8]/60 dark:bg-[#241F1B] border border-[#E8D9BE]/50 dark:border-[#3D352E] flex items-center justify-between text-xs text-[#7A7166] dark:text-[#A89E92]">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A059] dark:text-[#E5C378]" />
              <span>100% BIS 916 Hallmarked Certified Catalog</span>
            </div>
            <span className="text-[11px] font-medium text-[#C5A059] dark:text-[#E5C378]">
              {t.appName}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-[#EBE5DE] dark:border-[#332C26] bg-[#FFFFFF] dark:bg-[#25201C] flex items-center justify-end">
          <button
            id="close-settings-footer-btn"
            onClick={() => setIsSettingsOpen(false)}
            className="px-5 py-2 rounded-xl text-sm font-medium bg-[#C5A059] hover:bg-[#B38E46] text-white dark:bg-[#E5C378] dark:hover:bg-[#D4AF37] dark:text-[#1E1A17] transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
