const users = [];
const message = [];

module.exports = (client, io) => {

    client.on('new_message', (data) => {
        message.push(data);
        io.emit('new_message', data);
    });

    // client.on('get_messages', (data) => {
    //     io.emit('new_message', message.slice(-1, -10));
    // });

    io.emit('users', users);

    client.on('disconnect', () => {
        console.log(`disconnect`);
    });

    client.on('new_user', (username, next) => {
        if (users.indexOf(username) > -1) {
            next(false);
        } else {
            users.push(username);
            io.emit('users', users);
            next(true);
        }
    });
};
