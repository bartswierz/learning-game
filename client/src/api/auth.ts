import apiClient from "./axios";

/**
 * User type matching backend response
 */
export interface User {
  id: number;
  email: string;
  created_at?: string;
}

/**
 * Response types for auth endpoints
 */
interface LoginResponse {
  user: User;
}

interface RegisterResponse {
  message: string;
  user: User;
}

interface LogoutResponse {
  message: string;
}

interface GetCurrentUserResponse {
  user: User;
}

/**
 * Auth API service
 * All functions use the axios client which automatically sends cookies
 */
export const authAPI = {
  /**
   * Login user with email and password
   * Backend sets HTTP-only cookie on success
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Register new user with email and password
   * Backend sets HTTP-only cookie on success
   */
  register: async (
    email: string,
    password: string,
  ): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>("/auth/register", {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Logout current user
   * Backend clears HTTP-only cookie
   */
  logout: async (): Promise<LogoutResponse> => {
    const response = await apiClient.post<LogoutResponse>("/auth/logout");
    return response.data;
  },

  /**
   * Get current authenticated user
   * Used to verify auth status and restore session
   */
  getCurrentUser: async (): Promise<GetCurrentUserResponse> => {
    const response = await apiClient.get<GetCurrentUserResponse>("/auth/me");
    return response.data;
  },
};
