import React from 'react'
import QuickTransfer from './dashboardQuickTransfer'
import AccountStatus from './dashBoardAccDetail'

const DashboardBody = ({user,account,onTransferSuccess}) => {
  return (
    <div className='bg-[#020b1f]/85 w-[94%] h-60 relative left-13 top-12 rounded-3xl border-2 border
    border border-blue-400/40
    backdrop-blur-xl
    shadow-[0_0_20px_rgba(37,99,235,0.35),inset_0_0_25px_rgba(59,130,246,0.18)]'>
       

    <h1 className='text-white font-serif text-4xl relative top-8 left-10'>Have a Nice Day{" "}
    <span className="text-cyan-400">{user?.name || "User"}</span></h1>

    <span className='text-cyan-400 font-serif text-[20px] relative top-8 left-10'>Welcome to FineTech Banking</span>
    <span className='text-white font-sans relative top-21 right-57'>Here's what happening with your finance today</span>

    <button className="w-38 h-10 rounded-full bg-[#013cbe] text-white border 
    text-[17px] font-serif
    border-white
    shadow-[0_0_15px_rgba(37,99,235,0.5)]
    hover:bg-[#052147]
    hover:shadow-[0_0_20px_rgba(37,99,235,0.8)]
    transition-all duration-300
    relative top-33 right-141">

    Explore Banking</button>

    <div className='bg-[url("/dashboard-side.png")]
    w-200 h-59 bg-cover bg-center relative left-[50%] bottom-20 rounded-3xl
    '></div>

    <QuickTransfer 
      account={account}
      onTransferSuccess={onTransferSuccess}
    />

    <AccountStatus />
      
    </div>
  )
}

export default DashboardBody
