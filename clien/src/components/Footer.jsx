import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto text-center">
        <div className="mb-2">
        <Link
            to="/privacy"
            className="hover:text-orange-500 transition-colors duration-200 mx-2"
          >
            Privacy Policy
          </Link>
          <span className="text-gray-500">|</span>
          <Link
            to="/terms"
            className="hover:text-orange-500 transition-colors duration-200 mx-2"
          >
            Terms of Service
          </Link>
          <span className="text-gray-500">|</span>
          <Link
            to="/about"
            className="hover:text-orange-500 transition-colors duration-200 mx-2"
          >
            About
          </Link>
          <span className="text-gray-500">|</span>
          <Link
            to="/developer"
            className="hover:text-orange-500 transition-colors duration-200 mx-2"
          >
            Developers
          </Link>
          <span className="text-gray-500">|</span>
          <Link
            to="/feedback"
            className="hover:text-orange-500 transition-colors duration-200 mx-2"
          >
            Feedback
          </Link>
        </div>
        <div className="text-sm text-gray-400">
          © TicTacToe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
