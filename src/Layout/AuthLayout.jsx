import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div>
       <Navbar/> 
      <Outlet/>
    </div>
  )
}
