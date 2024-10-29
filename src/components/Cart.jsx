import React from 'react';
import Footer from './Footer';

const Cart = ({ cartItems }) => {
  // Group items by id and calculate total quantity and price for each unique item
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.totalPrice += item.price * item.quantity;
    } else {
      acc.push({
        ...item,
        totalPrice: item.price * item.quantity
      });
    }
    return acc;
  }, []);

  // Calculate overall cart total
  const cartTotal = groupedItems.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div className="p-10 min-h-screen flex flex-col justify-between">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>
      {groupedItems.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6">
          {groupedItems.map((item, index) => (
            <div key={index} className="flex items-center bg-white shadow-md rounded-lg p-5">
              <img 
                src={item.photos[0]?.url} 
                alt={item.title} 
                className="w-20 h-20 object-cover rounded-md" 
              />
              <div className="ml-6 flex-grow">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-500">{item.description}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">Price: ${item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-lg font-semibold text-indigo-600">
                  Total: ${item.totalPrice.toFixed(2)}
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
      
      <Footer />
    </div>
  );
};

export default Cart;
