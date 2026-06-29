import React from 'react'
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


const DashboardNavbar = () => {
  return (

    <div className='w-[98%] h-20 rounded-3xl bg-[#020b1f]/80 backdrop-blur-xl border border-blue-400/20
    relative top-5 left-4 shadow-[0_0_5px_rgba(255,255,255,255)] flex items-center'>

        <div className='bg-[url("/fintech-logo.png")] w-32 h-35 bg-cover bg-center relative left-3 top-2 rounded-4xl'></div>
        <div className='bg-[url("/fintech-text.png")] w-70 h-11 bg-center bg-cover relative right-8 top-2'></div>


        <div className="relative left-25 flex justify-between items-center gap-20">

            <button className="text-white text-2xl font-serif pb-9 relative top-5">Dashboard</button>
            <span className="absolute bottom-0 left-0 w-30 h-[2px] rounded-full bg-cyan-500 shadow-[0_0_10px_5px_rgba(29,78,216,0.9)]"></span>

            <button className="text-white text-2xl font-serif pb-9 relative top-5">Accounts</button>

            <button className="text-white text-2xl font-serif pb-9 relative top-5">Transactions</button>

            <button className="text-white text-2xl font-serif pb-9 relative top-5">Initial Funds</button>

        </div>

        <div className='w-100 h-20 relative left-38 rounded-3xl flex items-center'>
                <IoIosNotifications size={35} className='text-white'/>
                <FaUserCircle size={50} className='text-white relative left-15'/>
                <h1 className='text-white font-serif text-2xl relative left-18 bottom-[10px]'>Zaeem Ahmad</h1>
                <span className='text-cyan-400 font-serif text-[15px] relative top-[14px] right-20'>Premium</span>
                <MdOutlineKeyboardArrowDown size={30} className='text-gray-400 relative left-4 bottom-2'/>
        </div>

      
    </div>
  )
}

export default DashboardNavbar
