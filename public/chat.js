// Make connection

// You might be worried abt 'io' variable. :D
// Note that in out index.html file, initially we are loading the 'socket.io' library which ultimately gives us the 'io' variable.
// Use that variable to connect to the url you want.
var socket = io.connect('http://localhost:4000');

//Query DOM

var message = document.getElementById('message');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var handle = document.getElementById('handle');

// Emit events

// 'addEventListener' is the boiler plate event provided by javascript
btn.addEventListener('click', function(){
    //First parameter is any 'nameOfMessage' and second parameter is the object containing 'Actual data'
    // Notice that at server side, we are going to listen onto the same 'nameOfMessage'
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

//NOte: SOCKET: Listening for event 'chat' that was emitted by server and to display the same onto browser screen.

socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});
