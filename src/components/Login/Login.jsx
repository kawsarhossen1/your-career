import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import { toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Login Successful!");
      navigate("/");
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
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
      <p className="mt-2">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600">
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
        className="text-blue-600 hover:underline text-sm"
      >
        Forgot Password?
      </Link>
    </div>
  );
};

export default Login;
