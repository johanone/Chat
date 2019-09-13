
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

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function(message) {

        if (message.type === 'utf8') {
            console.log(message.utf8Data.content);
            var msg= JSON.parse(message.utf8Data)
            console.log(msg);
            if (msg.content==='setName') {
                console.log('test');

                var user = new User(connection, msg.name);
                chatRooms[0].users.push(user);

                var chatRoomNames = chatRooms.map(rooms => {
                    return rooms.chatRoomName;
                });
                console.log('chatRoomNames:' + chatRoomNames);
                var response = ({content: 'chatRoomNames', roomNamesArray: chatRoomNames});
                console.log( response);
                user.connection.sendUTF(JSON.stringify(response).utf8Data);


                console.log(chatRoomNames);
            } else if(msg.content==='setRoom'){

            } else if(msg.content === 'message'){

                let chatRoom = chatRooms.find(e => e.chatRoomName === msg.room);
console.log(chatRoom)
                console.log('Received Message: ' + message.utf8Data);
                chatRoom.users.forEach(user => {
                    user.connection.sendUTF(message.utf8Data)
                })
            }
        }
    });

    connection.on('close', function(connection) {
        console.log('connection closed');
    });
});


class ChatRoom {
    constructor(chatRoomName) {
        this.chatRoomName = chatRoomName;
        this.users = [];
    }
}

var chatRooms = [new ChatRoom("World Chat"), new ChatRoom("Second Chat"), new ChatRoom("Third Chat")];
console.log(chatRooms[0].chatRoomName);


class User {
    constructor(connection, userName) {
        this.connection = connection;
        this.userName = userName;
    }
}

