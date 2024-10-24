import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-5 text-center text-sm shadow-inner">
      <p className="font-medium">
        &copy; {currentYear} नेपाली हस्त कला. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;