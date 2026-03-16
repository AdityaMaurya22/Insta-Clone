import {allUsers, getFollowers} from '../services/users.api'
import {useContext} from 'react'
import {UsersContext} from '../user.context'

export const useUsers = () => {
    const context = useContext(UsersContext)

    const {loading, setLoading, users, setUsers} = context

    const handleAllUsers = async () => {
        setLoading(true)
        const data = await allUsers()
        setUsers(data.users)
        setLoading(false)
    }

    const handleGetFollowers = async () => {
        setLoading(true)
        const data = await getFollowers()
        setUsers(data.followers)
        setLoading(false)
    }

    return {loading, users, handleAllUsers, handleGetFollowers}
}