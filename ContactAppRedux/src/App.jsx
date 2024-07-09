import { Provider } from 'react-redux'
import contactStore from './Components/contactStore'
import './App.css'
import AddContact from './Components/AddContact'
import Contacts from './Components/Contacts'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {
 

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  ) 
}

export default App
