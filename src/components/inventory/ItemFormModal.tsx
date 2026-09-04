import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Calculator,
  Gem,
  Coins,
  ShieldCheck,
  Sparkles,
  Save,
  Image as ImageIcon,
} from 'lucide-react';
import {
  DiamondClarity,
  DiamondColor,
  DiamondCut,
  GemstoneDetail,
  GemstoneType,
  JewelryCategory,
  JewelryItem,
  MetalPurity,
  MetalType,
} from '../../types';
import { useStore } from '../../context/StoreContext';

interface ItemFormModalProps {
  itemToEdit?: JewelryItem | null;
  onClose: () => void;
  onOpenAIForDescription?: (name: string, category: string, metal: string, stones: string) => void;
}

export const ItemFormModal: React.FC<ItemFormModalProps> = ({
  itemToEdit,
  onClose,
  onOpenAIForDescription,
}) => {
  const { addInventoryItem, updateInventoryItem, metalRates, storeSettings } = useStore();

  const [activeTab, setActiveTab] = useState<'basic' | 'metal' | 'stones' | 'pricing' | 'stock'>('basic');

  // Basic Info State
  const [name, setName] = useState(itemToEdit?.name || '');
  const [sku, setSku] = useState(itemToEdit?.sku || `JW-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  const [barcode, setBarcode] = useState(itemToEdit?.barcode || `890100${Math.floor(100000 + Math.random() * 900000)}`);
  const [category, setCategory] = useState<JewelryCategory>(itemToEdit?.category || 'Rings');
  const [collection, setCollection] = useState(itemToEdit?.collection || 'Haute Joaillerie');
  const [status, setStatus] = useState<JewelryItem['status']>(itemToEdit?.status || 'In Stock');
  const [description, setDescription] = useState(itemToEdit?.description || '');
  const [imageUrl, setImageUrl] = useState(
    itemToEdit?.images[0] ||
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'
  );
  const [tagsInput, setTagsInput] = useState(itemToEdit?.tags.join(', ') || 'Fine Jewelry, Certified');

  // Metal State
  const [metalType, setMetalType] = useState<MetalType>(itemToEdit?.metal.type || '18K (75.0%)' ? 'Yellow Gold' : 'Platinum');
  const [metalPurity, setMetalPurity] = useState<MetalPurity>(itemToEdit?.metal.purity || '18K (75.0%)');
  const [grossWeight, setGrossWeight] = useState(itemToEdit?.metal.grossWeightGrams?.toString() || '8.5');
  const [netWeight, setNetWeight] = useState(itemToEdit?.metal.netWeightGrams?.toString() || '7.8');

  // Stones State
  const [stones, setStones] = useState<GemstoneDetail[]>(
    itemToEdit?.stones || [
      {
        id: `st-${Date.now()}`,
        type: 'Diamond',
        caratWeight: 1.5,
        pieces: 1,
        cut: 'Round Brilliant',
        color: 'E',
        clarity: 'VVS1',
        settingType: 'Prong',
        certAuthority: 'GIA',
        certNumber: `GIA-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      },
    ]
  );

  // Pricing State
  const [metalCost, setMetalCost] = useState(itemToEdit?.pricing.metalCost?.toString() || '500');
  const [gemstoneCost, setGemstoneCost] = useState(itemToEdit?.pricing.gemstoneCost?.toString() || '3500');
  const [makingCharges, setMakingCharges] = useState(itemToEdit?.pricing.makingCharges?.toString() || '600');
  const [markupPercent, setMarkupPercent] = useState(itemToEdit?.pricing.markupPercentage?.toString() || '35');
  const [retailPrice, setRetailPrice] = useState(itemToEdit?.pricing.retailPrice?.toString() || '6200');
  const [taxRate, setTaxRate] = useState(itemToEdit?.pricing.taxRate?.toString() || storeSettings.taxRate.toString());

  // Stock State
  const [quantity, setQuantity] = useState(itemToEdit?.stock.quantity?.toString() || '1');
  const [lowStockThreshold, setLowStockThreshold] = useState(itemToEdit?.stock.lowStockThreshold?.toString() || '1');
  const [location, setLocation] = useState(itemToEdit?.stock.location || 'Showcase Vitrine 1');
  const [size, setSize] = useState(itemToEdit?.stock.size || 'US 7.0');
  const [hallmarked, setHallmarked] = useState(itemToEdit?.stock.hallmarked ?? true);
  const [hallmarkCode, setHallmarkCode] = useState(itemToEdit?.stock.hallmarkCode || '750-AU-NY');

  // Helper: Auto-calculate metal cost based on live rates
  const handleAutoCalculateMetalCost = () => {
    const net = parseFloat(netWeight) || 0;
    let rate = metalRates.gold18k;
    if (metalPurity.includes('24K')) rate = metalRates.gold24k;
    else if (metalPurity.includes('22K')) rate = metalRates.gold22k;
    else if (metalPurity.includes('18K')) rate = metalRates.gold18k;
    else if (metalPurity.includes('14K')) rate = metalRates.gold14k;
    else if (metalPurity.includes('Pt950') || metalPurity.includes('Pt900')) rate = metalRates.platinum950;
    else if (metalPurity.includes('925') || metalPurity.includes('Silver')) rate = metalRates.silver925;

    const calcCost = Number((net * rate).toFixed(2));
    setMetalCost(calcCost.toString());

    // Auto-update retail price
    const gCost = parseFloat(gemstoneCost) || 0;
    const mCharges = parseFloat(makingCharges) || 0;
    const totalCost = calcCost + gCost + mCharges;
    const markup = parseFloat(markupPercent) || 35;
    const calcRetail = Number((totalCost * (1 + markup / 100)).toFixed(2));
    setRetailPrice(calcRetail.toString());
  };

  // Helper: Auto-calculate retail price from costs + markup
  const handleRecalculateRetailPrice = () => {
    const mCost = parseFloat(metalCost) || 0;
    const gCost = parseFloat(gemstoneCost) || 0;
    const mCharges = parseFloat(makingCharges) || 0;
    const totalCost = mCost + gCost + mCharges;
    const markup = parseFloat(markupPercent) || 35;
    const calcRetail = Number((totalCost * (1 + markup / 100)).toFixed(2));
    setRetailPrice(calcRetail.toString());
  };

  // Stones manipulation
  const handleAddStone = () => {
    setStones([
      ...stones,
      {
        id: `st-${Date.now()}`,
        type: 'Diamond',
        caratWeight: 0.1,
        pieces: 1,
        cut: 'Round Brilliant',
        color: 'G',
        clarity: 'VS1',
        settingType: 'Pavé',
      },
    ]);
  };

  const handleUpdateStone = (index: number, updates: Partial<GemstoneDetail>) => {
    setStones(stones.map((st, idx) => (idx === index ? { ...st, ...updates } : st)));
  };

  const handleRemoveStone = (index: number) => {
    setStones(stones.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mCost = parseFloat(metalCost) || 0;
    const gCost = parseFloat(gemstoneCost) || 0;
    const mCharges = parseFloat(makingCharges) || 0;
    const cost = mCost + gCost + mCharges;
    const retail = parseFloat(retailPrice) || cost * 1.35;

    const itemData: Omit<JewelryItem, 'id' | 'createdDate' | 'updatedDate'> = {
      sku,
      barcode,
      name,
      category,
      collection,
      metal: {
        type: metalType,
        purity: metalPurity,
        grossWeightGrams: parseFloat(grossWeight) || 0,
        netWeightGrams: parseFloat(netWeight) || 0,
        metalRatePerGram: metalRates.gold18k,
      },
      stones,
      pricing: {
        metalCost: mCost,
        gemstoneCost: gCost,
        makingCharges: mCharges,
        markupPercentage: parseFloat(markupPercent) || 35,
        costPrice: Number(cost.toFixed(2)),
        retailPrice: Number(retail.toFixed(2)),
        taxRate: parseFloat(taxRate) || storeSettings.taxRate,
      },
      stock: {
        quantity: parseInt(quantity, 10) || 1,
        lowStockThreshold: parseInt(lowStockThreshold, 10) || 1,
        location,
        hallmarked,
        hallmarkCode,
        size,
      },
      images: [imageUrl],
      status,
      description,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
    };

    if (itemToEdit) {
      updateInventoryItem(itemToEdit.id, itemData);
    } else {
      addInventoryItem(itemData);
    }

    onClose();
  };

  const categories: JewelryCategory[] = [
    'Rings',
    'Necklaces',
    'Bracelets',
    'Earrings',
    'Pendants',
    'Watches',
    'Loose Gemstones',
    'Bullion & Coins',
    'Sets & Collections',
  ];

  const metalTypes: MetalType[] = [
    'Yellow Gold',
    'White Gold',
    'Rose Gold',
    'Platinum',
    'Sterling Silver',
    'Titanium',
    'Two-Tone Gold',
  ];

  const metalPurities: MetalPurity[] = [
    '24K (99.9%)',
    '22K (91.6%)',
    '18K (75.0%)',
    '14K (58.5%)',
    '10K (41.7%)',
    'Pt950 (95.0%)',
    'Pt900 (90.0%)',
    'Ag925 (92.5%)',
    'Fine Silver (99.9%)',
  ];

  const cuts: DiamondCut[] = [
    'Round Brilliant',
    'Princess',
    'Emerald Cut',
    'Oval',
    'Cushion',
    'Marquise',
    'Pear',
    'Radiant',
    'Asscher',
    'Heart',
    'N/A',
  ];

  const colors: DiamondColor[] = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K-M', 'Fancy Vivid', 'N/A'];
  const clarities: DiamondClarity[] = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'N/A'];

  return (
    <div className="fixed inset-0 z-50 bg-[#3D3732]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl max-w-3xl w-full shadow-2xl text-[#3D3732] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#EBE5DE] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#C5A059] border border-[#C5A059]/40">
              <Gem className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic text-lg font-bold text-[#4A433F]">
                {itemToEdit ? `Edit Jewelry: ${itemToEdit.name}` : 'Register New Jewelry Piece'}
              </h3>
              <p className="text-xs text-[#7D736A]">
                Complete precious metal specs, diamond 4Cs, pricing matrices, and inventory control.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7D736A] hover:text-[#3D3732] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#EBE5DE] bg-[#FAF8F5]/80 px-5 gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'basic', label: '1. Basic Info' },
            { id: 'metal', label: '2. Precious Metal' },
            { id: 'stones', label: `3. Gemstones (${stones.length})` },
            { id: 'pricing', label: '4. Costing & Pricing' },
            { id: 'stock', label: '5. Stock & Hallmarking' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 text-xs font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
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
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* TAB 1: BASIC INFO */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    Jewelry Title / Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Celestial Crown 2.50ct Diamond Solitaire Ring"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as JewelryCategory)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#C5A059] font-mono focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    Barcode / Tag #
                  </label>
                  <input
                    type="text"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#635B53] font-mono focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    Collection / Line
                  </label>
                  <input
                    type="text"
                    value={collection}
                    onChange={(e) => setCollection(e.target.value)}
                    placeholder="e.g. Imperial Heritage"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    Image URL (High Resolution)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://..."
                      className="flex-1 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                    />
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-10 h-10 rounded-xl object-cover border border-[#D9D1C7] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Bridal, GIA Certified, Solitaire"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-[#4A433F]">
                    Product Narrative / Luxury Description
                  </label>
                  {onOpenAIForDescription && (
                    <button
                      type="button"
                      onClick={() =>
                        onOpenAIForDescription(
                          name || 'Fine Ring',
                          category,
                          `${metalType} ${metalPurity}`,
                          stones.map((s) => `${s.caratWeight}ct ${s.cut} ${s.type}`).join(', ')
                        )
                      }
                      className="text-[11px] text-[#A67C2E] hover:text-[#8C621E] flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Sparkles className="w-3 h-3 text-[#C5A059]" />
                      Generate with Gemini AI
                    </button>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Evocative description highlighting diamond cut, origin, hand craftsmanship, setting..."
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>
          )}

          {/* TAB 2: METAL SPECS */}
          {activeTab === 'metal' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#A67C2E]">
                  <Coins className="w-4 h-4 text-[#C5A059]" />
                  <span>
                    Live 24K: <strong>${metalRates.gold24k}/g</strong> • 18K: <strong>${metalRates.gold18k}/g</strong> • Pt950: <strong>${metalRates.platinum950}/g</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAutoCalculateMetalCost}
                  className="text-xs px-3 py-1.5 bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold rounded-xl flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  Auto-Calc Metal Cost
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    Precious Metal Type
                  </label>
                  <select
                    value={metalType}
                    onChange={(e) => setMetalType(e.target.value as MetalType)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                  >
                    {metalTypes.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    Metal Purity
                  </label>
                  <select
                    value={metalPurity}
                    onChange={(e) => setMetalPurity(e.target.value as MetalPurity)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#A67C2E] font-semibold focus:outline-none focus:border-[#C5A059]"
                  >
                    {metalPurities.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    Gross Weight (Grams)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={grossWeight}
                    onChange={(e) => setGrossWeight(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                  />
                  <span className="text-[10px] text-[#7D736A]">Total weight including gemstones</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    Net Metal Weight (Grams)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={netWeight}
                    onChange={(e) => setNetWeight(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#A67C2E] font-semibold focus:outline-none focus:border-[#C5A059]"
                  />
                  <span className="text-[10px] text-[#7D736A]">Pure metal weight used for live value calculation</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GEMSTONES 4Cs */}
          {activeTab === 'stones' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#4A433F] font-medium font-serif italic">
                  Diamond & Colored Gemstone Registry (4Cs & Certs)
                </span>
                <button
                  type="button"
                  onClick={handleAddStone}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EBE5DE] text-[#A67C2E] border border-[#D9D1C7] text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
                  Add Gemstone / Diamond
                </button>
              </div>

              {stones.length === 0 ? (
                <div className="p-8 text-center bg-[#FAF8F5] rounded-2xl border border-[#D9D1C7] text-[#7D736A] text-xs">
                  No gemstones attached to this piece (All-metal or Bullion item).
                </div>
              ) : (
                <div className="space-y-3">
                  {stones.map((stone, idx) => (
                    <div
                      key={stone.id || idx}
                      className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl space-y-3 relative"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[#EBE5DE]">
                        <span className="text-xs font-bold text-[#A67C2E] flex items-center gap-1.5 font-serif italic">
                          <Gem className="w-3.5 h-3.5 text-[#C5A059]" />
                          Stone #{idx + 1}: {stone.type} ({stone.caratWeight}ct)
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveStone(idx)}
                          className="text-[#9E4A40] hover:text-[#7A362E] p-1 rounded-lg hover:bg-[#FAF8F5] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div>
                          <label className="block text-[10px] text-[#7D736A]">Gemstone Type</label>
                          <select
                            value={stone.type}
                            onChange={(e) => handleUpdateStone(idx, { type: e.target.value as GemstoneType })}
                            className="w-full px-2 py-1 text-xs bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732]"
                          >
                            <option value="Diamond">Diamond</option>
                            <option value="Blue Sapphire">Blue Sapphire</option>
                            <option value="Emerald">Emerald</option>
                            <option value="Ruby">Ruby</option>
                            <option value="Yellow Sapphire">Yellow Sapphire</option>
                            <option value="Pearl">Pearl</option>
                            <option value="Tanzanite">Tanzanite</option>
                            <option value="Opal">Opal</option>
                            <option value="Moissanite">Moissanite</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] text-[#7D736A]">Carat Weight (ct)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={stone.caratWeight}
                            onChange={(e) => handleUpdateStone(idx, { caratWeight: parseFloat(e.target.value) || 0 })}
                            className="w-full px-2 py-1 text-xs bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#A67C2E] font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-[#7D736A]">Pieces / Count</label>
                          <input
                            type="number"
                            value={stone.pieces}
                            onChange={(e) => handleUpdateStone(idx, { pieces: parseInt(e.target.value, 10) || 1 })}
                            className="w-full px-2 py-1 text-xs bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-[#7D736A]">Cut Shape</label>
                          <select
                            value={stone.cut}
                            onChange={(e) => handleUpdateStone(idx, { cut: e.target.value as DiamondCut })}
                            className="w-full px-2 py-1 text-xs bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732]"
                          >
                            {cuts.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div>
                          <label className="block text-[10px] text-[#7D736A]">Color Grade</label>
                          <select
                            value={stone.color}
                            onChange={(e) => handleUpdateStone(idx, { color: e.target.value as DiamondColor })}
                            className="w-full px-2 py-1 text-xs bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732]"
                          >
                            {colors.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] text-[#7D736A]">Clarity Grade</label>
                          <select
                            value={stone.clarity}
                            onChange={(e) => handleUpdateStone(idx, { clarity: e.target.value as DiamondClarity })}
                            className="w-full px-2 py-1 text-xs bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732]"
                          >
                            {clarities.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] text-[#7D736A]">Certificate Body</label>
                          <select
                            value={stone.certAuthority || 'None'}
                            onChange={(e) => handleUpdateStone(idx, { certAuthority: e.target.value as any })}
                            className="w-full px-2 py-1 text-xs bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#5E8357] font-semibold"
                          >
                            <option value="GIA">GIA</option>
                            <option value="IGI">IGI</option>
                            <option value="HRD">HRD</option>
                            <option value="AGS">AGS</option>
                            <option value="In-House Certified">In-House Certified</option>
                            <option value="None">None</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] text-[#7D736A]">Cert # / Report ID</label>
                          <input
                            type="text"
                            value={stone.certNumber || ''}
                            onChange={(e) => handleUpdateStone(idx, { certNumber: e.target.value })}
                            placeholder="GIA-6209..."
                            className="w-full px-2 py-1 text-xs bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: COSTING & PRICING */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#EBE5DE]">
                  <span className="text-xs font-semibold text-[#4A433F] font-serif italic">
                    Boutique Costing Breakdown & Markup Matrix
                  </span>
                  <button
                    type="button"
                    onClick={handleRecalculateRetailPrice}
                    className="text-xs px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#EBE5DE] text-[#A67C2E] border border-[#D9D1C7] rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Calculator className="w-3.5 h-3.5 text-[#C5A059]" />
                    Recalculate Retail Price
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-[#7D736A] mb-1">Precious Metal Cost ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={metalCost}
                      onChange={(e) => setMetalCost(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#7D736A] mb-1">Gemstone / Diamond Cost ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={gemstoneCost}
                      onChange={(e) => setGemstoneCost(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#7D736A] mb-1">Making / Craftsmanship Fee ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={makingCharges}
                      onChange={(e) => setMakingCharges(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="block text-xs text-[#7D736A] mb-1">Target Markup (%)</label>
                    <input
                      type="number"
                      value={markupPercent}
                      onChange={(e) => setMarkupPercent(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#A67C2E] font-bold mb-1 font-serif italic">
                      Final Retail Selling Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={retailPrice}
                      onChange={(e) => setRetailPrice(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border-2 border-[#C5A059] rounded-xl text-[#A67C2E] font-bold font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#7D736A] mb-1">Tax Rate (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: STOCK & HALLMARKING */}
          {activeTab === 'stock' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    Low Stock Alert Limit
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    Inventory Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732]"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="In Display">In Display (Showcase)</option>
                    <option value="In Vault">In Vault / Safe</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                    <option value="Out for Repair">Out for Repair</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    Vault / Vitrine Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Main Display Center Vitrine A1"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A433F] mb-1">
                    Ring Size / Chain Length
                  </label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="US 7.0 / 18 inches"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732]"
                  />
                </div>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="chk-hallmarked"
                    checked={hallmarked}
                    onChange={(e) => setHallmarked(e.target.checked)}
                    className="w-4 h-4 rounded bg-white border-[#D9D1C7] text-[#C5A059] focus:ring-[#C5A059]"
                  />
                  <label htmlFor="chk-hallmarked" className="text-xs font-semibold text-[#3D3732] cursor-pointer">
                    Assay Hallmarked & Stamped in accordance with national precious metals authority
                  </label>
                </div>

                {hallmarked && (
                  <div>
                    <label className="block text-xs text-[#7D736A] mb-1">Hallmark Stamp Code</label>
                    <input
                      type="text"
                      value={hallmarkCode}
                      onChange={(e) => setHallmarkCode(e.target.value)}
                      placeholder="Pt950-LMR / 750-AU-NY"
                      className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#A67C2E] font-mono"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Save Actions */}
          <div className="pt-4 border-t border-[#EBE5DE] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EBE5DE] text-[#635B53] text-xs font-medium cursor-pointer transition-colors border border-[#D9D1C7]"
            >
              Cancel
            </button>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{itemToEdit ? 'Save Changes' : 'Register Jewelry Item'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
