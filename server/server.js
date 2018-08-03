const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the global chatroom!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined.'));


  socket.on('sendMessage', (data) => {
    console.log('Recieved message: '+data);

    socket.emit('response', {
      status: 1
    });

    io.emit('newMessage', generateMessage(data.from, data.text));

    // socket.broadcast.emit('newMessage', {
    //   from: data.from,
    //   to: data.to,
    //   text: data.text,
    //   timestamp: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    // });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


server.listen(port, function() {
  console.log(`Server is up and running on port: ${port}`);
});
