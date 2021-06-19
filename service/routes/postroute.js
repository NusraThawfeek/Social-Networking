const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post')

router.post("/createpost", requireLogin, (req, res) => {
    const { title, body, photo } = req.body;
    // if (!body||!photo) {
    //     res.status(420).json({ error: "Please fill all fields" })
    // }

    //console.log(req.user);
    const post = new Post({

        body,
        photo,
        postedby: req.user
    })

    post.save().then(result => {
        res.json({ message: result })
    }).catch(err => {
        console.log(err);
    })
})

router.get("/allpost", (req, res) => {
    Post.find()
        .populate("postedby", "_id name")
        .then(posts => {
            res.json(posts)
        }).catch(err => {
            console.log(err);
        })
})

router.get("/mypost", requireLogin, (req, res) => {
    Post.find({ postedby: req.user._id })
        .populate("postedby", "_id name")
        .then(mypost => {
            res.json(mypost)
        }).catch(err => {
            console.log(err);
        })

})

router.put("/like", requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true// add new data to array
    }).exec((err, result) => {
        if (err) {
            return res.status().json({ error: err })
        } else {
            res.json(result)
        }
    })
})

router.put("/unlike", requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull:{ likes: req.user._id }
    }, {
        new: true// add new data to array
    }).exec((err, result) => {
        if (err) {
            return res.status().json({ error: err })
        } else {
            res.json(result)
        }
    })
})


module.exports = router;