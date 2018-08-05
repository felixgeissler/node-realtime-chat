var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
  console.log('New Message recieved: ', data);
  $("#chat").append(`<p><span class="font-weight-bold">[${data.from}]</span> ${data.timestamp} - ${data.text}</p>`);
});


$( "#button-sendMessage" ).on('click', function () {
  submitMessage();
});

function submitMessage(){
  socket.emit('sendMessage', {
    from: nickname,
    text: $("#input-message").val()
  }, function(data) {
    console.log(data);
  });
}
