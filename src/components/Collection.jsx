import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { products } from '../assets/assets';
import ProductModal from './ProductModal';
import CartModal from './CartModal';

const Collection = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);
  const [autoSlideIndex, setAutoSlideIndex] = useState(0);
  const [sortOrder, setSortOrder] = useState('relevant');

  const productsPerPage = 12;
  const categoriesPerPage = 15;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => setAutoSlideIndex((prevIndex) => prevIndex + 1), 5000);
    return () => clearInterval(intervalId);
  }, []);

  const filteredProducts = useMemo(() => (
    selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory)
  ), [selectedCategory]);

  const sortedProducts = useMemo(() => (
    filteredProducts.sort((a, b) => {
      if (sortOrder === 'highToLow') return b.price - a.price;
      if (sortOrder === 'lowToHigh') return a.price - b.price;
      return 0;
    })
  ), [filteredProducts, sortOrder]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = useMemo(() => (
    sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  ), [sortedProducts, indexOfFirstProduct, indexOfLastProduct]);

  const categories = useMemo(() => (
    ['All', ...new Set(products.map(product => product.category))]
  ), [products]);

  const indexOfLastCategory = categoryPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = useMemo(() => (
    categories.slice(indexOfFirstCategory, indexOfLastCategory)
  ), [categories, indexOfFirstCategory, indexOfLastCategory]);

  const handleNextPage = useCallback(() => setCurrentPage(prev => prev + 1), []);
  const handlePreviousPage = useCallback(() => setCurrentPage(prev => Math.max(prev - 1, 1)), []);
  const handleNextCategoryPage = useCallback(() => setCategoryPage(prev => prev + 1), []);
  const handlePreviousCategoryPage = useCallback(() => setCategoryPage(prev => Math.max(prev - 1, 1)), []);

  const handleProductClick = useCallback((product) => setSelectedProduct(product), []);
  const handleCloseModal = useCallback(() => setSelectedProduct(null), []);
  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setShowSidebar(false);
  }, []);

  const handleAddToCart = useCallback((product, event) => {
    event.stopPropagation();
    addToCart(product);
    setShowModal(true);
  }, [addToCart]);

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

      <div className="w-full md:w-1/4 mb-6 md:mb-0 pr-4 hidden md:flex flex-col h-full bg-white">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product.Image[autoSlideIndex % product.Image.length]}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {product.Image.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAutoSlideIndex(autoSlideIndex + 1);
                  }}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full shadow-md"
                >
                  Slide
                </button>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700 truncate">{product.name}</h3>
                <p className="text-gray-600 text-sm truncate">{product.category}</p>
                <p className="text-indigo-600 font-bold mt-2">${product.price}</p>
              </div>
              <button
                onClick={(e) => handleAddToCart(product, e)}
                className="block w-full py-2 text-center text-sm font-medium bg-indigo-600 text-white rounded-b-lg hover:bg-indigo-700 transition-all"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 space-x-4">
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

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={addToCart}
        />
      )}
      {showModal && <CartModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Collection;
