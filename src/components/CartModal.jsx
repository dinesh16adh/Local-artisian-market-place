import React from 'react';
import { Link } from 'react-router-dom';

const CartModal = ({ showModal, setShowModal }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Item Added to Cart</h2>
        <p className="text-gray-700 mb-4">Your item has been successfully added to the cart.</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
          <Link to="/cart">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartModal;