// This will act as a 'SERVER'

var express = require('express');
var socket = require('socket.io');

// App Setup
var app = express()
var server = app.listen(4000, function(){
    console.log('Listening on port 4000')
})

//static files
// This means, express is gona say its gona look for 'public' folder and if it finds any resources in 'public' folder, its gona send to browser.
app.use(express.static('public'));

//Socket Setup
var io = socket(server);

// This is listening for event 'connection' [when browser connects to port 4000]
// callback functions parameeter 'socket' is the instance of the socket that got connected.
// Note: To work correctly, you also need to use the same 'socket.io' on client [index.html] :)

io.on('connection', function(socket){
    console.log('successfully made socket connection', socket.id);
});
