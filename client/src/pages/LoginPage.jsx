import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext)

  const onSubmitHandler = (event)=>{
    event.preventDefault();

    if(currState === 'Sign up' && !isDataSubmitted){
      setIsDataSubmitted(true)
      return;
    }

    login(currState=== "Sign up" ? 'signup' : 'login', {fullName, email, password, bio})
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      {/* -------- left -------- */}
      <img src={assets.chatIcon} alt="" className='w-[min(30vw,250px)]' />

      {/* -------- right -------- */}

      <form onSubmit={onSubmitHandler} className='border-2 bg-white/10 text-black border-black/30 p-6 flex flex-col gap-6 rounded-xl shadow-2xl'>

        <h2 className='font-semibold text-3xl flex justify-between items-center'>
          {currState}
          {isDataSubmitted && (
            <img onClick={()=> setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer hover:rotate-180 transition-all duration-300'/>
          )}
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
           type="text"
           className='p-3 bg-transparent border border-black rounded-md placeholder-black text-black focus:outline-none'
           placeholder="Full Name" required/>
        )}

        {!isDataSubmitted && (
          <>
          <input onChange={(e)=>setEmail(e.target.value)} value={email}
           type="email"
           placeholder='Email Address'
           required
           className='p-3 bg-transparent border border-black rounded-md placeholder-black text-black focus:outline-none'/>

          <input onChange={(e)=>setPassword(e.target.value)} value={password}
           type="password"
           placeholder='Password'
           required
           className='p-3 bg-transparent border border-black rounded-md placeholder-black text-black focus:outline-none'/>
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
           rows={4}
           className='p-3 bg-transparent border border-black rounded-md placeholder-black text-black focus:outline-none'
           placeholder='Provide a short bio...' required></textarea>
        )}

        <button type='submit'
          className={`py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 font-medium text-lg ${
            currState === "Sign up"
            ? 'bg-gradient-to-r from-pink-500 to-orange-400'
            : 'bg-gradient-to-r from-orange-400 to-pink-500'
          } text-white`}>
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className='flex items-center gap-2 text-sm text-black/70'>
          <input type="checkbox" className='accent-black' />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className='flex flex-col gap-2'>
          {currState === "Sign up" ? (
            <p className='text-sm text-black/70'>Already have an account? <span onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}} className='font-medium text-orange-500 cursor-pointer hover:underline'>Login here</span></p>
          ) : (
            <p className='text-sm text-black/70'>Create an account <span onClick={()=> setCurrState("Sign up")} className='font-medium text-orange-500 cursor-pointer hover:underline'>Click here</span></p>
          )}
        </div>

      </form>
    </div>
  )
}

export default LoginPage
