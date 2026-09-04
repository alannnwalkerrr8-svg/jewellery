import React, { useState, useMemo } from 'react';
import {
  Crown,
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  User,
  Clock,
  Printer,
  Edit,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Layers,
  Wrench,
  Gem,
} from 'lucide-react';
import { CustomOrder, CustomOrderStatus } from '../../types';
import { useStore } from '../../context/StoreContext';
import { BespokeJobCardModal } from './BespokeJobCardModal';

interface CustomOrdersViewProps {
  onOpenNewOrder: () => void;
  onEditOrder: (order: CustomOrder) => void;
  onOpenAIForIdea: (concept: string, customer: string) => void;
}

export const CustomOrdersView: React.FC<CustomOrdersViewProps> = ({
  onOpenNewOrder,
  onEditOrder,
  onOpenAIForIdea,
}) => {
  const { customOrders, updateOrderStatus, deleteCustomOrder, storeSettings, globalSearch } = useStore();

  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedOrderForJobCard, setSelectedOrderForJobCard] = useState<CustomOrder | null>(null);

  const stages: CustomOrderStatus[] = [
    'Consultation',
    'CAD Design',
    'Wax & Casting',
    'Stone Setting',
    'Polishing',
    'Quality Inspection',
    'Ready for Pickup',
    'Delivered',
  ];

  const filteredOrders = useMemo(() => {
    return customOrders.filter((ord) => {
      if (globalSearch) {
        const q = globalSearch.toLowerCase();
        const matchTitle = ord.title.toLowerCase().includes(q);
        const matchCust = ord.customerName.toLowerCase().includes(q);
        const matchNum = ord.orderNumber.toLowerCase().includes(q);
        const matchMetal = ord.metalPreference.toLowerCase().includes(q);
        if (!matchTitle && !matchCust && !matchNum && !matchMetal) return false;
      }

      if (selectedStatus !== 'All' && ord.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [customOrders, globalSearch, selectedStatus]);

  const totalBespokeQuoted = filteredOrders.reduce((acc, curr) => acc + curr.quotedPrice, 0);
  const totalDepositsCollected = filteredOrders.reduce((acc, curr) => acc + curr.advanceDeposit, 0);
  const totalBalanceRemaining = filteredOrders.reduce((acc, curr) => acc + curr.balanceDue, 0);

  // Helper to advance stage
  const handleAdvanceStage = (order: CustomOrder) => {
    const currentIndex = stages.indexOf(order.status);
    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1];
      updateOrderStatus(order.id, nextStage);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#EBE5DE] border border-[#D9D1C7] p-5 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-[#A67C2E] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30">
              Haute Joaillerie Atelier
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#D9D1C7] text-[#635B53] font-mono">
              {filteredOrders.length} Commissions Active
            </span>
          </div>
          <h1 className="font-serif italic text-2xl font-bold text-[#4A433F] mt-1">
            Bespoke Commissions & Atelier Workflow
          </h1>
          <p className="text-xs text-[#7D736A] mt-0.5">
            Track custom jewelry fabrication milestones from CAD design to stone setting, hallmarking, and VIP delivery.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#FAF8F5] px-4 py-2 rounded-xl border border-[#D9D1C7] text-right shadow-2xs">
            <span className="text-[10px] text-[#7D736A] uppercase font-medium block">
              Commissions Pipeline Value
            </span>
            <span className="text-sm font-bold text-[#4A433F] font-serif">
              {storeSettings.currencySymbol}{totalBespokeQuoted.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-[#2D5A27] block">
              ${totalDepositsCollected.toLocaleString()} deposits secured
            </span>
          </div>

          <button
            id="btn-add-bespoke-order"
            onClick={onOpenNewOrder}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold text-xs shadow-xs cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Commission New Bespoke Piece</span>
          </button>
        </div>
      </div>

      {/* Stage Filter Tabs */}
      <div className="bg-[#FFFFFF] border border-[#D9D1C7] p-3 rounded-2xl shadow-xs overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          <button
            onClick={() => setSelectedStatus('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
              selectedStatus === 'All'
                ? 'bg-[#C5A059] text-white font-semibold shadow-xs'
                : 'bg-[#FAF8F5] hover:bg-[#F2EEE9] text-[#635B53] border border-[#EBE5DE]'
            }`}
          >
            All Stages ({customOrders.length})
          </button>
          {stages.map((stage, idx) => {
            const count = customOrders.filter((o) => o.status === stage).length;
            return (
              <button
                key={stage}
                onClick={() => setSelectedStatus(stage)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                  selectedStatus === stage
                    ? 'bg-[#C5A059] text-white font-semibold shadow-xs'
                    : 'bg-[#FAF8F5] hover:bg-[#F2EEE9] text-[#635B53] border border-[#EBE5DE]'
                }`}
              >
                <span>{idx + 1}. {stage}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    selectedStatus === stage ? 'bg-[#FFFFFF] text-[#C5A059]' : 'bg-[#EBE5DE] text-[#635B53]'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bespoke Orders Cards */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl p-12 text-center text-[#7D736A] text-xs shadow-xs">
            <Crown className="w-10 h-10 mx-auto mb-3 opacity-30 text-[#C5A059]" />
            <p className="font-semibold text-[#4A433F]">No bespoke orders found in this stage.</p>
            <p className="text-[#7D736A] mt-1">Click "Commission New Bespoke Piece" to initiate a client request.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const stageIndex = stages.indexOf(order.status);
            const progressPercent = ((stageIndex + 1) / stages.length) * 100;

            return (
              <div
                key={order.id}
                className="bg-[#FFFFFF] border border-[#D9D1C7] hover:border-[#C5A059] rounded-2xl p-5 shadow-xs transition-all space-y-4"
              >
                {/* Card Top Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-[#EBE5DE]">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#D9D1C7] bg-[#FAF8F5] shrink-0">
                      <img
                        src={order.referenceImages[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=200&q=80'}
                        alt={order.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-[#C5A059]">
                          {order.orderNumber}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            order.priority === 'VIP Haute'
                              ? 'bg-[#F2E8FA] text-[#6B21A8] border border-[#E9D5FF]'
                              : order.priority === 'Rush'
                              ? 'bg-[#FDE8E8] text-[#9B2C2C] border border-[#F8C8C8]'
                              : 'bg-[#FAF8F5] text-[#635B53] border border-[#D9D1C7]'
                          }`}
                        >
                          {order.priority}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E1F2E1] text-[#2D5A27] border border-[#C8E4C8] font-semibold">
                          Stage {stageIndex + 1} of 8: {order.status}
                        </span>
                      </div>

                      <h3 className="font-serif italic text-base font-bold text-[#4A433F] mt-1">
                        {order.title}
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-[#7D736A] mt-0.5 flex-wrap">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-[#9C8D80]" />
                          <strong className="text-[#3D3732]">{order.customerName}</strong>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#9C8D80]" />
                          Delivery Target: <strong className="text-[#C5A059]">{order.deadline}</strong>
                        </span>
                        <span>•</span>
                        <span>Artisan: <strong className="text-[#3D3732]">{order.goldsmithAssignee}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Pills */}
                  <div className="flex items-center gap-4 bg-[#FAF8F5] p-3 rounded-xl border border-[#EBE5DE] text-xs">
                    <div>
                      <span className="text-[#7D736A] block text-[10px]">Quoted Price:</span>
                      <span className="font-serif font-bold text-[#C5A059] text-sm">
                        ${order.quotedPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="border-l border-[#D9D1C7] pl-3">
                      <span className="text-[#7D736A] block text-[10px]">Deposit Paid:</span>
                      <span className="font-mono text-[#2D5A27] font-bold">
                        ${order.advanceDeposit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="border-l border-[#D9D1C7] pl-3">
                      <span className="text-[#7D736A] block text-[10px]">Balance Due:</span>
                      <span className="font-mono text-[#C5A059] font-bold">
                        ${order.balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specs & Craftsmanship details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EBE5DE]">
                    <span className="text-[#7D736A] text-[10px] block uppercase font-medium">
                      Precious Metal Alloy:
                    </span>
                    <span className="text-[#4A433F] font-semibold mt-0.5 block">
                      {order.metalPreference}
                    </span>
                  </div>

                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EBE5DE]">
                    <span className="text-[#7D736A] text-[10px] block uppercase font-medium">
                      Diamonds & Gemstones:
                    </span>
                    <span className="text-[#2B6CB0] font-semibold mt-0.5 block">
                      {order.gemstonePreference}
                    </span>
                  </div>

                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EBE5DE]">
                    <span className="text-[#7D736A] text-[10px] block uppercase font-medium">
                      Workshop Instructions:
                    </span>
                    <span className="text-[#3D3732] line-clamp-1 mt-0.5 block">
                      {order.designNotes}
                    </span>
                  </div>
                </div>

                {/* Milestone Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-[#7D736A]">
                    <span>Atelier Progress:</span>
                    <span className="text-[#C5A059] font-mono font-bold">
                      {Math.round(progressPercent)}% Completed
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#FAF8F5] rounded-full overflow-hidden border border-[#D9D1C7]">
                    <div
                      className="h-full bg-gradient-to-r from-[#C5A059] to-[#2D5A27] rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="pt-2 border-t border-[#EBE5DE] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedOrderForJobCard(order)}
                      className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F2EEE9] text-[#3D3732] rounded-lg border border-[#D9D1C7] flex items-center gap-1.5 cursor-pointer font-medium"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Print Goldsmith Job Card</span>
                    </button>

                    <button
                      onClick={() => onEditOrder(order)}
                      className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F2EEE9] text-[#635B53] hover:text-[#3D3732] rounded-lg border border-[#D9D1C7] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Order Specs</span>
                    </button>

                    <button
                      onClick={() => onOpenAIForIdea(order.title, order.customerName)}
                      className="px-3 py-1.5 bg-[#C5A059]/15 hover:bg-[#C5A059]/25 text-[#A67C2E] rounded-lg border border-[#C5A059]/30 flex items-center gap-1.5 cursor-pointer font-medium"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Design Brief</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {stageIndex < stages.length - 1 ? (
                      <button
                        onClick={() => handleAdvanceStage(order)}
                        className="px-4 py-2 bg-[#C5A059] hover:bg-[#B38E46] text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                      >
                        <span>Advance to: {stages[stageIndex + 1]}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-[#2D5A27] font-semibold flex items-center gap-1 px-3 py-1.5 bg-[#E1F2E1] border border-[#C8E4C8] rounded-lg">
                        <CheckCircle2 className="w-4 h-4" /> Delivered to Client
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Printable Job Card Modal */}
      {selectedOrderForJobCard && (
        <BespokeJobCardModal
          order={selectedOrderForJobCard}
          onClose={() => setSelectedOrderForJobCard(null)}
        />
      )}
    </div>
  );
};
