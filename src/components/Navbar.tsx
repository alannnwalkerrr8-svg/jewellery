import React, { useState } from 'react';
import {
  Gem,
  Package,
  ShoppingCart,
  Sparkles,
  Users,
  FileText,
  Calculator,
  Settings,
  Search,
  Plus,
  Coins,
  TrendingUp,
  LayoutDashboard,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNewItem: () => void;
  onOpenNewOrder: () => void;
  onOpenCalculator: () => void;
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewItem,
  onOpenNewOrder,
  onOpenCalculator,
  onOpenAI,
}) => {
  const {
    inventory,
    customOrders,
    cart,
    metalRates,
    storeSettings,
    globalSearch,
    setGlobalSearch,
  } = useStore();

  const [showMetalRatesEdit, setShowMetalRatesEdit] = useState(false);
  const { updateMetalRates } = useStore();

  const [gold24kInput, setGold24kInput] = useState(metalRates.gold24k.toString());
  const [gold18kInput, setGold18kInput] = useState(metalRates.gold18k.toString());
  const [platInput, setPlatInput] = useState(metalRates.platinum950.toString());
  const [silverInput, setSilverInput] = useState(metalRates.silver925.toString());

  const activeOrdersCount = customOrders.filter(
    (o) => o.status !== 'Completed' && o.status !== 'Cancelled'
  ).length;

  const lowStockCount = inventory.filter(
    (i) => i.stock.quantity <= i.stock.lowStockThreshold
  ).length;

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    const g24 = parseFloat(gold24kInput) || metalRates.gold24k;
    const g18 = parseFloat(gold18kInput) || (g24 * 0.75);
    const g22 = Number((g24 * 0.916).toFixed(2));
    const g14 = Number((g24 * 0.585).toFixed(2));
    const pt = parseFloat(platInput) || metalRates.platinum950;
    const ag = parseFloat(silverInput) || metalRates.silver925;

    updateMetalRates({
      gold24k: g24,
      gold22k: g22,
      gold18k: g18,
      gold14k: g14,
      platinum950: pt,
      silver925: ag,
    });
    setShowMetalRatesEdit(false);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'inventory',
      label: 'Inventory Master',
      icon: Package,
      badge: lowStockCount > 0 ? `${lowStockCount} low` : `${inventory.length}`,
      badgeColor: lowStockCount > 0 ? 'bg-[#FDE8E8] text-[#9B2C2C] border-[#F8C8C8]' : 'bg-[#F2EEE9] text-[#7D736A] border-[#D9D1C7]',
    },
    {
      id: 'pos',
      label: 'Sales Counter / POS',
      icon: ShoppingCart,
      badge: cart.length > 0 ? `${cart.length}` : undefined,
      badgeColor: 'bg-[#C5A059] text-white font-bold',
    },
    {
      id: 'custom-orders',
      label: 'Bespoke Atelier',
      icon: Sparkles,
      badge: activeOrdersCount > 0 ? `${activeOrdersCount} active` : undefined,
      badgeColor: 'bg-[#E1F2E1] text-[#2D5A27] border-[#C8E4C8]',
    },
    { id: 'customers', label: 'Customers CRM', icon: Users },
    { id: 'invoices', label: 'Invoices & Certs', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#EBE5DE]/95 backdrop-blur-md border-b border-[#D9D1C7] text-[#3D3732] shadow-sm">
      {/* Top Bar: Precious Metal Live Tickers & Store Brand */}
      <div className="border-b border-[#D9D1C7] bg-[#FAF8F5] px-4 py-1.5 text-xs text-[#7D736A]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Metal Ticker */}
          <div className="flex items-center gap-4 overflow-x-auto py-0.5 no-scrollbar">
            <div className="flex items-center gap-1.5 font-medium text-[#C5A059] shrink-0">
              <Coins className="w-3.5 h-3.5" />
              <span className="font-semibold tracking-wider text-[10px] uppercase text-[#9C8D80]">LIVE METAL RATES:</span>
            </div>

            <div className="flex items-center gap-3 text-[#3D3732] shrink-0">
              <div className="flex items-center gap-1">
                <span className="text-[#9C8D80]">Au 24K:</span>
                <span className="font-semibold text-[#4A433F]">
                  {storeSettings.currencySymbol}{metalRates.gold24k.toFixed(2)}/g
                </span>
                <TrendingUp className="w-3 h-3 text-[#2D5A27] inline" />
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[#9C8D80]">Au 18K:</span>
                <span className="font-semibold text-[#4A433F]">
                  {storeSettings.currencySymbol}{metalRates.gold18k.toFixed(2)}/g
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[#9C8D80]">Pt 950:</span>
                <span className="font-semibold text-[#4A433F]">
                  {storeSettings.currencySymbol}{metalRates.platinum950.toFixed(2)}/g
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[#9C8D80]">Ag 925:</span>
                <span className="font-semibold text-[#4A433F]">
                  {storeSettings.currencySymbol}{metalRates.silver925.toFixed(2)}/g
                </span>
              </div>

              <button
                id="btn-edit-metal-rates"
                onClick={() => setShowMetalRatesEdit(true)}
                className="text-[11px] underline text-[#C5A059] hover:text-[#B38E46] transition-colors ml-1 cursor-pointer font-medium"
              >
                Update Rates
              </button>
            </div>
          </div>

          {/* Quick AI & Pricing Tools */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="btn-open-metal-calc"
              onClick={onOpenCalculator}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F2EEE9] hover:bg-[#EBE5DE] text-[#635B53] text-xs border border-[#D9D1C7] transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Gold & Melt Calculator</span>
            </button>

            <button
              id="btn-open-ai-assistant"
              onClick={onOpenAI}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#C5A059]/10 hover:bg-[#C5A059]/20 text-[#A67C2E] text-xs border border-[#C5A059]/40 transition-colors cursor-pointer font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Gemini AI Assistant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <div className="flex items-center justify-between">
            <div
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#C5A059] flex items-center justify-center shadow-sm text-white">
                <Gem className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif italic text-xl font-bold text-[#4A433F] tracking-tight group-hover:text-[#635B53] transition-colors">
                    {storeSettings.storeName.split(' ')[0] || 'LUMIÈRE'}
                  </span>
                  <span className="text-[10px] tracking-widest px-1.5 py-0.5 rounded bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#A67C2E] uppercase font-semibold">
                    Atelier Suite
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-[#9C8D80] font-medium">
                  Jewelry Management & Invoicing System
                </p>
              </div>
            </div>

            {/* Quick Actions (Mobile) */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setActiveTab('pos')}
                className="relative p-2 rounded-lg bg-[#C5A059] text-white"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9B2C2C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C8D80]" />
            <input
              id="input-global-search"
              type="text"
              placeholder="Search jewelry SKU, diamonds, customer name, phone, invoice..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-[#FFFFFF] border border-[#D9D1C7] text-[#3D3732] placeholder-[#9C8D80] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30 transition-all shadow-2xs"
            />
            {globalSearch && (
              <button
                onClick={() => setGlobalSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9C8D80] hover:text-[#3D3732] text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Create Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              id="btn-quick-new-item"
              onClick={onOpenNewItem}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F2EEE9] hover:bg-[#EBE5DE] text-[#635B53] text-xs font-medium border border-[#D9D1C7] transition-all cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Add Jewelry</span>
            </button>

            <button
              id="btn-quick-new-order"
              onClick={onOpenNewOrder}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F2EEE9] hover:bg-[#EBE5DE] text-[#635B53] text-xs font-medium border border-[#D9D1C7] transition-all cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Bespoke Order</span>
            </button>

            <button
              id="btn-quick-pos-counter"
              onClick={() => setActiveTab('pos')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>POS Sales</span>
              {cart.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-white text-[#C5A059] text-[10px] font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-3.5 flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar border-t border-[#D9D1C7] pt-2.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F9F7F2] text-[#4A433F] font-semibold border border-[#D9D1C7] shadow-xs'
                    : 'text-[#7D736A] hover:text-[#3D3732] hover:bg-[#F2EEE9]'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#C5A059]' : 'border border-[#7D736A]'}`} />
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A059]' : 'text-[#7D736A]'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Metal Rates Quick Edit Modal */}
      {showMetalRatesEdit && (
        <div className="fixed inset-0 z-50 bg-[#3D3732]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl p-6 max-w-md w-full shadow-xl text-[#3D3732]">
            <div className="flex items-center justify-between pb-4 border-b border-[#EBE5DE]">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#C5A059]" />
                <h3 className="font-serif italic text-lg font-bold text-[#4A433F]">
                  Update Live Precious Metal Rates
                </h3>
              </div>
              <button
                onClick={() => setShowMetalRatesEdit(false)}
                className="text-[#9C8D80] hover:text-[#3D3732] text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveRates} className="mt-4 space-y-4">
              <p className="text-xs text-[#7D736A]">
                All inventory valuation, scrap trade-in calculations, and automatic invoice pricing adjust automatically based on these base gram rates.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#635B53] mb-1">
                    Gold 24K (99.9%) / gram
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-[#9C8D80] text-xs">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={gold24kInput}
                      onChange={(e) => setGold24kInput(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-lg text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#635B53] mb-1">
                    Gold 18K (75.0%) / gram
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-[#9C8D80] text-xs">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={gold18kInput}
                      onChange={(e) => setGold18kInput(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-lg text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#635B53] mb-1">
                    Platinum 950 / gram
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-[#9C8D80] text-xs">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={platInput}
                      onChange={(e) => setPlatInput(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-lg text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#635B53] mb-1">
                    Silver 925 / gram
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-[#9C8D80] text-xs">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={silverInput}
                      onChange={(e) => setSilverInput(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-lg text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EBE5DE] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowMetalRatesEdit(false)}
                  className="px-3 py-1.5 rounded-lg bg-[#F2EEE9] hover:bg-[#EBE5DE] text-[#635B53] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Save Rates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
