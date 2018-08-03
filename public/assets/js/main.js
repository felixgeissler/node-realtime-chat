var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('sendMessage', {
    from: 'User',
    to: 'global',
    text: 'This is the user speaking'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
  console.log('New Message recieved: ', data);
});
