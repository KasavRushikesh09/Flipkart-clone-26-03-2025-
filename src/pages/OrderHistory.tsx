import React, { useState } from 'react';
import { useOrders } from '../Context/OrderContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const OrderHistory: React.FC = () => {
  const { orders } = useOrders();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Debug log to check orders
  console.log('Orders in OrderHistory:', orders);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no past orders.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
              {/* Order Summary */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">
                    Order #{order.id} - {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">Total: ₹{order.total.toLocaleString('en-IN')}</p>
                  <p
                    className={`text-sm font-medium ${
                      order.status === 'Delivered'
                        ? 'text-green-600'
                        : order.status === 'Cancelled'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    Status: {order.status}
                  </p>
                </div>
                <button
                  onClick={() => toggleOrderDetails(order.id)}
                  className="flex items-center gap-2 text-[#2874f0] hover:underline"
                >
                  {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                  {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {/* Order Details */}
              {expandedOrder === order.id && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-lg font-semibold mb-2">Order Details</h3>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-contain"
                          />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p>₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{order.total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-600">
                      Ordered on: {new Date(order.date).toLocaleString()}
                    </p>
                    <p
                      className={`font-medium ${
                        order.status === 'Delivered'
                          ? 'text-green-600'
                          : order.status === 'Cancelled'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      Delivery Status: {order.status}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;