import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5174';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/auth/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed. Please try again.');
      }

      const data = await response.json();
      console.log('Signup successful:', data);

      // Show success message and reset form fields
      setShowSuccess(true);
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-600 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Choose a username"
            required
          />
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
            required
          />
          <label className="block text-gray-600 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Create a password"
            required
          />
          <label className="block text-gray-600 mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-gray-700 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Confirm your password"
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-500 text-sm mt-4 text-center">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link>
        </p>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">User created successfully!</h3>
            <p className="text-gray-600 mb-4">Please go to the login page to log in.</p>
            <Link to="/login" className="text-indigo-600 hover:underline font-medium">Go to Login</Link>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
