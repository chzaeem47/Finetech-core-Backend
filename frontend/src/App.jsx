import React from 'react'
import Login from './pages/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Singup from './pages/Singup'
import Dashboard from './pages/dashboard'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  return (
    <div>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Singup/>} />
        <Route 
          path='/dashboard' 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
    
    </div>
  )
}

export default App
