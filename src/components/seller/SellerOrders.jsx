// src/components/seller/SellerOrders.js
import React, { useState, useEffect } from 'react';
import OrderList from './OrderList';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/seller/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching seller orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <OrderList orders={orders} />
    </div>
  );
};

export default SellerOrders;
