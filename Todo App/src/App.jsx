import { useEffect, useState } from 'react'
import './App.css'
import { TodoContextProvider } from './Context/todoContext'
import Input from './Components/Input'
import TodoList from './Components/TodoList'
import {useLocalStorage} from 'react-use'
function App() {

  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos"))
  })

  // const [todos, setTodos] = useLocalStorage("todos",)
  
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])
  
  const addTodo = (todo) => {
    setTodos((prev) => 
    [
      {
        id: Date.now(),
        ...todo
      },
      ...prev
    ]
    )
  }

  const updateTodo = (id,todo) => {
    setTodos((prev) => prev.map(prevTodo => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter(prevTodo => prevTodo.id !== id))
  }

  const completedTodo = (id) => {
    setTodos(prev => 
      prev.map(prevTodo => 
        prevTodo.id === id ? {...prevTodo, completed:!prevTodo.completed} : prevTodo)
      )
  }

  return (
    <TodoContextProvider value={{todos, addTodo, updateTodo, deleteTodo, completedTodo}}>
      <div className='flex w-full justify-center mt-5'>
        <Input />
      </div>

      <div className='my-5'>
        {todos.map((todo) => (
        <div 
        key={todo.id}
        className='w-full'
        >
          <TodoList todo={todo}/>
        </div>))}

      </div>
    </TodoContextProvider>
  )
}

export default App
