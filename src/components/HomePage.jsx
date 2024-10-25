import React, { useState } from 'react';
import { assets, products } from '../assets/assets';
import CartModal from './CartModal'; // Import the new CartModal
// import Footer from '../components/Footer'; // Import Footer component
import Hero from './Hero';

const HomePage = ({ addToCart }) => {
  const [visibleProducts, setVisibleProducts] = useState(10); // Initially show 10 products
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false); // State for showing modal

  // Filter products by category
  const filteredProducts = categoryFilter === 'All' 
    ? products 
    : products.filter(product => product.category === categoryFilter);

  // Handle showing more products
  const showMoreProducts = () => {
    setVisibleProducts(prev => prev + 10);
  };

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
    setVisibleProducts(10); // Reset the visible products when category changes
  };

  // Handle adding item to cart and show modal
  const handleAddToCart = (product) => {
    addToCart(product); // Add item to cart
    setShowModal(true); // Show the modal
  };

  // Get unique categories for the filter
  const categories = ['All', ...new Set(products.map(product => product.category))];

  return (
    
    <div>
      <div>
        <Hero/>
      </div>
      {/* Category Filter */}
      <div className="flex justify-center my-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 mx-2 border ${categoryFilter === category ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'} rounded`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10">
        {filteredProducts.slice(0, visibleProducts).map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={product.Image[0]} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="font-bold text-xl mb-2">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-semibold">Price: ${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)} // Show modal on click
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* "See More" Button */}
      {visibleProducts < filteredProducts.length && (
        <div className="flex justify-center my-4">
          <button
            onClick={showMoreProducts}
            className="px-6 py-3 bg-gray-200 text-gray-600 font-semibold rounded-md shadow-md hover:bg-gray-300"
          >
            See More
          </button>
        </div>
      )}

      {/* Cart Modal */}
      <CartModal showModal={showModal} setShowModal={setShowModal} />
               
    </div>
  );
};

export default HomePage;