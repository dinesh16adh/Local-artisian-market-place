import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import NavItems from "./NavItems";
import CartIcon from "./CartIcon";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const navbarBackgroundColor = "bg-[#d2cff9]";

  const navItems = [
    { to: "/", label: "HOME" },
    { to: "/collection", label: "COLLECTION" },
    { to: "/about", label: "ABOUT" },
    { to: "/contact", label: "CONTACT" },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
    setIsSeller(localStorage.getItem("isSeller") === "true");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigateToLogin = (redirectTo) => {
    navigate("/login", { state: { redirectTo } });
  };
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };
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
        console.error("Logout failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <div className="relative">
      <div
        className={`navbar fixed top-0 left-0 right-0 z-50 ${navbarBackgroundColor} transition-all duration-300 shadow-md ${
          isScrolled ? "h-16 py-0" : "h-20 py-3"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8">
          {/* Left Section - Logo, always on the left */}
          <Link to={isSeller ? "/seller" : "/"} className="flex-shrink-0">
            <img
              src={assets.logo}
              className={`w-12 h-auto md:w-16 ${isScrolled ? "hidden md:block" : ""}`}
              alt="Logo"
            />
          </Link>

          {/* Centered Navigation Items - Hidden on smaller screens */}
          <div className="hidden md:flex flex-grow justify-center">
            <NavItems navItems={navItems} isSeller={isSeller} />
          </div>

          {/* Right Section - AuthButtons/UserMenu and CartIcon */}
          <div className="flex items-center gap-0 md:gap-4">
            {showSearch ? (
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                clearSearch={() => setSearchQuery("")}
              />
            ) : (
              location.pathname === "/collection" && (
                <BiSearch
                  className="w-5 h-5 cursor-pointer text-gray-600 hover:text-white transition-colors duration-200"
                  onClick={() => setShowSearch(true)}
                />
              )
            )}

            {isLoggedIn ? (
              <UserMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            ) : (
              <div className="hidden md:flex space-x-2">
                <AuthButtons handleNavigateToLogin={handleNavigateToLogin} />
              </div>
            )}
            
            {/* Cart Icon */}
            <CartIcon cartCount={cartCount} />
          </div>
        </div>


        {/* Auth and Navigation Items for smaller screens */}
        <div
          className={`md:hidden flex flex-col items-center ${
            isScrolled ? "-mt-1 space-y-4" : "-mt-8 space-y-3"
          }`}
        >
          {/* Conditionally render AuthButtons based on scroll */}
          {!isScrolled && !isLoggedIn && (
            <AuthButtons handleNavigateToLogin={handleNavigateToLogin} />
          )}
          <NavItems navItems={navItems} isSeller={isSeller} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
