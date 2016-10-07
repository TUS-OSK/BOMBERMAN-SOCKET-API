var fs = require('fs');
var http = require('http');
// var socketio = require('socket.io');
var server = http.createServer();

server.on('request', function(req, res) {            
  res.writeHead(200, {'Content-Type': 'text/html'});
  var output = fs.readFileSync('./bomberman.html', 'utf-8');
  // var output = fs.readFile(fs.readFileSync('./bomberman.html', 'utf-8'));    ←誤りの原因
  res.end(output);
});

server.listen(process.env.PORT);
var io = require('socket.io').listen(server);


io.sockets.on('connection', function(socket) {
  // console.log('よくわからんけど入室');
  socket.on('enter', function(data) {
    io.sockets.emit('enter', data + ' : 入室');      //入室の情報はどうするか
    console.log(data + ' : 入室');
  });
  
  socket.on('message', function(data) {
    io.sockets.emit('message', data);
    console.log('message : ' + data);
  });
    
  socket.on('disconnect', function(data) {
    io.sockets.emit('massage', data + ' : 退出');
    console.log(data + ' : 退出');
  });
});