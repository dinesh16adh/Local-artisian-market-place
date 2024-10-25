import React from 'react'
import { assets } from '../assets/assets'
const Ourpolicies = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img src={assets.exchnage_icon} className='w-12 m-auto mb-5' alt=''/>
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>we offer hassle free exchange policy</p>
      </div>

      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt=''/>
        <p className='font-semibold'>1 Week Return Policy</p>
        <p className='text-gray-400'>We provide 1 week free return policy</p>
      </div>

      <div>
        <img src={assets.support_icon} className='w-12 m-auto mb-5' alt=''/>
        <p className='font-semibold'>Best customer support</p>
        <p className='text-gray-400'>we provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default Ourpolicies
