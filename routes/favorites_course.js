var express = require('express')
const router = express.Router()
const request = require('request')
// const Favorite_course = require('../models/favorites_course_table');
const Favorite_course = require('../models/FavoriteCourse');
const User = require('../models/User');
const cookieParser = require('cookie-parser');
var app = express()
app.use(cookieParser())


// Use mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// var User = require('../Models/User');

router.get('/saveFavoriteCourse/', function(req, res) {
    if(req.session.isLogin){
        // console.log('cookie', req.cookies.myCookie);
        var login_username = JSON.parse(req.cookies.userInfo)['username'];
        Favorite_course.find({username:login_username}, function(error, data){
            res.json(data);
        });
    }
    else{
        res.setHeader("Content-Type", "text/html");
        res.write("<p>login_request</p>");
        res.end();
    }


})

router.delete('/saveFavoriteCourse/:db_id', function(req, res) {
    if(req.session.isLogin){
        // console.log('cookie', req.cookies.myCookie);
        var db_id = req.params.db_id;
        var login_username = JSON.parse(req.cookies.userInfo)['username'];
        Favorite_course.findOneAndRemove({ "_id": db_id}, function(error, data){
            console.log('deleted' + data);
            if (data){
                res.json({code:4, message:'Delete successfully'});
                return;
            }
        });
    }
    else{
        res.setHeader("Content-Type", "text/html");
        res.json({code:2, message:'Please log in or register.'});
        return;
    }


})


// Fav course save
router.post('/saveFavoriteCourse',function (req,res) {
    console.log('/save to favorite router ok');
    // console.log(req.body);
    var username = JSON.parse(req.cookies.userInfo)['username'];
    var course_code = req.body.course_code;
    var course_name = req.body.course_name;
    var course_desc = req.body.course_desc;
    var course_id = req.body.course_id;

    console.log('saved', username, course_code, course_code, course_desc, course_id);
    
    console.log(username);
    if(!req.session.isLogin){
        res.json({code:2, message:'Please log in or register.'});
        return;
    }
    else{
        // Determine Username has been registered or not
        console.log(username);
        Favorite_course.findOne({
            username:username,
            course_id:course_id,
        },function (err,doc) {
            if(doc){
                
                res.json({code:3, message:'This have already been saved.'});

                return;
            }
            // Save to the Database
            var favorite_course = new Favorite_course({
                username: username,
                course_code: course_code,
                course_name: course_name,
                course_desc: course_desc,
                course_id: course_id,

            });

            favorite_course.save();

            res.json({code:4, message:'Save to your favorites successfully.'});
            return;
        });
    }
});

router.put('/saveFavoriteCourse',function (req,res) {
    console.log('/save to favorite router ok');
    // console.log(req.body);
    var username = JSON.parse(req.cookies.userInfo)['username'];
    var course_code = req.body.course_code;
    var course_name = req.body.course_name;
    var course_desc = req.body.course_desc;

    console.log('saved', username, course_code, course_code, course_desc);

    if( username == ''){
        res.json({code:2, message:'Please log in or register.'});
        return;
    }

    // Determine Username has been registered or not
    Favorite_course.findOne({
        username:username,
        course_code:course_code
    },function (err,doc) {
        if(doc){
            
            res.json({code:2, message:'This have already been saved.'});

            return;
        }
        // Save to the Database
        var favorite_course = new Favorite_course({
            username: username,
            course_code: course_code,
            course_name: course_name,
            course_desc: course_desc

        });

        favorite_course.save();

        res.json({code:2, message:'Save to your favorites successfully.'});
        return;
    });
});


module.exports = router
