const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/route')
const router_user = require('./routes/user')
const router_location = require('./routes/location')
const swig = require('swig');
const opn = require('opn');
const bodyParser = require('body-parser');
const moment = require('moment')
const session = require('express-session')


const app = express();
const PORT = process.env.PORT || 3000;

// 在开发过程中，需要取消模板缓存
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
    // res.send('<h1>欢迎光临我的博客！</h1>');
    // 第一个参数：表示模板文件，相对于view文件夹而言的index文件
    // 第二个参数:传递个模板使用的数据
    res.render('index.html');
});

function myLogger(req, res, next) {
    // console.log(moment().format(), 'Log:', req.method, req.url, req.body)
    // console.log('Log:', req.method, req.url, req.body)
    // console.log("Raw Cookies: ",req.headers.cookie)
    console.log("Cookie Parser: ",req.cookies)
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
app.use('/', router)






var port = 3000;
var uri = 'http://127.0.0.1:' + port;

// Connect mongo and Start the server
mongoose.connect('mongodb://localhost:27017/app',function (err) {
    if(err){
        console.log('DB Connect Error');
    }else{
        console.log('Db Connect Success');
        app.listen(port);
        console.log('> Listening at ' + uri + '\n');
        // automatically open the url in the browser
        // opn(uri)
    }
});
