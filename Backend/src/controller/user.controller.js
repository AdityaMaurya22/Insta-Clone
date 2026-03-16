const followModel = require('../models/follow.model.js')
const userModel = require('../models/user.model.js')
const postModel = require('../models/post.model.js')


async function followUserController(req, res){

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if(followeeUsername === followerUsername){
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isFolloweeExist = await userModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExist){
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }


    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        follow: followeeUsername
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message:`You already following ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        follow: followeeUsername
    })

    res.status(201).json({
        message: `You are following ${followeeUsername}`,
        follow: followRecord
    })

}

async function checkFollowController(req, res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isFollowing = await followModel.findOne({
        follower: followerUsername,
        follow: followeeUsername
    })

    res.status(200).json({
        isFollowing: !!isFollowing
    })
}

async function unfollowUserController(req, res){
    const followerUsername = req.user.username
    const followUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        follow: followUsername
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message: `Your not following ${followUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have Unfollowed ${followUsername}`
    })
}

async function followRequestController(req, res,){
    const user = req.user.username

    const pendingRequest = await followModel.find({
        follow: user,
        status: "pending"
    })

    res.status(200).json({
        message: "Pending request fetched successfully",
        request: pendingRequest
    })
}

async function acceptFollowRequest(req,res){

    const followerUsername = req.params.username
    const followUsername = req.user.username

    const updateStatus = await followModel.findOneAndUpdate({
        follower: followerUsername,
        follow: followUsername,
        status: "pending"
    },{
        status: "accepted"
    },{
        new : true
    })

    res.status(200).json({
        message: "Follow request accepted successfully",
        request: updateStatus
    })
    
}

async function rejectFollowRequest(req,res){

    const followerUsername = req.params.username
    const followUsername = req.user.username

    const updateStatus = await followModel.findOneAndUpdate({
        follower: followerUsername,
        follow: followUsername,
        status: "pending"
    },{
        status: "rejected"
    },{
        new : true
    })

    res.status(200).json({
        message: "Follow request rejected successfully",
        request: updateStatus
    })
    
}

async function allUserController(req, res) {

    const user =req.user.username

    const users = await userModel.find({
        username: { $ne: user } //$ne login user ko exclude kar raha hai
    })

    res.status(200).json({
        message: "Users fetched successfully",
        users
    })
}

async function getUserProfileController(req, res) {
    const username = req.params.username

    const user = await userModel.findOne({ username })

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const posts = await postModel.find({ user: user._id }).sort({ createdAt: -1 })

    res.status(200).json({
        message: "User profile fetched successfully",
        user,
        posts
    })
}

async function getFollowersController(req, res) {
    try {
        const username = req.user.username

        const followers = await followModel.find({ 
            follow: username, 
            status: 'accepted' 
        })

        if (followers.length === 0) {
            return res.status(200).json({
                message: "No followers found",
                followers: []
            })
        }

        const followerUsernames = followers.map(f => f.follower)

        const followerUsers = await userModel.find({ 
            username: { $in: followerUsernames } 
        }).select('username profile_image bio')

        res.status(200).json({
            message: "Followers fetched successfully",
            followers: followerUsers,
            count: followerUsers.length
        })
    } catch (error) {
        console.error('Error fetching followers:', error)
        res.status(500).json({
            message: "Error fetching followers",
            error: error.message
        })
    }
}

// async function updateUserController(req,res){
//     const user = req.user._id
//     const bio = req.body

//     const updateUser = await userModel.findByIdAndUpdate(
//         user,
//         { bio },

//     )


// }

module.exports = {
    followUserController,
    unfollowUserController,
    followRequestController,
    acceptFollowRequest,
    rejectFollowRequest,
    allUserController,
    checkFollowController,
    getUserProfileController,
    getFollowersController
}