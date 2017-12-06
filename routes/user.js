var express = require('express')
const router = express.Router()
const request = require('request')
const User = require('../models/User');


// Use mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// var User = require('../Models/User');

// Same return format
var responseData;


router.use( function (req,res,next) {
    responseData = {
        code: 0,
        message:'',
        isAdmin: false
    };
    next();
});


router.get('/', function(req, res) {
    if(req.session.isLogin){
        console.log('login Username: ', req.session.username)
    }
    res.render('user0.html');
})

router.get('/alluser', function(req, res) {

    User.find({},function (err,doc) {
                res.json(doc);
                return;
            }
);
});


// User register
router.post('/register',function (req,res) {
    console.log('/register router ok');
    // console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    // console.log(username, password, repassword)

    if( username == ''){
        responseData.code = 2;
        responseData.message = 'Username cannot be empty';
        res.json(responseData);
        return;
    }

    if( password == ''){
        responseData.code = 2;
        responseData.message = 'Passwords cannot be empty';
        res.json(responseData);
        return;
    }

    if( password != repassword){
        responseData.code = 2;
        responseData.message = 'Repeated password is not the same';
        res.json(responseData);
        return;
    }

    // Determine Username has been registered or not
    User.findOne({
        username:username
    },function (err,doc) {
        if(doc){
            responseData.code = 3;
            responseData.message = 'Username has been registered';
            res.json(responseData);
            return;
        }
        if(username=='admin'){
            isAdmin = true
        }
        else{
            isAdmin = false
        }
        // Save to the Database
        var user = new User({
            username: username,
            password: password,
            isAdmin: isAdmin
        });
        user.save();
        responseData.code = 4;
        responseData.message = 'Register Success';
        res.json(responseData);
        return;
    });
});

// User Login
router.post('/login',function (req,res) {
    console.log('/login router ok');
    var username = req.body.username;
    var password = req.body.password;

    if(password == ''|| username==''){
        responseData.code = 2;
        responseData.message = 'User name and Passwords cannot be empty';
        res.json(responseData);
        return
    }

    // Check in the database
    User.findOne({
        username:username,
        password:password
    },function (err,doc) {
        console.log(doc)
        if(doc){
            responseData.code = 4;
            responseData.message = 'Login Success';
            responseData.userInfo = {
                _id: doc._id,
                username: doc.username
            };
            console.log(doc)
            if(doc.isAdmin){
                responseData.isAdmin = true
            }

            req.session.username = doc.username
            req.session.isLogin = true;
            // req.session.test = 'test';

            res.cookie('userInfo',JSON.stringify({
                username: doc.username
            }))

            // res.cookie('Course',req.body.code, {signed:true})

            // req.cookies.set('userInfo',JSON.stringify({
            //     _id: doc._id,
            //     username: doc.username
            // }));
            console.log(responseData)
            res.json(responseData);
            return
        }
        responseData.code = 2;
        responseData.message = 'User or Passwords Wrong';
        res.json(responseData);
        return
    });
});


router.get('/logout', function(req, res) {
    console.log('/logout router ok')
    req.session.destroy(function(){
			res.clearCookie('userInfo');
			// res.cookie("isLogin","false");
			res.redirect("/");
		});
})



module.exports = router
