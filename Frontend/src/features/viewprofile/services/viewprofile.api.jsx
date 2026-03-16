import axios from 'axios'

const api = axios.create({
    baseURL:"https://instaclone-egeh.onrender.com/api/users",
    withCredentials: true
})

export async function getUserProfile(username){
    const response = await api.get(`/profile/${username}`)
    return response.data
}