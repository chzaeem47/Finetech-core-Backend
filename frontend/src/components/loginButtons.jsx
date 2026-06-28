import React from 'react'
import { LockKeyhole, UserRound } from 'lucide-react'
import LoginBody from './loginBody'
import { useNavigate } from 'react-router-dom'
import LoginFotter from './loginFotter'

const LoginButtons = ({ mode }) => {
  const navigate = useNavigate()

  const isLogin = mode === 'login'
  const isSignup = mode === 'signup'
  
  function handleLoginClick() {
    navigate('/')
  }

  function handleSingupClick() {
    navigate('/signup')
  }

  return (
    <div className='w-[90%] max-w-[540px] min-h-[640px]
      rounded-[34px]
      border border-sky-300/25
      bg-slate-950/60
      backdrop-blur-2xl
      shadow-[0_0_10px_rgba(255,255,255,255),0_25px_90px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.18)]
      px-8 py-10'
    >

      <button
        type='button'
        onClick={handleLoginClick}
        className={`
          w-55 h-12 rounded-4xl
          mr-8
          font-serif
          text-2xl
          shadow-inner shadow-black
          flex justify-center items-center gap-2
          transition-all duration-300
          ${
            isLogin
              ? 'bg-sky-500 text-black shadow-[0_0_10px_rgba(14,165,233,0.75)]'
              : 'bg-transparent text-gray-300 hover:bg-white/10'
          }
        `}
      >
        <LockKeyhole size={22} />
        Login
      </button>

      <button
        type='button'
        onClick={handleSingupClick}
        className={`
          w-55 h-12 rounded-4xl
          font-serif
          text-2xl
          shadow-inner shadow-black
          flex justify-center items-center gap-2
          relative bottom-12 left-62
          transition-all duration-300
          ${
            isSignup
              ? 'bg-sky-500 text-black shadow-[0_0_10px_rgba(14,165,233,0.75)]'
              : 'bg-transparent text-gray-300 hover:bg-white/10'
          }
        `}
      >
        <UserRound size={22} />
        Sign Up
      </button>

      <LoginBody mode={mode} />
      <LoginFotter />

    </div>
  )
}

export default LoginButtons