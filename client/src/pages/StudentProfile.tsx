import { useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO - add a sign out button that clears the token from localStorage and redirects to the sign in page
export default function StudentProfile() {
  const navigate = useNavigate();
  // TODO - Fetch actual student data from backend and replace hardcoded values
  const [studentName, setStudentName] = useState<string>("John");
  const [points, setPoints] = useState<number>(450);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
    // TODO: Open edit profile modal/form
    console.log("Edit profile clicked");
  };

  const handleDeleteAccount = () => {
    // TODO: Show confirmation dialog before deletion
    // TODO - implement remove user logic here, the delete account is in /routes/users -> /api/users/:id DELETE
    const confirmed = window.confirm(
      "Are you sure you want to delete this account? This action cannot be undone.",
    );

    console.log("confirmed? ", confirmed);
    if (confirmed) {
      // TODO - need the user's ID or token to send the DELETE request to the backend for account deletion,
      // and also need to handle the response to confirm deletion and redirect to sign-in page

      // ADD API DELETE LOGIC HERE - User deletion will be handled by the backend,

      // so we need to send a DELETE request to the appropriate endpoint with the user's ID or token for authentication.
      // After successful deletion, we should also clear any user data from localStorage and redirect to the sign-in page.
      console.log("Account deleted");
      // TODO: Implement actual deletion logic
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-[56px]">
      <div className="max-w-4xl mx-auto">
        {/* Main Profile Card */}
        <div className="bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl shadow-2xl p-8 mb-8 border-8 border-white">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8">
            {/* Avatar Section */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center text-7xl border-8 border-white shadow-xl">
                  👤
                </div>
                {/* Optional: Add edit avatar button */}
                <button
                  className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors border-2 border-white"
                  aria-label="Change avatar"
                >
                  ✏️
                </button>
              </div>
            </div>

            {/* Name and Points */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                <span>🌟</span>
                <span>{studentName}</span>
                <span>🌟</span>
              </h1>
              <div className="text-2xl font-semibold text-purple-600 flex items-center justify-center gap-2">
                <span>⭐</span>
                <span>{points} Points Earned!</span>
                <span>⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Edit Profile Button */}
          <button
            onClick={handleEditProfile}
            className="group bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 border-white p-8"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-6xl">✏️</div>
              <div className="text-3xl font-bold">EDIT PROFILE</div>
              <div className="text-lg opacity-90">Update your information</div>
            </div>
          </button>

          {/* Delete Account Button */}
          <button
            onClick={handleDeleteAccount}
            className="group bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 border-white p-8"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-6xl">🗑️</div>
              <div className="text-3xl font-bold">DELETE ACCOUNT</div>
              <div className="text-lg opacity-90">Remove your profile</div>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-white hover:text-white/80 font-semibold text-xl transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
