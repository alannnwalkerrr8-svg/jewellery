import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  Sparkles,
  ShieldCheck,
  Scale,
  Link,
  Plus,
} from 'lucide-react';
import { useJewelry } from '../context/JewelryContext';
import { JewelryCategory, MetalType, OccasionType } from '../types/jewelry';

export const UploadModal: React.FC = () => {
  const {
    t,
    isUploadModalOpen,
    setIsUploadModalOpen,
    addDesign,
    language,
    isUploadEnabled,
    shopDetails,
  } = useJewelry();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [code, setCode] = useState(() => `JW-${Math.floor(1000 + Math.random() * 9000)}`);
  const [titleEn, setTitleEn] = useState('');
  const [titleGu, setTitleGu] = useState('');
  const [titleHi, setTitleHi] = useState('');

  const [category, setCategory] = useState<JewelryCategory>('rings');
  const [metalType, setMetalType] = useState<MetalType>('gold_22k');
  const [purity, setPurity] = useState('22K (916 Hallmarked)');
  const [approxWeight, setApproxWeight] = useState('');
  const [occasion, setOccasion] = useState<OccasionType>('festive');
  const [gender, setGender] = useState<'women' | 'men' | 'unisex' | 'kids'>('women');
  const [tags, setTags] = useState('New Design, 916 Hallmark');

  const [descEn, setDescEn] = useState('');
  const [descGu, setDescGu] = useState('');
  const [descHi, setDescHi] = useState('');

  const [isTrending, setIsTrending] = useState(true);
  const [hallmarked, setHallmarked] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isUploadModalOpen) return null;

  // Handle local file selection / drop
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setImageUrl(result);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setImageUrl(val);
    setImagePreview(val);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview && !imageUrl) {
      setError(t.uploadForm.validationError);
      return;
    }
    if (!titleEn.trim()) {
      setError('Please provide at least an English title.');
      return;
    }
    const parsedWeight = parseFloat(approxWeight);
    if (isNaN(parsedWeight) || parsedWeight <= 0) {
      setError('Please enter a valid weight in grams.');
      return;
    }

    const tagList = tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    addDesign({
      code: code || `JW-${Date.now().toString().slice(-4)}`,
      title: {
        en: titleEn.trim(),
        gu: titleGu.trim() || titleEn.trim(),
        hi: titleHi.trim() || titleEn.trim(),
      },
      category,
      metalType,
      purity: purity || '22K (916)',
      approxWeightGrams: parsedWeight,
      imageUrl: imagePreview || imageUrl,
      occasion,
      gender,
      tags: tagList.length > 0 ? tagList : ['Latest Design'],
      description: {
        en: descEn.trim() || `${titleEn} - Handcrafted latest jewelry design.`,
        gu: descGu.trim() || `${titleGu || titleEn} - નવીનતમ ડિઝાઇનની ઘરેણાં.`,
        hi: descHi.trim() || `${titleHi || titleEn} - नवीनतम आभूषण डिज़ाइन।`,
      },
      isTrending,
      isNewArrival: true,
      hallmarked,
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setIsUploadModalOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FFFFFF] dark:bg-[#1E1A17] border border-[#D9D1C7] dark:border-[#3D352E] rounded-2xl max-w-2xl w-full shadow-2xl text-[#3D3732] dark:text-[#FAF7F2] my-auto overflow-hidden transition-colors">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EBE5DE] dark:border-[#332C26] flex items-center justify-between bg-[#FAF8F5] dark:bg-[#25201C]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#C5A059]/15 dark:bg-[#E5C378]/15 text-[#C5A059] dark:text-[#E5C378] border border-[#C5A059]/30 dark:border-[#E5C378]/30">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic text-base sm:text-lg font-bold text-[#3D3732] dark:text-[#FAF7F2]">
                {t.uploadForm.title}
              </h3>
              <p className="text-xs text-[#7D736A] dark:text-[#A89E92]">
                {t.uploadForm.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-1 rounded-lg text-[#7D736A] dark:text-[#A89E92] hover:text-[#3D3732] dark:hover:text-[#FAF7F2] hover:bg-[#FAF8F5] dark:hover:bg-[#332C26] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {success ? (
          <div className="p-8 text-center bg-[#5E8357]/10 dark:bg-[#7DAF74]/10">
            <div className="w-12 h-12 rounded-full bg-[#5E8357] text-white mx-auto flex items-center justify-center mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif italic text-lg font-bold text-[#5E8357] dark:text-[#7DAF74]">
              {t.uploadForm.successMessage}
            </h4>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {error && (
              <div className="p-3 bg-[#9E4A40]/10 border border-[#9E4A40]/30 rounded-xl text-xs text-[#9E4A40] dark:text-[#F87171] font-medium">
                {error}
              </div>
            )}

            {/* 1. Photo Dropzone / Upload Area */}
            <div>
              <label className="block text-xs font-semibold text-[#4A433F] dark:text-[#D4CCC2] mb-1.5">
                Jewelry Photo *
              </label>

              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden border-2 border-[#C5A059] dark:border-[#E5C378] bg-[#FAF8F5] dark:bg-[#181412] aspect-16/9 max-h-56 flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Design Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setImageUrl('');
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer"
                    title="Change Photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-[#C5A059] dark:border-[#E5C378] bg-[#C5A059]/5'
                      : 'border-[#D9D1C7] dark:border-[#3D352E] hover:border-[#C5A059] dark:hover:border-[#E5C378] bg-[#FAF8F5] dark:bg-[#25201C]'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1E1A17] border border-[#D9D1C7] dark:border-[#3D352E] text-[#C5A059] dark:text-[#E5C378] mx-auto flex items-center justify-center mb-2 shadow-xs">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-semibold text-[#3D3732] dark:text-[#FAF7F2]">
                    {t.uploadForm.dropPhotoHere}
                  </p>
                  <p className="text-[11px] text-[#7D736A] dark:text-[#A89E92] mt-0.5">
                    {t.uploadForm.orBrowseFiles}
                  </p>
                  <span className="inline-block mt-2 text-[10px] text-[#A67C2E] dark:text-[#E5C378] bg-white dark:bg-[#1E1A17] px-2 py-0.5 rounded-full border border-[#D9D1C7] dark:border-[#3D352E]">
                    {t.uploadForm.supportedFormats}
                  </span>
                </div>
              )}

              {/* URL Option */}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[11px] text-[#7D736A] dark:text-[#A89E92] whitespace-nowrap">
                  {t.uploadForm.imageUrlOption}:
                </span>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  placeholder={t.uploadForm.imageUrlPlaceholder}
                  className="flex-1 px-3 py-1.5 text-xs bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] placeholder:text-[#7D736A] dark:placeholder:text-[#635B53] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            {/* 2. Code & Category & Metal Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#4A433F] dark:text-[#D4CCC2] mb-1">
                  {t.uploadForm.designCode}
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] font-mono focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A433F] dark:text-[#D4CCC2] mb-1">
                  {t.uploadForm.categorySelect} *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as JewelryCategory)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] font-medium focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="rings">{t.categories.rings}</option>
                  <option value="necklaces">{t.categories.necklaces}</option>
                  <option value="bangles">{t.categories.bangles}</option>
                  <option value="earrings">{t.categories.earrings}</option>
                  <option value="mangalsutra">{t.categories.mangalsutra}</option>
                  <option value="pendants">{t.categories.pendants}</option>
                  <option value="bridal_sets">{t.categories.bridal_sets}</option>
                  <option value="chains">{t.categories.chains}</option>
                  <option value="bracelets">{t.categories.bracelets}</option>
                  <option value="nosepins">{t.categories.nosepins}</option>
                  <option value="payal">{t.categories.payal}</option>
                  <option value="coins_bars">{t.categories.coins_bars}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A433F] dark:text-[#D4CCC2] mb-1">
                  {t.uploadForm.metalSelect} *
                </label>
                <select
                  value={metalType}
                  onChange={(e) => {
                    const mt = e.target.value as MetalType;
                    setMetalType(mt);
                    if (mt === 'gold_22k') setPurity('22K (916 Hallmarked)');
                    if (mt === 'gold_18k') setPurity('18K (750 Gold)');
                    if (mt === 'gold_24k') setPurity('24K (999 Pure Fine Gold)');
                    if (mt === 'diamond') setPurity('18K Gold + Certified Diamond');
                    if (mt === 'kundan_polki') setPurity('22K Gold Base + Kundan');
                    if (mt === 'platinum') setPurity('Pt 950 Platinum');
                    if (mt === 'silver_925') setPurity('925 Sterling Silver');
                  }}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] font-medium focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="gold_22k">{t.metalTypes.gold_22k}</option>
                  <option value="gold_18k">{t.metalTypes.gold_18k}</option>
                  <option value="gold_24k">{t.metalTypes.gold_24k}</option>
                  <option value="diamond">{t.metalTypes.diamond}</option>
                  <option value="kundan_polki">{t.metalTypes.kundan_polki}</option>
                  <option value="rose_gold">{t.metalTypes.rose_gold}</option>
                  <option value="platinum">{t.metalTypes.platinum}</option>
                  <option value="silver_925">{t.metalTypes.silver_925}</option>
                </select>
              </div>
            </div>

            {/* 3. Multi-Lingual Titles */}
            <div className="space-y-2 bg-[#FAF8F5] dark:bg-[#25201C] p-3 rounded-xl border border-[#EBE5DE] dark:border-[#332C26]">
              <div>
                <label className="block text-xs font-semibold text-[#4A433F] dark:text-[#D4CCC2] mb-1">
                  {t.uploadForm.titleEn} *
                </label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Royal Peacock Antique 22K Gold Ring"
                  className="w-full px-3 py-2 text-xs bg-[#FFFFFF] dark:bg-[#1E1A17] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] placeholder:text-[#7D736A] dark:placeholder:text-[#635B53] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-[#7D736A] dark:text-[#A89E92] mb-1">
                    {t.uploadForm.titleGu} (ગુજરાતી)
                  </label>
                  <input
                    type="text"
                    value={titleGu}
                    onChange={(e) => setTitleGu(e.target.value)}
                    placeholder="દા.ત. રોયલ મોર એન્ટિક ૨૨ કેરેટ સોનાની વીંટી"
                    className="w-full px-3 py-1.5 text-xs bg-[#FFFFFF] dark:bg-[#1E1A17] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] placeholder:text-[#7D736A] dark:placeholder:text-[#635B53] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#7D736A] dark:text-[#A89E92] mb-1">
                    {t.uploadForm.titleHi} (हिन्दी)
                  </label>
                  <input
                    type="text"
                    value={titleHi}
                    onChange={(e) => setTitleHi(e.target.value)}
                    placeholder="जैसे: रॉयल मोर २२ कैरेट सोने की अंगूठी"
                    className="w-full px-3 py-1.5 text-xs bg-[#FFFFFF] dark:bg-[#1E1A17] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] placeholder:text-[#7D736A] dark:placeholder:text-[#635B53] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            </div>

            {/* 4. Weight, Purity & Occasion */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#4A433F] dark:text-[#D4CCC2] mb-1">
                  {t.uploadForm.weightInput} *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={approxWeight}
                    onChange={(e) => setApproxWeight(e.target.value)}
                    placeholder="e.g. 14.50"
                    className="w-full pl-3 pr-8 py-2 text-xs bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] font-mono focus:outline-none focus:border-[#C5A059]"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#7D736A] dark:text-[#A89E92]">
                    g
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A433F] dark:text-[#D4CCC2] mb-1">
                  {t.uploadForm.purityInput}
                </label>
                <input
                  type="text"
                  value={purity}
                  onChange={(e) => setPurity(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A433F] dark:text-[#D4CCC2] mb-1">
                  {t.uploadForm.occasionSelect}
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value as OccasionType)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="bridal">{t.occasions.bridal}</option>
                  <option value="festive">{t.occasions.festive}</option>
                  <option value="daily_wear">{t.occasions.daily_wear}</option>
                  <option value="temple">{t.occasions.temple}</option>
                  <option value="party">{t.occasions.party}</option>
                  <option value="modern">{t.occasions.modern}</option>
                </select>
              </div>
            </div>

            {/* 5. Tags & Collection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#4A433F] dark:text-[#D4CCC2] mb-1">
                  {t.uploadForm.tagsInput}
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder={t.uploadForm.tagsHelp}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] placeholder:text-[#7D736A] dark:placeholder:text-[#635B53] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A433F] dark:text-[#D4CCC2] mb-1">
                  {t.uploadForm.genderSelect}
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="women">{t.genders.women}</option>
                  <option value="men">{t.genders.men}</option>
                  <option value="unisex">{t.genders.unisex}</option>
                  <option value="kids">{t.genders.kids}</option>
                </select>
              </div>
            </div>

            {/* 6. Description */}
            <div>
              <label className="block text-xs font-semibold text-[#4A433F] dark:text-[#D4CCC2] mb-1">
                {t.uploadForm.descEn}
              </label>
              <textarea
                rows={2}
                value={descEn}
                onChange={(e) => setDescEn(e.target.value)}
                placeholder="Exquisite craftsmanship and details..."
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] dark:bg-[#25201C] border border-[#D9D1C7] dark:border-[#3D352E] rounded-xl text-[#3D3732] dark:text-[#FAF7F2] placeholder:text-[#7D736A] dark:placeholder:text-[#635B53] focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            {/* 7. Checkboxes: Hallmarked & Trending */}
            <div className="flex flex-wrap gap-4 pt-1">
              <label className="flex items-center gap-2 text-xs text-[#3D3732] dark:text-[#FAF7F2] cursor-pointer">
                <input
                  type="checkbox"
                  checked={hallmarked}
                  onChange={(e) => setHallmarked(e.target.checked)}
                  className="rounded text-[#C5A059] focus:ring-[#C5A059] accent-[#C5A059]"
                />
                <ShieldCheck className="w-3.5 h-3.5 text-[#5E8357] dark:text-[#7DAF74]" />
                <span>{t.uploadForm.markAsHallmarked}</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-[#3D3732] dark:text-[#FAF7F2] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className="rounded text-[#C5A059] focus:ring-[#C5A059] accent-[#C5A059]"
                />
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059] dark:text-[#E5C378]" />
                <span>{t.uploadForm.markAsTrending}</span>
              </label>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#EBE5DE] dark:border-[#332C26] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#FAF8F5] dark:bg-[#25201C] hover:bg-[#EBE5DE] dark:hover:bg-[#332C26] text-[#635B53] dark:text-[#A89E92] text-xs font-medium border border-[#D9D1C7] dark:border-[#3D352E] cursor-pointer"
              >
                {t.uploadForm.cancel}
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#C5A059] hover:bg-[#B38E46] dark:bg-[#E5C378] dark:hover:bg-[#D4AF37] text-white dark:text-[#1E1A17] font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{t.uploadForm.submitUpload}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
