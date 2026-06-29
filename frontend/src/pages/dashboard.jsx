import React from 'react'
import DashboardNavbar from '../components/dashboardNavbar'
import DashboardBody from '../components/dashboardBody'
import DashboardCard from '../components/dashboardCard'

const Dashboard = () => {
  return (
    <div className='bg-[url("/dashboard-bg.jpeg")] h-screen w-screen bg-center bg-cover'>

      <DashboardNavbar />
      <DashboardBody />
      <DashboardCard />
      
    </div>
  )
}

export default Dashboard
