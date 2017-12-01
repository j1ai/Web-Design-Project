var express = require('express')



var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/public',express.static(__dirname + '/public') );

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/user0.html');
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.broadcast.emit('message','hi');
});


app.get('/sendMsg', function(req, res){
    var content = req.query.content || 'none';
    io.sockets.emit('message',content)
    return res.send({code:200,msg:'发送成功'});
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
