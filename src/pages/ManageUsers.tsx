import React, { useState } from 'react';
import { useUser } from '../Context/UserContext';

const ManageUsers: React.FC = () => {
  const { allUsers, addUser, deleteUser } = useUser();
  const [message, setMessage] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user' as 'admin' | 'user',
    avatar: '',
  });

  const handleDelete = (email: string | undefined) => {
    if (!email) {
      setMessage('Cannot delete user: Email is missing.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete the user with email ${email}?`)) {
      deleteUser(email);
      setMessage(`User with email ${email} has been deleted.`);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      setMessage('Name and email are required.');
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    // Check for duplicate email
    if (allUsers.some((user) => user.email === newUser.email)) {
      setMessage('A user with this email already exists.');
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const userToAdd = {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar || 'https://picsum.photos/40', // Default avatar if none provided
    };

    addUser(userToAdd);
    setMessage(`User ${newUser.name} has been added successfully.`);
    setTimeout(() => setMessage(null), 3000);

    // Reset form
    setNewUser({ name: '', email: '', role: 'user', avatar: '' });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>

      {/* Add User Form */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Add New User</h3>
        <form onSubmit={handleAddUser}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'user' })}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Avatar URL (Optional)</label>
              <input
                type="text"
                value={newUser.avatar}
                onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
                className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
                placeholder="Enter avatar URL"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-[#2874f0] text-white rounded-sm hover:bg-[#1a5dc7] transition-colors"
          >
            Add User
          </button>
        </form>
      </div>

      {/* Feedback Message */}
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-sm">
          {message}
        </div>
      )}

      {/* User List */}
      {allUsers.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-left text-gray-600 font-medium">Name</th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium">Email</th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium">Role</th>
                <th className="py-3 px-4 text-left text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user.email || user.name} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email || 'N/A'}</td>
                  <td className="py-3 px-4">{user.role}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(user.email)}
                      className="px-3 py-1 bg-red-600 text-white rounded-sm hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={user.email === 'admin@example.com' || !user.email}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;