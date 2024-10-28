import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import Cart from './components/Cart';
import Collection from './components/Collection';
import About from './components/AboutUs';
import Contact from './components/Contact';
import Product from './pages/Product';
import Login from './components/Login';
import Signup from './components/SignUp';
import Placeorder from './pages/Placeorder';
import Order from './pages/Order';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFoundPage from './components/NotFoundPage';
import UserProfile from './components/UserProfile';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect function
  useEffect(() => {
    if (location.pathname === '/Local-artisian-market-place') {
      navigate('/');
    }
  }, [location, navigate]);

  // Add item to cart function
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isProductInCart = prevItems.find(item => item._id === product._id);
      if (isProductInCart) {
        return prevItems.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route path="/collection" element={<Collection addToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productid" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/place-order" element={<Placeorder />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/profile" element={<UserProfile />} />
        
        {/* Catch-all route for 404 page */}
        <Route path="*" element={<NotFoundPage />} />        
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
