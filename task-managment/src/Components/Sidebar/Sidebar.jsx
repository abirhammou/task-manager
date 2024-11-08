import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <h2>Task Management</h2>
        <ul>
            <li><Link to="/tasks/all">All tasks</Link></li>
            <li><Link to="/tasks/important">Important tasks</Link></li>
            <li><Link to="/tasks/incomplete">Incomplete tasks</Link></li>
            <li><Link to="/tasks/complete">Completed tasks</Link></li>
        </ul>
    </div>
  )
}

export default Sidebar