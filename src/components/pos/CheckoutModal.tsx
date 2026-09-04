import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Banknote,
  Coins,
  ShieldCheck,
  User,
  Plus,
  Trash2,
  Receipt,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Customer, PaymentMethod, SalePayment, TradeInGold } from '../../types';
import { useStore } from '../../context/StoreContext';

interface CheckoutModalProps {
  onClose: () => void;
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  tradeInDetails?: TradeInGold;
  onSaleCompleted: (invoice: any) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  onClose,
  subtotal,
  discountTotal,
  taxTotal,
  tradeInDetails,
  onSaleCompleted,
}) => {
  const { customers, processSale, storeSettings } = useStore();

  const tradeInAllowance = tradeInDetails ? tradeInDetails.calculatedValue : 0;
  const grandTotal = Math.max(0, subtotal - discountTotal + taxTotal - tradeInAllowance);

  // Customer Selection State
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('Walk-In Client');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');

  // Salesperson & Notes
  const [salesperson, setSalesperson] = useState<string>('Julian Vance (Store Director)');
  const [warrantyMonths, setWarrantyMonths] = useState<number>(storeSettings.defaultWarrantyMonths || 24);
  const [notes, setNotes] = useState<string>('Includes boutique gift wrapping and official diamond authentication certificates.');

  // Payments State (can split payments across multiple methods)
  const [payments, setPayments] = useState<SalePayment[]>([
    ...(tradeInAllowance > 0
      ? [
          {
            id: `pay-${Date.now()}-trade`,
            method: 'Old Gold / Trade-In' as PaymentMethod,
            amount: tradeInAllowance,
            reference: 'TRADE-IN-EXCHANGE',
            date: new Date().toISOString().split('T')[0],
          },
        ]
      : []),
    {
      id: `pay-${Date.now()}`,
      method: 'Credit Card' as PaymentMethod,
      amount: grandTotal,
      reference: '',
      date: new Date().toISOString().split('T')[0],
    },
  ]);

  const handleSelectCustomer = (custId: string) => {
    setSelectedCustomerId(custId);
    if (!custId) {
      setCustomerName('Walk-In Client');
      setCustomerPhone('');
      setCustomerEmail('');
      setCustomerAddress('');
      return;
    }
    const cust = customers.find((c) => c.id === custId);
    if (cust) {
      setCustomerName(`${cust.firstName} ${cust.lastName}`);
      setCustomerPhone(cust.phone);
      setCustomerEmail(cust.email);
      setCustomerAddress(
        `${cust.address.street}, ${cust.address.city}, ${cust.address.state} ${cust.address.postalCode}`
      );
    }
  };

  const handleAddPaymentLine = () => {
    const totalPaidSoFar = payments.reduce((acc, p) => acc + p.amount, 0);
    const remaining = Math.max(0, grandTotal - totalPaidSoFar);
    setPayments([
      ...payments,
      {
        id: `pay-${Date.now()}`,
        method: 'Cash',
        amount: remaining,
        reference: '',
        date: new Date().toISOString().split('T')[0],
      },
    ]);
  };

  const handleUpdatePayment = (index: number, updates: Partial<SalePayment>) => {
    setPayments(payments.map((p, idx) => (idx === index ? { ...p, ...updates } : p)));
  };

  const handleRemovePayment = (index: number) => {
    setPayments(payments.filter((_, idx) => idx !== index));
  };

  const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);
  const remainingBalance = Number(Math.max(0, grandTotal - totalPaid).toFixed(2));

  const handleCompleteTransaction = (e: React.FormEvent) => {
    e.preventDefault();

    const { invoice } = processSale({
      customerId: selectedCustomerId || undefined,
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      payments,
      salesperson,
      notes,
      tradeInDetails,
      discountTotal,
      warrantyMonths,
    });

    onSaleCompleted(invoice);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#3D3732]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl max-w-2xl w-full shadow-2xl text-[#3D3732] overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#EBE5DE] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#2D5A27] border border-[#D9D1C7]">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic text-lg font-bold text-[#4A433F]">
                Complete Sale & Generate Tax Invoice
              </h3>
              <p className="text-xs text-[#7D736A]">
                Process tender, apply customer loyalty, and issue certified luxury receipt.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7D736A] hover:text-[#3D3732] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleCompleteTransaction} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Order Summary Pill */}
          <div className="p-4 bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl space-y-2 text-xs">
            <div className="flex justify-between text-[#7D736A]">
              <span>Items Subtotal:</span>
              <span className="font-mono text-[#3D3732]">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            {discountTotal > 0 && (
              <div className="flex justify-between text-[#A67C2E]">
                <span>Discounts Applied:</span>
                <span className="font-mono">-${discountTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="flex justify-between text-[#7D736A]">
              <span>Estimated Sales Tax ({storeSettings.taxRate}%):</span>
              <span className="font-mono text-[#3D3732]">${taxTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            {tradeInAllowance > 0 && (
              <div className="flex justify-between text-[#2D5A27] font-semibold">
                <span>Old Gold / Scrap Trade-In Credit:</span>
                <span className="font-mono">-${tradeInAllowance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="pt-2 border-t border-[#EBE5DE] flex justify-between items-center text-sm font-bold text-[#4A433F]">
              <span>Net Amount Payable:</span>
              <span className="font-serif text-xl text-[#C5A059]">
                {storeSettings.currencySymbol}{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Customer CRM Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#4A433F] flex items-center gap-1.5 font-serif italic">
                <User className="w-3.5 h-3.5 text-[#C5A059]" />
                Customer Account / VIP Profile
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => handleSelectCustomer(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="">Walk-In Client (Guest)</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code} - {c.firstName} {c.lastName} ({c.tier})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="text"
                  required
                  placeholder="Customer Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number for Warranty & SMS"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address for Digital Invoice"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>
          </div>

          {/* Payment Splitting Section */}
          <div className="space-y-3 pt-2 border-t border-[#EBE5DE]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#4A433F] flex items-center gap-1.5 font-serif italic">
                <CreditCard className="w-3.5 h-3.5 text-[#C5A059]" />
                Payment Method & Split Tender
              </span>

              <button
                type="button"
                onClick={handleAddPaymentLine}
                className="text-xs text-[#C5A059] hover:text-[#B38E46] flex items-center gap-1 cursor-pointer font-medium"
              >
                <Plus className="w-3 h-3" />
                Add Payment Split
              </button>
            </div>

            <div className="space-y-2.5">
              {payments.map((p, idx) => (
                <div
                  key={p.id || idx}
                  className="p-3 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-3 text-xs"
                >
                  <select
                    value={p.method}
                    onChange={(e) => handleUpdatePayment(idx, { method: e.target.value as PaymentMethod })}
                    className="px-2.5 py-1.5 bg-[#FFFFFF] border border-[#D9D1C7] rounded-lg text-[#A67C2E] font-semibold"
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Wire Transfer">Bank Wire Transfer</option>
                    <option value="Old Gold / Trade-In">Old Gold / Trade-In</option>
                    <option value="Store Credit">Store Credit</option>
                  </select>

                  <div className="relative flex-1">
                    <span className="absolute left-2.5 top-1.5 text-[#7D736A] text-xs">$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={p.amount}
                      onChange={(e) => handleUpdatePayment(idx, { amount: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-6 pr-2.5 py-1.5 bg-[#FFFFFF] border border-[#D9D1C7] rounded-lg text-[#3D3732] font-mono font-bold focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Ref # (Auth Code / Check #)"
                    value={p.reference || ''}
                    onChange={(e) => handleUpdatePayment(idx, { reference: e.target.value })}
                    className="px-2.5 py-1.5 bg-[#FFFFFF] border border-[#D9D1C7] rounded-lg text-[#3D3732] text-xs flex-1 focus:outline-none focus:border-[#C5A059]"
                  />

                  {payments.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePayment(idx)}
                      className="p-1.5 text-[#9B2C2C] hover:text-red-700 self-center cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs p-3 bg-[#FAF8F5] rounded-xl border border-[#D9D1C7]">
              <span className="text-[#7D736A]">Total Tendered: <strong className="text-[#3D3732]">${totalPaid.toFixed(2)}</strong></span>
              {remainingBalance > 0 ? (
                <span className="text-[#A67C2E] font-semibold">Remaining Due: ${remainingBalance.toFixed(2)}</span>
              ) : (
                <span className="text-[#2D5A27] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Paid in Full
                </span>
              )}
            </div>
          </div>

          {/* Salesperson & Warranty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#EBE5DE] text-xs">
            <div>
              <label className="block text-[#7D736A] mb-1">Salesperson / Concierge</label>
              <input
                type="text"
                value={salesperson}
                onChange={(e) => setSalesperson(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-[#7D736A] mb-1">Warranty Period</label>
              <select
                value={warrantyMonths}
                onChange={(e) => setWarrantyMonths(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9D1C7] rounded-xl text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
              >
                <option value={12}>12 Months Comprehensive</option>
                <option value={24}>24 Months Haute Care</option>
                <option value={36}>36 Months VIP Dossier</option>
                <option value={120}>Lifetime Maintenance</option>
              </select>
            </div>
          </div>

          {/* Footer Complete */}
          <div className="pt-4 border-t border-[#EBE5DE] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EEE9] text-[#635B53] text-xs font-medium cursor-pointer border border-[#D9D1C7]"
            >
              Back to POS
            </button>

            <button
              id="btn-confirm-checkout-sale"
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-all"
            >
              <Receipt className="w-4 h-4" />
              <span>Complete Sale & Issue Invoice</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
