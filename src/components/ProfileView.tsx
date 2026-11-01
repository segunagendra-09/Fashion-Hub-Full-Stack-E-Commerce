import React, { useState } from 'react';
import { User } from '../types';
import { User as UserIcon, Package, ShoppingBag, LogOut, Check } from 'lucide-react';

interface ProfileViewProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  onNavigate: (view: string, params?: any) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdateUser, onNavigate, onLogout }) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [phone, setPhone] = useState(user.phone);
  const [gender, setGender] = useState(user.gender);
  const [address, setAddress] = useState(user.address);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = {
      ...user,
      fullName,
      phone,
      gender,
      address
    };
    onUpdateUser(updated);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <div className="bg-white border border-gray-200 p-6 rounded-xs space-y-6 h-fit">
          <div className="text-center">
            <div className="w-16 h-16 bg-black text-[#c5a059] font-serif text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-3">
              {fullName.charAt(0)}
            </div>
            <h3 className="font-bold text-gray-900 text-sm">{fullName}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
          </div>

          <div className="space-y-1 pt-2 border-t border-gray-200 text-xs font-semibold">
            <button className="w-full text-left px-3 py-2 bg-stone-100 text-black font-bold rounded-xs flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-[#c5a059]" /> Account Profile
            </button>
            <button onClick={() => onNavigate('orders')} className="w-full text-left px-3 py-2 text-gray-600 hover:bg-stone-50 rounded-xs flex items-center gap-2">
              <Package className="w-4 h-4 text-stone-400" /> My Orders
            </button>
            <button onClick={() => onNavigate('cart')} className="w-full text-left px-3 py-2 text-gray-600 hover:bg-stone-50 rounded-xs flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-stone-400" /> Shopping Bag
            </button>
            <button onClick={onLogout} className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-xs flex items-center gap-2">
              <LogOut className="w-4 h-4 text-red-500" /> Logout
            </button>
          </div>
        </div>

        {/* Main Edit Form */}
        <div className="lg:col-span-3 bg-white border border-gray-200 p-8 rounded-xs space-y-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">Account Profile</h2>
            <p className="text-xs text-gray-500 mt-1">Manage your personal credentials and shipping defaults.</p>
          </div>

          {savedMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Profile details updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xs outline-none focus:border-[#c5a059]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Email (Read-only)</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xs bg-stone-100 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Mobile Number (+91)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xs outline-none focus:border-[#c5a059]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Gender Preference</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xs bg-white outline-none focus:border-[#c5a059]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unspecified">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Default Delivery Address (with PIN Code)</label>
              <textarea
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs p-3 border border-gray-300 rounded-xs outline-none focus:border-[#c5a059]"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white text-xs font-bold px-8 py-3 rounded-xs tracking-wider uppercase hover:bg-[#c5a059] transition-colors shadow-sm"
            >
              SAVE CHANGES
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
