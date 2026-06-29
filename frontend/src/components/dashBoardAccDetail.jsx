import React from "react";
import { FaShieldAlt, FaCheck, FaCheckCircle, FaClock } from "react-icons/fa";

const AccountStatus = () => {
  return (
    <div
      className="
        w-90 h-93
        bg-[#020817]/90
        relative left-[77%] bottom-104
        rounded-4xl
        border border-blue-400/40
        backdrop-blur-xl
        shadow-[0_0_12px_rgba(37,99,235,0.35)]
      "
    >
      
    <FaShieldAlt size={28} className="text-cyan-300 relative top-4 left-5" />
    
    <h1 className="text-white text-2xl font-serif  absolute left-14 top-[13px]">Account Status</h1>

    <div className='bg-[url("/secure-logo.png")] w-30 h-30 bg-cover bg-center rounded-full relative top-10 left-4'></div>
     
      

        <p className="text-white font-serif relative left-36 bottom-14 w-29">Your account is</p>

        <h1 className="text-cyan-300 text-2xl font-serif font-semibold mt-1 relative left-36 bottom-13">Secure & Active</h1>

        <div className="h-30 w-80 relative left-7 bottom-5">

            <FaCheckCircle className="text-cyan-300 relative top-[15px]" />
            <span className="font-serif text-white text-[19px] relative left-6 bottom-2">Identity Verified</span>

            <FaCheckCircle className="text-cyan-300 relative top-2" />
            <span className="font-serif text-blue-400 text-[19px] relative left-6 bottom-[14px]">Two-Factor Auth Enabled</span>

            <FaCheckCircle className="text-cyan-300 relative top-[3px] left-[1px]" />
            <span className="text-white font-serif text-[19px] relative bottom-[18px] left-[26px]">No Suspicious Activity</span>

        </div>
          

      
     
      <div className="absolute left-8 bottom-8 flex items-center gap-3 font-serif">
        <FaClock className="text-blue-400" />
        <p className="text-slate-300">
          Last login:
          <span className="text-blue-400 ml-2">
            May 20, 2025, 09:12 AM
          </span>
        </p>
      </div>
    </div>
  );
};

export default AccountStatus;