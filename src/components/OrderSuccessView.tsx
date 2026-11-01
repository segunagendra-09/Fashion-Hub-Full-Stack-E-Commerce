import React from 'react';
import { Order } from '../types';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';

interface OrderSuccessViewProps {
  order: Order | null;
  onNavigate: (view: string, params?: any) => void;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({ order, onNavigate }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="bg-white border border-gray-200 p-8 sm:p-12 rounded-xs shadow-sm space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold text-[#c5a059] tracking-[0.2em] uppercase block">
            THANK YOU FOR YOUR ORDER
          </span>
          <h1 className="font-serif text-3xl font-bold text-gray-900 mt-1">Order Placed Successfully!</h1>
          <p className="text-xs text-gray-500 mt-2 max-w-md mx-auto">
            We are preparing your fashion items for swift dispatch. A notification has been dispatched to your profile.
          </p>
        </div>

        {order && (
          <div className="bg-[#f7f3ed] p-6 rounded-xs border border-[#c5a059]/30 text-left text-xs space-y-3 font-sans">
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-gray-600">Order Reference:</span>
              <strong className="text-black font-mono">#FH-{order.orderId}</strong>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-gray-600">Total Amount Paid:</span>
              <strong className="text-black">₹{order.totalAmount.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-gray-600">Payment Method:</span>
              <strong className="text-black">{order.paymentMethod}</strong>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-gray-600">Order Status:</span>
              <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-xs">
                {order.orderStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Address:</span>
              <span className="text-black text-right max-w-[240px] truncate">{order.deliveryAddress}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          {order && (
            <button
              onClick={() => onNavigate('order-details', { orderId: order.orderId })}
              className="flex-1 bg-black text-white py-3 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#c5a059] transition-colors rounded-xs"
            >
              VIEW ORDER DETAILS <ArrowRight className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onNavigate('orders')}
            className="flex-1 bg-stone-100 text-stone-900 py-3 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-stone-200 transition-colors rounded-xs"
          >
            <Package className="w-4 h-4" /> MY ORDERS
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-3 border border-gray-300 hover:border-black text-gray-800 text-xs font-bold rounded-xs transition-colors"
            title="Return Home"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
