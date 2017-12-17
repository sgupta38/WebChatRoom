// @author: Sonu Gupta
// @date: 17-dec-2017
// @Application: Chat room application using websockets.

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
var feedback = document.getElementById('feedback');

//========================================================================================================================================================
// Emit events:[To server]
//
//=========================================================================================================================================================
    // "click" Note: 'addEventListener' is the boiler plate event provided by javascript
btn.addEventListener('click', function(){
    //First parameter is any 'nameOfMessage' and second parameter is the object containing 'Actual data'
    // Notice that at server side, we are going to listen onto the same 'nameOfMessage'
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

    // "keypress" Event for broadcasting 'typing' Message
    // Note: Whenever message is typed by indivisual, 'keypress event' is fired. Here, we are catching the event and emitting to server.
    // Thus, server on its end will listen for this 'typing' event and will broadcast the same.
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

    // "blur" Event for clearing 'typing' Message
    // Note: Whenever someone stops writing message, '### is typing a message..' should no longer be displayed
message.addEventListener('blur', function(){
    socket.emit('outoffocus', handle.value);
});

//========================================================================================================================================================
//Listen for events: [from server]
//
//========================================================================================================================================================

    //Note: SOCKET: Listening for event 'chat' that was emitted by server and to display the same onto browser screen.
socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

    //Note: SOCKET: Listening for event 'typing' that was emitted by server and to display the same onto browser screen.
socket.on('typing', function(data){
    console.log('typing_event_fired');
    feedback.innerHTML = '<p><em>'+ data + ' is typing a message...</em></p>';
});

    //Note: SOCKET: Listening for event 'outoffocus' that was emitted by server and to clear the previous 'typing' message.
socket.on('outoffocus', function(data){
    console.log('out_of_focus');
    feedback.innerHTML = "";
});
