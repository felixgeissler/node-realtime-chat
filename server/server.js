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

  socket.on('sendMessage', (data) => {
    console.log('Recieved message: '+data);

    socket.emit('newMessage', {
      from: data.from,
      to: data.to,
      text: data.text,
      createdAt: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


server.listen(port, function() {
  console.log(`Server is up and running on port: ${port}`);
});
