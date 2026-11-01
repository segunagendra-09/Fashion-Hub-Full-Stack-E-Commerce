import React, { useState } from 'react';
import { User, Product, CartItem, Order } from './types';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, DEMO_USER, DEMO_ORDERS } from './data/fashionData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductCard } from './components/ProductCard';
import { ProductsView } from './components/ProductsView';
import { ProductDetailsView } from './components/ProductDetailsView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { OrderSuccessView } from './components/OrderSuccessView';
import { OrdersView } from './components/OrdersView';
import { OrderDetailsView } from './components/OrderDetailsView';
import { ProfileView } from './components/ProfileView';
import { AuthModal } from './components/AuthModal';
import { ArrowRight, Tag, Mail, ShieldCheck } from 'lucide-react';
import featureBannerImage from './assets/images/menswear_feature_banner_1790922402618.jpg';

export function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParams, setViewParams] = useState<any>({});

  // App Data States
  const [user, setUser] = useState<User | null>(DEMO_USER);
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories] = useState(INITIAL_CATEGORIES);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartItemId: 1,
      productId: 1,
      product: INITIAL_PRODUCTS[0],
      sizeLabel: 'M',
      quantity: 1,
      unitPrice: Math.round(INITIAL_PRODUCTS[0].price * (1 - INITIAL_PRODUCTS[0].discountPercent / 100)),
      subtotal: Math.round(INITIAL_PRODUCTS[0].price * (1 - INITIAL_PRODUCTS[0].discountPercent / 100))
    }
  ]);
  const [orders, setOrders] = useState<Order[]>(DEMO_ORDERS);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Location State
  const [deliveryLocation, setDeliveryLocation] = useState<string>(
    'Maruthi Nagar Main Road, 1st Stage, BTM Layout, Bengaluru - 560068'
  );

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Handlers
  const handleNavigate = (view: string, params: any = {}) => {
    setCurrentView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePerformSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleNavigate('products', { searchQuery: searchQuery.trim() });
    }
  };

  const handleAddToCart = (product: Product, sizeLabel: string, quantity: number) => {
    const discountedPrice = Math.round(product.price * (1 - product.discountPercent / 100));

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.productId === product.productId && item.sizeLabel === sizeLabel
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          subtotal: newQty * discountedPrice
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId: Date.now(),
          productId: product.productId,
          product,
          sizeLabel,
          quantity,
          unitPrice: discountedPrice,
          subtotal: quantity * discountedPrice
        };
        return [...prev, newItem];
      }
    });
  };

  const handleUpdateCartQty = (cartItemId: number, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity: newQty,
            subtotal: newQty * item.unitPrice
          };
        }
        return item;
      })
    );
  };

  const handleRemoveCartItem = (cartItemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handlePlaceOrder = (paymentMethod: string, deliveryAddress: string): Order => {
    const totalAmount = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

    const newOrder: Order = {
      orderId: Math.floor(1000 + Math.random() * 9000),
      userId: user ? user.userId : 1,
      orderDate: new Date().toISOString(),
      totalAmount,
      paymentMethod,
      orderStatus: 'PLACED',
      deliveryAddress,
      items: cartItems.map((item, idx) => ({
        orderItemId: Date.now() + idx,
        orderId: 0,
        productId: item.productId,
        productName: item.product.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.subtotal,
        sizeLabel: item.sizeLabel,
        imageUrl: item.product.imageUrl
      }))
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    setCartItems([]);
    handleNavigate('order-success', { orderId: newOrder.orderId });
    return newOrder;
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  // Render Page Content
  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="space-y-16 pb-20">
            {/* Hero Section (Bright Light Theme) */}
            <HeroSection onNavigate={handleNavigate} />

            {/* Shop by Category Grid */}
            <CategoryGrid
              categories={categories}
              onSelectCategory={(catId) => handleNavigate('products', { categoryId: catId })}
            />

            {/* Feature Banner Section: Privilege Collection (Bright Cream & Stone Canvas) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative rounded-xs overflow-hidden bg-[#f4f1ea] text-stone-900 p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-10 border border-stone-300/80 shadow-sm">
                <div className="space-y-5 max-w-xl">
                  <div className="text-xs font-semibold text-[#b08d48] uppercase tracking-[0.25em] flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5" />
                    <span>PRIVILEGE COLLECTION</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-950 leading-tight">
                    The Obsidian Leather & Selvedge Edition
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                    Hand-crafted lambskin biker jackets, Goodyear welted calfskin oxfords, and authentic 13.5oz Japanese selvedge denim constructed for lifetime durability and tailored comfort.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleNavigate('products', { categoryId: 2 })}
                      className="bg-stone-950 text-white px-7 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-[#b08d48] transition-all cursor-pointer inline-flex items-center gap-2.5 shadow-md"
                    >
                      <span>EXPLORE COLLECTION</span>
                      <ArrowRight className="w-4 h-4 text-[#c5a059]" />
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-80 h-80 rounded-xs overflow-hidden flex-shrink-0 shadow-lg border border-stone-300 bg-stone-200">
                  <img
                    src={featureBannerImage}
                    alt="Obsidian Leather Jacket Edition"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </section>

            {/* New Arrivals Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-stone-200 pb-4">
                <div>
                  <span className="text-xs font-semibold text-[#b08d48] uppercase tracking-[0.25em]">JUST ARRIVED</span>
                  <h2 className="font-serif text-3xl font-bold text-stone-950 mt-1">New Arrivals</h2>
                </div>
                <button
                  onClick={() => handleNavigate('products')}
                  className="text-xs font-bold uppercase tracking-widest text-stone-900 hover:text-[#b08d48] transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <span>View All Menswear</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((p) => (
                  <ProductCard
                    key={p.productId}
                    product={p}
                    onSelect={(id) => handleNavigate('product-details', { productId: id })}
                  />
                ))}
              </div>
            </section>

            {/* Special Offers Grid Showcase */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-stone-200 pb-4">
                <div>
                  <span className="text-xs font-semibold text-[#b08d48] uppercase tracking-[0.25em]">EXCLUSIVE SAVINGS</span>
                  <h2 className="font-serif text-3xl font-bold text-stone-950 mt-1">Special Offers (15%+ Off)</h2>
                </div>
                <button
                  onClick={() => handleNavigate('products', { minDiscount: 15 })}
                  className="text-xs font-bold uppercase tracking-widest text-stone-900 hover:text-[#b08d48] transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <span>View All Offers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.filter((p) => p.discountPercent >= 15).slice(0, 4).map((p) => (
                  <ProductCard
                    key={p.productId}
                    product={p}
                    onSelect={(id) => handleNavigate('product-details', { productId: id })}
                  />
                ))}
              </div>
            </section>

            {/* VIP Concierge & Newsletter Section (Bright Gold-Stone Canvas) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#f7f5ef] text-stone-900 p-8 sm:p-12 rounded-xs border border-stone-300 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xs">
                <div className="space-y-3 max-w-lg">
                  <div className="text-xs font-semibold text-[#b08d48] uppercase tracking-[0.25em] flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>PRIVATE ACCESS</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
                    Join the Fashion Hub Private Club
                  </h3>
                  <p className="text-xs text-stone-700 leading-relaxed font-normal">
                    Receive early invitation to private seasonal drops, bespoke fit recommendations, and complimentary express delivery codes.
                  </p>
                </div>

                <div className="w-full md:w-auto min-w-[320px]">
                  {newsletterSubscribed ? (
                    <div className="bg-white border border-[#b08d48]/40 p-4 rounded-xs text-center space-y-1 shadow-2xs">
                      <div className="flex items-center justify-center gap-2 text-[#b08d48] text-xs font-bold">
                        <ShieldCheck className="w-4 h-4" />
                        <span>SUBSCRIPTION CONFIRMED</span>
                      </div>
                      <p className="text-[11px] text-stone-600">Welcome to the Private Club. Your welcome gift code is on its way.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address..."
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="bg-white border border-stone-300 px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#b08d48] flex-1 rounded-xs"
                      />
                      <button
                        type="submit"
                        className="bg-stone-950 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#b08d48] transition-colors whitespace-nowrap cursor-pointer rounded-xs"
                      >
                        SUBSCRIBE
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </div>
        );

      case 'products':
        return (
          <ProductsView
            key={JSON.stringify(viewParams)}
            products={products}
            categories={categories}
            initialGender={viewParams.gender}
            initialCategoryId={viewParams.categoryId}
            initialSearchQuery={viewParams.searchQuery}
            initialMinDiscount={viewParams.minDiscount}
            onSelectProduct={(id) => handleNavigate('product-details', { productId: id })}
          />
        );

      case 'product-details': {
        const foundProduct = products.find((p) => p.productId === viewParams.productId) || products[0];
        return (
          <ProductDetailsView
            product={foundProduct}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        );
      }

      case 'cart':
        return (
          <CartView
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQty}
            onRemoveItem={handleRemoveCartItem}
            onNavigate={handleNavigate}
          />
        );

      case 'checkout':
        if (!user) {
          setAuthModalOpen(true);
          return (
            <div className="max-w-xl mx-auto py-20 text-center">
              <h2 className="font-serif text-2xl font-bold">Please sign in to proceed with checkout.</h2>
            </div>
          );
        }
        return (
          <CheckoutView
            user={user}
            cartItems={cartItems}
            onPlaceOrder={handlePlaceOrder}
          />
        );

      case 'order-success':
        return <OrderSuccessView order={latestOrder} onNavigate={handleNavigate} />;

      case 'orders':
        return <OrdersView orders={orders} onNavigate={handleNavigate} />;

      case 'order-details': {
        const selectedOrder = orders.find((o) => o.orderId === viewParams.orderId) || orders[0];
        return <OrderDetailsView order={selectedOrder} onNavigate={handleNavigate} />;
      }

      case 'profile':
        if (!user) {
          setAuthModalOpen(true);
          return null;
        }
        return (
          <ProfileView
            user={user}
            onUpdateUser={setUser}
            onNavigate={handleNavigate}
            onLogout={() => { setUser(null); handleNavigate('home'); }}
          />
        );

      default:
        return (
          <div>
            <HeroSection onNavigate={handleNavigate} />
            <CategoryGrid categories={categories} onSelectCategory={(catId) => handleNavigate('products', { categoryId: catId })} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-sans text-stone-900 selection:bg-[#b08d48] selection:text-white overflow-x-hidden">
      <Header
        user={user}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        deliveryLocation={deliveryLocation}
        onSelectLocation={setDeliveryLocation}
        onNavigate={handleNavigate}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={() => { setUser(null); handleNavigate('home'); }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onPerformSearch={handlePerformSearch}
      />

      <main className="flex-1 w-full max-w-full overflow-x-hidden">{renderContent()}</main>

      <Footer onNavigate={handleNavigate} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
      />
    </div>
  );
}
export default App;
