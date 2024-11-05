import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../../assets/assets';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { BiSearch, BiCart, BiUser } from 'react-icons/bi';
import { MdClose } from 'react-icons/md'; 

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const hideDropdownTimeoutRef = useRef(null);

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
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleMouseEnter = () => {
        setShowDropdown(true);
        clearTimeout(hideDropdownTimeoutRef.current);
    };

    const handleMouseLeave = () => {
        hideDropdownTimeoutRef.current = setTimeout(() => {
            setShowDropdown(false);
        }, 1000);
    };

    const clearSearch = () => {
        setSearchQuery("");
        setShowSearch(false);
    };

    return (
        <div className="relative">
            <div className="absolute top-6 right-4 flex gap-4 text-sm">
                {!isLoggedIn ? (
                    <>
                        <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition-colors">Login to Buy</Link>
                        <Link to="/signup" className="text-gray-700 hover:text-indigo-600 transition-colors">Signup</Link>
                    </>
                ) : null}
            </div>

            <div className="flex items-center justify-between py-5 px-4 font-medium">
                <Link to="/" onClick={() => navigate('/')} className="flex-shrink-0">
                    <img src={assets.logo} className="w-36 cursor-pointer" alt="Logo" />
                </Link>

                <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                    {navItems.map((item) => (
                        <NavLink 
                            key={item.to} 
                            to={item.to} 
                            className={({ isActive }) => `relative flex flex-col items-center gap-1 text-gray-700`}
                        >
                            <p>{item.label}</p>
                            {location.pathname === item.to && (
                                <span className="absolute bottom-[-5px] left-0 right-0 h-1 bg-gray-700 mx-auto" style={{ width: '50%' }} />
                            )}
                        </NavLink>
                    ))}
                </ul>

                <div className="flex items-center gap-6">
                    {showSearch ? (
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="border-b border-gray-300 outline-none text-sm px-2 py-1 w-32"
                                placeholder="Search items..."
                                autoFocus
                            />
                            <MdClose 
                                className="ml-2 w-5 h-5 cursor-pointer text-gray-500" 
                                onClick={clearSearch} 
                            />
                        </div>
                    ) : (
                        location.pathname === '/collection' && ( // Show search only on the collection page
                            <BiSearch className="w-5 h-5 cursor-pointer" onClick={() => setShowSearch(true)} />
                        )
                    )}

                    {isLoggedIn && (
                        <div 
                            className="relative group"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link to="/profile">
                                <BiUser className="w-5 h-5 cursor-pointer" />
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

                    <Link to="/cart" className="relative">
                        <BiCart className="w-5 h-5 cursor-pointer" />
                        <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{cartCount}</p>
                    </Link>

                    <img
                        onClick={() => setVisible(true)}
                        src={assets.menu_icon}
                        className="w-5 cursor-pointer sm:hidden"
                        alt="Menu"
                    />
                </div>
            </div>

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
