import React from 'react'
import {UserRound} from 'lucide-react'
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";


const LoginFotter = () => {
  return (
    <div className='flex flex-wrap'>
      
    <div className="w-[440px] flex items-center gap-4 my-6">

    <div className="flex-1 h-[1px] bg-white/40 relative left-3"></div>
    <p className="text-white/80 text-sm font-serif whitespace-nowrap relative left-3">Continue with</p>
    <div className="flex-1 h-[1px] bg-white/40 relative left-3"></div>

    </div>

    <div className="
    w-33 h-14
    rounded-4xl
    bg-slate-1000/50
    border border-white/25
    backdrop-blur-xl
    hover:bg-white/25
    hover:shadow-[0_0_25px_rgba(14,165,233,0.45)]
    transition-all duration-300
    flex items-center justify-center gap-1
    cursor-pointer
    text-white
    font-serif mr-3 ml-4
    ">
    <UserRound size={23} className='relative bottom-[1px]'/>
    Username
    </div>

    <div className="
    w-33 h-14
    rounded-4xl
    bg-slate-1000/50
    border border-white/25
    backdrop-blur-xl
    hover:bg-white/25
    hover:shadow-[0_0_25px_rgba(14,165,233,0.45)]
    transition-all duration-300
    flex items-center justify-center gap-1
    cursor-pointer
    text-white
    text-[18px]
    font-serif mr-4
    ">
    <FcGoogle size={30} className='relative right-1 bottom-0.5'/>
    Google
    </div>

    <div className="
    w-33 h-14
    rounded-4xl
    bg-slate-1000/50
    border border-white/25
    backdrop-blur-xl
    hover:bg-white/25
    hover:shadow-[0_0_25px_rgba(14,165,233,0.45)]
    transition-all duration-300
    flex items-center justify-center gap-1
    cursor-pointer
    text-white
    text-[18px]
    font-serif
    ">
    <FaApple size={30} className='relative right-1 bottom-0.5'/>
    Apple
    </div>
  
    </div>
  )
}

export default LoginFotter
