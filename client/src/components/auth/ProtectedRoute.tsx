import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth_store";
import HomePageSkeleton from "@/components/ui/Skeletons/HomePageSkeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute component that guards routes requiring authentication
 * - Shows loading skeleton while checking auth status
 * - Redirects to /signin if user is not authenticated
 * - Renders children if user is authenticated
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  // Show loading state while checking authentication
  if (isLoading) {
    return <HomePageSkeleton />;
  }

  // Redirect to signin if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // User is authenticated - render protected content
  return <>{children}</>;
};
