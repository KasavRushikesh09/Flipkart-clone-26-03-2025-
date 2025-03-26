import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email?: string;
  avatar: string;
  role: 'admin' | 'user';
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  allUsers: User[];
  addUser: (user: User) => void;
  deleteUser: (email: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Load users from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedUsers = localStorage.getItem('allUsers');
    if (savedUsers) {
      setAllUsers(JSON.parse(savedUsers));
    } else {
      // Initialize with a default admin user if none exist
      const defaultAdmin: User = {
        name: 'Admin',
        email: 'admin@example.com',
        avatar: 'https://picsum.photos/40',
        role: 'admin',
      };
      setAllUsers([defaultAdmin]);
      localStorage.setItem('allUsers', JSON.stringify([defaultAdmin]));
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Save allUsers to localStorage whenever it changes
  useEffect(() => {
    if (allUsers.length > 0) {
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
    } else {
      localStorage.removeItem('allUsers');
    }
  }, [allUsers]);

  const addUser = (newUser: User) => {
    console.log('Adding user:', newUser);
    console.log('Current allUsers:', allUsers);
    setAllUsers((prev) => {
      // Prevent duplicate users by email
      if (prev.some((u) => u.email === newUser.email)) {
        console.log('Duplicate email found, not adding user.');
        return prev;
      }
      const updatedUsers = [...prev, newUser];
      console.log('Updated allUsers:', updatedUsers);
      return updatedUsers;
    });
  };

  const deleteUser = (email: string) => {
    console.log('Deleting user with email:', email);
    console.log('Current allUsers:', allUsers);
    setAllUsers((prev) => {
      const updatedUsers = prev.filter((u) => u.email !== email);
      console.log('Updated allUsers:', updatedUsers);
      return updatedUsers;
    });
    // If the deleted user is the currently logged-in user, log them out
    if (user && user.email === email) {
      console.log('Logging out current user:', user);
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, allUsers, addUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};