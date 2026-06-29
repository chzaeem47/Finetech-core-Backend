import React, { useEffect, useState } from 'react'
import DashboardNavbar from '../components/dashboardNavbar'
import DashboardBody from '../components/dashboardBody'
import DashboardCard from '../components/dashboardCard'
import { useSelector } from 'react-redux'
import api from '../api/api.js'

const Dashboard = () => {

  const {user} = useSelector((state)=>state.auth)

  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(0)
  const [notificationCount, setNotificationCount] = useState(0)
  const [notificationMessage, setNotificationMessage] = useState("")

  async function getMyAccount(e){

    try{    

      const response = await api.get('/api/accounts/me')
      setAccount(response.data.account)
      setBalance(response.data.balance)

    }catch(error){

      if (error.response?.status === 404) {
      try {
        await api.post('/api/accounts')

        const response = await api.get('/api/accounts/me')

        setAccount(response.data.account)
        setBalance(response.data.balance)

      } catch (createError) {
        console.log("Error while creating account", createError.response?.data || createError.message)
      }

    } else {
      console.log("Error while fetching account", error.response?.data || error.message)
    }
  }

  }

  useEffect(()=>{
    getMyAccount()
  },[])

async function handleTransferSuccess() {
  setNotificationCount(1)
  setNotificationMessage("Transaction completed successfully. Email sent to receiver account")

  await getMyAccount()
}



  return (
    <div className='bg-[url("/dashboard-bg.jpeg")] h-screen w-screen bg-center bg-cover overflow-x-hidden'>

      <DashboardNavbar 
        notificationCount={notificationCount}
        notificationMessage={notificationMessage}
      />

      <DashboardBody 
        user={user}
        account={account}
        onTransferSuccess={handleTransferSuccess}
      />

      <DashboardCard 
        account={account}
        balance={balance}
      />
      
    </div>
  )
}

export default Dashboard
