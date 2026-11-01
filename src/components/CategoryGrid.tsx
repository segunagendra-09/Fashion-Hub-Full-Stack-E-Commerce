import React from 'react';
import { Category } from '../types';
import { ArrowUpRight } from 'lucide-react';

import categoryShirtsImage from '../assets/images/category_shirts_polos_1790922591560.jpg';
import categoryOuterwearImage from '../assets/images/category_outerwear_blazers_1790922602925.jpg';
import categoryDenimImage from '../assets/images/category_denim_trousers_1790922613543.jpg';
import categoryFootwearImage from '../assets/images/category_footwear_boots_1790922625249.jpg';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (categoryId?: number) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onSelectCategory }) => {
  const categoryImageMap: Record<number, string> = {
    1: categoryShirtsImage,
    2: categoryOuterwearImage,
    3: categoryDenimImage,
    4: categoryFootwearImage
  };

  const categorySubtitles: Record<number, string> = {
    1: 'Oxford Shirts, Linen & Mercerized Polos',
    2: 'Leather Jackets, Wool Blazers & Hoodies',
    3: 'Japanese Selvedge Jeans & Stretch Chinos',
    4: 'Calfskin Oxfords, Chelsea Boots & Sneakers'
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b08d48]">
            CURATED COLLECTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 mt-1">
            Shop By Category
          </h2>
        </div>
        <p className="text-xs text-stone-600 max-w-sm leading-relaxed">
          Explore tailored menswear crafted with premium long-staple cotton, full-grain Italian leather, and Japanese indigo selvedge.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const catImg = categoryImageMap[cat.categoryId] || cat.imageUrl;
          return (
            <div
              key={cat.categoryId}
              onClick={() => onSelectCategory(cat.categoryId)}
              className="relative h-[420px] rounded-xs overflow-hidden group cursor-pointer bg-stone-100 border border-stone-200/90 shadow-2xs hover:shadow-2xl transition-all duration-300"
            >
              {/* Category Photography */}
              <img
                src={catImg}
                alt={cat.categoryName}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Scrim for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide uppercase text-white">
                    {cat.categoryName}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#b08d48] group-hover:text-stone-950 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-stone-200 mb-3 line-clamp-1 font-light">
                  {categorySubtitles[cat.categoryId] || cat.description}
                </p>

                <div className="w-full h-0.5 bg-white/30 group-hover:bg-[#b08d48] transition-colors"></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
