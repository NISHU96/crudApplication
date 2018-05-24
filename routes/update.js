const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const userModel = require('../models/userModel');

router.use(bodyparser.urlencoded({extended:true}));

router.post('/',(request, response)=> {
    const query = { username : request.body.usertoupdate };
    const update = {
        username : request.body.username,
        email : request.body.email,
        password : request.body.password
    };
    console.log(query);
    console.log(update);
    userModel.update(query, {$set : update},(err, numAffected) => {
        if(err) throw err;
        console.log("user updated.." + numAffected);
        response.send('user updated');
    });
});

module.exports = router;