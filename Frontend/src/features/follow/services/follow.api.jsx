import axios from 'axios'

const api = axios.create({
    baseURL:"https://instaclone-egeh.onrender.com/api/users",
    withCredentials: true
})

export async function userFollow(username){
    const response = await api.post('/follow/'+ username)
    return response.data
}

export async function checkFollowStatus(username){
    const response = await api.get('/follow/'+ username)
    return response.data
}

export async function userUnfollow(username){
    const response = await api.post('/unfollow/'+ username)
    return response.data
}
