import React, { useState } from 'react'
import { IoCopyOutline } from "react-icons/io5";

const DashboardCard = ({account,balance}) => {

  const [copied, setCopied] = useState(false)
  const fullAccountNumber = account?._id || ""

  const hiddenAccountNumber = fullAccountNumber
    ? `•••• •••• •••• ${fullAccountNumber.slice(-5)}`
    : "No Account Found"

  async function handleCopy() {

    try {

      if(!fullAccountNumber){
        return
      }
      await navigator.clipboard.writeText(fullAccountNumber)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1500)

    } catch (error) {
      console.log("Copy Error:", error)
    }
  }

  return (
    <div className='bg-[url("/card-bg.png")] w-145 h-93 bg-cover bg-center relative left-17 top-20 rounded-4xl'>

        <h1 className='text-white font-serif text-2xl relative left-70 top-20'>Current Balance</h1>
        <span className='text-white font-serif font-semibold relative left-70 top-20 text-4xl'>{balance}<span className='text-green-500'> Pkr</span></span>

        
        <h1 className="font-serif text-white text-2xl  mb-2 relative top-28 left-70">Account Number</h1>
        <div className="font-serif text-white text-[22px] tracking-[2px] bg-slate-950/90 w-67 rounded-2xl pl-3
        relative left-68 top-30">{hiddenAccountNumber}</div>
        
        <button type="button" onClick={handleCopy}>
          <IoCopyOutline size={20} className='text-cyan-300 relative left-127 top-[92px]'/>
        </button>

        {copied && (
          <p className='text-cyan-300 font-serif relative left-70 top-25'>
            Copied!
          </p>
        )}
        
    </div>
  )
}

export default DashboardCard
