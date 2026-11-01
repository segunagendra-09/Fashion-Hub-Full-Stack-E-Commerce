import React, { useState } from 'react';
import { CartItem, User, Order } from '../types';
import { Check, CreditCard, QrCode, Banknote, ShieldCheck } from 'lucide-react';

interface CheckoutViewProps {
  user: User;
  cartItems: CartItem[];
  onPlaceOrder: (paymentMethod: string, deliveryAddress: string) => Order;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ user, cartItems, onPlaceOrder }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('UPI');
  const [deliveryAddress, setDeliveryAddress] = useState<string>(user.address || '');

  const totalAmount = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryAddress.trim()) {
      alert('Please enter a delivery address.');
      return;
    }
    onPlaceOrder(paymentMethod, deliveryAddress);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-serif text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Address */}
          <div className="bg-white border border-gray-200 p-6 rounded-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
              <span className="w-6 h-6 bg-black text-[#c5a059] font-bold text-xs rounded-full flex items-center justify-center">1</span>
              <h2 className="font-serif text-lg font-bold text-gray-900">Delivery Address</h2>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Shipping Address *</label>
              <textarea
                rows={3}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full text-xs p-3 border border-gray-300 rounded-xs outline-none focus:border-[#c5a059]"
                required
              />
              <p className="text-[11px] text-gray-500 mt-1">Recipient: <strong>{user.fullName}</strong> ({user.phone})</p>
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div className="bg-white border border-gray-200 p-6 rounded-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
              <span className="w-6 h-6 bg-black text-[#c5a059] font-bold text-xs rounded-full flex items-center justify-center">2</span>
              <h2 className="font-serif text-lg font-bold text-gray-900">Payment Method</h2>
            </div>

            <div className="space-y-3">
              <label
                className={`flex items-center gap-4 p-4 border rounded-xs cursor-pointer transition-colors ${
                  paymentMethod === 'UPI' ? 'border-black bg-stone-50' : 'border-gray-200 hover:bg-stone-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                />
                <QrCode className="w-5 h-5 text-[#c5a059]" />
                <div>
                  <div className="text-xs font-bold text-gray-900">UPI / Google Pay / PhonePe / Paytm</div>
                  <div className="text-[11px] text-gray-500">Instant payment authorization</div>
                </div>
              </label>

              <label
                className={`flex items-center gap-4 p-4 border rounded-xs cursor-pointer transition-colors ${
                  paymentMethod === 'Credit/Debit Card' ? 'border-black bg-stone-50' : 'border-gray-200 hover:bg-stone-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Credit/Debit Card"
                  checked={paymentMethod === 'Credit/Debit Card'}
                  onChange={() => setPaymentMethod('Credit/Debit Card')}
                />
                <CreditCard className="w-5 h-5 text-[#c5a059]" />
                <div>
                  <div className="text-xs font-bold text-gray-900">Credit / Debit Card</div>
                  <div className="text-[11px] text-gray-500">Visa, MasterCard, Amex & Rupay</div>
                </div>
              </label>

              <label
                className={`flex items-center gap-4 p-4 border rounded-xs cursor-pointer transition-colors ${
                  paymentMethod === 'Cash on Delivery' ? 'border-black bg-stone-50' : 'border-gray-200 hover:bg-stone-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={() => setPaymentMethod('Cash on Delivery')}
                />
                <Banknote className="w-5 h-5 text-[#c5a059]" />
                <div>
                  <div className="text-xs font-bold text-gray-900">Cash on Delivery (COD)</div>
                  <div className="text-[11px] text-gray-500">Pay upon doorstep receipt</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary Sidebar */}
        <div className="bg-white border border-gray-200 p-6 rounded-xs h-fit space-y-4">
          <h3 className="font-serif text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">Items ({cartItems.length})</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="flex items-center gap-3 text-xs">
                <img src={item.product.imageUrl} alt={item.product.productName} className="w-10 h-12 object-cover rounded-xs" />
                <div className="flex-1 truncate">
                  <div className="font-semibold text-gray-900 truncate">{item.product.productName}</div>
                  <div className="text-[10px] text-gray-500">Size: {item.sizeLabel} | Qty: {item.quantity}</div>
                </div>
                <div className="font-bold text-gray-900">₹{item.subtotal.toLocaleString()}</div>
              </div>
            ))}
          </div>

          <hr className="border-gray-200" />

          <div className="flex justify-between text-xs text-gray-600">
            <span>Items Subtotal</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-xs text-gray-600">
            <span>Delivery Fee</span>
            <span className="text-emerald-600 font-bold">FREE</span>
          </div>

          <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total Payable</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3.5 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#c5a059] transition-colors rounded-xs shadow-md"
          >
            PLACE ORDER NOW <Check className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-2">
            <ShieldCheck className="w-4 h-4 text-[#c5a059]" /> 100% Encrypted Payment
          </div>
        </div>
      </form>
    </div>
  );
};
