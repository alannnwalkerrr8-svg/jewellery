import React from 'react';
import {
  X,
  User,
  Crown,
  Heart,
  Calendar,
  DollarSign,
  ShoppingBag,
  Receipt,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Edit,
} from 'lucide-react';
import { Customer } from '../../types';
import { useStore } from '../../context/StoreContext';

interface CustomerDetailModalProps {
  customer: Customer;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
  onOpenInvoice: (invoice: any) => void;
}

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  customer,
  onClose,
  onEdit,
  onOpenInvoice,
}) => {
  const { invoices, customOrders, storeSettings } = useStore();

  const customerInvoices = invoices.filter(
    (inv) =>
      inv.customerId === customer.id ||
      inv.customerName === `${customer.firstName} ${customer.lastName}` ||
      inv.customer?.name === `${customer.firstName} ${customer.lastName}`
  );

  const customerOrders = customOrders.filter(
    (ord) =>
      ord.customerId === customer.id ||
      ord.customerName === `${customer.firstName} ${customer.lastName}`
  );

  const totalSpent = customer.totalSpent ?? customer.totalSpend ?? 0;
  const totalPurchases = customer.totalPurchases ?? customer.totalOrders ?? customerInvoices.length;

  return (
    <div className="fixed inset-0 z-50 bg-[#3D3732]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl max-w-3xl w-full shadow-2xl text-[#3D3732] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#EBE5DE] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] font-serif text-lg font-bold">
              {customer.firstName[0]}
              {customer.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#C5A059]">{customer.code}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    customer.tier === 'Diamond Elite' || customer.tier === 'Royal Circle'
                      ? 'bg-[#FAF8F5] text-[#A67C2E] border border-[#C5A059]/40'
                      : customer.tier === 'Platinum VIP'
                      ? 'bg-[#FAF8F5] text-[#635B53] border border-[#D9D1C7]'
                      : 'bg-[#FAF8F5] text-[#7D736A] border border-[#D9D1C7]'
                  }`}
                >
                  {customer.tier}
                </span>
              </div>
              <h2 className="font-serif italic text-xl font-bold text-[#4A433F] mt-0.5">
                {customer.firstName} {customer.lastName}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onEdit(customer);
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#3D3732] text-xs font-medium border border-[#D9D1C7] flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Dossier</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-[#7D736A] hover:text-[#3D3732] cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl">
              <span className="text-[10px] text-[#7D736A] uppercase font-medium block">
                Total Lifetime Spend
              </span>
              <span className="font-serif text-xl font-bold text-[#C5A059]">
                {storeSettings.currencySymbol}{totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl">
              <span className="text-[10px] text-[#7D736A] uppercase font-medium block">
                Total Transactions
              </span>
              <span className="font-serif text-xl font-bold text-[#4A433F]">
                {totalPurchases} Invoices
              </span>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl">
              <span className="text-[10px] text-[#7D736A] uppercase font-medium block">
                Loyalty Rewards Balance
              </span>
              <span className="font-serif text-xl font-bold text-[#2D5A27]">
                {(customer.loyaltyPoints || 0).toLocaleString()} pts
              </span>
            </div>
          </div>

          {/* Contact & Sizing specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Contact Details */}
            <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl space-y-2.5">
              <h4 className="font-semibold text-[#4A433F] pb-1 border-b border-[#EBE5DE] font-serif italic">
                Contact & Residence
              </h4>
              <div className="flex items-center gap-2 text-[#3D3732]">
                <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span className="font-mono">{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[#3D3732]">
                <Mail className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>{customer.email || 'No email on record'}</span>
              </div>
              <div className="flex items-start gap-2 text-[#7D736A]">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  {customer.address?.street ? (
                    `${customer.address.street}, ${customer.address.city}, ${customer.address.state} ${customer.address.postalCode}`
                  ) : (
                    'Address not specified'
                  )}
                </span>
              </div>
            </div>

            {/* Sizing & Milestones */}
            <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl space-y-2.5">
              <h4 className="font-semibold text-[#4A433F] pb-1 border-b border-[#EBE5DE] font-serif italic">
                Sizing & Anniversaries
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[#3D3732]">
                <div>
                  <span className="text-[#7D736A] block text-[10px]">RING SIZE:</span>
                  <strong className="text-[#A67C2E]">{customer.preferences?.ringSize || 'US 7.0'}</strong>
                </div>
                <div>
                  <span className="text-[#7D736A] block text-[10px]">WRIST SIZE:</span>
                  <strong className="text-[#3D3732]">{customer.preferences?.wristSize || '6.5"'}</strong>
                </div>
                <div>
                  <span className="text-[#7D736A] block text-[10px]">BIRTHDAY:</span>
                  <strong className="text-[#3D3732]">{customer.preferences?.birthday || 'None'}</strong>
                </div>
                <div>
                  <span className="text-[#7D736A] block text-[10px]">ANNIVERSARY:</span>
                  <strong className="text-[#A67C2E]">{customer.preferences?.anniversary || 'None'}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences & Concierge notes */}
          <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl space-y-2 text-xs">
            <h4 className="font-semibold text-[#4A433F] font-serif italic">Aesthetic Preferences & Concierge Log</h4>
            <div className="text-[#7D736A] space-y-1">
              <div>
                <span>Preferred Metals: </span>
                <strong className="text-[#A67C2E]">
                  {customer.preferences?.preferredMetals?.join(', ') || 'All Metals'}
                </strong>
              </div>
              <div>
                <span>Favorite Gemstones: </span>
                <strong className="text-[#2B6CB0]">
                  {customer.preferences?.preferredStones?.join(', ') ||
                    customer.preferences?.favoriteGemstones?.join(', ') ||
                    'Fine Diamonds'}
                </strong>
              </div>
            </div>
            <p className="p-2.5 bg-[#FFFFFF] rounded-xl border border-[#D9D1C7] text-[#635B53] italic mt-2">
              "{customer.notes || customer.preferences?.notes || 'No concierge notes recorded.'}"
            </p>
          </div>

          {/* Recent Purchases & Invoices */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold text-[#4A433F] flex items-center justify-between font-serif italic">
              <span>Customer Transaction History ({customerInvoices.length})</span>
            </h4>

            {customerInvoices.length === 0 ? (
              <p className="text-[#7D736A] italic text-xs">No invoices on record for this customer.</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {customerInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    onClick={() => {
                      onOpenInvoice(inv);
                      onClose();
                    }}
                    className="p-3 bg-[#FAF8F5] hover:bg-[#F2EEE9] border border-[#D9D1C7] rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="font-mono font-bold text-[#C5A059]">{inv.invoiceNumber}</span>
                      <span className="text-[#7D736A] ml-2">{inv.date}</span>
                      <p className="text-[#635B53] text-[11px] line-clamp-1 mt-0.5">
                        {inv.items
                          ? inv.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')
                          : inv.lineItems?.map((i) => `${i.quantity}x ${i.description}`).join(', ')}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-serif font-bold text-[#C5A059] text-sm">
                        ${inv.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                      <span className="block text-[10px] text-[#2D5A27] font-semibold uppercase">
                        {inv.status || inv.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
