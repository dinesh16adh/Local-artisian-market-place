import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const NotFoundPage = () => {
  return (
    <div className="w-full flex flex-col items-center bg-gray-100 text-center py-10">
      {/* Background and Image */}
      <div
        className="w-full max-w-3xl mx-auto bg-cover bg-center relative rounded-md shadow-lg"
        style={{ backgroundImage: `url(${assets.banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-red-800 to-transparent opacity-80 rounded-md"></div>
        <div className="relative z-10 flex flex-col items-center py-10 px-6">
          <h1 className="text-5xl font-bold text-white mb-4">404</h1>
          <p className="text-2xl text-red-400 font-semibold">
            Page Not Found
          </p>
          <p className="text-lg text-white mt-4 px-6 max-w-md">
            Sorry, the page you are looking for doesn’t exist. Discover our Nepali handicrafts and locally made items from here.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-500 transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
