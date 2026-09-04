import React, { useState } from 'react';
import {
  Clock,
  X,
  MapPin,
  Phone,
  Calendar,
  Send,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { useJewelry } from '../context/JewelryContext';

export const ShowroomHoursModal: React.FC = () => {
  const {
    isHoursModalOpen,
    setIsHoursModalOpen,
    shopDetails,
    t,
    submitSuggestedHours,
  } = useJewelry();

  const [suggestForm, setSuggestForm] = useState({
    name: '',
    phone: '',
    preferredDay: 'Sunday',
    preferredTime: '10:00 AM - 12:00 PM',
    note: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isHoursModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestForm.name || !suggestForm.phone) return;

    submitSuggestedHours(suggestForm);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSuggestForm({
        name: '',
        phone: '',
        preferredDay: 'Sunday',
        preferredTime: '10:00 AM - 12:00 PM',
        note: '',
      });
    }, 2500);
  };

  const handleSendWhatsApp = () => {
    const text = `Namaste Vishal bhai (Shree Hari Jewellers),\n\nI would like to suggest visiting hours for jewelry viewing:\n• Name: ${suggestForm.name || 'Customer'}\n• Phone: ${suggestForm.phone || 'N/A'}\n• Preferred Day: ${suggestForm.preferredDay}\n• Preferred Time: ${suggestForm.preferredTime}\n• Requirement/Notes: ${suggestForm.note || 'Bridal/Gold consultation'}\n\nLooking forward to hearing from you.`;
    window.open(`https://wa.me/${shopDetails.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div
      id="showroom-hours-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsHoursModalOpen(false);
      }}
    >
      <div
        id="showroom-hours-modal"
        className="w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#1A2229] border border-[#D9D1C7] dark:border-[#2C3843] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE5DE] dark:border-[#26323D] bg-white dark:bg-[#151C22]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 dark:bg-[#E5C378]/15 flex items-center justify-center text-[#A67C2E] dark:text-[#E5C378]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1E1915] dark:text-[#FAF7F2]">
                Showroom Timings & Location
              </h3>
              <p className="text-xs text-[#635B53] dark:text-[#9DAEC0]">
                {shopDetails.name} • Owner: <strong className="text-[#1E1915] dark:text-[#FAF7F2]">{shopDetails.ownerName}</strong>
              </p>
            </div>
          </div>
          <button
            id="close-hours-modal-btn"
            onClick={() => setIsHoursModalOpen(false)}
            className="p-2 rounded-lg text-[#635B53] dark:text-[#9DAEC0] hover:bg-[#EBE5DE] dark:hover:bg-[#283542] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#3D3732] dark:text-[#C5D0DC]">
          {/* Address & Owner Info Banner */}
          <div className="p-4 rounded-xl bg-white dark:bg-[#151C22] border border-[#D9D1C7] dark:border-[#2C3843] space-y-3 shadow-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-[#1E1915] dark:text-[#FAF7F2]">
                  Showroom Address
                </h4>
                <p className="text-xs text-[#635B53] dark:text-[#9DAEC0] leading-relaxed mt-1">
                  {shopDetails.address}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <a
                    href={shopDetails.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#C5A059]/15 hover:bg-[#C5A059]/25 text-[#A67C2E] dark:text-[#E5C378] font-bold text-xs transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-[#B3AAA0] dark:text-[#4B5966]">•</span>
                  <span className="text-xs font-medium text-[#635B53] dark:text-[#9DAEC0]">
                    Santej Chokdi, Ahmedabad
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Phone Contacts */}
            <div className="pt-3 border-t border-[#EBE5DE] dark:border-[#24303B] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#1E1915] dark:text-[#FAF7F2]">Contact:</span>
                <span className="text-[#635B53] dark:text-[#9DAEC0]">Vishal Patadia</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`tel:${shopDetails.phone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#10B981]/15 hover:bg-[#10B981]/25 text-[#059669] dark:text-[#34D399] font-bold text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>8000-461400</span>
                </a>
                <a
                  href={`tel:${shopDetails.secondaryPhone.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#10B981]/15 hover:bg-[#10B981]/25 text-[#059669] dark:text-[#34D399] font-bold text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>96532-46571</span>
                </a>
                <a
                  href={`https://wa.me/${shopDetails.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#128C7E] dark:text-[#25D366] font-bold text-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Operating Hours Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-serif text-sm font-bold text-[#1E1915] dark:text-[#FAF7F2] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span>Showroom Operating Schedule (Open 7 Days)</span>
              </h4>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                Open Daily 9 AM – 9 PM
              </span>
            </div>

            <div className="bg-white dark:bg-[#151C22] border border-[#D9D1C7] dark:border-[#2C3843] rounded-xl overflow-hidden divide-y divide-[#EBE5DE] dark:divide-[#24303B]">
              {shopDetails.weeklySchedule.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 transition-colors ${
                    item.isSpecial
                      ? 'bg-amber-50/70 dark:bg-amber-950/30 font-medium'
                      : 'hover:bg-[#FAF8F5] dark:hover:bg-[#1A232B]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className="font-semibold text-[#1E1915] dark:text-[#FAF7F2]">
                      {item.day}
                    </span>
                    {item.isSpecial && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-200 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200">
                        Krishna Janmashtami
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1 sm:mt-0">
                    <span className="font-mono font-bold text-[#A67C2E] dark:text-[#E5C378]">
                      {item.hours}
                    </span>
                    {item.note && (
                      <span className="text-[10px] text-[#8C827A] dark:text-[#7A8C9E] italic">
                        ({item.note})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggest New Hours Form */}
          <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#172027] border border-[#E3D8C8] dark:border-[#2A3744]">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <h4 className="font-serif font-bold text-sm text-[#1E1915] dark:text-[#FAF7F2]">
                Suggest New Visiting Hours
              </h4>
            </div>
            <p className="text-xs text-[#635B53] dark:text-[#9DAEC0] mb-4">
              Looking for an early morning or late night bridal jewelry appointment? Share your preferred timings directly with owner Vishal Patadia:
            </p>

            {submitted ? (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! Your suggested hours were submitted to Vishal Patadia.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#4A423A] dark:text-[#C5D0DC] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={suggestForm.name}
                      onChange={(e) => setSuggestForm({ ...suggestForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#12181F] text-[#1E1915] dark:text-[#FAF7F2]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#4A423A] dark:text-[#C5D0DC] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98765-43210"
                      value={suggestForm.phone}
                      onChange={(e) => setSuggestForm({ ...suggestForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#12181F] text-[#1E1915] dark:text-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#4A423A] dark:text-[#C5D0DC] mb-1">
                      Preferred Day
                    </label>
                    <select
                      value={suggestForm.preferredDay}
                      onChange={(e) => setSuggestForm({ ...suggestForm, preferredDay: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#12181F] text-[#1E1915] dark:text-[#FAF7F2]"
                    >
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Any Day">Any Day (Flexible)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-[#4A423A] dark:text-[#C5D0DC] mb-1">
                      Suggested Time Slot
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 8:00 AM - 10:00 AM or 9:30 PM"
                      value={suggestForm.preferredTime}
                      onChange={(e) => setSuggestForm({ ...suggestForm, preferredTime: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#12181F] text-[#1E1915] dark:text-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#4A423A] dark:text-[#C5D0DC] mb-1">
                    Requirements / Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bridal set viewing with family or gold valuation"
                    value={suggestForm.note}
                    onChange={(e) => setSuggestForm({ ...suggestForm, note: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] bg-white dark:bg-[#12181F] text-[#1E1915] dark:text-[#FAF7F2]"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-2.5">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C5A059] hover:bg-[#B38F46] text-white font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Suggested Hours</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Send via WhatsApp to Vishal Patadia</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#EBE5DE] dark:border-[#26323D] bg-white dark:bg-[#151C22] flex items-center justify-between">
          <span className="text-xs text-[#635B53] dark:text-[#8E9CA8]">
            Shree Hari Jewellers • Santej Chokdi, Ahmedabad
          </span>
          <button
            onClick={() => setIsHoursModalOpen(false)}
            className="px-4 py-1.5 rounded-xl border border-[#D9D1C7] dark:border-[#2C3843] text-xs font-semibold text-[#3D3732] dark:text-[#C5D0DC] hover:bg-gray-100 dark:hover:bg-[#202B36] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
