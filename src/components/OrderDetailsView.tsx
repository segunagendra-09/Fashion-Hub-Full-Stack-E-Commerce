import React from 'react';
import { Order } from '../types';
import { ChevronRight, Receipt, Package, Truck, Home } from 'lucide-react';

interface OrderDetailsViewProps {
  order: Order;
  onNavigate: (view: string, params?: any) => void;
}

export const OrderDetailsView: React.FC<OrderDetailsViewProps> = ({ order, onNavigate }) => {
  const steps = [
    { label: 'Order Placed', icon: Receipt, active: true },
    { label: 'Confirmed', icon: Package, active: ['CONFIRMED', 'SHIPPED', 'OUT FOR DELIVERY', 'DELIVERED'].includes(order.orderStatus) },
    { label: 'Shipped', icon: Truck, active: ['SHIPPED', 'OUT FOR DELIVERY', 'DELIVERED'].includes(order.orderStatus) },
    { label: 'Out For Delivery', icon: Truck, active: ['OUT FOR DELIVERY', 'DELIVERED'].includes(order.orderStatus) },
    { label: 'Delivered', icon: Home, active: order.orderStatus === 'DELIVERED' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider">
        <button onClick={() => onNavigate('home')} className="hover:text-black">Home</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => onNavigate('orders')} className="hover:text-black">My Orders</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900 font-semibold">Order #FH-{order.orderId}</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Order #FH-{order.orderId}</h1>
          <p className="text-xs text-gray-500 mt-1">
            Placed on {new Date(order.orderDate).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <span className="bg-[#f7f3ed] text-[#b08d48] font-bold text-xs px-4 py-1.5 rounded-full border border-[#c5a059]/30 w-fit">
          {order.orderStatus}
        </span>
      </div>

      {/* Order Progress Stepper */}
      <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-xs shadow-2xs">
        <div className="flex items-center justify-between max-w-4xl mx-auto relative">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center z-10 text-center space-y-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      step.active ? 'bg-black text-[#c5a059]' : 'bg-stone-100 text-stone-400'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-semibold max-w-[80px] ${step.active ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 -mt-6 mx-2 ${
                      steps[idx + 1].active ? 'bg-black' : 'bg-stone-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Items & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-gray-200 p-6 rounded-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">Ordered Items</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.orderItemId} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-none">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.productName} className="w-16 h-20 object-cover rounded-xs" />
                )}
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-gray-900">{item.productName}</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Size: <strong>{item.sizeLabel}</strong> | Unit Price: ₹{item.unitPrice.toLocaleString()}
                  </p>
                </div>
                <div className="text-xs text-gray-600 font-medium">Qty: {item.quantity}</div>
                <div className="text-xs font-bold text-gray-900">₹{item.subtotal.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-xs h-fit space-y-4">
          <h3 className="font-serif text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">Delivery & Payment</h3>

          <div>
            <label className="text-[10px] font-bold uppercase text-gray-400 block">Shipping Address</label>
            <p className="text-xs text-gray-800 mt-1 leading-relaxed">{order.deliveryAddress}</p>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-gray-400 block">Payment Method</label>
            <p className="text-xs font-semibold text-gray-900 mt-0.5">{order.paymentMethod}</p>
          </div>

          <hr className="border-gray-200" />

          <div className="flex justify-between text-xs text-gray-600">
            <span>Subtotal</span>
            <span>₹{order.totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Shipping</span>
            <span className="text-emerald-600 font-bold">FREE</span>
          </div>
          <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total Paid</span>
            <span>₹{order.totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
