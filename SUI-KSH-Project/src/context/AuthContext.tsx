// src/context/AuthContext.tsx
// context for authentication management and user data


import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  suiAddress?: string;
  mpesaNumber?: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => Promise<boolean>;
  demoLogin: () => Promise<boolean>;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateUserProfile: async () => false,
  demoLogin: async () => false,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('dex_user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to parse stored user data:', error);
          localStorage.removeItem('dex_user');
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // This would be replaced with an actual API call
      if (email && password) {
        const mockUser: User = {
          id: 'user_' + Date.now(),
          name: email.split('@')[0],
          email,
          suiAddress: '0x123456789abcdef0123456789abcdef012345678',
          mpesaNumber: '254712345678',
          isVerified: true,
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('dex_user', JSON.stringify(mockUser));
        toast.success('Logged in successfully');
        return true;
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // This would be replaced with an actual API call
      if (name && email && password) {
        const mockUser: User = {
          id: 'user_' + Date.now(),
          name,
          email,
          isVerified: false,
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('dex_user', JSON.stringify(mockUser));
        toast.success('Registration successful');
        return true;
      }
      
      throw new Error('Invalid registration data');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const demoUser: User = {
        id: 'demo_' + Date.now(),
        name: 'Demo User',
        email: 'demo@example.com',
        suiAddress: '0xdemo123456789abcdef0123456789abcdef0123456',
        mpesaNumber: '254700000000',
        isVerified: true,
      };
      
      setUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem('dex_user', JSON.stringify(demoUser));
      toast.success('Logged in with demo account');
      return true;
    } catch (error) {
      console.error('Demo login failed:', error);
      toast.error('Failed to access demo account');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('dex_user');
    toast.success('Logged out successfully');
  };
  
  const updateUserProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      if (!user) throw new Error('Not authenticated');
      
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('dex_user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error('Failed to update profile');
      return false;
    }
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        isLoading, 
        login, 
        register,
        logout,
        updateUserProfile,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};