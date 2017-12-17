var express = require('express')

// App Setup
var app = express()
var server = app.listen(4000, function(){
    console.log('Listening on port 4000')
})

//static files
// This means, express is gona say its gona look for 'public' folder and if it finds any resources in 'public' folder, its gona send to browser.
app.use(express.static('public'))
