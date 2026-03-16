import React from 'react'
import { useNavigate } from "react-router"

const Profile = ({ post, user }) => {

    const navigate = useNavigate()

    return (
        <div className="profile">
            <div className="profile-top">
                <div className="user-data">
                    <div className="image-wrapper">
                        {user?.profileImage ? <img src={user.profileImage} alt="" /> : <div className="placeholder">No Image</div>}
                    </div>
                    <h1>{user?.username}</h1>
                </div>
                <div className="bio-follow">
                    <div className="user-bio">
                        {user?.bio} 
                    </div>
                    <div className="follow">
                        <button onClick={() => navigate('/followers')} className="details-btn">
                            Followers
                        </button>
                    </div>
                </div>
            </div>
            <div className="profile-bottom">
                <div className="post-top">
                    <h1>Posts</h1>
                    <button
                        onClick={() => navigate('/create-post')}
                        className="create-post">Create Post</button>
                </div>
                <div className="posts">
                    {post.map((post) => (
                        <img key={post._id} src={post.imgUrl} alt="" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile