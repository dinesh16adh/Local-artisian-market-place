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
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-6 md:px-12 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold text-gray-800 capitalize">{category}</h2>
        <button 
          onClick={() => navigate("/collection")}
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          Back to Collection
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center my-8">
          <p className="text-gray-500 text-lg">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 border border-gray-200"
                onClick={() => handleProductClick(product)}
              >
                <ProductSlider images={product.photos.map(photo => photo.url)} />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-700 mb-2">{product.title}</h3>
                  <p className="text-gray-600 font-medium mb-2">Price: ${product.price}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-500 transition duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">No products found in this category.</p>
          )}
        </div>
      )}

      <div className="flex justify-between items-center mt-10">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
            currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'
          }`}
        >
          Previous
        </button>
        <span className="text-gray-600 font-medium">Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastProduct >= products.length}
          className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
            indexOfLastProduct >= products.length ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'
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
