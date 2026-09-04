import React, { createContext, useContext, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_CUSTOM_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_INVENTORY,
  INITIAL_INVOICES,
  INITIAL_METAL_RATES,
  INITIAL_SALES,
  INITIAL_STORE_SETTINGS,
} from '../data/initialData';
import {
  Customer,
  CustomOrder,
  Invoice,
  JewelryItem,
  LiveMetalRates,
  SaleItem,
  SalePayment,
  SaleTransaction,
  StoreSettings,
  TradeInGold,
} from '../types';

export interface CartItem {
  item: JewelryItem;
  quantity: number;
  customDiscount: number;
  notes?: string;
}

interface StoreContextType {
  // Inventory
  inventory: JewelryItem[];
  addInventoryItem: (item: Omit<JewelryItem, 'id' | 'createdDate' | 'updatedDate'>) => JewelryItem;
  updateInventoryItem: (id: string, updates: Partial<JewelryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  duplicateInventoryItem: (id: string) => void;
  
  // Customers
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'code' | 'createdAt' | 'totalSpend' | 'totalOrders' | 'loyaltyPoints'>) => Customer;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  
  // Custom Orders
  customOrders: CustomOrder[];
  addCustomOrder: (order: Omit<CustomOrder, 'id' | 'orderNumber' | 'createdDate'>) => CustomOrder;
  updateCustomOrder: (id: string, updates: Partial<CustomOrder>) => void;
  advanceOrderStage: (orderId: string, stageIndex: number, technician?: string, notes?: string) => void;
  deleteCustomOrder: (id: string) => void;
  
  // Sales & POS
  sales: SaleTransaction[];
  cart: CartItem[];
  addToCart: (item: JewelryItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, qty: number) => void;
  updateCartDiscount: (itemId: string, discount: number) => void;
  clearCart: () => void;
  processSale: (data: {
    customerId?: string;
    customerName: string;
    customerPhone?: string;
    customerEmail?: string;
    customerAddress?: string;
    payments: SalePayment[];
    salesperson: string;
    notes?: string;
    tradeInDetails?: TradeInGold;
    discountTotal?: number;
    warrantyMonths?: number;
  }) => { sale: SaleTransaction; invoice: Invoice };
  
  // Invoices
  invoices: Invoice[];
  activeInvoiceToPrint: Invoice | null;
  setActiveInvoiceToPrint: (invoice: Invoice | null) => void;
  addInvoice: (invoice: Omit<Invoice, 'id'>) => Invoice;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  markInvoicePaid: (id: string) => void;
  deleteInvoice: (id: string) => void;
  createInvoiceFromCustomOrder: (order: CustomOrder) => Invoice;
  
  // Metal Rates & Pricing
  metalRates: LiveMetalRates;
  updateMetalRates: (rates: Partial<LiveMetalRates>) => void;
  calculateMetalPrice: (purity: string, weightGrams: number) => number;
  
  // Store Settings & Backup
  storeSettings: StoreSettings;
  updateStoreSettings: (settings: Partial<StoreSettings>) => void;
  exportDatabase: () => void;
  importDatabase: (jsonData: string) => boolean;
  resetToSampleData: () => void;
  
  // Quick Search & View
  globalSearch: string;
  setGlobalSearch: (term: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  INVENTORY: 'lumiere_jewelry_inventory_v1',
  CUSTOMERS: 'lumiere_jewelry_customers_v1',
  CUSTOM_ORDERS: 'lumiere_jewelry_custom_orders_v1',
  SALES: 'lumiere_jewelry_sales_v1',
  INVOICES: 'lumiere_jewelry_invoices_v1',
  RATES: 'lumiere_jewelry_rates_v1',
  SETTINGS: 'lumiere_jewelry_settings_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Inventory State
  const [inventory, setInventory] = useState<JewelryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  // 2. Customers State
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  // 3. Custom Orders State
  const [customOrders, setCustomOrders] = useState<CustomOrder[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_CUSTOM_ORDERS;
  });

  // 4. Sales State
  const [sales, setSales] = useState<SaleTransaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SALES);
    return saved ? JSON.parse(saved) : INITIAL_SALES;
  });

  // 5. Invoices State
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INVOICES);
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  // 6. Metal Rates State
  const [metalRates, setMetalRates] = useState<LiveMetalRates>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RATES);
    return saved ? JSON.parse(saved) : INITIAL_METAL_RATES;
  });

  // 7. Store Settings State
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : INITIAL_STORE_SETTINGS;
  });

  // POS Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeInvoiceToPrint, setActiveInvoiceToPrint] = useState<Invoice | null>(null);
  const [globalSearch, setGlobalSearch] = useState('');

  // Persist states
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_ORDERS, JSON.stringify(customOrders));
  }, [customOrders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(metalRates));
  }, [metalRates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(storeSettings));
  }, [storeSettings]);

  // Inventory Methods
  const addInventoryItem = (itemData: Omit<JewelryItem, 'id' | 'createdDate' | 'updatedDate'>): JewelryItem => {
    const today = new Date().toISOString().split('T')[0];
    const newItem: JewelryItem = {
      ...itemData,
      id: `item-${Date.now()}`,
      createdDate: today,
      updatedDate: today,
    };
    setInventory((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateInventoryItem = (id: string, updates: Partial<JewelryItem>) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updates, updatedDate: new Date().toISOString().split('T')[0] }
          : item
      )
    );
  };

  const deleteInventoryItem = (id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
    setCart((prev) => prev.filter((c) => c.item.id !== id));
  };

  const duplicateInventoryItem = (id: string) => {
    const item = inventory.find((i) => i.id === id);
    if (!item) return;
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const duplicated: JewelryItem = {
      ...item,
      id: `item-${Date.now()}`,
      sku: `${item.sku}-CPY${randomSuffix}`,
      barcode: `${item.barcode ? item.barcode.slice(0, 8) : '890100'}${randomSuffix}`,
      name: `${item.name} (Copy)`,
      status: 'In Stock',
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
    };
    setInventory((prev) => [duplicated, ...prev]);
  };

  // Customer Methods
  const addCustomer = (customerData: Omit<Customer, 'id' | 'code' | 'createdAt' | 'totalSpend' | 'totalOrders' | 'loyaltyPoints'>): Customer => {
    const nextCodeNumber = customers.length + 1;
    const newCustomer: Customer = {
      ...customerData,
      id: `cust-${Date.now()}`,
      code: `CUST-${String(nextCodeNumber).padStart(3, '0')}`,
      totalSpend: 0,
      totalOrders: 0,
      loyaltyPoints: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    return newCustomer;
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  // Custom Orders Methods
  const addCustomOrder = (orderData: Omit<CustomOrder, 'id' | 'orderNumber' | 'createdDate'>): CustomOrder => {
    const orderNum = `CST-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: CustomOrder = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setCustomOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateCustomOrder = (id: string, updates: Partial<CustomOrder>) => {
    setCustomOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, ...updates } : ord))
    );
  };

  const advanceOrderStage = (orderId: string, stageIndex: number, technician?: string, notes?: string) => {
    setCustomOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const newStages = ord.stages.map((stg, idx) => {
          if (idx <= stageIndex) {
            return {
              ...stg,
              completed: true,
              completedAt: stg.completedAt || new Date().toISOString().split('T')[0],
              technician: idx === stageIndex && technician ? technician : stg.technician,
              notes: idx === stageIndex && notes ? notes : stg.notes,
            };
          }
          return stg;
        });

        const nextIndex = Math.min(stageIndex + 1, ord.stages.length - 1);
        let newStatus = ord.status;
        if (stageIndex >= ord.stages.length - 1) {
          newStatus = 'Completed';
        } else if (stageIndex >= ord.stages.length - 2) {
          newStatus = 'Ready for Delivery';
        } else if (stageIndex >= ord.stages.length - 3) {
          newStatus = 'Quality Inspection';
        } else {
          newStatus = 'In Production';
        }

        return {
          ...ord,
          stages: newStages,
          currentStageIndex: nextIndex,
          status: newStatus,
        };
      })
    );
  };

  const deleteCustomOrder = (id: string) => {
    setCustomOrders((prev) => prev.filter((ord) => ord.id !== id));
  };

  // Cart & POS
  const addToCart = (item: JewelryItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1, customDiscount: 0 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((c) => (c.item.id === itemId ? { ...c, quantity: qty } : c))
    );
  };

  const updateCartDiscount = (itemId: string, discount: number) => {
    setCart((prev) =>
      prev.map((c) => (c.item.id === itemId ? { ...c, customDiscount: discount } : c))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateMetalPrice = (purity: string, weightGrams: number): number => {
    let rate = metalRates.gold18k;
    if (purity.includes('24K')) rate = metalRates.gold24k;
    else if (purity.includes('22K')) rate = metalRates.gold22k;
    else if (purity.includes('18K')) rate = metalRates.gold18k;
    else if (purity.includes('14K')) rate = metalRates.gold14k;
    else if (purity.includes('Pt950') || purity.includes('Platinum')) rate = metalRates.platinum950;
    else if (purity.includes('925') || purity.includes('Silver')) rate = metalRates.silver925;
    return Number((rate * weightGrams).toFixed(2));
  };

  const processSale = ({
    customerId,
    customerName,
    customerPhone,
    customerEmail,
    customerAddress,
    payments,
    salesperson,
    notes,
    tradeInDetails,
    discountTotal = 0,
    warrantyMonths = storeSettings.defaultWarrantyMonths || 24,
  }: {
    customerId?: string;
    customerName: string;
    customerPhone?: string;
    customerEmail?: string;
    customerAddress?: string;
    payments: SalePayment[];
    salesperson: string;
    notes?: string;
    tradeInDetails?: TradeInGold;
    discountTotal?: number;
    warrantyMonths?: number;
  }) => {
    const saleId = `sale-${Date.now()}`;
    const invoiceNum = `${storeSettings.invoicePrefix}${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toISOString().split('T')[0];

    // Build sale items
    const saleItems: SaleItem[] = cart.map((c) => {
      const itemPrice = c.item.pricing.retailPrice * c.quantity;
      const discount = c.customDiscount;
      const taxable = Math.max(0, itemPrice - discount);
      const tax = (taxable * (c.item.pricing.taxRate || storeSettings.taxRate)) / 100;
      const total = taxable + tax;

      return {
        itemId: c.item.id,
        sku: c.item.sku,
        name: c.item.name,
        category: c.item.category,
        metalInfo: `${c.item.metal.type} ${c.item.metal.purity} (${c.item.metal.grossWeightGrams}g)`,
        stoneInfo: c.item.stones.map((s) => `${s.caratWeight}ct ${s.cut} ${s.type}`).join(', ') || 'None',
        grossWeight: c.item.metal.grossWeightGrams,
        unitPrice: c.item.pricing.retailPrice,
        quantity: c.quantity,
        discountAmount: discount,
        taxAmount: Number(tax.toFixed(2)),
        total: Number(total.toFixed(2)),
        certNumber: c.item.stones.find((s) => s.certNumber)?.certNumber,
      };
    });

    const itemsSubtotal = saleItems.reduce((acc, curr) => acc + curr.unitPrice * curr.quantity, 0);
    const itemDiscounts = saleItems.reduce((acc, curr) => acc + curr.discountAmount, 0);
    const totalDiscount = itemDiscounts + discountTotal;
    const totalTax = saleItems.reduce((acc, curr) => acc + curr.taxAmount, 0);
    const tradeInValue = tradeInDetails ? tradeInDetails.calculatedValue : 0;
    const grandTotal = Math.max(0, itemsSubtotal - totalDiscount + totalTax - tradeInValue);

    const paidSum = payments.reduce((acc, p) => acc + p.amount, 0);
    const paymentStatus = paidSum >= grandTotal ? 'Paid' : paidSum > 0 ? 'Partially Paid' : 'Pending';

    // 1. Create Sale Object
    const newSale: SaleTransaction = {
      id: saleId,
      invoiceNumber: invoiceNum,
      date: today,
      customerId,
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      items: saleItems,
      subtotal: Number(itemsSubtotal.toFixed(2)),
      discountTotal: Number(totalDiscount.toFixed(2)),
      taxTotal: Number(totalTax.toFixed(2)),
      tradeInAllowance: Number(tradeInValue.toFixed(2)),
      tradeInDetails,
      grandTotal: Number(grandTotal.toFixed(2)),
      payments,
      paymentStatus,
      salesperson: salesperson || 'Senior Concierge',
      warrantyMonths,
      notes,
    };

    // 2. Create Official Invoice
    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: invoiceNum,
      saleId: saleId,
      type: 'Sales Tax Invoice',
      date: today,
      dueDate: today,
      customer: {
        id: customerId,
        name: customerName,
        phone: customerPhone || '',
        email: customerEmail || '',
        address: customerAddress || '',
      },
      storeInfo: {
        name: storeSettings.storeName,
        tagline: storeSettings.tagline,
        address: `${storeSettings.address}, ${storeSettings.city}, ${storeSettings.state} ${storeSettings.zip}`,
        phone: storeSettings.phone,
        email: storeSettings.email,
        website: storeSettings.website,
        taxId: storeSettings.taxId,
        hallmarkLicense: storeSettings.hallmarkLicense,
        currency: storeSettings.currency,
        currencySymbol: storeSettings.currencySymbol,
      },
      lineItems: saleItems.map((s) => ({
        description: `${s.name} [SKU: ${s.sku}]`,
        metalDetails: s.metalInfo,
        stoneDetails: s.stoneInfo,
        weightGrams: s.grossWeight,
        quantity: s.quantity,
        unitRate: s.unitPrice,
        total: s.unitPrice * s.quantity,
        certificateNo: s.certNumber,
        hallmarkCode: storeSettings.hallmarkLicense,
      })),
      subtotal: Number(itemsSubtotal.toFixed(2)),
      taxRate: storeSettings.taxRate,
      taxAmount: Number(totalTax.toFixed(2)),
      discountAmount: Number(totalDiscount.toFixed(2)),
      tradeInAllowance: Number(tradeInValue.toFixed(2)),
      grandTotal: Number(grandTotal.toFixed(2)),
      paidAmount: Number(paidSum.toFixed(2)),
      balanceDue: Number(Math.max(0, grandTotal - paidSum).toFixed(2)),
      paymentMethod: payments.map((p) => `${p.method} (${storeSettings.currencySymbol}${p.amount.toLocaleString()})`).join(', '),
      paymentStatus: paymentStatus === 'Paid' ? 'Paid' : paymentStatus === 'Partially Paid' ? 'Partially Paid' : 'Issued',
      paymentTerms: 'Payment Completed at point of sale',
      warrantyInfo: `${warrantyMonths}-Month Comprehensive Haute Joaillerie Guarantee including routine prong inspection, ultrasonic cleansing & authenticity certification.`,
      authenticityStatement: 'All precious metals and diamonds are certified authentic, hallmarked, and compliant with international standards.',
      notes,
      signatureName: `${salesperson || 'Store Director'}, Master Jeweler`,
    };

    // 3. Update Inventory Stock Quantities
    setInventory((prev) =>
      prev.map((invItem) => {
        const cartMatch = cart.find((c) => c.item.id === invItem.id);
        if (cartMatch) {
          const remainingQty = Math.max(0, invItem.stock.quantity - cartMatch.quantity);
          return {
            ...invItem,
            stock: {
              ...invItem.stock,
              quantity: remainingQty,
            },
            status: remainingQty === 0 ? 'Sold' : invItem.status,
            updatedDate: today,
          };
        }
        return invItem;
      })
    );

    // 4. Update Customer Spending and Orders Count
    if (customerId) {
      setCustomers((prev) =>
        prev.map((cust) => {
          if (cust.id === customerId) {
            const newTotalSpend = cust.totalSpend + grandTotal;
            const newOrders = cust.totalOrders + 1;
            const newLoyalty = cust.loyaltyPoints + Math.floor(grandTotal / 10);
            let newTier = cust.tier;
            if (newTotalSpend > 40000) newTier = 'Diamond Elite';
            else if (newTotalSpend > 20000) newTier = 'Platinum VIP';
            else if (newTotalSpend > 10000) newTier = 'Gold Member';
            else newTier = 'Silver Classic';

            return {
              ...cust,
              totalSpend: Number(newTotalSpend.toFixed(2)),
              totalOrders: newOrders,
              loyaltyPoints: newLoyalty,
              tier: newTier,
            };
          }
          return cust;
        })
      );
    }

    // 5. Append sale and invoice
    setSales((prev) => [newSale, ...prev]);
    setInvoices((prev) => [newInvoice, ...prev]);
    setActiveInvoiceToPrint(newInvoice);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#d97706', '#fbbf24', '#fef3c7', '#ffffff'],
      });
    } catch {
      // Confetti fallback
    }

    // Clear POS Cart
    clearCart();

    return { sale: newSale, invoice: newInvoice };
  };

  // Invoices Management
  const addInvoice = (invoiceData: Omit<Invoice, 'id'>): Invoice => {
    const newInv: Invoice = {
      ...invoiceData,
      id: `inv-${Date.now()}`,
    };
    setInvoices((prev) => [newInv, ...prev]);
    return newInv;
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, ...updates } : inv))
    );
  };

  const markInvoicePaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              paymentStatus: 'Paid',
              paidAmount: inv.grandTotal,
              balanceDue: 0,
            }
          : inv
      )
    );
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const createInvoiceFromCustomOrder = (order: CustomOrder): Invoice => {
    const today = new Date().toISOString().split('T')[0];
    const invoiceNum = `${storeSettings.invoicePrefix}CST-${Math.floor(1000 + Math.random() * 9000)}`;
    const tax = (order.quotedPrice * storeSettings.taxRate) / 100;
    const grand = order.quotedPrice + tax;
    const balance = Math.max(0, grand - order.depositPaid);

    const inv: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: invoiceNum,
      customOrderId: order.id,
      type: 'Custom Order Invoice',
      date: today,
      dueDate: order.requestedCompletionDate || today,
      customer: {
        id: order.customerId,
        name: order.customerName,
        phone: order.customerPhone,
        email: order.customerEmail,
        address: '',
      },
      storeInfo: {
        name: storeSettings.storeName,
        tagline: storeSettings.tagline,
        address: `${storeSettings.address}, ${storeSettings.city}, ${storeSettings.state} ${storeSettings.zip}`,
        phone: storeSettings.phone,
        email: storeSettings.email,
        website: storeSettings.website,
        taxId: storeSettings.taxId,
        hallmarkLicense: storeSettings.hallmarkLicense,
        currency: storeSettings.currency,
        currencySymbol: storeSettings.currencySymbol,
      },
      lineItems: [
        {
          description: `Custom Atelier Commission: ${order.title}`,
          metalDetails: `${order.specifications.metalType} ${order.specifications.metalPurity} (Est. ${order.specifications.estimatedWeightGrams}g)`,
          stoneDetails: order.specifications.stoneDetails,
          weightGrams: order.specifications.estimatedWeightGrams,
          quantity: 1,
          unitRate: order.quotedPrice,
          total: order.quotedPrice,
          hallmarkCode: storeSettings.hallmarkLicense,
        },
      ],
      subtotal: order.quotedPrice,
      taxRate: storeSettings.taxRate,
      taxAmount: Number(tax.toFixed(2)),
      discountAmount: 0,
      tradeInAllowance: 0,
      grandTotal: Number(grand.toFixed(2)),
      paidAmount: order.depositPaid,
      balanceDue: Number(balance.toFixed(2)),
      paymentMethod: order.depositPaid > 0 ? `Deposit Paid ($${order.depositPaid.toLocaleString()})` : 'Pending Payment',
      paymentStatus: balance === 0 ? 'Paid' : order.depositPaid > 0 ? 'Partially Paid' : 'Issued',
      paymentTerms: '50% Upon Commission, Balance due upon pickup & inspection.',
      warrantyInfo: 'Lifetime Bespoke Atelier Guarantee and complimentary bi-annual inspection.',
      authenticityStatement: 'All bespoke pieces are individually serialized, hallmarked, and supplied with official gemological documentation.',
      notes: order.notes,
      signatureName: `${storeSettings.storeName} Master Craftsman`,
    };

    setInvoices((prev) => [inv, ...prev]);
    setActiveInvoiceToPrint(inv);
    return inv;
  };

  // Metal Rates
  const updateMetalRates = (rates: Partial<LiveMetalRates>) => {
    setMetalRates((prev) => ({
      ...prev,
      ...rates,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const updateStoreSettings = (settings: Partial<StoreSettings>) => {
    setStoreSettings((prev) => ({ ...prev, ...settings }));
  };

  // Export & Import Database Backup
  const exportDatabase = () => {
    const backupData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      inventory,
      customers,
      customOrders,
      sales,
      invoices,
      metalRates,
      storeSettings,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lumiere_jewelry_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDatabase = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      if (data.inventory) setInventory(data.inventory);
      if (data.customers) setCustomers(data.customers);
      if (data.customOrders) setCustomOrders(data.customOrders);
      if (data.sales) setSales(data.sales);
      if (data.invoices) setInvoices(data.invoices);
      if (data.metalRates) setMetalRates(data.metalRates);
      if (data.storeSettings) setStoreSettings(data.storeSettings);
      return true;
    } catch (e) {
      console.error('Import database failed:', e);
      return false;
    }
  };

  const resetToSampleData = () => {
    setInventory(INITIAL_INVENTORY);
    setCustomers(INITIAL_CUSTOMERS);
    setCustomOrders(INITIAL_CUSTOM_ORDERS);
    setSales(INITIAL_SALES);
    setInvoices(INITIAL_INVOICES);
    setMetalRates(INITIAL_METAL_RATES);
    setStoreSettings(INITIAL_STORE_SETTINGS);
    setCart([]);
  };

  return (
    <StoreContext.Provider
      value={{
        inventory,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        duplicateInventoryItem,
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        customOrders,
        addCustomOrder,
        updateCustomOrder,
        advanceOrderStage,
        deleteCustomOrder,
        sales,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        updateCartDiscount,
        clearCart,
        processSale,
        invoices,
        activeInvoiceToPrint,
        setActiveInvoiceToPrint,
        addInvoice,
        updateInvoice,
        markInvoicePaid,
        deleteInvoice,
        createInvoiceFromCustomOrder,
        metalRates,
        updateMetalRates,
        calculateMetalPrice,
        storeSettings,
        updateStoreSettings,
        exportDatabase,
        importDatabase,
        resetToSampleData,
        globalSearch,
        setGlobalSearch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
