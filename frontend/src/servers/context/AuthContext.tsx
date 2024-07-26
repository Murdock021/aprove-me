import React, { createContext, useContext, useEffect, useState } from "react";
import { loginAuth, LoginAuth, LoginRequest } from "../services/auth/auth.service";
import { AxiosResponse } from 'axios';

type User = {
  login: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (login: string, password: string) => void;
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

  const login = async (login: string, password: string ) => {
    try {
      const response: AxiosResponse<LoginAuth> = await loginAuth({ login, password } as LoginRequest);
      const userData = {
        login: response.data.login,
        token: response.data?.token
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", response.data.token);
    } catch (error) {
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
