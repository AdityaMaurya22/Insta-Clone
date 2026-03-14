import { RouterProvider } from "react-router"
import AppRoutes from "./AppRoutes"
import './style.scss'
import { AuthProvider } from "./features/auth/auth.context"
import { PostContextProvider } from "./features/post/post.context"
import { ProfileContextProvider } from "./features/profile/profile.context"

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <ProfileContextProvider>
          <AppRoutes />
        </ProfileContextProvider>
      </PostContextProvider>
    </AuthProvider>

  )
}

export default App
