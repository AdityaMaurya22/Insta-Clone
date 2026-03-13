const express = require("express")
const userController = require("../controller/user.controller.js")
const identifyUser = require("../middlewares/auth.middleware.js")

const userRouter = express.Router()

userRouter.post("/follow/:username",identifyUser, userController.followUserController )
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)
userRouter.get('/request', identifyUser, userController.followRequestController)
userRouter.post('/request/accepted/:username', identifyUser, userController.acceptFollowRequest)
userRouter.post('/request/reject/:username', identifyUser, userController.rejectFollowRequest)


module.exports=userRouter;