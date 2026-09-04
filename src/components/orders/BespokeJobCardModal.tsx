import React from 'react';
import {
  X,
  Printer,
  Crown,
  Calendar,
  Gem,
  Coins,
  ShieldCheck,
  User,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import { CustomOrder } from '../../types';
import { useStore } from '../../context/StoreContext';

interface BespokeJobCardModalProps {
  order: CustomOrder;
  onClose: () => void;
}

export const BespokeJobCardModal: React.FC<BespokeJobCardModalProps> = ({ order, onClose }) => {
  const { storeSettings } = useStore();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#3D3732]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl max-w-3xl w-full shadow-2xl text-[#3D3732] overflow-hidden flex flex-col my-auto max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:bg-white print:text-black">
        {/* Header - Screen only */}
        <div className="p-4 border-b border-[#EBE5DE] flex items-center justify-between bg-[#FAF8F5] print:hidden">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#C5A059]" />
            <span className="font-serif italic text-base font-bold text-[#4A433F]">
              Atelier Fabrication Job Card: {order.orderNumber}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Goldsmith Job Card</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-[#7D736A] hover:text-[#3D3732] cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Job Card Body */}
        <div className="p-6 overflow-y-auto space-y-6 print:p-8 print:text-black print:overflow-visible">
          {/* Top Brand Banner */}
          <div className="flex justify-between items-start border-b-2 border-[#C5A059]/40 print:border-black pb-4">
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-widest text-[#4A433F] print:text-black uppercase">
                {storeSettings.storeName}
              </h1>
              <p className="text-xs text-[#7D736A] print:text-stone-600 font-serif italic">
                Haute Joaillerie Atelier & Fabrication Workshop
              </p>
              <p className="text-[10px] text-[#7D736A] print:text-stone-500 mt-1">
                {storeSettings.address} • {storeSettings.phone}
              </p>
            </div>

            <div className="text-right">
              <div className="bg-[#FAF8F5] print:bg-stone-100 border border-[#D9D1C7] print:border-stone-400 px-3 py-1.5 rounded-xl inline-block">
                <span className="text-[9px] uppercase font-bold text-[#A67C2E] print:text-black block">
                  ATELIER JOB CARD
                </span>
                <span className="font-mono text-sm font-bold text-[#C5A059] print:text-black">
                  {order.orderNumber}
                </span>
              </div>
              <div className="text-xs text-[#7D736A] print:text-stone-600 mt-1">
                Target Date: <strong className="text-[#3D3732] print:text-black">{order.deadline}</strong>
              </div>
            </div>
          </div>

          {/* Client & Artisan Summary */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-[#FAF8F5] print:bg-stone-50 p-4 rounded-2xl border border-[#D9D1C7] print:border-stone-300">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#7D736A] print:text-stone-600 block mb-1">
                Client Dossier
              </span>
              <div className="font-bold text-[#3D3732] print:text-black text-sm">{order.customerName}</div>
              <div className="text-[#7D736A] print:text-stone-600 font-mono mt-0.5">{order.customerPhone}</div>
              <div className="text-[#7D736A] print:text-stone-600">{order.customerEmail}</div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#7D736A] print:text-stone-600 block mb-1">
                Atelier Assignment
              </span>
              <div className="font-bold text-[#C5A059] print:text-black">{order.goldsmithAssignee}</div>
              <div className="text-[#635B53] print:text-stone-700 mt-0.5">
                Commission Priority: <strong className="text-[#A67C2E] print:text-black">{order.priority}</strong>
              </div>
              <div className="text-[#635B53] print:text-stone-700">
                Current Phase: <strong className="text-[#2D5A27] print:text-black">{order.status}</strong>
              </div>
            </div>
          </div>

          {/* Jewelry Commission Specifications */}
          <div className="space-y-3">
            <h3 className="font-serif italic text-sm font-bold text-[#4A433F] print:text-black uppercase tracking-wider border-b border-[#EBE5DE] print:border-stone-300 pb-1">
              Commission Master Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-3 text-xs">
                <div>
                  <span className="text-[#7D736A] print:text-stone-600 block text-[10px]">PIECE TITLE:</span>
                  <div className="font-bold text-[#3D3732] print:text-black text-sm">{order.title}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-[#FAF8F5] print:bg-stone-50 rounded-xl border border-[#D9D1C7] print:border-stone-300">
                  <div>
                    <span className="text-[#7D736A] print:text-stone-600 block text-[10px]">METAL ALLOY & PURITY:</span>
                    <strong className="text-[#A67C2E] print:text-black">{order.metalPreference}</strong>
                  </div>
                  <div>
                    <span className="text-[#7D736A] print:text-stone-600 block text-[10px]">GEMSTONES & 4CS:</span>
                    <strong className="text-[#2B6CB0] print:text-black">{order.gemstonePreference}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-[#7D736A] print:text-stone-600 block text-[10px] mb-1">WORKSHOP CRAFTSMAN INSTRUCTIONS:</span>
                  <p className="p-3 bg-[#FAF8F5] print:bg-stone-50 rounded-xl border border-[#D9D1C7] print:border-stone-300 text-[#635B53] print:text-stone-800 leading-relaxed text-xs">
                    {order.designNotes}
                  </p>
                </div>
              </div>

              {/* Reference image */}
              <div className="space-y-2">
                <span className="text-[#7D736A] print:text-stone-600 block text-[10px]">APPROVED REFERENCE SKETCH:</span>
                <div className="rounded-2xl overflow-hidden border border-[#D9D1C7] print:border-stone-400 bg-[#FAF8F5] aspect-square">
                  <img
                    src={order.referenceImages[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80'}
                    alt="Reference"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Milestone Sign-off Checkpoints */}
          <div className="space-y-3">
            <h3 className="font-serif italic text-sm font-bold text-[#4A433F] print:text-black uppercase tracking-wider border-b border-[#EBE5DE] print:border-stone-300 pb-1">
              Atelier Production Milestones & Sign-Off
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px]">
              {[
                { stage: '1. CAD 3D Design', sub: 'Approved by Client' },
                { stage: '2. Casting & Alloy', sub: 'Precious metal poured' },
                { stage: '3. Stone Setting', sub: 'Micro-claw & Pavé' },
                { stage: '4. Assay & Hallmarking', sub: 'Stamped & Certified' },
                { stage: '5. High Polish', sub: 'Rhodium / Mirror finish' },
                { stage: '6. Master QC', sub: 'Quality sign-off' },
                { stage: '7. Final Appraisal', sub: 'Insurance report' },
                { stage: '8. Client Delivery', sub: 'Handover & Gift box' },
              ].map((m, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-[#FAF8F5] print:bg-stone-50 rounded-xl border border-[#D9D1C7] print:border-stone-300 flex flex-col justify-between h-20"
                >
                  <div className="font-bold text-[#3D3732] print:text-black">{m.stage}</div>
                  <div className="text-[10px] text-[#7D736A] print:text-stone-600">{m.sub}</div>
                  <div className="border-t border-dashed border-[#D9D1C7] print:border-stone-400 pt-1 text-[9px] text-[#7D736A]">
                    Sign / Date: _________
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Summary */}
          <div className="p-4 bg-[#FAF8F5] print:bg-stone-100 rounded-2xl border border-[#D9D1C7] print:border-stone-300 flex items-center justify-between text-xs">
            <div>
              <span className="text-[#7D736A] print:text-stone-600 block">Quoted Price:</span>
              <span className="font-mono font-bold text-[#3D3732] print:text-black text-sm">
                ${order.quotedPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div>
              <span className="text-[#7D736A] print:text-stone-600 block">Advance Deposit Received:</span>
              <span className="font-mono font-bold text-[#2D5A27] print:text-emerald-700">
                ${order.advanceDeposit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div>
              <span className="text-[#A67C2E] print:text-amber-800 block font-semibold">Balance Due Upon Pickup:</span>
              <span className="font-serif font-bold text-[#C5A059] print:text-black text-base">
                ${order.balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
