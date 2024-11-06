import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import CartModal from '../cart/CartModal';
import Newsletterbox from '../other/Newsletterbox';
import ProductSlider from '../products/ProductSlider';
import Ourpolicies from '../details/Ourpolicies';
import TopSales from './TopSales';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5174';

const HomePage = ({ addToCart }) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [userName, setUserName] = useState(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching items or categories:", error);
      } finally {
        setLoading(false);
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

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowModal(true);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.title.toLowerCase().replace(/\s+/g, '-')}/${product.id}`);
  };
  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top after navigating
  };
  const closeNewsletterPopup = () => {
    setShowNewsletterPopup(false);
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

      {/* Top Sales Section */}
      <TopSales addToCart={addToCart} />

      {/* Shop by Category Section */}
      <div className="mt-10 mb-6 px-4 md:px-10">
        <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.slice(0, 6).map((category) => {
            const latestProduct = items.find(item => item.category === category);
            return (
              <div key={category} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">{category}</h3>
                {latestProduct ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <img
                      src={latestProduct.photos[0]?.url || assets.placeholder}
                      alt={latestProduct.title}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                  </div>
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-gray-500">No Products</span>
                  </div>
                )}
                <Link
                  to={`/category/${category}`}
                  className="inline-block mt-3 text-indigo-600 text-sm font-semibold hover:underline"
                >
                  See More
                </Link>
              </div>
            );
          })}
        </div>
        {categories.length > 6 && (
          <div className="flex justify-center mt-4">
            <Link
              to="/collection"
              className="px-4 py-1 bg-indigo-600 text-white rounded-lg shadow-md text-sm hover:bg-indigo-500 transition-colors"
            >
              Explore More Categories
            </Link>
          </div>
        )}
      </div>
      {/* Just for You Section */}
      <div className="px-4 md:px-10">
        <h2 className="text-2xl font-bold mb-4">Just for You</h2>
        {loading ? (
          <div className="flex justify-center my-6">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {items.slice(0, 10).map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                  onClick={() => handleProductClick(product)}
                >
                  <ProductSlider images={product.photos.map(photo => photo.url)} />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <p className="text-gray-800 font-semibold mb-2">Price: ${product.price}</p>
                    
                    {/* Rating Display */}
                    {product.rating && renderStars(product.rating)}
      
                    {/* Stock Display with Conditional Styling */}
                    <p className={`text-sm font-semibold ${product.inStock > 5 ? 'text-green-600' : 'text-red-600'}`}>
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
            {items.length > 10 && (
              <div className="flex justify-center mt-6">
                <Link
                  to="/collection"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md text-sm font-semibold hover:bg-indigo-500 transition-colors"
                >
                  See More Products
                </Link>
              </div>
            )}
          </>
        )}
      </div>
      <Ourpolicies />
      {!showNewsletterPopup && <Newsletterbox mode="inline" />}
      {showModal && <CartModal closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default HomePage;
