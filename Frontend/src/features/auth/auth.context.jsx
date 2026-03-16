import { createContext, useState, useEffect} from 'react';
import {register, login, getMe, logout} from './services/auth.api'

export const AuthContext = createContext()

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getMe()
                setUser(response.user)
            } catch (err) {
                // User not logged in
            }
        }
        loadUser()
    }, [])

    const handleLogin = async (username,password) => {
        setLoading(true)
        try{
            const response = await login(username, password)
            setUser(response.user)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }


    const handleRegister = async (username, email, password) => {
        setLoading(true)
        try{
            const response = await register(email, username, password)
            setUser(response.user)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try{
            await logout()
            setUser(null)
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <AuthContext.Provider value={{user, loading, handleLogin, handleRegister, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )



}