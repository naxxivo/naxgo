import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

// Helper functions to manage the user database in localStorage
const getUsersFromStorage = (): User[] => {
  try {
    const usersJson = localStorage.getItem('usersDB');
    if (usersJson) {
      return JSON.parse(usersJson);
    }
  } catch (e) {
    console.error("Failed to parse usersDB from localStorage", e);
  }
  // Return a default user if the DB is empty or corrupt
  return [{
    id: '1',
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
    bio: 'Frontend enthusiast and Gemini API expert.',
    description: 'Building cool things with AI.',
    profilePictureUrl: 'https://i.pravatar.cc/150?u=test@example.com',
  }];
};

const saveUsersToStorage = (users: User[]) => {
  try {
    localStorage.setItem('usersDB', JSON.stringify(users));
  } catch (e) {
    console.error("Failed to save usersDB to localStorage", e);
  }
};


interface AuthContextType {
  currentUser: User | null;
  login: (email: string) => Promise<void>;
  register: (name: string, username: string, email: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from a previous session
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      localStorage.removeItem('currentUser');
    }
  }, []);

  const login = async (email: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsersFromStorage();
        const user = users.find(u => u.email === email.toLowerCase());
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          setCurrentUser(user);
          resolve();
        } else {
          reject(new Error('No account found. Please register.'));
        }
      }, 1000);
    });
  };

  const register = async (name: string, username: string, email: string): Promise<void> => {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsersFromStorage();
        const lowerEmail = email.toLowerCase();
        
        if (users.some(u => u.email === lowerEmail)) {
          reject(new Error('An account with this email already exists.'));
          return;
        }
        if (users.some(u => u.username === username)) {
          reject(new Error('This username is already taken.'));
          return;
        }
        
        const newUser: User = {
          id: String(Math.floor(10000000 + Math.random() * 90000000)),
          name,
          username,
          email: lowerEmail,
          bio: 'New user excited to explore!',
          description: '',
          profilePictureUrl: `https://i.pravatar.cc/150?u=${lowerEmail}`,
        };
        
        const updatedUsers = [...users, newUser];
        saveUsersToStorage(updatedUsers);

        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setCurrentUser(newUser);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };
  
  const updateUser = (updatedUser: User) => {
    if (currentUser && currentUser.id === updatedUser.id) {
        const users = getUsersFromStorage();
        const userIndex = users.findIndex(u => u.id === updatedUser.id);
        
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            saveUsersToStorage(users);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            setCurrentUser(updatedUser);
        }
    }
  };

  const value = { currentUser, login, register, logout, updateUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};