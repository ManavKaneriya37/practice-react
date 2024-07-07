import React, { useState } from 'react'
import { useTodo } from '../Context/todoContext'

function TodoList({todo}) {
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const [isEditable, setIsEditable] = useState(false)

    const {updateTodo, deleteTodo,completedTodo} = useTodo();

    const edittodo = () => {
        updateTodo(todo.id, {...todo, todo: todoMsg})
        setIsEditable(false)
    }
    const toggleCompleted = () => {
        completedTodo(todo.id)
    }

  return (
    <div
    className='relative w-[45vw] h-11 bg-slate-400 my-4 left-[27.5%] rounded-lg flex items-center px-3 text-lg'
    >

        <div className='flex justify-start'>
            <input 
            type="checkbox" 
            className='mx-2'
            checked={todo.completed}
            onChange={toggleCompleted}
            />
            <input 
            type="text"    
            className={`border outline-none w-full bg-transparent rounded-lg ${
                isEditable ? "border-black/10 px-2" : "border-transparent"
            } ${todo.completed ? "line-through" : ""}`}     
            value={todoMsg}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={!isEditable}
            />

        </div>
        <div className='flex gap-2 justify-end w-full'>
            <button 
            onClick={() => {
                if(isEditable){
                    edittodo()
                }
                else{   
                    setIsEditable((prev) => !prev)
                }
            }}
            className='h-8 w-8 bg-white p-[2px] rounded-md cursor-pointer'
            >
                {isEditable ? "✅" : "✏️"}
            </button>

            <button 
            onClick={() => deleteTodo(todo.id)}
            className='h-8 w-8 bg-white p-[2px] rounded-md cursor-pointer'
            >❌
            </button>
        </div>
    </div>
  )
}

export default TodoList