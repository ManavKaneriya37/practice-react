import React from 'react'
import { useChatStore } from '../../lib/chatStore'

const UpperChat = () => {
  const {user} = useChatStore()
  return (
    <div className='upper flex items-center gap-2 justify-between border-b border-white/30 pb-2'>
        <div className='flex gap-4 items-center'>
        <div>
          <img class="w-10 h-10 object-top object-cover rounded-full" src={user?.avatar || '/src/user.png'} />
        </div>
        <div className='flex flex-col my-1'>
          <h1 className='font-[400 text-base'>{user?.username}</h1>
          <p className='text-xs opacity-70'>Lorem ipsum dolor sit emet.</p>
        </div>
        </div>
        <div className='flex gap-6 mx-2'>
        <i class="text-xl cursor-pointer ri-phone-line"></i>
        <i class="text-xl cursor-pointer ri-video-on-line"></i>
        <i class="text-xl cursor-pointer ri-information-fill"></i>
        </div>
      </div>
  )
}

export default UpperChat