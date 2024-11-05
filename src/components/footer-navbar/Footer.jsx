import React from 'react';
import { assets } from '../../assets/assets';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-700 py-12 px-5 text-center sm:text-left border-t border-gray-200 shadow-sm">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-10">

        {/* Logo and Description */}
        <div className="flex flex-col items-center sm:items-start">
          <img src={assets.logo} className="mb-5 w-32 opacity-90" alt="Logo" />
          <p className="text-gray-600 text-sm leading-relaxed">
            Celebrating local artisans, preserving traditions, and promoting sustainability—discover unique, handcrafted creations that make a difference with every purchase.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-gray-800 font-semibold mb-3">COMPANY</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><a href="/" className="hover:text-gray-800 transition-colors">Home</a></li>
            <li><a href="/about" className="hover:text-gray-800 transition-colors">About Us</a></li>
            <li><a href="/collection" className="hover:text-gray-800 transition-colors">Collection</a></li>
            <li><a href="/privacy" className="hover:text-gray-800 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Get In Touch Section */}
        <div>
          <h4 className="text-gray-800 font-semibold mb-3">GET IN TOUCH</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>98000000000</li>
            <li><a href="mailto:hastakala@gmail.com" className="hover:text-gray-800 transition-colors">hastakala@gmail.com</a></li>
            <li className="flex items-center space-x-3">
              <FaFacebook className="text-gray-600 hover:text-gray-800 transition-colors" />
              <a href="https://facebook.com" className="hover:text-gray-800 transition-colors">Facebook</a>
            </li>
            <li className="flex items-center space-x-3">
              <FaInstagram className="text-gray-600 hover:text-gray-800 transition-colors" />
              <a href="https://instagram.com" className="hover:text-gray-800 transition-colors">Instagram</a>
            </li>
            <li className="flex items-center space-x-3">
              <FaTwitter className="text-gray-600 hover:text-gray-800 transition-colors" />
              <a href="https://twitter.com" className="hover:text-gray-800 transition-colors">Twitter</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-100 py-4 mt-10 text-center border-t border-gray-200">
        <p className="text-gray-500 text-xs">
          &copy; {currentYear} नेपाली हस्त कला. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
