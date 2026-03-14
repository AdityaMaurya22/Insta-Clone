import {getPost, getUser} from '../services/Profile.api'
import {useContext} from 'react'
import { ProfileContext } from '../profile.context'

export const useProfile = () => {
    const context = useContext(ProfileContext)

    const {loading, setLoading, post, setPost, user, setUser} = context

    const handleGetPost = async () => {
        setLoading(true)
        const data = await getPost()
        setPost(data.posts.reverse())
        setLoading(false)
    }

    const handleUser = async () => {
        setLoading(true)
        const data = await getUser()
        setUser(data.user)
        setLoading(false)
    }

    return {loading, post, handleGetPost, user, handleUser}
}