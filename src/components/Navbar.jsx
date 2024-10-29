import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    let hideDropdownTimeout;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setIsLoggedIn(!!user);
    }, []);

    const navItems = [
        { to: "/", label: "HOME" },
        { to: "/collection", label: "COLLECTION" },
        { to: "/about", label: "ABOUT" },
        { to: "/contact", label: "CONTACT" }
    ];

    const handleLogout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5174'}/auth/log-out`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                localStorage.removeItem('user');
                setIsLoggedIn(false);
                navigate('/Local-artisian-market-place');  // Redirect to home after logout
                window.location.reload();  // Force a full page reload to refresh the content
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };

    const handleHomeClick = (e) => {
        e.preventDefault();  // Prevents default link behavior
        navigate('/Local-artisian-market-place');
        window.location.reload();  // Forces a full page reload to refresh content
    };

    const handleMouseEnter = () => {
        setShowDropdown(true);
        clearTimeout(hideDropdownTimeout);
    };

    const handleMouseLeave = () => {
        hideDropdownTimeout = setTimeout(() => {
            setShowDropdown(false);
        }, 3000);
    };

    return (
        <div className="relative">
            {/* Top Right Links for Login and Signup */}
            <div className="absolute top-6 right-4 flex gap-4 text-sm">
                {!isLoggedIn ? (
                    <>
                        <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition-colors">Login to Buy</Link>
                        <Link to="/signup" className="text-gray-700 hover:text-indigo-600 transition-colors">Signup</Link>
                    </>
                ) : null}
            </div>

            {/* Main Navbar */}
            <div className="flex items-center justify-between py-5 px-4 font-medium">
                
                {/* Logo */}
                <Link to="/" onClick={handleHomeClick} className="flex-shrink-0">
                    <img src={assets.logo} className="w-36 cursor-pointer" alt="Logo" />
                </Link>

                {/* Desktop Navigation Links */}
                <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                    {navItems.map((item) => (
                        <NavLink 
                            key={item.to} 
                            to={item.to} 
                            onClick={item.to === "/" ? handleHomeClick : undefined} 
                            className="flex flex-col items-center gap-1"
                        >
                            <p>{item.label}</p>
                            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                        </NavLink>
                    ))}
                </ul>

                {/* Right Section: Icons */}
                <div className="flex items-center gap-6">
                    <img src={assets.search_icon} className="w-5 cursor-pointer" alt="Search" />
                    
                    {/* Profile Icon with Dropdown - only visible when logged in */}
                    {isLoggedIn && (
                        <div 
                            className="relative group"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link to="/profile">
                                <img className="w-5 cursor-pointer" src={assets.profile_icon} alt="Profile" />
                            </Link>
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-md">
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
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
                        className="w-5 cursor-pointer sm:hidden"
                        alt="Menu"
                    />
                </div>
            </div>

            {/* Sidebar Menu for Smaller Screens */}
            {visible && (
                <div className="absolute top-0 right-0 bottom-0 overflow-hidden bg-white w-full transition-all">
                    <div className="flex flex-col text-grey-600">
                        <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                            <img className="h-4 rotate-90" src={assets.dropdown_icon} alt="Back" />
                            <p>Back</p>
                        </div>
                        {navItems.map((item) => (
                            <NavLink key={item.to} onClick={() => setVisible(false)} className="py-2 pl-6 border" to={item.to}>
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
