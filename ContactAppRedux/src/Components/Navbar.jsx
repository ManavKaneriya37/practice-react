import React from 'react'
import 'remixicon/fonts/remixicon.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full py-3 bg-gray-900'>
       <div className='flex items-center justify-between'>
        <div className='ml-10 text-white flex items-center'>
        <i class="ri-contacts-book-line mx-3 text-xl"></i>
            <p>ContactApp</p>
         </div>
         <div className='flex items-center mx-6 gap-10 text-regular cursor-pointer text-white'>
            <NavLink to='/'  className={({isActive}) => `${isActive ? 'text-blue-500' : 'text-white'}`}>Add contact</NavLink>
            <NavLink to='/contact-list'  className={({isActive}) => `${isActive ? 'text-blue-500' : 'text-white'}`}>Contacts List</NavLink>
         </div>
       </div>
    </div>
  )
}

export default Navbar