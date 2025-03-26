import React, { useState, useEffect, useMemo } from 'react';
import { dummyProducts, Product } from '../data/products';
import { Star } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>('default');
  const navigate = useNavigate();
  const location = useLocation();

  // Get search query from URL
  const searchQuery = new URLSearchParams(location.search).get('search') || '';

  // Fetch products (simulating API call)
  useEffect(() => {
    setProducts(dummyProducts);
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(dummyProducts.map(p => p.category)))];
  }, []);

  // Filter and sort products
  useEffect(() => {
    console.log('Sort Option:', sortOption); // Debug log
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'All') {
      result = result.filter(p => p.category === categoryFilter);
    }

    // Price range filter
    result = result.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Rating filter
    result = result.filter(p => p.rating >= ratingFilter);

    // Sorting
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => {
          const ratingDiff = b.rating - a.rating;
          if (ratingDiff !== 0) return ratingDiff; // Sort by rating first
          return a.name.localeCompare(b.name); // If ratings are equal, sort by name
        });
        console.log('Sorted by rating:', result.map(p => ({ name: p.name, rating: p.rating })));
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, searchQuery, categoryFilter, priceRange, ratingFilter, sortOption]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* Filters and Sorting */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Category Filter */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
            </label>
            <input
              type="range"
              min={0}
              max={100000}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="w-full"
            />
            <input
              type="range"
              min={0}
              max={100000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="w-full"
            />
          </div>

          {/* Rating Filter */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Rating</label>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(+e.target.value)}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
            >
              <option value={0}>All Ratings</option>
              <option value={4}>4★ & above</option>
              <option value={3}>3★ & above</option>
              <option value={2}>2★ & above</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {/* Sorting Options */}
          <div className="mb-6 flex items-center gap-4">
            <label className="text-gray-700 font-medium">Sort By:</label>
            <select
              value={sortOption}
              onChange={(e) => {
                console.log('Selected sort option:', e.target.value);
                setSortOption(e.target.value);
              }}
              className="px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
            >
              <option value="default">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Popularity (Rating)</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain mb-4"
                    loading="lazy"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">
                      {product.rating} <Star size={16} className="inline" />
                    </span>
                    <span className="text-gray-500">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;