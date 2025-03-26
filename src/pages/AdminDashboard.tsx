import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import { isAdminAuthenticated, logoutAdmin } from '../utils/adminAuth';
import { Menu, X } from 'lucide-react';
import ManageProducts from './ManageProducts';
import ManageUsers from './ManageUsers';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'products' | 'orders' | 'users'>('products');

  // Check if admin is authenticated and has the correct role
  useEffect(() => {
    const isAuthenticated = isAdminAuthenticated();
    const isAdminRole = user?.role === 'admin';

    if (!isAuthenticated || !isAdminRole) {
      navigate('/admin-login');
    }
  }, [navigate, user]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin-login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#2874f0] text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <button onClick={toggleSidebar} className="md:hidden">
            <X size={24} />
          </button>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => {
              setActiveSection('products');
              setIsSidebarOpen(false);
            }}
            className={`w-full text-left px-4 py-2 hover:bg-[#fb641b] ${
              activeSection === 'products' ? 'bg-[#fb641b]' : ''
            }`}
          >
            Manage Products
          </button>
          <button
            onClick={() => {
              setActiveSection('orders');
              setIsSidebarOpen(false);
            }}
            className={`w-full text-left px-4 py-2 hover:bg-[#fb641b] ${
              activeSection === 'orders' ? 'bg-[#fb641b]' : ''
            }`}
          >
            Manage Orders
          </button>
          <button
            onClick={() => {
              setActiveSection('users');
              setIsSidebarOpen(false);
            }}
            className={`w-full text-left px-4 py-2 hover:bg-[#fb641b] ${
              activeSection === 'users' ? 'bg-[#fb641b]' : ''
            }`}
          >
            Manage Users
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700"
          >
            Logout
          </button>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {activeSection === 'products' ? (
            <ManageProducts />
          ) : activeSection === 'users' ? (
            <ManageUsers />
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
              <p className="text-gray-600">Order management will be implemented soon.</p>
            </div>
          )}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default AdminDashboard;