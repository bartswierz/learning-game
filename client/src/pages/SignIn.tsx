import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/shadcn/button";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      console.log("Google sign in clicked");
      window.location.href = "http://localhost:8080/auth/google";
    } catch (err) {
      setError("Failed to sign in with Google");
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 relative overflow-hidden">
        {/* You can replace this with an actual image or illustration */}
        <div className="absolute inset-0 bg-[url('/path-to-your-illustration.svg')] bg-cover bg-center">
          {/* Placeholder gradient background with decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-600/40 to-blue-600/40"></div>

          {/* Decorative shapes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

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
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Forgot password?
                </Link>
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

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="h-12 bg-gray-800 hover:bg-gray-750 text-white border border-gray-700 rounded-lg font-medium transition-all duration-200"
            >
              <FcGoogle className="text-xl mr-2" />
              Google
            </Button>
            <Button
              onClick={() => console.log("Apple sign in")}
              disabled={isLoading}
              className="h-12 bg-gray-800 hover:bg-gray-750 text-white border border-gray-700 rounded-lg font-medium transition-all duration-200"
            >
              <FaApple className="text-xl mr-2" />
              Apple
            </Button>
          </div>

          {/* Guest Access */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-gray-400 hover:text-gray-300 hover:underline"
            >
              Continue as guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
