import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import { loginAdmin } from '../utils/adminAuth';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser, addUser } = useUser();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (loginAdmin(email, password)) {
      // Set the admin user in UserContext
      const adminUser = {
        name: 'Admin',
        email: 'admin@example.com',
        avatar: 'https://picsum.photos/40',
        role: 'admin' as 'admin' | 'user',
      };
      setUser(adminUser);
      addUser(adminUser); // Ensure the admin is in allUsers
      navigate('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setResetEmail('');
    setResetMessage(null);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetEmail === 'admin@example.com') {
      setResetMessage(
        'This is a demo app. The password for admin@example.com is: password123'
      );
    } else {
      setResetMessage('No account found with this email.');
    }
  };

  const closeModal = () => {
    setShowForgotPassword(false);
    setResetEmail('');
    setResetMessage(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
              placeholder="password123"
              required
            />
          </div>
          {error && (
            <p className="text-red-600 text-center mb-4">{error}</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#fb641b] text-white rounded-sm hover:bg-[#f85606] transition-colors"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleForgotPassword}
            className="text-[#2874f0] hover:underline focus:outline-none"
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
            {!resetMessage ? (
              <form onSubmit={handleResetSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Enter your email
                  </label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-[#2874f0] text-white rounded-sm hover:bg-[#1a5dc7] transition-colors"
                >
                  Submit
                </button>
                <button
                  onClick={closeModal}
                  className="w-full mt-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-sm hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <p className="text-gray-600 mb-6">{resetMessage}</p>
                <button
                  onClick={closeModal}
                  className="w-full px-4 py-2 bg-[#fb641b] text-white rounded-sm hover:bg-[#f85606] transition-colors"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;