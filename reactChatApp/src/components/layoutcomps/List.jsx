import React,{useEffect, useState} from 'react'
import 'remixicon/fonts/remixicon.css'
import './list.css'
import { useUserStore } from '../../lib/userStore'
import { arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'

const List = () => {
  const [addUser, setAddUser] = useState(false)
  const [chats, setChats] = useState([])
  const [user,setUser] = useState(null)
  const [search , setSearch ] = useState("")
  
  const {currentUser} = useUserStore()
  const {changeChat, chatId} = useChatStore()

  const handleAddUser = () => {
    setAddUser(prev => !prev)
    document.querySelector('.addicon').classList.toggle('ri-subtract-line')
  }

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data().chats

      const promises = items.map(async(item) => {
        const userDocRef = doc(db, "users", item.receiverId)
        const userDocSnap = await getDoc(userDocRef)

        const user = userDocSnap.data()

        return {...item, user}

      })

      const chatData = await Promise.all(promises)

      setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt)) 
    })

    return () => {
      unSub()
    }
  },[currentUser.id])


  const handleSearch = async(e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get("username")

    try {
      const userRef = collection(db,"users")
      const q = query(userRef,where("username","==",username))

      const querySnapshot = await getDocs(q)

      if(!querySnapshot.empty){
        setUser(querySnapshot.docs[0].data())
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAdd = async() => {
    const chatRef = collection(db, "chats")
    const userChatsRef = collection(db, "userchats")

    try {

      const newChatRef = doc(chatRef)

      await setDoc(newChatRef,{
        createdAt: serverTimestamp(),
        messages: [],
      })

      await updateDoc(doc(userChatsRef, user.id),{
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        })
      })
      await updateDoc(doc(userChatsRef, currentUser.id),{
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        })
      })
    } catch (error) {
      console.log(error); 
    }
    handleAddUser()
  }

  const handleSelect = async(chat) => {
    
    const userChats = chats.map(item => {
      const {user, ...rest} = item;
      return rest;
    })
    const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId)

    userChats[chatIndex].isSeen = true

    const userChatRef = doc(db,"userchats",currentUser.id)
    try {
      await updateDoc(userChatRef,{
        chats: userChats,
      })
      changeChat(chat.chatId, chat.user)
    } catch (error) {
      console.log(error);
    }

  }

  const filteredUsers = chats.filter(chat =>
     chat.user.username.toLowerCase().includes(search.toLowerCase()) 
  )

  return (
    <div className='w-[27%] relative'>
      {addUser && (
        <div className= "bg-zinc-900 duration-200 ease min-h-[30vh] w-[30vw] py-8 absolute top-1/4 left-[27vw] z-[10] rounded-xl shadow-xl shadow-zinc-200/20">
          <h1 className='text-center text-2xl my-6'>Add new user</h1>
          <form 
          onSubmit={handleSearch}
          className='flex items-center justify-center flex-col'>
            <input 
            name="username" 
            type="text" 
            placeholder='Username' 
            className='bg-zinc-900 border-b border-white/80 outline-none w-[20vw]' />
            <button className='px-9 py-2 bg-slate-800 mt-7 cursor-pointer hover:bg-slate-900 duration-100 ease'>Search</button>
          </form>
          <div className='min-h-10 max-h-[27vh]'>
            {user && 
            <div className='user flex items-center justify-between mx-10 mt-6'>
              <div className='flex gap-2 items-center'>
                <img src={user.avatar || "/src/user.png"} className='object-top h-10 w-10 object-cover rounded-full' />
                <span className='line-clamp-1'>{user.username}</span>
              </div>
              <button
              onClick={handleAdd}
              className='bg-slate-700 rounded p-1 cursor-pointer'>Add User</button>
            </div> 
            }    
          </div>
        </div>
      )}
      <div className="user min-w-[20vw] flex flex-wrap justify-between items-center mx-3 mt-2 p-1 ">

        <div className='flex gap-2 items-center'>
          <img class="w-10 h-10 object-cover rounded-full object-top" src={currentUser.avatar || '/src/user.png'} />
          <h2 className='text-lg font-[400] mx-1 tracking-wide leading-5 line-clamp-1'>{currentUser.username}</h2>
        </div>
        <div className='flex gap-5 items-center flex-wrap '>
          <i class="text-xl ri-more-line "></i>
          <i class="text-xl ri-video-on-fill"></i>
          <i class="text-xl ri-pencil-line"></i>
        </div>

      </div>

        <div className='flex min-w-[20vw] justify-between items-center mx-1 mt-2 p-1'>
          <div className='flex items-center justify-between w-full'>
            <input type="text"  value={search}
            onChange={e => setSearch(e.target.value)} placeholder='Search' className='w-full mx-1 rounded bg-[#161616] outline-none px-2 py-1' />
            <i
            onClick={handleAddUser} 
            class="addicon py-[6px] px-3 cursor-pointer rounded-lg bg-neutral-900 ri-add-line"></i>
          </div>
        </div>

        <div className="chats flex flex-col h-[70vh] min-w-[20vw] ">
          <div className='scrolldiv overflow-y-scroll'>

          {filteredUsers.map(chat => (  
          <div
          key={chat.chatId}
          onClick={() => handleSelect(chat)} 
          style={{backgroundColor: chat?.isSeen ? "transparent" : "#777"}}
           className="cursor-pointer item px-4 py-2 my-[6px] justify-between flex border-b border-stone-100/10 items-center">
            <div className='flex gap-1'>
            <img class="w-10 h-10 object-cover rounded-full object-top" src={chat.user.avatar ||'/src/user.png'} />
              <div className='flex flex-col ml-2'>
                <h1 className='font-[400]'>{chat.user.username}</h1>
                <p className='msg font-light tracking-wide'>{chat.lastMessage}</p>
              </div>
            </div>
            <p className='lasttime text-xs items-end opacity-85 mt-5 hidden'>10.35pm</p>
          </div>
          ))}
          
          </div>
        </div>
    </div>
  )
}

export default List