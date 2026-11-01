import React from 'react';
import { ArrowRight, Sparkles, Award, Clock, ShieldCheck } from 'lucide-react';
import fullBleedHeroImage from '../assets/images/full_bleed_menswear_hero_1790923853002.jpg';

interface HeroSectionProps {
  onNavigate: (view: string, params?: any) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <div className="relative w-full overflow-hidden bg-stone-950">
      {/* Full-Bleed 100% Width Edge-to-Edge Hero Banner */}
      <div
        className="relative w-full h-[88vh] min-h-[580px] bg-cover bg-center flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-12 text-white"
        style={{ backgroundImage: `url(${fullBleedHeroImage})` }}
      >
        {/* Soft, refined directional contrast scrim overlay for left-side typography readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-0"></div>

        {/* Hero Content (Positioned over the left side of the full-bleed image) */}
        <div className="relative z-10 my-auto max-w-2xl space-y-6 pt-4">
          {/* Small Gold Editorial Label */}
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#c5a059] uppercase">
            <Sparkles className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
            <span>AUTUMN / WINTER '26 EDITORIAL</span>
          </div>

          {/* Large Premium Serif Heading */}
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold leading-[1.04] tracking-tight text-white drop-shadow-md">
            Discover <br />
            Your Style.
          </h1>

          {/* Supporting Paragraph */}
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-light max-w-xl drop-shadow-xs">
            Precision Italian tailoring, hand-crafted lambskin outerwear, raw Japanese selvedge denim, and burnished calfskin footwear. Elevate your everyday wardrobe with timeless luxury silhouettes.
          </p>

          {/* Two CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => onNavigate('products')}
              className="bg-[#c5a059] text-stone-950 px-8 py-4 text-xs font-extrabold tracking-[0.16em] uppercase flex items-center gap-2.5 hover:bg-[#d4b068] transition-all cursor-pointer shadow-xl hover:-translate-y-0.5"
            >
              <span>SHOP MENSWEAR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('products', { categoryId: 3 })}
              className="bg-black/60 backdrop-blur-md text-white border border-stone-400/50 hover:border-white px-8 py-4 text-xs font-bold tracking-[0.16em] uppercase flex items-center gap-2 transition-all cursor-pointer hover:bg-white hover:text-black"
            >
              <span>EXPLORE DENIM</span>
            </button>
          </div>
        </div>

        {/* Hero Information Strip at Bottom */}
        <div className="relative z-10 pt-6 border-t border-white/15 backdrop-blur-xs flex flex-wrap items-center justify-between gap-6 text-xs text-stone-200">
          <div className="flex items-center gap-3">
            <Award className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
            <div>
              <span className="font-bold text-white text-sm font-serif block leading-none">100% Authentic</span>
              <span className="text-[11px] text-stone-300">Long-Staple Cotton & Silk</span>
            </div>
          </div>

          <div className="hidden sm:block h-6 w-px bg-white/20"></div>

          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
            <div>
              <span className="font-bold text-white text-sm font-serif block leading-none">24–48H Express</span>
              <span className="text-[11px] text-stone-300">Pan-India Doorstep Shipping</span>
            </div>
          </div>

          <div className="hidden md:block h-6 w-px bg-white/20"></div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
            <div>
              <span className="font-bold text-white text-sm font-serif block leading-none">Hassle-Free</span>
              <span className="text-[11px] text-stone-300">30-Day Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
