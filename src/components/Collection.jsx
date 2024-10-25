import React, { useState, useEffect } from 'react';
import { products } from '../assets/assets';
import ProductModal from './ProductModal';
import CartModal from './CartModal';

const Collection = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for modal
  const [showModal, setShowModal] = useState(false); // Show confirmation modal for "Add to Cart"

  // Scroll to the top of the page on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Get unique categories for sidebar
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Handle product click to open modal
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Close the product details modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // Handle adding product to cart and show confirmation modal
  const handleAddToCart = (product, event) => {
    event.stopPropagation(); // Prevent triggering product modal
    addToCart(product);
    setShowModal(true);
  };

  return (
    <div className="flex p-4">
      {/* Sidebar with Categories */}
      <div className="w-1/4 pr-4 hidden md:block">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left p-2 rounded ${selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Product Display */}
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer" onClick={() => handleProductClick(product)}>
            <img src={product.Image[0]} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="font-bold text-xl mb-2">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-semibold">Price: ${product.price}</p>
              <button
                onClick={(e) => handleAddToCart(product, e)}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={handleCloseModal} />

      {/* Cart Confirmation Modal */}
      <CartModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Collection;
