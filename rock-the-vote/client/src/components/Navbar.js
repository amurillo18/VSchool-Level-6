import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(props){
    const { logout } = props
  return (
    <>
    <div className="navbar">
      <Link to="/profile">Profile</Link>
      <Link to="/issues">Issues</Link>
      <button onClick={logout}>Logout</button>
    </div>
    </>
  )

}

export default Navbar