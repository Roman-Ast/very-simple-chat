const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const a = 'a';
server.listen(3000);

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

let users = [];
let connections = [];

io.sockets.on('connection', socket => {
  console.log('Успешное подключение');
  connections.push(socket);

  socket.on('disconnect', data => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Успешное отключение');
  });

  socket.on('send mess', data => {
    io.sockets.emit('add mess', { msg: data.mess, name: data.name });
  });
});
