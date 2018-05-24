const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');


router.get('/',(request,response) => {
    userModel.find({},(err, data) => {
        if (err) throw err;
        response.json(data);
    })
});

module.exports = router;