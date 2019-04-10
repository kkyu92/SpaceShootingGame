// console.log('hello world');

// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;
// const router = require('./route/router');
//
// app.use(router);
//
// app.listen(port, err =>{
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("서버 가동");
//     }
// });

const path = require('path');
const express = require('express');
const app = express();

// setting
app.set('port', process.env.PORT || 4000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

// webSockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
        // console.log(data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
        // console.log(data);
    });
});


