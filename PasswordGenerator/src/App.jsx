import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [spcharAllowed, setSpcharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  
  const generatePassword = useCallback( () => {
    let string  = ""
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) characters += "1234567890"
    if(spcharAllowed) characters += "!@#$%&.<>?/"

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * characters.length)
      string += characters.charAt(char)
      setPassword(string)

    }
  },[length,numberAllowed,spcharAllowed])

  useEffect(() => {
    generatePassword()  
  },[length,numberAllowed,spcharAllowed,generatePassword])


  const copyPassword = useCallback( () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <div className='flex justify-center'>
      <div className='mt-6 w-[60vw] min-h-[10vh] py-5 bg-zinc-800 rounded-xl flex items-center flex-col'>
        <input 
        readOnly={true}
        value={password}
        ref={passwordRef}
        className='w-[90%] h-8 mt-2 outline-none border-none rounded text-black px-3'
        />
        <button
        className='bg-blue-700 py-2 px-4 rounded mt-3'
        onClick={copyPassword}
        >Copy</button>
        <div className='flex gap-3 justify-start mt-7'>
          <input 
          type="range"
          max={70}
          onChange={(e) => setLength(e.target.value)}
          min={8}
          />
          <label htmlFor="">Length</label>
          <p>{length}</p>

          <input 
          type="checkbox"
          onChange={() =>
            setNumberAllowed((prev) => !prev)
           }
          />
          <label>Number</label>

          <input 
          type="checkbox"
          onChange={() => 
            setSpcharAllowed((prev) => !prev)
          }
          />
          <label>Special Characters</label>
          
        </div>
      </div>
    </div>
  )
}

export default App
