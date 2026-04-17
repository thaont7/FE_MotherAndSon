import { AuthState } from "../types/auth";

const AUTH_STORAGE_KEY = "auth_cache";

/**
 * Lưu auth state vào localStorage
 */
export const saveAuthToStorage = (authState: AuthState): void => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
  } catch (error) {
    console.error("Failed to save auth to localStorage:", error);
  }
};

/**
 * Lấy auth state từ localStorage
 */
export const getAuthFromStorage = (): AuthState | null => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (error) {
    console.error("Failed to get auth from localStorage:", error);
    return null;
  }
};

/**
 * Xóa auth state khỏi localStorage
 */
export const clearAuthFromStorage = (): void => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear auth from localStorage:", error);
  }
};
