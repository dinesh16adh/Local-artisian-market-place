import React, { useState, useEffect } from 'react';
import { assets, products } from '../assets/assets';

import { Link } from 'react-router-dom';
import CartModal from './CartModal';
import Footer from './Footer';
import ProductModal from './ProductModal';

import CartModal from './CartModal'; // Import the new CartModal
// import Footer from '../components/Footer'; // Import Footer component
import Hero from './Hero';


const HomePage = ({ addToCart }) => {
  const [visibleProducts, setVisibleProducts] = useState(12); 
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null); // For product modal

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

  const categories = ['All', ...new Set(products.map(product => product.category))];
  const limitedCategories = categories.slice(0, 5);
  const hasMoreCategories = categories.length > 5;

  return (
    
    <div>

      <div
        className="relative w-full h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${assets.banner})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-6 md:px-20">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            {messages[currentMessageIndex]}
          </h1>
        </div>
      </div>

      <div className="flex justify-center my-4 flex-wrap gap-2">
        {limitedCategories.map((category) => (

      <div>
        <Hero/>
      </div>
      {/* Category Filter */}
      <div className="flex justify-center my-4">
        {categories.map((category) => (

          <button
            key={category}
            onClick={() => setCategoryFilter(category)}
            className={`px-4 py-2 border ${categoryFilter === category ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'} rounded`}
          >
            {category}
          </button>
        ))}
        {hasMoreCategories && (
          <Link to="/collection" className="px-4 py-2 bg-indigo-600 text-white rounded">
            More
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 md:p-10">
        {filteredProducts.slice(0, visibleProducts).map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer" onClick={() => handleProductClick(product)}>
            <img src={product.Image[0]} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="font-bold text-xl mb-2">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-semibold">Price: ${product.price}</p>
              <button
                onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {visibleProducts < filteredProducts.length && (
        <div className="flex justify-center my-4">
          <Link
            to="/collection"
            className="px-6 py-3 bg-gray-200 text-gray-600 font-semibold rounded-md shadow-md hover:bg-gray-300"
          >
            See More
          </Link>
        </div>
      )}

      {/* Product Details Modal */}
      <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={handleCloseModal} />

      <CartModal showModal={showModal} setShowModal={setShowModal} />

      <Footer />

               

    </div>
  );
};

export default HomePage;
