import { GoogleGenAI } from '@google/genai';
import { JewelryItem } from '../types';

let aiInstance: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  // Check if API key is provided via Vite or environment
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY);
  if (!apiKey) {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function generateJewelryDescription(
  name: string,
  category: string,
  metal: string,
  stones: string
): Promise<string> {
  const ai = getAI();
  if (!ai) {
    // Elegant fallback simulation if API key is not configured
    return `Exquisitely handcrafted in prestigious ${metal}, the ${name} embodies the pinnacle of haute joaillerie. Adorned with magnificent ${stones}, each facet is precision-cut to maximize optical brilliance and scintillation. Designed for the discerning collector, this bespoke piece features refined hand-finished prongs and an assay-certified hallmark for enduring legacy.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an elite gemologist and luxury copywriter for "Lumière Haute Joaillerie", a luxury boutique jeweler on Place Vendôme / Fifth Avenue.
Write a poetic, high-conversion luxury product description for:
- Piece Name: ${name}
- Category: ${category}
- Precious Metal Alloy: ${metal}
- Gemstones & Diamonds: ${stones}

Write 2 captivating paragraphs emphasizing craftsmanship, stone clarity/sparkle, hallmarking, and timeless heirloom appeal. Keep it under 140 words.`,
    });

    return response.text || 'Magnificent haute joaillerie masterpiece.';
  } catch (error) {
    console.error('Gemini API Error:', error);
    return `Exquisitely handcrafted in prestigious ${metal}, the ${name} embodies the pinnacle of haute joaillerie. Adorned with magnificent ${stones}, each facet is precision-cut to maximize optical brilliance and scintillation.`;
  }
}

export async function generateGemologicalAppraisal(item: JewelryItem, liveGoldRate: number): Promise<string> {
  const ai = getAI();
  const stonesSummary = item.stones
    .map((s) => `${s.pieces}x ${s.caratWeight}ct ${s.cut} ${s.type} (${s.color || 'G'}/${s.clarity || 'VS1'}, Cert: ${s.certAuthority || 'None'})`)
    .join('; ');

  if (!ai) {
    return `### 💎 Official Gemological Valuation & Dossier
**Piece Identification:** ${item.name} (${item.sku})  
**Precious Alloy:** ${item.metal.purity} ${item.metal.type} (Gross: ${item.metal.grossWeightGrams}g, Net: ${item.metal.netWeightGrams}g)  
**Intrinsic Melt Value:** Approx. $${(item.metal.netWeightGrams * liveGoldRate).toFixed(2)} based on live spot rate of $${liveGoldRate}/g.  
**Gemological Analysis:**  
${stonesSummary || 'No set stones.'}  

**Estimated Insurance Replacement Value:** $${(item.pricing.retailPrice * 1.15).toFixed(2)} USD  
**Market Assessment:** High liquidity and strong collector demand for ${item.metal.purity} and certified cut gemstones. Recommended for high-value portfolio insurance schedule.`;
  }

  try {
    const prompt = `You are a Senior GIA Certified Gemological Appraiser. Generate a formal, structured Appraisal & Insurance Valuation Dossier for:
- Title: ${item.name}
- SKU: ${item.sku}
- Category: ${item.category}
- Metal: ${item.metal.purity} ${item.metal.type} (Net Weight: ${item.metal.netWeightGrams}g, Gross: ${item.metal.grossWeightGrams}g)
- Live Metal Spot Price: $${liveGoldRate}/g
- Stones: ${stonesSummary}
- Boutique Retail Selling Price: $${item.pricing.retailPrice}

Include:
1. **Material Authenticity & Metal Assay Breakdown** (Intrinsic melt value vs crafted retail)
2. **Gemological 4Cs Grading Assessment** (Cut, Color, Clarity, Carat Weight, Fluorescence, Certification)
3. **Appraised Insurance Replacement Value** (typically retail + 10-20%)
4. **Resale Liquidity & Care Recommendation**

Format with clean Markdown headers and bullet points.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || 'Appraisal dossier successfully compiled.';
  } catch (err) {
    console.error('Appraisal AI Error:', err);
    return `**Appraisal Dossier for ${item.name}**\n- Intrinsic Metal Value: $${(item.metal.netWeightGrams * liveGoldRate).toFixed(2)}\n- Retail Valuation: $${item.pricing.retailPrice}\n- Insurance Replacement Estimate: $${(item.pricing.retailPrice * 1.15).toFixed(2)}`;
  }
}

export async function generateBespokeDesignBrief(concept: string, customerName: string): Promise<string> {
  const ai = getAI();
  if (!ai) {
    return `### 👑 Bespoke Atelier Workshop Brief for ${customerName}
**Design Concept:** ${concept}

1. **Structural CAD Framework:**
- Ergonomic comfort-fit shank with reinforced gallery bridge.
- Optimal metal wall thickness: 1.8mm at base tapering to 1.4mm at shoulders.
- Double-claw micro prongs angled at 45° to maximize light refraction through gemstone pavilion.

2. **Goldsmith Execution Steps:**
- Cast in virgin high-density platinum or 18k alloy.
- Pre-polish setting seats before securing primary center stone.
- Apply high-definition assay hallmark stamp inside inner shank.

3. **Client Presentation:**
- Prepare velvet presentation box with official GIA certificate dossier and bespoke rendering prints.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a Master Goldsmith & Haute Joaillerie Designer for Lumière.
Create a comprehensive atelier workshop brief and goldsmith execution checklist for a bespoke jewelry commission:
- Client: ${customerName}
- Concept: ${concept}

Provide:
1. **Aesthetic Architecture & CAD Blueprint Specifications**
2. **Precious Metal & Stone Setting Technique** (e.g. Claw, Bezel, Pavé, Channel)
3. **Master Artisan Step-by-Step Workshop Milestones**
4. **Estimated Goldsmith Bench Time & Final Quality Assurance Checks**`,
    });

    return response.text || 'Bespoke design brief compiled.';
  } catch (err) {
    console.error('Design brief AI Error:', err);
    return `### Bespoke Workshop Brief for ${customerName}\nConcept: ${concept}\nReady for CAD modeling and precious casting.`;
  }
}
