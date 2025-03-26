import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { useUser } from '../Context/UserContext';
import { isAdminAuthenticated } from '../utils/adminAuth';

const Navbar: React.FC = () => {
  const { cartCount } = useCart();
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(isAdminAuthenticated());

  // Update isAdmin based on both adminAuth and user role
  useEffect(() => {
    const handleAdminAuthChange = () => {
      const authenticated = isAdminAuthenticated();
      const isAdminRole = user?.role === 'admin';
      setIsAdmin(authenticated && isAdminRole);
    };

    handleAdminAuthChange();
    window.addEventListener('adminAuthChange', handleAdminAuthChange);

    return () => {
      window.removeEventListener('adminAuthChange', handleAdminAuthChange);
    };
  }, [user]);

  // Sync search query with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search') || '';
    setSearchQuery(query);
  }, [location.search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const params = new URLSearchParams(location.search);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    navigate({ pathname: '/products', search: params.toString() });
  };

  const handleLogout = () => {
    setUser(null);
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-[#2874f0] text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Flipkart
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 mx-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for products..."
              className="w-full px-4 py-2 rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#fb641b]"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={20} />
          </div>
        </div>

        {/* Right Section (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/cart" className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-white" aria-label="Cart Icon" />
            <span>Cart ({cartCount})</span>
          </Link>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2"
              >
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.name}</span>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Wishlist
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Order History
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/profile" className="flex items-center gap-2">
              <User size={20} className="text-white" aria-label="User Icon" />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#2874f0] px-4 py-4">
          <div className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for products..."
              className="w-full px-4 py-2 rounded-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#fb641b]"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={20} />
          </div>
          <Link to="/" className="block py-2" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="block py-2" onClick={() => setIsMenuOpen(false)}>
            Products
          </Link>
          <Link to="/cart" className="flex items-center gap-2 py-2" onClick={() => setIsMenuOpen(false)}>
            <ShoppingCart size={20} className="text-white" aria-label="Cart Icon" />
            <span>Cart ({cartCount})</span>
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                My Profile
              </Link>
              <Link to="/wishlist" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                My Wishlist
              </Link>
              <Link to="/orders" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                Order History
              </Link>
              {isAdmin && (
                <Link to="/admin" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/profile" className="block py-2" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;