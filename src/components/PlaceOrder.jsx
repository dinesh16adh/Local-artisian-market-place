import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5174';

const PlaceOrder = ({ cartItems, setCartItems }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // Fetch user details from backend
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${backendUrl}/user`);
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  // Calculate order totals
  const itemsTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 125;
  const orderTotal = itemsTotal + deliveryFee;

  // Simulate backend update for stock management
  const handleBuy = async () => {
    try {
      for (const item of cartItems) {
        await fetch(`${backendUrl}/update-stock`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: item.id, quantity: item.quantity }),
        });
      }
      setCartItems([]);
      navigate('/orders');
    } catch (error) {
      console.error("Failed to update stock:", error);
    }
  };

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8 min-h-screen flex flex-col items-center bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">Place Your Order</h2>

      {/* Shipping Address */}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Shipping Address</h3>
          <button className="text-indigo-600 hover:underline">EDIT</button>
        </div>
        <p className="text-gray-800 mt-4">{userInfo.name} | {userInfo.phone}</p>
        <p className="text-gray-600">{userInfo.address}</p>
        <p className="text-blue-600 mt-2">
          Collect your parcel from the nearest Pick-up Point with a reduced shipping fee.
        </p>
      </div>

      {/* Delivery Options */}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Choose your delivery option</h3>
        <p className="text-gray-700">1 suggested collection point(s) nearby</p>
      </div>

      {/* Order Summary */}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-4 border-b">
            <div className="flex flex-col">
              <span className="font-semibold">{item.title}</span>
              <span className="text-gray-600">{item.color || "Color Family: बहुरंग"}</span>
              <span className="text-gray-600">Qty: {item.quantity}</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-800">Rs. {item.price}</p>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <p className="flex justify-between font-semibold text-gray-700">
            <span>Items Total</span> <span>Rs. {itemsTotal}</span>
          </p>
          <p className="flex justify-between text-gray-700 mt-2">
            <span>Delivery Fee</span> <span>Rs. {deliveryFee}</span>
          </p>
          <p className="flex justify-between text-lg font-bold mt-4">
            <span>Total</span> <span>Rs. {orderTotal}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">All taxes included</p>
        </div>
      </div>

      {/* Promotion Code */}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Promotion</h3>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Enter Store/Daraz Code"
            className="flex-grow px-4 py-2 border rounded-md mr-4"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-500 transition-colors">
            APPLY
          </button>
        </div>
      </div>

      {/* Buy Button */}
      <div className="w-full max-w-2xl">
        <button
          onClick={handleBuy}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-green-500 transition-colors"
        >
          BUY
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
