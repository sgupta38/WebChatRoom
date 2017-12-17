// @author: Sonu Gupta
// @date: 17-dec-2017
// @Application: Chat room application using websockets.


// This will act as a 'SERVER'

var express = require('express');
var socket = require('socket.io');

// App Setup
var app = express()
var server = app.listen(4000, function(){
    console.log('Listening on port 4000')
})

//static files
// This means, express is gona look for 'public' folder and if it finds any resources[.css, .html etc.] in 'public' folder, its gona send to browser.
app.use(express.static('public'));

//Socket Setup
var io = socket(server);

// This is listening for event 'connection' [when browser connects to port 4000]

// callback functions parameeter 'socket' is the instance of the socket that got connected.
// Note: To work correctly, you also need to use the same 'socket.io' on client [index.html] :)

io.on('connection', function(socket){
    console.log('successfully made socket connection', socket.id);

    //Listener 1: 'chat'
    socket.on('chat', function(data){
        console.log('chat_event_received')
        io.sockets.emit('chat', data);                 // Notice: io.broadcast.emit() -----> Send to all
    });

    //Listener 2: 'typing'
    socket.on('typing', function(data){
        console.log('typing_event_received');
        socket.broadcast.emit('typing', data)           // Notice: socket.broadcast.emit()  -----> Send to all except itself
    });

    //Listener 2: 'typing'
    socket.on('outoffocus', function(data){
        console.log('outoffocus_event_received');
        socket.broadcast.emit('outoffocus', data)        // Notice: socket.broadcast.emit() -----> Send to all except itself
    });
});
