const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Public folder ki files serve karna
app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('Ek user jud gaya hai');

    // Jab koi message bhejega, toh wo baaki sabko bhej dega
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnect ho gaya');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server port ${PORT} par chal raha hai`);
});