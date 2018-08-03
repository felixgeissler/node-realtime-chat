const path = require('path');
const moment = require("moment");
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the global chatroom!',
    createdAt: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user has joined the chatroom.',
    createdAt: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
  });


  socket.on('sendMessage', (data) => {
    console.log('Recieved message: '+data);

    socket.emit('response', {
      status: 1
    });

    io.emit('newMessage', {
      from: data.from,
      text: data.text,
      createdAt: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    });

    // socket.broadcast.emit('newMessage', {
    //   from: data.from,
    //   to: data.to,
    //   text: data.text,
    //   createdAt: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    // });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


server.listen(port, function() {
  console.log(`Server is up and running on port: ${port}`);
});
