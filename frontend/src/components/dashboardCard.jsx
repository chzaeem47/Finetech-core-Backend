import React from 'react'
import { IoCopyOutline } from "react-icons/io5";

const DashboardCard = () => {
  return (
    <div className='bg-[url("/card-bg.png")] w-145 h-93 bg-cover bg-center relative left-17 top-20 rounded-4xl'>

        <h1 className='text-white font-serif text-2xl relative left-70 top-20'>Current Balance</h1>
        <span className='text-white font-serif font-semibold relative left-70 top-20 text-4xl'>12301<span className='text-green-500'> Pkr</span></span>

        
        <h1 className="font-serif text-white text-2xl    mb-2 relative top-28 left-70">Account Number</h1>
        <div className="font-serif text-white text-[22px] tracking-[2px] bg-slate-950/90 w-65 rounded-2xl pl-3
        relative left-68 top-30">•••• •••• •••• 4521</div>
        
        <button>
        <IoCopyOutline size={20} className='text-cyan-300 relative left-125 top-23'/>
        </button>
        
    </div>
  )
}

export default DashboardCard
