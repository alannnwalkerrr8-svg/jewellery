import React, { useState, useMemo } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Tag,
  Printer,
  ShoppingCart,
  ShieldCheck,
  Gem,
  Coins,
  ChevronDown,
  Sparkles,
  SlidersHorizontal,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Scale,
} from 'lucide-react';
import { JewelryCategory, JewelryItem, MetalType } from '../../types';
import { useStore } from '../../context/StoreContext';
import { TagPrinterModal } from './TagPrinterModal';
import { ItemDetailModal } from './ItemDetailModal';

interface InventoryViewProps {
  onOpenNewItem: () => void;
  onEditItem: (item: JewelryItem) => void;
  onOpenAIForValuation: (item: JewelryItem) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  onOpenNewItem,
  onEditItem,
  onOpenAIForValuation,
}) => {
  const {
    inventory,
    deleteInventoryItem,
    duplicateInventoryItem,
    addToCart,
    storeSettings,
    globalSearch,
    setGlobalSearch,
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMetal, setSelectedMetal] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modal states
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<JewelryItem | null>(null);
  const [selectedItemForTag, setSelectedItemForTag] = useState<JewelryItem | null>(null);

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

  const metalOptions = ['All', 'Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum', 'Sterling Silver'];
  const statusOptions = ['All', 'In Stock', 'In Display', 'In Vault', 'Reserved', 'Sold'];

  // Filtered inventory
  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      // Search
      if (globalSearch) {
        const q = globalSearch.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchSku = item.sku.toLowerCase().includes(q);
        const matchBarcode = item.barcode?.toLowerCase().includes(q);
        const matchMetal = item.metal.purity.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        const matchStones = item.stones.some(
          (s) => s.type.toLowerCase().includes(q) || s.certNumber?.toLowerCase().includes(q)
        );
        if (!matchName && !matchSku && !matchBarcode && !matchMetal && !matchCategory && !matchStones) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Metal
      if (selectedMetal !== 'All' && !item.metal.type.includes(selectedMetal)) {
        return false;
      }

      // Status
      if (selectedStatus !== 'All' && item.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [inventory, globalSearch, selectedCategory, selectedMetal, selectedStatus]);

  const filteredTotalValue = filteredInventory.reduce(
    (acc, curr) => acc + curr.pricing.retailPrice * curr.stock.quantity,
    0
  );

  const filteredTotalWeight = filteredInventory.reduce(
    (acc, curr) => acc + curr.metal.grossWeightGrams * curr.stock.quantity,
    0
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#EBE5DE] border border-[#D9D1C7] p-5 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-[#A67C2E] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30">
              Vault & Inventory Control
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#D9D1C7] text-[#635B53] font-mono">
              {filteredInventory.length} Items Listed
            </span>
          </div>
          <h1 className="font-serif italic text-2xl font-bold text-[#4A433F] mt-1">
            Jewelry Master Catalog
          </h1>
          <p className="text-xs text-[#7D736A] mt-0.5">
            Real-time precious metal weights, diamond 4Cs certification dossiers, making charges, and stock status.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#FAF8F5] px-4 py-2 rounded-xl border border-[#D9D1C7] text-right shadow-2xs">
            <span className="text-[10px] text-[#7D736A] uppercase font-medium block">
              Filtered Stock Value
            </span>
            <span className="text-sm font-bold text-[#4A433F] font-serif">
              {storeSettings.currencySymbol}{filteredTotalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-[#7D736A] block">
              {filteredTotalWeight.toFixed(1)}g total metal
            </span>
          </div>

          <button
            id="btn-add-inventory-item"
            onClick={onOpenNewItem}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Register Jewelry Piece</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#FFFFFF] border border-[#D9D1C7] p-4 rounded-2xl shadow-xs space-y-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C5A059] text-white font-semibold shadow-xs'
                  : 'bg-[#FAF8F5] hover:bg-[#F2EEE9] text-[#635B53] border border-[#EBE5DE]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter Dropdowns & View Mode */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#EBE5DE] text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[#7D736A]">Metal:</span>
              <select
                value={selectedMetal}
                onChange={(e) => setSelectedMetal(e.target.value)}
                className="px-2.5 py-1.5 bg-[#FAF8F5] border border-[#D9D1C7] rounded-lg text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
              >
                {metalOptions.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[#7D736A]">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-2.5 py-1.5 bg-[#FAF8F5] border border-[#D9D1C7] rounded-lg text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-[#FAF8F5] p-0.5 rounded-lg border border-[#D9D1C7]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-[#FFFFFF] text-[#C5A059] shadow-2xs' : 'text-[#7D736A] hover:text-[#3D3732]'}`}
                title="Grid Cards View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-[#FFFFFF] text-[#C5A059] shadow-2xs' : 'text-[#7D736A] hover:text-[#3D3732]'}`}
                title="Data Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Items Display: Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredInventory.map((item) => {
            const totalDiamonds = item.stones
              .filter((s) => s.type === 'Diamond')
              .reduce((acc, s) => acc + s.caratWeight, 0);
            const mainCert = item.stones.find((s) => s.certNumber);
            const isLowStock = item.stock.quantity <= item.stock.lowStockThreshold;

            return (
              <div
                key={item.id}
                className="bg-[#FFFFFF] border border-[#D9D1C7] hover:border-[#C5A059] rounded-2xl overflow-hidden shadow-xs transition-all flex flex-col group relative"
              >
                {/* Image Container */}
                <div
                  onClick={() => setSelectedItemForDetail(item)}
                  className="aspect-square bg-[#FAF8F5] relative overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.images[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FFFFFF]/90 backdrop-blur-md text-[#A67C2E] border border-[#C5A059]/40 shadow-2xs">
                      {item.metal.purity}
                    </span>
                    {mainCert && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[#FAF8F5]/90 backdrop-blur-md text-[#2B6CB0] border border-[#D0E2F0] flex items-center gap-1 shadow-2xs">
                        <ShieldCheck className="w-2.5 h-2.5" />
                        {mainCert.certAuthority}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md shadow-2xs ${
                        item.stock.quantity === 0
                          ? 'bg-[#FDE8E8] text-[#9B2C2C] border border-[#F8C8C8]'
                          : isLowStock
                          ? 'bg-[#FDE8E8] text-[#9B2C2C] border border-[#F8C8C8]'
                          : 'bg-[#FFFFFF]/90 text-[#635B53] border border-[#D9D1C7]'
                      }`}
                    >
                      {item.stock.quantity} in stock
                    </span>
                  </div>

                  {item.stock.hallmarked && (
                    <div className="absolute bottom-2 left-2 text-[9px] font-semibold text-[#A67C2E] bg-[#FFFFFF]/90 px-1.5 py-0.5 rounded border border-[#C5A059]/30">
                      Stamped: {item.stock.hallmarkCode}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#7D736A]">
                      <span className="font-mono text-[#C5A059] font-semibold">{item.sku}</span>
                      <span>{item.category}</span>
                    </div>

                    <h3
                      onClick={() => setSelectedItemForDetail(item)}
                      className="font-serif italic text-sm font-bold text-[#4A433F] hover:text-[#C5A059] transition-colors line-clamp-2 mt-1 cursor-pointer"
                    >
                      {item.name}
                    </h3>

                    {/* Weight & Stone summary */}
                    <div className="mt-2 text-xs text-[#7D736A] space-y-1 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EBE5DE]">
                      <div className="flex justify-between">
                        <span>Gross / Net Wt:</span>
                        <strong className="text-[#3D3732] font-mono">
                          {item.metal.grossWeightGrams}g / {item.metal.netWeightGrams}g
                        </strong>
                      </div>
                      {totalDiamonds > 0 && (
                        <div className="flex justify-between">
                          <span>Diamonds:</span>
                          <strong className="text-[#2B6CB0]">{totalDiamonds.toFixed(2)} ct total</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-2 border-t border-[#EBE5DE] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#7D736A] uppercase font-medium block">
                        Retail Price
                      </span>
                      <span className="font-serif text-base font-bold text-[#C5A059]">
                        {storeSettings.currencySymbol}{item.pricing.retailPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedItemForTag(item)}
                        className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2EEE9] text-[#635B53] hover:text-[#C5A059] border border-[#D9D1C7] transition-colors cursor-pointer"
                        title="Print Boutique Tag & Barcode"
                      >
                        <Tag className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onEditItem(item)}
                        className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2EEE9] text-[#635B53] hover:text-[#3D3732] border border-[#D9D1C7] transition-colors cursor-pointer"
                        title="Edit Item"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => addToCart(item)}
                        disabled={item.stock.quantity === 0}
                        className={`p-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          item.stock.quantity === 0
                            ? 'bg-[#EBE5DE] text-[#9C8D80] cursor-not-allowed'
                            : 'bg-[#C5A059] hover:bg-[#B38E46] text-white shadow-xs'
                        }`}
                        title="Add to POS Register"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Items Display: Data Table View */
        <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#3D3732]">
              <thead className="bg-[#FAF8F5] text-[#7D736A] uppercase font-semibold text-[10px] tracking-wider border-b border-[#D9D1C7]">
                <tr>
                  <th className="p-4">SKU / Item</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Metal & Purity</th>
                  <th className="p-4">Weights (g)</th>
                  <th className="p-4">Gemstones</th>
                  <th className="p-4">Stock & Vault</th>
                  <th className="p-4 text-right">Retail Price</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE5DE]">
                {filteredInventory.map((item) => {
                  const mainCert = item.stones.find((s) => s.certNumber);
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[#FAF8F5] transition-colors group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.images[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=100&q=80'}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover border border-[#D9D1C7] shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-mono text-[10px] font-bold text-[#C5A059] block">
                              {item.sku}
                            </span>
                            <span
                              onClick={() => setSelectedItemForDetail(item)}
                              className="font-medium text-[#4A433F] hover:text-[#C5A059] cursor-pointer line-clamp-1"
                            >
                              {item.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#D9D1C7] text-[#635B53] text-[10px]">
                          {item.category}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="font-semibold text-[#4A433F]">{item.metal.purity}</div>
                        <div className="text-[10px] text-[#7D736A]">{item.metal.type}</div>
                      </td>

                      <td className="p-4 font-mono">
                        <div>Gross: <strong>{item.metal.grossWeightGrams}g</strong></div>
                        <div className="text-[10px] text-[#C5A059]">Net: {item.metal.netWeightGrams}g</div>
                      </td>

                      <td className="p-4">
                        {item.stones.length > 0 ? (
                          <div>
                            <span className="text-[#3D3732] font-medium">
                              {item.stones.map((s) => `${s.caratWeight}ct ${s.type}`).join(', ')}
                            </span>
                            {mainCert && (
                              <span className="block text-[9px] text-[#2D5A27] font-bold">
                                {mainCert.certAuthority} Certified
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[#9C8D80] italic">None</span>
                        )}
                      </td>

                      <td className="p-4">
                        <span
                          className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                            item.stock.quantity === 0
                              ? 'bg-[#FDE8E8] text-[#9B2C2C]'
                              : item.stock.quantity <= item.stock.lowStockThreshold
                              ? 'bg-[#FDE8E8] text-[#9B2C2C]'
                              : 'bg-[#E1F2E1] text-[#2D5A27]'
                          }`}
                        >
                          {item.stock.quantity} in stock
                        </span>
                        <span className="block text-[10px] text-[#7D736A] mt-0.5">
                          {item.stock.location}
                        </span>
                      </td>

                      <td className="p-4 text-right font-serif font-bold text-[#C5A059] text-sm">
                        {storeSettings.currencySymbol}{item.pricing.retailPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedItemForTag(item)}
                            className="p-1.5 rounded bg-[#FAF8F5] hover:bg-[#F2EEE9] text-[#7D736A] hover:text-[#C5A059] border border-[#D9D1C7] transition-colors cursor-pointer"
                            title="Print Boutique Tag"
                          >
                            <Tag className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onEditItem(item)}
                            className="p-1.5 rounded bg-[#FAF8F5] hover:bg-[#F2EEE9] text-[#7D736A] hover:text-[#3D3732] border border-[#D9D1C7] transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => addToCart(item)}
                            disabled={item.stock.quantity === 0}
                            className="p-1.5 rounded bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold transition-all disabled:opacity-40 cursor-pointer shadow-xs"
                            title="Add to Cart"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      {selectedItemForDetail && (
        <ItemDetailModal
          item={selectedItemForDetail}
          onClose={() => setSelectedItemForDetail(null)}
          onEdit={(item) => onEditItem(item)}
          onPrintTag={(item) => {
            setSelectedItemForDetail(null);
            setSelectedItemForTag(item);
          }}
          onOpenAI={(item) => {
            setSelectedItemForDetail(null);
            onOpenAIForValuation(item);
          }}
        />
      )}

      {selectedItemForTag && (
        <TagPrinterModal
          item={selectedItemForTag}
          onClose={() => setSelectedItemForTag(null)}
        />
      )}
    </div>
  );
};
