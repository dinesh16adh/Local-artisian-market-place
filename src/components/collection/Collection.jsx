import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartModal from '../cart/CartModal';

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
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchItemsAndCategories();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, categoryPage]);

  const filteredProducts = selectedCategory === 'All'
    ? items
    : items.filter(product => product.category === selectedCategory);

    const sortedProducts = (function insertionSortArray() {
      
      function insertionSort(arr, sortOrder = 'lowToHigh') {
        for (let i = 1; i < arr.length; i++) {
          let currentProduct = arr[i];
          let j = i - 1;
          while (j >= 0 && ((sortOrder === 'lowToHigh' && arr[j].price > currentProduct.price) ||
                            (sortOrder === 'highToLow' && arr[j].price < currentProduct.price))) {
            arr[j + 1] = arr[j];
            j = j - 1;
          }

          arr[j + 1] = currentProduct;
        }
    
        return arr;
      }
      return insertionSort([...filteredProducts], sortOrder);
    })();

    console.log(sortedProducts);
    
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const indexOfLastCategory = categoryPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const handleNextPage = () => setCurrentPage(prev => prev + 1);
  const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const handleNextCategoryPage = () => setCategoryPage(prev => prev + 1);
  const handlePreviousCategoryPage = () => setCategoryPage(prev => Math.max(prev - 1, 1));

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
    navigate(`/category/${category}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="flex justify-end items-center mb-4">
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            className="p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-600"
          >
            <option value="relevant">Relevant</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="lowToHigh">Price: Low to High</option>
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center my-6">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={product.photos[autoSlideIndex % product.photos.length]?.url}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{product.title}</h3>
                  <p className="text-gray-600 mb-2 text-sm">{product.description}</p>
                  <p className="text-gray-800 font-semibold mb-4">Price: ${product.price}</p>

                  {product.rating && renderStars(product.rating)}

                  <p
                    className={`text-sm font-semibold ${
                      product.inStock > 5 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {product.inStock > 5 ? `In Stock: ${product.inStock}` : 'Low Stock'}
                  </p>

                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="w-full py-2 mt-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500'
            }`}
          >
            Previous
          </button>
          <span className="text-gray-600 font-medium">Page {currentPage}</span>
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

      {showModal && <CartModal showModal={showModal} setShowModal={setShowModal} />}
    </div>
  );
};

export default Collection;
