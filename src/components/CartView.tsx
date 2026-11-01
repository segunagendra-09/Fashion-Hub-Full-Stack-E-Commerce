import React from 'react';
import { CartItem } from '../types';
import { Trash2, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: number, newQty: number) => void;
  onRemoveItem: (cartItemId: number) => void;
  onNavigate: (view: string, params?: any) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate
}) => {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-gray-900">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-gray-500 mt-2 mb-8 max-w-md mx-auto">
          Explore our latest collection drops and elevate your wardrobe today.
        </p>
        <button
          onClick={() => onNavigate('products')}
          className="bg-black text-white text-xs font-bold px-8 py-3.5 rounded-xs tracking-widest uppercase hover:bg-[#c5a059] transition-colors"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-serif text-3xl font-bold text-gray-900 mb-8">Your Shopping Bag ({cartItems.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="hidden sm:grid grid-cols-6 gap-4 bg-[#f7f3ed] p-3 text-xs font-bold uppercase tracking-wider text-gray-800 rounded-xs">
            <span className="col-span-2">Product Details</span>
            <span className="text-center">Size</span>
            <span className="text-center">Price</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Subtotal</span>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-white border border-gray-200 p-4 rounded-xs flex flex-col sm:grid sm:grid-cols-6 gap-4 items-center"
            >
              <div className="col-span-2 flex items-center gap-3 w-full">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.productName}
                  className="w-16 h-20 object-cover rounded-xs flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div>
                  <h4
                    onClick={() => onNavigate('product-details', { productId: item.productId })}
                    className="text-xs font-bold text-gray-900 hover:text-[#c5a059] cursor-pointer line-clamp-1"
                  >
                    {item.product.productName}
                  </h4>
                  <span className="text-[10px] text-gray-500 uppercase">{item.product.categoryName}</span>
                </div>
              </div>

              <div className="text-center">
                <span className="bg-stone-100 text-stone-800 text-xs font-bold px-2.5 py-1 rounded-xs">
                  {item.sizeLabel}
                </span>
              </div>

              <div className="text-center text-xs font-semibold text-gray-900">
                ₹{item.unitPrice.toLocaleString()}
              </div>

              <div className="flex items-center justify-center">
                <select
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.cartItemId, Number(e.target.value))}
                  className="text-xs border border-gray-300 px-2 py-1 rounded-xs bg-white outline-none focus:border-[#c5a059]"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 w-full">
                <span className="font-bold text-xs text-gray-900">₹{item.subtotal.toLocaleString()}</span>
                <button
                  onClick={() => onRemoveItem(item.cartItemId)}
                  className="text-gray-400 hover:text-red-600 transition-colors p-1"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4">
            <button
              onClick={() => onNavigate('products')}
              className="text-xs font-bold text-gray-800 hover:text-[#c5a059] flex items-center gap-2 uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </button>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white border border-gray-200 p-6 rounded-xs h-fit space-y-4">
          <h3 className="font-serif text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">Order Summary</h3>

          <div className="flex justify-between text-xs text-gray-600">
            <span>Bag Subtotal</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-xs text-gray-600">
            <span>Estimated Shipping</span>
            <span className="text-emerald-600 font-bold">FREE</span>
          </div>

          <div className="flex justify-between text-xs text-gray-600">
            <span>GST & Taxes</span>
            <span>Included</span>
          </div>

          <hr className="border-gray-200" />

          <div className="flex justify-between text-base font-extrabold text-gray-900 pt-1">
            <span>Total Payable</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>

          <button
            onClick={() => onNavigate('checkout')}
            className="w-full bg-black text-white py-3.5 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#c5a059] transition-colors rounded-xs shadow-md"
          >
            PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-2">
            <ShieldCheck className="w-4 h-4 text-[#c5a059]" /> 100% Encrypted & Secure Checkout
          </div>
        </div>
      </div>
    </div>
  );
};
