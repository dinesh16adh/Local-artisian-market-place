import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import Footer from './Footer';

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  // Calculate total price by summing up each item's subtotal
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Increase item quantity
  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease item quantity, and remove if quantity is 1
  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove item if quantity reaches 0
    );
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Handle navigation to payment page
  const handlePayment = () => {
    navigate('/place-order');
  };

  return (
    <div className="p-10 min-h-screen flex flex-col justify-between">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6">
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
                  className="mt-2 text-red-600 hover:underline"
                >
                  Remove
                </button>
                <p className="text-lg font-semibold text-indigo-600 mt-2">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          {/* Display overall cart total */}
          <div className="text-right mt-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Cart Total: ${cartTotal.toFixed(2)}
            </h3>
          </div>
        </div>
      )}

      {/* Pay Now Button */}
      {cartItems.length > 0 && (
        <div className="text-right mt-6">
          <button
            onClick={handlePayment}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-500 transition-colors"
          >
            Pay Now
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;
