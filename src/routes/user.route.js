const express = require("express")
const userController = require("../controller/user.controller.js")
const identifyUser = require("../middlewares/auth.middleware.js")

const userRouter = express.Router()

userRouter.post("/follow/:username",identifyUser, userController.followUserController )
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)


module.exports=userRouter;