import React, { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { Eye, EyeOff, Loader, Lock, MessageSquare } from 'lucide-react'
import * as Yup from "yup"
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../../Constant/AuthImagePattern'
export default function LoginPage() {
  let [showPassword , setShowPassword] = useState(false)
  let {  isloggingIn , login } = useAuthStore()
    const validationSchema = Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    });
    let {handleBlur ,  handleChange , handleSubmit ,values, errors, touched , isValid , dirty} = useFormik({
      initialValues:{
        email:"",
        password:""
      }, validationSchema,
      onSubmit:(values)=>{
        console.log({values});
         login(values)
        
      }
    })
  return (
    <div>
       <div className='min-h-screen  grid lg:grid-cols-2'>
      <div className='flex justify-center items-center flex-col  p-6 sm:p-12'>
         <div className='w-full max-w-md space-y-8'>
          {/* logo */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10  animate-bounce flex items-center justify-center group-hover:bg-primary/20 transition-colors' >
                  <MessageSquare className='size-6 text-primary ' />
              </div>
              <h1 className='text-2xl font-bold mt-2'> Welcome Back</h1>
              <p className='text-base-content/60'>sign in to your account</p>
            </div>
          </div>

         <form action="" onSubmit={handleSubmit} className='space-y-6'>
          <div className='form-control'>
   


<label htmlFor="" className='label'>
      <span className='label-text font-medium'>Email</span>
    </label>
<label className="input input-bordered flex items-center gap-2 mb-3">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" className="grow" placeholder="Email" name='email' onChange={handleChange} onBlur={handleBlur} />
</label>
{touched.email && errors.email && (

<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span> {errors.email}
</div>
)}

<label htmlFor="" className='label'>
      <span className='label-text font-medium'>Password</span>
    </label>
<label className="input input-bordered flex items-center gap-2 relative mb-3">
  <Lock className='size-4 text-base-content/40'/>
  <input type={showPassword? "text" :"password"} className="grow" placeholder="Password"  onChange={handleChange} onBlur={handleBlur} name='password' />
  <button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center'
  onClick={()=> setShowPassword(!showPassword)}
  >
    {!showPassword?  <Eye  className='size-4 text-base-content/4'/>   :   <EyeOff className='size-4 text-base-content/4'/>}
  </button>
</label>
{touched.password && errors.password &&(
<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span> {errors.password}
</div>

)}
<button className='btn btn-primary w-full my-5' type='submit' disabled={!isValid || !dirty}>
  {isloggingIn? <>
    <Loader className='size-4 animate-spin'/> Loading...
  </>  :"Sign in"}
</button>
          </div>

         </form>

         <div className='text-center'>
          <p className='text-base-content/60 group-hover:text-base-content/100 transition-colors'>
          Don&apos;t have an account? 
          <Link to={"/auth/register"} className='link link-primary'>Create Account </Link>
          </p>
         </div>

         </div>
      </div>

      <AuthImagePattern title={"Join our community"} 
      subtitle={"Connect with friends, share moments, and stay in touch with your loved ones"}/>
    </div>
    </div>
  )
}
