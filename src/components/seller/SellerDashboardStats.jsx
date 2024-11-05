// src/components/seller/SellerDashboardStats.js
import React from 'react';

const SellerDashboardStats = ({ products, orders }) => {
  const totalProducts = products.length;
  const totalSales = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
      <div className="bg-white shadow-lg rounded-lg p-4 text-center">
        <h3 className="text-lg font-semibold">Total Products</h3>
        <p className="text-2xl font-bold text-indigo-600">{totalProducts}</p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 text-center">
        <h3 className="text-lg font-semibold">Total Sales</h3>
        <p className="text-2xl font-bold text-green-600">${totalSales.toFixed(2)}</p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 text-center">
        <h3 className="text-lg font-semibold">Pending Orders</h3>
        <p className="text-2xl font-bold text-red-600">{pendingOrders}</p>
      </div>
    </div>
  );
};

export default SellerDashboardStats;
