import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PlaceOrder = ({ cartItems, setCartItems }) => {
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if product and quantity are passed from "Buy Now" in ProductPage
  const product = location.state?.product;
  const quantity = location.state?.quantity || 1; // Default to 1 if no quantity is provided

  // Fetch user details from local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Determine items to display in the order summary
  const orderItems = product
    ? [{ ...product, quantity }]
    : cartItems;

  // Total and delivery fee calculations
  const itemsTotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const Shipping_charge = 10;
  const grandTotal = itemsTotal + Shipping_charge;

  // Handle Pay Now button click
  const handlePayNow = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      alert('Proceeding with payment...');
      // Add payment logic here
    }
  };

  const closeModal = () => setShowLoginModal(false);
  const goToLogin = () => {
    closeModal();
    navigate('/login', { state: { redirectAfterLogin: '/place-order', product, quantity } });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-gray-50 shadow-lg rounded-lg space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Place Order</h2>

      {/* Delivery Information Section */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Delivery Information</h3>
        <button
          onClick={() => navigate('/profile')}
          className="text-blue-600 text-sm underline"
        >
          EDIT
        </button>
        <p>{user?.fullName || 'Guest'}</p>
        <p>{user?.email || 'No email provided'}</p>
        <p>{user?.address || 'No address available'}</p>
      </div>

      {/* Cart Totals Section */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Cart Totals</h3>
        {orderItems.map((item, index) => (
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
          <span>Shipping charge</span>
          <span>${Shipping_charge.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-4 text-lg font-bold">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
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
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-500 transition-colors"
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
