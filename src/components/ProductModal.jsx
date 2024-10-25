import React from 'react';

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 text-lg">✕</button>
        <img src={product.Image[0]} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-500 italic mb-2">{product.shortDescription}</p> {/* Short description */}
        <p className="text-gray-700 mb-2"><strong>Price:</strong> ${product.price}</p>
        <p className="text-gray-700 mb-2"><strong>Origin:</strong> {product.origin}</p>
        <p className="text-gray-700 mb-2"><strong>Materials:</strong> {product.materials}</p>
        <p className="text-gray-700 mb-2">{product.details}</p>
      </div>
    </div>
  );
};

export default ProductModal;
