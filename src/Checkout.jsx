import React, { useState } from 'react';

const Checkout = () => {
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to Cash on Delivery
  const cartTotal = 38.00; // Example cart subtotal
  const shippingFee = 10.00;
  const grandTotal = cartTotal + shippingFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleOrderSubmit = () => {
    // Submit the order details (deliveryInfo and paymentMethod) to the backend
    alert(`Order placed with payment method: ${paymentMethod}`);
  };

  return (
    <div className="checkout-container p-10 flex justify-between">
      <div className="delivery-info w-1/2 pr-10">
        <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
        <form className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={deliveryInfo.firstName}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={deliveryInfo.lastName}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={deliveryInfo.email}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={deliveryInfo.street}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={deliveryInfo.city}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={deliveryInfo.state}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="zipcode"
              placeholder="Zipcode"
              value={deliveryInfo.zipcode}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={deliveryInfo.country}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={deliveryInfo.phone}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </form>
      </div>

      <div className="cart-totals w-1/3">
        <h2 className="text-2xl font-bold mb-4">Cart Totals</h2>
        <div className="border-b pb-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping Fee</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold my-4">Payment Method</h2>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethod === 'Stripe'}
              onChange={() => handlePaymentMethodChange('Stripe')}
              className="mr-2"
            />
            <span>Stripe</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="Razorpay"
              checked={paymentMethod === 'Razorpay'}
              onChange={() => handlePaymentMethodChange('Razorpay')}
              className="mr-2"
            />
            <span>Razorpay</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === 'COD'}
              onChange={() => handlePaymentMethodChange('COD')}
              className="mr-2"
            />
            <span>Cash on Delivery</span>
          </label>
        </div>

        <button
          onClick={handleOrderSubmit}
          className="bg-black text-white w-full py-3 mt-6 font-semibold rounded-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
