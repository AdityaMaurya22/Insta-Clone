import {createContext, useState} from 'react'

export const UsersContext = createContext()

export const UserContextProvider = ({children})=>{
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    return(
        <UsersContext.Provider value={{loading, setLoading, users, setUsers}}>
            {children}
        </UsersContext.Provider>
    )
}