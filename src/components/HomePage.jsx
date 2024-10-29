import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import CartModal from './CartModal';
import ProductModal from './ProductModal';
import Newsletterbox from './Newsletterbox';
import ProductSlider from './ProductSlider';
import Ourpolicies from './Ourpolicies';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5174';

const HomePage = ({ addToCart }) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [userName, setUserName] = useState(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    "Find Nepali local homemade products, arts, and more in one place.",
    "Don’t be a victim of fraud; get authentic, verified products here!",
    "Explore handmade crafts, cultural artifacts, and more from Nepal."
  ];

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
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.fullName) {
      setUserName(storedUser.fullName);
    }

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
    ? items 
    : items.filter(item => item.category === categoryFilter);

  const handleAddToCart = (product) => {
    // Check if item already exists in cart by its id
    setCartItems((prevCartItems) => {
      const existingCartItemIndex = prevCartItems.findIndex((item) => item.id === product.id);
  
      if (existingCartItemIndex >= 0) {
        // If item exists, update its quantity
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingCartItemIndex].quantity += 1;
        return updatedCartItems;
      } else {
        // If item doesn't exist, add it to the cart with initial quantity 1
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  
    // Show cart modal after adding
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

  const limitedCategories = categories.slice(0, 5);
  const hasMoreCategories = categories.length > 5;

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
    <div className="min-h-screen bg-gray-50">
      {userName && (
        <div className="bg-indigo-600 text-white text-center py-3">
          <h2 className="text-xl font-semibold">Welcome Back, {userName}!</h2>
        </div>
      )}

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
            key={product.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            onClick={() => handleProductClick(product)}
          >
            <ProductSlider images={product.photos.map(photo => photo.url)} />
            <div className="p-5">
              <h3 className="font-bold text-xl mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-gray-800 font-semibold mb-2">Price: ${product.price}</p>
              
              {/* Rating Display */}
              {product.rating && renderStars(product.rating)}

              {/* Stock Display with Conditional Styling */}
              <p
                className={`text-sm font-semibold ${product.inStock > 5 ? 'text-green-600' : 'text-red-600'}`}
              >
                {product.inStock > 5 ? `In Stock: ${product.inStock}` : 'Low Stock'}
              </p>

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

      <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={handleCloseModal} />
      <CartModal showModal={showModal} setShowModal={setShowModal} />
      <Ourpolicies />
    </div>
  );
};

export default HomePage;
