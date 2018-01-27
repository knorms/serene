var express = require("express");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sd = require('standard-deviation')

//Make examples and build directories accessible for index.html
app.use("/examples", express.static(__dirname + '/examples'));
app.use("/build", express.static(__dirname + '/build'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/media", express.static(__dirname + '/media'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
