var express = require('express')
const router = express.Router()
const request = require('request')
const User = require('../models/User');

// Use mongoose
// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// var User = require('../Models/User');

// Same return format
var responseData;


router.use( function (req,res,next) {
    responseData = {
        code: 0,
        message:''
    };
    next();
});

// User Registe

var user_db = {
    'test': 'test',
    'admin': 'admin'
}

router.get('/', function(req, res) {
    console.log(req.body.data)
    res.send('message console')
})


router.get('/messages', function(req, res) {    
    console.log(req.query.data)
    responseData.code = 0

    responseData.message = 'GET: Send Success'
    res.json(responseData);
    return
})

router.post('/messages', function(req, res) {
    console.log(req.body.data)

    responseData.message = 'POST: Send Success'
    res.json(responseData);
    return
})

router.delete('/messages/:msgid', function(req, res) {
    console.log(req.params.msgid)

    responseData.message = 'DELETE: Del Success'
    res.json(responseData);
    return
})


module.exports = router
