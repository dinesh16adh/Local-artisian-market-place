import React from 'react';
import { FaExchangeAlt, FaRegClock, FaHeadset } from 'react-icons/fa';

const Ourpolicies = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around items-center gap-10 py-16 text-center text-gray-700 mx-4 sm:mx-auto max-w-5xl">
      
      {/* Easy Exchange Policy */}
      <div className="flex flex-col items-center px-4">
        <FaExchangeAlt className="text-gray-500 w-10 h-10 mb-4" />
        <p className="text-base font-semibold text-gray-800">Easy Exchange Policy</p>
        <p className="text-gray-500 text-sm">Hassle-free exchanges on all items</p>
      </div>

      {/* 1 Week Return Policy */}
      <div className="flex flex-col items-center px-4">
        <FaRegClock className="text-gray-500 w-10 h-10 mb-4" />
        <p className="text-base font-semibold text-gray-800">1 Week Return Policy</p>
        <p className="text-gray-500 text-sm">Enjoy a full week for returns</p>
      </div>

      {/* Customer Support */}
      <div className="flex flex-col items-center px-4">
        <FaHeadset className="text-gray-500 w-10 h-10 mb-4" />
        <p className="text-base font-semibold text-gray-800">24/7 Customer Support</p>
        <p className="text-gray-500 text-sm">We’re here anytime you need</p>
      </div>
      
    </div>
  );
};

export default Ourpolicies;
