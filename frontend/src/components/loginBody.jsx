import React, { useState } from "react";
import { Mail, LockKeyhole, UserRound } from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import api from '../api/api.js'
import {setLoading,setUser,setError,setMessage,clearAuthState} from "../features/authSlice";
import { useNavigate } from "react-router-dom";


const LoginBody = ({ mode }) => {

  const isSignup = mode === "signup";

  const dispatch = useDispatch()
  const {message,error,loading} = useSelector((state)=>state.auth)

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const navigate = useNavigate()

  async function handleSubmit(e){

     e.preventDefault();

     dispatch(clearAuthState())
     dispatch(setLoading(true))

     try{
      
        if(isSignup){

          const response = await api.post('/api/auth/register',{

            name:name,
            email:email,
            password:password,

          })

          dispatch(setUser(response.data.user))
          dispatch(setMessage(response.data.message))

        }else{

          const response = await api.post('/api/auth/login',{

            email:email,
            password:password,

          })

          dispatch(setUser(response.data.user))
          dispatch(setMessage(response.data.message))

          navigate("/dashboard")

        }
     }catch(e){
      console.log("Full API Error:", e)
      console.log("Backend Message:", e.response?.data)
        dispatch(
          setError(e.response?.data?.message || "Something Went Wrong!")
        )
     }finally{
        dispatch(setLoading(false))
     }
  }
  return (

    <div className="w-full flex justify-center">
    
      <form className="w-full flex flex-col items-center gap-6" onSubmit={handleSubmit}>

        <div className="w-[440px] ">

        <h1 className="text-white font-serif text-3xl relative bottom-2">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>

        <h3 className="text-gray-400 font-sans mt-1">
          {isSignup 
          ? "Sign Up to create your Account" 
          : "Sign In to continue to your Account"}
        </h3>

        </div>

        {isSignup && (
          <div
            className="
              w-[440px] h-15
              flex items-center gap-3
              px-5
              rounded-full
              bg-white/15
              border border-white/25
              shadow-[inset_0_2px_8px_rgba(0,0,0,0.45)]
              focus-within:border-sky-400
              focus-within:shadow-[0_0_18px_rgba(14,165,233,0.55),inset_0_2px_8px_rgba(0,0,0,0.45)]
              transition-all duration-300
            "
          >
            <UserRound className="text-sky-300" size={24} />

            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e)=> setname(e.target.value)}
              className="
                w-full bg-transparent outline-none
                text-white placeholder:text-slate-300
                text-[18px] font-serif
              "
            />
          </div>
        )}
        
        <div
          className="
            w-[440px] h-15
            flex items-center gap-3
            px-5
            rounded-full
            bg-white/15
            border border-white/25
            shadow-[inset_0_2px_8px_rgba(0,0,0,0.45)]
            focus-within:border-sky-400
            focus-within:shadow-[0_0_18px_rgba(14,165,233,0.55),inset_0_2px_8px_rgba(0,0,0,0.45)]
            transition-all duration-300
          "
        >
          <Mail className="text-sky-300" size={24} />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=> setemail(e.target.value)}
            className="
              w-full bg-transparent outline-none
              text-white placeholder:text-slate-300
              text-[18px] font-serif
            "
          />
        </div>

        <div
          className="
            w-[440px] h-15
            flex items-center gap-3
            px-5
            rounded-full
            bg-white/15
            border border-white/25
            shadow-[inset_0_2px_8px_rgba(0,0,0,0.45)]
            focus-within:border-sky-400
            focus-within:shadow-[0_0_18px_rgba(14,165,233,0.55),inset_0_2px_8px_rgba(0,0,0,0.45)]
            transition-all duration-300
          "
        >
          <LockKeyhole className="text-sky-300" size={24} />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=> setpassword(e.target.value)}
            className="
              w-full bg-transparent outline-none
              text-white placeholder:text-slate-300
              text-[18px] font-serif
            "
          />
        </div>

        {error && (
          <p className="text-red-400 font-serif text-sm">
            {error}
          </p>
        )}

        {message && (
          <p className="text-sky-300 font-serif text-sm">
              {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            w-[440px] h-14 rounded-full
            bg-sky-500
            text-black text-2xl font-serif
            shadow-[0_0_8px_rgba(14,165,233,0.65)]
            hover:bg-sky-400
            hover:shadow-[0_0_28px_rgba(14,165,233,0.9)]
            transition-all duration-300
            disabled:opacity-60
          "
        >
           {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
        </button>

      </form>
    </div>
  );
};

export default LoginBody;