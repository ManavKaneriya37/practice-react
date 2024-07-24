import React from 'react'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'

const Detail = () => {
  const {user, changeBlock} = useChatStore()
  const {currentUser} = useUserStore()


  return (
    <div className='w-[25%] max-w-[25%] p-2 flex flex-col justify-between'>
      <div className=' flex text-center border-b px-3 items-center justify-center min-h-[20vh] flex-col pb-2 gap-1'>
        <img src={user?.avatar || currentUser.avatar} className='object-top w-28 h-28 object-cover rounded-full' />
        <p className='text-xl my-1 w-[80%] break-words'>{user?.name}</p>
        <h4 className='opacity-80 text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing.</h4>
      </div>

      <div className='flex flex-col gap-5 my-4'>
        {/* <button 
        onClick={handleBlock}
        className='bg-red-500  px-3 py-2 rounded mx-2 cursor-pointer hover:bg-red-600  duration-150'>{currentUser.blocked ? "You are blocked" : isReceiverBloacked ? "User Blocked" : "Block User"}</button> */}
      </div>
    </div>
  )
}

export default Detail