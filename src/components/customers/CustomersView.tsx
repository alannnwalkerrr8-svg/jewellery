import React, { useState, useMemo } from 'react';
import {
  Users,
  Plus,
  Search,
  Crown,
  Phone,
  Mail,
  Heart,
  Calendar,
  DollarSign,
  ChevronRight,
  Edit,
  Trash2,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { Customer, CustomerTier } from '../../types';
import { useStore } from '../../context/StoreContext';
import { CustomerDetailModal } from './CustomerDetailModal';

interface CustomersViewProps {
  onOpenNewCustomer: () => void;
  onEditCustomer: (customer: Customer) => void;
  onOpenInvoice: (invoice: any) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({
  onOpenNewCustomer,
  onEditCustomer,
  onOpenInvoice,
}) => {
  const { customers, storeSettings, globalSearch } = useStore();

  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedCustomerForDetail, setSelectedCustomerForDetail] = useState<Customer | null>(null);

  const tiers: string[] = ['All', 'Diamond Elite', 'Platinum VIP', 'Gold Member', 'Silver Classic', 'Royal Circle'];

  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      if (globalSearch) {
        const q = globalSearch.toLowerCase();
        const fullName = `${cust.firstName} ${cust.lastName}`.toLowerCase();
        const matchCode = cust.code?.toLowerCase().includes(q);
        const matchPhone = cust.phone?.toLowerCase().includes(q);
        const matchEmail = cust.email?.toLowerCase().includes(q);
        if (!fullName.includes(q) && !matchCode && !matchPhone && !matchEmail) return false;
      }

      if (selectedTier !== 'All' && cust.tier !== selectedTier) {
        return false;
      }

      return true;
    });
  }, [customers, globalSearch, selectedTier]);

  const totalLifetimeSpent = customers.reduce(
    (acc, curr) => acc + (curr.totalSpent ?? curr.totalSpend ?? 0),
    0
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#EBE5DE] border border-[#D9D1C7] p-5 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-[#A67C2E] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30">
              Private Client CRM
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#D9D1C7] text-[#635B53] font-mono">
              {filteredCustomers.length} VIP Profiles
            </span>
          </div>
          <h1 className="font-serif italic text-2xl font-bold text-[#4A433F] mt-1">
            VIP Customer Database & Dossiers
          </h1>
          <p className="text-xs text-[#7D736A] mt-0.5">
            Secure client histories, ring sizing, anniversary gifting reminders, and luxury loyalty rewards.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#FAF8F5] px-4 py-2 rounded-xl border border-[#D9D1C7] text-right shadow-2xs">
            <span className="text-[10px] text-[#7D736A] uppercase font-medium block">
              Cumulative Client Volume
            </span>
            <span className="text-sm font-bold text-[#4A433F] font-serif">
              {storeSettings.currencySymbol}{totalLifetimeSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>

          <button
            id="btn-add-customer"
            onClick={onOpenNewCustomer}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold text-xs shadow-xs cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Register VIP Client</span>
          </button>
        </div>
      </div>

      {/* Tier Filter Tabs */}
      <div className="bg-[#FFFFFF] border border-[#D9D1C7] p-3 rounded-2xl shadow-xs overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {tiers.map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                selectedTier === tier
                  ? 'bg-[#C5A059] text-white font-semibold shadow-xs'
                  : 'bg-[#FAF8F5] hover:bg-[#F2EEE9] text-[#635B53] border border-[#EBE5DE]'
              }`}
            >
              {tier} {tier !== 'All' && `(${customers.filter((c) => c.tier === tier).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCustomers.map((customer) => {
          const tierColors: Record<string, string> = {
            'Diamond Elite': 'bg-[#FAF8F5] text-[#A67C2E] border-[#C5A059]',
            'Royal Circle': 'bg-[#FAF8F5] text-[#A67C2E] border-[#C5A059]',
            'Platinum VIP': 'bg-[#F2E8FA] text-[#6B21A8] border-[#E9D5FF]',
            'Gold Member': 'bg-[#FAF8F5] text-[#C5A059] border-[#C5A059]/40',
            Gold: 'bg-[#FAF8F5] text-[#C5A059] border-[#C5A059]/40',
            'Silver Classic': 'bg-[#FAF8F5] text-[#635B53] border-[#D9D1C7]',
            Silver: 'bg-[#FAF8F5] text-[#635B53] border-[#D9D1C7]',
            Standard: 'bg-[#FAF8F5] text-[#7D736A] border-[#EBE5DE]',
          };

          const colorClass = tierColors[customer.tier] || 'bg-[#FAF8F5] text-[#7D736A] border-[#D9D1C7]';
          const spend = customer.totalSpent ?? customer.totalSpend ?? 0;

          return (
            <div
              key={customer.id}
              className="bg-[#FFFFFF] border border-[#D9D1C7] hover:border-[#C5A059] rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                {/* Top Avatar & Tier */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#FAF8F5] border border-[#D9D1C7] flex items-center justify-center font-serif text-sm font-bold text-[#C5A059] group-hover:border-[#C5A059] transition-colors shadow-2xs">
                      {customer.firstName?.[0] || 'C'}
                      {customer.lastName?.[0] || ''}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#C5A059] font-bold block">
                        {customer.code}
                      </span>
                      <h3
                        onClick={() => setSelectedCustomerForDetail(customer)}
                        className="font-serif italic text-sm font-bold text-[#4A433F] hover:text-[#C5A059] cursor-pointer line-clamp-1 transition-colors"
                      >
                        {customer.firstName} {customer.lastName}
                      </h3>
                    </div>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${colorClass}`}>
                    {customer.tier}
                  </span>
                </div>

                {/* Contact info */}
                <div className="mt-3 space-y-1 text-xs text-[#7D736A] bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EBE5DE]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-[#9C8D80] shrink-0" />
                    <span className="font-mono text-[#3D3732]">{customer.phone}</span>
                  </div>
                  {customer.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-[#9C8D80] shrink-0" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                  )}
                </div>

                {/* Sizing & Milestones */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#FAF8F5] p-2 rounded-xl border border-[#EBE5DE]">
                    <span className="text-[10px] text-[#7D736A] block">RING SIZE:</span>
                    <strong className="text-[#A67C2E]">{customer.preferences?.ringSize || 'N/A'}</strong>
                  </div>

                  <div className="bg-[#FAF8F5] p-2 rounded-xl border border-[#EBE5DE]">
                    <span className="text-[10px] text-[#7D736A] block">ANNIVERSARY:</span>
                    <strong className="text-[#4A433F] truncate block">
                      {customer.preferences?.anniversary || 'Not set'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Bottom Spend & Actions */}
              <div className="pt-3 border-t border-[#EBE5DE] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#7D736A] block">Lifetime Spend:</span>
                  <span className="font-serif font-bold text-[#C5A059] text-sm">
                    {storeSettings.currencySymbol}{spend.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEditCustomer(customer)}
                    className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2EEE9] text-[#635B53] hover:text-[#3D3732] border border-[#D9D1C7] cursor-pointer"
                    title="Edit Profile"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setSelectedCustomerForDetail(customer)}
                    className="px-3 py-1.5 rounded-lg bg-[#C5A059]/15 hover:bg-[#C5A059]/25 text-[#A67C2E] font-semibold border border-[#C5A059]/30 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Dossier</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customer Detail Dossier Modal */}
      {selectedCustomerForDetail && (
        <CustomerDetailModal
          customer={selectedCustomerForDetail}
          onClose={() => setSelectedCustomerForDetail(null)}
          onEdit={(c) => onEditCustomer(c)}
          onOpenInvoice={(inv) => onOpenInvoice(inv)}
        />
      )}
    </div>
  );
};
