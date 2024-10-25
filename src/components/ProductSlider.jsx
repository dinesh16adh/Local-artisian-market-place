import React, { useState, useEffect } from 'react';

const ProductSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  // Automatically slide images every 5 seconds if isAutoSliding is true
  useEffect(() => {
    if (!isAutoSliding) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isAutoSliding]);

  // Go to the next image
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsAutoSliding(false); // Stop auto-slide on user interaction
  };

  // Go to the previous image
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setIsAutoSliding(false); // Stop auto-slide on user interaction
  };

  // Show all images in a grid view
  const handleSeeAll = () => {
    setIsAutoSliding(false); // Stop auto-slide
    setShowAllImages(true);
  };

  return (
    <div className="relative">
      <img
        src={images[currentImageIndex]}
        alt="Product"
        className="w-full h-48 object-cover rounded-lg"
      />
      {images.length > 1 && (
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-2">
          <button onClick={handlePrev} className="text-white bg-black bg-opacity-50 rounded-full p-2">
            &lt;
          </button>
          <button onClick={handleNext} className="text-white bg-black bg-opacity-50 rounded-full p-2">
            &gt;
          </button>
        </div>
      )}
      {images.length > 1 && (
        <div className="text-center mt-2">
          <button
            onClick={handleSeeAll}
            className="text-indigo-600 hover:text-indigo-800 text-sm underline"
          >
            See All Images
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductSlider;
