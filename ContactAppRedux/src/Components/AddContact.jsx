import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { addContact } from './features/contactSlice'

const AddContact = () => {
    const [name,setName] = React.useState("")
    const [number,setNumber] = React.useState("")
    const [contacts,setContacts] = React.useState([])
    const dispatch = useDispatch();

    const addTheContact = (event) => {
        event.preventDefault();
        setName("")
        setNumber ("")
        dispatch(addContact({name,number}))
    }
  return (
    <form
    onSubmit={addTheContact}
    className='flex items-center justify-center mt-[20vh] flex-col'>
        <h1 className='text-4xl font-normal my-5'>Add Contact</h1>
        <div className='flex flex-col '>
            <input
            type="text" 
            placeholder="Name"
            required
            className='my-2 px-2 border-none outline-none rounded w-[22vw] h-9 bg-slate-100'
            value={name}
            onChange={e => setName(e.target.value)}
            
            />
            <input 
            type="number" 
            placeholder="Phone"
            className='my-2 px-2 border-none outline-none rounded w-[22vw] h-9 bg-slate-100'
            value={number}
            onChange={e => setNumber(e.target.value)}
            />
            <button
            className='ml-9 w-[14vw] h-10 bg-blue-500 rounded-lg text-white mt-3 hover:bg-blue-700 duration-200'
            > Contact</button>
        </div>
    </form>
  )
}

export default AddContact