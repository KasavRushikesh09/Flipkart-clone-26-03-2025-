import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';
import { OrderProvider } from './Context/OrderContext';
import { ProductProvider } from './Context/ProductContext';
import { UserProvider } from './Context/UserContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductList from './pages/ProductList';
import OrderHistory from './pages/OrderHistory';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';// New import
import FloatingCart from './components/FloatingCart';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <ProductProvider>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductList />} />
                      <Route path="/product/:id" element={<ProductDetailPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/orders" element={<OrderHistory />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/admin-login" element={<AdminLogin />} /> {/* New route */}
                    </Routes>
                  </main>
                  <FloatingCart />
                  <Chatbot />
                  <Footer />
                </div>
              </ProductProvider>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </Router>
  );
};

export default App;