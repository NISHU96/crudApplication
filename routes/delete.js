const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
const userModel = require('../models/userModel');

router.use(bodyparser.urlencoded({extended : true}));

router.post('/', (request, response) => {
    userModel.remove({username : request.body.username},(err) => {
        if (err) throw err;
        response.send('user deleted.!!');
    })
});

module.exports = router;