import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartModal from './CartModal';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5174';

const Collection = ({ addToCart }) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);
  const [autoSlideIndex, setAutoSlideIndex] = useState(0);
  const [sortOrder, setSortOrder] = useState('relevant');
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const productsPerPage = 12;
  const categoriesPerPage = 15;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemsAndCategories = async () => {
      try {
        const itemsResponse = await fetch(`${backendUrl}/items`);
        const itemsData = await itemsResponse.json();
        setItems(itemsData.items || []);
        
        const categoriesResponse = await fetch(`${backendUrl}/categories`);
        const categoriesData = await categoriesResponse.json();
        setCategories(['All', ...categoriesData]);
      } catch (error) {
        console.error("Error fetching items or categories:", error);
      }
    };

    fetchItemsAndCategories();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAutoSlideIndex((prevIndex) => prevIndex + 1);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Filter products based on selected category and search query
  const filteredProducts = selectedCategory === 'All'
    ? items
    : items.filter(product => product.category === selectedCategory);

  const searchedProducts = filteredProducts.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = searchedProducts.sort((a, b) => {
    if (sortOrder === 'highToLow') return b.price - a.price;
    if (sortOrder === 'lowToHigh') return a.price - b.price;
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const indexOfLastCategory = categoryPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleNextCategoryPage = () => setCategoryPage((prev) => prev + 1);
  const handlePreviousCategoryPage = () => setCategoryPage((prev) => Math.max(prev - 1, 1));

  const handleProductClick = (product) => {
    const productName = product.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/product/${productName}/${product.id}`);
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    addToCart(product);
    setShowModal(true);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setShowSidebar(false);
  };

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const totalStars = 5;
    return (
      <div className="flex items-center mb-2">
        {[...Array(filledStars)].map((_, i) => (
          <span key={i} className="text-yellow-400">&#9733;</span>
        ))}
        {halfStar && <span className="text-yellow-400">&#9734;</span>}
        {[...Array(totalStars - filledStars - (halfStar ? 1 : 0))].map((_, i) => (
          <span key={i} className="text-gray-300">&#9733;</span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-50 min-h-screen">
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-4 right-4 z-50 p-2 bg-indigo-600 text-white rounded-full shadow-md text-xs md:text-sm md:hidden"
      >
        {showSidebar ? 'Close' : 'Categories'}
      </button>

      {showSidebar && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col p-4 overflow-y-auto md:hidden">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Categories</h2>
          <ul className="space-y-2">
            {currentCategories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategorySelect(category)}
                  className={`w-full text-left p-2 rounded-lg font-medium text-sm ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
                  } transition-all`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousCategoryPage}
              disabled={categoryPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition-all text-xs ${
                categoryPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextCategoryPage}
              disabled={indexOfLastCategory >= categories.length}
              className={`px-4 py-2 rounded-lg font-semibold transition-all text-xs ${
                indexOfLastCategory >= categories.length ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <div className={`w-full md:w-1/4 mb-6 md:mb-0 pr-4 hidden md:flex flex-col h-full bg-white`}>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Categories</h2>
        <ul className="space-y-3">
          {currentCategories.map((category) => (
            <li key={category}>
              <button
                onClick={() => handleCategorySelect(category)}
                className={`w-full text-left p-3 rounded-lg font-medium ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
                } transition-all`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousCategoryPage}
            disabled={categoryPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              categoryPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextCategoryPage}
            disabled={indexOfLastCategory >= categories.length}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              indexOfLastCategory >= categories.length ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <div className="w-full md:w-3/4 ml-0 md:ml-1/4">
        {/* Search Input Field */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-4 cursor-pointer" onClick={() => handleProductClick(product)}>
                <img src={product.image} alt={product.title} className="h-32 w-full object-cover rounded-md mb-2" />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                {renderStars(product.rating)}
                <p className="text-gray-700">${product.price}</p>
                <button
                  onClick={(event) => handleAddToCart(product, event)}
                  className="mt-2 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500">No products found</p>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={indexOfLastProduct >= sortedProducts.length}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              indexOfLastProduct >= sortedProducts.length ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <CartModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Collection;
