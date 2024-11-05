import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SellerProductForm from '../products/SellerProductForm';
import SellerDashboardStats from '../seller/SellerDashboardStats';
import OrderList from '../seller/OrderList';

const SellerPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const productResponse = await fetch('/api/seller/products');
        const productData = await productResponse.json();
        setProducts(productData);

        const orderResponse = await fetch('/api/seller/orders');
        const orderData = await orderResponse.json();
        setOrders(orderData);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with 'Your Orders' Button */}
      <header className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        <button
          onClick={() => navigate('/seller/orders')}
          className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
        >
          Your Orders
        </button>
      </header>

      {loading ? (
        <div className="flex justify-center py-6">
          <p>Loading seller data...</p>
        </div>
      ) : (
        <div className="p-6 space-y-6">
          {/* Seller Dashboard Stats including Order Count */}
          <SellerDashboardStats products={products} orders={orders} />

          {/* Display Order Count */}
          <div className="bg-white shadow-lg rounded-lg p-4 text-center">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-3xl font-bold text-indigo-600">{orders.length}</p>
          </div>

          {/* Product Management Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Your Products</h2>
            <SellerProductForm />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-40 object-cover" />
                  <h3 className="font-bold text-lg mt-2">{product.title}</h3>
                  <p className="text-gray-600">Price: ${product.price}</p>
                  <Link to={`/product/${product.id}/edit`} className="text-indigo-600 hover:underline mt-2 inline-block">
                    Edit Product
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default SellerPage;
