import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import auth from "../../firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updateProfile } from "firebase/auth";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Failed to update profile: " + error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <div className="border rounded shadow bg-white p-6 space-y-8">
        <h2 className="text-2xl font-bold text-center">My Profile</h2>

        {user?.photoURL && (
          <div className="flex justify-center">
            <img
              src={user.photoURL}
              alt="User"
              className="w-24 h-24 rounded-full object-cover border"
            />
          </div>
        )}

        <p className="text-center text-lg font-semibold">
          Name: {user?.displayName || "Not set"}
        </p>
        <p className="text-center text-sm text-gray-600">
          Email: {user?.email || "Not available"}
        </p>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Update Name"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Update Photo URL"
            className="w-full border p-2 rounded"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Update Password"
              className="w-full border p-2 rounded pr-10"
            />
            <div
              className="absolute right-3 top-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-600" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-600" />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          {message && (
            <p className="text-center text-green-600 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
