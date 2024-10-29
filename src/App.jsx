import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isProductInCart = prevItems.find(item => item.id === product.id);
      if (isProductInCart) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/Local-artisian-market-place" replace />} />
        <Route path="/Local-artisian-market-place" element={<HomePage addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/collection" element={<Collection addToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productid" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />        
        <Route path="/place-order" element={<Placeorder />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<NotFoundPage />} />        
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
