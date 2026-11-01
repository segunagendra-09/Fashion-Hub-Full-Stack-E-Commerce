import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headset } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#f3f1ea] border-t border-stone-300 text-stone-800 pt-16">
      {/* Value Proposition Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-stone-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex items-center gap-4">
          <Truck className="w-8 h-8 text-[#b08d48] flex-shrink-0" />
          <div>
            <h4 className="font-bold text-stone-950 text-sm">Complimentary Shipping</h4>
            <p className="text-xs text-stone-600">On all orders above ₹999</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RotateCcw className="w-8 h-8 text-[#b08d48] flex-shrink-0" />
          <div>
            <h4 className="font-bold text-stone-950 text-sm">30 Days Easy Returns</h4>
            <p className="text-xs text-stone-600">Hassle-free doorstep pickup</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-8 h-8 text-[#b08d48] flex-shrink-0" />
          <div>
            <h4 className="font-bold text-stone-950 text-sm">100% Encrypted Checkout</h4>
            <p className="text-xs text-stone-600">PCI-DSS compliant payment gateway</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Headset className="w-8 h-8 text-[#b08d48] flex-shrink-0" />
          <div>
            <h4 className="font-bold text-stone-950 text-sm">24/7 VIP Concierge</h4>
            <p className="text-xs text-stone-600">Dedicated fashion stylists</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="font-serif text-2xl font-bold tracking-widest text-stone-950 mb-2 cursor-pointer" onClick={() => onNavigate('home')}>
            FASHION <span className="text-[#b08d48]">HUB</span>
          </div>
          <p className="text-xs text-[#b08d48] tracking-widest uppercase mb-4 font-semibold">"Discover Your Style."</p>
          <p className="text-xs text-stone-600 leading-relaxed mb-6 font-normal">
            Curating timeless elegance, modern tailoring, and luxury everyday essentials for the contemporary menswear wardrobe.
          </p>
        </div>

        <div>
          <h4 className="text-stone-950 text-xs font-bold uppercase tracking-wider mb-4 border-b border-stone-300 pb-2">Collections</h4>
          <ul className="space-y-2.5 text-xs text-stone-700 font-medium">
            <li><button onClick={() => onNavigate('products', { categoryId: 1 })} className="hover:text-[#b08d48] transition-colors cursor-pointer">Shirts & Polos</button></li>
            <li><button onClick={() => onNavigate('products', { categoryId: 2 })} className="hover:text-[#b08d48] transition-colors cursor-pointer">Outerwear & Blazers</button></li>
            <li><button onClick={() => onNavigate('products', { categoryId: 3 })} className="hover:text-[#b08d48] transition-colors cursor-pointer">Denim & Trousers</button></li>
            <li><button onClick={() => onNavigate('products', { categoryId: 4 })} className="hover:text-[#b08d48] transition-colors cursor-pointer">Footwear & Boots</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-stone-950 text-xs font-bold uppercase tracking-wider mb-4 border-b border-stone-300 pb-2">Customer Service</h4>
          <ul className="space-y-2.5 text-xs text-stone-700 font-medium">
            <li><button onClick={() => onNavigate('orders')} className="hover:text-[#b08d48] transition-colors cursor-pointer">Track Your Order</button></li>
            <li><button onClick={() => onNavigate('profile')} className="hover:text-[#b08d48] transition-colors cursor-pointer">My Account</button></li>
            <li><button onClick={() => onNavigate('cart')} className="hover:text-[#b08d48] transition-colors cursor-pointer">Shopping Bag</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-stone-950 text-xs font-bold uppercase tracking-wider mb-4 border-b border-stone-300 pb-2">Privilege Circle</h4>
          <p className="text-xs text-stone-600 mb-4 font-normal">Subscribe for private collection drops and bespoke styling updates.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to FASHION HUB Newsletter!'); }} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="bg-white text-xs px-3 py-2 rounded-xs border border-stone-300 text-stone-900 outline-none focus:border-[#b08d48] w-full"
            />
            <button type="submit" className="bg-stone-950 text-white text-xs font-bold px-4 py-2 hover:bg-[#b08d48] transition-colors uppercase cursor-pointer">
              JOIN
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#e9e6dd] py-6 border-t border-stone-300 text-center text-xs text-stone-600 font-medium">
        <p>&copy; 2026 FASHION HUB. All rights reserved. Designed & Developed by <span className="text-[#b08d48] font-bold">SEGU NAGENDRA</span>.</p>
      </div>
    </footer>
  );
};
