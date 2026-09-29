import React, { useState, useEffect } from 'react';
import {
  X,
  RefreshCw,
  RotateCcw,
  Check,
  MapPin,
  Calendar,
  AlertCircle,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { useJewelry } from '../../context/JewelryContext';
import { AhmedabadLiveRates } from '../../types/jewelry';

export const EditLiveRatesModal: React.FC = () => {
  const {
    isEditRatesModalOpen,
    setIsEditRatesModalOpen,
    liveRates,
    updateLiveRates,
    resetLiveRatesToBenchmark,
    refreshLiveRates,
    isRatesRefreshing,
  } = useJewelry();

  const [formData, setFormData] = useState<AhmedabadLiveRates>(liveRates);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);

  // Sync form data whenever modal opens or liveRates changes
  useEffect(() => {
    if (isEditRatesModalOpen) {
      setFormData(liveRates);
      setSaveSuccess(false);
      setRefreshMessage(null);
    }
  }, [isEditRatesModalOpen, liveRates]);

  if (!isEditRatesModalOpen) return null;

  const handleChange = (field: keyof AhmedabadLiveRates, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGold24kChange = (valStr: string) => {
    const val24k = parseFloat(valStr) || 0;
    // Auto-calculate 22K (91.6%) and 18K (75%)
    const val22k = Math.round(val24k * (22 / 24) * 0.999);
    const val18k = Math.round(val24k * 0.75);

    setFormData((prev) => ({
      ...prev,
      gold24k: val24k,
      gold22k: val22k,
      gold18k: val18k,
    }));
  };

  const handleSilverPerKgChange = (valStr: string) => {
    const perKg = parseFloat(valStr) || 0;
    const perGram = Number((perKg / 1000).toFixed(1));
    setFormData((prev) => ({
      ...prev,
      silverPerKg: perKg,
      silverPerGram: perGram,
    }));
  };

  const handleSilverPerGramChange = (valStr: string) => {
    const perGram = parseFloat(valStr) || 0;
    const perKg = Math.round(perGram * 1000);
    setFormData((prev) => ({
      ...prev,
      silverPerGram: perGram,
      silverPerKg: perKg,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateLiveRates(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setIsEditRatesModalOpen(false);
      setSaveSuccess(false);
    }, 1200);
  };

  const handleRefreshFromMarket = async () => {
    setRefreshMessage(null);
    const success = await refreshLiveRates();
    if (success) {
      setRefreshMessage('Rates synchronized with live market feed!');
    } else {
      setRefreshMessage('Applied latest verified Ahmedabad bullion benchmark rates.');
    }
    setTimeout(() => setRefreshMessage(null), 3500);
  };

  const handleResetBenchmark = () => {
    resetLiveRatesToBenchmark();
    setRefreshMessage('Reset to standard Ahmedabad IBJA benchmark rates.');
    setTimeout(() => setRefreshMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#181E24] border border-[#D9D1C7] dark:border-[#2C3843] rounded-2xl max-w-lg w-full shadow-2xl text-[#3D3732] dark:text-[#E8EDF2] my-auto overflow-hidden transition-colors">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#EBE5DE] dark:border-[#26313B] bg-[#FAF8F5] dark:bg-[#13191F] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059]/15 dark:bg-[#E5C378]/15 flex items-center justify-center text-[#A67C2E] dark:text-[#E5C378]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif italic font-bold text-sm sm:text-base text-[#3D3732] dark:text-[#FAF7F2]">
                Update Today's Live Market Rates
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-[#7D736A] dark:text-[#8E9CA8]">
                <span className="flex items-center gap-1 font-medium text-[#A67C2E] dark:text-[#E5C378]">
                  <MapPin className="w-3 h-3" />
                  {formData.city} Bullion Market
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formData.date}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditRatesModalOpen(false)}
            className="p-2 rounded-lg text-[#7D736A] dark:text-[#8E9CA8] hover:bg-white dark:hover:bg-[#202933] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Actions Bar (Quick Auto-Sync & Reset) */}
        <div className="px-4 py-3 bg-[#F4EFEA]/60 dark:bg-[#151D24] border-b border-[#EBE5DE] dark:border-[#26313B] flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleRefreshFromMarket}
            disabled={isRatesRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] disabled:opacity-60 text-white font-semibold text-xs shadow-2xs transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRatesRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRatesRefreshing ? 'Fetching Market Feed...' : 'Sync Live Market Feed'}</span>
          </button>

          <button
            type="button"
            onClick={handleResetBenchmark}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] hover:bg-[#FAF8F5] text-[#7D736A] dark:text-[#8E9CA8] font-medium text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Benchmark</span>
          </button>
        </div>

        {refreshMessage && (
          <div className="mx-4 mt-3 px-3 py-2 rounded-lg bg-[#10B981]/10 border border-[#10B981]/30 text-[#059669] dark:text-[#34D399] text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{refreshMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-4 sm:p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {/* Rate Date & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#7D736A] dark:text-[#8E9CA8] mb-1">
                City / Market Location
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#1E2730] text-[#3D3732] dark:text-[#FAF7F2] focus:ring-2 focus:ring-[#C5A059]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#7D736A] dark:text-[#8E9CA8] mb-1">
                Display Date
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#1E2730] text-[#3D3732] dark:text-[#FAF7F2] focus:ring-2 focus:ring-[#C5A059]"
                required
              />
            </div>
          </div>

          {/* Gold Rates Section */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#141C24] border border-[#EBE5DE] dark:border-[#26313B] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#A67C2E] dark:text-[#E5C378] uppercase tracking-wider">
                Gold Rates (₹ / Gram)
              </span>
              <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8]">
                Changes auto-calculate 22K & 18K
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 24K Gold */}
              <div>
                <label className="block text-[11px] font-semibold text-[#3D3732] dark:text-[#FAF7F2] mb-1">
                  24K Gold (99.9%)
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#7D736A] dark:text-[#8E9CA8]">₹</span>
                  <input
                    type="number"
                    step="1"
                    value={formData.gold24k}
                    onChange={(e) => handleGold24kChange(e.target.value)}
                    className="w-full pl-6 pr-2.5 py-1.5 text-xs font-mono font-bold rounded-lg border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#1E2730] text-[#3D3732] dark:text-[#FAF7F2] focus:ring-2 focus:ring-[#C5A059]"
                    required
                  />
                </div>
                <div className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] mt-0.5">
                  10g: ₹{(formData.gold24k * 10).toLocaleString('en-IN')}
                </div>
              </div>

              {/* 22K Gold (916) */}
              <div>
                <label className="block text-[11px] font-semibold text-[#3D3732] dark:text-[#FAF7F2] mb-1">
                  22K Gold (91.6% Hallmark)
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#7D736A] dark:text-[#8E9CA8]">₹</span>
                  <input
                    type="number"
                    step="1"
                    value={formData.gold22k}
                    onChange={(e) => handleChange('gold22k', parseFloat(e.target.value) || 0)}
                    className="w-full pl-6 pr-2.5 py-1.5 text-xs font-mono font-bold rounded-lg border border-[#10B981]/50 dark:border-[#10B981]/50 bg-white dark:bg-[#1E2730] text-[#3D3732] dark:text-[#FAF7F2] focus:ring-2 focus:ring-[#10B981]"
                    required
                  />
                </div>
                <div className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] mt-0.5">
                  10g: ₹{(formData.gold22k * 10).toLocaleString('en-IN')}
                </div>
              </div>

              {/* 18K Gold */}
              <div>
                <label className="block text-[11px] font-semibold text-[#3D3732] dark:text-[#FAF7F2] mb-1">
                  18K Gold (75.0%)
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#7D736A] dark:text-[#8E9CA8]">₹</span>
                  <input
                    type="number"
                    step="1"
                    value={formData.gold18k}
                    onChange={(e) => handleChange('gold18k', parseFloat(e.target.value) || 0)}
                    className="w-full pl-6 pr-2.5 py-1.5 text-xs font-mono font-bold rounded-lg border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#1E2730] text-[#3D3732] dark:text-[#FAF7F2] focus:ring-2 focus:ring-[#C5A059]"
                    required
                  />
                </div>
                <div className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] mt-0.5">
                  10g: ₹{(formData.gold18k * 10).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

          {/* Silver & Platinum Section */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#141C24] border border-[#EBE5DE] dark:border-[#26313B] space-y-3">
            <span className="text-xs font-bold text-[#7D736A] dark:text-[#D4CCC2] uppercase tracking-wider block">
              Silver & Platinum Rates
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Silver / Kg */}
              <div>
                <label className="block text-[11px] font-semibold text-[#3D3732] dark:text-[#FAF7F2] mb-1">
                  Silver (₹ / 1 Kg)
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#7D736A] dark:text-[#8E9CA8]">₹</span>
                  <input
                    type="number"
                    step="10"
                    value={formData.silverPerKg}
                    onChange={(e) => handleSilverPerKgChange(e.target.value)}
                    className="w-full pl-6 pr-2.5 py-1.5 text-xs font-mono font-bold rounded-lg border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#1E2730] text-[#3D3732] dark:text-[#FAF7F2] focus:ring-2 focus:ring-[#C5A059]"
                    required
                  />
                </div>
              </div>

              {/* Silver / Gram */}
              <div>
                <label className="block text-[11px] font-semibold text-[#3D3732] dark:text-[#FAF7F2] mb-1">
                  Silver (₹ / 1 Gram)
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#7D736A] dark:text-[#8E9CA8]">₹</span>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.silverPerGram}
                    onChange={(e) => handleSilverPerGramChange(e.target.value)}
                    className="w-full pl-6 pr-2.5 py-1.5 text-xs font-mono font-bold rounded-lg border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#1E2730] text-[#3D3732] dark:text-[#FAF7F2] focus:ring-2 focus:ring-[#C5A059]"
                    required
                  />
                </div>
              </div>

              {/* Platinum */}
              <div>
                <label className="block text-[11px] font-semibold text-[#3D3732] dark:text-[#FAF7F2] mb-1">
                  Platinum (₹ / 1 Gram)
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#7D736A] dark:text-[#8E9CA8]">₹</span>
                  <input
                    type="number"
                    step="1"
                    value={formData.platinumPerGram}
                    onChange={(e) => handleChange('platinumPerGram', parseFloat(e.target.value) || 0)}
                    className="w-full pl-6 pr-2.5 py-1.5 text-xs font-mono font-bold rounded-lg border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#1E2730] text-[#3D3732] dark:text-[#FAF7F2] focus:ring-2 focus:ring-[#C5A059]"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Daily Variations (±) */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#141C24] border border-[#EBE5DE] dark:border-[#26313B] space-y-2">
            <span className="text-xs font-bold text-[#7D736A] dark:text-[#8E9CA8] uppercase tracking-wider block">
              Daily Change Indicators (₹ Change vs Yesterday)
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-[#7D736A] dark:text-[#8E9CA8] mb-0.5">24K Change</label>
                <input
                  type="number"
                  value={formData.gold24kChange}
                  onChange={(e) => handleChange('gold24kChange', parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 text-xs font-mono rounded border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#1E2730]"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#7D736A] dark:text-[#8E9CA8] mb-0.5">22K Change</label>
                <input
                  type="number"
                  value={formData.gold22kChange}
                  onChange={(e) => handleChange('gold22kChange', parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 text-xs font-mono rounded border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#1E2730]"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#7D736A] dark:text-[#8E9CA8] mb-0.5">18K Change</label>
                <input
                  type="number"
                  value={formData.gold18kChange}
                  onChange={(e) => handleChange('gold18kChange', parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 text-xs font-mono rounded border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#1E2730]"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditRatesModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] hover:bg-[#FAF8F5] dark:hover:bg-[#202933] text-xs font-semibold text-[#7D736A] dark:text-[#8E9CA8] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#C5A059] hover:bg-[#B38F48] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Saved Successfully!</span>
                </>
              ) : (
                <span>Save & Apply Live Rates</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
