export type JewelryCategory =
  | 'Rings'
  | 'Necklaces'
  | 'Bracelets'
  | 'Earrings'
  | 'Pendants'
  | 'Watches'
  | 'Loose Gemstones'
  | 'Bullion & Coins'
  | 'Sets & Collections';

export type MetalType =
  | 'Yellow Gold'
  | 'White Gold'
  | 'Rose Gold'
  | 'Platinum'
  | 'Sterling Silver'
  | 'Titanium'
  | 'Two-Tone Gold';

export type MetalPurity =
  | '24K (99.9%)'
  | '22K (91.6%)'
  | '18K (75.0%)'
  | '14K (58.5%)'
  | '10K (41.7%)'
  | 'Pt950 (95.0%)'
  | 'Pt900 (90.0%)'
  | 'Ag925 (92.5%)'
  | 'Fine Silver (99.9%)';

export type GemstoneType =
  | 'Diamond'
  | 'Ruby'
  | 'Blue Sapphire'
  | 'Emerald'
  | 'Yellow Sapphire'
  | 'Pearl'
  | 'Tanzanite'
  | 'Opal'
  | 'Aquamarine'
  | 'Moissanite'
  | 'Alexandrite'
  | 'None';

export type DiamondCut =
  | 'Round Brilliant'
  | 'Princess'
  | 'Emerald Cut'
  | 'Oval'
  | 'Cushion'
  | 'Marquise'
  | 'Pear'
  | 'Radiant'
  | 'Asscher'
  | 'Heart'
  | 'N/A';

export type DiamondClarity =
  | 'FL'
  | 'IF'
  | 'VVS1'
  | 'VVS2'
  | 'VS1'
  | 'VS2'
  | 'SI1'
  | 'SI2'
  | 'I1'
  | 'N/A';

export type DiamondColor =
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K-M'
  | 'Fancy Vivid'
  | 'N/A';

export interface GemstoneDetail {
  id: string;
  type: GemstoneType | string;
  caratWeight: number;
  pieces: number;
  cut: DiamondCut | string;
  color: DiamondColor | string;
  clarity: DiamondClarity | string;
  settingType?: 'Prong' | 'Bezel' | 'Channel' | 'Pavé' | 'Tension' | 'Flush' | 'Invisible' | string;
  certAuthority?: 'GIA' | 'IGI' | 'HRD' | 'AGS' | 'EGL' | 'In-House Certified' | 'None' | string;
  certNumber?: string;
}

export interface MetalDetail {
  type: MetalType | string;
  purity: MetalPurity | string;
  grossWeightGrams: number;
  netWeightGrams: number;
  metalRatePerGram: number;
}

export interface JewelryPricing {
  metalCost: number;
  gemstoneCost: number;
  makingCharges: number;
  markupPercentage: number;
  retailPrice: number;
  costPrice: number;
  taxRate: number;
}

export interface JewelryStock {
  quantity: number;
  lowStockThreshold: number;
  location: string;
  hallmarked: boolean;
  hallmarkCode?: string;
  size?: string;
}

export interface JewelryItem {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  category: JewelryCategory | string;
  collection?: string;
  metal: MetalDetail;
  stones: GemstoneDetail[];
  pricing: JewelryPricing;
  stock: JewelryStock;
  images: string[];
  status: 'In Stock' | 'Reserved' | 'Sold' | 'In Display' | 'In Vault' | 'Out for Repair' | string;
  description: string;
  tags: string[];
  createdDate: string;
  updatedDate: string;
}

export type CustomerTier =
  | 'Diamond Elite'
  | 'Platinum VIP'
  | 'Gold Member'
  | 'Silver Classic'
  | 'Royal Circle'
  | 'Gold'
  | 'Silver'
  | 'Standard';

export interface CustomerSpecialDate {
  id: string;
  title: string;
  date: string;
  type: 'Birthday' | 'Anniversary' | 'Wedding' | 'Holiday' | 'Other' | string;
}

export interface CustomerPreferences {
  preferredMetals: (MetalType | string)[];
  ringSize?: string;
  wristSize?: string;
  favoriteGemstones?: (GemstoneType | string)[];
  preferredStones?: string[];
  birthday?: string;
  anniversary?: string;
  notes?: string;
}

export interface Customer {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  preferences: CustomerPreferences;
  specialDates?: CustomerSpecialDate[];
  tier: CustomerTier;
  totalSpend?: number;
  totalSpent?: number;
  totalPurchases?: number;
  totalOrders?: number;
  loyaltyPoints: number;
  createdAt?: string;
  createdDate?: string;
  notes?: string;
}

export type CustomOrderStatus =
  | 'Draft'
  | 'Consultation'
  | 'CAD Design'
  | 'Wax & Casting'
  | 'Stone Setting'
  | 'Polishing'
  | 'Quality Inspection'
  | 'Ready for Delivery'
  | 'Ready for Pickup'
  | 'Completed'
  | 'Delivered'
  | 'Cancelled'
  | 'Active'
  | 'In Production'
  | 'Awaiting Customer Approval';

export interface CustomOrderStage {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  completedAt?: string;
  technician?: string;
  notes?: string;
}

export interface CustomOrder {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  title: string;
  category: JewelryCategory | string;
  budgetEstimate?: number;
  estimatedCost?: number;
  quotedPrice: number;
  depositPaid?: number;
  advanceDeposit?: number;
  balanceDue: number;
  requestedCompletionDate?: string;
  deadline?: string;
  createdDate: string;
  metalPreference?: string;
  gemstonePreference?: string;
  fingerSize?: string;
  designNotes?: string;
  referenceImages?: string[];
  goldsmithAssignee?: string;
  milestones?: any[];
  specifications?: {
    metalType: MetalType | string;
    metalPurity: MetalPurity | string;
    estimatedWeightGrams: number;
    fingerSize?: string;
    chainLength?: string;
    stoneDetails: string;
    engravingText?: string;
    finishType: 'High Polish' | 'Matte / Satin' | 'Hammered' | 'Brushed' | 'Sandblasted' | string;
  };
  designAssets?: {
    sketchUrl?: string;
    cadRenderUrl?: string;
    referenceImages: string[];
  };
  stages?: CustomOrderStage[];
  currentStageIndex?: number;
  status: CustomOrderStatus;
  priority: 'Standard' | 'Rush Order' | 'VIP Haute Joaillerie' | string;
  notes?: string;
}

export type PaymentMethod =
  | 'Credit Card'
  | 'Debit Card'
  | 'Cash'
  | 'Bank Wire Transfer'
  | 'Old Gold / Trade-In'
  | 'Split Payment'
  | 'Store Credit'
  | string;

export interface SalePayment {
  id?: string;
  method: PaymentMethod;
  amount: number;
  reference?: string;
  date?: string;
}

export interface SaleItem {
  itemId: string;
  sku: string;
  name: string;
  category?: JewelryCategory | string;
  metalInfo?: string;
  stoneInfo?: string;
  grossWeight?: number;
  unitPrice: number;
  quantity: number;
  discountAmount?: number;
  taxAmount?: number;
  total?: number;
  totalPrice?: number;
  certNumber?: string;
  metalDetails?: MetalDetail;
  stoneDetails?: GemstoneDetail[];
}

export interface TradeInGold {
  metalType: MetalType | string;
  purity: MetalPurity | string;
  grossWeightGrams: number;
  meltPercentage?: number;
  spotRatePerGram?: number;
  calculatedValue: number;
  notes?: string;
}

export interface SaleTransaction {
  id: string;
  invoiceNumber: string;
  date: string;
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  customerAddress?: string;
  items: SaleItem[];
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  tradeInAllowance: number;
  tradeInDetails?: TradeInGold;
  grandTotal: number;
  payments: SalePayment[];
  paymentStatus: 'Paid' | 'Partially Paid' | 'Pending' | 'Refunded' | string;
  salesperson: string;
  warrantyMonths: number;
  notes?: string;
  customOrderId?: string;
}

export interface InvoiceLineItem {
  sku?: string;
  name?: string;
  description?: string;
  metalDetails?: any;
  stoneDetails?: any;
  grossWeightGrams?: number;
  netWeightGrams?: number;
  weightGrams?: number;
  quantity: number;
  unitPrice?: number;
  unitRate?: number;
  totalPrice?: number;
  total?: number;
  certificateNo?: string;
  hallmarkCode?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  saleId?: string;
  customOrderId?: string;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerAddress?: string;
  type?: string;
  date: string;
  dueDate?: string;
  customer?: any;
  storeInfo?: any;
  items?: InvoiceLineItem[];
  lineItems?: InvoiceLineItem[];
  subtotal: number;
  discountTotal?: number;
  discountAmount?: number;
  taxTotal?: number;
  taxRate?: number;
  taxAmount?: number;
  tradeInDetails?: TradeInGold;
  tradeInAllowance?: number;
  grandTotal: number;
  paidAmount?: number;
  balanceDue?: number;
  paymentMethod?: string;
  payments?: SalePayment[];
  paymentStatus?: string;
  paymentTerms?: string;
  warrantyInfo?: string;
  authenticityStatement?: string;
  signatureName?: string;
  status?: 'Paid' | 'Partially Paid' | 'Partial' | 'Issued' | 'Draft' | 'Cancelled' | 'Refunded' | string;
  salesperson?: string;
  warrantyMonths?: number;
  notes?: string;
}

export interface LiveMetalRates {
  gold24k: number;
  gold22k: number;
  gold18k: number;
  gold14k: number;
  platinum950: number;
  silver999?: number;
  silver925: number;
  currency?: string;
  currencySymbol?: string;
  lastUpdated?: string;
  goldTrend?: 'up' | 'down' | 'neutral';
  silverTrend?: 'up' | 'down' | 'neutral';
}

export type MetalRates = LiveMetalRates;

export interface StoreSettings {
  storeName: string;
  tagline?: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone: string;
  email: string;
  website?: string;
  taxRate: number;
  taxNumber?: string;
  taxId?: string;
  hallmarkLicense?: string;
  currency: string;
  currencySymbol: string;
  defaultWarrantyMonths: number;
  invoicePrefix?: string;
}
