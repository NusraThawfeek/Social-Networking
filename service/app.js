const express = require('express');
const app = express();
const PORT = 3001;
const cors= require('cors');

//DKpu9K4g0oy1K3vp database acces,s password
const mongoose = require('mongoose');
const { MONGOURI } = require("./valuekeys.js")

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("we are connected to the server...");
})

mongoose.connection.on('error', () => {
    console.log("we are not connected to the  server...");
})

require("./models/user");
require("./models/post");

app.use(express.json())
app.use(cors());
app.use(require('./routes/authen'))
app.use(require('./routes/postroute'))

app.listen(PORT, () => {
    console.log("Server started...");
})