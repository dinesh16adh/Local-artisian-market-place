import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in

    return (
      <div className="relative">

        {/* Top Right Links for Login and Signup */}
        <div className="absolute top-6 right-4 flex gap-4 text-sm">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition-colors">Login to Buy</Link>
              <Link to="/signup" className="text-gray-700 hover:text-indigo-600 transition-colors">Signup</Link>
            </>
          ) : (
            <Link to="/profile" className="text-gray-700 hover:text-indigo-600 transition-colors">My Profile</Link>
          )}
        </div>

        {/* Main Navbar */}
        <div className="flex items-center justify-between py-5 px-4 font-medium">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={assets.logo} className="w-36 cursor-pointer" alt="Logo" />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
            <NavLink to="/" className="flex flex-col items-center gap-1">
              <p>HOME</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/collection" className="flex flex-col items-center gap-1">
              <p>COLLECTION</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/about" className="flex flex-col items-center gap-1">
              <p>ABOUT</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/contact" className="flex flex-col items-center gap-1">
              <p>CONTACT</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          </ul>

          {/* Right Section: Icons */}
          <div className="flex items-center gap-6">
            <img src={assets.search_icon} className="w-5 cursor-pointer" alt="Search" />
            
            {/* Profile Dropdown (Visible only when logged in) */}
            {isLoggedIn && (
              <div className="group relative">
                <img className="w-5 cursor-pointer" src={assets.profile_icon} alt="Profile" />
                <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                    <p className="cursor-pointer hover:text-black">My Profile</p>
                    <p className="cursor-pointer hover:text-black">Orders</p>
                    <p className="cursor-pointer hover:text-black">Logout</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">1</p>
            </Link>

            {/* Menu Icon for Smaller Screens */}
            <img
              onClick={() => setVisible(true)}
              src={assets.menu_icon}
              className="w-5 cursor-pointer sm:hidden border"
              alt="Menu"
            />
          </div>
        </div>

        {/* Sidebar Menu for Smaller Screens */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
          <div className="flex flex-col text-grey-600">
            <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
              <img className="h-4 rotate-90" src={assets.dropdown_icon} alt="Back" />
              <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">Home</NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">CONTACT</NavLink>
            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">Collection</NavLink>
          </div>
        </div>
      </div>
    );
};

export default Navbar;
