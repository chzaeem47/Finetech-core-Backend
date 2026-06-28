import React from 'react'
import LoginButtons from '../components/loginButtons'
import LoginBody from '../components/loginBody'

const Singup = () => {
  return (
    <div className=' w-screen h-screen bg-cover bg-center bg-[url("/bg-login.jpeg")]
    flex content-center justify-center items-center'>

      
       <LoginButtons mode="signup" />
      

    </div>
  )
}

export default Singup
