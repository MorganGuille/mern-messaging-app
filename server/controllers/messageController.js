const socketIo = require('socket.io');

let io;

exports.initSocket = (server) => {

    console.log('calling initSocket')

    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(socket.id, 'A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        socket.on('sendMessage', (message) => {

            console.log('Message received:', message.content);
            // console.log('senderID:', message.senderID);

            io.emit('receiveMessage', message); // Broadcast to all connected clients
        });
    });
};
