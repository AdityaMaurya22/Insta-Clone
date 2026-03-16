import { RouterProvider } from "react-router"
import AppRoutes from "./AppRoutes"
import './style.scss'
import { AuthProvider } from "./features/auth/auth.context"
import { PostContextProvider } from "./features/post/post.context"
import { ProfileContextProvider } from "./features/profile/profile.context"
import { UserContextProvider } from "./features/users/user.context"
import { FollowContextProvider } from "./features/follow/follow.context"

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <ProfileContextProvider>
          <UserContextProvider>
            <FollowContextProvider>
              <AppRoutes />
            </FollowContextProvider>
          </UserContextProvider>
        </ProfileContextProvider>
      </PostContextProvider>
    </AuthProvider>

  )
}

export default App
