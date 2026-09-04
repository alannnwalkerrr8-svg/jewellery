import React from 'react';
import {
  TrendingUp,
  Package,
  Sparkles,
  ShoppingBag,
  Clock,
  Calendar,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Calculator,
  UserCheck,
  Coins,
  BadgeDollarSign,
  Gem,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useStore } from '../../context/StoreContext';
import { CustomOrder, JewelryItem } from '../../types';

interface DashboardViewProps {
  setActiveTab: (tab: string) => void;
  onOpenNewItem: () => void;
  onOpenNewOrder: () => void;
  onOpenCalculator: () => void;
  onOpenAI: () => void;
  onSelectItemDetail: (item: JewelryItem) => void;
  onSelectOrderDetail: (order: CustomOrder) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setActiveTab,
  onOpenNewItem,
  onOpenNewOrder,
  onOpenCalculator,
  onOpenAI,
  onSelectItemDetail,
  onSelectOrderDetail,
}) => {
  const {
    inventory,
    customOrders,
    sales,
    customers,
    metalRates,
    storeSettings,
  } = useStore();

  // Metrics calculations
  const totalInventoryRetailValue = inventory.reduce(
    (acc, curr) => acc + curr.pricing.retailPrice * curr.stock.quantity,
    0
  );

  const totalMetalGrossWeight = inventory.reduce(
    (acc, curr) => acc + curr.metal.grossWeightGrams * curr.stock.quantity,
    0
  );

  const totalDiamondCaratWeight = inventory.reduce((acc, curr) => {
    const diamonds = curr.stones.filter((s) => s.type === 'Diamond');
    const caratSum = diamonds.reduce((cAcc, s) => cAcc + s.caratWeight, 0);
    return acc + caratSum * curr.stock.quantity;
  }, 0);

  const totalSalesRevenue = sales.reduce((acc, curr) => acc + curr.grandTotal, 0);

  const activeCustomOrders = customOrders.filter(
    (o) => o.status !== 'Completed' && o.status !== 'Cancelled'
  );

  const customOrderPipelineValue = activeCustomOrders.reduce(
    (acc, curr) => acc + curr.quotedPrice,
    0
  );

  const lowStockItems = inventory.filter(
    (i) => i.stock.quantity <= i.stock.lowStockThreshold
  );

  // Sales category breakdown for charts
  const categorySalesMap: Record<string, number> = {};
  sales.forEach((s) => {
    s.items.forEach((item) => {
      categorySalesMap[item.category] = (categorySalesMap[item.category] || 0) + item.total;
    });
  });

  const categoryChartData = Object.keys(categorySalesMap).length > 0
    ? Object.entries(categorySalesMap).map(([name, value]) => ({ name, value }))
    : [
        { name: 'Rings', value: 24500 },
        { name: 'Bracelets', value: 16500 },
        { name: 'Necklaces', value: 12800 },
        { name: 'Watches', value: 14200 },
        { name: 'Earrings', value: 10200 },
      ];

  // Metal distribution for pie chart
  const metalDistributionMap: Record<string, number> = {};
  inventory.forEach((i) => {
    metalDistributionMap[i.metal.type] = (metalDistributionMap[i.metal.type] || 0) + i.stock.quantity;
  });

  const metalPieData = Object.entries(metalDistributionMap).map(([name, value]) => ({
    name,
    value,
  }));

  const PIE_COLORS = ['#C5A059', '#7D736A', '#2D5A27', '#6B4E71', '#D9D1C7', '#A67C2E'];

  // Upcoming customer special dates (next 45 days)
  const today = new Date();
  const upcomingEvents: {
    customerName: string;
    customerId: string;
    title: string;
    date: string;
    type: string;
    phone: string;
  }[] = [];

  customers.forEach((c) => {
    c.specialDates.forEach((sd) => {
      upcomingEvents.push({
        customerName: `${c.firstName} ${c.lastName}`,
        customerId: c.id,
        title: sd.title,
        date: sd.date,
        type: sd.type,
        phone: c.phone,
      });
    });
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner with Luxury Natural Tone */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#EBE5DE] p-6 rounded-2xl border border-[#D9D1C7] shadow-xs relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold tracking-wider text-[#A67C2E] uppercase px-2 py-0.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30">
              Live Boutique Operations
            </span>
            <span className="text-xs text-[#7D736A]">
              • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="font-serif italic text-2xl md:text-3xl font-bold text-[#4A433F]">
            {storeSettings.storeName}
          </h1>
          <p className="text-xs text-[#7D736A] mt-1 max-w-2xl">
            Inventory vault active, certified diamond registry synchronized with GIA standards, automated tax invoicing ready.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            id="btn-dash-pos"
            onClick={() => setActiveTab('pos')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Launch POS Terminal</span>
          </button>

          <button
            id="btn-dash-new-order"
            onClick={onOpenNewOrder}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F2EEE9] hover:bg-[#EBE5DE] text-[#635B53] text-xs font-semibold border border-[#D9D1C7] transition-all cursor-pointer shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>New Bespoke Commission</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inventory Value */}
        <div className="bg-[#FFFFFF] border border-[#D9D1C7] p-5 rounded-2xl shadow-xs relative overflow-hidden group hover:border-[#C5A059] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#7D736A]">Inventory Retail Valuation</span>
            <div className="p-2 rounded-xl bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#4A433F] font-serif">
              {storeSettings.currencySymbol}
              {totalInventoryRetailValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-[#7D736A]">
              <span>{inventory.length} distinct SKUs</span>
              <span className="text-[#C5A059] font-medium">
                {totalMetalGrossWeight.toFixed(1)}g total metal
              </span>
            </div>
          </div>
        </div>

        {/* Total Sales Revenue */}
        <div className="bg-[#FFFFFF] border border-[#D9D1C7] p-5 rounded-2xl shadow-xs relative overflow-hidden group hover:border-[#C5A059] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#7D736A]">Total Sales Recorded</span>
            <div className="p-2 rounded-xl bg-[#E1F2E1] text-[#2D5A27] border border-[#C8E4C8]">
              <BadgeDollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#2D5A27] font-serif">
              {storeSettings.currencySymbol}
              {totalSalesRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-[#7D736A]">
              <span>{sales.length} transactions processed</span>
              <span className="text-[#2D5A27] flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3 inline" /> 100% Invoiced
              </span>
            </div>
          </div>
        </div>

        {/* Custom Order Pipeline */}
        <div className="bg-[#FFFFFF] border border-[#D9D1C7] p-5 rounded-2xl shadow-xs relative overflow-hidden group hover:border-[#C5A059] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#7D736A]">Bespoke Atelier Pipeline</span>
            <div className="p-2 rounded-xl bg-[#F3ECF5] text-[#6B4E71] border border-[#E4D5E8]">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#6B4E71] font-serif">
              {storeSettings.currencySymbol}
              {customOrderPipelineValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-[#7D736A]">
              <span>{activeCustomOrders.length} active commissions</span>
              <button
                onClick={() => setActiveTab('custom-orders')}
                className="text-[#6B4E71] hover:text-[#55385B] flex items-center gap-0.5 text-xs font-medium cursor-pointer"
              >
                View Atelier <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Diamond & Gemstone Vault */}
        <div className="bg-[#FFFFFF] border border-[#D9D1C7] p-5 rounded-2xl shadow-xs relative overflow-hidden group hover:border-[#C5A059] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#7D736A]">Certified Diamond Reserve</span>
            <div className="p-2 rounded-xl bg-[#EAF2F8] text-[#2B6CB0] border border-[#D0E2F0]">
              <Gem className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#4A433F] font-serif">
              {totalDiamondCaratWeight.toFixed(2)} Carats
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-[#7D736A]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2B6CB0] inline" /> GIA & IGI Certified
              </span>
              <span className="text-[#4A433F]">Au 24K: ${metalRates.gold24k}/g</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Charts & Bespoke Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales by Category & Metal breakdown */}
        <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif italic text-base font-bold text-[#4A433F]">
                Jewelry Revenue & Category Distribution
              </h2>
              <p className="text-xs text-[#7D736A]">Performance across fine jewelry classifications</p>
            </div>
            <button
              onClick={() => setActiveTab('invoices')}
              className="text-xs text-[#C5A059] hover:text-[#B38E46] font-medium flex items-center gap-1 cursor-pointer"
            >
              View Invoices <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Bar chart */}
            <div className="md:col-span-2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#9C8D80" fontSize={11} tickLine={false} />
                  <YAxis stroke="#9C8D80" fontSize={11} tickFormatter={(val) => `$${val / 1000}k`} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D9D1C7', borderRadius: '12px', color: '#3D3732', fontSize: '12px', boxShadow: '0 4px 12px rgba(61,55,50,0.08)' }}
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                  />
                  <Bar dataKey="value" fill="#C5A059" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart of Metals */}
            <div className="h-64 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-[#EBE5DE] pl-0 md:pl-4">
              <span className="text-xs font-medium text-[#7D736A] mb-1">Stock Metal Composition</span>
              <div className="w-full h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={metalPieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={55}
                      innerRadius={32}
                      paddingAngle={3}
                    >
                      {metalPieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D9D1C7', borderRadius: '8px', color: '#3D3732', fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center text-[10px] text-[#7D736A]">
                {metalPieData.slice(0, 4).map((m, idx) => (
                  <span key={m.name} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} />
                    {m.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Precious Metals Barometer & Calculator Widget */}
        <div className="bg-[#FAF8F5] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE5DE]">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#C5A059]" />
                <h3 className="font-serif italic text-sm font-bold text-[#4A433F]">
                  Precious Metal Barometer
                </h3>
              </div>
              <span className="text-[10px] text-[#2D5A27] px-2 py-0.5 bg-[#E1F2E1] rounded-full border border-[#C8E4C8] font-medium">
                Live Feed
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF] border border-[#EBE5DE]">
                <span className="text-xs text-[#635B53] font-medium">Fine Gold 24K (99.9%)</span>
                <span className="text-xs font-bold text-[#4A433F] font-mono">
                  ${metalRates.gold24k.toFixed(2)} /g
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF] border border-[#EBE5DE]">
                <span className="text-xs text-[#635B53] font-medium">Crown Gold 22K (91.6%)</span>
                <span className="text-xs font-bold text-[#4A433F] font-mono">
                  ${metalRates.gold22k.toFixed(2)} /g
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF] border border-[#EBE5DE]">
                <span className="text-xs text-[#635B53] font-medium">Standard Fine 18K (75.0%)</span>
                <span className="text-xs font-bold text-[#4A433F] font-mono">
                  ${metalRates.gold18k.toFixed(2)} /g
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF] border border-[#EBE5DE]">
                <span className="text-xs text-[#635B53] font-medium">Solid Platinum Pt950</span>
                <span className="text-xs font-bold text-[#4A433F] font-mono">
                  ${metalRates.platinum950.toFixed(2)} /g
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF] border border-[#EBE5DE]">
                <span className="text-xs text-[#635B53] font-medium">Sterling Silver Ag925</span>
                <span className="text-xs font-bold text-[#4A433F] font-mono">
                  ${metalRates.silver925.toFixed(2)} /g
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#EBE5DE] flex gap-2">
            <button
              onClick={onOpenCalculator}
              className="flex-1 py-2 px-3 bg-[#F2EEE9] hover:bg-[#EBE5DE] text-[#635B53] rounded-xl text-xs font-medium border border-[#D9D1C7] flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            >
              <Calculator className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Melt Calculator</span>
            </button>

            <button
              onClick={onOpenAI}
              className="flex-1 py-2 px-3 bg-[#C5A059]/10 hover:bg-[#C5A059]/20 text-[#A67C2E] rounded-xl text-xs font-medium border border-[#C5A059]/30 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Valuation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Active Bespoke Commissions Pipeline & VIP Occasion Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Custom Orders Stage Tracker */}
        <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <h2 className="font-serif italic text-base font-bold text-[#4A433F]">
                Active Atelier Commissions & Milestones
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('custom-orders')}
              className="text-xs text-[#C5A059] hover:text-[#B38E46] font-medium flex items-center gap-1 cursor-pointer"
            >
              All Orders ({customOrders.length}) <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {activeCustomOrders.slice(0, 3).map((order) => {
              const currentStage = order.stages[order.currentStageIndex] || order.stages[0];
              const completedCount = order.stages.filter((s) => s.completed).length;
              const percent = Math.round((completedCount / order.stages.length) * 100);

              return (
                <div
                  key={order.id}
                  onClick={() => onSelectOrderDetail(order)}
                  className="p-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EEE9] border border-[#EBE5DE] hover:border-[#C5A059] transition-all cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#C5A059]">
                          {order.orderNumber}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFFFFF] border border-[#D9D1C7] text-[#635B53]">
                          {order.category}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            order.priority === 'VIP Haute Joaillerie'
                              ? 'bg-[#F3ECF5] text-[#6B4E71] border border-[#E4D5E8]'
                              : 'bg-[#C5A059]/10 text-[#A67C2E] border border-[#C5A059]/30'
                          }`}
                        >
                          {order.priority}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-[#4A433F] mt-1 group-hover:text-[#C5A059] transition-colors">
                        {order.title}
                      </h4>
                      <p className="text-[11px] text-[#7D736A] mt-0.5">
                        Client: <strong className="text-[#3D3732]">{order.customerName}</strong> • Quoted: ${order.quotedPrice.toLocaleString()} (Deposit: ${order.depositPaid.toLocaleString()})
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1.5 text-xs text-[#7D736A]">
                        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Due: {order.requestedCompletionDate}</span>
                      </div>
                      <span className="text-xs font-bold text-[#C5A059] mt-1 inline-block">
                        {percent}% Complete
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="w-full bg-[#EBE5DE] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#C5A059] h-full rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#7D736A] mt-1.5">
                      <span className="text-[#C5A059] font-medium">
                        Current Stage: {currentStage?.name}
                      </span>
                      <span>
                        Stage {order.currentStageIndex + 1} of {order.stages.length}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer Special Dates & Anniversary Watch */}
        <div className="bg-[#FFFFFF] border border-[#D9D1C7] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE5DE]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <h3 className="font-serif italic text-sm font-bold text-[#4A433F]">
                  Client Special Dates & Anniversaries
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('customers')}
                className="text-[11px] text-[#C5A059] hover:text-[#B38E46] font-medium cursor-pointer"
              >
                CRM
              </button>
            </div>

            <p className="text-xs text-[#7D736A] mt-2 mb-3">
              Upcoming milestones for tailored outreach and bespoke gifts:
            </p>

            <div className="space-y-2.5">
              {upcomingEvents.slice(0, 4).map((ev, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EBE5DE] flex items-start justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-[#4A433F]">
                        {ev.customerName}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#F3ECF5] text-[#6B4E71] border border-[#E4D5E8] font-medium">
                        {ev.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#C5A059] font-medium mt-0.5">{ev.title}</p>
                    <p className="text-[10px] text-[#7D736A]">{ev.phone}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-[#635B53] font-mono">
                      {ev.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#EBE5DE]">
            <button
              onClick={() => setActiveTab('customers')}
              className="w-full py-2 bg-[#F2EEE9] hover:bg-[#EBE5DE] text-[#635B53] rounded-xl text-xs font-medium border border-[#D9D1C7] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Open Customer Database</span>
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Low Stock Warnings & Quick Featured Stock Showcase */}
      {lowStockItems.length > 0 && (
        <div className="bg-[#FAF8F5] border border-[#F8C8C8] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#9B2C2C]" />
              <h3 className="font-serif italic text-sm font-bold text-[#9B2C2C]">
                Low Inventory Notice ({lowStockItems.length} items at or below reorder threshold)
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('inventory')}
              className="text-xs text-[#9B2C2C] hover:underline font-medium cursor-pointer"
            >
              Manage Stock
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItemDetail(item)}
                className="p-3 bg-[#FFFFFF] border border-[#F8C8C8]/70 rounded-xl flex items-center justify-between gap-3 cursor-pointer hover:border-[#9B2C2C] transition-all shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.images[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=150&q=80'}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover border border-[#D9D1C7]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#4A433F] line-clamp-1">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-[#7D736A]">
                      SKU: {item.sku} • {item.metal.purity}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-[#9B2C2C] px-2 py-0.5 rounded-full bg-[#FDE8E8] border border-[#F8C8C8]">
                    {item.stock.quantity} left
                  </span>
                  <div className="text-[10px] text-[#7D736A] mt-1 font-mono">
                    ${item.pricing.retailPrice.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
