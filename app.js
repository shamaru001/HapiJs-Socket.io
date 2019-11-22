'use strict';
const Hapi = require('@hapi/hapi');
const Path = require('path');
const init_socket = require('./socket');

const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});

async function initServer(){
    //Register inert plugin (to response files).
    await server.register(require('inert'));
    //starting server
    await server.start();
    //info about server
    console.log('Server running on %s', server.info.uri);
    //Init Socket.IO
    init_socket(server);

    //handle exception
    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    });

    //root route
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return h.file('index.html');
        }
    });
}

//Init hapijs Server
initServer();
