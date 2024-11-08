import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken'); 
    navigate('/'); 
  };


  return (
    <div className='header'>
      <div className='header-content'>
        <button onClick={handleLogout}>
          Logout
          <div class="arrow-wrapper">
            <div class="arrow"></div>

          </div>
        </button>
      </div>
    </div>
  )
}

export default Header