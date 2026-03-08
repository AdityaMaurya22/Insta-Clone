const express = require('express')
const postRouter = express.Router()
const postController = require('../controller/post.controller')
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})
const identifyUser = require('../middlewares/auth.middleware')

postRouter.post('/',upload.single('image'), identifyUser, postController.createPost)
postRouter.get('/posts', identifyUser, postController.getAllPosts)
postRouter.get('/posts/:postId', identifyUser, postController.getPostDetails)
postRouter.post('/like/:postId', identifyUser, postController.likePostController)


module.exports = postRouter