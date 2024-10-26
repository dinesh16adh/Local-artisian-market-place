import React, { useState } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Add form submission logic here
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
          required 
        />
      )}
      
      <input 
        type="email" 
        className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500' 
        placeholder='Email' 
        required 
      />
      <input 
        type="password" 
        className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500' 
        placeholder='Password' 
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
    </form>
  );
};

export default Login;
