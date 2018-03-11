'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

// parses data submitted through post
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(function(req, res, next){
    console.log("I auth thee!");
    next();
});

router.post('/signup', urlencodedParser, createUser);

router.get('/signup', (req, res)=>{
    res.render('signup');
})

function createUser(req, res) {
    console.log("User successfully created");
    console.log(req.body);
};

module.exports = router;
