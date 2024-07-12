import React from 'react'
import items from '../items'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteItem } from '../features/itemSlice'
import { getCartTotal, increaseItemQty, decreaseItemQty } from '../features/itemSlice'

const Cart = () => {

    const {cart, totalQuantity, totalPrice} = useSelector(state => state.allCart)

   const dispatch = useDispatch();
   

    let totalGST = 0;
  return (
    <>
    <div className='w-auto mt-5 ml-4 opacity-60 flex gap-3 items-center'>
        <i class="ri-arrow-left-line text-2xl"></i>
        <NavLink 
        to='/'
        className='text-2xl'>Back to Home</NavLink>
    </div>
    <div className='flex w-auto min-h-[10vh] px-8 mt-3 gap-12 items-start'>
            <div className='flex w-full gap-12'>
                <div className={`w-2/3 ${cart.length == 0 ? "bg-[#171617]" : "bg-zinc-800"} py-2 pb-7 rounded-xl px-6`}>
                {cart.length > 0 ? (cart.map(data => (
                    <div
                    key={data.id}
                    className='duration-200 cart w-ful p-3 min-h-[13vh] bg-zinc-200 text-black rounded-xl justify-center mt-4'>
                     <div className='duration-200 min-h-[8vh] w-auto mx-2 rounded flex justify-between gap-3 p-3'>
                         <div className='w-[155px]'>
                             <img src={data.img} className="h-[25vh] w-[13vw] object-cover rounded" />
                         </div>
                         <div className='w-[360px] mx-3 flex flex-col justify-center gap-2'>
                             <p className='text-xl font-medium'>{data.title}</p>
                             <div className='mt-2'>
                             <p className='text-regular font-light tracking-wide my-1'>{data.desciption}</p>
                             <p className='text-regular font-regular'>Price: {data.qty * data.price}</p>
                             <p className='text-regualar font-regular'>Quantity: {data.qty}</p>
                             </div>
                         </div>
                         <div className='w-[155px] flex flex-col items-end justify-between'>
                            <div>
                            <p className='mr-3'>Quantity</p>
                            <div className='flex gap-2 mt-4'>
                                <i
                                onClick={() => {
                                    dispatch(increaseItemQty(data.id))
                                    dispatch(getCartTotal())
                                }}
                                class="hover:bg-gray-500 duration-150 hover:text-white ri-add-line bg-gray-400 p-1 py-[1px] cursor-pointer rounded-lg"></i>
                                <p>{data.qty}</p>
                                <i
                                onClick={() => {
                                    dispatch(decreaseItemQty(data.id))
                                    dispatch(getCartTotal())
                                }}
                                class="hover:bg-gray-500 duration-150 hover:text-white ri-subtract-line bg-gray-400 p-1 py-[1px] cursor-pointer rounded-lg"></i>
                            </div>
                            </div>
                            <i 
                            onClick={() => {
                                dispatch(deleteItem(data.id))
                                dispatch(getCartTotal())
                            }}
                            class="ri-delete-bin-line text-lg bg-red-500 py-1 rounded px-[6px] cursor-pointer hover:text-white duration-200 hover:bg-red-600"></i>
                         </div>
                     </div>
                    </div>
                )))
                : (<div className='w-[150%] flex justify-center items-center h-[53vh] text-3xl'>No items <NavLink className="mx-3 font-sans italic opacity-65 hover:opacity-100 duration-200 ease" to="/">Carry your cart now!</NavLink></div>)
                   
                }
                </div>
                {cart.length > 0 ? (
                         <div className='totaInfos min-w-[25vw] h-[54vh] pt-5 pb-7 bg-white text-black mt-4 rounded-lg'>
                         <div className='flex flex-col px-5 gap-3'>
                             <h1 className='text-center text-2xl py-2'>Summary</h1>
                             <hr />
                             <div className='flex justify-between mx-3'>
                                 <p>Total Quantity: </p>
                                 <span>{totalQuantity}</span>
                             </div>
                             <hr />
                             <div className='flex justify-between mx-3'>
                                 <p>Total Amount: </p>
                                 <span>₹{totalPrice}</span>
                             </div>
                             <div className='flex justify-between mx-3'>
                                 <p>GST(28%): </p>
                                 <span>₹{totalGST = (totalPrice * 28)/100}</span>
                             </div>
                             <hr />
                             <div className='flex justify-between mx-3'>
                                 <p>Grand Total: </p>
                                 <span>₹{totalPrice + totalGST}</span>
                             </div>
                             <button className='mt-7 py-2 bg-blue-600 rounded my-2 text-white cursor-pointer'>GO TO CHECKOUT</button>
                         </div>
                     </div>
                ): (
                    <div className='none'></div>
                )}
            </div>
    </div>
    </>
  )
}

export default Cart