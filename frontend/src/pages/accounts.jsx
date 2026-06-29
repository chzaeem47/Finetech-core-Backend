import React, { useEffect, useState } from "react";
import DashboardNavbar from "../components/dashboardNavbar";
import AccountsList from "../components/accountsList";
import api from "../api/api.js";

const Accounts = () => {

  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function fetchAccounts() {
    try {
      setLoading(true)
      setError("")

      const response = await api.get("/api/accounts")

      setAccounts(response.data.accounts)

    } catch (error) {
      console.log("Fetch accounts error:", error.response?.data || error.message)
      setError(error.response?.data?.message || "Failed to fetch accounts")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  return (
    <div className='bg-[url("/dashboard-bg.jpeg")] w-screen bg-center bg-cover overflow-x-hidden pb-20'>

      <DashboardNavbar 
        notificationCount={0}
        notificationMessage=""
      />
    
      <div className="relative top-10 left-10">
        
        <div className="bg-[url('/acounts-bg.png')] w-[95%] h-48 bg-cover bg-center rounded-4xl"></div>

        <div className="mt-6 w-80 h-20 rounded-3xl bg-[#020817]/90 border border-cyan-400/30 flex flex-col justify-center px-6 shadow-[0_0_18px_rgba(37,99,235,0.35)] relative bottom-3 left-2">
          <p className="text-slate-400 font-serif">Total Accounts</p>
          <h2 className="text-white text-3xl font-serif relative bottom-1 left-1">{accounts.length}</h2>
        </div>
      </div>

      {loading && (
        <p className="text-white text-2xl font-serif px-10 mt-10">
          Loading accounts...
        </p>
      )}

      {error && (
        <p className="text-red-400 text-xl font-serif px-10 mt-10">
          {error}
        </p>
      )}

      {!loading && !error && (
        <AccountsList accounts={accounts} />
      )}

    </div>
  )
}

export default Accounts