import React from 'react';
import Footer from './Footer'; // Import Footer component

const Cart = ({ cartItems }) => {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-white p-5 shadow-lg rounded-lg">
              <div className="flex items-center">
                <img src={item.Image[0]} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="ml-4">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}      
    </div>
  );
};

export default Cart;
