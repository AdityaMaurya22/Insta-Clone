import { BrowserRouter, Routes, Route } from "react-router";
import Login from './features/auth/pages/login'
import Register from './features/auth/pages/register'
import Feed from './features/post/pages/Feed'
import CreatePost from './features/post/pages/CreatePost'
import Profile from './features/profile/pages/Profile'
import Users from './features/users/pages/User'
import Followers from './features/users/pages/Followers'
import ViewProfile from './features/viewprofile/pages/ViewProfile'

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/profile" element= {<Profile />} />
                <Route path="/followers" element={<Followers />} />
                <Route path="/users" element= {<Users />} />
                <Route path="/profile/:username" element={<ViewProfile />} />
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes