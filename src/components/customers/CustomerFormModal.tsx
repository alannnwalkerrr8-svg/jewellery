import React, { useState } from 'react';
import {
  X,
  User,
  Crown,
  Heart,
  Calendar,
  Save,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Customer, CustomerTier } from '../../types';
import { useStore } from '../../context/StoreContext';

interface CustomerFormModalProps {
  customerToEdit?: Customer | null;
  onClose: () => void;
}

export const CustomerFormModal: React.FC<CustomerFormModalProps> = ({
  customerToEdit,
  onClose,
}) => {
  const { addCustomer, updateCustomer } = useStore();

  const [code, setCode] = useState(
    customerToEdit?.code || `VIP-${Math.floor(1000 + Math.random() * 9000)}`
  );
  const [firstName, setFirstName] = useState(customerToEdit?.firstName || '');
  const [lastName, setLastName] = useState(customerToEdit?.lastName || '');
  const [email, setEmail] = useState(customerToEdit?.email || '');
  const [phone, setPhone] = useState(customerToEdit?.phone || '');
  const [tier, setTier] = useState<CustomerTier>(customerToEdit?.tier || 'Gold Member');

  // Address
  const [street, setStreet] = useState(customerToEdit?.address?.street || '');
  const [city, setCity] = useState(customerToEdit?.address?.city || '');
  const [state, setState] = useState(customerToEdit?.address?.state || '');
  const [postalCode, setPostalCode] = useState(customerToEdit?.address?.postalCode || '');
  const [country, setCountry] = useState(customerToEdit?.address?.country || 'USA');

  // Preferences & Dates
  const [ringSize, setRingSize] = useState(customerToEdit?.preferences?.ringSize || 'US 7.0');
  const [wristSize, setWristSize] = useState(customerToEdit?.preferences?.wristSize || '6.5 inches');
  const [preferredMetals, setPreferredMetals] = useState(
    customerToEdit?.preferences?.preferredMetals?.join(', ') || 'Platinum, 18K Yellow Gold'
  );
  const [preferredStones, setPreferredStones] = useState(
    customerToEdit?.preferences?.preferredStones?.join(', ') || 'Diamond, Emerald, Sapphire'
  );
  const [birthday, setBirthday] = useState(customerToEdit?.preferences?.birthday || '');
  const [anniversary, setAnniversary] = useState(customerToEdit?.preferences?.anniversary || '');
  const [notes, setNotes] = useState(
    customerToEdit?.notes || customerToEdit?.preferences?.notes || 'Collector of high jewelry solitaires. Prefers private salon viewings.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const custData = {
      firstName,
      lastName,
      email,
      phone,
      tier,
      address: {
        street,
        city,
        state,
        postalCode,
        country,
      },
      preferences: {
        ringSize,
        wristSize,
        preferredMetals: preferredMetals.split(',').map((m) => m.trim()).filter(Boolean) as any,
        preferredStones: preferredStones.split(',').map((s) => s.trim()).filter(Boolean),
        favoriteGemstones: preferredStones.split(',').map((s) => s.trim()).filter(Boolean) as any,
        birthday,
        anniversary,
        notes,
      },
      loyaltyPoints: customerToEdit?.loyaltyPoints || 500,
      notes,
    };

    if (customerToEdit) {
      updateCustomer(customerToEdit.id, custData);
    } else {
      addCustomer(custData);
    }

    onClose();
  };

  const tiers: CustomerTier[] = ['Diamond Elite', 'Platinum VIP', 'Gold Member', 'Silver Classic', 'Royal Circle'];

  return (
    <div className="fixed inset-0 z-50 bg-[#3D3732]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl max-w-2xl w-full shadow-2xl text-[#3D3732] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#EBE5DE] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#C5A059] border border-[#C5A059]/40">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic text-lg font-bold text-[#4A433F]">
                {customerToEdit ? `Edit Client Profile: ${customerToEdit.firstName} ${customerToEdit.lastName}` : 'Register New VIP Client Dossier'}
              </h3>
              <p className="text-xs text-[#7D736A]">
                Secure customer database with anniversary tracking, ring sizes, and luxury preferences.
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Client Code *
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#C5A059] font-mono focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                VIP Membership Tier
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as CustomerTier)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#A67C2E] font-bold focus:outline-none focus:border-[#C5A059]"
              >
                {tiers.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Loyalty Points
              </label>
              <input
                type="number"
                disabled
                value={customerToEdit?.loyaltyPoints || 500}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#7D736A] font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                First Name *
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Last / Family Name *
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@luxury.com"
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Phone / Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] font-mono focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          {/* Sizing & Bespoke Preferences */}
          <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl space-y-3">
            <span className="text-xs font-semibold text-[#A67C2E] flex items-center gap-1.5 pb-2 border-b border-[#EBE5DE] font-serif italic">
              <Heart className="w-3.5 h-3.5 text-[#C5A059]" />
              Sizing & Bespoke Preferences
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[#7D736A] mb-1">Exact Ring Size</label>
                <input
                  type="text"
                  value={ringSize}
                  onChange={(e) => setRingSize(e.target.value)}
                  placeholder="US 6.5 / EU 53"
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-[#7D736A] mb-1">Wrist / Bracelet Size</label>
                <input
                  type="text"
                  value={wristSize}
                  onChange={(e) => setWristSize(e.target.value)}
                  placeholder="6.5 inches"
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[#7D736A] mb-1">Preferred Precious Metals</label>
                <input
                  type="text"
                  value={preferredMetals}
                  onChange={(e) => setPreferredMetals(e.target.value)}
                  placeholder="Platinum, 18K Yellow Gold"
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#A67C2E] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-[#7D736A] mb-1">Favorite Gemstones</label>
                <input
                  type="text"
                  value={preferredStones}
                  onChange={(e) => setPreferredStones(e.target.value)}
                  placeholder="Diamond, Emerald, Sapphire"
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>
          </div>

          {/* Milestones & Special Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Client Birthday (Gifting Reminders)
              </label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A433F] mb-1">
                Wedding Anniversary Date
              </label>
              <input
                type="date"
                value={anniversary}
                onChange={(e) => setAnniversary(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732]"
              />
            </div>
          </div>

          {/* Concierge Notes */}
          <div>
            <label className="block text-xs font-medium text-[#4A433F] mb-1">
              Private Concierge & Salon Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="High net worth preferences, family heirlooms, champagne preferences..."
              className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
            />
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
              <span>{customerToEdit ? 'Save Changes' : 'Register VIP Client'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
