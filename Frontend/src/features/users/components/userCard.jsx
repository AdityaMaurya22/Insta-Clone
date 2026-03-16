import React from 'react'
import { useNavigate } from 'react-router'

const userCard = ({users, isFollowing, onFollowClick, followLoading}) => {
    const navigate = useNavigate()
    
    return (

        <div className="user-card">
            <div className="user-img">
                <div className="image-wrapper">
                    {users.profile_image ? <img src={users.profile_image} alt="" /> : <div className="placeholder">No Image</div>}
                </div>
                <h1>{users.username}</h1>
            </div>
            <div className="follow">
                <button 
                onClick={() => onFollowClick(users.username)}
                disabled={followLoading}
                className='button follow'>{isFollowing ? 'Unfollow' : 'Follow'}</button>
                <button 
                onClick={() => navigate(`/profile/${users.username}`)}
                className='button view'>View</button>
            </div>
        </div>

    )
}

export default userCard



