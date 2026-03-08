const followModel = require('../models/follow.model.js')
const userModel = require('../models/user.model.js')

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

module.exports = {
    followUserController,
    unfollowUserController
}