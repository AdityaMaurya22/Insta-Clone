import {userFollow, checkFollowStatus, userUnfollow} from '../services/follow.api'
import {useContext} from 'react'
import { FollowContext } from '../follow.context'

export const useFollow = () => {
    const context = useContext(FollowContext)
    const {loading, setLoading, follow, setFollow} = context

    const handleFollow=async (username)=>{
        setLoading(true)
        const data = await userFollow(username)
        setFollow(data.follow)
        setLoading(false)
    }

    const checkFollow = async (username) => {
        const data = await checkFollowStatus(username)
        return data.isFollowing
    }

    const handleUnfollow = async (username) => {
        setLoading(true)
        await userUnfollow(username)
        setFollow(null)
        setLoading(false)
    }

    return {loading, follow, handleFollow, checkFollow, handleUnfollow}
}