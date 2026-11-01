import React from 'react';
import { Product } from '../types';
import { Star, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const discountedPrice = Math.round(product.price * (1 - product.discountPercent / 100));

  return (
    <div className="bg-white border border-stone-200/90 rounded-xs overflow-hidden group hover:shadow-xl transition-all duration-300 relative flex flex-col h-full">
      {/* Discount Tag - Clean unboxed corner ribbon */}
      {product.discountPercent > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-stone-950 text-[#c5a059] text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase">
          -{product.discountPercent}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-red-500 transition-colors shadow-xs cursor-pointer"
        title="Save to Wishlist"
      >
        <Heart className="w-4 h-4" />
      </button>

      {/* Product Photography Container */}
      <div
        className="relative h-80 bg-stone-100 overflow-hidden cursor-pointer"
        onClick={() => onSelect(product.productId)}
      >
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </div>

      {/* Information Body */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Metadata: Unboxed Text with Separator */}
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
            <span>{product.gender || 'MEN'}</span>
            <span aria-hidden="true">&bull;</span>
            <span>{product.categoryName}</span>
          </div>

          {/* Title */}
          <h3
            className="text-sm font-semibold text-stone-900 group-hover:text-[#c5a059] transition-colors line-clamp-2 cursor-pointer mb-2 leading-snug"
            onClick={() => onSelect(product.productId)}
          >
            {product.productName}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                />
              ))}
            </div>
            <span className="text-[11px] text-stone-500 font-medium">({product.reviewCount || 48})</span>
          </div>
        </div>

        <div>
          {/* Price with Tabular Numerals */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-bold text-stone-950 font-mono tabular-nums">
              ₹{discountedPrice.toLocaleString()}
            </span>
            {product.discountPercent > 0 && (
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                ₹{product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add Action Button */}
          <button
            onClick={() => onSelect(product.productId)}
            className="w-full text-center py-2.5 border border-stone-900 text-stone-900 font-bold text-xs tracking-widest uppercase hover:bg-stone-950 hover:text-white transition-colors cursor-pointer"
          >
            SELECT SIZE & ADD
          </button>
        </div>
      </div>
    </div>
  );
};
