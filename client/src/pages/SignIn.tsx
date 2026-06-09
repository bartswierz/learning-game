import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/shadcn/button";
import { authAPI } from "@/api/auth";
import { useAuthStore } from "@/store/auth_store";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authAPI.login(email, password);
      setUser(response.user); // Update auth store with user data
      navigate("/"); // Navigate to home page
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Invalid credentials");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/path-to-your-illustration.svg')] bg-cover bg-center">
          {/* Placeholder gradient background with decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-600/40 to-blue-600/40"></div>

          {/* Content overlay */}
          <div className="relative h-full flex flex-col justify-center items-center text-white p-12">
            <div className="text-8xl mb-8">🎓</div>
            <h2 className="text-5xl font-bold mb-4 text-center">
              Welcome Back!
            </h2>
            <p className="text-xl text-center text-white/90">
              Continue your learning journey
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-900 p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Sign in to your account
            </h1>
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-5">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                placeholder="parent@example.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                {/* <Link
                  to="/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Forgot password?
                </Link> */}
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                placeholder="••••••••"
              />
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-200"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {/* Guest Access */}
          <div className="mt-6 text-center">
            <Button className="w-full h-12 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold transition-all duration-200">
              <Link
                to="/"
                className="w-full h-full flex items-center justify-center"
              >
                Continue as guest
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
