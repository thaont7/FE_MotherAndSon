import React, { useState, useCallback, createContext, useContext, useMemo } from "react";
import { AuthState, UserRole } from "../types/auth";

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider cho Auth Context
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Giả sử từ localStorage hoặc initial state
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const login = useCallback(async (email: string, password: string, role: UserRole = UserRole.USER) => {
    // TODO: Call API login
    // Tạm thời set mock user
    setAuthState({
      isAuthenticated: true,
      user: {
        id: "1",
        name: email.split("@")[0], // Lấy tên từ email
        email: email,
        role: role, // Sử dụng role được truyền vào
      },
    });
  }, []);

  const logout = useCallback(() => {
    setAuthState(() => ({
      isAuthenticated: false,
      user: null,
    }));
  }, []);

  // Tối ưu hiệu năng bằng useMemo để tránh re-render các component con
  const value = useMemo(
    () => ({ authState, login, logout, setAuthState }),
    [authState, login, logout, setAuthState]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook để sử dụng Auth Context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
