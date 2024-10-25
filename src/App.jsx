import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Cart from './components/Cart';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Login from './pages/Login';
import Placeorder from './pages/Placeorder';
import Order from './pages/Order';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  // Cart state management
  const [cartItems, setCartItems] = useState([]);

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
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productid" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<Placeorder />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;