var express = require('express');
var app = express();
var router = require('./routes/route')
var swig = require('swig');

const PORT = process.env.PORT || 3000;

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

// Load Database Module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


app.get('/',function(req, res) {
    // res.send('<h1>欢迎光临我的博客！</h1>');
    // 第一个参数：表示模板文件，相对于view文件夹而言的index文件
    // 第二个参数:传递个模板使用的数据
    res.render('index.html');
});


app.use('/site', router)




app.listen(PORT, () => {
  console.log(`Server listening on port http://127.0.0.1:${PORT}`);
});
