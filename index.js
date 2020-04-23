var express = require('express');
var app = express();
var server = require('http').createServer(app);

server.listen(process.env.PORT || 3000);

require('./Server/IoUserRequestsHandler')(server);

app.get('/',function(req, res){
    res.sendFile(__dirname + '/Users/index.html');
})

app.use(express.static('Users'));

