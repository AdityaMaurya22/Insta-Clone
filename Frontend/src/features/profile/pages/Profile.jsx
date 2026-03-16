import React,{useEffect} from 'react'
import '../style/profile.scss'
import {useProfile} from '../hooks/useProfile'
import Profiles from "../components/UserProfile"
import Navbottom from "../../shared/components/Navbottom"


const Profile = () => {

    const {loading, post, handleGetPost, user, handleUser} = useProfile()

    useEffect(()=>{
        handleGetPost()
        handleUser()
    }, [])

    if(loading){
        return (
            <main>
                <h1>Loading Profile...</h1>
            </main>
        )
    }

    return (
        <main className="profile-page">
            <Profiles post={post} user={user}/>
            <Navbottom />
        </main>
    )
}

export default Profile
