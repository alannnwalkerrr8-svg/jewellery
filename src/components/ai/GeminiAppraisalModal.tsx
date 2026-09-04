import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Copy,
  Check,
  Printer,
  ShieldCheck,
  Gem,
  Coins,
  RefreshCw,
} from 'lucide-react';
import { JewelryItem } from '../../types';
import { useStore } from '../../context/StoreContext';
import {
  generateGemologicalAppraisal,
  generateJewelryDescription,
  generateBespokeDesignBrief,
} from '../../services/aiService';

interface GeminiAppraisalModalProps {
  mode: 'appraisal' | 'description' | 'bespoke_brief';
  item?: JewelryItem | null;
  conceptInfo?: { title: string; customer: string; category?: string; metal?: string; stones?: string };
  onClose: () => void;
  onApplyText?: (text: string) => void;
}

export const GeminiAppraisalModal: React.FC<GeminiAppraisalModalProps> = ({
  mode,
  item,
  conceptInfo,
  onClose,
  onApplyText,
}) => {
  const { metalRates } = useStore();

  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      if (mode === 'appraisal' && item) {
        const text = await generateGemologicalAppraisal(item, metalRates.gold18k);
        setResultText(text);
      } else if (mode === 'description' && conceptInfo) {
        const text = await generateJewelryDescription(
          conceptInfo.title || 'Fine Ring',
          conceptInfo.category || 'Rings',
          conceptInfo.metal || '18K Yellow Gold',
          conceptInfo.stones || 'Diamonds'
        );
        setResultText(text);
      } else if (mode === 'bespoke_brief' && conceptInfo) {
        const text = await generateBespokeDesignBrief(
          conceptInfo.title || 'Custom Solitaire',
          conceptInfo.customer || 'VIP Client'
        );
        setResultText(text);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [mode, item?.id, conceptInfo?.title]);

  const handleCopy = () => {
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const titleText = {
    appraisal: 'Gemological Appraisal & Insurance Valuation Dossier',
    description: 'AI Luxury Copywriting & Storytelling Generator',
    bespoke_brief: 'Bespoke Atelier CAD & Goldsmith Workshop Brief',
  }[mode];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-750 rounded-2xl max-w-2xl w-full shadow-2xl text-stone-200 overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-base font-bold text-stone-100">
                {titleText}
              </h3>
              <p className="text-xs text-stone-400">
                Powered by Gemini 2.5 Flash luxury gemological model.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="w-8 h-8 mx-auto text-amber-400 animate-spin" />
              <p className="font-serif-luxury text-stone-200 text-sm">
                Consulting Haute Joaillerie Gemological Engine...
              </p>
              <p className="text-stone-400 text-xs max-w-sm mx-auto">
                Analyzing precious metal assays, diamond 4Cs criteria, insurance replacement indices, and craftsmanship benchmarks.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl space-y-3 text-stone-300 leading-relaxed font-sans whitespace-pre-wrap">
                {resultText}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950 flex items-center justify-between">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs font-medium border border-stone-700 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={loading || !resultText}
              className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-medium border border-stone-700 flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Output'}</span>
            </button>

            {onApplyText && (
              <button
                onClick={() => {
                  onApplyText(resultText);
                  onClose();
                }}
                disabled={loading || !resultText}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-950/30 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Apply to Form</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
