const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../valuekeys')
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
   // console.log(authorization);
    if (!authorization) {
        res.status(401).json({ error: "You must be loged in" });
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "log in please" })
        }

        const { _id } = payload;

        User.findById(_id).then(userdata => {
            req.user = userdata
            //console.log(req.user);
            next();
        })
      
    })

}