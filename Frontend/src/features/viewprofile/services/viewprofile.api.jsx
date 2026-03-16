import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/api/users",
    withCredentials: true
})

export async function getUserProfile(username){
    const response = await api.get(`/profile/${username}`)
    return response.data
}