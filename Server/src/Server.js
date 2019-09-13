
import User from './User.js';
import ChatRoom from './ChatRoom.js';

var WebSocketServer = require('websocket').server;
var http = require('http');
var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server.listen(1337, function() { });

// create the server
var wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
var worldChat=[];
var secondChat=[];
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    worldChat.push(connection);

    connection.on('message', function(message) {

        if (message.type === 'utf8') {
            console.log(message.utf8Data.content);
            var msg= JSON.parse(message.utf8Data)
            console.log(msg);
            if (msg.content==='setName') {
                console.log('test');

                connection.userName=msg.name;
                console.log(connection);
            }else if(msg.content==='setRoom'){

            }
            console.log('Received Message: ' + message.utf8Data);
            worldChat.forEach(client => {
                client.sendUTF(message.utf8Data)
            })

        }

    });


    connection.on('close', function(connection) {
        console.log('connection closed');
    });
});