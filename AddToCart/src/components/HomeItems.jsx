import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/itemSlice';
import { getCartTotal } from '../features/itemSlice'

const HomeItems = () => {

  const itemsContainer = useSelector(state => state.allCart)
  const dispatch = useDispatch()

  dispatch(getCartTotal())

  return (
    <div className='mt-3'>
      <div className='container w-auto min-h-[15vh] py-3 bg-neutral-900 mx-3 rounded-lg '>
        <article className='AllItems flex flex-wrap gap-12 ml-10'>

          {itemsContainer.items.map(item =>  (
            <div 
            key={item.id}
            className='item rounded-lg justify-evenly bg-neutral-800 min-h-[43vh] w-[20vw] py-2 px-1 flex relative flex-col'>
              <img src={item.img} className="h-[26vh] w-[18vw] object-cover ml-2 rounded" />
              <div className='py-3 flex flex-col gap-1'>
                <h3 className='text-center'>{item.title}</h3>
                <p className='price text-center'>₹{item.price}</p>
                <p className='text-[12px] text-center font-extralight opacity-85 tracking-wide'>{item.description}</p>
                <button 
                onClick={() => {
                  dispatch(addToCart(item))
                }}
                className='mt-3 py-2 px-1 bg-slate-100 hover:bg-slate-300 duration-100 text-black mx-12 rounded-lg cursor-pointer'>Add to Cart</button>
              </div>
            </div>
          ))}

        </article>
      </div>
    </div>
  );
};

export default HomeItems;