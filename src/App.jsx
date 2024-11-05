import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import Cart from './components/cart/Cart';
import Collection from './components/collection/Collection';
import About from './components/details/AboutUs';
import Contact from './components/details/Contact';
import Login from './components/login-signup/Login';
import Signup from './components/login-signup/SignUp';
import PlaceOrder from './components/order/PlaceOrder';
import Order from './pages/Order';
import Navbar from './components/footer-navbar/Navbar';
import Footer from './components/footer-navbar/Footer';
import NotFoundPage from './components/home/NotFoundPage';
import UserProfile from './components/userprofile/UserProfile';
import ProductPage from './components/products/ProductPage';
import Chatbot from './components/chatbot/Chatbot';
import SearchResults from './components/other/SearchResults';
import SellerPage from './components/seller/SellerPage';
import SellerOrders from './components/seller/SellerOrders';
import AddProductPage from './components/products/AddProductPage';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]); // To store added products

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

  // Define handleAddProduct to add new products
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
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
        <Route path='/search' element ={<SearchResults />} />
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

        {/* Seller Routes */}
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/seller/orders" element={<SellerOrders />} /> {/* Orders Page for Seller */}
        <Route path="/seller/add-product" element={<AddProductPage onAddProduct={handleAddProduct} />} /> {/* Add Product Page */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;
