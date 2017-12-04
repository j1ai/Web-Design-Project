var express = require('express')
const router = express.Router()
const request = require('request')
const Favorite_book = require('../models/favorites_course_table');
const cookieParser = require('cookie-parser');
var app = express()
app.use(cookieParser())


// Use mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
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




// User input favorite course

var responseData;

router.use( function (req,res,next) {
    responseData = {
        code: 0,
        message:''
    };
    next();
});


var user_db = {
    'test': 'test',
    'admin': 'admin'
}

// router.get('/', function(req, res) {
//     if(req.session.isLogin){
//         console.log('login Username: ', req.session.username)
//     }
//     res.render('user0.html');
// })

//
router.get('/getFavoriteCourse/', function(req, res) {
    if(req.session.isLogin){
        // console.log('cookie', req.cookies.myCookie);
        console.log('login name: ', JSON.parse(req.cookies.userInfo)['username']);
        var login_username = JSON.parse(req.cookies.userInfo)['username'];
    }
    Favorite_book.find({
        username:login_username
    },function (err,doc) {
        if(doc){
            responseData.code = 3;
            return res.send(doc);;
        }
    });

})


// User register
router.post('/saveFavoriteCourse',function (req,res) {
    console.log('/save to favorite router ok');
    // console.log(req.body);
    var username = req.body.username;
    var course_code = req.body.course_code;
    var course_name = req.body.course_name;
    var course_desc = req.body.course_desc;

    console.log(username, course_code, course_code, course_desc);

    if( username == ''){
        responseData.code = 2;
        responseData.message = 'Please log in or register.';
        res.json(responseData);
        return;
    }

    // Determine Username has been registered or not
    Favorite_book.findOne({
        course_code:course_code
    },function (err,doc) {
        if(doc){
            responseData.code = 3;
            responseData.message = 'This have already been saved.';
            res.json(responseData);
            return;
        }
        // Save to the Database
        var favorite_book = new Favorite_book({
            username: username,
            course_code: course_code,
            course_name: course_name,
            course_desc: course_desc

        });
        favorite_book.save();
        responseData.code = 4;
        responseData.message = 'Save to your favorites successfully.';
        res.json(responseData);
        return;
    });
});

// User Login
// router.post('/login',function (req,res) {
//     console.log('/login router ok');
//     var username = req.body.username;
//     var password = req.body.password;


//     if(password == ''|| username==''){
//         responseData.code = 2;
//         responseData.message = 'User name and Passwords cannot be empty';
//         res.json(responseData);
//         return
//     }

//     // Check in the database
//     User.findOne({
//         username:username,
//         password:password
//     },function (err,doc) {
//         console.log(doc)
//         if(doc){
//             responseData.code = 4;
//             responseData.message = 'Login Success';
//             responseData.userInfo = {
//                 _id: doc._id,
//                 username: doc.username
//             };

//             req.session.username = doc.username
//             req.session.isLogin = true;
//             // req.session.test = 'test';

//             res.cookie('userInfo',JSON.stringify({
//                 username: doc.username
//             }))

//             // res.cookie('Course',req.body.code, {signed:true})

//             // req.cookies.set('userInfo',JSON.stringify({
//             //     _id: doc._id,
//             //     username: doc.username
//             // }));
//             res.json(responseData);
//             return
//         }
//         responseData.code = 2;
//         responseData.message = 'User does not exist';
//         res.json(responseData);
//         return
//     });
// });


// router.get('/logout', function(req, res) {
//     console.log('/logout router ok')
//     req.session.destroy(function(){
// 			res.clearCookie('userInfo');
// 			// res.cookie("isLogin","false");
// 			res.redirect("/");
// 		});
// })



module.exports = router
