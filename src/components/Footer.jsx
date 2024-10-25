import React from 'react';
import { assets } from '../assets/assets';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-10 px-5 text-center sm:text-left shadow-inner">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-10">

        {/* Logo and Description */}
        <div className="flex flex-col items-center sm:items-start">
          <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
          <p className="text-gray-600 text-sm">
            Celebrating local artisans, preserving traditions, and promoting sustainability—discover unique, handcrafted creations that make a difference with every purchase.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-gray-800 font-semibold mb-3">COMPANY</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><a href="/" className="hover:text-gray-800">Home</a></li>
            <li><a href="/about" className="hover:text-gray-800">About Us</a></li>
            <li><a href="/collection" className="hover:text-gray-800">Collection</a></li>
            <li><a href="/privacy" className="hover:text-gray-800">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Get In Touch Section */}
        <div>
          <h4 className="text-gray-800 font-semibold mb-3">GET IN TOUCH</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>98000000000</li>
            <li><a href="mailto:greatstackdev@gmail.com" className="hover:text-gray-800">hastakala@gmail.com</a></li>
            <li className="flex items-center space-x-3">
              <FaFacebook /> 
              <a href="https://facebook.com" className="hover:text-gray-800">Facebook</a>
            </li>
            <li className="flex items-center space-x-3">
              <FaInstagram /> 
              <a href="https://instagram.com" className="hover:text-gray-800">Instagram</a>
            </li>
            <li className="flex items-center space-x-3">
              <FaTwitter /> 
              <a href="https://twitter.com" className="hover:text-gray-800">Twitter</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-black py-5 mt-10 text-center px-0">
        <p className="text-white text-xs">
          &copy; {currentYear} नेपाली हस्त कला. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
