import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Page not found</h2>
      <p className="text-gray-600 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
