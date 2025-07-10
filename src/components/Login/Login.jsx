import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Login Successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      toast.success(`Welcome, ${result.user.displayName || "User"}!`);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 mt-10 shadow rounded bg-white">
      <h2 className="text-2xl mb-4 font-bold">Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
        />

        {/* Password with show/hide */}
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
          Login
        </button>
      </form>

      <p className="mt-2">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>

      <button
        onClick={handleGoogle}
        className="mt-4 w-full bg-red-500 hover:bg-red-600 transition text-white py-2 rounded-md font-semibold"
      >
        Login with Google
      </button>

      <Link
        to="/forgot-password"
        state={{ email: data.email }}
        className="block mt-3 text-blue-600 hover:underline text-sm"
      >
        Forgot Password?
      </Link>
    </div>
  );
};

export default Login;
