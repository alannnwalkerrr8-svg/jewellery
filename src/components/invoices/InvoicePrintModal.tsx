import React from 'react';
import {
  X,
  Printer,
  Receipt,
  ShieldCheck,
  Coins,
  Gem,
  Award,
  Download,
} from 'lucide-react';
import { Invoice } from '../../types';
import { useStore } from '../../context/StoreContext';

interface InvoicePrintModalProps {
  invoice: Invoice;
  onClose: () => void;
}

export const InvoicePrintModal: React.FC<InvoicePrintModalProps> = ({ invoice, onClose }) => {
  const { storeSettings } = useStore();

  const handlePrint = () => {
    window.print();
  };

  const totalGrossWeight = invoice.items.reduce(
    (acc, curr) => acc + (curr.metalDetails?.grossWeightGrams || 0) * curr.quantity,
    0
  );

  const totalNetWeight = invoice.items.reduce(
    (acc, curr) => acc + (curr.metalDetails?.netWeightGrams || 0) * curr.quantity,
    0
  );

  const totalDiamonds = invoice.items.reduce((acc, curr) => {
    const dSum = curr.stoneDetails?.reduce((dAcc, st) => dAcc + st.caratWeight, 0) || 0;
    return acc + dSum * curr.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 bg-[#3D3732]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl max-w-3xl w-full shadow-2xl text-[#3D3732] overflow-hidden flex flex-col my-auto max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:bg-white print:text-black">
        {/* Top Control Bar - Screen only */}
        <div className="p-4 border-b border-[#EBE5DE] flex items-center justify-between bg-[#FAF8F5] print:hidden">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#C5A059]" />
            <span className="font-serif italic text-base font-bold text-[#4A433F]">
              Tax Invoice & Authenticity Certificate: {invoice.invoiceNumber}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Luxury Receipt / Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#7D736A] hover:text-[#3D3732] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Luxury Invoice Document */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 print:p-8 print:text-black print:overflow-visible bg-[#FFFFFF] print:bg-white">
          {/* Header Banner with Store Crest */}
          <div className="flex justify-between items-start border-b-2 border-[#C5A059]/40 print:border-black pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif text-3xl font-bold tracking-widest text-[#4A433F] print:text-black uppercase">
                  {storeSettings.storeName}
                </span>
              </div>
              <p className="text-xs text-[#7D736A] print:text-stone-600 font-serif italic tracking-wide">
                Maison de Haute Joaillerie & Fine Gemology
              </p>
              <p className="text-[11px] text-[#7D736A] print:text-stone-500 mt-1 max-w-sm">
                {storeSettings.address} • Tel: {storeSettings.phone} • Email: {storeSettings.email}
              </p>
              <p className="text-[10px] text-[#A67C2E] print:text-stone-600 font-mono mt-0.5">
                Tax Reg / GSTIN: {storeSettings.taxNumber}
              </p>
            </div>

            <div className="text-right">
              <div className="bg-[#FAF8F5] print:bg-stone-100 border border-[#D9D1C7] print:border-stone-400 px-3.5 py-2 rounded-xl inline-block">
                <span className="text-[10px] uppercase font-bold text-[#A67C2E] print:text-black block tracking-wider">
                  OFFICIAL TAX INVOICE
                </span>
                <span className="font-mono text-base font-bold text-[#C5A059] print:text-black">
                  {invoice.invoiceNumber}
                </span>
              </div>
              <div className="text-xs text-[#7D736A] print:text-stone-600 mt-1.5 space-y-0.5">
                <div>Date: <strong className="text-[#3D3732] print:text-black">{invoice.date}</strong></div>
                <div>Concierge: <strong className="text-[#3D3732] print:text-black">{invoice.salesperson}</strong></div>
              </div>
            </div>
          </div>

          {/* Customer Dossier & Bill To Box */}
          <div className="grid grid-cols-2 gap-4 bg-[#FAF8F5] print:bg-stone-50 p-4 rounded-xl border border-[#D9D1C7] print:border-stone-300 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#7D736A] print:text-stone-600 block mb-1">
                Billed To Client:
              </span>
              <div className="font-bold text-[#3D3732] print:text-black text-sm">{invoice.customerName}</div>
              {invoice.customerPhone && (
                <div className="text-[#7D736A] print:text-stone-600 font-mono mt-0.5">{invoice.customerPhone}</div>
              )}
              {invoice.customerEmail && (
                <div className="text-[#7D736A] print:text-stone-600">{invoice.customerEmail}</div>
              )}
              {invoice.customerAddress && (
                <div className="text-[#7D736A] print:text-stone-600 mt-1">{invoice.customerAddress}</div>
              )}
            </div>

            <div className="text-right flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7D736A] print:text-stone-600 block mb-1">
                  Warranty & Authenticity Certificate
                </span>
                <span className="text-[#A67C2E] print:text-black font-semibold">
                  {invoice.warrantyMonths} Months Haute Maintenance Warranty
                </span>
              </div>
              <div className="text-[11px] text-[#7D736A] print:text-stone-600">
                Payment Status: <strong className="text-[#2D5A27] print:text-emerald-800 uppercase font-bold">{invoice.status}</strong>
              </div>
            </div>
          </div>

          {/* Items Purchased Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-[#D9D1C7] print:border-black text-[#7D736A] print:text-stone-700 text-[10px] uppercase font-bold tracking-wider">
                  <th className="py-2.5">Item Description / SKU</th>
                  <th className="py-2.5">Precious Metal Specs</th>
                  <th className="py-2.5">Gemstones & Certs</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Unit Price</th>
                  <th className="py-2.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE5DE] print:divide-stone-300">
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="text-[#3D3732] print:text-black">
                    <td className="py-3 pr-2">
                      <span className="font-mono text-[10px] text-[#C5A059] print:text-stone-700 font-bold block">
                        {item.sku}
                      </span>
                      <strong className="text-[#3D3732] print:text-black font-serif text-sm">
                        {item.name}
                      </strong>
                    </td>

                    <td className="py-3 pr-2">
                      {item.metalDetails ? (
                        <div>
                          <span className="font-semibold text-[#A67C2E] print:text-black">
                            {item.metalDetails.purity}
                          </span>
                          <div className="text-[10px] text-[#7D736A] print:text-stone-600 font-mono">
                            Gross: {item.metalDetails.grossWeightGrams}g | Net: {item.metalDetails.netWeightGrams}g
                          </div>
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>

                    <td className="py-3 pr-2">
                      {item.stoneDetails && item.stoneDetails.length > 0 ? (
                        <div className="space-y-0.5">
                          {item.stoneDetails.map((st, sIdx) => (
                            <div key={sIdx} className="text-[11px]">
                              <span className="font-medium text-[#3D3732] print:text-black">
                                {st.pieces}x {st.caratWeight}ct {st.cut} {st.type}
                              </span>
                              {st.certNumber && (
                                <span className="block text-[9px] text-[#2D5A27] print:text-emerald-700 font-mono">
                                  {st.certAuthority} #{st.certNumber}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[#7D736A] italic">All Metal Piece</span>
                      )}
                    </td>

                    <td className="py-3 text-center font-mono">{item.quantity}</td>

                    <td className="py-3 text-right font-mono text-[#7D736A] print:text-black">
                      ${item.unitPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-3 text-right font-mono font-bold text-[#C5A059] print:text-black text-sm">
                      ${item.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Metal Weight & Gemstone Summary Strip */}
          <div className="p-3 bg-[#FAF8F5] print:bg-stone-50 rounded-xl border border-[#D9D1C7] print:border-stone-300 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="text-[10px] text-[#7D736A] print:text-stone-600 uppercase block">Total Gross Weight</span>
              <strong className="font-mono text-[#3D3732] print:text-black">{totalGrossWeight.toFixed(2)} g</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#7D736A] print:text-stone-600 uppercase block">Total Net Precious Gold</span>
              <strong className="font-mono text-[#C5A059] print:text-black">{totalNetWeight.toFixed(2)} g</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#7D736A] print:text-stone-600 uppercase block">Total Diamonds & Gems</span>
              <strong className="font-mono text-[#2B6CB0] print:text-black">{totalDiamonds.toFixed(2)} ct</strong>
            </div>
          </div>

          {/* Financial Totals & Payments Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Payment Tender History */}
            <div className="space-y-2 text-xs">
              <span className="font-semibold text-[#4A433F] print:text-black block border-b border-[#EBE5DE] print:border-stone-300 pb-1 font-serif italic">
                Settlement & Payment Method Breakdown
              </span>
              <div className="space-y-1.5">
                {invoice.payments.map((p, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-2 bg-[#FAF8F5] print:bg-stone-50 rounded-lg border border-[#D9D1C7] print:border-stone-300 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-bold text-[#3D3732] print:text-black">{p.method}</span>
                      {p.reference && (
                        <span className="text-[10px] text-[#7D736A] print:text-stone-600 ml-2 font-mono">
                          (Ref: {p.reference})
                        </span>
                      )}
                    </div>
                    <span className="font-mono font-bold text-[#3D3732] print:text-black">
                      ${p.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>

              {invoice.tradeInDetails && (
                <div className="p-2 bg-[#FAF8F5] print:bg-stone-50 rounded-lg border border-[#C5A059]/30 print:border-stone-300 text-[11px] text-[#A67C2E] print:text-black">
                  <strong>Old Gold Trade-In Applied:</strong> {invoice.tradeInDetails.grossWeightGrams}g of {invoice.tradeInDetails.purity} (${invoice.tradeInDetails.calculatedValue.toFixed(2)})
                </div>
              )}
            </div>

            {/* Calculations Box */}
            <div className="bg-[#FAF8F5] print:bg-stone-50 p-4 rounded-xl border border-[#D9D1C7] print:border-stone-300 space-y-2 text-xs">
              <div className="flex justify-between text-[#7D736A] print:text-stone-700">
                <span>Subtotal (Retail Value):</span>
                <span className="font-mono text-[#3D3732] print:text-black">
                  ${invoice.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>

              {invoice.discountTotal > 0 && (
                <div className="flex justify-between text-[#A67C2E] print:text-stone-800">
                  <span>Special Client Discount:</span>
                  <span className="font-mono">
                    -${invoice.discountTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-[#7D736A] print:text-stone-700">
                <span>Sales Tax ({storeSettings.taxRate}%):</span>
                <span className="font-mono text-[#3D3732] print:text-black">
                  ${invoice.taxTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>

              {invoice.tradeInDetails && (
                <div className="flex justify-between text-[#2D5A27] print:text-emerald-800 font-bold">
                  <span>Trade-In Gold Credit Deduction:</span>
                  <span className="font-mono">
                    -${invoice.tradeInDetails.calculatedValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t-2 border-[#D9D1C7] print:border-black flex justify-between items-center text-base font-bold text-[#4A433F] print:text-black">
                <span>Net Total Paid:</span>
                <span className="font-serif text-2xl text-[#C5A059] print:text-black font-mono">
                  ${invoice.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Legal Certification & Authenticity Guarantee */}
          <div className="pt-4 border-t border-[#EBE5DE] print:border-stone-300 grid grid-cols-2 gap-4 text-[10px] text-[#7D736A] print:text-stone-600">
            <div>
              <strong className="block text-[#4A433F] print:text-black mb-1">
                HALLMARK & GEMOLOGICAL GUARANTEE
              </strong>
              <p className="leading-relaxed">
                All precious metals are hallmarked in accordance with National Assay Hallmarking Standards. Diamonds and colored gemstones are certified natural, conflict-free, and graded in accordance with GIA/IGI criteria.
              </p>
            </div>

            <div className="text-right flex flex-col justify-end">
              <div className="border-b border-[#D9D1C7] print:border-black w-48 ml-auto pb-1 mb-1">
                <span className="italic font-serif text-[#4A433F] print:text-black text-xs">
                  {invoice.salesperson}
                </span>
              </div>
              <span>Authorized Boutique Director Signature</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
