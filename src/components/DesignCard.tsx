import React, { useState, useEffect } from 'react';
import {
  Heart,
  Eye,
  ShieldCheck,
  Sparkles,
  Share2,
  MessageCircle,
  Scale,
  Check,
  Edit3,
  Trash2,
  Download,
  AlertCircle,
} from 'lucide-react';
import { JewelryDesign } from '../types/jewelry';
import { useJewelry } from '../context/JewelryContext';
import { downloadJewelryImage } from '../utils/downloadImage';

interface DesignCardProps {
  design: JewelryDesign;
}

export const DesignCard: React.FC<DesignCardProps> = ({ design }) => {
  const {
    t,
    favorites,
    toggleFavorite,
    setSelectedDesign,
    getLocalizedText,
    formatWeight,
    isUploadEnabled,
    startEditDesign,
    deleteDesign,
  } = useJewelry();

  const isFav = favorites.includes(design.id);
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Auto-reset delete confirmation after 4 seconds
  useEffect(() => {
    if (confirmDelete) {
      const timer = setTimeout(() => setConfirmDelete(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [confirmDelete]);

  const title = getLocalizedText(design.title);
  const desc = getLocalizedText(design.description);
  const formattedWeight = formatWeight(design.approxWeightGrams);

  // Direct WhatsApp Inquiry link generator to owner number 8000461400
  const getWhatsAppUrl = () => {
    const ownerWhatsApp = '918000461400';
    let text = `Hello Vishal Patadia (Shree Hari Jewellers),\n\n`;
    text += `I would like to inquire about this product:\n`;
    text += `*Product Name:* ${title}\n`;
    text += `*Design Code:* ${design.code}\n`;
    text += `*Category:* ${t.categories[design.category]}\n`;
    text += `*Purity / Metal:* ${design.purity} (${t.metalTypes[design.metalType]})\n`;
    text += `*Approx Weight:* ${formattedWeight}\n`;
    text += `*Product Image:* ${design.imageUrl}\n\n`;
    text += `Please share current price & availability at your Santej Chokdi, Ahmedabad showroom.`;
    return `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(text)}`;
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    deleteDesign(design.id);
    setConfirmDelete(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    startEditDesign(design);
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloading(true);
    const filename = `${design.code}_${title.toLowerCase().replace(/\s+/g, '_')}`;
    const ok = await downloadJewelryImage(design.imageUrl, filename);
    setDownloading(false);
    if (ok) {
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: `${title} - ${t.appName}`,
      text: `${title} (Code: ${design.code}, ${formattedWeight}, ${design.purity})`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      navigator.clipboard.writeText(`${title} - ${design.code}\n${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      onClick={() => setSelectedDesign(design)}
      className="group bg-[#FFFFFF] dark:bg-[#1E1A17] border border-[#D9D1C7] dark:border-[#3D352E] hover:border-[#C5A059] dark:hover:border-[#E5C378] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Image Container with Zoom & Badges */}
      <div className="relative w-full aspect-4/3 bg-[#FAF8F5] dark:bg-[#25201C] overflow-hidden">
        {/* Loading shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#EBE5DE] to-[#FAF8F5] dark:from-[#25201C] dark:via-[#332C26] dark:to-[#25201C] animate-pulse" />
        )}

        <img
          src={design.imageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          {design.isTrending && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF8F5]/95 dark:bg-[#1E1A17]/95 text-[#A67C2E] dark:text-[#E5C378] border border-[#C5A059] dark:border-[#E5C378] flex items-center gap-1 backdrop-blur-xs shadow-2xs">
              <Sparkles className="w-2.5 h-2.5 text-[#C5A059] dark:text-[#E5C378]" />
              <span>{t.trending}</span>
            </span>
          )}
          {design.hallmarked && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FAF8F5]/95 dark:bg-[#1E1A17]/95 text-[#4B6B46] dark:text-[#7DAF74] border border-[#5E8357]/60 dark:border-[#7DAF74]/60 flex items-center gap-1 backdrop-blur-xs shadow-2xs">
              <ShieldCheck className="w-2.5 h-2.5 text-[#5E8357] dark:text-[#7DAF74]" />
              <span>916</span>
            </span>
          )}
        </div>

        {/* Top Right: Download, Share & Favorite Heart */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 z-10">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-8 h-8 rounded-full bg-white/90 dark:bg-[#1E1A17]/90 hover:bg-white dark:hover:bg-[#2B231C] text-[#635B53] dark:text-[#D4CCC2] hover:text-[#3D3732] dark:hover:text-[#FAF7F2] flex items-center justify-center backdrop-blur-xs shadow-xs transition-transform active:scale-90 cursor-pointer"
            title={downloaded ? 'Downloaded!' : downloading ? 'Downloading...' : t.downloadPhoto || 'Download Photo'}
          >
            {downloading ? (
              <span className="w-3.5 h-3.5 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
            ) : downloaded ? (
              <Check className="w-3.5 h-3.5 text-[#5E8357] dark:text-[#7DAF74]" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-white/90 dark:bg-[#1E1A17]/90 hover:bg-white dark:hover:bg-[#2B231C] text-[#635B53] dark:text-[#D4CCC2] hover:text-[#3D3732] dark:hover:text-[#FAF7F2] flex items-center justify-center backdrop-blur-xs shadow-xs transition-transform active:scale-90 cursor-pointer"
            title={t.shareDesign}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[#5E8357] dark:text-[#7DAF74]" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(design.id);
            }}
            className="w-8 h-8 rounded-full bg-white/90 dark:bg-[#1E1A17]/90 hover:bg-white dark:hover:bg-[#2B231C] flex items-center justify-center backdrop-blur-xs shadow-xs transition-transform active:scale-90 cursor-pointer"
            title={t.like}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFav
                  ? 'text-[#C5A059] dark:text-[#E5C378] fill-[#C5A059] dark:fill-[#E5C378]'
                  : 'text-[#7D736A] dark:text-[#9E9387] hover:text-[#C5A059]'
              }`}
            />
          </button>
        </div>

        {/* Bottom Floating Pill: Code & Weight */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 rounded-lg bg-black/70 text-white text-[10px] font-mono backdrop-blur-xs">
            {design.code}
          </span>
          <span className="px-2.5 py-0.5 rounded-lg bg-[#FAF8F5]/95 dark:bg-[#1E1A17]/95 text-[#3D3732] dark:text-[#FAF7F2] text-[11px] font-semibold font-mono border border-[#D9D1C7] dark:border-[#3D352E] shadow-xs flex items-center gap-1 backdrop-blur-xs">
            <Scale className="w-3 h-3 text-[#A67C2E] dark:text-[#E5C378]" />
            <span>{formattedWeight}</span>
          </span>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white dark:bg-[#1E1A17] transition-colors">
        <div>
          {/* Category & Purity */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-[#A67C2E] dark:text-[#E5C378] font-semibold uppercase tracking-wider">
              {t.categories[design.category]}
            </span>
            <span className="text-[#7D736A] dark:text-[#A89E92] font-medium">
              {design.purity}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif italic font-bold text-[#3D3732] dark:text-[#FAF7F2] text-sm sm:text-base line-clamp-1 group-hover:text-[#A67C2E] dark:group-hover:text-[#E5C378] transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-[#7D736A] dark:text-[#A89E92] text-xs line-clamp-2 mt-1 leading-relaxed">
            {desc}
          </p>

          {/* Tags */}
          {design.tags && design.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {design.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 text-[10px] rounded bg-[#FAF8F5] dark:bg-[#25201C] text-[#635B53] dark:text-[#D4CCC2] border border-[#EBE5DE] dark:border-[#332C26]"
                >
                  #{tag}
                </span>
              ))}
              {design.tags.length > 3 && (
                <span className="text-[10px] text-[#7D736A] dark:text-[#9E9387] self-center">
                  +{design.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions: WhatsApp Inquiry & View Details */}
        <div className="pt-3 mt-3 border-t border-[#EBE5DE] dark:border-[#332C26] flex items-center gap-2">
          {/* Direct WhatsApp button */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-1.5 px-2.5 rounded-xl bg-[#5E8357] hover:bg-[#4E7047] dark:bg-[#4E7047] dark:hover:bg-[#3F5B3A] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            title={t.inquireWhatsApp}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="truncate">{t.inquireWhatsApp}</span>
          </a>

          {/* Quick View */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDesign(design);
            }}
            className="p-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#25201C] hover:bg-[#EBE5DE] dark:hover:bg-[#332C26] text-[#635B53] dark:text-[#D4CCC2] hover:text-[#3D3732] dark:hover:text-[#FAF7F2] border border-[#D9D1C7] dark:border-[#3D352E] transition-colors cursor-pointer"
            title={t.viewDetails}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Design Management Actions (Edit & Delete - enabled via Safety Feature) */}
          {isUploadEnabled && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleEdit}
                className="p-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/80 text-[#A67C2E] dark:text-[#E5C378] border border-amber-300 dark:border-amber-800 transition-colors cursor-pointer"
                title="Edit Design"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className={`p-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                  confirmDelete
                    ? 'bg-red-600 hover:bg-red-700 text-white border border-red-700 px-2'
                    : 'bg-red-50 dark:bg-red-950/60 hover:bg-red-100 dark:hover:bg-red-900/80 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-800'
                }`}
                title={confirmDelete ? 'Click again to confirm delete' : 'Delete Design'}
              >
                <Trash2 className="w-4 h-4 shrink-0" />
                {confirmDelete && (
                  <span className="text-[10px] font-bold whitespace-nowrap animate-pulse">
                    Delete?
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
