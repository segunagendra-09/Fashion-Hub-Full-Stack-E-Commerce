import React, { useState, useMemo, useEffect } from 'react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, RotateCcw, Search } from 'lucide-react';

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
  initialGender?: string;
  initialCategoryId?: number;
  initialSearchQuery?: string;
  initialMinDiscount?: number;
  onSelectProduct: (productId: number) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  categories,
  initialCategoryId,
  initialSearchQuery = '',
  initialMinDiscount = 0,
  onSelectProduct
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(initialCategoryId);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minDiscount, setMinDiscount] = useState<number>(initialMinDiscount);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Keep state synchronized with incoming props when user clicks top/footer navigation links
  useEffect(() => {
    setSelectedCategoryId(initialCategoryId);
    setSearchQuery(initialSearchQuery || '');
    setMinDiscount(initialMinDiscount || 0);
  }, [initialCategoryId, initialSearchQuery, initialMinDiscount]);

  // Filter products based on active states
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategoryId && p.categoryId !== selectedCategoryId) {
        return false;
      }
      // Keyword Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.productName.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesCat = p.categoryName.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      // Price range
      const discountedPrice = Math.round(p.price * (1 - p.discountPercent / 100));
      if (minPrice && discountedPrice < Number(minPrice)) return false;
      if (maxPrice && discountedPrice > Number(maxPrice)) return false;

      // Discount filter
      if (minDiscount > 0 && p.discountPercent < minDiscount) return false;

      return true;
    }).sort((a, b) => {
      const priceA = Math.round(a.price * (1 - a.discountPercent / 100));
      const priceB = Math.round(b.price * (1 - b.discountPercent / 100));

      if (sortBy === 'price_asc') return priceA - priceB;
      if (sortBy === 'price_desc') return priceB - priceA;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0; // featured
    });
  }, [products, selectedCategoryId, searchQuery, minPrice, maxPrice, minDiscount, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategoryId(undefined);
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    setMinDiscount(0);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 bg-white border border-gray-200 p-6 rounded-xs h-fit space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h3 className="font-serif text-lg font-bold flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#c5a059]" /> Filters
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#c5a059] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset All
            </button>
          </div>

          {/* Search Query Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Search</label>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="e.g. jacket, denim, boots"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xs outline-none focus:border-[#c5a059]"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3" />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Category</label>
            <div className="space-y-1.5">
              <button
                onClick={() => setSelectedCategoryId(undefined)}
                className={`w-full text-left text-xs font-semibold px-3 py-2 rounded-xs transition-colors cursor-pointer ${
                  !selectedCategoryId ? 'bg-black text-white' : 'bg-stone-50 text-gray-700 hover:bg-stone-100'
                }`}
              >
                All Men's Wear
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.categoryId}
                  onClick={() => setSelectedCategoryId(cat.categoryId)}
                  className={`w-full text-left text-xs font-semibold px-3 py-2 rounded-xs transition-colors cursor-pointer ${
                    selectedCategoryId === cat.categoryId
                      ? 'bg-black text-white'
                      : 'bg-stone-50 text-gray-700 hover:bg-stone-100'
                  }`}
                >
                  {cat.categoryName}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Price Range (₹)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min ₹"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 text-xs px-2.5 py-1.5 border border-gray-300 rounded-xs outline-none focus:border-[#c5a059]"
              />
              <span className="text-gray-400 text-xs">-</span>
              <input
                type="number"
                placeholder="Max ₹"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 text-xs px-2.5 py-1.5 border border-gray-300 rounded-xs outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          {/* Discount Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Minimum Discount</label>
            <select
              value={minDiscount}
              onChange={(e) => setMinDiscount(Number(e.target.value))}
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xs bg-white outline-none focus:border-[#c5a059] cursor-pointer"
            >
              <option value={0}>All Offers</option>
              <option value={10}>10% Off or more</option>
              <option value={15}>15% Off or more</option>
              <option value={20}>20% Off or more</option>
            </select>
          </div>
        </aside>

        {/* Main Product Grid & Header */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
            <div>
              <h1 className="font-serif text-2xl font-bold text-gray-900">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : minDiscount > 0
                  ? `Special Offers (${minDiscount}% Off or More)`
                  : selectedCategoryId
                  ? categories.find((c) => c.categoryId === selectedCategoryId)?.categoryName || 'Category Products'
                  : "Men's Collection"}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Showing <strong>{filteredProducts.length}</strong> available items
              </p>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs border border-gray-300 px-3 py-2 rounded-xs bg-white outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>
          </div>

          {/* Products List */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-200 rounded-xs p-8">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-800">No matching products found</h3>
              <p className="text-xs text-gray-500 mt-1 mb-4">Try clearing filters or adjusting your search term.</p>
              <button
                onClick={handleResetFilters}
                className="bg-black text-white text-xs font-bold px-6 py-2.5 rounded-xs uppercase tracking-wider hover:bg-[#c5a059] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.productId} product={p} onSelect={onSelectProduct} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
