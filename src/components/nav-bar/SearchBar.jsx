import { MdClose } from "react-icons/md";

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, clearSearch }) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="border-b border-gray-300 outline-none text-sm px-2 py-1 w-32"
        placeholder="Search items..."
        autoFocus
      />
      <MdClose
        className="ml-2 w-5 h-5 cursor-pointer text-gray-500"
        onClick={clearSearch}
      />
    </div>
  );
};

export default SearchBar;
