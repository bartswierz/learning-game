import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/shadcn/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { authAPI } from "@/api/auth";
import { useAuthStore } from "@/store/auth_store";
import axios from "axios";

interface SignUpFormInputs {
  email: string;
  password: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp: SubmitHandler<SignUpFormInputs> = async (data) => {
    console.log("form submitted - data:", data);
    setError("");
    setIsLoading(true);

    try {
      const response = await authAPI.register(data.email, data.password);
      setUser(response.user); // Update auth store with user data
      navigate("/"); // Navigate to home page
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to create account");
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
            <div className="text-8xl mb-8">🚀</div>
            <h2 className="text-5xl font-bold mb-4 text-center">
              Start Learning Today!
            </h2>
            <p className="text-xl text-center text-white/90">
              Join other parents helping their kids excel!
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
              Create an account
            </h1>
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                Log in
              </Link>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-5">
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
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                placeholder="parent@gmail.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Enter your password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-200"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
