import {createContext, useState} from 'react'

export const FollowContext = createContext()

export const FollowContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [follow, setFollow] = useState(null)

    return(
        <FollowContext.Provider value={{loading, setLoading, follow, setFollow}}>
            {children}
        </FollowContext.Provider>
    )
}