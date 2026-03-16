import axios from 'axios'

const api = axios.create({
    baseURL: "https://insta-clone-5kpf.onrender.com/api",
    withCredentials: true
})

export async function getPost(){
    const response = await api.get("/post/posts")
    return response.data
}

export async function getUser(){
    const response = await api.get("/auth/get-me")
    return response.data
}