import React, { useState } from 'react';
import {
  X,
  Settings,
  Coins,
  Store,
  DollarSign,
  Save,
  RotateCcw,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { MetalRates, StoreSettings } from '../../types';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { storeSettings, updateStoreSettings, metalRates, updateMetalRates, resetToDefaultData } =
    useStore();

  const [name, setName] = useState(storeSettings.storeName);
  const [address, setAddress] = useState(storeSettings.address);
  const [phone, setPhone] = useState(storeSettings.phone);
  const [email, setEmail] = useState(storeSettings.email);
  const [taxNumber, setTaxNumber] = useState(storeSettings.taxNumber);
  const [taxRate, setTaxRate] = useState(storeSettings.taxRate.toString());
  const [currency, setCurrency] = useState(storeSettings.currency);
  const [currencySymbol, setCurrencySymbol] = useState(storeSettings.currencySymbol);
  const [warrantyMonths, setWarrantyMonths] = useState(storeSettings.defaultWarrantyMonths.toString());

  // Metal Rates
  const [gold24k, setGold24k] = useState(metalRates.gold24k.toString());
  const [gold22k, setGold22k] = useState(metalRates.gold22k.toString());
  const [gold18k, setGold18k] = useState(metalRates.gold18k.toString());
  const [gold14k, setGold14k] = useState(metalRates.gold14k.toString());
  const [platinum950, setPlatinum950] = useState(metalRates.platinum950.toString());
  const [silver925, setSilver925] = useState(metalRates.silver925.toString());

  const [activeTab, setActiveTab] = useState<'store' | 'metals' | 'system'>('store');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateStoreSettings({
      storeName: name,
      address,
      phone,
      email,
      taxNumber,
      taxRate: parseFloat(taxRate) || 8.5,
      currency,
      currencySymbol,
      defaultWarrantyMonths: parseInt(warrantyMonths, 10) || 24,
    });

    updateMetalRates({
      gold24k: parseFloat(gold24k) || 78.5,
      gold22k: parseFloat(gold22k) || 72.2,
      gold18k: parseFloat(gold18k) || 59.8,
      gold14k: parseFloat(gold14k) || 46.5,
      platinum950: parseFloat(platinum950) || 34.2,
      silver925: parseFloat(silver925) || 0.95,
      lastUpdated: new Date().toISOString(),
    });

    onClose();
  };

  const handleResetData = () => {
    if (confirm('Reset application to original luxury boutique sample data? All local edits will be refreshed.')) {
      resetToDefaultData();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#3D3732]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl max-w-2xl w-full shadow-2xl text-[#3D3732] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#EBE5DE] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#C5A059] border border-[#D9D1C7]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic text-lg font-bold text-[#4A433F]">
                Boutique Configuration & Metal Spot Rates
              </h3>
              <p className="text-xs text-[#7D736A]">
                Manage tax settings, official invoice headers, and live bullion spot benchmarks.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7D736A] hover:text-[#3D3732] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#EBE5DE] bg-[#FAF8F5] px-5 gap-2">
          {[
            { id: 'store', label: 'Boutique Profile & Tax' },
            { id: 'metals', label: 'Precious Metal Rates ($/g)' },
            { id: 'system', label: 'System & Reset' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 text-xs font-medium border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#C5A059] text-[#A67C2E] font-bold'
                  : 'border-transparent text-[#7D736A] hover:text-[#3D3732]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
          {activeTab === 'store' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">Maison / Store Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-serif italic text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">Tax Registration # (GSTIN / VAT)</label>
                  <input
                    type="text"
                    value={taxNumber}
                    onChange={(e) => setTaxNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#4A433F] font-medium mb-1">Store Address (Appears on Invoices)</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">Concierge Telephone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">Concierge Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#EBE5DE]">
                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">Sales Tax Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">Currency Symbol</label>
                  <input
                    type="text"
                    value={currencySymbol}
                    onChange={(e) => setCurrencySymbol(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">Warranty Months</label>
                  <input
                    type="number"
                    value={warrantyMonths}
                    onChange={(e) => setWarrantyMonths(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'metals' && (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#FAF8F5] border border-[#C5A059]/30 rounded-xl text-[#A67C2E]">
                Precious metal rates are used for real-time inventory valuation, trade-in scrap calculations, and dynamic casting pricing.
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">24K Gold ($/gram)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={gold24k}
                    onChange={(e) => setGold24k(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#A67C2E] font-mono font-bold focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">22K Gold ($/gram)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={gold22k}
                    onChange={(e) => setGold22k(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#A67C2E] font-mono font-bold focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">18K Gold ($/gram)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={gold18k}
                    onChange={(e) => setGold18k(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#A67C2E] font-mono font-bold focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">14K Gold ($/gram)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={gold14k}
                    onChange={(e) => setGold14k(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">Pt950 Platinum ($/gram)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={platinum950}
                    onChange={(e) => setPlatinum950(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#2B6CB0] font-mono font-bold focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A433F] font-medium mb-1">925 Sterling Silver ($/gram)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={silver925}
                    onChange={(e) => setSilver925(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl space-y-2">
                <span className="text-sm font-semibold text-[#4A433F] block font-serif italic">Local Data Persistence</span>
                <p className="text-[#7D736A]">
                  All inventory items, sales records, custom orders, and VIP customers are persisted in your browser's secure local storage engine.
                </p>
              </div>

              <div className="p-4 bg-[#FDE8E8] border border-[#F8C8C8] rounded-xl space-y-3">
                <span className="text-sm font-semibold text-[#9B2C2C] block">Reset Demonstration Data</span>
                <p className="text-[#7D736A]">
                  Re-populates the database with initial catalog, sample bespoke orders, customers, and transactions.
                </p>
                <button
                  type="button"
                  onClick={handleResetData}
                  className="px-4 py-2 bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#9B2C2C] border border-[#F8C8C8] rounded-xl flex items-center gap-1.5 font-bold cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Demo State</span>
                </button>
              </div>
            </div>
          )}

          {/* Footer Save */}
          <div className="pt-4 border-t border-[#EBE5DE] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EEE9] text-[#635B53] text-xs font-medium cursor-pointer border border-[#D9D1C7]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
