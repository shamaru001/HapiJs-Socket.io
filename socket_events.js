
function socket_events (client, io) {
    const message = [];

    client.on('new_message', (data) => {
        io.emit('new_message', data);
    });

    client.on('create_room', function(room) {
        client.join(room);
    });

    client.on('disconnect', () => {
        console.log(`connected ${io.sockets.length}`);
    });

    client.on('new_user', ({username, password}, next) => {

    });
}

module.exports = socket_events;