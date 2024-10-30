import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Cart from './components/Cart';
import Collection from './components/Collection';
import About from './components/AboutUs';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/SignUp';
import PlaceOrder from './components/PlaceOrder';
import Order from './pages/Order';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFoundPage from './components/NotFoundPage';
import UserProfile from './components/UserProfile';
import ProductPage from './components/ProductPage';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!storedUser);
  }, []);

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
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/collection" element={<Collection addToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
          path="/product/:productName/:productId" 
          element={
            <ProductPage 
              addToCart={addToCart} 
              cartItems={cartItems} 
              setCartItems={setCartItems} 
              isLoggedIn={isLoggedIn} 
            />
          } 
        />        
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/place-order" element={isLoggedIn ? <PlaceOrder cartItems={cartItems} /> : <Navigate to="/login" state={{ redirectTo: '/place-order' }} />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
