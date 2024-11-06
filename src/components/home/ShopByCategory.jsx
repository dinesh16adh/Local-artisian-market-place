import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const ShopByCategory = ({ categories = [], items = [], handleCategoryClick }) => {
  return (
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
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
