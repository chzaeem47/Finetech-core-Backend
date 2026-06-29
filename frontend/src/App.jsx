import React from 'react'
import Login from './pages/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Singup from './pages/Singup'
import Dashboard from './pages/dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Accounts from './pages/accounts'
import Transactions from './pages/transactions'


const App = () => {
  return (
    <div>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Singup/>} />

        <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route path='/accounts' element={
          <ProtectedRoute><Accounts /></ProtectedRoute>
        } />

        <Route path='/transactions' element={
          <ProtectedRoute><Transactions /></ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
    
    </div>
  )
}

export default App
