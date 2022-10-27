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
      origin: "https://wheelsapp.netlify.app/",
        // const noOriginHeader = req.headers.origin === undefined;
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

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on port: ${port}`))