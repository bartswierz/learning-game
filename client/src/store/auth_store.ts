import { create } from "zustand";
import { authAPI, User } from "@/api/auth";

/**
 * Auth store state interface
 */
interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  checkAuth: () => Promise<void>;
}

/**
 * Authentication store using Zustand
 * Manages user state and authentication status
 * Follows the same pattern as store.ts and tts_store.ts
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true, // Start as loading to check auth on mount
  isAuthenticated: false,

  /**
   * Set the current user and mark as authenticated
   */
  setUser: (user) =>
    set({
      user,
      isAuthenticated: user !== null,
      isLoading: false,
    }),

  /**
   * Clear user data and mark as unauthenticated
   */
  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),

  /**
   * Check authentication status by calling /api/auth/me
   * Should be called on app initialization to restore session
   */
  checkAuth: async () => {
    try {
      const response = await authAPI.getCurrentUser();
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      // User is not authenticated or token is invalid
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
