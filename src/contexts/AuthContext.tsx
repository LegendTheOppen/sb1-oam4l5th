import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  favorites: string[];
  readingProgress: Record<string, number>;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateFavorites: (bookId: string) => void;
  updateProgress: (bookId: string, progress: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('universeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - replace with real API
    if (email && password) {
      const mockUser: User = {
        id: '1',
        username: email.split('@')[0],
        email,
        isAdmin: email === 'admin@universe.com',
        favorites: [],
        readingProgress: {}
      };
      setUser(mockUser);
      localStorage.setItem('universeUser', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // Mock registration - replace with real API
    if (username && email && password) {
      const mockUser: User = {
        id: Date.now().toString(),
        username,
        email,
        isAdmin: false,
        favorites: [],
        readingProgress: {}
      };
      setUser(mockUser);
      localStorage.setItem('universeUser', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('universeUser');
  };

  const updateFavorites = (bookId: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      favorites: user.favorites.includes(bookId) 
        ? user.favorites.filter(id => id !== bookId)
        : [...user.favorites, bookId]
    };
    setUser(updatedUser);
    localStorage.setItem('universeUser', JSON.stringify(updatedUser));
  };

  const updateProgress = (bookId: string, progress: number) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      readingProgress: {
        ...user.readingProgress,
        [bookId]: progress
      }
    };
    setUser(updatedUser);
    localStorage.setItem('universeUser', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateFavorites,
      updateProgress
    }}>
      {children}
    </AuthContext.Provider>
  );
};