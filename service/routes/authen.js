const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');


router.get("/", function (req, res) {
    res.send("hey...")
})

router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(422).json({
            error: "Enter All the information.."
        })
    }

    User.findOne({ email: email }).then(saveUser => {
        if (saveUser) {
            return res.status(422).json({
                error: "User already exist"
            })
        }

        bcrypt.hash(password, 12).then(hashedpw => {
            const user = new User({
                email,
                password:hashedpw,
                name
            })
            user.save().then(user => {
                res.json({ message: "saved successfully" })
            }).catch(err => {
                console.log(err);
            })
        })

    }).catch(err => {
        console.log(err);
    })

})

router.post("/signin",(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(422).json({error:"Please enter email and password!"})
    }
    User.findOne({email:email}).then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password!"})
        }
        bcrypt.compare(password,savedUser.password).then(doMatch=>{
            if(doMatch){
                return res.json({error:"Successfully signed in :)"})
            }
            else{
                return res.status(422).json({error:"Invalid email or password!"})
            }
        }).catch(err=>{
            console.log(err);
        })
    })
})
module.exports = router