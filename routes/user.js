const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
const userModel = require('../models/userModel');

router.use(bodyparser.urlencoded({extended: true}));

router.post('/', (request, response) => {
    const user = new userModel({
        username : request.body.username,
        email : request.body.email,
        password : request.body.password
    });
    user.save((err) => {
        if (err) throw err;
        console.log('user saved..!!');
        response.send('user saved');
    })
});

module.exports = router;
