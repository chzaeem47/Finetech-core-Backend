import React from "react";
import { FaPaperPlane, FaUser, FaLock } from "react-icons/fa";

const QuickTransfer = () => {
  return (
    <div
      className="w-145 h-93 bg-[#020817]/90 relative left-[39%] bottom-11 rounded-4xl
      border border-blue-400/40
      backdrop-blur-xl
      shadow-[0_0_10px_rgba(37,99,235,0.35)]"
    >
      <h1 className="text-white text-3xl font-serif relative left-19 top-[22px]">Quick Transfer</h1>

      <FaPaperPlane size={30} className="relative left-8 bottom-3 text-cyan-400" />

      <form className="relative top-3 left-9 w-[88%]">
        
        <h1 className="text-white text-lg font-serif mb-2 relative left-2">Account Number</h1>

        <div className="w-full h-12 flex items-center gap-3 px-4 rounded-xl
            bg-[#0b1733]
            border border-blue-400/25
            focus-within:border-cyan-400
            transition-all duration-300
          ">

          <input type="text" placeholder="Enter Receiver Account Number"
            className="
              w-full bg-transparent outline-none
              text-white placeholder:text-slate-400
              font-serif
            "
          />

          <FaUser className="text-slate-400" />
        </div>

        
        <h1 className="text-white text-lg font-serif mt-5 mb-2 relative bottom-2 left-2">Enter Amount</h1>

        <div
          className="
            w-full h-12 relative bottom-2
            flex items-center gap-3
            px-4
            rounded-xl
            bg-[#0b1733]
            border border-blue-400/25
            focus-within:border-cyan-400
            transition-all duration-300
          "
        >
          <input
            type="text"
            placeholder="Enter Amount"
            className="
              w-full bg-transparent outline-none
              text-white placeholder:text-slate-400
              font-serif
            "
          />

          <span className="text-cyan-400 font-serif font-semibold">Pkr</span>

        </div>

        
        <button
          type="submit"
          className="
            w-full h-12
            mt-6 relative bottom-4
            rounded-xl
            bg-blue-800
            hover:bg-blue-700
            text-white font-serif text-lg
            flex items-center justify-center gap-2
            shadow-[0_0_18px_rgba(37,99,235,0.55)]
            transition-all duration-300
          "
        >
        Send Money
        <FaPaperPlane size={16} />
        </button>

        
        <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 font-serif relative bottom-5">
          <FaLock size={14} />
          <span>Secure and Encrypted</span>
        </div>
      </form>
    </div>
  );
};

export default QuickTransfer;