import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

  return showSearch ? (
    <div className="border-t border-b bg-gray-50 text-center relative">
      <div className="inline-flex items-center justify-center border border-gray-400 px-3 py-3 my-3 mx-3 rounded-full w-2/4 sm:w-1/3">
        <input
          className="flex-1 outline-none bg-inherit text-xs"  // Reduced text size
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
        <FaSearch className="ml-2 text-gray-500 cursor-pointer" />
      </div>
      {/* X icon outside the input container with gray-800 color */}
      <FaTimes
        className="inline w-3 cursor-pointer text-gray-500"  // Changed color to gray-800
        onClick={() => {
          setShowSearch(false);
        }}
      />
    </div>
  ) : null;
};

export default SearchBar;
