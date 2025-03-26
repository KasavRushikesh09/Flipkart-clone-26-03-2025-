import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">
          Your wishlist is empty. Start adding products from the Products page!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain mb-4"
                loading="lazy"
              />
              <h3
                className="text-lg font-semibold cursor-pointer hover:underline"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {product.name}
              </h3>
              <p className="text-gray-600">₹{product.price.toLocaleString('en-IN')}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#fb641b] text-white rounded-sm hover:bg-[#f85606] transition-colors"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-sm hover:bg-gray-300 transition-colors"
                >
                  <Trash2 size={20} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;