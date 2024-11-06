// CategoryPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductSlider from '../products/ProductSlider';
import CartModal from '../cart/CartModal';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5174';

const CategoryPage = ({ addToCart }) => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(`${backendUrl}/items`);
        const data = await response.json();
        const categoryProducts = data.items.filter(item => item.category === category);
        setProducts(categoryProducts);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowModal(true);
  };

  const handleProductClick = (product) => {
    const productName = product.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/product/${productName}/${product.id}`);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{category}</h2>
        <button 
          onClick={() => navigate("/collection")}
          className="text-indigo-600 text-sm font-semibold hover:underline"
        >
          Back to Collection
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center my-6">
          <p className="text-gray-600">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                onClick={() => handleProductClick(product)}
              >
                <ProductSlider images={product.photos.map(photo => photo.url)} />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{product.title}</h3>
                  <p className="text-gray-800 font-semibold mb-2">Price: ${product.price}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                    className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-500 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">No products found in this category.</p>
          )}
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500'
          }`}
        >
          Previous
        </button>
        <span className="text-gray-600 font-medium">Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastProduct >= products.length}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            indexOfLastProduct >= products.length ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500'
          }`}
        >
          Next
        </button>
      </div>

      {showModal && <CartModal closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default CategoryPage;
