import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Career </h2>
          <p>
            Your trusted partner in shaping your career. Explore services, get
            expert advice, and achieve your goals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p>Email: support@yourcareer.com</p>
          <p>Phone: +880 1234 567890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-4 bg-blue-600 text-sm">
        © {new Date().getFullYear()} Your Career. Design by KAWSAR.
      </div>
    </footer>
  );
};

export default Footer;
