module.exports = function(io,socket,users,connections) {
    //Send Message
    socket.on('send message',function(data){
        io.sockets.emit('new message',{msg: data , user : socket.username});
    })

    //Private Message
    socket.on('private message',function(data) {
        connections[data.userSeq].emit('new message',{msg : data.msg , user : socket.username})
    });

    //Typing Message
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',socket.username);
    })

}