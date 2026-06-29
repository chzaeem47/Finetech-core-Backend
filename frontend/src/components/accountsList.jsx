import React from "react";
import AccountUserCard from "./accountUserCard";

const AccountsList = ({ accounts }) => {
  return (
    <div className="w-[95%] h-[339px] mx-auto mt-6 overflow-y-auto overflow-hidden pr-3
    [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      
      <div className="grid grid-cols-4 gap-8">
        {accounts.map((account) => (
          <AccountUserCard 
            key={account._id}
            account={account}
          />
        ))}
      </div>
      
    </div>
  )
}

export default AccountsList