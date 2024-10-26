import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
  
    // Debug log to check if the icon paths are correct
    console.log("Menu Icon Path:", assets.menu_icon);

    return (
      <div className='flex items-center justify-between py-5 font-medium'>
        {/* Wrap logo image with Link to redirect to homepage */}
        <Link to="/">
          <img src={assets.logo} className='w-36 cursor-pointer' alt='Logo' />
        </Link>
        
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'> 
          <NavLink to="/" className='flex flex-col items-center gap-1'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
          </NavLink>

          <NavLink to="/collection" className='flex flex-col items-center gap-1 '>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
          </NavLink>

          <NavLink to="/about" className='flex flex-col items-center gap-1'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
          </NavLink>

          <NavLink to="/contact" className='flex flex-col items-center gap-1'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
          </NavLink>
        </ul>   
        
        <div className='flex items-center gap-6'>
          <img src={assets.search_icon} className="w-5 cursor-pointer" alt="Search" />

          <div className='group relative'>
              <Link to='/login'><img className='w-5 cursor-pointer' src={assets.profile_icon} alt='Profile'/></Link>
              <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                  <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                    <p className='cursor-pointer hover:text-black'>My profile</p>
                    <p className='cursor-pointer hover:text-black'>Orders</p>
                    <p className='cursor-pointer hover:text-black'>Logout</p>
                  </div>
              </div>
          </div>
          
          <Link to='/cart' className='relative'>
             <img src={assets.cart_icon} className='w-5 min-w-5' alt='Cart' />
             <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>1</p>
          </Link>

          {/* Menu Icon for Smaller Screens */}
          <img 
            onClick={() => setVisible(true)} 
            src={assets.menu_icon} 
            className='w-5 cursor-pointer sm:hidden border' // added border to help identify visibility
            alt='Menu' 
          />
        </div>

        {/* Sidebar menu for smaller screens */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
          <div className='flex flex-col text-grey-600'>
              <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                  <img className='h-4 rotate-90' src={assets.dropdown_icon} alt='Back'/>
                  <p>Back</p>
              </div>
              <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
              <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
              <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
              <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
          </div>
        </div>
      </div>
    );
};

export default Navbar;
