const express = require("express")
const userController = require("../controller/user.controller.js")
const identifyUser = require("../middlewares/auth.middleware.js")

const userRouter = express.Router()

userRouter.post("/follow/:username",identifyUser, userController.followUserController )
userRouter.get("/follow/:username",identifyUser, userController.checkFollowController )
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)
userRouter.get('/request', identifyUser, userController.followRequestController)
userRouter.post('/request/accepted/:username', identifyUser, userController.acceptFollowRequest)
userRouter.post('/request/reject/:username', identifyUser, userController.rejectFollowRequest)
userRouter.get("/all-users", identifyUser, userController.allUserController)
userRouter.get("/profile/:username", identifyUser, userController.getUserProfileController)
userRouter.get("/followers", identifyUser, userController.getFollowersController)
// userRouter.patch('/profile-update', identifyUser, userController.updateUserController)


module.exports=userRouter;