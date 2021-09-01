const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post')
const User = mongoose.model('User')

router.get("/user/:id", requireLogin, (req, res) => {
    User.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            Post.find({ postedby: req.params.id })
                .populate("postedby", "_id name")
                .exec((err, posts) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    }
                    res.json({user, posts})
                })
        }).catch(err => {
            return res.status(404).json({ error: "User not found" })
        })
})

router.get("/all",requireLogin, (req, res) => {
    User.find()
    .select("-password")
        .then(user => {
            res.json(user)
            // console.log(user);
        }).catch(err => {
            console.log(err);
        })
})

router.put("/follow", requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {//find user account
        $push: { followers: req.user._id }//add my ID in followers
    },
        { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status().json({ error: err })
            } else {
                User.findByIdAndUpdate(req.user._id, {
                    $push: { following: req.body.followId }
                },
                    { new: true })
                    .select("-password").then(result1 => {
                        res.json(result1)
                    }).catch(err=>{console.log(err);})
            }
        })
})

router.put("/unfollow", requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {//find user account
        $pull: { followers: req.user._id }//add my ID in followers
    },
        { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status().json({ error: err })
            } else {
                User.findByIdAndUpdate(req.user._id, {
                    $pull: { following: req.body.followId }
                },
                    { new: true })
                    .select("-password").then(result1 => {
                        res.json(result1)
                    }).catch(err=>{console.log(err);})
            }
        })
})


router.put("/edit", requireLogin, (req, res) => {
    const {profilePic} = req.body;

    User.findByIdAndUpdate(req.user._id , {//find user account  
      profilePic:profilePic
    },
        { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status().json({ error: err })
            } else {
                res.json(result);
            }
        })
})


module.exports = router;