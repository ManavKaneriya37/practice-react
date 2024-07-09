import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const ContactLayout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default ContactLayout