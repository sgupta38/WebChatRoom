// Make connection

// You might be worried abt 'io' variable. :D
// Note that in out index.html file, initially we are loading the 'socket.io' library which ultimately gives us the 'io' variable.
// Use that variable to connect to the url you want.
var socket = io.connect('http://localhost:4000');
