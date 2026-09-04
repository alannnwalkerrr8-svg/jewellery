import React from 'react';
import {
  X,
  Tag,
  Printer,
  ShoppingCart,
  Copy,
  Edit,
  ShieldCheck,
  Gem,
  Coins,
  MapPin,
  Clock,
  Sparkles,
  Scale,
} from 'lucide-react';
import { JewelryItem } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ItemDetailModalProps {
  item: JewelryItem;
  onClose: () => void;
  onEdit: (item: JewelryItem) => void;
  onPrintTag: (item: JewelryItem) => void;
  onOpenAI: (item: JewelryItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onEdit,
  onPrintTag,
  onOpenAI,
}) => {
  const { addToCart, duplicateInventoryItem, storeSettings } = useStore();

  const totalDiamondCarats = item.stones
    .filter((s) => s.type === 'Diamond')
    .reduce((acc, s) => acc + s.caratWeight, 0);

  const profitMargin = item.pricing.retailPrice - item.pricing.costPrice;
  const marginPercentage = item.pricing.costPrice > 0 ? ((profitMargin / item.pricing.costPrice) * 100).toFixed(1) : '0';

  return (
    <div className="fixed inset-0 z-50 bg-[#3D3732]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl max-w-4xl w-full shadow-2xl text-[#3D3732] overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#EBE5DE] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#C5A059] border border-[#D9D1C7]">
              <Gem className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#C5A059]">
                  {item.sku}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#D9D1C7] text-[#635B53]">
                  {item.category}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    item.status === 'In Stock' || item.status === 'In Display'
                      ? 'bg-[#E1F2E1] text-[#2D5A27] border border-[#C8E4C8]'
                      : 'bg-[#FAF8F5] text-[#A67C2E] border border-[#C5A059]/30'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <h2 className="font-serif italic text-lg md:text-xl font-bold text-[#4A433F] mt-1">
                {item.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7D736A] hover:text-[#3D3732] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left: Product Image & Quick Tag Preview */}
            <div className="md:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#D9D1C7] bg-[#FAF8F5] aspect-square relative shadow-xs">
                <img
                  src={item.images[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {item.stock.hallmarked && (
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs border border-[#C5A059]/40 text-[#A67C2E] text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Hallmarked ({item.stock.hallmarkCode})</span>
                  </div>
                )}
              </div>

              {/* Quick Summary Box */}
              <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between text-[#7D736A]">
                  <span>Storage / Vault Location:</span>
                  <strong className="text-[#3D3732]">{item.stock.location}</strong>
                </div>
                <div className="flex justify-between text-[#7D736A]">
                  <span>Physical Inventory:</span>
                  <strong className="text-[#2D5A27]">{item.stock.quantity} units available</strong>
                </div>
                {item.stock.size && (
                  <div className="flex justify-between text-[#7D736A]">
                    <span>Size / Dimensions:</span>
                    <strong className="text-[#3D3732]">{item.stock.size}</strong>
                  </div>
                )}
                {item.barcode && (
                  <div className="flex justify-between text-[#7D736A]">
                    <span>Barcode / Scan Tag:</span>
                    <strong className="text-[#3D3732] font-mono">{item.barcode}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Detailed Specifications */}
            <div className="md:col-span-7 space-y-5">
              {/* Pricing & Valuation Card */}
              <div className="p-5 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl shadow-2xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#A67C2E]">
                      Boutique Retail Price
                    </span>
                    <div className="font-serif text-3xl font-bold text-[#4A433F]">
                      {storeSettings.currencySymbol}{item.pricing.retailPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-[#7D736A] block">Estimated Cost:</span>
                    <span className="text-[#3D3732] font-mono">${item.pricing.costPrice.toLocaleString()}</span>
                    <div className="text-[#2D5A27] text-[11px] font-semibold mt-0.5">
                      +${profitMargin.toLocaleString()} ({marginPercentage}% markup)
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#EBE5DE] text-[11px]">
                  <div>
                    <span className="text-[#7D736A] block">Metal Cost:</span>
                    <span className="font-mono text-[#3D3732]">${item.pricing.metalCost}</span>
                  </div>
                  <div>
                    <span className="text-[#7D736A] block">Gems Cost:</span>
                    <span className="font-mono text-[#3D3732]">${item.pricing.gemstoneCost}</span>
                  </div>
                  <div>
                    <span className="text-[#7D736A] block">Making Charge:</span>
                    <span className="font-mono text-[#3D3732]">${item.pricing.makingCharges}</span>
                  </div>
                </div>
              </div>

              {/* Precious Metal Specifications */}
              <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#A67C2E] pb-2 border-b border-[#EBE5DE]">
                  <Coins className="w-4 h-4 text-[#C5A059]" />
                  <span>Precious Metal Details</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[#7D736A] block text-[10px]">METAL:</span>
                    <span className="font-bold text-[#3D3732]">{item.metal.type}</span>
                  </div>
                  <div>
                    <span className="text-[#7D736A] block text-[10px]">PURITY:</span>
                    <span className="font-bold text-[#A67C2E]">{item.metal.purity}</span>
                  </div>
                  <div>
                    <span className="text-[#7D736A] block text-[10px]">GROSS WEIGHT:</span>
                    <span className="font-mono text-[#3D3732] font-bold">{item.metal.grossWeightGrams} g</span>
                  </div>
                  <div>
                    <span className="text-[#7D736A] block text-[10px]">NET METAL WEIGHT:</span>
                    <span className="font-mono text-[#C5A059] font-bold">{item.metal.netWeightGrams} g</span>
                  </div>
                </div>
              </div>

              {/* Gemstones & Diamonds Registry */}
              <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#EBE5DE]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2B6CB0]">
                    <Gem className="w-4 h-4 text-[#2B6CB0]" />
                    <span>Gemstones & Diamonds ({item.stones.length} settings)</span>
                  </div>
                  {totalDiamondCarats > 0 && (
                    <span className="text-xs font-bold text-[#2B6CB0]">
                      Total Diamonds: {totalDiamondCarats.toFixed(2)} ct
                    </span>
                  )}
                </div>

                {item.stones.length === 0 ? (
                  <p className="text-xs text-[#7D736A] italic">No gemstones in this piece.</p>
                ) : (
                  <div className="space-y-2.5">
                    {item.stones.map((st, idx) => (
                      <div
                        key={st.id || idx}
                        className="p-3 bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-xs space-y-2 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#3D3732]">
                            {st.pieces}x {st.caratWeight}ct {st.cut} {st.type}
                          </span>
                          {st.certAuthority && st.certAuthority !== 'None' && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-[#E1F2E1] text-[#2D5A27] border border-[#C8E4C8] font-bold">
                              {st.certAuthority} Cert: {st.certNumber || 'Verified'}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-4 gap-2 text-[11px] text-[#7D736A] bg-[#FAF8F5] p-2 rounded-lg border border-[#EBE5DE]">
                          <div>
                            <span className="block text-[9px] text-[#7D736A]">COLOR:</span>
                            <span className="text-[#3D3732] font-semibold">{st.color}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] text-[#7D736A]">CLARITY:</span>
                            <span className="text-[#3D3732] font-semibold">{st.clarity}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] text-[#7D736A]">CUT SHAPE:</span>
                            <span className="text-[#3D3732] font-semibold">{st.cut}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] text-[#7D736A]">SETTING:</span>
                            <span className="text-[#3D3732] font-semibold">{st.settingType || 'Prong'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description & Tags */}
              <div className="space-y-2 text-xs">
                <h4 className="font-semibold text-[#4A433F] font-serif italic">Curator Description</h4>
                <p className="text-[#7D736A] leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#D9D1C7]">
                  {item.description || 'No detailed description provided.'}
                </p>

                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#7D736A] border border-[#D9D1C7]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#EBE5DE] bg-[#FAF8F5] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPrintTag(item)}
              className="px-3 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#3D3732] text-xs font-medium border border-[#D9D1C7] flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-4 h-4 text-[#C5A059]" />
              <span>Print Tag & Barcode</span>
            </button>

            <button
              onClick={() => onOpenAI(item)}
              className="px-3 py-2 rounded-xl bg-[#C5A059]/15 hover:bg-[#C5A059]/25 text-[#A67C2E] text-xs font-medium border border-[#C5A059]/30 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>AI Valuation Dossier</span>
            </button>

            <button
              onClick={() => {
                duplicateInventoryItem(item.id);
                onClose();
              }}
              className="px-3 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#635B53] text-xs font-medium border border-[#D9D1C7] flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Duplicate SKU</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onEdit(item);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#3D3732] text-xs font-semibold border border-[#D9D1C7] flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>

            <button
              onClick={() => {
                addToCart(item);
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to POS Register</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
