const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema.Types;// use for unique identifier
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required:true
    },
    postedby:{
        type:ObjectId,
       ref:"User"
    },
})
module.exports=mongoose.model("Post", postSchema)