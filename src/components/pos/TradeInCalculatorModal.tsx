import React, { useState } from 'react';
import { X, Coins, Calculator, Check, ArrowRight } from 'lucide-react';
import { MetalPurity, MetalType, TradeInGold } from '../../types';
import { useStore } from '../../context/StoreContext';

interface TradeInCalculatorModalProps {
  onClose: () => void;
  onApplyTradeIn: (tradeIn: TradeInGold) => void;
  initialData?: TradeInGold;
}

export const TradeInCalculatorModal: React.FC<TradeInCalculatorModalProps> = ({
  onClose,
  onApplyTradeIn,
  initialData,
}) => {
  const { metalRates, storeSettings } = useStore();

  const [metalType, setMetalType] = useState<MetalType>(initialData?.metalType || 'Yellow Gold');
  const [purity, setPurity] = useState<MetalPurity>(initialData?.purity || '18K (75.0%)');
  const [grossWeight, setGrossWeight] = useState<string>(initialData?.grossWeightGrams?.toString() || '15.5');
  const [meltPercentage, setMeltPercentage] = useState<string>(initialData?.meltPercentage?.toString() || '92'); // standard assay melt recovery
  const [notes, setNotes] = useState<string>(initialData?.notes || 'Customer old gold exchange towards new purchase');

  // Compute spot rate based on purity
  const getSpotRate = (purityVal: MetalPurity): number => {
    if (purityVal.includes('24K')) return metalRates.gold24k;
    if (purityVal.includes('22K')) return metalRates.gold22k;
    if (purityVal.includes('18K')) return metalRates.gold18k;
    if (purityVal.includes('14K')) return metalRates.gold14k;
    if (purityVal.includes('10K')) return Number((metalRates.gold24k * 0.417).toFixed(2));
    if (purityVal.includes('Pt950') || purityVal.includes('Pt900')) return metalRates.platinum950;
    if (purityVal.includes('925') || purityVal.includes('Silver')) return metalRates.silver925;
    return metalRates.gold18k;
  };

  const currentRate = getSpotRate(purity);
  const weight = parseFloat(grossWeight) || 0;
  const meltFactor = (parseFloat(meltPercentage) || 92) / 100;
  const rawValue = weight * currentRate;
  const netTradeInValue = Number((rawValue * meltFactor).toFixed(2));

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyTradeIn({
      metalType,
      purity,
      grossWeightGrams: weight,
      meltPercentage: parseFloat(meltPercentage) || 92,
      spotRatePerGram: currentRate,
      calculatedValue: netTradeInValue,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#3D3732]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl max-w-md w-full shadow-2xl text-[#3D3732] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#EBE5DE] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#C5A059] border border-[#C5A059]/40">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic text-base font-bold text-[#4A433F]">
                Old Gold / Scrap Trade-In Exchange
              </h3>
              <p className="text-xs text-[#7D736A]">
                Directly deduct scrap jewelry exchange value from the sales total.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#7D736A] hover:text-[#3D3732] hover:bg-[#FAF8F5] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleApply} className="p-5 space-y-4">
          <div className="p-3.5 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl flex items-center justify-between">
            <span className="text-xs text-[#A67C2E]">Live Spot Rate for {purity}:</span>
            <span className="text-sm font-bold font-mono text-[#A67C2E]">
              ${currentRate.toFixed(2)} / gram
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Metal Purity
              </label>
              <select
                value={purity}
                onChange={(e) => setPurity(e.target.value as MetalPurity)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#A67C2E] font-semibold focus:outline-none focus:border-[#C5A059]"
              >
                <option value="24K (99.9%)">24K (99.9%) Fine Gold</option>
                <option value="22K (91.6%)">22K (91.6%) Crown Gold</option>
                <option value="18K (75.0%)">18K (75.0%) Fine Jewelry</option>
                <option value="14K (58.5%)">14K (58.5%) Commercial</option>
                <option value="10K (41.7%)">10K (41.7%) Low Gold</option>
                <option value="Pt950 (95.0%)">Platinum Pt950</option>
                <option value="Ag925 (92.5%)">Sterling Silver Ag925</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Gross Weight (Grams)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.1"
                required
                value={grossWeight}
                onChange={(e) => setGrossWeight(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Melt Recovery (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={meltPercentage}
                onChange={(e) => setMeltPercentage(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono focus:outline-none focus:border-[#C5A059]"
              />
              <span className="text-[10px] text-[#7D736A]">Standard assay recovery 90-95%</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Metal Color / Type
              </label>
              <select
                value={metalType}
                onChange={(e) => setMetalType(e.target.value as MetalType)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
              >
                <option value="Yellow Gold">Yellow Gold</option>
                <option value="White Gold">White Gold</option>
                <option value="Rose Gold">Rose Gold</option>
                <option value="Platinum">Platinum</option>
                <option value="Sterling Silver">Sterling Silver</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#4A433F] mb-1">
              Description / Scrap Item Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Broken 18k curb link bracelet, assayed on ultrasonic density scale"
              className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          {/* Result Calculation Preview */}
          <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl space-y-2">
            <div className="flex justify-between text-xs text-[#7D736A]">
              <span>Gross Metal Value:</span>
              <span className="font-mono text-[#3D3732]">${rawValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-[#7D736A]">
              <span>Melt Refining Deduction ({100 - (parseFloat(meltPercentage) || 92)}%):</span>
              <span className="font-mono text-[#9E4A40]">-${(rawValue - netTradeInValue).toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-[#EBE5DE] flex items-center justify-between">
              <span className="text-xs font-bold text-[#A67C2E] font-serif italic">
                Customer Trade-In Credit:
              </span>
              <span className="font-serif italic text-xl font-bold text-[#5E8357] font-mono">
                {storeSettings.currencySymbol}{netTradeInValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#EBE5DE] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EBE5DE] text-[#635B53] text-xs font-medium cursor-pointer transition-colors border border-[#D9D1C7]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Apply Trade-In Credit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
