import React, { useState } from 'react'
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';
import api from '../api/api.js'



const DashboardNavbar = ({notificationCount,notificationMessage}) => {

  const [openMenu, setOpenMenu] = useState(false)
  const [openNotification, setOpenNotification] = useState(false)

  const {user} = useSelector((state)=>state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  async function handleLogout(){

    try{
      await api.post('/api/auth/logout')

      dispatch(logout())
      navigate('/')

    }catch(error){
        console.log("Logout Error:", error)
    }
  }


  return (

    <div className='w-[98%] h-20 rounded-3xl bg-[#020b1f]/80 backdrop-blur-xl border border-blue-400/20
    relative top-5 left-4 shadow-[0_0_5px_rgba(255,255,255,255)] flex items-center z-[10000]'>

        <div className='bg-[url("/fintech-logo.png")] w-32 h-35 bg-cover bg-center relative left-3 top-2 rounded-4xl'></div>
        <div className='bg-[url("/fintech-text.png")] w-70 h-11 bg-center bg-cover relative right-8 top-2'></div>


    {/*DIV CONTAINS ALL NAVBAR TABS*/}
    <div className="relative left-25 flex items-center gap-20 h-20">

    {/*DASHBOARD TAB*/}
    <div className="relative h-full flex items-center">
    <button type="button" onClick={() => navigate("/dashboard")}
      className={`text-2xl font-serif pb-2 transition-all duration-300 
      ${
      location.pathname === "/dashboard"
          ? "text-cyan-300"
          : "text-white"
      }`}>
      Dashboard
    </button>

    {location.pathname === "/dashboard" && (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-30 h-[2px] rounded-full bg-cyan-500 shadow-[0_0_10px_5px_rgba(29,78,216,0.9)]"></span>
    )}

    </div>

  {/*ACCOUNTS TAB*/}
  <div className="relative h-full flex items-center">
    <button type="button" onClick={() => navigate("/accounts")}
      className={`text-2xl font-serif pb-2 transition-all duration-300 
        ${
        location.pathname === "/accounts"
          ? "text-cyan-300"
          : "text-white"

      }`}>Accounts</button>

    {location.pathname === "/accounts" && (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-30 h-[2px] rounded-full bg-cyan-500 shadow-[0_0_10px_5px_rgba(29,78,216,0.9)]"></span>
    )}
  </div>

  {/*TRANSACTION TAB*/}
  <div className="relative h-full flex items-center">
    <button type="button" onClick={() => navigate("/transactions")}
      className={`text-2xl font-serif pb-2 transition-all duration-300 
        ${
        location.pathname === "/transactions"
          ? "text-cyan-300"
          : "text-white"

      }`}>Transactions</button>

    {location.pathname === "/transactions" && (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-30 h-[2px] rounded-full bg-cyan-500 shadow-[0_0_10px_5px_rgba(29,78,216,0.9)]"></span>
    )}
  </div>

  {/*INITIAL FUND TAB*/}
  <div className="relative h-full flex items-center">
    <button
      type="button"
      className="text-white text-2xl font-serif pb-2"
    >
      Initial Funds
    </button>
  </div>

</div>

        <div className='w-100 h-20 relative left-38 rounded-3xl flex items-center'>

                <button className='relative' onClick={() => setOpenNotification(!openNotification)}>
                <IoIosNotifications size={35} className='text-white'/>
                
                {notificationCount > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>
                {notificationCount}
                </span>
                )}
                </button>

                {openNotification && (
                <div className='absolute top-18 right-90 w-80 bg-[#020817] border border-cyan-400/40 rounded-2xl p-4 z-[20000] shadow-[0_0_15px_rgba(37,99,235,0.5)]'>
                    <p className='text-white font-serif'>
                {notificationMessage || "No new notifications"}
                    </p>
                </div>
                )}

                <div className="relative left-15 w-70 h-16 flex items-center">

  <FaUserCircle size={50} className='text-white shrink-0'/>

  <div className="ml-4 w-43 overflow-hidden">
    <h1 className='text-white font-serif text-2xl truncate'>
      {user?.name || "User"}
    </h1>

    <span className='text-cyan-400 font-serif text-[15px]'>
      Premium
    </span>
  </div>

  <button 
    type="button"
    onClick={() => setOpenMenu(!openMenu)}
    className="absolute right-0 top-4"
  >
    <MdOutlineKeyboardArrowDown size={30} className='text-gray-400'/>
  </button>

</div>

              {openMenu && (
                  <div className='absolute top-14 right-13 w-25 h-10 bg-[#020817] rounded-2xl p-3 z-[20000]
                  shadow-[0_0_10px_rgba(255,0,0,1.0)] flex items-center'>
    
                <button type="button" onClick={handleLogout} 
                className='w-full h-7 rounded-xl bg-red-600 text-white font-serif hover:bg-red-700'>
                Logout
                </button>

              </div>
              )}
                
        </div>

      
    </div>
  )
}

export default DashboardNavbar
