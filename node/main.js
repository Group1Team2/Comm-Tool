// Express and SocketIO boilerplate
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Client = require('node-rest-client').Client;

var client = new Client();

var msg_endpoint = 'http://localhost:8000/api/messages/'

var message_template = {
	"data": {
		"at_message": false,
		"room": "http://192.168.1.146:8000/api/rooms/1/",
	"user": "http://192.168.1.146:8000/api/users/1/"
	},
	"headers": { "Content-Type": "application/json" }
}

// WebSocket stuff
io.on('connection', function(socket) {
	console.log('user connected!');

	socket.on('disconnect', function(){
		console.log('user disconnected!');
	});

	socket.on('msg', function(msg) {
		io.emit('msg', msg);
		message_template.data.text = msg;
		client.post(msg_endpoint, message_template, function(data,response) { console.log(msg) });
	});
});

// Start the server
http.listen(3000, function(){
	console.log('Starting NodeJS server');
	console.log('listening on 3000');
});
