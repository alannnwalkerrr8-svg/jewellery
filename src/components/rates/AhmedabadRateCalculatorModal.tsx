import React, { useState } from 'react';
import {
  X,
  TrendingDown,
  TrendingUp,
  Calculator,
  Calendar,
  MapPin,
  Sparkles,
  MessageCircle,
  Share2,
  Check,
  RefreshCw,
} from 'lucide-react';
import { useJewelry } from '../../context/JewelryContext';

export const AhmedabadRateCalculatorModal: React.FC = () => {
  const {
    isRateCalculatorOpen,
    setIsRateCalculatorOpen,
    liveRates,
    shopDetails,
    t,
    language,
  } = useJewelry();

  const [activeMetal, setActiveMetal] = useState<'gold' | 'silver' | 'platinum'>('gold');
  const [selectedPurity, setSelectedPurity] = useState<'24K' | '22K' | '18K'>('22K');
  const [weight, setWeight] = useState<number>(10);
  const [makingPercent, setMakingPercent] = useState<number>(12);
  const [includeGst, setIncludeGst] = useState<boolean>(true);
  
  // Budget reverse calculator state
  const [budgetAmount, setBudgetAmount] = useState<number>(10000);
  const [calculatedGrams, setCalculatedGrams] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isRateCalculatorOpen) return null;

  // Rate calculation logic
  let ratePerGram = liveRates.gold22k;
  if (activeMetal === 'gold') {
    if (selectedPurity === '24K') ratePerGram = liveRates.gold24k;
    else if (selectedPurity === '22K') ratePerGram = liveRates.gold22k;
    else if (selectedPurity === '18K') ratePerGram = liveRates.gold18k;
  } else if (activeMetal === 'silver') {
    ratePerGram = liveRates.silverPerGram;
  } else if (activeMetal === 'platinum') {
    ratePerGram = liveRates.platinumPerGram;
  }

  const baseValue = Math.round((weight || 0) * ratePerGram);
  const makingCharges = Math.round((baseValue * (makingPercent || 0)) / 100);
  const gstCharges = includeGst ? Math.round(((baseValue + makingCharges) * 3) / 100) : 0;
  const totalAmount = baseValue + makingCharges + gstCharges;

  // Reverse budget calculator handler
  const handleCalculateBudget = () => {
    if (!budgetAmount || budgetAmount <= 0) {
      setCalculatedGrams(0);
      return;
    }
    // Budget divided by (ratePerGram * (1 + makingPercent/100) * (1 + 0.03))
    const multiplier = (1 + (makingPercent || 12) / 100) * (includeGst ? 1.03 : 1);
    const effectiveCostPerGram = ratePerGram * multiplier;
    const grams = budgetAmount / effectiveCostPerGram;
    setCalculatedGrams(Number(grams.toFixed(3)));
  };

  // WhatsApp rate quote share
  const handleWhatsAppQuote = () => {
    const quoteText = `Hello *Shree Hari Jewellers*, I calculated a rate quotation for Ahmedabad:\n\n` +
      `📍 *Ahmedabad Market Rate (${liveRates.date})*\n` +
      `• Metal: ${activeMetal.toUpperCase()} (${activeMetal === 'gold' ? selectedPurity : 'Fine'})\n` +
      `• Live Rate: ₹${ratePerGram.toLocaleString('en-IN')}/gm\n` +
      `• Weight: ${weight} gm\n` +
      `• Base Value: ₹${baseValue.toLocaleString('en-IN')}\n` +
      `• Making Charges (${makingPercent}%): ₹${makingCharges.toLocaleString('en-IN')}\n` +
      `• GST (3%): ₹${gstCharges.toLocaleString('en-IN')}\n` +
      `• *Total Estimated Amount: ₹${totalAmount.toLocaleString('en-IN')}*\n\n` +
      `Please let me know about current jewelry designs matching this weight!`;

    window.open(`https://wa.me/${shopDetails.whatsapp}?text=${encodeURIComponent(quoteText)}`, '_blank');
  };

  const handleShare = () => {
    const text = `Live Gold & Silver Rates in Ahmedabad (${liveRates.date}):\n` +
      `• 24K Gold: ₹${liveRates.gold24k.toLocaleString('en-IN')}/g\n` +
      `• 22K Gold: ₹${liveRates.gold22k.toLocaleString('en-IN')}/g\n` +
      `• 18K Gold: ₹${liveRates.gold18k.toLocaleString('en-IN')}/g\n` +
      `• Silver: ₹${liveRates.silverPerKg.toLocaleString('en-IN')}/kg\n` +
      `📍 ${shopDetails.name} (Vishal Patadia), Santej Chokdi, Ahmedabad\n${shopDetails.googleMapsUrl}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FFFFFF] dark:bg-[#181E24] border border-[#D9D1C7] dark:border-[#2C3843] rounded-2xl max-w-lg w-full shadow-2xl text-[#3D3732] dark:text-[#E8EDF2] my-auto overflow-hidden transition-colors">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#EBE5DE] dark:border-[#26313B] bg-[#FAF8F5] dark:bg-[#13191F] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059]/15 dark:bg-[#E5C378]/15 flex items-center justify-center text-[#A67C2E] dark:text-[#E5C378]">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif italic font-bold text-sm sm:text-base text-[#3D3732] dark:text-[#FAF7F2]">
                {t.liveRates.calculator}
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-[#7D736A] dark:text-[#8E9CA8]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {liveRates.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#A67C2E] dark:text-[#E5C378] font-medium">
                  <MapPin className="w-3 h-3" />
                  {liveRates.city}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-[#7D736A] dark:text-[#8E9CA8] hover:bg-white dark:hover:bg-[#202933] transition-colors cursor-pointer"
              title="Share rates"
            >
              {copied ? <Check className="w-4 h-4 text-[#5E8357]" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsRateCalculatorOpen(false)}
              className="p-2 rounded-lg text-[#7D736A] dark:text-[#8E9CA8] hover:bg-white dark:hover:bg-[#202933] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Metal Tabs (Gold, Silver, Platinum) */}
          <div className="grid grid-cols-3 gap-2 bg-[#FAF8F5] dark:bg-[#13191F] p-1 rounded-xl border border-[#EBE5DE] dark:border-[#26313B]">
            <button
              onClick={() => setActiveMetal('gold')}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeMetal === 'gold'
                  ? 'bg-[#10B981] text-white shadow-xs dark:bg-[#10B981]'
                  : 'text-[#635B53] dark:text-[#8E9CA8] hover:text-[#3D3732] dark:hover:text-white'
              }`}
            >
              Gold
            </button>
            <button
              onClick={() => setActiveMetal('silver')}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeMetal === 'silver'
                  ? 'bg-[#10B981] text-white shadow-xs dark:bg-[#10B981]'
                  : 'text-[#635B53] dark:text-[#8E9CA8] hover:text-[#3D3732] dark:hover:text-white'
              }`}
            >
              Silver
            </button>
            <button
              onClick={() => setActiveMetal('platinum')}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeMetal === 'platinum'
                  ? 'bg-[#10B981] text-white shadow-xs dark:bg-[#10B981]'
                  : 'text-[#635B53] dark:text-[#8E9CA8] hover:text-[#3D3732] dark:hover:text-white'
              }`}
            >
              Platinum
            </button>
          </div>

          {/* Rate Cards (Matching Screenshot) */}
          {activeMetal === 'gold' && (
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {/* 24K */}
              <div
                onClick={() => setSelectedPurity('24K')}
                className={`p-3 rounded-xl border transition-all cursor-pointer text-center ${
                  selectedPurity === '24K'
                    ? 'bg-[#FAF8F5] dark:bg-[#1D2731] border-[#10B981] ring-2 ring-[#10B981]/20'
                    : 'bg-[#FAF8F5]/60 dark:bg-[#151D24] border-[#EBE5DE] dark:border-[#26313B]'
                }`}
              >
                <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] block font-medium">
                  24K Gold /g
                </span>
                <span className="text-sm sm:text-base font-bold text-[#3D3732] dark:text-[#FAF7F2] font-mono block mt-0.5">
                  ₹{liveRates.gold24k.toLocaleString('en-IN')}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#EF4444] mt-1 bg-[#EF4444]/10 px-1.5 py-0.2 rounded">
                  {liveRates.gold24kChange} ▼
                </span>
              </div>

              {/* 22K (Highlight) */}
              <div
                onClick={() => setSelectedPurity('22K')}
                className={`p-3 rounded-xl border transition-all cursor-pointer text-center ${
                  selectedPurity === '22K'
                    ? 'bg-[#FAF8F5] dark:bg-[#1D2731] border-[#10B981] ring-2 ring-[#10B981]/20'
                    : 'bg-[#FAF8F5]/60 dark:bg-[#151D24] border-[#EBE5DE] dark:border-[#26313B]'
                }`}
              >
                <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] block font-medium">
                  22K Gold /g
                </span>
                <span className="text-sm sm:text-base font-bold text-[#3D3732] dark:text-[#FAF7F2] font-mono block mt-0.5">
                  ₹{liveRates.gold22k.toLocaleString('en-IN')}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#EF4444] mt-1 bg-[#EF4444]/10 px-1.5 py-0.2 rounded">
                  {liveRates.gold22kChange} ▼
                </span>
              </div>

              {/* 18K */}
              <div
                onClick={() => setSelectedPurity('18K')}
                className={`p-3 rounded-xl border transition-all cursor-pointer text-center ${
                  selectedPurity === '18K'
                    ? 'bg-[#FAF8F5] dark:bg-[#1D2731] border-[#10B981] ring-2 ring-[#10B981]/20'
                    : 'bg-[#FAF8F5]/60 dark:bg-[#151D24] border-[#EBE5DE] dark:border-[#26313B]'
                }`}
              >
                <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] block font-medium">
                  18K Gold /g
                </span>
                <span className="text-sm sm:text-base font-bold text-[#3D3732] dark:text-[#FAF7F2] font-mono block mt-0.5">
                  ₹{liveRates.gold18k.toLocaleString('en-IN')}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#EF4444] mt-1 bg-[#EF4444]/10 px-1.5 py-0.2 rounded">
                  {liveRates.gold18kChange} ▼
                </span>
              </div>
            </div>
          )}

          {activeMetal === 'silver' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1D2731] border border-[#10B981] text-center">
                <span className="text-[11px] text-[#7D736A] dark:text-[#8E9CA8] block">Silver / Gram</span>
                <span className="text-lg font-bold text-[#3D3732] dark:text-[#FAF7F2] font-mono">
                  ₹{liveRates.silverPerGram.toLocaleString('en-IN')} /g
                </span>
                <span className="text-[10px] text-[#EF4444] block mt-0.5">-1.20 ▼</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1D2731] border border-[#10B981] text-center">
                <span className="text-[11px] text-[#7D736A] dark:text-[#8E9CA8] block">Silver / 1 Kg Bar</span>
                <span className="text-lg font-bold text-[#3D3732] dark:text-[#FAF7F2] font-mono">
                  ₹{liveRates.silverPerKg.toLocaleString('en-IN')} /kg
                </span>
                <span className="text-[10px] text-[#EF4444] block mt-0.5">{liveRates.silverChange} ▼</span>
              </div>
            </div>
          )}

          {activeMetal === 'platinum' && (
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1D2731] border border-[#10B981] text-center">
              <span className="text-[11px] text-[#7D736A] dark:text-[#8E9CA8] block">Platinum 950 / Gram</span>
              <span className="text-lg font-bold text-[#3D3732] dark:text-[#FAF7F2] font-mono">
                ₹{liveRates.platinumPerGram.toLocaleString('en-IN')} /g
              </span>
              <span className="text-[10px] text-[#10B981] block mt-0.5">+{liveRates.platinumChange} ▲</span>
            </div>
          )}

          {/* Calculator Card Container */}
          <div className="bg-[#FAF8F5] dark:bg-[#141C24] p-4 rounded-xl border border-[#EBE5DE] dark:border-[#26313B] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3D3732] dark:text-[#FAF7F2] uppercase tracking-wider">
                Calculator
              </span>
              <span className="text-[11px] text-[#7D736A] dark:text-[#8E9CA8]">
                Rate: <strong className="text-[#10B981]">₹{ratePerGram.toLocaleString('en-IN')}/g</strong>
              </span>
            </div>

            {/* Purity Pills if Gold */}
            {activeMetal === 'gold' && (
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#7D736A] dark:text-[#8E9CA8] block">Purity</label>
                <div className="flex gap-2">
                  {(['24K', '22K', '18K'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPurity(p)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedPurity === p
                          ? 'bg-[#10B981] text-white'
                          : 'bg-white dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] text-[#635B53] dark:text-[#8E9CA8]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Row: Weight, Making %, GST */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] block mb-1">
                  Weight (gm)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] text-xs font-bold text-[#3D3732] dark:text-white font-mono focus:outline-hidden focus:border-[#10B981]"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] block mb-1">
                  Making (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={makingPercent}
                  onChange={(e) => setMakingPercent(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] text-xs font-bold text-[#3D3732] dark:text-white font-mono focus:outline-hidden focus:border-[#10B981]"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] block mb-1">
                  GST
                </label>
                <select
                  value={includeGst ? '3' : '0'}
                  onChange={(e) => setIncludeGst(e.target.value === '3')}
                  className="w-full px-2 py-1.5 rounded-lg bg-white dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] text-xs font-semibold text-[#3D3732] dark:text-white focus:outline-hidden focus:border-[#10B981] cursor-pointer"
                >
                  <option value="3">Incl. 3%</option>
                  <option value="0">Excl. GST</option>
                </select>
              </div>
            </div>

            {/* Breakdown Result */}
            <div className="space-y-2 pt-2 border-t border-[#EBE5DE] dark:border-[#26313B] text-xs">
              <div className="flex justify-between text-[#635B53] dark:text-[#8E9CA8]">
                <span>Base value</span>
                <span className="font-mono font-medium text-[#3D3732] dark:text-[#FAF7F2]">
                  ₹{baseValue.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#635B53] dark:text-[#8E9CA8]">
                <span>Making charges ({makingPercent}%)</span>
                <span className="font-mono font-medium text-[#3D3732] dark:text-[#FAF7F2]">
                  ₹{makingCharges.toLocaleString('en-IN')}
                </span>
              </div>
              {includeGst && (
                <div className="flex justify-between text-[#635B53] dark:text-[#8E9CA8]">
                  <span>GST (3%)</span>
                  <span className="font-mono font-medium text-[#3D3732] dark:text-[#FAF7F2]">
                    ₹{gstCharges.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {/* Total Amount Box (Featured in Green/Gold) */}
              <div className="p-3 rounded-xl bg-white dark:bg-[#19242E] border border-[#10B981]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#3D3732] dark:text-white block">
                    Total Amount
                  </span>
                  <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8]">
                    {includeGst ? 'Incl. all charges' : 'Excluding GST'}
                  </span>
                </div>
                <span className="text-lg sm:text-xl font-mono font-extrabold text-[#10B981]">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* "Know your money's worth!" Section (From User Screenshot) */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#141C24] border border-[#EBE5DE] dark:border-[#26313B]">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              <h4 className="text-xs font-bold text-[#3D3732] dark:text-[#FAF7F2]">
                Know your money&apos;s worth!
              </h4>
            </div>
            <p className="text-[11px] text-[#7D736A] dark:text-[#8E9CA8] mb-2.5">
              Enter any amount to see how much gold you can get in Ahmedabad:
            </p>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#7D736A] dark:text-[#8E9CA8]">
                  ₹
                </span>
                <input
                  type="number"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(parseFloat(e.target.value) || 0)}
                  placeholder="10000"
                  className="w-full pl-6 pr-2.5 py-1.5 rounded-lg bg-white dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] text-xs font-bold font-mono text-[#3D3732] dark:text-white focus:outline-hidden focus:border-[#10B981]"
                />
              </div>

              <button
                onClick={handleCalculateBudget}
                className="px-3.5 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Try now
              </button>
            </div>

            {calculatedGrams !== null && (
              <div className="mt-2.5 p-2 rounded-lg bg-[#10B981]/10 border border-[#10B981]/30 text-xs text-center">
                <span className="text-[#635B53] dark:text-[#D4CCC2]">For ₹{budgetAmount.toLocaleString('en-IN')}, you get approx: </span>
                <strong className="text-[#10B981] font-mono text-sm ml-1">
                  {calculatedGrams} grams
                </strong>
                <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] block mt-0.5">
                  (Based on {activeMetal === 'gold' ? selectedPurity : activeMetal} rate in Ahmedabad)
                </span>
              </div>
            )}
          </div>

          {/* Showroom & Inquiry Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleWhatsAppQuote}
              className="w-full py-2.5 px-4 rounded-xl bg-[#5E8357] hover:bg-[#4E7047] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire This Quotation on WhatsApp</span>
            </button>

            <a
              href={shopDetails.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] hover:bg-[#FAF8F5] dark:hover:bg-[#25323E] text-[#3D3732] dark:text-[#FAF7F2] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#C5A059] dark:text-[#E5C378]" />
              <span>Visit Showroom: Santej Chokdi, Ahmedabad (Owner: {shopDetails.ownerName})</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
