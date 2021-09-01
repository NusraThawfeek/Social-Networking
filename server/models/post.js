const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;// use for unique identifier
const postSchema = mongoose.Schema({

    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    comments: [{
        Text: String,
        postedby: {
            type: ObjectId,
            ref: "User"
        }
    }],
    likes: [{
        type: ObjectId, ref: "User"
    }],
    postedby: {
        type: ObjectId,
        ref: "User"
    },
})
module.exports = mongoose.model("Post", postSchema)