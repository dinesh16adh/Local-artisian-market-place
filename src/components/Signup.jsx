import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For redirecting after signup

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const userData = {
      username,
      email,
      password,
    };
   
    try {
      const response = await fetch('https://artisan.ashwink.com.np/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Response status:', response.status);
      
      const textResponse = await response.text(); // Read the response as text
      console.log('Response body:', textResponse); // Log the response body

      // Check if the response is okay
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          // const data = JSON.parse(textResponse); // Attempt to parse JSON
          console.error('Error response:', data);
          throw new Error(data.message || 'Network response was not ok');
        } else {
          // Check for specific SQLite unique constraint error in response body
          if (textResponse.includes('UNIQUE constraint failed: User.email')) {
            throw new Error('Email already exists. Please use a different email address.');
          }
          console.error('Error response:', textResponse);
          throw new Error('Received non-JSON response');
        }
      }

      // If successful, navigate to login
      navigate('/login'); // Redirect to login or any other page

    } catch (error) {
      console.error('Error during signup:', error);
      setError(error.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create an Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
    </div>
  );
};

export default Signup;
