import React, { useState, useCallback, createContext, useContext, useMemo, useEffect } from "react";
import { AuthState, UserRole } from "../types/auth";
import { saveAuthToStorage, getAuthFromStorage, clearAuthFromStorage } from "../utils/authStorage";

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
  // Khôi phục auth state từ localStorage khi khởi động
  const [authState, setAuthState] = useState<AuthState>(() => {
    const cachedAuth = getAuthFromStorage();
    return cachedAuth || {
      isAuthenticated: false,
      user: null,
    };
  });

  const login = useCallback(async (email: string, password: string, role: UserRole = UserRole.USER) => {
    // TODO: Call API login
    // Tạm thời set mock user
    const newAuthState = {
      isAuthenticated: true,
      user: {
        id: "1",
        name: email.split("@")[0], // Lấy tên từ email
        email: email,
        role: role, // Sử dụng role được truyền vào
      },
    };
    setAuthState(newAuthState);
    // Lưu vào localStorage
    saveAuthToStorage(newAuthState);
  }, []);

  const logout = useCallback(() => {
    const newAuthState = {
      isAuthenticated: false,
      user: null,
    };
    setAuthState(newAuthState);
    // Xóa khỏi localStorage
    clearAuthFromStorage();
  }, []);

  // Tối ưu hiệu năng bằng useMemo để tránh re-render các component con
  const value = useMemo(
    () => ({ authState, login, logout, setAuthState }),
    [authState, login, logout, setAuthState]
  );

  // Auto-save authState to localStorage whenever it changes
  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      saveAuthToStorage(authState);
    }
  }, [authState]);

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
