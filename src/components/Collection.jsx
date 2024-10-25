import React, { useState, useEffect } from 'react';
import { products } from '../assets/assets';
import ProductModal from './ProductModal';
import CartModal from './CartModal';

const Collection = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for modal
  const [showModal, setShowModal] = useState(false); // Show confirmation modal for "Add to Cart"
  const [currentPage, setCurrentPage] = useState(1); // Track current page for products
  const [categoryPage, setCategoryPage] = useState(1); // Track current page for categories
  const productsPerPage = 12; // Show 12 products per page (3 items per row and 4 rows)
  const categoriesPerPage = 15; // Show 15 categories per page in the sidebar

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Calculate paginated products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Get unique categories for sidebar and paginate them
  const categories = ['All', ...new Set(products.map(product => product.category))];
  const indexOfLastCategory = categoryPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  // Pagination handlers for products
  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  // Pagination handlers for categories
  const handleNextCategoryPage = () => setCategoryPage((prevPage) => prevPage + 1);
  const handlePreviousCategoryPage = () => setCategoryPage((prevPage) => Math.max(prevPage - 1, 1));

  // Handle product click to open modal
  const handleProductClick = (product) => setSelectedProduct(product);

  // Close the product details modal
  const handleCloseModal = () => setSelectedProduct(null);

  // Handle adding product to cart and show confirmation modal
  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    addToCart(product);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-50 min-h-screen">
      {/* Sidebar with Categories */}
      <div className="w-full md:w-1/4 mb-6 md:mb-0 pr-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Categories</h2>
        <ul className="space-y-3">
          {currentCategories.map((category) => (
            <li key={category}>
              <button
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1); // Reset to page 1 when changing category
                }}
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

        {/* Category Pagination Controls */}
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

      {/* Product Display */}
      <div className="w-full md:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              onClick={() => handleProductClick(product)}
            >
              <img src={product.Image[0]} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-5">
                <h3 className="font-bold text-xl mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mb-2 text-sm">{product.description}</p>
                <p className="text-gray-800 font-semibold mb-4">Price: ${product.price}</p>
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Product Pagination Controls */}
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
            disabled={indexOfLastProduct >= filteredProducts.length}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              indexOfLastProduct >= filteredProducts.length ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={handleCloseModal} />

      {/* Cart Confirmation Modal */}
      <CartModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Collection;
