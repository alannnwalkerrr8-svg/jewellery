import React from 'react';
import {
  X,
  Heart,
  Trash2,
  MessageCircle,
  ExternalLink,
  ShoppingBag,
} from 'lucide-react';
import { useJewelry } from '../context/JewelryContext';

export const FavoritesDrawer: React.FC = () => {
  const {
    t,
    isFavoritesOpen,
    setIsFavoritesOpen,
    favorites,
    toggleFavorite,
    designs,
    getLocalizedText,
    formatWeight,
    setSelectedDesign,
  } = useJewelry();

  if (!isFavoritesOpen) return null;

  const favoriteDesigns = designs.filter((d) => favorites.includes(d.id));

  // Bulk WhatsApp inquiry for all shortlisted items
  const getBulkWhatsAppUrl = () => {
    const phoneNumber = '919876543210';
    let text = `Hello, I am interested in these ${favoriteDesigns.length} saved jewelry designs:\n\n`;
    favoriteDesigns.forEach((item, index) => {
      const title = getLocalizedText(item.title);
      text += `${index + 1}. *${title}* (Code: ${item.code})\n`;
      text += `   Weight: ${formatWeight(item.approxWeightGrams)}, Purity: ${item.purity}\n`;
      text += `   Photo: ${item.imageUrl}\n\n`;
    });
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-[#FFFFFF] dark:bg-[#1E1A17] border-l border-[#D9D1C7] dark:border-[#3D352E] w-full max-w-md h-full shadow-2xl flex flex-col justify-between transition-colors">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EBE5DE] dark:border-[#332C26] flex items-center justify-between bg-[#FAF8F5] dark:bg-[#25201C]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C5A059] dark:text-[#E5C378] fill-[#C5A059] dark:fill-[#E5C378]" />
            <h3 className="font-serif italic text-base font-bold text-[#3D3732] dark:text-[#FAF7F2]">
              {t.savedDesigns}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#C5A059] dark:bg-[#E5C378] text-white dark:text-[#1E1A17] font-bold font-mono">
              {favoriteDesigns.length}
            </span>
          </div>

          <button
            onClick={() => setIsFavoritesOpen(false)}
            className="p-1 rounded-lg text-[#7D736A] dark:text-[#A89E92] hover:text-[#3D3732] dark:hover:text-[#FAF7F2] hover:bg-[#FAF8F5] dark:hover:bg-[#332C26] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {favoriteDesigns.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF8F5] dark:bg-[#25201C] text-[#7D736A] dark:text-[#A89E92] flex items-center justify-center mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <p className="text-xs text-[#7D736A] dark:text-[#A89E92] max-w-xs mx-auto">
                {t.noSavedDesigns}
              </p>
            </div>
          ) : (
            favoriteDesigns.map((item) => {
              const title = getLocalizedText(item.title);
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedDesign(item);
                    setIsFavoritesOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 bg-[#FAF8F5] dark:bg-[#25201C] border border-[#EBE5DE] dark:border-[#332C26] hover:border-[#C5A059] dark:hover:border-[#E5C378] rounded-xl transition-all cursor-pointer group shadow-2xs"
                >
                  <img
                    src={item.imageUrl}
                    alt={title}
                    className="w-16 h-16 rounded-lg object-cover bg-white dark:bg-[#181412]"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[#A67C2E] dark:text-[#E5C378] font-mono block">
                      {item.code}
                    </span>
                    <h4 className="text-xs font-bold text-[#3D3732] dark:text-[#FAF7F2] truncate group-hover:text-[#A67C2E] dark:group-hover:text-[#E5C378] transition-colors">
                      {title}
                    </h4>
                    <span className="text-[11px] text-[#7D736A] dark:text-[#A89E92] block mt-0.5">
                      {formatWeight(item.approxWeightGrams)} • {item.purity}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="p-1.5 rounded-lg text-[#7D736A] dark:text-[#A89E92] hover:text-[#9E4A40] dark:hover:text-[#F87171] hover:bg-white dark:hover:bg-[#1E1A17] transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {favoriteDesigns.length > 0 && (
          <div className="p-4 border-t border-[#EBE5DE] dark:border-[#332C26] bg-[#FAF8F5] dark:bg-[#25201C] space-y-2">
            <a
              href={getBulkWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#5E8357] hover:bg-[#4E7047] dark:bg-[#4E7047] dark:hover:bg-[#3F5B3A] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire All ({favoriteDesigns.length}) on WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
