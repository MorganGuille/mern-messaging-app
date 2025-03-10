// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const messageController = require('./controllers/messageController');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

async function connecting() {
    try {
        await mongoose.connect(
            `mongodb+srv://morganguille:${process.env.db_password}@mern-messaging-app.2jlaf.mongodb.net/?retryWrites=true&w=majority&appName=mern-messaging-app`
        );
        console.log('Connected to the DB');
    } catch (error) {
        console.log(
            error,
            'ERROR: Seems like your DB is not running, please start it up !!!'
        );
    }
}
connecting();

messageController.initSocket(server);

app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`listening on port : ${PORT}`));