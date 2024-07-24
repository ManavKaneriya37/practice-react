import { useEffect } from 'react'
import './App.css'
import Chat from './components/layoutcomps/Chat'
import Detail from './components/layoutcomps/Detail'
import List from './components/layoutcomps/List'
import Login from './components/Login'
import Notification from './components/notification/Notification'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore'
import { useChatStore } from './lib/chatStore'

function App() {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth,(user)=> {
      fetchUserInfo(user?.uid)
    })

    return () => {
      unSub();
    }
  },[fetchUserInfo])

  const {chatId} = useChatStore()


  if(isLoading) return <div className='p-12 px-56 text-2xl rounded-2xl bg-zinc-800/95'>Loading...</div>

  return (
    <>
    <div className='container rounded-xl'>
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat/>}
          {chatId && <Detail />}
          <button 
            onClick={() => auth.signOut()}
            className='bg-blue-500 px-3 h-12 absolute bottom-0 -right-24 py-2 rounded mx-2 cursor-pointer hover:bg-blue-700 duration-500 ease-in-out '>Log Out</button>
        </>
      ) : (
        <>
        <Login />
        </>
      )}
      <Notification />
    </div>
    </>
  )
}

export default App
