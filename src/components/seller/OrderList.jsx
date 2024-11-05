// src/components/seller/OrderList.js
import React from 'react';

const OrderList = ({ orders }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders available</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">{order.customerName}</td>
                <td className="py-2 px-4">${order.totalAmount.toFixed(2)}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === 'pending'
                        ? 'bg-yellow-200 text-yellow-700'
                        : order.status === 'completed'
                        ? 'bg-green-200 text-green-700'
                        : 'bg-red-200 text-red-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <button className="text-blue-600 hover:underline">View</button>
                  {order.status === 'pending' && (
                    <button className="ml-2 text-green-600 hover:underline">Mark as Completed</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
