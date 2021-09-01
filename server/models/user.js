//schema is the blue print of table
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic:{
        type:String,
        default:"https://res.cloudinary.com/nusracloud/image/upload/v1629976692/default-profile-photo_fb6yta.jpg"
    },
    followers: [{
        type: ObjectId,
        ref: "User"
    }],
    following: [{
        type: ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model("User", userSchema)