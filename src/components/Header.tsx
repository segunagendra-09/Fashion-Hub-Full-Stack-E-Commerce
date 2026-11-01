import React, { useState } from 'react';
import { User } from '../types';
import { ShoppingBag, Search, User as UserIcon, LogOut, Package, IdCard, Heart, Menu, X, MapPin, ChevronRight, Sparkles } from 'lucide-react';
import { LocationModal } from './LocationModal';

interface HeaderProps {
  user: User | null;
  cartCount: number;
  deliveryLocation: string;
  onSelectLocation: (newLocation: string) => void;
  onNavigate: (view: string, params?: any) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onPerformSearch: (e: React.FormEvent) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  cartCount,
  deliveryLocation,
  onSelectLocation,
  onNavigate,
  onOpenAuth,
  onLogout,
  searchQuery,
  setSearchQuery,
  onPerformSearch
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navTo = (view: string, params?: any) => {
    onNavigate(view, params);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-2xs">
      {/* Top Announcement Bar with Delivery Location Selector */}
      <div className="bg-[#0b0b0b] text-stone-200 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-3 overflow-hidden">
          {/* Promo Badge */}
          <div className="flex items-center gap-2 text-stone-300">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="hidden sm:inline font-medium tracking-wide">
              PAN-INDIA EXPRESS SHIPPING OVER ₹999 &bull; CODE: <strong className="text-[#c5a059]">ELEVATE</strong>
            </span>
          </div>

          {/* Delivery Location Button */}
          <button
            onClick={() => setLocationModalOpen(true)}
            className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-[#c5a059] transition-colors cursor-pointer group max-w-full truncate"
            title="Click to change delivery PIN code or city"
          >
            <MapPin className="w-3.5 h-3.5 text-[#c5a059] flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span className="font-medium flex-shrink-0 text-stone-400">Deliver to:</span>
            <span className="font-semibold text-white max-w-[160px] sm:max-w-[320px] md:max-w-[420px] truncate underline underline-offset-2 decoration-stone-600 group-hover:decoration-[#c5a059]">
              {deliveryLocation}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
          </button>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-3.5 flex items-center justify-between gap-6">
        
        {/* LEFT: Mobile Hamburger & FASHION HUB Branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 text-stone-900 hover:text-[#c5a059] cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <a href="#" onClick={(e) => { e.preventDefault(); navTo('home'); }} className="cursor-pointer">
            <span className="font-serif text-2xl font-bold tracking-[0.18em] text-stone-950 uppercase">
              FASHION <span className="text-[#c5a059]">HUB</span>
            </span>
          </a>
        </div>

        {/* CENTER: Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold tracking-[0.15em] uppercase text-stone-900">
          <button onClick={() => navTo('home')} className="hover:text-[#c5a059] transition-colors cursor-pointer">
            HOME
          </button>
          <button onClick={() => navTo('products', { gender: 'Men' })} className="hover:text-[#c5a059] transition-colors cursor-pointer">
            MEN
          </button>
          <button onClick={() => navTo('products', { gender: 'Women' })} className="hover:text-[#c5a059] transition-colors cursor-pointer">
            WOMEN
          </button>
          <button onClick={() => navTo('products')} className="hover:text-[#c5a059] transition-colors cursor-pointer">
            NEW ARRIVALS
          </button>
          <button onClick={() => navTo('products')} className="hover:text-[#c5a059] transition-colors cursor-pointer">
            CATEGORIES
          </button>
          <button onClick={() => navTo('products', { minDiscount: 15 })} className="text-[#c5a059] font-extrabold hover:text-amber-600 transition-colors cursor-pointer">
            OFFERS
          </button>
        </nav>

        {/* RIGHT: Search, Wishlist, Cart, Profile */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <form onSubmit={onPerformSearch} className="hidden sm:flex items-center bg-stone-100 rounded-full px-3.5 py-1.5 w-40 sm:w-52 border border-stone-200 focus-within:border-[#c5a059] focus-within:bg-white transition-all">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-stone-900 placeholder-stone-400"
            />
            <button type="submit" className="text-stone-500 hover:text-stone-950 cursor-pointer">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Wishlist */}
          <button
            onClick={() => navTo('products')}
            className="p-1.5 text-stone-900 hover:text-[#c5a059] transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>

          {/* Cart */}
          <button
            onClick={() => navTo('cart')}
            className="relative p-1.5 text-stone-900 hover:text-[#c5a059] transition-colors cursor-pointer"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c5a059] text-stone-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile / Account */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-1.5 text-stone-900 hover:text-[#c5a059] transition-colors cursor-pointer flex items-center gap-1"
                title="Profile"
              >
                <UserIcon className="w-5 h-5" />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 shadow-xl py-1 z-50 rounded-xs"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    onClick={() => { setDropdownOpen(false); navTo('profile'); }}
                    className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:bg-stone-50 cursor-pointer"
                  >
                    <IdCard className="w-4 h-4 text-stone-500" />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => { setDropdownOpen(false); navTo('orders'); }}
                    className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:bg-stone-50 cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-stone-500" />
                    <span>My Orders</span>
                  </button>
                  <div className="border-t border-stone-100 my-1"></div>
                  <button
                    onClick={() => { setDropdownOpen(false); onLogout(); }}
                    className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="p-1.5 text-stone-900 hover:text-[#c5a059] transition-colors cursor-pointer"
              title="Profile / Login"
            >
              <UserIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-6 py-4 space-y-3 shadow-xl">
          <form onSubmit={onPerformSearch} className="flex items-center bg-stone-100 rounded-full px-3.5 py-2 w-full border border-stone-200 mb-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-stone-900 placeholder-stone-400"
            />
            <button type="submit" className="text-stone-500 hover:text-black cursor-pointer">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <button onClick={() => navTo('home')} className="block w-full text-left font-bold text-xs uppercase tracking-widest py-2 border-b border-stone-100 text-stone-900">
            HOME
          </button>
          <button onClick={() => navTo('products', { gender: 'Men' })} className="block w-full text-left font-bold text-xs uppercase tracking-widest py-2 border-b border-stone-100 text-stone-900">
            MEN
          </button>
          <button onClick={() => navTo('products', { gender: 'Women' })} className="block w-full text-left font-bold text-xs uppercase tracking-widest py-2 border-b border-stone-100 text-stone-900">
            WOMEN
          </button>
          <button onClick={() => navTo('products')} className="block w-full text-left font-bold text-xs uppercase tracking-widest py-2 border-b border-stone-100 text-stone-900">
            NEW ARRIVALS
          </button>
          <button onClick={() => navTo('products')} className="block w-full text-left font-bold text-xs uppercase tracking-widest py-2 border-b border-stone-100 text-stone-900">
            CATEGORIES
          </button>
          <button onClick={() => navTo('products', { minDiscount: 15 })} className="block w-full text-left font-bold text-xs uppercase tracking-widest py-2 text-[#c5a059]">
            OFFERS
          </button>
        </div>
      )}

      {/* Location Modal */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        currentLocation={deliveryLocation}
        onSelectLocation={onSelectLocation}
      />
    </header>
  );
};
