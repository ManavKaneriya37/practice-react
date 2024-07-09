import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ContactLayout from './Components/ContactLayout.jsx'
import AddContact from './Components/AddContact.jsx'
import Contacts from './Components/Contacts.jsx'
import { Provider } from 'react-redux'
import contactStore from './Components/contactStore.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ContactLayout />,
    children: [
      {
        path: '/',
        element: <AddContact />
      },
      {
        path: '/contact-list',
        element: <Contacts />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={contactStore}>
    <RouterProvider router={router}/>
  </Provider>,
)
