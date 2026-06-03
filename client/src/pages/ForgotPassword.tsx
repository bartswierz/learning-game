import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/shadcn/button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send reset link");
      }

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset link",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-600/40 to-blue-600/40"></div>

          {/* Decorative shapes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

          {/* Content overlay */}
          <div className="relative h-full flex flex-col justify-center items-center text-white p-12">
            <div className="text-8xl mb-8">🔐</div>
            <h2 className="text-5xl font-bold mb-4 text-center">
              Reset Your Password
            </h2>
            <p className="text-xl text-center text-white/90 max-w-md">
              We'll send you a secure link to reset your password
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-900 p-8">
        <div className="w-full max-w-md">
          {success ? (
            // Success State
            <div className="text-center">
              <div className="text-6xl mb-6">✉️</div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Check your email
              </h1>
              <p className="text-gray-400 mb-8">
                We've sent a password reset link to{" "}
                <span className="text-white font-semibold">{email}</span>
              </p>
              <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4 mb-8">
                <p className="text-sm text-blue-400">
                  💡 Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setSuccess(false)}
                    className="underline hover:text-blue-300"
                  >
                    try again
                  </button>
                </p>
              </div>
              <Link
                to="/signin"
                className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium"
              >
                ← Back to sign in
              </Link>
            </div>
          ) : (
            // Form State
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Forgot your password?
                </h1>
                <p className="text-gray-400">
                  Remember it?{" "}
                  <Link
                    to="/signin"
                    className="text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    Log in
                  </Link>
                </p>
              </div>

              {/* Instructions */}
              <div className="mb-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
                <p className="text-sm text-gray-300">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-200"
                >
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
              </form>

              {/* Back Link */}
              <div className="mt-6 text-center">
                <Link
                  to="/signin"
                  className="inline-flex items-center text-gray-400 hover:text-gray-300 hover:underline"
                >
                  ← Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
