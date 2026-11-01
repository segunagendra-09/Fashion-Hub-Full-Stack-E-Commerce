import React from 'react';
import { Order } from '../types';
import { Package, ChevronRight } from 'lucide-react';

interface OrdersViewProps {
  orders: Order[];
  onNavigate: (view: string, params?: any) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, onNavigate }) => {
  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-400">
          <Package className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-gray-900">No Orders Placed Yet</h2>
        <p className="text-xs text-gray-500 mt-2 mb-8">
          You haven't made any purchases yet. Discover your signature wardrobe today.
        </p>
        <button
          onClick={() => onNavigate('products')}
          className="bg-black text-white text-xs font-bold px-8 py-3.5 rounded-xs tracking-widest uppercase hover:bg-[#c5a059] transition-colors"
        >
          EXPLORE PRODUCTS
        </button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-emerald-100 text-emerald-800';
      case 'SHIPPED':
      case 'OUT FOR DELIVERY':
        return 'bg-blue-100 text-blue-800';
      case 'CONFIRMED':
      case 'PLACED':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-stone-100 text-stone-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-xs text-gray-500 mt-1">Review and track your recent purchases and order history.</p>
      </div>

      <div className="space-y-6">
        {orders.map((o) => (
          <div key={o.orderId} className="bg-white border border-gray-200 rounded-xs p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 gap-2">
              <div>
                <span className="font-serif font-bold text-base text-gray-900">Order #FH-{o.orderId}</span>
                <span className="text-xs text-gray-500 ml-3">
                  {new Date(o.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${getStatusColor(o.orderStatus)}`}>
                {o.orderStatus}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                {o.items.map((item) => (
                  <div key={item.orderItemId} className="flex items-center gap-3 text-xs text-gray-700">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.productName} className="w-10 h-12 object-cover rounded-xs" />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{item.productName}</div>
                      <div className="text-[11px] text-gray-500">Size: {item.sizeLabel} | Qty: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">Total Paid</div>
                  <div className="text-lg font-bold text-gray-900">₹{o.totalAmount.toLocaleString()}</div>
                </div>

                <button
                  onClick={() => onNavigate('order-details', { orderId: o.orderId })}
                  className="border border-black px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors flex items-center gap-1 rounded-xs"
                >
                  View Details <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
