import React, { useState, useMemo } from 'react';
import {
  Receipt,
  Search,
  Filter,
  Printer,
  Calendar,
  DollarSign,
  User,
  ShieldCheck,
  Eye,
  CheckCircle2,
  TrendingUp,
  Coins,
} from 'lucide-react';
import { Invoice } from '../../types';
import { useStore } from '../../context/StoreContext';
import { InvoicePrintModal } from './InvoicePrintModal';

interface InvoicesViewProps {
  onOpenNewSale: () => void;
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({ onOpenNewSale }) => {
  const { invoices, storeSettings, globalSearch } = useStore();

  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState<Invoice | null>(null);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      if (globalSearch) {
        const q = globalSearch.toLowerCase();
        const matchNum = inv.invoiceNumber.toLowerCase().includes(q);
        const matchCust = inv.customerName.toLowerCase().includes(q);
        const matchSalesperson = inv.salesperson?.toLowerCase().includes(q);
        if (!matchNum && !matchCust && !matchSalesperson) return false;
      }

      if (selectedStatus !== 'All' && inv.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [invoices, globalSearch, selectedStatus]);

  const totalInvoicedAmount = filteredInvoices.reduce((acc, curr) => acc + curr.grandTotal, 0);
  const totalTaxCollected = filteredInvoices.reduce((acc, curr) => acc + curr.taxTotal, 0);
  const totalTradeInDeductions = filteredInvoices.reduce(
    (acc, curr) => acc + (curr.tradeInDetails?.calculatedValue || 0),
    0
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#EBE5DE] border border-[#D9D1C7] p-5 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-[#A67C2E] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30">
              Automated Billing & Ledger
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#D9D1C7] text-[#635B53] font-mono">
              {filteredInvoices.length} Invoices Issued
            </span>
          </div>
          <h1 className="font-serif italic text-2xl font-bold text-[#4A433F] mt-1">
            Tax Invoices & Sales Receipts
          </h1>
          <p className="text-xs text-[#7D736A] mt-0.5">
            Automated itemized jewelry billing with precious metal weights, diamond certificates, and warranty terms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNewSale}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold text-xs shadow-xs cursor-pointer transition-all"
          >
            <Receipt className="w-4 h-4" />
            <span>Open POS Register</span>
          </button>
        </div>
      </div>

      {/* Financial KPIs Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[#7D736A] text-xs uppercase font-medium">
              Invoiced Gross Revenue
            </span>
            <div className="font-serif text-2xl font-bold text-[#4A433F] mt-0.5">
              {storeSettings.currencySymbol}{totalInvoicedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-[#2D5A27] font-medium">
              {filteredInvoices.length} completed transactions
            </span>
          </div>
          <div className="p-3 bg-[#FAF8F5] text-[#C5A059] rounded-xl border border-[#D9D1C7]">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[#7D736A] text-xs uppercase font-medium">
              Sales Tax Collected
            </span>
            <div className="font-serif text-2xl font-bold text-[#4A433F] mt-0.5">
              {storeSettings.currencySymbol}{totalTaxCollected.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-[#7D736A] font-medium">
              {storeSettings.taxRate}% tax ledger
            </span>
          </div>
          <div className="p-3 bg-[#FAF8F5] text-[#2B6CB0] rounded-xl border border-[#D9D1C7]">
            <Receipt className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[#7D736A] text-xs uppercase font-medium">
              Old Gold Trade-In Credits
            </span>
            <div className="font-serif text-2xl font-bold text-[#2D5A27] mt-0.5">
              {storeSettings.currencySymbol}{totalTradeInDeductions.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-[#7D736A] font-medium">
              Assayed scrap exchanges
            </span>
          </div>
          <div className="p-3 bg-[#FAF8F5] text-[#2D5A27] rounded-xl border border-[#D9D1C7]">
            <Coins className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#EBE5DE] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#4A433F] font-serif italic">
            Invoices & Receipt Records
          </span>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#7D736A]">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1 bg-[#FAF8F5] border border-[#D9D1C7] rounded-lg text-[#3D3732] focus:outline-none focus:border-[#C5A059]"
            >
              <option value="All">All Invoices</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#3D3732]">
            <thead className="bg-[#FAF8F5] text-[#7D736A] uppercase font-semibold text-[10px] tracking-wider border-b border-[#EBE5DE]">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Client Name</th>
                <th className="p-4">Date</th>
                <th className="p-4">Items / Details</th>
                <th className="p-4">Payment Methods</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Grand Total</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE5DE]">
              {filteredInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-[#FAF8F5] transition-colors group"
                >
                  <td className="p-4 font-mono font-bold text-[#C5A059]">
                    {inv.invoiceNumber}
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-[#4A433F] font-serif italic">{inv.customerName}</div>
                    {inv.customerPhone && (
                      <div className="text-[10px] text-[#7D736A] font-mono">{inv.customerPhone}</div>
                    )}
                  </td>

                  <td className="p-4 text-[#7D736A]">
                    {inv.date}
                  </td>

                  <td className="p-4 max-w-xs">
                    <div className="font-medium text-[#3D3732] line-clamp-1">
                      {inv.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                    </div>
                    <span className="text-[10px] text-[#7D736A]">
                      {inv.items.length} line item(s) • {inv.warrantyMonths}m warranty
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {inv.payments.map((p, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] px-2 py-0.5 rounded bg-[#FAF8F5] text-[#635B53] border border-[#D9D1C7]"
                        >
                          {p.method}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        inv.status === 'Paid'
                          ? 'bg-[#E1F2E1] text-[#2D5A27] border border-[#C8E4C8]'
                          : 'bg-[#FAF8F5] text-[#A67C2E] border border-[#C5A059]/40'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>

                  <td className="p-4 text-right font-serif font-bold text-[#C5A059] text-sm">
                    {storeSettings.currencySymbol}{inv.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedInvoiceForPrint(inv)}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F2EEE9] text-[#3D3732] hover:text-[#C5A059] border border-[#D9D1C7] flex items-center gap-1.5 ml-auto cursor-pointer transition-colors font-medium shadow-2xs"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>View & Print</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Print Modal */}
      {selectedInvoiceForPrint && (
        <InvoicePrintModal
          invoice={selectedInvoiceForPrint}
          onClose={() => setSelectedInvoiceForPrint(null)}
        />
      )}
    </div>
  );
};
