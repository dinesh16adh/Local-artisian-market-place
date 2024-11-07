import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Import trash icon

const Cart = ({ cartItems, setCartItems }) => {
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = 10.00; // Assuming a fixed shipping fee
  const grandTotal = cartTotal + shippingFee;

  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handlePayment = () => {
    if (!user) {
      setShowLoginModal(true); // Show modal if user is not logged in
    } else {
      navigate('/place-order');
    }
  };

  return (
    <div className="p-10 flex flex-col flex-grow justify-between">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6 flex-grow">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center bg-white shadow-md rounded-lg p-5">
              <img 
                src={item.photos[0]?.url} 
                alt={item.title} 
                className="w-20 h-20 object-cover rounded-md" 
              />
              <div className="ml-6 flex-grow">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-500">{item.description}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-lg font-bold text-gray-800">Price: ${item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-2 text-red-600 flex items-center hover:underline"
                >
                  <FaTrash className="text-xl mr-2" /> {/* Trash icon with margin */}
                  Remove
                </button>
                <p className="text-lg font-semibold text-indigo-600 mt-2">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <div className="text-right mt-6 border-t pt-4">
            <div className="flex justify-between text-lg">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Shipping Fee</span>
              <span>${shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-2">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePayment}
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold mt-4 shadow-md hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">You must log in to proceed to payment</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => navigate('/login', { state: { fromCart: true } })}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500 transition-colors"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
