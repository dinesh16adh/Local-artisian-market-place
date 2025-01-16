import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5174';

const ProductPage = ({ addToCart, isLoggedIn, cartItems, setCartItems }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showCartConfirmation, setShowCartConfirmation] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${backendUrl}/product/items`);
        const data = await response.json();
        const foundProduct = data.items.find(item => item.id === parseInt(productId));
        setProduct(foundProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (product && product.photos && product.photos.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.photos.length);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [product]);

  const handleAddToCart = () => {
    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity }];
      }
    });

    setShowCartConfirmation(true);
    setTimeout(() => setShowCartConfirmation(false), 2000);
  };

  const handleBuyNow = () => {
    if (isLoggedIn) {
      navigate('/place-order', { state: { product, quantity } });
    } else {
      setShowLoginPrompt(true);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
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

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 p-6 bg-white">
      {/* Image Section */}
      <div className="flex-shrink-0 w-full lg:w-1/2 mb-4 lg:mb-0">
        <div className="relative">
          <img
            src={product.photos[currentImageIndex]?.url}
            alt={product.title}
            className="w-full h-96 object-cover rounded-md"
          />
          <div className="grid grid-cols-3 gap-2 mt-4">
            {product.photos.map((photo, index) => (
              <img
                key={index}
                src={photo.url}
                alt={`${product.title} - ${index + 1}`}
                onClick={() => handleImageClick(index)}
                className={`w-full h-20 object-cover rounded-md cursor-pointer ${
                  index === currentImageIndex ? 'border-2 border-blue-500' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-700 italic mb-2">{product.description}</p>
        <p className="text-gray-700 mb-2"><strong>Price:</strong> ${product.price}</p>

        {/* Rating Display */}
        {product.rating && renderStars(product.rating)}

        {/* Stock Information */}
        <p className={`text-sm font-semibold ${product.inStock > 5 ? 'text-green-600' : 'text-red-600'}`}>
          {product.inStock > 5 ? `In Stock: ${product.inStock}` : 'Low Stock'}
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center mt-4 space-x-4">
          <button onClick={() => handleQuantityChange(-1)} className="px-4 py-2 bg-gray-200 rounded">-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(1)} className="px-4 py-2 bg-gray-200 rounded">+</button>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 mt-4">
          <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
          <button onClick={handleBuyNow} className="bg-green-500 text-white px-4 py-2 rounded">Buy Now</button>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h3 className="text-lg font-bold">Description</h3>
          <p className="text-gray-700 mt-2">{product.longDescription || product.description}</p>
        </div>

        {/* User Ratings and Comments (Placeholder for future implementation) */}
        <div className="mt-8">
          <h3 className="text-lg font-bold">Customer Reviews</h3>
          <p>No reviews yet.</p>
        </div>
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Login Required</h3>
            <p className="text-gray-700 mb-4">You must be logged in to make a purchase.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={() => navigate('/login', { state: { redirectAfterLogin: '/place-order', product, quantity } })}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Confirmation Popup */}
      {showCartConfirmation && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50">
          <p className="text-gray-700">Item added to cart!</p>
        </div>
      )}
    </div>
  );
};

export default ProductPage;