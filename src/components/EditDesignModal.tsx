import React, { useState, useEffect } from 'react';
import { Edit3, X, Save, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useJewelry } from '../context/JewelryContext';
import { JewelryCategory, MetalType, OccasionType, GenderType } from '../types/jewelry';

export const EditDesignModal: React.FC = () => {
  const {
    isEditModalOpen,
    setIsEditModalOpen,
    editingDesign,
    setEditingDesign,
    updateDesign,
    isUploadEnabled,
    t,
  } = useJewelry();

  const [formData, setFormData] = useState({
    titleEn: '',
    titleGu: '',
    titleHi: '',
    code: '',
    category: 'rings' as JewelryCategory,
    metalType: 'gold_22k' as MetalType,
    purity: '22K 916 BIS Hallmark',
    approxWeightGrams: 8.5,
    occasion: 'daily' as OccasionType,
    gender: 'women' as GenderType,
    tags: '',
    imageUrl: '',
    descEn: '',
    descGu: '',
    descHi: '',
    isTrending: false,
    hallmarked: true,
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (editingDesign) {
      setFormData({
        titleEn: typeof editingDesign.title === 'string' ? editingDesign.title : editingDesign.title.en,
        titleGu: typeof editingDesign.title === 'object' && editingDesign.title.gu ? editingDesign.title.gu : '',
        titleHi: typeof editingDesign.title === 'object' && editingDesign.title.hi ? editingDesign.title.hi : '',
        code: editingDesign.code,
        category: editingDesign.category,
        metalType: editingDesign.metalType,
        purity: editingDesign.purity,
        approxWeightGrams: editingDesign.approxWeightGrams,
        occasion: editingDesign.occasion,
        gender: editingDesign.gender,
        tags: editingDesign.tags ? editingDesign.tags.join(', ') : '',
        imageUrl: editingDesign.imageUrl,
        descEn: typeof editingDesign.description === 'string' ? editingDesign.description : (editingDesign.description?.en || ''),
        descGu: typeof editingDesign.description === 'object' && editingDesign.description?.gu ? editingDesign.description.gu : '',
        descHi: typeof editingDesign.description === 'object' && editingDesign.description?.hi ? editingDesign.description.hi : '',
        isTrending: !!editingDesign.isTrending,
        hallmarked: !!editingDesign.hallmarked,
      });
      setSuccess(false);
    }
  }, [editingDesign]);

  if (!isEditModalOpen || !editingDesign) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleEn || !formData.approxWeightGrams) return;

    const parsedTags = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    updateDesign(editingDesign.id, {
      title: {
        en: formData.titleEn,
        gu: formData.titleGu || formData.titleEn,
        hi: formData.titleHi || formData.titleEn,
      },
      code: formData.code || editingDesign.code,
      category: formData.category,
      metalType: formData.metalType,
      purity: formData.purity,
      approxWeightGrams: Number(formData.approxWeightGrams),
      occasion: formData.occasion,
      gender: formData.gender,
      tags: parsedTags,
      imageUrl: formData.imageUrl || editingDesign.imageUrl,
      description: {
        en: formData.descEn,
        gu: formData.descGu || formData.descEn,
        hi: formData.descHi || formData.descEn,
      },
      isTrending: formData.isTrending,
      hallmarked: formData.hallmarked,
    });

    setSuccess(true);
    setTimeout(() => {
      setIsEditModalOpen(false);
      setEditingDesign(null);
    }, 900);
  };

  return (
    <div
      id="edit-design-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsEditModalOpen(false);
          setEditingDesign(null);
        }
      }}
    >
      <div
        id="edit-design-modal"
        className="w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#1A2229] border border-[#D9D1C7] dark:border-[#2C3843] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE5DE] dark:border-[#26323D] bg-white dark:bg-[#151C22]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 dark:bg-[#E5C378]/15 flex items-center justify-center text-[#A67C2E] dark:text-[#E5C378]">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1E1915] dark:text-[#FAF7F2] flex items-center gap-2">
                <span>Edit Jewelry Design</span>
                <span className="text-xs px-2 py-0.5 rounded-md font-mono bg-amber-100 dark:bg-amber-900/50 text-[#A67C2E] dark:text-[#E5C378]">
                  {editingDesign.code}
                </span>
              </h3>
              <p className="text-xs text-[#635B53] dark:text-[#9DAEC0]">
                Admin Mode (Vishal Patadia) • Modify specifications and pricing parameters
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsEditModalOpen(false);
              setEditingDesign(null);
            }}
            className="p-2 rounded-lg text-[#635B53] dark:text-[#9DAEC0] hover:bg-[#EBE5DE] dark:hover:bg-[#283542] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {success && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Design updated successfully!</span>
            </div>
          )}

          {/* Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-[#3D3732] dark:text-[#C5D0DC] mb-1">
                Title (English) *
              </label>
              <input
                type="text"
                required
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#12181F] text-[#1E1915] dark:text-[#FAF7F2] focus:ring-2 focus:ring-[#C5A059]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#3D3732] dark:text-[#C5D0DC] mb-1">
                Title (Gujarati)
              </label>
              <input
                type="text"
                value={formData.titleGu}
                onChange={(e) => setFormData({ ...formData, titleGu: e.target.value })}
                placeholder="ગુજરાતી નામ"
                className="w-full px-3 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#12181F] text-[#1E1915] dark:text-[#FAF7F2] focus:ring-2 focus:ring-[#C5A059]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#3D3732] dark:text-[#C5D0DC] mb-1">
                Title (Hindi)
              </label>
              <input
                type="text"
                value={formData.titleHi}
                onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
                placeholder="हिन्दी नाम"
                className="w-full px-3 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#12181F] text-[#1E1915] dark:text-[#FAF7F2] focus:ring-2 focus:ring-[#C5A059]"
              />
            </div>
          </div>

          {/* Category, Metal, Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-[#3D3732] dark:text-[#C5D0DC] mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as JewelryCategory })}
                className="w-full px-3 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#12181F] text-[#1E1915] dark:text-[#FAF7F2]"
              >
                <option value="rings">Rings</option>
                <option value="necklaces">Necklaces</option>
                <option value="bangles">Bangles & Kadas</option>
                <option value="earrings">Earrings</option>
                <option value="mangalsutra">Mangalsutra</option>
                <option value="pendants">Pendants</option>
                <option value="bridal_sets">Bridal Sets</option>
                <option value="chains">Chains</option>
                <option value="silver_items">Silver Articles & Utensils</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#3D3732] dark:text-[#C5D0DC] mb-1">
                Metal Type
              </label>
              <select
                value={formData.metalType}
                onChange={(e) => setFormData({ ...formData, metalType: e.target.value as MetalType })}
                className="w-full px-3 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#12181F] text-[#1E1915] dark:text-[#FAF7F2]"
              >
                <option value="gold_22k">22K Yellow Gold (916)</option>
                <option value="gold_24k">24K Pure Gold (999)</option>
                <option value="gold_18k">18K Gold (750)</option>
                <option value="rose_gold">18K Rose Gold</option>
                <option value="silver">925 Sterling Silver</option>
                <option value="diamond">Diamond & 18K Gold</option>
                <option value="kundan_polki">Antique Kundan Polki</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#3D3732] dark:text-[#C5D0DC] mb-1">
                Approx Weight (Grams) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0.1"
                required
                value={formData.approxWeightGrams}
                onChange={(e) => setFormData({ ...formData, approxWeightGrams: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#12181F] text-[#1E1915] dark:text-[#FAF7F2]"
              />
            </div>
          </div>

          {/* Purity & Occasion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#3D3732] dark:text-[#C5D0DC] mb-1">
                Purity / Hallmark Certification
              </label>
              <input
                type="text"
                value={formData.purity}
                onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#12181F] text-[#1E1915] dark:text-[#FAF7F2]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#3D3732] dark:text-[#C5D0DC] mb-1">
                Occasion
              </label>
              <select
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value as OccasionType })}
                className="w-full px-3 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#12181F] text-[#1E1915] dark:text-[#FAF7F2]"
              >
                <option value="daily">Daily Wear</option>
                <option value="bridal">Bridal & Wedding</option>
                <option value="festive">Festive & Traditional</option>
                <option value="party">Party & Cocktail</option>
                <option value="office">Office & Minimalist</option>
                <option value="gifting">Gifting & Shubh Muhurat</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block font-semibold text-[#3D3732] dark:text-[#C5D0DC] mb-1">
              Search Tags (comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g. antique, bridal, lightweight, royal"
              className="w-full px-3 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#12181F] text-[#1E1915] dark:text-[#FAF7F2]"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-semibold text-[#3D3732] dark:text-[#C5D0DC] mb-1">
              Photo URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="flex-1 px-3 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#12181F] text-[#1E1915] dark:text-[#FAF7F2]"
              />
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-10 h-10 object-cover rounded-lg border border-[#D9D1C7]"
                />
              )}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap items-center gap-6 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.hallmarked}
                onChange={(e) => setFormData({ ...formData, hallmarked: e.target.checked })}
                className="w-4 h-4 text-[#C5A059] rounded-sm focus:ring-[#C5A059]"
              />
              <span className="text-[#3D3732] dark:text-[#FAF7F2] font-medium">
                BIS 916 Hallmarked Certified
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.isTrending}
                onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                className="w-4 h-4 text-[#C5A059] rounded-sm focus:ring-[#C5A059]"
              />
              <span className="text-[#3D3732] dark:text-[#FAF7F2] font-medium flex items-center gap-1 text-amber-700 dark:text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                Featured / Trending Design
              </span>
            </label>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-[#EBE5DE] dark:border-[#26323D] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                setEditingDesign(null);
              }}
              className="px-4 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] text-[#635B53] dark:text-[#9DAEC0] hover:bg-gray-100 dark:hover:bg-[#202B36] font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#C5A059] hover:bg-[#B38F46] text-white font-bold shadow-md transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
