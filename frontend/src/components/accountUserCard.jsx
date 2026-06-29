import React, { useState } from "react";
import { FaUserCircle, FaCheckCircle, FaCopy } from "react-icons/fa";

const AccountUserCard = ({ account }) => {

  const [copied, setCopied] = useState(false)

  const fullAccountNumber = account?._id || ""

  const hiddenAccountNumber = fullAccountNumber
    ? `•••• •••• •••• ${fullAccountNumber.slice(-5)}`
    : "No Account"

  async function handleCopy() {
    if (!fullAccountNumber) return

    await navigator.clipboard.writeText(fullAccountNumber)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  return (
    
    <div className="
      w-95 h-72 relative top-8
      rounded-4xl
      bg-[#020817]/90
      border border-cyan-400/30
      backdrop-blur-xl
      shadow-[0_0_18px_rgba(37,99,235,0.35)]
      hover:shadow-[0_0_28px_rgba(34,211,238,0.45)]
      transition-all duration-300
      p-5
      relative
      overflow-hidden
    ">

      <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-cyan-400/10"></div>
      <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-blue-600/10"></div>

      <div className="flex items-center gap-4 relative z-10">
        <FaUserCircle size={62} className="text-cyan-300" />

        <div className="w-60 overflow-hidden">
          <h1 className="text-white text-2xl font-serif truncate">
            {account?.user?.name || account?.userName || "Unknown User"}
          </h1>

          <p className="text-slate-400 font-serif text-sm truncate">
            {account?.user?.email || "No email"}
          </p>
        </div>
      </div>

      <div className="mt-6 relative z-10">
        <p className="text-slate-400 font-serif text-sm">
          Account Number
        </p>

        <div className="mt-2 flex items-center justify-between bg-[#0b1733] rounded-2xl px-4 py-3 border border-blue-400/20">
          <span className="text-white font-serif tracking-[2px]">
            {hiddenAccountNumber}
          </span>

          <button type="button" onClick={handleCopy}>
            <FaCopy className="text-cyan-300 hover:text-cyan-200" />
          </button>
        </div>

        {copied && (
          <p className="text-cyan-300 font-serif text-sm mt-2">
            Full account number copied!
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-400" />
          <span className="text-green-400 font-serif">
            {account?.status || "Active"}
          </span>
        </div>

        <div className="text-right">
          <p className="text-slate-400 text-sm font-serif">Balance</p>
          <h2 className="text-white text-xl font-serif">
            {account?.balance || 0} <span className="text-green-400">Pkr</span>
          </h2>
        </div>
      </div>

    </div>
    
  )
}

export default AccountUserCard