import React, { useState } from 'react';

const ProductModal = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});

  if (!isOpen || !product) return null;

  const photos = product.photos || [];
  const hasPhotos = photos.length > 0;

  const handleNextImage = () => {
    if (hasPhotos && photos.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }
  };

  const handlePrevImage = () => {
    if (hasPhotos && photos.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? photos.length - 1 : prevIndex - 1
      );
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = Math.min(Math.max(((e.clientX - left) / width) * 100, 25), 75);
    const y = Math.min(Math.max(((e.clientY - top) / height) * 100, 25), 75);

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2)',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transform: 'scale(1)' });
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg relative mt-24">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-2 text-red-600 text-lg z-20"
        >
          ✕
        </button>

        {/* Image Gallery Slider with Zoom Effect */}
        <div className="relative">
          {hasPhotos ? (
            <img
              src={photos[currentImageIndex].url}
              alt={`${product.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-64 object-cover rounded-md mb-4"
              style={zoomStyle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-md mb-4">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
          {hasPhotos && photos.length > 1 && (
            <div className="absolute inset-0 flex justify-between items-center px-2 z-10">
              <button onClick={handlePrevImage} className="text-gray-700 bg-white bg-opacity-70 rounded-full p-2">‹</button>
              <button onClick={handleNextImage} className="text-gray-700 bg-white bg-opacity-70 rounded-full p-2">›</button>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-500 italic mb-2">{product.description}</p>
        <p className="text-gray-700 mb-2"><strong>Price:</strong> ${product.price}</p>

        {/* Rating Display */}
        {product.rating && renderStars(product.rating)}

        {/* Stock Display with Conditional Styling */}
        <p
          className={`text-sm font-semibold ${product.inStock > 5 ? 'text-green-600' : 'text-red-600'}`}
        >
          {product.inStock > 5 ? `In Stock: ${product.inStock}` : 'Low Stock'}
        </p>

        {/* "See All Images" Grid */}
        {hasPhotos && photos.length > 1 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo.url}
                alt={`${product.title} - Thumbnail ${index + 1}`}
                className="w-full h-20 object-cover cursor-pointer rounded-md"
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}

        {/* Bottom Close Button */}
        <button onClick={onClose} className="mt-6 w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-red-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
