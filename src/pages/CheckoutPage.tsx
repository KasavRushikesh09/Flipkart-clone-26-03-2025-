import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { Order } from '../types';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  console.log('Current cart:', cart); // Debug log

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    console.log('Place Order button clicked'); // Debug log
    if (cart.length === 0) {
      console.warn('Cart is empty, cannot place order');
      return;
    }

    const order: Order = {
      id: Date.now().toString(),
      items: cart,
      total,
      date: new Date().toISOString(),
      status: 'Placed',
    };
    console.log('Placing order:', order);
    addOrder(order);
    console.log('Order added, clearing cart');
    clearCart();
    console.log('Navigating to /orders');
    setTimeout(() => {
      navigate('/orders');
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
            </div>
          ))}
          <div className="flex justify-between py-4 font-semibold">
            <span>Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-[#fb641b] text-white py-2 rounded-sm hover:bg-[#f85606] transition-colors"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;