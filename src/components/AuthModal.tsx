import React, { useState } from 'react';
import { User } from '../types';
import { X, Lock, Mail, User as UserIcon, Phone, MapPin, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('nagendrasegu2901@gmail.com');
  const [password, setPassword] = useState('Password123');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegistering) {
      if (!fullName || !email || !phone || !address || !password) {
        alert('Please fill out all required fields.');
        return;
      }
      const newUser: User = {
        userId: Date.now(),
        fullName,
        email,
        phone,
        gender,
        address,
        createdAt: new Date().toISOString()
      };
      onLoginSuccess(newUser);
      onClose();
    } else {
      if (!email || !password) {
        alert('Please enter your email and password.');
        return;
      }
      const user: User = {
        userId: 1,
        fullName: fullName || 'SEGU NAGENDRA',
        email,
        phone: phone || '+91 9876543210',
        gender: 'Male',
        address: '42 MG Road, Indiranagar, Bengaluru, Karnataka - 560038',
        createdAt: new Date().toISOString()
      };
      onLoginSuccess(user);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
      <div className="bg-white text-gray-900 w-full max-w-md rounded-sm shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 p-1 rounded-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="font-serif text-2xl font-bold tracking-wider">
            {isRegistering ? 'Join Fashion Hub' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {isRegistering
              ? 'Create your account to unlock personalised recommendations & order history.'
              : 'Sign in to access your wardrobe, saved bag, and order tracking.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Full Name *</label>
              <div className="relative flex items-center">
                <UserIcon className="w-4 h-4 text-gray-400 absolute left-3" />
                <input
                  type="text"
                  placeholder="SEGU NAGENDRA"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xs outline-none focus:border-[#c5a059]"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Email Address *</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3" />
              <input
                type="email"
                placeholder="nagendrasegu2901@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xs outline-none focus:border-[#c5a059]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Password *</label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-xs border border-gray-300 rounded-xs outline-none focus:border-[#c5a059]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isRegistering && (
            <>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Mobile Number (+91) *</label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3" />
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xs outline-none focus:border-[#c5a059]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Delivery Address (with PIN Code) *</label>
                <div className="relative flex items-start">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <textarea
                    rows={2}
                    placeholder="House/Flat No., Street, City, State & PIN code"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xs outline-none focus:border-[#c5a059]"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {!isRegistering && (
            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xs text-[11px] text-amber-900">
              <strong>Demo Account:</strong> Email: <code>nagendrasegu2901@gmail.com</code> | Password: <code>Password123</code>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-xs text-xs font-bold tracking-wider uppercase hover:bg-[#c5a059] transition-colors"
          >
            {isRegistering ? 'CREATE ACCOUNT' : 'SIGN IN'}
          </button>
        </form>

        <div className="mt-4 text-center border-t border-gray-100 pt-3 text-xs text-gray-600">
          {isRegistering ? (
            <p>
              Already have an account?{' '}
              <button onClick={() => setIsRegistering(false)} className="font-bold text-black hover:underline">
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New to Fashion Hub?{' '}
              <button onClick={() => setIsRegistering(true)} className="font-bold text-black hover:underline">
                Register
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
