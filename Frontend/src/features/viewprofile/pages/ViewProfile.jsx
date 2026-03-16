import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Navbottom from '../../shared/components/Navbottom'
import '../../profile/style/profile.scss'
import { useFollow } from '../../follow/hooks/useFollow'
import { getUserProfile } from '../services/viewprofile.api'

const ViewProfile = () => {
    const { username } = useParams()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [isFollowing, setIsFollowing] = useState(false)
    const { handleFollow, handleUnfollow, loading: followLoading, checkFollow } = useFollow()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserProfile(username)
                setUser(data.user)
                setPosts(data.posts || [])

                // Check follow status
                const followStatus = await checkFollow(username)
                setIsFollowing(followStatus)
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [username, checkFollow])

    const handleFollowClick = async () => {
        if (isFollowing) {
            await handleUnfollow(username)
            setIsFollowing(false)
        } else {
            await handleFollow(username)
            setIsFollowing(true)
        }
    }

    if (loading) {
        return (
            <main>
                <h1>Loading Profile...</h1>
            </main>
        )
    }

    if (!user) {
        return (
            <main>
                <h1>User not found</h1>
            </main>
        )
    }

    return (
        <main className="profile-page">
            <div className="profile">
                <div className="profile-top">
                    <div className="user-data">
                        <div className="image-wrapper">
                            {user?.profile_image ? <img src={user.profile_image} alt="" /> : <div className="placeholder">No Image</div>}
                        </div>
                        <h1>{user?.username}</h1>
                    </div>
                    <div className="bio-follow">
                        <div className="user-bio">
                            {user?.bio}
                        </div>
                        <div className="follow">
                            <button
                                onClick={handleFollowClick}
                                disabled={followLoading}
                                className="follow-btn button"
                            >
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                            <button className="details-btn">Follower</button>
                        </div>
                    </div>
                </div>
                <div className="profile-bottom">
                    <div className="post-top">
                        <h1>Posts</h1>
                    </div>
                    <div className="posts">
                        {posts.map((post) => (
                            <img key={post._id} src={post.imgUrl} alt="" />
                        ))}
                    </div>
                </div>
            </div>
            <Navbottom />
        </main>
    )
}

export default ViewProfile