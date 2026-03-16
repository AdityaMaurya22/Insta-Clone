import React from 'react'
import { useNavigate } from 'react-router'
import './navbottom.scss'

const Navbottom = () => {

    const navigate = useNavigate()

  return (
    <nav className='nav-bottom'>
        <i
        onClick={() => navigate("/profile")}
        className="ri-user-line"></i>
        <i onClick={() => navigate("/")} className="ri-home-line"></i>
        <i onClick={() => navigate("/users")} className="ri-group-line"></i>
    </nav>
  )
}

export default Navbottom
