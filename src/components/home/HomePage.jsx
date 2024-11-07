import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import CartModal from '../cart/CartModal';
import Newsletterbox from '../other/Newsletterbox';
import ProductSlider from '../products/ProductSlider';
import Ourpolicies from '../details/Ourpolicies';
import TopSales from './TopSales';
import JustForYou from './JustForYou'; 
import ShopByCategory from './ShopByCategory';

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
      <ShopByCategory 
        categories={categories} 
        items={items} 
        handleCategoryClick={handleCategoryClick} 
      />
      {/* Just for You Section */}
      <JustForYou 
        items={items} 
        loading={loading} 
        handleProductClick={handleProductClick} 
        handleAddToCart={handleAddToCart} 
        renderStars={renderStars} 
      />
      <Ourpolicies />
      {!showNewsletterPopup && <Newsletterbox mode="inline" />}
      {showModal && <CartModal closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default HomePage;
