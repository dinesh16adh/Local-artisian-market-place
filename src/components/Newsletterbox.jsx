import React from 'react'

const Newsletterbox = () => {
  return (
    <div className='text-center'>
        <p className=''>Subscribe now and get 20% off</p>
        <p className='text-gray-400 mt-3'>
        Be the first to discover unique artisan products, exclusive deals, and sustainable craftsmanship from local makers. Join our community for updates, inspiration, and your 20% welcome discount!
        </p>
        <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Enter your email' required/>
            <button className='bg-red-500 text-white text-xs px-10 py-4' type='submit'>SUBSCRIBE</button>

        </form>
         
    </div>
  )
}

export default Newsletterbox
