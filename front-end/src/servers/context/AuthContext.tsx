import React, { createContext, useContext, useEffect, useState } from "react";
import { loginAuth, LoginAuth, LoginRequest } from "../services/auth/auth.service";
import { AxiosResponse } from 'axios';

type User = {
  email: string;
  roles: string[];
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localUserRAW = localStorage.getItem("user");
    if (localUserRAW) {
      try {
        const localUser = JSON.parse(localUserRAW);
        setUser(localUser);
      } catch (error) {
        console.error("Error parsing local user:", error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response: AxiosResponse<LoginAuth> = await loginAuth({ email, password } as LoginRequest);
      if (response.status === 200 && response.data.access_token) {
        const userData = {
          email: response.data.email,
          roles: response.data.role ? [response.data.role] : []
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", response.data.access_token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    loading,
  };
}
