import { Language, JewelryCategory, MetalType, OccasionType } from '../types/jewelry';

export interface Translations {
  appName: string;
  appSubtitle: string;
  searchPlaceholder: string;
  uploadDesign: string;
  uploadNewDesign: string;
  filter: string;
  filters: string;
  resetFilters: string;
  allCategories: string;
  categories: Record<JewelryCategory, string>;
  metalTypes: Record<MetalType, string>;
  occasions: Record<OccasionType, string>;
  weightRanges: {
    all: string;
    under_5: string;
    '5_15': string;
    '15_30': string;
    '30_60': string;
    above_60: string;
  };
  sortOptions: {
    newest: string;
    weight_low_high: string;
    weight_high_low: string;
    popular: string;
  };
  sortBy: string;
  weight: string;
  approxWeight: string;
  grams: string;
  purity: string;
  hallmarked: string;
  bisHallmarked: string;
  hallmarkedOnly: string;
  trending: string;
  newArrival: string;
  inquireWhatsApp: string;
  downloadPhoto: string;
  shareDesign: string;
  like: string;
  savedDesigns: string;
  noSavedDesigns: string;
  noDesignsFound: string;
  noDesignsMatch: string;
  viewDetails: string;
  close: string;
  designDetails: string;
  specifications: string;
  relatedDesigns: string;
  tags: string;
  description: string;
  inquireNow: string;
  inquireMessage: string;
  copiedToClipboard: string;
  uploadForm: {
    title: string;
    subtitle: string;
    dropPhotoHere: string;
    orBrowseFiles: string;
    supportedFormats: string;
    imageUrlOption: string;
    imageUrlPlaceholder: string;
    designCode: string;
    titleEn: string;
    titleGu: string;
    titleHi: string;
    categorySelect: string;
    metalSelect: string;
    purityInput: string;
    weightInput: string;
    occasionSelect: string;
    genderSelect: string;
    tagsInput: string;
    tagsHelp: string;
    descEn: string;
    descGu: string;
    descHi: string;
    markAsTrending: string;
    markAsHallmarked: string;
    submitUpload: string;
    cancel: string;
    successMessage: string;
    validationError: string;
  };
  genders: {
    women: string;
    men: string;
    unisex: string;
    kids: string;
  };
  liveRates: {
    city: string;
    gold22k: string;
    gold24k: string;
    gold18k: string;
    silver: string;
    silverKg: string;
    platinum: string;
    updatedToday: string;
    calculator: string;
    viewCalculator: string;
    purity: string;
    weightGm: string;
    makingCharges: string;
    gst: string;
    baseValue: string;
    totalEstimate: string;
    knowWorth: string;
    enterBudget: string;
    calculateGoldWeight: string;
  };
  footer: {
    tagline: string;
    ownerName: string;
    address: string;
    googleMapsUrl: string;
    viewOnMap: string;
    contact: string;
    secondaryPhone: string;
    phoneLandline: string;
    whatsappNumber: string;
    hours: string;
    customJewelryAvailable: string;
  };
  roles: {
    admin: string;
    customer: string;
    adminBadge: string;
    customerBadge: string;
    switchToAdmin: string;
    switchToCustomer: string;
    adminDesc: string;
    customerDesc: string;
    viewOnlyNotice: string;
    adminAccessNotice: string;
    editDesign: string;
    deleteDesign: string;
    deleteConfirm: string;
    saveChanges: string;
    cancel: string;
  };
  showroom: {
    title: string;
    owner: string;
    ownerName: string;
    address: string;
    hours: string;
    hoursSchedule: string;
    festiveNote: string;
    suggestHours: string;
    suggestHoursTitle: string;
    suggestHoursDesc: string;
    yourName: string;
    yourPhone: string;
    preferredDay: string;
    preferredTime: string;
    notes: string;
    submitSuggestion: string;
    sendViaWhatsApp: string;
    suggestionSuccess: string;
    callPrimary: string;
    callSecondary: string;
  };
  totalDesigns: string;
  settings: {
    title: string;
    subtitle: string;
    theme: string;
    themeDesc: string;
    lightTheme: string;
    darkTheme: string;
    systemTheme: string;
    language: string;
    languageDesc: string;
    weightUnit: string;
    weightUnitDesc: string;
    unitGrams: string;
    unitTola: string;
    liveRatesBar: string;
    liveRatesDesc: string;
    showLiveRates: string;
    catalogData: string;
    restoreDefaults: string;
    restoreDefaultsDesc: string;
    restoreConfirm: string;
    restoredSuccess: string;
    close: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Shree Hari Jewels',
    appSubtitle: 'Exclusive Jewelry Designs & Catalog',
    searchPlaceholder: 'Search rings, necklaces, bangles, bridal sets, code...',
    uploadDesign: 'Upload Design',
    uploadNewDesign: 'Upload Latest Design',
    filter: 'Filter',
    filters: 'Filters',
    resetFilters: 'Reset Filters',
    allCategories: 'All Categories',
    categories: {
      all: 'All Designs',
      rings: 'Rings',
      necklaces: 'Necklaces & Chokers',
      bangles: 'Bangles & Kadas',
      earrings: 'Earrings & Jhumkas',
      mangalsutra: 'Mangalsutras',
      pendants: 'Pendants & Sets',
      bridal_sets: 'Bridal Sets',
      chains: 'Chains',
      bracelets: 'Bracelets',
      nosepins: 'Nose Pins',
      payal: 'Payal & Anklets',
      coins_bars: 'Coins & Bars',
    },
    metalTypes: {
      all: 'All Metals',
      gold_22k: '22K Gold (916)',
      gold_18k: '18K Gold (750)',
      gold_24k: '24K Pure Gold',
      diamond: 'Real Diamond',
      kundan_polki: 'Kundan & Polki',
      platinum: 'Platinum (950)',
      silver_925: '925 Sterling Silver',
      rose_gold: 'Rose Gold',
    },
    occasions: {
      all: 'All Occasions',
      bridal: 'Bridal & Wedding',
      festive: 'Festive & Traditional',
      daily_wear: 'Daily & Casual Wear',
      temple: 'Temple Heritage',
      party: 'Party & Cocktail',
      modern: 'Modern & Minimal',
    },
    weightRanges: {
      all: 'All Weights',
      under_5: 'Under 5 Grams',
      '5_15': '5g to 15g',
      '15_30': '15g to 30g',
      '30_60': '30g to 60g',
      above_60: '60g & Above (Heavy Bridal)',
    },
    sortOptions: {
      newest: 'Latest Uploads',
      weight_low_high: 'Weight: Light to Heavy',
      weight_high_low: 'Weight: Heavy to Light',
      popular: 'Most Popular',
    },
    sortBy: 'Sort By',
    weight: 'Weight',
    approxWeight: 'Approx. Weight',
    grams: 'grams',
    purity: 'Purity',
    hallmarked: 'BIS Hallmarked',
    bisHallmarked: '100% BIS 916 Hallmarked Certified',
    hallmarkedOnly: 'Hallmarked Only',
    trending: 'Trending',
    newArrival: 'New Arrival',
    inquireWhatsApp: 'Inquire on WhatsApp',
    downloadPhoto: 'Download Photo',
    shareDesign: 'Share Design',
    like: 'Save Design',
    savedDesigns: 'Saved Favorites',
    noSavedDesigns: 'No saved designs yet. Click the heart icon on any design to bookmark it!',
    noDesignsFound: 'No designs found matching your search criteria.',
    noDesignsMatch: 'Try selecting another category or resetting filters.',
    viewDetails: 'View Details',
    close: 'Close',
    designDetails: 'Design Details',
    specifications: 'Specifications',
    relatedDesigns: 'Similar Designs',
    tags: 'Tags & Style',
    description: 'Description',
    inquireNow: 'Direct WhatsApp Inquiry',
    inquireMessage: 'Hello, I am interested in this design: ',
    copiedToClipboard: 'Link copied to clipboard!',
    uploadForm: {
      title: 'Upload Latest Jewelry Photo',
      subtitle: 'Add new photo and specifications to the catalog for clients to browse.',
      dropPhotoHere: 'Drag & drop high-resolution jewelry photo here',
      orBrowseFiles: 'or click to browse from device / camera',
      supportedFormats: 'Supports JPG, PNG, WEBP high-res images',
      imageUrlOption: 'Or enter Photo URL',
      imageUrlPlaceholder: 'https://images.unsplash.com/...',
      designCode: 'Design / Item Code',
      titleEn: 'Design Title (English)',
      titleGu: 'Design Title (Gujarati - optional)',
      titleHi: 'Design Title (Hindi - optional)',
      categorySelect: 'Select Category',
      metalSelect: 'Select Metal & Purity',
      purityInput: 'Purity / Stamp (e.g. 22K 916, 18K Diamond)',
      weightInput: 'Approximate Weight (in Grams)',
      occasionSelect: 'Occasion / Style',
      genderSelect: 'Target Collection',
      tagsInput: 'Tags (comma separated)',
      tagsHelp: 'e.g. Antique, Bridal, Floral, Solitaire, Light Weight',
      descEn: 'Design Description (English)',
      descGu: 'Description (Gujarati - optional)',
      descHi: 'Description (Hindi - optional)',
      markAsTrending: 'Mark as Trending Design',
      markAsHallmarked: 'BIS 916 Hallmarked Certified',
      submitUpload: 'Publish Design to Catalog',
      cancel: 'Cancel',
      successMessage: 'New jewelry design uploaded successfully!',
      validationError: 'Please provide at least a photo, title, category, and weight.',
    },
    genders: {
      women: 'Women',
      men: 'Men',
      unisex: 'Unisex',
      kids: 'Kids',
    },
    liveRates: {
      city: 'Ahmedabad',
      gold22k: '22K Gold Rate',
      gold24k: '24K Fine Gold',
      gold18k: '18K Gold Rate',
      silver: 'Silver Rate',
      silverKg: 'Silver (1 Kg)',
      platinum: 'Platinum Rate',
      updatedToday: 'Ahmedabad Live Market Rate',
      calculator: 'Gold Price Calculator',
      viewCalculator: 'Open Calculator',
      purity: 'Gold Purity',
      weightGm: 'Weight (Grams)',
      makingCharges: 'Making Charges (%)',
      gst: 'GST (3%)',
      baseValue: 'Base Metal Value',
      totalEstimate: 'Total Estimated Amount',
      knowWorth: 'Know your money\'s worth!',
      enterBudget: 'Enter any budget to calculate gold weight you get',
      calculateGoldWeight: 'Calculate Gold Weight',
    },
    footer: {
      tagline: 'Handcrafted gold, diamond, antique kundan, and bridal jewelry collections with pure 916 BIS Hallmark guarantee.',
      ownerName: 'Vishal Patadia',
      address: 'Shop 12 mahakali complex Santej chokdi, Bhadaj-Santej Rd, Gandhinagar, Santej, Ahmedabad, Gujarat 382722',
      googleMapsUrl: 'https://share.google/HRy5V7PzNP0qiUEIT',
      viewOnMap: 'View on Google Maps',
      contact: '8000-461400',
      secondaryPhone: '96532-46571',
      phoneLandline: '8000-461400',
      whatsappNumber: '8000-461400',
      hours: 'Wed - Tue: 9:00 AM – 9:00 PM (Open All 7 Days)',
      customJewelryAvailable: 'Custom bespoke jewelry handcrafted to your weight, purity, and budget.',
    },
    roles: {
      admin: 'Admin (Owner)',
      customer: 'Customer (User)',
      adminBadge: 'Admin: Vishal Patadia',
      customerBadge: 'Customer: View Only',
      switchToAdmin: 'Switch to Admin',
      switchToCustomer: 'Switch to Customer View',
      adminDesc: 'Full management access: Add, edit, delete, and upload designs, plus update rates.',
      customerDesc: 'Catalog browsing view: View designs, weight, purity estimates, and send WhatsApp inquiries.',
      viewOnlyNotice: 'Customer Mode (View Only): Only the Admin (Vishal Patadia) can add, edit, or delete jewelry designs.',
      adminAccessNotice: 'Admin Mode Active: You have full permissions to add, edit, delete, and upload designs.',
      editDesign: 'Edit Design',
      deleteDesign: 'Delete Design',
      deleteConfirm: 'Are you sure you want to permanently delete this design from the catalog?',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
    },
    showroom: {
      title: 'Showroom Details & Hours',
      owner: 'Owner',
      ownerName: 'Vishal Patadia',
      address: 'Shop 12 mahakali complex Santej chokdi, Bhadaj-Santej Rd, Gandhinagar, Santej, Ahmedabad, Gujarat 382722',
      hours: 'Wed - Tue: 9:00 AM – 9:00 PM (All 7 Days Open)',
      hoursSchedule: 'Weekly Showroom Schedule',
      festiveNote: 'Friday (Krishna Janmashtami / Festivals): 9:00 AM – 9:00 PM (Hours might differ)',
      suggestHours: 'Suggest New Hours',
      suggestHoursTitle: 'Suggest New Visiting Hours',
      suggestHoursDesc: 'Need a special viewing time for bridal trials or wedding consultation? Suggest your convenient hours below.',
      yourName: 'Your Full Name',
      yourPhone: 'Contact Number',
      preferredDay: 'Preferred Day',
      preferredTime: 'Preferred Time Slot',
      notes: 'Consultation Requirement / Notes',
      submitSuggestion: 'Submit Suggested Hours',
      sendViaWhatsApp: 'Send Hours Suggestion via WhatsApp',
      suggestionSuccess: 'Thank you! Your suggested hours have been sent to Vishal Patadia.',
      callPrimary: 'Call 8000-461400',
      callSecondary: 'Call 96532-46571',
    },
    totalDesigns: 'Designs in Catalog',
    settings: {
      title: 'App Settings & Preferences',
      subtitle: 'Customize theme appearance, catalog language, weight format, and rates view.',
      theme: 'Theme Appearance',
      themeDesc: 'Switch between light luxury gold and dark velvet mode',
      lightTheme: 'Light Luxe',
      darkTheme: 'Dark Velvet',
      systemTheme: 'System',
      language: 'Catalog Language',
      languageDesc: 'Browse jewelry specifications in your preferred language',
      weightUnit: 'Weight Display Unit',
      weightUnitDesc: 'Display weights in Metric Grams or Traditional Tola / Vori',
      unitGrams: 'Grams (g)',
      unitTola: 'Tola / Vori (~11.66g)',
      liveRatesBar: 'Live Reference Rates Bar',
      liveRatesDesc: 'Show live gold & silver market reference prices ticker',
      showLiveRates: 'Show Live Rates Bar',
      catalogData: 'Catalog Data',
      restoreDefaults: 'Reset to Default Designs',
      restoreDefaultsDesc: 'Reload the handcrafted sample collection',
      restoreConfirm: 'Are you sure you want to reset the catalog? Any added custom uploads will be replaced with default collection.',
      restoredSuccess: 'Default sample jewelry catalog restored!',
      close: 'Close Settings',
    },
  },

  gu: {
    appName: 'શ્રી હરિ જ્વેલ્સ',
    appSubtitle: 'વિશિષ્ટ ઘરેણાંની ડિઝાઇન અને કૅટેલોગ',
    searchPlaceholder: 'વીંટી, હાર, બંગડી, મંગળસૂત્ર, બ્રાઇડલ સેટ, કોડ શોધો...',
    uploadDesign: 'ડિઝાઇન અપલોડ કરો',
    uploadNewDesign: 'નવી ડિઝાઇન અપલોડ કરો',
    filter: 'ફિલ્ટર',
    filters: 'ફિલ્ટર્સ',
    resetFilters: 'ફિલ્ટર્સ રીસેટ કરો',
    allCategories: 'બધી કેટેગરી',
    categories: {
      all: 'બધી ડિઝાઇન્સ',
      rings: 'વીંટી (Rings)',
      necklaces: 'હાર અને ચોકર (Necklaces)',
      bangles: 'બંગડી અને કડા (Bangles & Kadas)',
      earrings: 'ઝુમકા અને એરિંગ્સ (Earrings)',
      mangalsutra: 'મંગળસૂત્ર (Mangalsutra)',
      pendants: 'પેન્ડન્ટ અને સેટ (Pendants)',
      bridal_sets: 'દુલ્હન સેટ (Bridal Sets)',
      chains: 'ચેઇન (Chains)',
      bracelets: 'બ્રેસલેટ (Bracelets)',
      nosepins: 'નથણી (Nose Pins)',
      payal: 'ઝાંઝર અને પાયલ (Payal)',
      coins_bars: 'સોનાના સિક્કા (Coins & Bars)',
    },
    metalTypes: {
      all: 'બધી ધાતુઓ',
      gold_22k: '૨૨ કેરેટ સોનું (916)',
      gold_18k: '૧૮ કેરેટ સોનું (750)',
      gold_24k: '૨૪ કેરેટ શુદ્ધ સોનું',
      diamond: 'અસલી હીરા (Diamond)',
      kundan_polki: 'કુંદન અને પોલકી',
      platinum: 'પ્લેટિનમ (950)',
      silver_925: '૯૨૫ ચાંદી (Silver)',
      rose_gold: 'રોઝ ગોલ્ડ',
    },
    occasions: {
      all: 'બધા પ્રસંગો',
      bridal: 'લગ્ન પ્રસંગ (Bridal)',
      festive: 'તહેવાર અને પારંપરિક (Festive)',
      daily_wear: 'રોજિંદા પહેરવેશ (Daily Wear)',
      temple: 'મંદિર / એન્ટિક વર્ક (Temple)',
      party: 'પાર્ટી અને કૉકટેલ (Party)',
      modern: 'આધુનિક / મિનિમલ (Modern)',
    },
    weightRanges: {
      all: 'બધું વજન',
      under_5: '૫ ગ્રામથી ઓછું',
      '5_15': '૫ થી ૧૫ ગ્રામ',
      '15_30': '૧૫ થી ૩૦ ગ્રામ',
      '30_60': '૩૦ થી ૬૦ ગ્રામ',
      above_60: '૬૦ ગ્રામથી વધુ (હેવી બ્રાઇડલ)',
    },
    sortOptions: {
      newest: 'નવીનતમ ડિઝાઇન્સ',
      weight_low_high: 'ઓછા વજનથી વધુ',
      weight_high_low: 'વધુ વજનથી ઓછું',
      popular: 'સૌથી વધુ લોકપ્રિય',
    },
    sortBy: 'ક્રમમાં ગોઠવો',
    weight: 'વજન',
    approxWeight: 'આશરે વજન',
    grams: 'ગ્રામ',
    purity: 'શુદ્ધતા',
    hallmarked: 'બી.આઈ.એસ. હોલમાર્ક',
    bisHallmarked: '૧૦૦% બી.આઈ.એસ. ૯૧૬ હોલમાર્ક પ્રમાણિત',
    hallmarkedOnly: 'માત્ર હોલમાર્કવાળા',
    trending: 'ટ્રેન્ડિંગ',
    newArrival: 'નવું આગમન',
    inquireWhatsApp: 'વોટ્સએપ પર પૂછપરછ કરો',
    downloadPhoto: 'ફોટો ડાઉનલોડ કરો',
    shareDesign: 'ડિઝાઇન શેર કરો',
    like: 'ડિઝાઇન સાચવો',
    savedDesigns: 'સાચવેલ મનપસંદ',
    noSavedDesigns: 'હજી સુધી કોઈ ડિઝાઇન સાચવેલ નથી. ડિઝાઇન પર હૃદય ચિહ્ન દબાવી સેવ કરો!',
    noDesignsFound: 'તમારી પસંદગી મુજબ કોઈ ડિઝાઇન મળી નથી.',
    noDesignsMatch: 'કૃપા કરીને બીજી કેટેગરી પસંદ કરો અથવા ફિલ્ટર્સ રીસેટ કરો.',
    viewDetails: 'વિગત જુઓ',
    close: 'બંધ કરો',
    designDetails: 'ડિઝાઇન વિગતો',
    specifications: 'સ્પષ્ટીકરણો',
    relatedDesigns: 'આવી જ બીજી ડિઝાઇન્સ',
    tags: 'ટેગ્સ અને શૈલી',
    description: 'વર્ણન',
    inquireNow: 'વોટ્સએપ પર ભાવ / વિગત પૂછો',
    inquireMessage: 'નમસ્તે, મને આ ઘરેણાં ની ડિઝાઇનમાં રસ છે: ',
    copiedToClipboard: 'લિંક કૉપિ થઈ ગઈ છે!',
    uploadForm: {
      title: 'ઘરેણાં નો નવો ફોટો અપલોડ કરો',
      subtitle: 'ગ્રાહકો માટે કૅટેલોગમાં નવી ડિઝાઇન અને વજનની વિગતો ઉમેરો.',
      dropPhotoHere: 'ઉચ્ચ-ગુણવત્તાવાળો ફોટો અહીં ડ્રેગ અને ડ્રોપ કરો',
      orBrowseFiles: 'અથવા તમારા ફોન / કેમેરામાંથી પસંદ કરો',
      supportedFormats: 'JPG, PNG, WEBP ફોર્મેટ સપોર્ટ કરે છે',
      imageUrlOption: 'અથવા ફોટો URL દાખલ કરો',
      imageUrlPlaceholder: 'https://images.unsplash.com/...',
      designCode: 'ડિઝાઇન / આઇટમ કોડ',
      titleEn: 'ડિઝાઇન નામ (અંગ્રેજી)',
      titleGu: 'ડિઝાઇન નામ (ગુજરાતી)',
      titleHi: 'ડિઝાઇન નામ (હિન્દી)',
      categorySelect: 'કેટેગરી પસંદ કરો',
      metalSelect: 'ધાતુ અને શુદ્ધતા પસંદ કરો',
      purityInput: 'શુદ્ધતા / હોલમાર્ક (દા.ત. 22K 916)',
      weightInput: 'આશરે વજન (ગ્રામમાં)',
      occasionSelect: 'પ્રસંગ / શૈલી',
      genderSelect: 'કલેક્શન',
      tagsInput: 'ટેગ્સ (અલ્પવિરામ સાથે)',
      tagsHelp: 'દા.ત. એન્ટિક, બ્રાઇડલ, ફ્લોરલ, લાઈટ વેટ',
      descEn: 'ડિઝાઇન વર્ણન (અંગ્રેજી)',
      descGu: 'ડિઝાઇન વર્ણન (ગુજરાતી)',
      descHi: 'ડિઝાઇન વર્ણન (હિન્દી)',
      markAsTrending: 'ટ્રેન્ડિંગ ડિઝાઇન તરીકે દર્શાવો',
      markAsHallmarked: 'બી.આઈ.એસ. ૯૧૬ હોલમાર્ક પ્રમાણિત',
      submitUpload: 'કૅટેલોગમાં ડિઝાઇન પબ્લિશ કરો',
      cancel: 'રદ કરો',
      successMessage: 'નવી ઘરેણાં ની ડિઝાઇન સફળતાપૂર્વક અપલોડ થઈ ગઈ છે!',
      validationError: 'કૃપા કરીને ફોટો, નામ, કેટેગરી અને વજન દાખલ કરો.',
    },
    genders: {
      women: 'મહિલાઓ માટે',
      men: 'પુરુષો માટે',
      unisex: 'યુનિસેક્સ',
      kids: 'બાળકો માટે',
    },
    liveRates: {
      city: 'અમદાવાદ',
      gold22k: '૨૨ કેરેટ સોનાનો ભાવ',
      gold24k: '૨૪ કેરેટ શુદ્ધ સોનું',
      gold18k: '૧૮ કેરેટ સોનાનો ભાવ',
      silver: 'ચાંદીનો ભાવ (૧ ગ્રામ)',
      silverKg: 'ચાંદી (૧ કિલો)',
      platinum: 'પ્લેટિનમ ભાવ',
      updatedToday: 'અમદાવાદ આજનો લાઈવ બજાર ભાવ',
      calculator: 'સોનાના ભાવનું કેલ્ક્યુલેટર',
      viewCalculator: 'કેલ્ક્યુલેટર ખોલો',
      purity: 'સોનાની શુદ્ધતા',
      weightGm: 'વજન (ગ્રામ)',
      makingCharges: 'ઘડામણ ખર્ચ (%)',
      gst: 'જી.એસ.ટી. (૩%)',
      baseValue: 'મૂળ સોનાની કિંમત',
      totalEstimate: 'કુલ અંદાજિત કિંમત',
      knowWorth: 'તમારા પૈસાનું મૂલ્ય જાણો!',
      enterBudget: 'બજેટ દાખલ કરી સોનાનું વજન મેળવો',
      calculateGoldWeight: 'સોનાનું વજન ગણો',
    },
    footer: {
      tagline: '૧૦૦% બી.આઈ.એસ. ૯૧૬ હોલમાર્ક સાથે સોનું, હીરા, કુંદન અને બ્રાઇડલ ઘરેણાંનું ઉત્કૃષ્ટ સંગ્રહાલય.',
      ownerName: 'વિશાલ પટાડીયા',
      address: 'Shop 12 mahakali complex Santej chokdi, Bhadaj-Santej Rd, Gandhinagar, Santej, Ahmedabad, Gujarat 382722',
      googleMapsUrl: 'https://share.google/HRy5V7PzNP0qiUEIT',
      viewOnMap: 'ગુગલ મેપ્સ પર લોકેશન જુઓ',
      contact: '8000-461400',
      secondaryPhone: '96532-46571',
      phoneLandline: '8000-461400',
      whatsappNumber: '8000-461400',
      hours: 'બુધ - મંગળ: સવારે ૯:૦૦ થી રાત્રે ૯:૦૦ (દરરોજ ખુલ્લું)',
      customJewelryAvailable: 'તમારા વજન અને બજેટ અનુસાર ઓર્ડર પર કસ્ટમ ઘરેણાં બનાવી આપવામાં આવશે.',
    },
    roles: {
      admin: 'એડમિન (દુકાનદાર)',
      customer: 'ગ્રાહક (જોવા માટે)',
      adminBadge: 'એડમિન: વિશાલ પટાડીયા',
      customerBadge: 'ગ્રાહક: માત્ર વ્યુ મોડ',
      switchToAdmin: 'એડમિન મોડ કરો',
      switchToCustomer: 'ગ્રાહક મોડ કરો',
      adminDesc: 'સંપૂર્ણ અધિકાર: નવી ડિઝાઇન અપલોડ કરો, એડિટ કરો, ડિલીટ કરો અને ભાવ અપડેટ કરો.',
      customerDesc: 'કૅટેલોગ જોવા માટે: ડિઝાઇન્સ, વજન, શુદ્ધતા અને વોટ્સએપ પર પૂછપરછ કરો.',
      viewOnlyNotice: 'ગ્રાહક વ્યુ મોડ: માત્ર એડમિન (વિશાલ પટાડીયા) નવી ડિઝાઇન્સ ઉમેરી, સુધારી કે ડિલીટ કરી શકે છે.',
      adminAccessNotice: 'એડમિન મોડ સક્રિય: તમારી પાસે ડિઝાઇન અપલોડ, એડિટ અને ડિલીટ કરવાની સંપૂર્ણ પરવાનગી છે.',
      editDesign: 'ડિઝાઇન સુધારો (Edit)',
      deleteDesign: 'ડિઝાઇન કાઢી નાખો (Delete)',
      deleteConfirm: 'શું તમે આ ડિઝાઇનને કૅટેલોગમાંથી કાયમ માટે કાઢી નાખવા માંગો છો?',
      saveChanges: 'ફેરફાર સાચવો',
      cancel: 'રદ કરો',
    },
    showroom: {
      title: 'શોરૂમ વિગતો અને સમય',
      owner: 'માલિક',
      ownerName: 'વિશાલ પટાડીયા',
      address: 'Shop 12 mahakali complex Santej chokdi, Bhadaj-Santej Rd, Gandhinagar, Santej, Ahmedabad, Gujarat 382722',
      hours: 'બુધ - મંગળ: સવારે ૯:૦૦ થી રાત્રે ૯:૦૦ (સાતેય દિવસ ખુલ્લું)',
      hoursSchedule: 'સાપ્તાહિક શોરૂમ સમયપત્રક',
      festiveNote: 'શુક્રવાર (કૃષ્ણ જન્માષ્ટમી / તહેવારો): સવારે ૯:૦૦ થી રાત્રે ૯:૦૦ (તહેવાર મુજબ સમય બદલાઈ શકે છે)',
      suggestHours: 'નવો સમય સૂચવો',
      suggestHoursTitle: 'મુલાકાત માટે નવો સમય સૂચવો',
      suggestHoursDesc: 'બ્રાઇડલ પસંદગી કે ખાસ મુલાકાત માટે અનુકૂળ સમય સૂચવો:',
      yourName: 'તમારું પૂરું નામ',
      yourPhone: 'મોબાઇલ નંબર',
      preferredDay: 'પસંદગીનો વાર',
      preferredTime: 'પસંદગીનો સમય',
      notes: 'ખાસ નોંધ / જરૂરિયાત',
      submitSuggestion: 'સમય સૂચન મોકલો',
      sendViaWhatsApp: 'વોટ્સએપ પર સમય સૂચન મોકલો',
      suggestionSuccess: 'આભાર! તમારું સમય સૂચન વિશાલ પટાડીયાને મોકલાઈ ગયું છે.',
      callPrimary: 'કૉલ 8000-461400',
      callSecondary: 'કૉલ 96532-46571',
    },
    totalDesigns: 'કુલ ડિઝાઇન્સ',
    settings: {
      title: 'સેટિંગ્સ અને પસંદગીઓ',
      subtitle: 'થીમ લુક, કૅટેલોગ ભાષા, વજન એકમ અને લાઇવ રેટ બાર કસ્ટમાઇઝ કરો.',
      theme: 'થીમ લુક (રંગ રૂપરેખા)',
      themeDesc: 'લાઇટ રોયલ ગોલ્ડ અથવા ડાર્ક વેલ્વેટ મોડ પસંદ કરો',
      lightTheme: 'લાઇટ લક્સ',
      darkTheme: 'ડાર્ક વેલ્વેટ',
      systemTheme: 'સિસ્ટમ',
      language: 'કૅટેલોગ ભાષા',
      languageDesc: 'તમારી મનપસંદ ભાષામાં ઘરેણાંની વિગતો જુઓ',
      weightUnit: 'વજન પ્રદર્શન એકમ',
      weightUnitDesc: 'મેટ્રિક ગ્રામ (g) અથવા પારંપરિક તોલા / વોરી માં વજન જુઓ',
      unitGrams: 'ગ્રામ (g)',
      unitTola: 'તોલા / વોરી (~૧૧.૬૬g)',
      liveRatesBar: 'લાઇવ સંદર્ભ ભાવ પટ્ટી',
      liveRatesDesc: 'આજના સોના અને ચાંદીના બજાર ભાવ દર્શાવો અથવા છુપાવો',
      showLiveRates: 'લાઇવ રેટ બાર દર્શાવો',
      catalogData: 'કૅટેલોગ ડેટા',
      restoreDefaults: 'મૂળ ડિઝાઇન્સ પુનઃસ્થાપિત કરો',
      restoreDefaultsDesc: 'સેમ્પલ જ્વેલરી કલેક્શન ફરીથી લોડ કરો',
      restoreConfirm: 'શું તમે કૅટેલોગ પુનઃસ્થાપિત કરવા માંગો છો? તમારા અપલોડ કરેલા નવા ડિઝાઇન્સ મૂળ કલેક્શન સાથે બદલાઈ જશે.',
      restoredSuccess: 'મૂળ સેમ્પલ જ્વેલરી કૅટેલોગ પુનઃસ્થાપિત થઈ ગયું છે!',
      close: 'સેટિંગ્સ બંધ કરો',
    },
  },

  hi: {
    appName: 'श्री हरि ज्वेलर्स',
    appSubtitle: 'विशिष्ट आभूषण डिज़ाइन और कैटलॉग',
    searchPlaceholder: 'अंगूठी, हार, चूड़ियां, मंगलसूत्र, ब्राइडल सेट, कोड खोजें...',
    uploadDesign: 'डिज़ाइन अपलोड करें',
    uploadNewDesign: 'नवीनतम डिज़ाइन अपलोड करें',
    filter: 'फ़िल्टर',
    filters: 'फ़िल्टर्स',
    resetFilters: 'फ़िल्टर्स रीसेट करें',
    allCategories: 'सभी श्रेणियां',
    categories: {
      all: 'सभी डिज़ाइन',
      rings: 'अंगूठियां (Rings)',
      necklaces: 'हार और चोकर (Necklaces)',
      bangles: 'चूड़ियां और कड़े (Bangles & Kadas)',
      earrings: 'झुमके और बालियां (Earrings)',
      mangalsutra: 'मंगलसूत्र (Mangalsutra)',
      pendants: 'पेंडेंट और सेट (Pendants)',
      bridal_sets: 'दुल्हन सेट (Bridal Sets)',
      chains: 'चेन (Chains)',
      bracelets: 'कंगन और ब्रेसलेट (Bracelets)',
      nosepins: 'नथ और नोजपिन (Nose Pins)',
      payal: 'पायल और झांझर (Payal)',
      coins_bars: 'सोने के सिक्के (Coins & Bars)',
    },
    metalTypes: {
      all: 'सभी धातुएं',
      gold_22k: '२२ कैरेट सोना (916)',
      gold_18k: '१८ कैरेट सोना (750)',
      gold_24k: '२४ कैरेट शुद्ध सोना',
      diamond: 'असली हीरा (Diamond)',
      kundan_polki: 'कुंदन और पोलकी',
      platinum: 'प्लैटिनम (950)',
      silver_925: '९२५ चांदी (Silver)',
      rose_gold: 'रोज़ गोल्ड',
    },
    occasions: {
      all: 'सभी अवसर',
      bridal: 'विवाह / दुल्हन (Bridal)',
      festive: 'त्योहार और पारंपरिक (Festive)',
      daily_wear: 'दैनिक पहनना (Daily Wear)',
      temple: 'मंदिर / प्राचीन कला (Temple)',
      party: 'पार्टी और कॉकटेल (Party)',
      modern: 'आधुनिक / मिनिमल (Modern)',
    },
    weightRanges: {
      all: 'सभी वजन',
      under_5: '५ ग्राम से कम',
      '5_15': '५ से १५ ग्राम',
      '15_30': '१५ से ३० ग्राम',
      '30_60': '३० से ६० ग्राम',
      above_60: '६० ग्राम से अधिक (हैवी ब्राइडल)',
    },
    sortOptions: {
      newest: 'नवीनतम अपलोड',
      weight_low_high: 'वजन: कम से अधिक',
      weight_high_low: 'वजन: अधिक से कम',
      popular: 'सबसे लोकप्रिय',
    },
    sortBy: 'क्रमबद्ध करें',
    weight: 'वजन',
    approxWeight: 'अनुमानित वजन',
    grams: 'ग्राम',
    purity: 'शुद्धता',
    hallmarked: 'बीआईएस हॉलमार्क',
    bisHallmarked: '१००% बीआईएस ९१६ हॉलमार्क प्रमाणित',
    hallmarkedOnly: 'केवल हॉलमार्क वाले',
    trending: 'ट्रेंडिंग',
    newArrival: 'नया आगमन',
    inquireWhatsApp: 'व्हाट्सएप पर पूछताछ करें',
    downloadPhoto: 'फोटो डाउनलोड करें',
    shareDesign: 'डिज़ाइन शेयर करें',
    like: 'डिज़ाइन सहेजें',
    savedDesigns: 'पसंदीदा डिज़ाइन',
    noSavedDesigns: 'अभी तक कोई डिज़ाइन सहेजा नहीं गया है। किसी भी डिज़ाइन पर दिल के निशान पर क्लिक करें!',
    noDesignsFound: 'आपकी खोज के अनुसार कोई डिज़ाइन नहीं मिला।',
    noDesignsMatch: 'कृपया दूसरी श्रेणी चुनें या फ़िल्टर रीसेट करें।',
    viewDetails: 'विवरण देखें',
    close: 'बंद करें',
    designDetails: 'डिज़ाइन विवरण',
    specifications: 'विशिष्टताएं',
    relatedDesigns: 'समान डिज़ाइन',
    tags: 'टैग और शैली',
    description: 'विवरण',
    inquireNow: 'व्हाट्सएप पर मूल्य / विवरण पूछें',
    inquireMessage: 'नमस्ते, मुझे इस आभूषण डिज़ाइन में रुचि है: ',
    copiedToClipboard: 'लिंक कॉपी कर लिया गया है!',
    uploadForm: {
      title: 'आभूषण की नई फोटो अपलोड करें',
      subtitle: 'ग्राहकों के देखने के लिए कैटलॉग में नई डिज़ाइन और वजन का विवरण जोड़ें।',
      dropPhotoHere: 'उच्च-गुणवत्ता वाली फोटो यहाँ ड्रैग और ड्रॉप करें',
      orBrowseFiles: 'या अपने डिवाइस / कैमरे से चुनें',
      supportedFormats: 'JPG, PNG, WEBP फॉर्मेट समर्थित हैं',
      imageUrlOption: 'या फोटो का URL दर्ज करें',
      imageUrlPlaceholder: 'https://images.unsplash.com/...',
      designCode: 'डिज़ाइन / आइटम कोड',
      titleEn: 'डिज़ाइन का नाम (अंग्रेज़ी)',
      titleGu: 'डिज़ाइन का नाम (गुजराती)',
      titleHi: 'डिज़ाइन का नाम (हिन्दी)',
      categorySelect: 'श्रेणी चुनें',
      metalSelect: 'धातु और शुद्धता चुनें',
      purityInput: 'शुद्धता / हॉलमार्क (जैसे 22K 916)',
      weightInput: 'अनुमानित वजन (ग्राम में)',
      occasionSelect: 'अवसर / शैली',
      genderSelect: 'कलेक्शन',
      tagsInput: 'टैग (अल्पविराम द्वारा अलग)',
      tagsHelp: 'जैसे प्राचीन, दुल्हन, फ्लोरल, लाइट वेट',
      descEn: 'डिज़ाइन विवरण (अंग्रेज़ी)',
      descGu: 'डिज़ाइन विवरण (गुजराती)',
      descHi: 'डिज़ाइन विवरण (हिन्दी)',
      markAsTrending: 'ट्रेंडिंग डिज़ाइन के रूप में चिह्नित करें',
      markAsHallmarked: 'बीआईएस ९१६ हॉलमार्क प्रमाणित',
      submitUpload: 'कैटलॉग में डिज़ाइन प्रकाशित करें',
      cancel: 'रद्द करें',
      successMessage: 'नया आभूषण डिज़ाइन सफलतापूर्वक अपलोड हो गया है!',
      validationError: 'कृपया फोटो, नाम, श्रेणी और वजन दर्ज करें।',
    },
    genders: {
      women: 'महिलाओं के लिए',
      men: 'पुरुषों के लिए',
      unisex: 'यूनिसेक्स',
      kids: 'बच्चों के लिए',
    },
    liveRates: {
      city: 'अहमदाबाद',
      gold22k: '२२ कैरेट सोने का भाव',
      gold24k: '२४ कैरेट शुद्ध सोना',
      gold18k: '१८ कैरेट सोने का भाव',
      silver: 'चांदी का भाव (१ ग्राम)',
      silverKg: 'चांदी (१ किलो)',
      platinum: 'प्लैटिनम भाव',
      updatedToday: 'अहमदाबाद आज का लाइव बाज़ार भाव',
      calculator: 'सोने के भाव का कैलकुलेटर',
      viewCalculator: 'कैलकुलेटर खोलें',
      purity: 'सोने की शुद्धता',
      weightGm: 'वजन (ग्राम)',
      makingCharges: 'मेकिंग चार्ज (%)',
      gst: 'जीएसटी (३%)',
      baseValue: 'मूल सोने का मूल्य',
      totalEstimate: 'कुल अनुमानित मूल्य',
      knowWorth: 'अपने पैसों का सही मूल्य जानें!',
      enterBudget: 'बजट दर्ज कर सोने का वजन जानें',
      calculateGoldWeight: 'सोने का वजन निकालें',
    },
    footer: {
      tagline: '१००% बीआईएस ९१६ हॉलमार्क के साथ सोना, हीरा, कुंदन और ब्राइडल आभूषणों का विशिष्ट संग्रह।',
      ownerName: 'विशाल पटाडिया',
      address: 'Shop 12 mahakali complex Santej chokdi, Bhadaj-Santej Rd, Gandhinagar, Santej, Ahmedabad, Gujarat 382722',
      googleMapsUrl: 'https://share.google/HRy5V7PzNP0qiUEIT',
      viewOnMap: 'गूगल मैप्स पर लोकेशन देखें',
      contact: '8000-461400',
      secondaryPhone: '96532-46571',
      phoneLandline: '8000-461400',
      whatsappNumber: '8000-461400',
      hours: 'बुध - मंगल: सुबह ९:०० से रात ९:०० (सातों दिन खुला)',
      customJewelryAvailable: 'आपके वजन, शुद्धता और बजट के अनुसार कस्टमाइज्ड आभूषण तैयार किए जाते हैं।',
    },
    roles: {
      admin: 'एडमिन (दुकान मालिक)',
      customer: 'ग्राहक (देखने के लिए)',
      adminBadge: 'एडमिन: विशाल पटाडिया',
      customerBadge: 'ग्राहक: केवल व्यू मोड',
      switchToAdmin: 'एडमिन मोड चुनें',
      switchToCustomer: 'ग्राहक मोड चुनें',
      adminDesc: 'पूर्ण प्रबंधन अधिकार: डिज़ाइन अपलोड, एडिट, डिलीट और भाव अपडेट करें।',
      customerDesc: 'कैटलॉग देखने के लिए: डिज़ाइन, वजन, शुद्धता देखें और व्हाट्सएप पूछताछ करें।',
      viewOnlyNotice: 'ग्राहक व्यू मोड: केवल एडमिन (विशाल पटाडिया) ही डिज़ाइन जोड़, एडिट या डिलीट कर सकते हैं।',
      adminAccessNotice: 'एडमिन मोड सक्रिय: आपके पास नए डिज़ाइन जोड़ने, संपादित करने और हटाने की पूरी अनुमति है।',
      editDesign: 'डिज़ाइन संपादित करें (Edit)',
      deleteDesign: 'डिज़ाइन हटाएं (Delete)',
      deleteConfirm: 'क्या आप इस डिज़ाइन को कैटलॉग से स्थायी रूप से हटाना चाहते हैं?',
      saveChanges: 'बदलाव सहेजें',
      cancel: 'रद्द करें',
    },
    showroom: {
      title: 'शोरूम विवरण और समय',
      owner: 'मालिक',
      ownerName: 'विशाल पटाडिया',
      address: 'Shop 12 mahakali complex Santej chokdi, Bhadaj-Santej Rd, Gandhinagar, Santej, Ahmedabad, Gujarat 382722',
      hours: 'बुध - मंगल: सुबह ९:०० से रात ९:०० (सातों दिन खुला)',
      hoursSchedule: 'साप्ताहिक शोरूम समय तालिका',
      festiveNote: 'शुक्रवार (कृष्ण जन्माष्टमी / त्यौहार): सुबह ९:०० से रात ९:०० (त्यौहार अनुसार समय बदल सकता है)',
      suggestHours: 'नया समय सुझाएं',
      suggestHoursTitle: 'मुलाकात के लिए नया समय सुझाएं',
      suggestHoursDesc: 'ब्राइडल ज्वेलरी या विशेष खरीदारी के लिए अपनी सुविधानुसार समय सुझाएं:',
      yourName: 'आपका पूरा नाम',
      yourPhone: 'संपर्क नंबर',
      preferredDay: 'पसंदीदा दिन',
      preferredTime: 'पसंदीदा समय',
      notes: 'विशेष आवश्यकता / विवरण',
      submitSuggestion: 'समय सुझाव भेजें',
      sendViaWhatsApp: 'व्हाट्सएप पर समय सुझाव भेजें',
      suggestionSuccess: 'धन्यवाद! आपका समय सुझाव विशाल पटाडिया को भेज दिया गया है।',
      callPrimary: 'कॉल 8000-461400',
      callSecondary: 'कॉल 96532-46571',
    },
    totalDesigns: 'कुल डिज़ाइन',
    settings: {
      title: 'सेटिंग्स और प्राथमिकताएं',
      subtitle: 'थीम लुक, कैटलॉग भाषा, वजन इकाई और लाइव रेट बार कस्टमाइज़ करें।',
      theme: 'थीम लुक (रंग रूपरेखा)',
      themeDesc: 'लाइट रॉयल गोल्ड या डार्क वेलवेट मोड चुनें',
      lightTheme: 'लाइट लक्स',
      darkTheme: 'डार्क वेलवेट',
      systemTheme: 'सिस्टम',
      language: 'कैटलॉग भाषा',
      languageDesc: 'अपनी पसंदीदा भाषा में आभूषण विनिर्देश देखें',
      weightUnit: 'वजन प्रदर्शन इकाई',
      weightUnitDesc: 'मीट्रिक ग्राम (g) या पारंपरिक तोला / वोरी में वजन देखें',
      unitGrams: 'ग्राम (g)',
      unitTola: 'तोला / वोरी (~११.६६g)',
      liveRatesBar: 'लाइव संदर्भ भाव पट्टी',
      liveRatesDesc: 'आज के सोने और चांदी के बाजार संदर्भ भाव दिखाएं या छुपाएं',
      showLiveRates: 'लाइव रेट बार दिखाएं',
      catalogData: 'कैटलॉग डेटा',
      restoreDefaults: 'डिफ़ॉल्ट डिज़ाइन रीसेट करें',
      restoreDefaultsDesc: 'हैंडक्राफ्टेड सैंपल आभूषण संग्रह फिर से लोड करें',
      restoreConfirm: 'क्या आप कैटलॉग रीसेट करना चाहते हैं? आपके अपलोड किए गए नए डिज़ाइन मूल संग्रह से बदल जाएंगे।',
      restoredSuccess: 'डिफ़ॉल्ट आभूषण कैटलॉग सफलतापूर्वक पुनर्स्थापित हो गया!',
      close: 'सेटिंग्स बंद करें',
    },
  },
};
