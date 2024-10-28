const express = require('express') //  Import express [1]
const app = express() // calling express [2]
const http = require('http').createServer(app) // Import http module [4] //  passing the express in the server [5]

const PORT = process.env.PORT || 3000 //  addig port [3]

//Listening on the port
http.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
    
})

app.use(express.static(__dirname + '/public')) // [7]

//creating route [6]
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// socket

const io = require('socket.io')(http)  // calling the soket.io and passing the http server here[8]
io.on('connection', (socket) => {
    console.log('connected...');
    socket.on('message', (msg) => { // listening the event sending from the client side [26] // the event name is "message" in client.js
        //console.log(msg); // send this message to  all connected clients (browsers) [27]
        socket.broadcast.emit('message', msg) // msg is the data
        

    })


})
// now go to the client.js and recive the data