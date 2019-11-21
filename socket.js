//starting socket
const socket_events = require('./socket_events');

module.exports = (server) => {
    const io = require('socket.io')(server.listener);
    //Listen event connection (socket.io).
    io.on("connection",  (client) => {
        socket_events(client, io);
    });
};



