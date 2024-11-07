import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { useState, useRef } from "react";

const UserMenu = ({ isLoggedIn, handleLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const hideDropdownTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    setShowDropdown(true);
    clearTimeout(hideDropdownTimeoutRef.current);
  };

  const handleMouseLeave = () => {
    hideDropdownTimeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 1000);
  };

  return (
    isLoggedIn && (
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
    )
  );
};

export default UserMenu;
