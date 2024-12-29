// import React from 'react'
// import HomePage from './components/Home/HomePage'
// import SignupPage from './components/Signup/SignupPage'
// import LoginPage from './components/Login/LoginPage'
// import SettingPage from './components/Setting/SettingPage'
// import Profile from './components/Profile/Profile'
// import Navbar from './components/Navbar/Navbar'

// import { Route, Routes } from 'react-router-dom'
// export default function App() {
//   return (
//     <div>
//       <Navbar/>


//       <Routes>
//         <Route path='/'  element={<HomePage/> }/>
//         <Route path='/register' element={<SignupPage/>} />
//         <Route path='/login' element={<LoginPage/>} />
//         <Route path='/settings' element={<SettingPage/>} />
//         <Route path='/profile' element={<Profile/>} />
//       </Routes>


//     </div>
//   )
// }


import React, { useEffect } from 'react';
import { createBrowserRouter,  Navigate,  RouterProvider} from 'react-router-dom';

// Import components
import HomePage from './components/Home/HomePage';
import SignupPage from './components/Signup/SignupPage';
import LoginPage from './components/Login/LoginPage';
import SettingPage from './components/Setting/SettingPage';
import Profile from './components/Profile/Profile';

import AuthLayout from './Layout/AuthLayout';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore';
import MainLayout from './components/MainLayout/MainLayout';
import { BaseUrl } from './Constant/BaseUrl';
// import authUserStore  from "./store/useAuthStore.js"
export default function App() {
  const {authUser , checkAuth , isCheckingAuth , onlineUsers}= useAuthStore()
  const {theme}= useThemeStore()
  let routes = createBrowserRouter([
    {path:"/auth/" , element:<AuthLayout/> , children:[
      {path:"register" , element:authUser? <Navigate to="/home"/>:<SignupPage/>},
      {index:true , element:authUser? <Navigate to="/home"/>:<LoginPage/>}, 
      // {path:"register"  , element:<SignupPage/>}, 
      // {index:true , element:<LoginPage/>}, 
      
      
    ]},
    {path:"/" , element:<MainLayout/> , children:[      
      {path:"home" , element:authUser ?<HomePage/> :<LoginPage/>}, 
      {path:"profile" , element: authUser ? <Profile/>: <LoginPage/>}, 
      {path:"settings" , element:<SettingPage/>}, 
      
    ]},
  ])
 useEffect(()=>{checkAuth()},[checkAuth])
 console.log({authUser});
  console.log({onlineUsers});
  

 if (isCheckingAuth && !authUser ) return (
  <div className='flex justify-center items-center min-h-screen' >
    <Loader className='size-10 animate-spin ' />

  </div>
 )
 
  return (
    <div data-theme={theme}>
      
      <RouterProvider router={routes}/>


      <Toaster/>

    </div>
  );
}
