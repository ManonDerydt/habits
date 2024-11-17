import React, { createContext, useContext, useState } from 'react';

interface User {
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock authentication functions
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simple validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      setCurrentUser({ email });
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simple validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      setCurrentUser({ email });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};