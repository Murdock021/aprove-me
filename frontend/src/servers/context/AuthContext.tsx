/* import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  loginAuth,
  LoginAuth,
  LoginRequest,
} from '../services/auth/auth.service';
import { AxiosResponse } from 'axios';

type User = {
  login: string;
  token: string;
  roles: string[];
};

type AuthContextType = {
  user: User | null;
  login: (login: string, password: string) => Promise<boolean>;
  logout: () => void;
  isTokenValid: () => boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localUserRAW = localStorage.getItem('user');
    if (localUserRAW) {
      try {
        const localUser = JSON.parse(localUserRAW);
        setUser(localUser);
        if (!isTokenValid()) {
          logout();
        }
      } catch (error) {
        console.error('Error parsing local user:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const isTokenValid = () => {
    if (!user || !user.token) return false;

    try {
      const tokenParts = user.token.split('.');
      if (tokenParts.length !== 3) return false;

      const payload = JSON.parse(atob(tokenParts[1]));
      const exp = payload.exp * 1000;
      return Date.now() < exp;
    } catch (error) {
      console.error('Failed to parse token', error);
      return false;
    }
  };

  const login = async (login: string, password: string): Promise<boolean> => {
    try {
      const response: AxiosResponse<LoginAuth> = await loginAuth({
        login,
        password,
      } as LoginRequest);
      const userData = {
        login: response.data.login,
        token: response.data.token,
        roles: response.data.roles || [],
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', response.data.token);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    isTokenValid,
    loading,
  };
}

 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  loginAuth,
  LoginAuth,
  LoginRequest,
} from '../services/auth/auth.service';
import { AxiosResponse } from 'axios';

type User = {
  login: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (login: string, password: string) => Promise<boolean>;
  logout: () => void;
  isTokenValid: () => boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localUserRAW = localStorage.getItem('user');
    if (localUserRAW) {
      try {
        const localUser = JSON.parse(localUserRAW);
        setUser(localUser);
        if (!isTokenValid()) {
          logout();
        }
      } catch (error) {
        console.error('Error parsing local user:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const isTokenValid = () => {
    if (!user || !user.token) return false;

    try {
      const tokenParts = user.token.split('.');
      if (tokenParts.length !== 3) return false;

      const payload = JSON.parse(atob(tokenParts[1]));
      const exp = payload.exp * 1000;
      return Date.now() < exp;
    } catch (error) {
      console.error('Failed to parse token', error);
      return false;
    }
  };

  const login = async (login: string, password: string): Promise<boolean> => {
    try {
      const response: AxiosResponse<LoginAuth> = await loginAuth({
        login,
        password,
      } as LoginRequest);
      const userData = {
        login: response.data.login,
        token: response.data.token,
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', response.data.token);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    isTokenValid,
    loading,
  };
}

