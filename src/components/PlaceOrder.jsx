import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = ({ cartItems, setCartItems }) => {
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  // Fetch user details from local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Total and delivery fee calculations
  const itemsTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 1.25; // Updated to dollar equivalent
  const grandTotal = itemsTotal + deliveryFee;

  // Handle Pay Now button click
  const handlePayNow = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      alert('Proceeding with payment...');
      // need to addd  payment logic
      // ned to add logic for Update stock, clear cart, etc.
    }
  };

  const closeModal = () => setShowLoginModal(false);
  const goToLogin = () => {
    closeModal();
    navigate('/login');
  };

  return (
    <div className="p-10 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Place Order</h2>
      
      {/* Shipping Address Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Shipping Address</h3>
        <button className="text-blue-600 text-sm underline" onClick={() => navigate('/profile')}>
          EDIT
        </button>
        <p>{user?.fullName || 'Guest'}</p>
        <p>{user?.email || 'No email provided'}</p>
        <p>{user?.address || 'No address available'}</p>
      </div>

      {/* Order Summary */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Order Summary</h3>
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center border-b py-3">
            <span>{item.title} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4 font-bold">
          <span>Items Total</span>
          <span>${itemsTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-4 text-lg font-bold">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Options */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Choose Payment Method</h3>
        <label className="block mb-2">
          <input type="radio" name="payment" value="prepayment" className="mr-2" />
          Prepayment
        </label>
        <label className="block">
          <input type="radio" name="payment" value="cash_on_delivery" className="mr-2" />
          Cash on Delivery
        </label>
      </div>

      {/* Pay Now Button */}
      <button
        onClick={handlePayNow}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-500 transition-colors"
      >
        Pay Now
      </button>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Login Required</h3>
            <p className="text-gray-700 mb-6">You must be logged in to complete the purchase.</p>
            <button
              onClick={goToLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors mb-4"
            >
              Login
            </button>
            <button
              onClick={closeModal}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
