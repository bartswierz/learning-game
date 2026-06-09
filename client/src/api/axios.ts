import axios from "axios";

/**
 * Centralized axios instance for all API calls
 * Configured with base URL and credentials to automatically send HTTP-only cookies
 */
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // Send cookies with every request
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Response interceptor to handle authentication errors globally
 * Redirects to signin page when token is expired or invalid (401)
 */
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to signin
      // Only redirect if not already on auth pages
      const currentPath = window.location.pathname;
      if (
        currentPath !== "/signin" &&
        currentPath !== "/signup" &&
        currentPath !== "/forgot-password"
      ) {
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
