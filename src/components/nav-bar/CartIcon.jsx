import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";

const CartIcon = ({ cartCount }) => {
  return (
    <Link to="/cart" className="relative">
      <BiCart className="w-5 h-5 cursor-pointer" />
      <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
        {cartCount}
      </p>
    </Link>
  );
};

export default CartIcon;
