import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  Share2,
  Download,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Scale,
  Check,
  Gem,
  Tag,
  Calendar,
  Calculator,
  MapPin,
  Edit3,
  Trash2,
} from 'lucide-react';
import { useJewelry } from '../context/JewelryContext';
import { downloadJewelryImage } from '../utils/downloadImage';

export const DesignDetailModal: React.FC = () => {
  const {
    selectedDesign,
    setSelectedDesign,
    t,
    favorites,
    toggleFavorite,
    getLocalizedText,
    formatWeight,
    designs,
    liveRates,
    shopDetails,
    calculateEstimate,
    setIsRateCalculatorOpen,
    isUploadEnabled,
    startEditDesign,
    deleteDesign,
  } = useJewelry();

  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (confirmDelete) {
      const timer = setTimeout(() => setConfirmDelete(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [confirmDelete]);

  if (!selectedDesign) return null;

  const isFav = favorites.includes(selectedDesign.id);
  const title = getLocalizedText(selectedDesign.title);
  const desc = getLocalizedText(selectedDesign.description);
  const formattedWeight = formatWeight(selectedDesign.approxWeightGrams);

  // Estimate computation for this design using live Ahmedabad rates
  let purityKey: '22k' | '24k' | '18k' | 'silver' = '22k';
  if (selectedDesign.purity.includes('24K')) purityKey = '24k';
  else if (selectedDesign.purity.includes('18K')) purityKey = '18k';
  else if (selectedDesign.metalType === 'silver') purityKey = 'silver';

  const estimate = calculateEstimate(selectedDesign.approxWeightGrams, purityKey, 12);

  // WhatsApp Inquiry Generator with all product details and image to owner number 8000461400
  const getWhatsAppUrl = () => {
    const ownerWhatsApp = '918000461400';
    let text = `Hello Vishal Patadia (Shree Hari Jewellers),\n\n`;
    text += `I would like to inquire about this product:\n`;
    text += `*Product Name:* ${title}\n`;
    text += `*Design Code:* ${selectedDesign.code}\n`;
    text += `*Category:* ${t.categories[selectedDesign.category]}\n`;
    text += `*Purity / Metal:* ${selectedDesign.purity} (${t.metalTypes[selectedDesign.metalType]})\n`;
    text += `*Approx Weight:* ${formattedWeight}\n`;
    text += `*Estimated Ahmedabad Value:* ₹${estimate.totalAmount.toLocaleString('en-IN')} (incl. making & GST)\n`;
    text += `*Product Image:* ${selectedDesign.imageUrl}\n\n`;
    text += `Please confirm availability at your Santej Chokdi showroom (Shop 12 Mahakali Complex, Ahmedabad).`;
    return `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(text)}`;
  };

  const handleEdit = () => {
    const target = selectedDesign;
    setSelectedDesign(null);
    startEditDesign(target);
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    deleteDesign(selectedDesign.id);
    setSelectedDesign(null);
    setConfirmDelete(false);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${title} - ${t.appName}`,
      text: `${title} (Code: ${selectedDesign.code}, Weight: ${formattedWeight}, Est: ₹${estimate.totalAmount.toLocaleString('en-IN')})`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      navigator.clipboard.writeText(`${title} - ${selectedDesign.code}\n${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    const filename = `${selectedDesign.code}_${title.toLowerCase().replace(/\s+/g, '_')}`;
    const ok = await downloadJewelryImage(selectedDesign.imageUrl, filename);
    setDownloading(false);
    if (ok) {
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    }
  };

  // Related designs in same category
  const relatedDesigns = designs
    .filter((d) => d.category === selectedDesign.category && d.id !== selectedDesign.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FFFFFF] dark:bg-[#181E24] border border-[#D9D1C7] dark:border-[#2C3843] rounded-2xl max-w-4xl w-full shadow-2xl text-[#3D3732] dark:text-[#E8EDF2] my-auto overflow-hidden transition-colors">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EBE5DE] dark:border-[#26313B] flex items-center justify-between bg-[#FAF8F5] dark:bg-[#13191F]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-white dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] text-[#7D736A] dark:text-[#8E9CA8]">
              {selectedDesign.code}
            </span>
            <span className="text-xs text-[#A67C2E] dark:text-[#E5C378] font-semibold uppercase tracking-wider">
              {t.categories[selectedDesign.category]}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Design Management Actions (Edit & Delete - enabled via Safety Feature) */}
            {isUploadEnabled && (
              <>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/80 text-[#A67C2E] dark:text-[#E5C378] border border-amber-300 dark:border-amber-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Edit design specifications"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    confirmDelete
                      ? 'bg-red-600 hover:bg-red-700 text-white border border-red-700 animate-pulse'
                      : 'bg-red-50 dark:bg-red-950/60 hover:bg-red-100 dark:hover:bg-red-900/80 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-800'
                  }`}
                  title={confirmDelete ? 'Click again to confirm delete' : 'Delete this design'}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{confirmDelete ? 'Confirm Delete?' : 'Delete'}</span>
                </button>
              </>
            )}

            <button
              onClick={() => toggleFavorite(selectedDesign.id)}
              className="p-2 rounded-xl bg-white dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] hover:bg-[#FAF8F5] dark:hover:bg-[#283542] transition-colors cursor-pointer"
              title={t.like}
            >
              <Heart
                className={`w-4 h-4 ${
                  isFav
                    ? 'text-[#C5A059] dark:text-[#E5C378] fill-[#C5A059] dark:fill-[#E5C378]'
                    : 'text-[#7D736A] dark:text-[#8E9CA8]'
                }`}
              />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] hover:bg-[#FAF8F5] dark:hover:bg-[#283542] transition-colors cursor-pointer"
              title={t.shareDesign}
            >
              {copied ? (
                <Check className="w-4 h-4 text-[#5E8357] dark:text-[#7DAF74]" />
              ) : (
                <Share2 className="w-4 h-4 text-[#7D736A] dark:text-[#8E9CA8]" />
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="p-2 rounded-xl bg-white dark:bg-[#1E2730] border border-[#D9D1C7] dark:border-[#2C3843] hover:bg-[#FAF8F5] dark:hover:bg-[#283542] transition-colors cursor-pointer"
              title={downloaded ? 'Downloaded!' : downloading ? 'Downloading...' : t.downloadPhoto}
            >
              {downloading ? (
                <span className="w-4 h-4 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin inline-block" />
              ) : downloaded ? (
                <Check className="w-4 h-4 text-[#5E8357] dark:text-[#7DAF74]" />
              ) : (
                <Download className="w-4 h-4 text-[#7D736A] dark:text-[#8E9CA8]" />
              )}
            </button>

            <button
              onClick={() => setSelectedDesign(null)}
              className="p-2 rounded-xl text-[#7D736A] dark:text-[#8E9CA8] hover:text-[#3D3732] dark:hover:text-[#FAF7F2] hover:bg-[#FAF8F5] dark:hover:bg-[#283542] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[75vh] overflow-y-auto">
          {/* Left: Big Photo */}
          <div className="bg-[#FAF8F5] dark:bg-[#13191F] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#EBE5DE] dark:border-[#26313B] relative">
            <div className="relative w-full aspect-square max-h-96 rounded-xl overflow-hidden bg-white dark:bg-[#1E2730] shadow-xs border border-[#D9D1C7] dark:border-[#2C3843]">
              <img
                src={selectedDesign.imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Live Ahmedabad Rate Estimate Badge on Image */}
            <div className="mt-4 w-full p-3 rounded-xl bg-white dark:bg-[#1E2730] border border-[#10B981]/30 text-center shadow-2xs">
              <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] uppercase tracking-wider block">
                Ahmedabad Market Price Estimate
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-[#10B981] block mt-0.5">
                ₹{estimate.totalAmount.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] block">
                (Base: ₹{estimate.baseValue.toLocaleString('en-IN')} + 12% Making + 3% GST)
              </span>
            </div>
          </div>

          {/* Right: Specifications & Inquiries */}
          <div className="p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-bold text-[#A67C2E] dark:text-[#E5C378] tracking-wider">
                  {selectedDesign.gender ? t.genders[selectedDesign.gender] : 'Fine Jewelry'}
                </span>
                {selectedDesign.isTrending && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#D97706] bg-[#FEF3C7] dark:bg-[#452D12] dark:text-[#FDE68A] px-2 py-0.5 rounded-md">
                    <Sparkles className="w-3 h-3" />
                    {t.trending}
                  </span>
                )}
              </div>

              <h3 className="font-serif italic font-bold text-lg sm:text-xl text-[#3D3732] dark:text-[#FAF7F2]">
                {title}
              </h3>

              <p className="text-xs text-[#7D736A] dark:text-[#8E9CA8] mt-2 leading-relaxed">
                {desc}
              </p>

              {/* Specifications Table */}
              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-semibold text-[#4A433F] dark:text-[#D4CCC2] uppercase tracking-wider">
                  {t.specifications}
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#FAF8F5] dark:bg-[#1E2730] p-2.5 rounded-xl border border-[#EBE5DE] dark:border-[#26313B]">
                    <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] block">
                      {t.approxWeight}:
                    </span>
                    <span className="font-bold text-[#3D3732] dark:text-[#FAF7F2] font-mono text-sm">
                      {formattedWeight}
                    </span>
                  </div>

                  <div className="bg-[#FAF8F5] dark:bg-[#1E2730] p-2.5 rounded-xl border border-[#EBE5DE] dark:border-[#26313B]">
                    <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] block">
                      {t.purity}:
                    </span>
                    <span className="font-bold text-[#A67C2E] dark:text-[#E5C378]">
                      {selectedDesign.purity}
                    </span>
                  </div>

                  <div className="bg-[#FAF8F5] dark:bg-[#1E2730] p-2.5 rounded-xl border border-[#EBE5DE] dark:border-[#26313B]">
                    <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] block">
                      Metal Type:
                    </span>
                    <span className="font-semibold text-[#3D3732] dark:text-[#FAF7F2]">
                      {t.metalTypes[selectedDesign.metalType]}
                    </span>
                  </div>

                  <div className="bg-[#FAF8F5] dark:bg-[#1E2730] p-2.5 rounded-xl border border-[#EBE5DE] dark:border-[#26313B]">
                    <span className="text-[10px] text-[#7D736A] dark:text-[#8E9CA8] block">
                      Occasion / Style:
                    </span>
                    <span className="font-semibold text-[#3D3732] dark:text-[#FAF7F2]">
                      {t.occasions[selectedDesign.occasion]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {selectedDesign.tags && selectedDesign.tags.length > 0 && (
                <div className="mt-3">
                  <span className="text-[11px] text-[#7D736A] dark:text-[#8E9CA8] block mb-1">
                    {t.tags}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDesign.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[10px] rounded-lg bg-[#FAF8F5] dark:bg-[#1E2730] text-[#635B53] dark:text-[#D4CCC2] border border-[#D9D1C7] dark:border-[#26313B]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Hallmarking Trust Badge */}
              {selectedDesign.hallmarked && (
                <div className="mt-3 p-2.5 bg-[#5E8357]/10 dark:bg-[#7DAF74]/15 border border-[#5E8357]/30 dark:border-[#7DAF74]/30 rounded-xl flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#5E8357] dark:text-[#7DAF74] shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-[#4B6B46] dark:text-[#7DAF74] block">
                      {t.hallmarked}
                    </span>
                    <span className="text-[11px] text-[#5E8357] dark:text-[#96C88D]">
                      100% BIS 916 Stamped & Certified
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions: WhatsApp Call-to-action & Rate Calculator */}
            <div className="pt-3 border-t border-[#EBE5DE] dark:border-[#26313B] space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#5E8357] hover:bg-[#4E7047] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire on WhatsApp</span>
                </a>

                <button
                  onClick={() => setIsRateCalculatorOpen(true)}
                  className="py-2.5 px-3 rounded-xl bg-white dark:bg-[#1E2730] border border-[#10B981] text-[#10B981] hover:bg-[#10B981]/10 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Live Rate Calculator</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#7D736A] dark:text-[#8E9CA8] px-1">
                <span>Code: <strong>{selectedDesign.code}</strong> • Owner: <strong className="text-[#3D3732] dark:text-[#FAF7F2]">{shopDetails.ownerName}</strong></span>
                <a
                  href={shopDetails.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1 text-[#A67C2E] dark:text-[#E5C378] font-medium"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Santej Chokdi, Ahmedabad</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Designs Footer */}
        {relatedDesigns.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#EBE5DE] dark:border-[#26313B] bg-[#FAF8F5] dark:bg-[#13191F]">
            <h4 className="text-xs font-semibold text-[#4A433F] dark:text-[#D4CCC2] uppercase tracking-wider mb-3">
              {t.relatedDesigns} ({t.categories[selectedDesign.category]})
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {relatedDesigns.map((rel) => {
                const relTitle = getLocalizedText(rel.title);
                return (
                  <div
                    key={rel.id}
                    onClick={() => setSelectedDesign(rel)}
                    className="flex items-center gap-2.5 p-2 bg-white dark:bg-[#1E2730] rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] hover:border-[#C5A059] dark:hover:border-[#E5C378] transition-all cursor-pointer shadow-2xs"
                  >
                    <img
                      src={rel.imageUrl}
                      alt={relTitle}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h5 className="text-xs font-bold text-[#3D3732] dark:text-[#FAF7F2] truncate">
                        {relTitle}
                      </h5>
                      <span className="text-[10px] text-[#A67C2E] dark:text-[#E5C378] font-mono block">
                        {formatWeight(rel.approxWeightGrams)} • {rel.purity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
