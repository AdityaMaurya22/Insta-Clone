import React, { useContext, useState } from 'react'
import './navbar.scss'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../auth/auth.context'

const Navbar = () => {
    const navigate = useNavigate()
    const { user, handleLogout } = useContext(AuthContext)
    const [showMenu, setShowMenu] = useState(false)

    const handleSignOut = async () => {
        await handleLogout()
        navigate('/login')
    }

    return (
        <nav className='nav-bar'>
            <p>Instagram</p>
            <div className="profile-menu">
                <div 
                    className="profile-image" 
                    onClick={() => setShowMenu(!showMenu)}
                >
                    {user?.profileImage ? (
                        <img src={user.profileImage} alt="Profile" />
                    ) : (
                        <div className="placeholder">P</div>
                    )}
                </div>
                {showMenu && (
                    <div className="dropdown-menu">
                        <button onClick={handleSignOut}>Sign Out</button>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
