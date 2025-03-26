import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';

const ProfilePage: React.FC = () => {
  const { user, setUser, addUser } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      name: name || 'User',
      email: email || `user${Date.now()}@example.com`, // Generate a default email if none provided
      avatar: avatar || 'https://picsum.photos/40',
      role: 'user' as 'admin' | 'user',
    };
    console.log('Logging in with userData:', userData);
    setUser(userData);
    addUser(userData); // Add to allUsers
    navigate('/');
  };

  const handleLogout = () => {
    console.log('Logging out, clearing user');
    setUser(null);
  };

  console.log('Current user state:', user);

  if (user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-16 h-16 rounded-full"
              onError={(e) => console.log('Image load error:', e)}
            />
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">Email: {user.email || 'N/A'}</p>
              <p className="text-gray-600">Role: {user.role || 'User'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
            placeholder="your.email@example.com"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Avatar URL (Optional)</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
            placeholder="Avatar URL"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#fb641b] text-white rounded-sm hover:bg-[#f85606]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;