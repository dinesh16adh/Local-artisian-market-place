import React from 'react';
import { FaExchangeAlt, FaRegClock, FaHeadset } from 'react-icons/fa';
import esewaLogo from '../../assets/payments/esewa.png';
import imepayLogo from '../../assets/payments/imepay.png';
import visaLogo from '../../assets/payments/visa.png';
import mastercardLogo from '../../assets/payments/mastercard.png';
import pciPassLogo from '../../assets/payments/pci-pass.png';

const Ourpolicies = () => {
  return (
    <div className="flex flex-col items-center gap-10 py-16 text-center text-gray-700 mx-4 sm:mx-auto max-w-5xl">
      
      {/* Policies Section */}
      <div className="flex flex-col sm:flex-row justify-around w-full gap-10">
        <div className="flex flex-col items-center px-4">
          <FaExchangeAlt className="text-gray-500 w-10 h-10 mb-4" />
          <p className="text-base font-semibold text-gray-800">Easy Exchange Policy</p>
          <p className="text-gray-500 text-sm">Hassle-free exchanges on all items</p>
        </div>

        <div className="flex flex-col items-center px-4">
          <FaRegClock className="text-gray-500 w-10 h-10 mb-4" />
          <p className="text-base font-semibold text-gray-800">1 Week Return Policy</p>
          <p className="text-gray-500 text-sm">Enjoy a full week for returns</p>
        </div>

        <div className="flex flex-col items-center px-4">
          <FaHeadset className="text-gray-500 w-10 h-10 mb-4" />
          <p className="text-base font-semibold text-gray-800">24/7 Customer Support</p>
          <p className="text-gray-500 text-sm">We’re here anytime you need</p>
        </div>
      </div>

      {/* Payments Accepted & Verified Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mt-10">
        {/* Payments Accepted Section */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Payments Accepted</h3>
          <div className="flex gap-6">
            <img src={esewaLogo} alt="eSewa" className="w-12 h-12 object-contain" />
            <img src={imepayLogo} alt="IMEPay" className="w-12 h-12 object-contain" />
            <img src={visaLogo} alt="Visa" className="w-12 h-12 object-contain" />
            <img src={mastercardLogo} alt="Mastercard" className="w-12 h-12 object-contain" />
          </div>
        </div>

        {/* Verified by PCI */}
        <div className="flex flex-col items-center sm:items-start sm:ml-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Verified by</h4>
          <img src={pciPassLogo} alt="PCI Pass" className="w-20 object-contain" />
        </div>
      </div>
      
    </div>
  );
};

export default Ourpolicies;
