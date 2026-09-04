import React from 'react';
import { Printer, X, QrCode, Tag, ShieldCheck } from 'lucide-react';
import { JewelryItem } from '../../types';
import { useStore } from '../../context/StoreContext';

interface TagPrinterModalProps {
  item: JewelryItem;
  onClose: () => void;
}

export const TagPrinterModal: React.FC<TagPrinterModalProps> = ({ item, onClose }) => {
  const { storeSettings } = useStore();

  const handlePrint = () => {
    window.print();
  };

  const totalDiamondCarats = item.stones
    .filter((s) => s.type === 'Diamond')
    .reduce((acc, s) => acc + s.caratWeight, 0);

  const mainCert = item.stones.find((s) => s.certNumber);

  return (
    <div className="fixed inset-0 z-50 bg-[#3D3732]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl p-6 max-w-lg w-full shadow-2xl text-[#3D3732]">
        <div className="flex items-center justify-between pb-4 border-b border-[#EBE5DE]">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif italic text-lg font-bold text-[#4A433F]">
              Jewelry Tag & Barcode Label
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#7D736A] hover:text-[#3D3732] hover:bg-[#FAF8F5] p-1 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 flex flex-col items-center justify-center">
          <p className="text-xs text-[#7D736A] mb-4 text-center">
            Standard boutique fold-over tag format for display vitrines & security string attachment.
          </p>

          {/* Luxury Foldable Tag Preview */}
          <div
            id="printable-tag"
            className="w-80 bg-[#FAF8F5] border-2 border-[#C5A059] rounded-xl p-4 shadow-md text-[#3D3732] relative overflow-hidden"
          >
            {/* Top Brand */}
            <div className="flex items-center justify-between border-b border-[#D9D1C7] pb-2 mb-2">
              <span className="font-serif tracking-widest font-bold text-[#A67C2E] text-xs">
                {storeSettings.storeName.toUpperCase()}
              </span>
              <span className="text-[10px] text-[#7D736A] font-mono">
                {item.sku}
              </span>
            </div>

            {/* Product Name */}
            <h4 className="text-xs font-bold text-[#3D3732] line-clamp-1">
              {item.name}
            </h4>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-2 mt-2.5 text-[11px] bg-[#FFFFFF] p-2.5 rounded-lg border border-[#EBE5DE]">
              <div>
                <span className="text-[#7D736A] block text-[10px]">METAL PURITY:</span>
                <span className="font-bold text-[#A67C2E]">{item.metal.purity}</span>
              </div>
              <div>
                <span className="text-[#7D736A] block text-[10px]">GROSS / NET WT:</span>
                <span className="font-mono text-[#4A433F]">
                  {item.metal.grossWeightGrams}g / {item.metal.netWeightGrams}g
                </span>
              </div>

              {totalDiamondCarats > 0 && (
                <div>
                  <span className="text-[#7D736A] block text-[10px]">DIAMOND CT:</span>
                  <span className="font-bold text-[#5B7B88]">{totalDiamondCarats.toFixed(2)} ct</span>
                </div>
              )}

              {mainCert && (
                <div>
                  <span className="text-[#7D736A] block text-[10px]">CERTIFICATION:</span>
                  <span className="font-bold text-[#5E8357]">{mainCert.certAuthority} #{mainCert.certNumber?.slice(0, 10)}</span>
                </div>
              )}

              {item.stock.size && (
                <div>
                  <span className="text-[#7D736A] block text-[10px]">SIZE / LENGTH:</span>
                  <span className="text-[#4A433F]">{item.stock.size}</span>
                </div>
              )}

              {item.stock.hallmarked && (
                <div className="flex items-center gap-1 text-[10px] text-[#A67C2E]">
                  <ShieldCheck className="w-3 h-3 text-[#C5A059] inline" />
                  <span>Hallmarked</span>
                </div>
              )}
            </div>

            {/* Price & Barcode */}
            <div className="mt-3 pt-2 border-t border-[#D9D1C7] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#7D736A] block">RETAIL PRICE</span>
                <span className="font-serif italic text-base font-bold text-[#A67C2E] font-mono">
                  {storeSettings.currencySymbol}{item.pricing.retailPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>

              {/* Barcode / QR Simulation */}
              <div className="text-right flex flex-col items-end">
                <div className="flex gap-0.5 items-center h-5 bg-white px-1 py-0.5 rounded border border-[#D9D1C7]">
                  <div className="w-0.5 h-4 bg-[#3D3732]" />
                  <div className="w-1 h-4 bg-[#3D3732]" />
                  <div className="w-0.5 h-4 bg-[#3D3732]" />
                  <div className="w-1.5 h-4 bg-[#3D3732]" />
                  <div className="w-0.5 h-4 bg-[#3D3732]" />
                  <div className="w-1 h-4 bg-[#3D3732]" />
                  <div className="w-0.5 h-4 bg-[#3D3732]" />
                  <div className="w-1.5 h-4 bg-[#3D3732]" />
                </div>
                <span className="text-[9px] font-mono text-[#7D736A] mt-0.5">
                  {item.barcode || item.sku}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#EBE5DE] flex items-center justify-between">
          <div className="text-xs text-[#7D736A]">
            Location: <strong className="text-[#3D3732]">{item.stock.location}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EBE5DE] text-[#635B53] text-xs font-medium cursor-pointer transition-colors border border-[#D9D1C7]"
            >
              Close
            </button>
            <button
              id="btn-print-tag-now"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] text-white text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Jewelry Tag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
