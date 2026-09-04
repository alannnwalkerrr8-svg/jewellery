import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Save,
  Crown,
  Calendar,
  Gem,
  Coins,
  ShieldCheck,
  User,
  DollarSign,
  Palette,
} from 'lucide-react';
import { CustomOrder, CustomOrderStatus, MetalPurity, MetalType } from '../../types';
import { useStore } from '../../context/StoreContext';

interface CustomOrderFormModalProps {
  orderToEdit?: CustomOrder | null;
  onClose: () => void;
  onOpenAIForIdea?: (concept: string, customer: string) => void;
}

export const CustomOrderFormModal: React.FC<CustomOrderFormModalProps> = ({
  orderToEdit,
  onClose,
  onOpenAIForIdea,
}) => {
  const { addCustomOrder, updateCustomOrder, customers, storeSettings } = useStore();

  const [orderNumber, setOrderNumber] = useState(
    orderToEdit?.orderNumber || `BESPOKE-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`
  );
  const [selectedCustomerId, setSelectedCustomerId] = useState(orderToEdit?.customerId || '');
  const [customerName, setCustomerName] = useState(orderToEdit?.customerName || 'Lady Evelyn Vance');
  const [customerPhone, setCustomerPhone] = useState(orderToEdit?.customerPhone || '+1 (212) 555-0192');
  const [customerEmail, setCustomerEmail] = useState(orderToEdit?.customerEmail || 'evelyn.vance@vanceholdings.com');

  const [title, setTitle] = useState(orderToEdit?.title || 'Custom 3.0ct Oval Diamond Engagement Ring with Hidden Halo');
  const [category, setCategory] = useState(orderToEdit?.category || 'Rings');
  const [metalPreference, setMetalPreference] = useState(orderToEdit?.metalPreference || 'Platinum Pt950');
  const [gemstonePreference, setGemstonePreference] = useState(orderToEdit?.gemstonePreference || '3.0ct Oval Diamond (F/VVS1) + 0.40ct pavé diamonds');
  const [designNotes, setDesignNotes] = useState(
    orderToEdit?.designNotes || 'Client desires a delicate micro-pavé band with a hidden gallery halo. Platinum prongs with double-claw tips.'
  );
  const [imageUrl, setImageUrl] = useState(
    orderToEdit?.referenceImages[0] ||
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'
  );

  const [status, setStatus] = useState<CustomOrderStatus>(orderToEdit?.status || 'Consultation');
  const [priority, setPriority] = useState<'Standard' | 'Rush' | 'VIP Haute'>(orderToEdit?.priority || 'VIP Haute');
  const [deadline, setDeadline] = useState(
    orderToEdit?.deadline || new Date(Date.now() + 21 * 86400000).toISOString().split('T')[0]
  );
  const [goldsmithAssignee, setGoldsmithAssignee] = useState(orderToEdit?.goldsmithAssignee || 'Master Goldsmith Pierre Laurent');

  const [estimatedCost, setEstimatedCost] = useState(orderToEdit?.estimatedCost?.toString() || '6500');
  const [quotedPrice, setQuotedPrice] = useState(orderToEdit?.quotedPrice?.toString() || '11800');
  const [advanceDeposit, setAdvanceDeposit] = useState(orderToEdit?.advanceDeposit?.toString() || '5000');

  const handleCustomerSelect = (cId: string) => {
    setSelectedCustomerId(cId);
    const found = customers.find((c) => c.id === cId);
    if (found) {
      setCustomerName(`${found.firstName} ${found.lastName}`);
      setCustomerPhone(found.phone);
      setCustomerEmail(found.email);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const estCost = parseFloat(estimatedCost) || 0;
    const qPrice = parseFloat(quotedPrice) || 0;
    const advDeposit = parseFloat(advanceDeposit) || 0;

    const orderData: Omit<CustomOrder, 'id' | 'createdDate' | 'milestones'> = {
      orderNumber,
      customerId: selectedCustomerId || 'cust-direct',
      customerName,
      customerPhone,
      customerEmail,
      title,
      category,
      metalPreference,
      gemstonePreference,
      designNotes,
      referenceImages: [imageUrl],
      status,
      priority,
      deadline,
      estimatedCost: estCost,
      quotedPrice: qPrice,
      advanceDeposit: advDeposit,
      balanceDue: Math.max(0, qPrice - advDeposit),
      goldsmithAssignee,
    };

    if (orderToEdit) {
      updateCustomOrder(orderToEdit.id, orderData);
    } else {
      addCustomOrder(orderData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#3D3732]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl max-w-3xl w-full shadow-2xl text-[#3D3732] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#EBE5DE] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#C5A059] border border-[#C5A059]/40">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic text-lg font-bold text-[#4A433F]">
                {orderToEdit ? `Edit Bespoke Order: ${orderToEdit.orderNumber}` : 'Commission New Bespoke Jewelry'}
              </h3>
              <p className="text-xs text-[#7D736A]">
                Manage client specifications, atelier milestone workflows, deposits, and goldsmith assignees.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7D736A] hover:text-[#3D3732] hover:bg-[#FAF8F5] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Order Details Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Bespoke Order #
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#C5A059] font-mono focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Workflow Stage
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CustomOrderStatus)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#A67C2E] font-semibold focus:outline-none focus:border-[#C5A059]"
              >
                <option value="Consultation">1. Consultation & Sketches</option>
                <option value="CAD Design">2. CAD 3D Modeling</option>
                <option value="Wax & Casting">3. Wax & Precious Casting</option>
                <option value="Stone Setting">4. Stone Setting & Hallmarking</option>
                <option value="Polishing">5. Final High Polish</option>
                <option value="Quality Inspection">6. Quality Assay & Appraisal</option>
                <option value="Ready for Pickup">7. Ready for Client Pickup</option>
                <option value="Delivered">8. Delivered & Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Commission Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
              >
                <option value="VIP Haute">VIP Haute Joaillerie</option>
                <option value="Rush">Rush Order (Express Delivery)</option>
                <option value="Standard">Standard Atelier Timeline</option>
              </select>
            </div>
          </div>

          {/* Customer CRM info */}
          <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#EBE5DE]">
              <span className="text-xs font-semibold text-[#4A433F] flex items-center gap-1.5 font-serif italic">
                <User className="w-3.5 h-3.5 text-[#C5A059]" />
                Client Account Details
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[#7D736A] mb-1">Choose Existing Client</label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => handleCustomerSelect(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="">New / Direct Client</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.firstName} {c.lastName} ({c.tier})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#7D736A] mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-[#7D736A] mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>
          </div>

          {/* Jewelry Specifications */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Custom Commission Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Art Deco Sapphire & Diamond Tiara Ring in Platinum"
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#4A433F] mb-1">
                  Metal Specifications & Purity
                </label>
                <input
                  type="text"
                  value={metalPreference}
                  onChange={(e) => setMetalPreference(e.target.value)}
                  placeholder="e.g. Platinum Pt950 or 18K Rose Gold"
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#A67C2E] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A433F] mb-1">
                  Gemstone & Diamond Specifications
                </label>
                <input
                  type="text"
                  value={gemstonePreference}
                  onChange={(e) => setGemstonePreference(e.target.value)}
                  placeholder="e.g. 2.5ct GIA Certified Radiant Diamond (E/VVS2)"
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#4A433F] mb-1">
                  Target Completion / Delivery Date
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A433F] mb-1">
                  Lead Goldsmith / Master Artisan
                </label>
                <input
                  type="text"
                  value={goldsmithAssignee}
                  onChange={(e) => setGoldsmithAssignee(e.target.value)}
                  placeholder="e.g. Master Goldsmith Pierre Laurent"
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-[#4A433F]">
                  Atelier Workshop Instructions & Client Notes
                </label>
                {onOpenAIForIdea && (
                  <button
                    type="button"
                    onClick={() => onOpenAIForIdea(title, customerName)}
                    className="text-[11px] text-[#C5A059] hover:text-[#A67C2E] flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Sparkles className="w-3 h-3" />
                    Bespoke Design Brief Generator
                  </button>
                )}
              </div>
              <textarea
                rows={3}
                value={designNotes}
                onChange={(e) => setDesignNotes(e.target.value)}
                placeholder="Specific finger size, engraving text, claw setting thickness, gallery accents..."
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Reference Sketch / CAD Render URL
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
                    className="w-10 h-10 rounded-xl object-cover border border-[#D9D1C7]"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Pricing & Deposit */}
          <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl space-y-3">
            <span className="text-xs font-semibold text-[#4A433F] block pb-2 border-b border-[#EBE5DE] font-serif italic">
              Financial Estimation & Client Deposit
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[#7D736A] mb-1">Atelier Cost Estimate ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-[#A67C2E] font-bold mb-1">Quoted Client Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={quotedPrice}
                  onChange={(e) => setQuotedPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFFFF] border-2 border-[#C5A059] rounded-xl text-[#C5A059] font-bold font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#2D5A27] font-semibold mb-1">Advance Deposit Paid ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={advanceDeposit}
                  onChange={(e) => setAdvanceDeposit(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#2D5A27] font-mono focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-2 text-[#7D736A]">
              <span>Remaining Balance Upon Collection:</span>
              <strong className="text-[#C5A059] font-serif text-sm">
                ${(Math.max(0, (parseFloat(quotedPrice) || 0) - (parseFloat(advanceDeposit) || 0))).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </strong>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-[#EBE5DE] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EBE5DE] text-[#635B53] text-xs font-medium cursor-pointer transition-colors border border-[#D9D1C7]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{orderToEdit ? 'Update Bespoke Order' : 'Save Bespoke Commission'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
