import React from 'react';
import { Link } from 'react-router-dom';
import ProductSlider from '../products/ProductSlider';

const JustForYou = ({ items = [], loading, handleProductClick, handleAddToCart, renderStars }) => {
  const latestItems = items.slice(0, 9);

  return (
    <div className="px-4 md:px-10 bg-gray-100 py-10 rounded-lg shadow-lg"> {/* Background styling */}
      <h2 className="text-3xl font-bold mb-4 text-left">Just for You</h2>
      {loading ? (
        <div className="flex justify-center my-6">
          <p className="text-gray-600">Loading products...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestItems.map((product) => (
              <div 
                key={product.id} 
                className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                onClick={() => handleProductClick(product)}
              >
                <ProductSlider images={product.photos.map(photo => photo.url)} />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{product.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <p className="text-gray-800 font-semibold mb-2">Price: ${product.price}</p>
                  
                  {/* Rating Display */}
                  {product.rating && renderStars(product.rating)}
        
                  {/* Stock Display with Conditional Styling */}
                  <p className={`text-sm font-semibold ${product.inStock > 5 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock > 5 ? `In Stock: ${product.inStock}` : 'Low Stock'}
                  </p>
        
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                    className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-500 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          {items.length > 9 && (
            <div className="flex justify-center mt-6">
              <Link
                to="/collection"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md text-sm font-semibold hover:bg-indigo-500 transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                See More Products
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JustForYou;
