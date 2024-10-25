import React, { useState, useEffect } from 'react';
import { assets, products } from '../assets/assets';
import { Link } from 'react-router-dom';
import CartModal from './CartModal';
import ProductModal from './ProductModal';
import Hero from './Hero';
import Ourpolicies from './Ourpolicies';
import Newsletterbox from './Newsletterbox';

const HomePage = ({ addToCart }) => {
  const [visibleProducts, setVisibleProducts] = useState(12); 
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);

  const messages = [
    "Find Nepali local homemade products, arts, and more in one place.",
    "Don’t be a victim of fraud; get authentic, verified products here!",
    "Explore handmade crafts, cultural artifacts, and more from Nepal."
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000);

    return () => clearInterval(messageInterval);
  }, [messages.length]);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowNewsletterPopup(true);
      localStorage.setItem('hasVisited', true);
    }
  }, []);

  const filteredProducts = categoryFilter === 'All' 
    ? products 
    : products.filter(product => product.category === categoryFilter);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowModal(true);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const closeNewsletterPopup = () => {
    setShowNewsletterPopup(false);
  };

  const categories = ['All', ...new Set(products.map(product => product.category))];
  const limitedCategories = categories.slice(0, 5);
  const hasMoreCategories = categories.length > 5;

  return (
    <div className="min-h-screen bg-gray-50">
      {showNewsletterPopup && <Newsletterbox mode="popup" closeNewsletter={closeNewsletterPopup} />}

      {/* Banner Section */}
      <div
        className="relative w-full h-80 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${assets.banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-transparent opacity-70"></div>
        <div className="relative z-10 text-center px-6 md:px-20">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {messages[currentMessageIndex]}
          </h1>
          <Link
            to="/collection"
            className="inline-block px-6 py-3 mt-4 text-sm font-semibold text-gray-900 bg-yellow-300 hover:bg-yellow-400 rounded-lg shadow-md transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      </div>

      {/* Compact Inline Newsletter Box */}
      {!showNewsletterPopup && <Newsletterbox mode="inline" />}

      {/* Category Filter */}
      <div className="flex justify-center my-6 flex-wrap gap-2">
        {limitedCategories.map((category) => (
          <button
            key={category}
            onClick={() => setCategoryFilter(category)}
            className={`px-4 py-2 border ${categoryFilter === category ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'} rounded-lg shadow-sm hover:bg-indigo-500 hover:text-white transition-all`}
          >
            {category}
          </button>
        ))}
        {hasMoreCategories && (
          <Link to="/collection" className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-500 transition-all">
            More
          </Link>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 md:p-10">
        {filteredProducts.slice(0, visibleProducts).map((product) => (
          <div 
            key={product._id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            onClick={() => handleProductClick(product)}
          >
            <img src={product.Image[0]} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="font-bold text-xl mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-gray-800 font-semibold mb-4">Price: ${product.price}</p>
              <button
                onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-500 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* "See More" Button */}
      {visibleProducts < filteredProducts.length && (
        <div className="flex justify-center my-6">
          <Link
            to="/collection"
            className="px-6 py-3 bg-gray-200 text-gray-600 font-semibold rounded-md shadow-md hover:bg-gray-300 transition-all"
          >
            See More
          </Link>
        </div>
      )}

      {/* Product Details Modal */}
      <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={handleCloseModal} />

      {/* Cart Confirmation Modal */}
      <CartModal showModal={showModal} setShowModal={setShowModal} />

      <Ourpolicies />
    </div>
  );
};

export default HomePage;
