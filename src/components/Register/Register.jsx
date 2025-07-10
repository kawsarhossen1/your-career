import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    return (
      password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password)
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(data.password)) {
      toast.error("Password must have 6+ chars, uppercase, and lowercase.");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(result.user, {
        displayName: data.name,
        photoURL: data.photoURL,
      });
      toast.success("Registration Successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Optional: Show toast with user's display name
      toast.success(`Welcome, ${user.displayName || "User"}!`);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 shadow rounded bg-white">
      <h2 className="text-2xl mb-4 font-bold">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
        />
        <input
          name="photoURL"
          onChange={handleChange}
          type="text"
          placeholder="Photo URL"
          className="border p-2 w-full"
        />
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
        />
        {/* Password Field with Show/Hide */}
        <div className="relative">
          <input
            name="password"
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border p-2 w-full pr-10"
          />
          <div
            className="absolute top-2.5 right-3 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="w-5 h-5" />
            ) : (
              <FaEye className="w-5 h-5" />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Register
        </button>
      </form>

      <p className="mt-2">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-bold">
          Login
        </Link>
      </p>

      <button
        onClick={handleGoogle}
        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
      >
        Register with Google
      </button>
    </div>
  );
};

export default Register;
