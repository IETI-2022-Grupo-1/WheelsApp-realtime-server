// Dependencies
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();

// Enable CORS
app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:3001", "https://wheelsapp.netlify.app/"],
      methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {
    socket.on('newTripAdded', (data) => {
        io.emit('newTrip', {
                data
            })
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});

server.listen(process.env.SERVER_PORT, () => console.log(`Server running on port: ${process.env.SERVER_PORT}`))