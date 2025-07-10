import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="w-full py-6 text-center bg-blue-600 text-white">
        <span className="loading loading-spinner text-white text-xl"></span>
      </div>
    );
  }

  return (
    <nav className=" sticky top-0 z-50 bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <Link to="/" className="text-2xl font-bold">
        {" "}
        Your Career
      </Link>
      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          My Profile
        </NavLink>
        {user ? (
          <div className="flex items-center gap-3">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="User"
                className="w-8 h-8 rounded-full border"
              />
            )}
            <span className="text-sm font-medium">{user.displayName}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-600 font-bold px-3 py-1 rounded hover:bg-gray-100"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
