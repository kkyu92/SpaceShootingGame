const express = require("express");
const socketIO = require("socket.io");

const app = express();
const server = app.listen(9000);
const io = socketIO(server);
const path = require("path");

var users = {};
var name = '';

app.get('/:name', function (req, res) {
    name = req.params.name;
    res.sendFile(path.join(__dirname + "/index.html"));
});

// socket
io.sockets.on("connection", function (socket) {
   users[socket.id] = name;

   // node
    socket.on("nRoom", function (room) {
        socket.join(room);
        socket.broadcast.in(room).emit("node new user", users[socket.id] + " new user has joined");
    });

    socket.on("node new message", function (data) {
       io.sockets.in("nRoom").emit('node news', users[socket.id] + " : "+data);
    });
});

// const express = require('express');
// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io').listen(server);
//
// app.use('/css',express.static(__dirname + '/css'));
// app.use('/js',express.static(__dirname + '/js'));
// app.use('/assets',express.static(__dirname + '/assets'));
//
// app.get('/',function(req,res){
//     res.sendFile(__dirname+'/index.html');
// });
//
// server.listen(8081,function(){ // Listens to port 8081
//     console.log('Listening on '+server.address().port);
// });
//
// // socket
// io.sockets.on("connection", function (socket) {
//    users[socket.id] = name;
//
//    // node
//     socket.on("nRoom", function (room) {
//         socket.join(room);
//         socket.broadcast.in(room).emit("node new user", users[socket.id] + " new user has joined");
//     });
//
//     socket.on("node new message", function (data) {
//        io.sockets.in("nRoom").emit('node news', users[socket.id] + " : "+data);
//     });
// });