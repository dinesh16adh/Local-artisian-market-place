import React, { useState, useEffect, useRef, useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { BiSearch, BiCart, BiUser } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import ShopContext from "../../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const hideDropdownTimeoutRef = useRef(null);

  const {setShowSearch}=useContext(ShopContext)
// ()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
    setIsSeller(localStorage.getItem("isSeller") === "true");
    return () => clearTimeout(hideDropdownTimeoutRef.current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      document.body.style.paddingTop = `${navbar.offsetHeight}px`;
    }
  }, []);

  const navItems = [
    { to: "/", label: "HOME" },
    { to: "/collection", label: "COLLECTION" },
    { to: "/about", label: "ABOUT" },
    { to: "/contact", label: "CONTACT" },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL || "http://localhost:5174"}/auth/log-out`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        localStorage.removeItem("user");
        localStorage.removeItem("isSeller");
        setIsLoggedIn(false);
        setIsSeller(false);
        navigate("/");
        window.location.reload();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
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

  const handleNavigateToLogin = (redirectTo) => {
    navigate("/login", { state: { redirectTo } });
  };

  return (
    <div className="relative h-10">
      <div
        className={`navbar fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? "py-3 text-xs shadow-md h-50" : "py-5 shadow-none my-0 h-100"
        }`}
      >
        <div className="absolute top-6 right-4 flex gap-4 text-sm">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => handleNavigateToLogin("/")}
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Login to Buy
              </button>
              <button
                onClick={() => handleNavigateToLogin("/seller")}
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Become a Seller
              </button>
              <Link
                to="/signup"
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Signup
              </Link>
            </>
          ) : null}
        </div>

        <div className="flex items-center justify-between px-4 font-medium">
          <Link to={isSeller ? "/seller" : "/"} className="flex-shrink-0">
            <img
              src={assets.logo}
              className={`w-36 transition-all duration-300 ${
                scrolled ? "w-28" : "w-36"
              }`}
              alt="Logo"
            />
          </Link>

          {!isSeller && (
            <ul className="hidden sm:flex gap-5 text-gray-700">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `relative flex flex-col items-center gap-1 text-gray-700 ${
                      isActive ? "font-bold text-indigo-600" : ""
                    }`
                  }
                >
                  <p>{item.label}</p>
                  {location.pathname === item.to && (
                    <span
                      className="absolute bottom-[-5px] left-0 right-0 h-1 bg-gray-700 mx-auto"
                      style={{ width: "50%" }}
                    />
                  )}
                </NavLink>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-6">
            
              <BiSearch onClick={()=>setShowSearch(true)} className="w-5 h-5 cursor-pointer" />
            

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
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                {cartCount}
              </p>
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
              <div
                onClick={() => setVisible(false)}
                className="flex items-center gap-4 p-3 cursor-pointer"
              >
                <img
                  className="h-4 rotate-90"
                  src={assets.dropdown_icon}
                  alt="Back"
                />
                <p>Back</p>
              </div>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  onClick={() => setVisible(false)}
                  className="py-2 pl-6 border"
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
