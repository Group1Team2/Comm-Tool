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

var nsp1 = io.of('/my-namespace1');
nsp1.on('connection', function(socket) {
	console.log('someone connected to namespace 1');

	socket.on('disconnect', function(){
		console.log('user disconnected!');
	});

	socket.on('msg', function(msg) {
		nsp1.emit('msg', msg);
		message_template.data.text = msg;
		client.post(msg_endpoint, message_template, function(data,response) { console.log(msg) });
	});
});

var nsp2 = io.of('/my-namespace2');
nsp2.on('connection', function(socket) {
	console.log('someone connected to namespace 2');

	socket.on('disconnect', function(){
		console.log('user disconnected!');
	});

	socket.on('msg', function(msg) {
		nsp2.emit('msg', msg);
		message_template.data.text = msg;
		client.post(msg_endpoint, message_template, function(data,response) { console.log(msg) });
	});
});

// Start the server
http.listen(3000, function(){
	console.log('Starting NodeJS server');
	console.log('listening on 3000');
});