import axios from 'axios'

const api = axios.create({
    baseURL: "https://insta-clone-5kpf.onrender.com/api/users",
    withCredentials: true
})

export async function allUsers(){
    const response = await api.get("/all-users")
    return response.data
}

export async function getFollowers(){
    const response = await api.get("/followers")
    return response.data
}

