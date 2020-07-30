const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);


mongoose.connect('mongodb+srv://teste:6Nj3KFU4@cluster0-utkta.mongodb.net/devsmap?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });


const connectedUsers = {};

io.on('connection', socket => {
    console.log(socket.handshake.query);
    console.log('Usuario conectado', socket.id);
    socket.emit('message', 'oi');

    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})




// GET, POST, PUT, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delte)
// req.body = Acessar corpo da requisição (para criação, edição)

//app.use(cors({ origin: 'http://localhost:3333' }));
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

//app.listen(3333);
server.listen(3333);