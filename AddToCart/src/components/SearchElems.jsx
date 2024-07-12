import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/itemSlice';
import { getCartTotal } from '../features/itemSlice';
import Navbar from './Navbar';

const SearchElems = () => {

    const itemsContainer = useSelector(state => state.allCart.items);
    const dispatch = useDispatch()

   

const {itemName} = useParams();
  return (
   <>
   <Navbar />
     <div className='mt-3'>
    <div className='container w-auto min-h-[15vh] py-3 bg-neutral-900 mx-3 rounded-lg '>
      <article className='AllItems flex flex-wrap gap-12 ml-10'>
        {itemsContainer.map(item => item.title === itemName ? (
           <div 
           key={item.id}
           className='item rounded-lg bg-neutral-800 min-h-[43vh] w-[20vw] py-2 px-1 flex relative flex-col'>
             <img src={item.img} className="h-[26vh] w-[18vw] object-cover ml-2 rounded" />
             <div className='py-3 flex flex-col gap-1'>
               <h3 className='text-center'>{item.title}</h3>
               <p className='price text-center'>₹{item.price}</p>
               <button 
               onClick={() => {
                 dispatch(addToCart(item))
                 dispatch(getCartTotal())
               }}
               className='mt-3 py-2 px-1 bg-slate-100 hover:bg-slate-300 duration-100 text-black mx-12 rounded-lg cursor-pointer'>Add to Cart</button>
             </div>
           </div>
        ) : (
            <div></div>
        ) )}
      </article>
    </div>
  </div>
   </>
  )
}

export default SearchElems