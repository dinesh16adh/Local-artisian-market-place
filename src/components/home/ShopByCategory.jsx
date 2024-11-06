import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const ShopByCategory = ({ categories = [], items = [], handleCategoryClick }) => {
  return (
    <div className="mt-10 mb-6 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.slice(0, 6).map((category) => {
          const latestProduct = items.find(item => item.category === category);
          return (
            <div 
              key={category} 
              className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <h3 className="font-semibold text-xl text-gray-700 mb-3">{category}</h3>
              {latestProduct ? (
                <div
                  className="cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                >
                  <img
                    src={latestProduct.photos[0]?.url || assets.placeholder}
                    alt={latestProduct.title}
                    className="w-full h-40 object-cover rounded-lg mb-2 shadow-sm"
                  />
                </div>
              ) : (
                <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-gray-500">No Products</span>
                </div>
              )}
              <Link
                to={`/category/${category}`}
                className="inline-block mt-3 text-indigo-600 font-medium text-sm hover:underline transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                See More
              </Link>
            </div>
          );
        })}
      </div>
      {categories.length > 6 && (
        <div className="flex justify-center mt-6">
          <Link
            to="/collection"
            className="px-6 py-2 bg-indigo-600 text-white rounded-full text-base font-semibold shadow-md hover:bg-indigo-500 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Explore More Categories
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShopByCategory;
