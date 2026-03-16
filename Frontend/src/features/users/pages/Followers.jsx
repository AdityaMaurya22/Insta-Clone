import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Navbottom from '../../shared/components/Navbottom'
import { useUsers } from '../hooks/useUsers'
import '../style/users.scss'

const Followers = () => {
    const navigate = useNavigate()
    const { users: followers, handleGetFollowers, loading } = useUsers()

    useEffect(() => {
        handleGetFollowers()
    }, [])

    if (loading) {
        return (
            <main>
                <h1>Loading Followers...</h1>
            </main>
        )
    }

    return (
        <main className="users-page">
            <div className="users">
                <h1 style={{ color: '#fff', marginBottom: '1rem' }}>My Followers</h1>
                {followers.length === 0 ? (
                    <p style={{ color: '#fff' }}>No followers yet</p>
                ) : (
                    followers.map((follower) => (
                        <div key={follower._id} className="user-card">
                            <div className="user-img">
                                <div className="image-wrapper">
                                    {follower.profile_image ? <img src={follower.profile_image} alt="" /> : <div className="placeholder">No Image</div>}
                                </div>
                                <h1>{follower.username}</h1>
                            </div>
                            <div className="follow">
                                <button 
                                    onClick={() => navigate(`/profile/${follower.username}`)}
                                    className='button view'
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Navbottom />
        </main>
    )
}

export default Followers