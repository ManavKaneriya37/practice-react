import React, { useState } from 'react'
import { useTodo } from '../Context/todoContext'

function Input() {
  const [todo, setTodo ] = useState("")
  const [isValid, setIsValid] = useState(false)
  const {addTodo} = useTodo()

  const add = (e) => {

    e.preventDefault()

    if(!todo) return;

    addTodo({todo});
    setTodo("");
    setIsValid(false)
  }
  return (
    <div>
      <h1 className='text-white text-4xl font-bold uppercase text-center mb-6'>Create Your Todos!</h1>
    <form 
    onSubmit={add}
    className='flex items-center'>
        <input 
        type="text" 
        className='h-9 w-[40vw] outline-none border-none px-2 rounded'
        value={todo}
        onChange={(e) => {
          if(todo.length > 0){
            setIsValid(true)
          }
          setTodo(e.target.value)
        }}
        />
        <button 
        type='submit'
        className={`text-white px-3 py-2 ml-3 bg-red-500 ${isValid ? "bg-red-500": "opacity-20 cursor-not-allowed" } rounded-md cursor-pointer`}

        >
        Add
        </button>
    </form>
    </div>
  )
}

export default Input