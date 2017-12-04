var express = require('express')
const router = express.Router()
const request = require('request')
const User = require('../models/Map');

// Use mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Same return format
var responseData;

router.use( function (req,res,next) {
    responseData = {
        code: 0,
        message:''
    };
    next();
});

router.post('/savefavourite',function (req,res) {
	 var username = req.body.username;
    var markers = req.body.markers;
	 // Determine Username has been registered or not
	 if( username == ''){
        responseData.code = 2;
        responseData.message = 'Username cannot be empty';
        res.json(responseData);
        return;
    }    
    
    User.findOne({
        username:username
    },function (err,doc) {
    	  var user = new User({
            username: username,
            markers: markers
        });
        if(doc){
            responseData.code = 3;
            responseData.message = 'This User has stored Favourite Markers before. And new favourite list is updated now.';
            user.save();
            res.json(responseData);
            return;
        }
        // Save to the Database
        user.save();
        responseData.code = 4;
        responseData.message = 'Store new Data Success';
        res.json(responseData);
        return;
    });
});

router.get('/getfavourite', function(req, res) {
		var username = req.session.username;	
		User.findOne({
        	username:username
    	},function (err,doc) {
	        if(doc){
	        		console.log(doc.markers)
	            responseData.code = 4;
	            responseData.message = 'Find User in database';
	            responseData.userInfo = {
						 username: doc.username,	                
	                markers: doc.markers  
	            };
	            res.send(doc)
	            return
	        }
	     })
});

// define the home page route
router.get('/', function(req, res) {
    res.send('Home page')
})
router.get('/about', function(req, res) {
    res.send('About')
})

router.get('/food', function(req, res) {
    API_KEY = 'vXTvfn2nefMuprAfim9GP9kRBEU4aN0v'

    request.get('https://cobalt.qas.im/api/1.0/food?limit=100' + '&key=' + API_KEY, function(err, _res, body) {
        data = JSON.parse(body)
        res.send(data)
    })
})

router.get('/building', function(req, res) {
    API_KEY = 'vXTvfn2nefMuprAfim9GP9kRBEU4aN0v'

    request.get('https://cobalt.qas.im/api/1.0/buildings?limit=100' + '&key=' + API_KEY, function(err, _res, body) {
        data = JSON.parse(body)
        res.send(data)
    })
})

router.get('/parking', function(req, res) {
    API_KEY = 'vXTvfn2nefMuprAfim9GP9kRBEU4aN0v'

    request.get('https://cobalt.qas.im/api/1.0/transportation/parking?limit=100' + '&key=' + API_KEY, function(err, _res, body) {
        data = JSON.parse(body)
        res.send(data)
    })
})



router.use(express.static('public'))


// RESTful Routes

// 404 Error Handler
router.use(function(req, res, next) {
  res.status(404).send('Error 404, Sorry cant find that!');
});

module.exports = router
