import React, { useState } from 'react';
import { Product } from '../types';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, Check, ChevronRight } from 'lucide-react';

interface ProductDetailsViewProps {
  product: Product;
  onAddToCart: (product: Product, sizeLabel: string, quantity: number) => void;
  onNavigate: (view: string, params?: any) => void;
}

export const ProductDetailsView: React.FC<ProductDetailsViewProps> = ({
  product,
  onAddToCart,
  onNavigate
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);

  const discountedPrice = Math.round(product.price * (1 - product.discountPercent / 100));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSize) {
      alert('Please select a size (XS, S, M, L, XL, etc.) before adding to cart.');
      return;
    }
    onAddToCart(product, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8 uppercase tracking-wider">
        <button onClick={() => onNavigate('home')} className="hover:text-black">Home</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => onNavigate('products')} className="hover:text-black">Collection</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900 font-semibold truncate">{product.productName}</span>
      </nav>

      {addedToast && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xs flex items-center justify-between text-emerald-800 text-xs font-bold">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Successfully added "{product.productName}" (Size {selectedSize}) to your bag!</span>
          </div>
          <button
            onClick={() => onNavigate('cart')}
            className="bg-emerald-800 text-white px-3 py-1 rounded-xs uppercase tracking-wider text-[10px]"
          >
            VIEW BAG
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Frame */}
        <div className="bg-stone-100 rounded-xs overflow-hidden h-[540px] shadow-sm">
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>

        {/* Details Info */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-[#c5a059] uppercase tracking-[0.2em] block mb-1">
              FASHION HUB &bull; {product.gender} COLLECTION
            </span>
            <h1 className="font-serif text-3xl font-bold text-gray-900">{product.productName}</h1>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-500 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-600">4.9 (128 Verified Reviews)</span>
            </div>
          </div>

          {/* Price Row */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-3xl font-bold text-black">₹{discountedPrice.toLocaleString()}</span>
            {product.discountPercent > 0 && (
              <>
                <span className="text-base text-gray-400 line-through">₹{product.price.toLocaleString()}</span>
                <span className="bg-[#f7f3ed] text-[#b08d48] text-xs font-bold px-2.5 py-1 rounded-full border border-[#c5a059]/30">
                  SAVE {product.discountPercent}% OFF
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-gray-500 -mt-3">Inclusive of all GST & taxes. Pan-India free express delivery applied.</p>

          <hr className="border-gray-200" />

          <form onSubmit={handleAdd} className="space-y-6">
            {/* Size Chips */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-900">Select Size *</label>
                <button
                  type="button"
                  onClick={() => alert('Indian Standard Size Guide:\n• Small (S): 38" (96 cm) Chest\n• Medium (M): 40" (102 cm) Chest\n• Large (L): 42" (107 cm) Chest\n• Extra Large (XL): 44" (112 cm) Chest\n• Double XL (XXL): 46" (117 cm) Chest')}
                  className="text-xs text-[#c5a059] font-bold hover:underline"
                >
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((sz) => (
                  <button
                    type="button"
                    key={sz.productSizeId}
                    onClick={() => setSelectedSize(sz.sizeLabel)}
                    disabled={!sz.isAvailable || sz.stockQuantity === 0}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xs border transition-all ${
                      selectedSize === sz.sizeLabel
                        ? 'bg-black text-white border-black shadow-xs'
                        : 'bg-white text-gray-800 border-gray-300 hover:border-black'
                    } ${(!sz.isAvailable || sz.stockQuantity === 0) ? 'opacity-40 cursor-not-allowed line-through' : ''}`}
                  >
                    {sz.sizeLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">Quantity</label>
              <div className="flex items-center border border-gray-300 rounded-xs w-32 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-stone-100 font-bold"
                >
                  -
                </button>
                <span className="flex-1 text-center text-xs font-bold text-gray-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-stone-100 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                className="flex-1 bg-black text-white py-3.5 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#c5a059] transition-colors rounded-xs shadow-md"
              >
                <ShoppingBag className="w-4 h-4" /> ADD TO BAG
              </button>
              <button
                type="button"
                onClick={() => alert('Saved to Wishlist!')}
                className="p-3.5 border border-gray-300 hover:border-black text-gray-800 rounded-xs transition-colors"
                title="Save to Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Description Accordion */}
          <div className="border-t border-gray-200 pt-6 space-y-3 text-xs text-gray-600">
            <h3 className="font-bold uppercase text-gray-900 tracking-wider">Product Overview</h3>
            <p className="leading-relaxed">{product.description}</p>
            <ul className="space-y-1.5 pt-2">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#c5a059]" /> Premium long-staple cotton / Italian leather finish</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#c5a059]" /> Tailored Modern Silhouette</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#c5a059]" /> Dry clean or gentle cold wash</li>
            </ul>
          </div>

          {/* Assurance Icons */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 text-[11px] text-gray-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#c5a059]" /> Pan-India Delivery
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#c5a059]" /> 30 Days Easy Return
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a059]" /> 100% Genuine Brand
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
