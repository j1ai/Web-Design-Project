const express = require('express');
const cookieParser = require('cookie-parser');
const swig = require('swig');
const opn = require('opn');
const bodyParser = require('body-parser');
const moment = require('moment')
const session = require('express-session')


const app = express();
const PORT = process.env.PORT || 3000;

// Websocket - socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);


io.on('connection', function(socket){
  console.log('A User Connected '+socket.id);
  socket.on('disconnect', function(){
    console.log('A User Disconnected');
  });
  socket.emit('message','Hello');
});

app.get('/getid', function(req, res){
    var content = req.query.content || 'none';
    console.log('socketid: '+socket.id);

    // io.sockets.emit('message',content)
    return res.send('socketid: '+socket.id);
})

app.get('/sendMsg', function(req, res){
    var content = req.query.content || 'none';
    io.sockets.emit('message',content)
    return res.send({code:200,msg:'Message was successfully sent.'});
})

// Router
const router = require('./routes/route')
const router_message = require('./routes/message')
const router_user = require('./routes/user')
const router_favorite_course = require('./routes/favorites_course')
const router_location = require('./routes/location')



//cancel template cache during development
swig.setDefaults({cache:false});

// Serving static files
// When user start with public, then return the file in __dirname + '/public'
// eg. 127.0.0.1:3000/public/css/food.css
app.use('/public',express.static(__dirname + '/public') );

app.engine('html',swig.renderFile);

// Set template dir
app.set('views','./views');
// Registe the view engine
app.set('view engine','html');
// app.set("view engine", "ejs");

app.use(session({
  secret: "Haotian Yin's Key",
  resave: false,
  saveUninitialized: false,
  cookie: {isLogin:false, maxAge:60*1000}
}));

//  Bodyparse setting
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Set the same key for cookie which should be the same as the key in session
app.use(cookieParser("Haotian Yin's Key"))

// Load Database Module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.get('/',function(req, res) {
    res.render('index.html');
});

function myLogger(req, res, next) {

    console.log("Cookie Parser: ", req.cookies.userInfo);
    console.log("Signed Cookies: ",req.signedCookies)
    console.log("seesion: ",req.session)
    if (req.body) {
        console.log(moment().format(), 'Log:', req.method, req.url, req.body)
    }
    // res.append('Set-Cookie', 'lastPage='+req.url);
    next()
}

// middleware that is specific to this router
app.use(myLogger)
app.use('/location', router_location)
app.use('/user', router_user)
app.use('/favorites_course', router_favorite_course)
app.use('/api', router_message)
app.use('/', router)




var port = 3000;
var uri = 'http://127.0.0.1:' + port;

// Connect mongo and Start the server
mongoose.connect('mongodb://localhost:27017/app',function (err) {
    if(err){
        console.log('DB Connect Error');
    }else{
        console.log('Db Connect Success');
        server.listen(port);
        console.log('> Listening at ' + uri + '\n');
        // automatically open the url in the browser
        // opn(uri)
    }
});
