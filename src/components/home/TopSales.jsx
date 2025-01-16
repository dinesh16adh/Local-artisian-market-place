import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductSlider from '../products/ProductSlider';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5174';

const TopSales = ({ addToCart }) => {
  const [topSales, setTopSales] = useState([]);
  const [countdown, setCountdown] = useState(86400); // 24 hours in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopSales = async () => {
      try {
        const response = await fetch(`${backendUrl}product/items`);
        const data = await response.json();
        setTopSales(data.items.slice(0, 5)); // Only get the latest 5 products
      } catch (error) {
        console.error("Error fetching top sales:", error);
      }
    };
    fetchTopSales();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.title.toLowerCase().replace(/\s+/g, '-')}/${product.id}`);
  };

  return (
    <div className="my-8 mx-4 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Top Sales</h2>
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">Offer expires in: <span className="text-red-500">{formatTime(countdown)}</span></p>
          <Link to="/collection" className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors">
            Shop More
          </Link>
        </div>
      </div>
      <p className="text-lg text-red-600 mb-4">Get discount up to 80%</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {topSales.map((product) => (
          <div 
            key={product.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            onClick={() => handleProductClick(product)}
          >
            <ProductSlider images={product.photos.map(photo => photo.url)} />
            <div className="p-3">
              <h3 className="font-bold text-md mb-1">{product.title}</h3>
              <p className="text-gray-800 font-semibold mb-1">Price: ${product.price}</p>
              <p className="text-green-600 text-xs mb-1">Sold: {product.sold || 'N/A'} items</p>
              <p className="text-red-500 text-xs mb-1">Discount: {product.discount || 'N/A'}%</p>
              <button
                onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                className="mt-2 w-full bg-indigo-600 text-white py-1 rounded-lg font-medium hover:bg-indigo-500 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSales;
