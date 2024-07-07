import { useContext, createContext } from "react";

export const todoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "todo msg",
            completed: false,
        }
    ],

    addTodo: (todo) => {},
    updateTodo: (id,todo) => {},
    deleteTodo: (id) => {},
    completedTodo: (id) => {}
})

export const TodoContextProvider = todoContext.Provider;

export const useTodo = () => {
    return useContext(todoContext)
}