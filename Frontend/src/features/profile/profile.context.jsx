import {createContext, useState} from 'react'

export const ProfileContext = createContext()

export const ProfileContextProvider = ({children})=>{
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState([])
    const [user, setUser] = useState(null)

    return(
        <ProfileContext.Provider value={{loading, setLoading, post, setPost, user, setUser}}>
            {children}
        </ProfileContext.Provider>
    )
}