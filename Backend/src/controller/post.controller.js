const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')
const likeModel = require('../models/like.model')

const imageKit = new ImageKit({
    PrivateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPost(req, res) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).send({
            message: "Token not provided, Unauthorized access"
        })
    }

    let decoded = null

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)

    } catch (err) {
        return res.status(401).json(
            {
                message: "user not authorized, invalid token"
            }
        )
    }



    const files = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "test",
        folder: "insta-clone-project"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: files.url,
        user: req.user.id
    })

    res.status(201).send(post)

}

async function getAllPosts(req, res){

    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
}

async function getPostDetails(req, res){
    

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findOne({_id: postId})

    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden content"
        })
    }

    return res.status(200).json({
        message: "Post fetched successfully",
        post
    })
}

async function likePostController(req, res){
    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post liked successfully",
        like
    })
}

async function getFeedController(req, res){

    const user = req.user

    const posts = await Promise.all((await postModel.find().populate("user").select("-user.password").lean()) //lean isko mongoose data dtype se normal object me convert karta hai taki add kiya ja sake
    .map(async (post) => {
        const isLiked = await likeModel.findOne({
            user: user.username,
            post: post._id
        })

        post.isLiked = !!isLiked //boolean me convert karta hai

        return post
    }))

    res.status(200).json({
        message: 'Post fetched Successfully',
        posts
    })
}

module.exports = { 
    createPost,
    getAllPosts,
    getPostDetails,
    likePostController,
    getFeedController
}