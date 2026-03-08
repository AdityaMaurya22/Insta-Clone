const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "Username is requyired"]
    },
    email:{
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is requyired"]
    },
    password:{
        type: String,
        required: [true, "Password is requyired"]
    },
    bio: String,
    profile_image: {
        type: String,
        default: "https://ik.imagekit.io/b0gclzwhh/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg_semt=ais_user_personalization&w=740&q=80"
    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }]
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel