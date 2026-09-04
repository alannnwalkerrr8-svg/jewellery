import React, { useState, useMemo, useRef } from 'react';
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Trash2,
  Coins,
  Receipt,
  Scan,
  Gem,
  Tag,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Percent,
  CheckCircle2,
} from 'lucide-react';
import { JewelryCategory, JewelryItem, TradeInGold } from '../../types';
import { useStore } from '../../context/StoreContext';
import { CheckoutModal } from './CheckoutModal';
import { TradeInCalculatorModal } from './TradeInCalculatorModal';

interface POSViewProps {
  onOpenInvoicePreview: (invoice: any) => void;
}

export const POSView: React.FC<POSViewProps> = ({ onOpenInvoicePreview }) => {
  const {
    inventory,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    updateCartDiscount,
    clearCart,
    storeSettings,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [barcodeScanInput, setBarcodeScanInput] = useState('');
  const [orderDiscount, setOrderDiscount] = useState<number>(0);

  // Modals
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showTradeInModal, setShowTradeInModal] = useState(false);
  const [tradeInDetails, setTradeInDetails] = useState<TradeInGold | undefined>(undefined);

  const barcodeInputRef = useRef<HTMLInputElement>(null);

  const categories: string[] = [
    'All',
    'Rings',
    'Necklaces',
    'Bracelets',
    'Earrings',
    'Pendants',
    'Watches',
    'Loose Gemstones',
    'Bullion & Coins',
  ];

  // Filter available items for quick POS selection
  const availableItems = useMemo(() => {
    return inventory.filter((item) => {
      // Must not be sold
      if (item.status === 'Sold') return false;

      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchSku = item.sku.toLowerCase().includes(q);
        const matchBarcode = item.barcode?.toLowerCase().includes(q);
        const matchMetal = item.metal.purity.toLowerCase().includes(q);
        if (!matchName && !matchSku && !matchBarcode && !matchMetal) return false;
      }

      return true;
    });
  }, [inventory, selectedCategory, searchQuery]);

  // Handle barcode / fast SKU enter
  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeScanInput.trim()) return;

    const term = barcodeScanInput.trim().toLowerCase();
    const matched = inventory.find(
      (i) =>
        i.sku.toLowerCase() === term ||
        i.barcode.toLowerCase() === term ||
        i.id.toLowerCase() === term
    );

    if (matched) {
      addToCart(matched);
      setBarcodeScanInput('');
    } else {
      alert(`No jewelry piece matched code: "${barcodeScanInput}"`);
    }
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce(
    (acc, curr) => acc + curr.item.pricing.retailPrice * curr.quantity,
    0
  );

  const cartItemDiscounts = cart.reduce((acc, curr) => acc + curr.customDiscount, 0);
  const totalDiscount = cartItemDiscounts + orderDiscount;

  const totalCartGrossWeight = cart.reduce(
    (acc, curr) => acc + curr.item.metal.grossWeightGrams * curr.quantity,
    0
  );

  const totalCartDiamonds = cart.reduce((acc, curr) => {
    const diamonds = curr.item.stones.filter((s) => s.type === 'Diamond');
    const ctSum = diamonds.reduce((cAcc, s) => cAcc + s.caratWeight, 0);
    return acc + ctSum * curr.quantity;
  }, 0);

  const taxableAmount = Math.max(0, cartSubtotal - totalDiscount);
  const cartTax = (taxableAmount * storeSettings.taxRate) / 100;
  const tradeInAllowance = tradeInDetails ? tradeInDetails.calculatedValue : 0;
  const cartGrandTotal = Math.max(0, taxableAmount + cartTax - tradeInAllowance);

  return (
    <div className="space-y-6 pb-16">
      {/* Top POS Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#EBE5DE] border border-[#D9D1C7] p-5 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-[#A67C2E] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30">
              Boutique Point of Sale
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#E1F2E1] text-[#2D5A27] border border-[#C8E4C8] font-medium">
              Live Register Active
            </span>
          </div>
          <h1 className="font-serif italic text-2xl font-bold text-[#4A433F] mt-1">
            Sales Counter & Invoice Register
          </h1>
          <p className="text-xs text-[#7D736A] mt-0.5">
            Instant barcode scan, custom trade-in gold calculation, and tax invoice generation.
          </p>
        </div>

        {/* Quick Barcode Scanner input */}
        <form onSubmit={handleBarcodeSubmit} className="flex items-center gap-2 max-w-sm w-full">
          <div className="relative flex-1">
            <Scan className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
            <input
              ref={barcodeInputRef}
              type="text"
              placeholder="Scan Barcode / Enter SKU (Press Enter)..."
              value={barcodeScanInput}
              onChange={(e) => setBarcodeScanInput(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono focus:outline-none focus:border-[#C5A059]"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 bg-[#C5A059] hover:bg-[#B38E46] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Add
          </button>
        </form>
      </div>

      {/* Main 2-Column POS Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Product Catalog & Search (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Search & Category Pills */}
          <div className="bg-[#FFFFFF] border border-[#D9D1C7] p-4 rounded-2xl shadow-xs space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7D736A]" />
              <input
                type="text"
                placeholder="Search jewelry catalog by name, gemstone, metal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] placeholder-[#9C8D80] focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#C5A059] text-white font-semibold shadow-xs'
                      : 'bg-[#FAF8F5] hover:bg-[#F2EEE9] text-[#635B53] border border-[#EBE5DE]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Items Grid for Fast Click Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[620px] overflow-y-auto p-1">
            {availableItems.map((item) => {
              const inCart = cart.find((c) => c.item.id === item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => addToCart(item)}
                  className={`bg-[#FFFFFF] border rounded-2xl overflow-hidden p-3 shadow-xs hover:border-[#C5A059] transition-all cursor-pointer flex flex-col justify-between group relative ${
                    inCart ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30 bg-[#FAF8F5]' : 'border-[#D9D1C7]'
                  }`}
                >
                  <div>
                    <div className="aspect-square bg-[#FAF8F5] rounded-xl overflow-hidden relative mb-2">
                      <img
                        src={item.images[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80'}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#FFFFFF]/90 text-[#A67C2E] border border-[#C5A059]/30 shadow-2xs">
                        {item.metal.purity}
                      </span>
                      {inCart && (
                        <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#C5A059] text-white font-bold rounded-full flex items-center justify-center text-[10px] shadow-xs">
                          {inCart.quantity}
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] text-[#C5A059] font-mono font-semibold block">
                      {item.sku}
                    </span>
                    <h4 className="text-xs font-bold text-[#4A433F] line-clamp-1 group-hover:text-[#C5A059] transition-colors font-serif italic">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-[#7D736A] mt-0.5">
                      {item.metal.grossWeightGrams}g • {item.stones[0]?.type || 'Plain Metal'}
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#EBE5DE] flex items-center justify-between">
                    <span className="font-serif text-xs font-bold text-[#C5A059]">
                      {storeSettings.currencySymbol}{item.pricing.retailPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] text-[#635B53] border border-[#D9D1C7] group-hover:bg-[#C5A059] group-hover:text-white font-semibold transition-colors">
                      + Add
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Cart & Checkout Terminal (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              {/* Cart Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#EBE5DE]">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#C5A059]" />
                  <h3 className="font-serif italic text-base font-bold text-[#4A433F]">
                    Active Sales Cart ({cart.length} items)
                  </h3>
                </div>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-[#7D736A] hover:text-[#9B2C2C] transition-colors cursor-pointer"
                  >
                    Clear Cart
                  </button>
                )}
              </div>

              {/* Cart Items List */}
              {cart.length === 0 ? (
                <div className="py-16 text-center text-[#7D736A] text-xs flex flex-col items-center justify-center">
                  <ShoppingCart className="w-10 h-10 mb-2 opacity-30 text-[#9C8D80]" />
                  <p>Cart is currently empty.</p>
                  <p className="text-[11px] text-[#9C8D80] mt-1">
                    Select pieces from the left catalog or scan a jewelry tag.
                  </p>
                </div>
              ) : (
                <div className="mt-3 space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {cart.map((cartItem) => {
                    const itemTotal = cartItem.item.pricing.retailPrice * cartItem.quantity - cartItem.customDiscount;

                    return (
                      <div
                        key={cartItem.item.id}
                        className="p-3 bg-[#FAF8F5] border border-[#EBE5DE] rounded-xl space-y-2 text-xs"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={cartItem.item.images[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=80&q=80'}
                              alt={cartItem.item.name}
                              className="w-10 h-10 rounded object-cover border border-[#D9D1C7] shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <span className="text-[10px] text-[#C5A059] font-mono font-semibold block">
                                {cartItem.item.sku}
                              </span>
                              <h4 className="font-bold text-[#4A433F] line-clamp-1 font-serif italic">
                                {cartItem.item.name}
                              </h4>
                              <p className="text-[10px] text-[#7D736A]">
                                {cartItem.item.metal.purity} • {cartItem.item.metal.grossWeightGrams}g
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => removeFromCart(cartItem.item.id)}
                            className="text-[#9C8D80] hover:text-[#9B2C2C] p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Quantity & Item Discount Controls */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#EBE5DE]">
                          <div className="flex items-center gap-1.5 bg-[#FFFFFF] px-2 py-0.5 rounded-lg border border-[#D9D1C7]">
                            <button
                              onClick={() => updateCartQuantity(cartItem.item.id, cartItem.quantity - 1)}
                              className="text-[#7D736A] hover:text-[#3D3732] p-0.5 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono font-bold text-[#3D3732] text-xs px-1">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(cartItem.item.id, cartItem.quantity + 1)}
                              className="text-[#7D736A] hover:text-[#3D3732] p-0.5 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] text-[#7D736A]">
                            <span>Disc: $</span>
                            <input
                              type="number"
                              min="0"
                              value={cartItem.customDiscount || ''}
                              onChange={(e) => updateCartDiscount(cartItem.item.id, parseFloat(e.target.value) || 0)}
                              placeholder="0"
                              className="w-16 px-1.5 py-0.5 bg-[#FFFFFF] border border-[#D9D1C7] rounded text-[#C5A059] font-mono text-right"
                            />
                          </div>

                          <div className="text-right">
                            <span className="font-serif font-bold text-[#C5A059] text-sm">
                              ${itemTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Metal & Diamond Weight Metrics Pill */}
              {cart.length > 0 && (
                <div className="mt-4 p-2.5 bg-[#FAF8F5] border border-[#EBE5DE] rounded-xl flex items-center justify-between text-xs text-[#7D736A]">
                  <div className="flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Cart Gold/Metal: <strong className="text-[#3D3732] font-mono">{totalCartGrossWeight.toFixed(2)}g</strong></span>
                  </div>
                  {totalCartDiamonds > 0 && (
                    <div className="flex items-center gap-1">
                      <Gem className="w-3.5 h-3.5 text-[#2B6CB0]" />
                      <span>Diamonds: <strong className="text-[#2B6CB0] font-mono">{totalCartDiamonds.toFixed(2)}ct</strong></span>
                    </div>
                  )}
                </div>
              )}

              {/* Trade-In Gold / Scrap Allowance Bar */}
              <div className="mt-3 p-3 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4A433F]">
                    <Coins className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Old Gold / Scrap Trade-In</span>
                  </div>
                  {tradeInDetails ? (
                    <p className="text-[11px] text-[#2D5A27] font-medium mt-0.5">
                      {tradeInDetails.grossWeightGrams}g {tradeInDetails.purity} credit applied
                    </p>
                  ) : (
                    <p className="text-[10px] text-[#7D736A]">Deduct customer scrap metal value</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {tradeInDetails && (
                    <span className="font-mono text-xs font-bold text-[#2D5A27]">
                      -${tradeInDetails.calculatedValue.toFixed(2)}
                    </span>
                  )}
                  <button
                    onClick={() => setShowTradeInModal(true)}
                    className="px-3 py-1 bg-[#FFFFFF] hover:bg-[#F2EEE9] text-[#C5A059] border border-[#C5A059]/40 rounded-lg text-xs font-medium cursor-pointer shadow-2xs"
                  >
                    {tradeInDetails ? 'Edit Trade-In' : '+ Trade-In'}
                  </button>
                </div>
              </div>
            </div>

            {/* Calculations & Checkout Button */}
            <div className="mt-4 pt-4 border-t border-[#EBE5DE] space-y-2 text-xs">
              <div className="flex justify-between text-[#7D736A]">
                <span>Subtotal:</span>
                <span className="font-mono text-[#3D3732]">${cartSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>

              {totalDiscount > 0 && (
                <div className="flex justify-between text-[#C5A059]">
                  <span>Discounts Total:</span>
                  <span className="font-mono">-${totalDiscount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              )}

              <div className="flex justify-between text-[#7D736A]">
                <span>Sales Tax ({storeSettings.taxRate}%):</span>
                <span className="font-mono text-[#3D3732]">${cartTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>

              {tradeInAllowance > 0 && (
                <div className="flex justify-between text-[#2D5A27] font-bold">
                  <span>Trade-In Credit:</span>
                  <span className="font-mono">-${tradeInAllowance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#EBE5DE] flex items-center justify-between">
                <span className="text-sm font-bold text-[#4A433F] uppercase">
                  Grand Total Due:
                </span>
                <span className="font-serif text-2xl font-bold text-[#C5A059]">
                  {storeSettings.currencySymbol}{cartGrandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>

              <button
                id="btn-pos-checkout"
                onClick={() => setShowCheckoutModal(true)}
                disabled={cart.length === 0}
                className="w-full mt-3 py-3 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Receipt className="w-4 h-4" />
                <span>Tender Payment & Issue Invoice</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <CheckoutModal
          onClose={() => setShowCheckoutModal(false)}
          subtotal={cartSubtotal}
          discountTotal={totalDiscount}
          taxTotal={cartTax}
          tradeInDetails={tradeInDetails}
          onSaleCompleted={(inv) => {
            setShowCheckoutModal(false);
            setTradeInDetails(undefined);
            onOpenInvoicePreview(inv);
          }}
        />
      )}

      {/* Trade-In Scrap Calculator Modal */}
      {showTradeInModal && (
        <TradeInCalculatorModal
          onClose={() => setShowTradeInModal(false)}
          initialData={tradeInDetails}
          onApplyTradeIn={(t) => setTradeInDetails(t)}
        />
      )}
    </div>
  );
};
