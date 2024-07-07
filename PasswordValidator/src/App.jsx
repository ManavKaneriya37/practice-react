import { useState } from 'react'
import './App.css'
import validator from 'validator'

function App() {
  const [errorMassage, setErrorMassage] = useState('')
  const validatePassword = (value) => {
    if(validator.isStrongPassword(value, 
      {
        minLength: 8,
        minLowercase: 3,
        minUppercase: 2,
        minNumbers: 2,
        minSymbols: 1
      }
    ))
    {
      setErrorMassage("Strong Password")
    }
    else{
      setErrorMassage("Weak Password")  
    }
  }

  return (
    <>
    <h1 className='text-4xl text-center my-5'>Login</h1>
    <div className='w-full flex flex-col items-center justify-center'>
      <form className="flex flex-col">

        <input 
        type="text"
        className='shadow-lg shadow-gray-800/30 bg-slate-200 h-9 outline-none bordder-none px-2 rounded border-blue-400 my-4 w-[21vw]'
        placeholder='Username'
        />
        
        <input 
        className='shadow-gray-800/30 shadow-lg bg-slate-200 h-9 outline-none bordder-none px-2 rounded w-[21vw]'
        type="password"
        onChange={(e) => validatePassword(e.target.value)}
        placeholder='Password'
         />
         {errorMassage === "" ? null : 
          <span
          className={`text-red-600 ${errorMassage.includes("Strong") ? "text-green-700" : ""} text-center mt-1`}
          >
            {errorMassage}
          </span>
         }
      </form>
    </div>
    </>
  )
}

export default App
