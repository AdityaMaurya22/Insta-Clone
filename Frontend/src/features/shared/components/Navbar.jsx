import React from 'react'
import './navbar.scss'
import {useNavigate} from 'react-router'

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <nav className='nav-bar'>
        <p>Instagram</p>
        <button 
        onClick={()=>{
          navigate("/create-post")
        }}
        className='button'>New Post</button>
    </nav>
  )
}

export default Navbar
