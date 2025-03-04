const socketIo = require('socket.io');
const Messages = require('../models/message')

let io;

const addMsgToDB = async (message) => {
    const addMsg = await Messages.create(message)
    console.log('message added :', addMsg)
}

const dbMessages = async () => {

    let dbmessages = await Messages.find()
    io.emit('receiveMessage', dbmessages)

}

exports.initSocket = (server) => {

    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {

        console.log('A user connected');

        dbMessages()

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        socket.on('sendMessage', (message) => {

            addMsgToDB(message)
            dbMessages()
        });
    });
};
