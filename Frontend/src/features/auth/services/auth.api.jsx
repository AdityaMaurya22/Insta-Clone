import axios from 'axios';
const api = axios.create({
    baseURL: "https://insta-clone-5kpf.onrender.com/api/auth",
    withCredentials: true
})

export async function register(username, email, password) {

    const response = await api.post("/register", {
        username,
        email,
        password
    })


    return response.data

}

export async function login(username, password) {

    const response = await api.post("/login", {
        username,
        password
    })

    return response.data
}

export async function getMe() {
    try {
        const response = await api.get('/get-me')
        return response.data
    }
    catch (err) {
        throw err
    }
}

export async function logout() {
    const response = await api.post('/logout')
    return response.data
}