import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from './features/contactSlice';
import { NavLink } from 'react-router-dom';
import {useLocalStorage} from 'react-use'

const Contacts = () => {
  let contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState(""); 

  const filteredContacts = contacts.filter(contact => {
    if (!contact.name ||!contact.number) return false;
   
    const nameMatch = contact.name.toLowerCase().includes(searchQuery.toLowerCase());
    const numberMatch = contact.number.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || numberMatch;
  });
  
  return (
    <div className='mt-12'>
      <div className='flex justify-end mr-4 gap-3'>
        <input 
          type="text"
          className='searchContact w-[16vw]'
          placeholder='Search...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-3 mt-7'>
        {filteredContacts && filteredContacts.length > 0 ? (
          filteredContacts.map(contact => (
            <li
              key={contact.id}
              className='contact-slice list-none w-auto py-2 mx-14 bg-gray-600 rounded-xl flex items-center justify-between pl-7'>
              <div className='flex gap-1 flex-col justify-center text-white'>
                <h3>{contact.name}</h3>
                <p>{contact.number}</p>
              </div>
             <div>
              <i
              onClick={() => {
                window.location.href = `tel:${contact.number}`
              }} 
              class="ri-phone-line text-white text-xl mr-7 hover:text-blue-700 hover:bg-white rounded-full p-2 duration-200 cursor-pointer"></i>
                <i 
                onClick={() => {
                  dispatch(removeContact(contact.id))
                }}
                class="ri-delete-bin-3-line text-white text-xl mr-7 hover:text-red-400 hover:bg-white rounded-full p-2 duration-200 cursor-pointer"></i>
             </div>
            </li>
          ))
        ) : (
          <p className='text-center text-gray-500'>No Contacts available</p>
        )}
      </div>
    </div>
  )
}

export default Contacts;