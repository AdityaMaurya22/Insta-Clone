import { BrowserRouter, Routes, Route } from "react-router";
import Login from './features/auth/pages/login'
import Register from './features/auth/pages/register'
import Feed from './features/post/pages/Feed'

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<h1>Welcome to the App</h1>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/feed" element={<Feed />} />
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes