
module.exports = function(server) {
    var io = require('socket.io').listen(server);
    users = [];
    connections = [];

    io.on('connection',function(socket){
        connections.push(socket);

        socket.on('disconnect',function(data){
            //Disconnect
            users.splice(users.indexOf(socket.username), 1);
            connections.splice(connections.indexOf(socket), 1);
        })

        //new User
        socket.on('new User',function(data,callback) {
            if(users.indexOf(data) != -1) {
                socket.emit("username Taken",{});
                callback(false);
            }
            else {
                callback(true);
                socket.username = data;
                users.push(socket.username);
                io.sockets.emit('get users',users);
            }
        })

        require('./IoMessageRequestHandler')(io,socket,users,connections);
    })
}

