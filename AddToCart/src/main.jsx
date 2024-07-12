import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store.js'
import {Provider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Cart from './components/Cart.jsx'
import MainLayout from './MainLayout.jsx'
import HomeItems from './components/HomeItems.jsx'
import SearchElems from './components/SearchElems.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomeItems />,
      },
      {
        path: '/cart',
        element: <Cart />
      },
    ],
  },
  {
    path: "/:itemName",
    element: <SearchElems />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
