import React, { useState } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const url = 'https://artisan.ashwink.com.np/';

    const userData = {
      email,
      password,
      ...(currentState === 'Sign Up' && { name }),
    };

    try {
      const response = await fetch(url, {
        method: currentState === 'Login' ? 'POST' : 'PUT', // Adjust the method based on login/signup
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      setResponseMessage(result.message || 'Success');
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponseMessage('An error occurred. Please try again.');
    }
  };

  return (
    <form 
      onSubmit={onSubmitHandler} 
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 mb-14 gap-6 text-gray-800 p-6 rounded-lg shadow-lg bg-white"
    >
      <h2 className='text-3xl font-bold mb-4'>{currentState}</h2>
      <hr className='border-none h-[2px] w-full bg-gray-800 mb-4' />

      {currentState === 'Sign Up' && (
        <input 
          type="text" 
          className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500' 
          placeholder='Name' 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />
      )}
      
      <input 
        type="email" 
        className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500' 
        placeholder='Email' 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required 
      />
      <input 
        type="password" 
        className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500' 
        placeholder='Password' 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required 
      />

      <div className='w-full flex justify-between text-sm mt-2'>
        <p className='text-gray-500 cursor-pointer hover:underline'>Forgot your password?</p>
        <p 
          onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')} 
          className='text-gray-500 cursor-pointer hover:underline'
        >
          {currentState === 'Login' ? 'Create account' : 'Login Here'}
        </p>
      </div>

      <button 
        type="submit" 
        className='bg-blue-500 text-white font-semibold px-8 py-2 mt-4 rounded-md transition duration-300 hover:bg-blue-600 hover:shadow-lg'
      >
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>

      {responseMessage && (
        <p className="mt-4 text-center text-gray-700">{responseMessage}</p>
      )}
    </form>
  );
};

export default Login;
