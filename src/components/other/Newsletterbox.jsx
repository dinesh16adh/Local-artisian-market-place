import React, { useEffect, useRef } from 'react';

const Newsletterbox = ({ closeNewsletter, mode = 'popup' }) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (mode === 'inline') {
      const marqueeElement = marqueeRef.current;
      let scrollAmount = 0;
      const scrollSpeed = 1;

      const scrollMarquee = () => {
        scrollAmount += scrollSpeed;
        if (marqueeElement) {
          marqueeElement.scrollLeft = scrollAmount;
          if (scrollAmount >= marqueeElement.scrollWidth / 2) {
            scrollAmount = 0; // Reset to loop the scroll
          }
        }
      };

      const marqueeInterval = setInterval(scrollMarquee, 20);
      return () => clearInterval(marqueeInterval);
    }
  }, [mode]);

  return (
    <>
      {mode === 'popup' ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-8 text-center relative">
            <button
              onClick={closeNewsletter}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subscribe Now & Save 20%</h2>
            <p className="text-gray-500 mb-6">
              Be the first to discover unique artisan products, exclusive deals, and sustainable craftsmanship from local makers. Join our community for updates, inspiration, and your 20% welcome discount!
            </p>
            <form className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <input
                className="w-full sm:flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                type="email"
                placeholder="Enter your email"
                required
              />
              <button
                className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all"
                type="submit"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 w-full py-4 px-6 flex flex-col items-center text-center mt-10 mx-auto rounded-lg shadow-md max-w-full">
          {/* Moving Text */}
          <div
            className="overflow-hidden whitespace-nowrap w-full py-2"
            style={{ display: 'flex', justifyContent: 'center' }}
            ref={marqueeRef}
          >
            <div style={{ whiteSpace: 'nowrap', paddingRight: '100%', fontSize: '1.1rem', fontWeight: '600', color: '#4F46E5' }}>
              Get 20% Off! Join for exclusive deals & latest news
            </div>
            <div style={{ whiteSpace: 'nowrap', paddingRight: '100%', fontSize: '1.1rem', fontWeight: '600', color: '#4F46E5' }}>
              Get 20% Off! Join for exclusive deals & latest news
            </div>
          </div>

          {/* Email Subscription Form */}
          <form className="flex flex-col sm:flex-row items-center gap-2 mt-3 w-full max-w-lg">
            <input
              className="w-full sm:flex-1 px-4 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
              type="email"
              placeholder="Enter your email"
              required
            />
            <button
              className="w-full sm:w-auto px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Newsletterbox;