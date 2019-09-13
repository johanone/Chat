var WebSocketServer = require('websocket').server;
var http = require('http');
var server = http.createServer(function (request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server.listen(1337, function () {
});

// create the server
var wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server

wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function (message) {

        if (message.type === 'utf8') {
            var msg = JSON.parse(message.utf8Data)
            if (msg.content === 'setName') {


                var user = new User(connection, msg.name);
                chatRooms[0].users.push(user);

                var chatRoomNames = chatRooms.map(rooms => {
                    return rooms.chatRoomName;
                });
                var response ={'content': 'chatRoomNames', 'roomNamesArray': chatRoomNames};

                user.connection.send(JSON.stringify(response));


            } else if (msg.content === 'setRoom') {

                var oldRoom = chatRooms.find(e => e.chatRoomName === msg.oldRoom);
                var newRoom = chatRooms.find(e => e.chatRoomName === msg.newRoom);
                let user = oldRoom.users.find(e =>   e.userName === msg.name);
                chatRooms = chatRooms.filter(e => e !== user);
                newRoom.users.push(user);


            } else if (msg.content === 'message') {

                let chatRoom = chatRooms.find(e => e.chatRoomName === msg.room);

                chatRoom.users.forEach(user => {
                    user.connection.send(JSON.stringify(msg))
                })
            }
        }
    });

    connection.on('close', function (connection) {
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



class User {
    constructor(connection, userName) {
        this.connection = connection;
        this.userName = userName;
    }
}

