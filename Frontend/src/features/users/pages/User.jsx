import React, {useEffect, useState} from 'react'
import Navbottom from '../../shared/components/Navbottom'
import '../style/users.scss'
import UserCard from '../components/userCard'
import { useUsers } from '../hooks/useUsers'
import { useFollow } from '../../follow/hooks/useFollow'


const User = () => {

  const { loading, users, handleAllUsers } = useUsers()
  const { handleFollow, loading: followLoading, checkFollow, handleUnfollow } = useFollow()
  const [followStatuses, setFollowStatuses] = useState({})

  useEffect(() => {
    handleAllUsers()
    
  }, [])

  useEffect(() => {
    const fetchAllFollowStatuses = async () => {
      const statuses = {}
      for (const user of users) {
        const status = await checkFollow(user.username)
        statuses[user.username] = status
      }
      setFollowStatuses(statuses)
    }
    if (users.length > 0) {
      fetchAllFollowStatuses()
    }
  }, [users])

  const handleFollowClick = async (username) => {
    const isCurrentlyFollowing = followStatuses[username]
    if (isCurrentlyFollowing) {
      await handleUnfollow(username)
      setFollowStatuses(prev => ({ ...prev, [username]: false }))
    } else {
      await handleFollow(username)
      setFollowStatuses(prev => ({ ...prev, [username]: true }))
    }
  }

  if (loading) {
    return (
      <main>
        <h1>Loading Users...</h1>
      </main>
    )
  }


  return (
    <main className="users-page">
      <div className="users">
        {users.map((user)=>{
          return <UserCard 
            key={user.username} 
            users={user} 
            isFollowing={followStatuses[user.username] || false}
            onFollowClick={handleFollowClick}
            followLoading={followLoading}
          />
        })}
      </div>
      <Navbottom />
    </main>
  )
}

export default User
