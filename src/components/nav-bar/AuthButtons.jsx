import { Link } from "react-router-dom";

const AuthButtons = ({ handleNavigateToLogin }) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <button
        onClick={() => handleNavigateToLogin("/")}
        className="text-xs sm:text-sm text-black transition-colors hover:text-gray-700"
      >
        Login to Buy
      </button>
      <button
        onClick={() => handleNavigateToLogin("/seller")}
        className="text-xs sm:text-sm text-black transition-colors hover:text-gray-700"
      >
        Become a Seller
      </button>
      <Link
        to="/signup"
        className="text-xs sm:text-sm text-black transition-colors hover:text-gray-700"
      >
        Signup
      </Link>
    </div>
  );
};

export default AuthButtons;
