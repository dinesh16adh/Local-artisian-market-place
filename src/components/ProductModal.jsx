import React, { useState } from 'react';

const ProductModal = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.Image.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.Image.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 text-lg">✕</button>

        {/* Image Gallery Slider */}
        <div className="relative">
          <img 
            src={product.Image[currentImageIndex]} 
            alt={`${product.name} - Image ${currentImageIndex + 1}`} 
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          {product.Image.length > 1 && (
            <div className="absolute inset-0 flex justify-between items-center px-2">
              <button onClick={handlePrevImage} className="text-gray-700 bg-white bg-opacity-70 rounded-full p-2">‹</button>
              <button onClick={handleNextImage} className="text-gray-700 bg-white bg-opacity-70 rounded-full p-2">›</button>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-500 italic mb-2">{product.shortDescription}</p>
        <p className="text-gray-700 mb-2"><strong>Price:</strong> ${product.price}</p>
        <p className="text-gray-700 mb-2"><strong>Origin:</strong> {product.origin}</p>
        <p className="text-gray-700 mb-2"><strong>Materials:</strong> {product.materials}</p>
        <p className="text-gray-700 mb-4">{product.details}</p>

        {/* "See All Images" Grid */}
        {product.Image.length > 1 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {product.Image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} - Thumbnail ${index + 1}`}
                className="w-full h-20 object-cover cursor-pointer rounded-md"
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
