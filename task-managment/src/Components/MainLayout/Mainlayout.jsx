import React from 'react'
import './Mainlayout.css'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

const Mainlayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="main">
          <Outlet /> 
        </div>
      </div>
    </div>
  )
}

export default Mainlayout