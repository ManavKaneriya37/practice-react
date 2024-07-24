import React, {createRef, useEffect, useRef, useState} from 'react'
import UpperChat from './UpperChat'
import './chat.css'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, getDoc, updateDoc } from 'firebase/firestore'
import uplaod from '../../lib/uplaodImage'
const Chat = () => {

  const endRef = createRef()
  const [chat, setChat] = useState()
  const {chatId} = useChatStore()

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [endRef]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db,"chats", chatId),(res) => {
      setChat(res.data())
    })

    return () => {
      unSub()
    }
  },[chatId])

  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [img, setImg] = useState({
    file: null,
    url: ""
  })
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImg({
      file,
      url: URL.createObjectURL(file)
    });
  }

  const handleEmoji =(e) =>{
    setText(prev => `${prev}${e.emoji}`)
    setOpen(false)
  }

  const {currentUser} = useUserStore()
  const {user} = useChatStore()

  const handleSendMessage = async() => {  
    let imgURL = null
  
    if(img.file){
      imgURL = await uplaod(img.file)
    }
  
    if(text !== "" || imgURL){
      await updateDoc(doc(db,"chats",chatId),{
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          ...(imgURL && {img: imgURL}),
          createdAt: new Date(),
        })
      })
    }
  
    const userIDs = [currentUser.id, user.id]
  
    userIDs.forEach(async(id) => {
      const userChatRef = doc(db,"userchats",id)
      const userChatsSnapshot = await getDoc(userChatRef)
      
      if(userChatsSnapshot.exists()){
        const userChatsData = userChatsSnapshot.data()
  
        const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)
        
        userChatsData.chats[chatIndex].lastMessage = text;
        userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
        userChatsData.chats[chatIndex].updatedAt = Date.now();
        
        await updateDoc(userChatRef,{
          chats: userChatsData.chats,
        })
      }
    })
  
    setImg({
      file: null,
      url: "",
    })
    setText("")
  }


  return (
    <div className='w-[48%] max-w-[48%] border-l border-white/20 border-r p-2 flex flex-col '>
      <UpperChat/>
      <main className='overflow-y-scroll flex flex-col gap-5 flex-1 mt-2 p-1'>
{chat?.messages?.map(message => (
  <div 
    key={message?.createAt}
    className={`${message.senderId === currentUser?.id ? "mine message" : "message"} max-w-[70%] flex flex-col gap-1 justify-center`}>
    <div className='flex gap-2 items-center'>
      {message.img && <img src={message.img || "/src/user.png"} className="min-w-[20vw] min-h-[20vw] object-cover rounded object-top" alt="" />} 
      <p className={`${message.senderId === currentUser?.id ? "bg-blue-700" : "bg-zinc-800"} ${message.img ? "bg-transparent hidden" : `${message.senderId === currentUser?.id ? "bg-blue-700" : "bg-zinc-800"}`}  rounded-xl p-2 text-[15px]`}>{message.text}</p>
    </div> 
    <span className='text-xs ml-10 opacity-65'>{}</span>
  </div>
))}

          {img.url &&   <div 
          // key={message?.createAt}
          className='mine message max-w-[70%] flex flex-col gap-1 justify-center'>
            <div className='flex gap-2 items-center'> 
              <img src={img.url} className="w-[20vw] h-[20vw] object-cover object-top" /> 
              <p className='text-xs'>Click send & wait until sent</p>
            </div> 
          </div> }
        
      <div ref={endRef}></div>
      </main>
      <div className='lower relative flex items-center gap-2 justify-between border-t border-white/30 pt-1'>
        <div className='flex mt-2 gap-4 items-center justify-between w-full'>
          <div className='flex gap-3'>
            <label htmlFor="file">
              <i class="cursor-pointer text-xl ri-image-line"></i>
            </label>
            <input 
            onChange={handleImage}
            type="file" 
            id="file" 
            style={{display:'none'}} />
            <i class="cursor-pointer text-xl ri-camera-line"></i>
            <i class="cursor-pointer text-xl ri-mic-line"></i>
          </div>
          <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text" 
          placeholder='Type a message...' 
          className='w-full rounded-lg bg-[#131313] outline-none p-2' />
          <div className='flex gap-3 relative'>
            <i class=" text-xl ri-emoji-sticker-fill cursor-pointer" onClick={() => setOpen(prev => !prev )}></i>
            <div className='absolute -top-[30em] right-20'>
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
            </div>
            <button
            onClick={handleSendMessage}
            className='bg-zinc-900 cursor-pointer px-3 py-1 rounded '>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat