import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { toast } from 'react-toastify'
import { auth, db } from '../lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import uplaod from '../lib/uplaodImage'

const Login = () => {

  const [avatar, setAvatar] = React.useState({
    file: null,
    url: ""
  })

const [loading, setLoading] = React.useState(false)

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    setAvatar({
      file,
      url: URL.createObjectURL(file)
    });
  }

  const handleLogin = async(e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    const { email, password } = Object.fromEntries(formData)

    try {
      await signInWithEmailAndPassword(auth, email, password)

      toast.success("Login Successfully!")
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
    finally{
      setLoading(false)
    }
    
  }
  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)
    const { username, email, password } = Object.fromEntries(formData)
  
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
        const imageURL = await uplaod(avatar.file) 
        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username,
          email,
          avatar: imageURL,
          blocked: [],
        })
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      })
      toast.success("Account created successfully!")
    } catch (error) {
      toast.error(error.message)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className='w-[90vw] flex justify-around items-center'>

      <div className='signin '>
        <h1 className='text-2xl my-6 text-center'>Welcome back,</h1>
        <form onSubmit={handleLogin} className='flex flex-col gap-5 items-center'>
          <input name="email" required className='bg-[#121212] p-2 outline-none rounded w-[20vw]' type="email" placeholder='Email' />
          <input name='password' required className='bg-[#121212] p-2 outline-none rounded w-[20vw]' type="password" placeholder='Password' />
          <button 
          className='px-3 py-1 bg-neutral-800 rounded hover:bg-neutral-900 duration-200 w-28 h-10'
          disabled={loading}
          >{loading ? "Loading..." : "Sign In"}</button>
           <p 
         disabled={loading}
         className='text-xs'
         >{loading ? "Please wait it may take few seconds..." : ""}</p>
        </form>
      </div>
      <div className='saperator h-[90%] w-[1px] bg-white/15'></div>
      <div className='sign up'>
        <h1 className='text-2xl text-center'>Create an account</h1>
       <form
       onSubmit={handleRegister}
       className='flex flex-col gap-5 items-center'>
        <div className='flex items-center justify-center gap-3 ml-16 my-5'>
          <img src={avatar.url} className='h-10 w-10 object-cover rounded-full object-top'/>
          <label htmlFor="avatar" className='text-sm'>Upload an image</label> 
           <input 
           type="file" 
           accept='.jpg, .jpeg, .png'
           className='hidden' 
           onChange={handleAvatar}
           id='avatar'
           name='avatar' />
         </div>
         <input name='username' required className='bg-[#121212] p-2 outline-none rounded w-[20vw]' type="text" placeholder='Username'/>
         <input name='email' required className='bg-[#121212] p-2 outline-none rounded w-[20vw]' type="email" placeholder='Email' />
         <input name='password' required className='bg-[#121212] p-2 outline-none rounded w-[20vw]' type="password" placeholder='Password' />
         <button 
         disabled={loading}
         className='px-3 py-1 bg-neutral-800 rounded hover:bg-neutral-900 duration-200 w-28 h-10'
         >{loading ? "Loading..." : "Sign Up"}</button>
         <p 
         disabled={loading}
         className='text-xs'
         >{loading ? "Please wait it may take few seconds..." : ""}</p>
       </form>

      </div>

    </div>
  )
}

export default Login