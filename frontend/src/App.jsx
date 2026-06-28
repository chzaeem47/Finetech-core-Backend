import React from 'react'
import Login from './pages/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Singup from './pages/Singup'
import Dashboard from './pages/dashboard'


const App = () => {
  return (
    <div>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Singup/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
    
    </div>
  )
}

export default App
