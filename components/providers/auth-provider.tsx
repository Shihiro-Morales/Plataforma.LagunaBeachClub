'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Usuario } from '@/lib/types';
import {
  login,
  register,
  logout,
  getCurrentUser,
  setCurrentUser,
  getTokens
} from '@/lib/api-client';

interface AuthContextType {
  user: Usuario | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<any>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔥 inicializar sesión
  useEffect(() => {
    const storedUser = getCurrentUser();
    const { accessToken } = getTokens();

    if (accessToken) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  // 🟢 LOGIN
  const handleLogin = async (username: string, password: string) => {
    setLoading(true);

    try {
      const response = await login(username, password);

      setIsAuthenticated(true);

      return response;
    } finally {
      setLoading(false);
    }
  };

  // 🟢 REGISTER
  const handleRegister = async (userData: any) => {
    setLoading(true);

    try {
      await register(userData);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 LOGOUT
  const handleLogout = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // 🔥 ESTE ES EL FIX CLAVE (RETURN DEL PROVIDER)
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}