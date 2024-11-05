import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 md:flex md:gap-8">
        
        {/* Contact Form */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            We’re here to help! Reach out with any questions, feedback, or support needs, and we’ll get back to you as soon as possible.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Your Message"
                className="w-full p-3 h-32 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Contact Us?</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12c0 4.418-3.582 8-8 8S4 16.418 4 12m16 0c0-4.418-3.582-8-8-8M8 12a8.96 8.96 0 001.679 5.032L12 20l2.32-2.968A8.96 8.96 0 0016 12" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">24/7 Support</h3>
                <p className="text-gray-600">
                  We’re here anytime you need us, day or night. Reach out whenever, and we’ll be happy to help.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">7-Day Return Guarantee</h3>
                <p className="text-gray-600">
                  If you’re not satisfied, you have 7 days to return or exchange your product, no questions asked.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m2 7h.01M5 7h.01" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Authentic Products</h3>
                <p className="text-gray-600">
                  We source all our products directly from artisans to ensure authenticity and quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Contact Details */}
      <div className="max-w-5xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Contact Details</h3>
        <div className="flex flex-col md:flex-row justify-between items-center md:space-x-12 text-gray-700">
          <div className="flex flex-col items-center mb-6 md:mb-0">
            <h4 className="text-lg font-semibold">Phone</h4>
            <p>+977-123-456789</p>
          </div>
          <div className="flex flex-col items-center mb-6 md:mb-0">
            <h4 className="text-lg font-semibold">Email</h4>
            <p>support@nepalstore.com</p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold">Location</h4>
            <p>Kathmandu, Nepal</p>
            <a
              href="https://www.google.com/maps?q=Kathmandu,Nepal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline mt-1"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
