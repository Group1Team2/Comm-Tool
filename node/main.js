// Express and SocketIO boilerplate
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Client = require('node-rest-client').Client;

var client = new Client();

var msg_endpoint = 'http://localhost:8000/api/messages/'
var room_data_endpoint = 'http://localhost:8000/api/rooms/'

var message_template = {

	"data": {
		"at_message": false, 
		"room": "http://192.168.1.146:8000/api/rooms/1/", 
		"user": "http://192.168.1.146:8000/api/users/1/"
	},

	"headers": { "Content-Type": "application/json" }   
}

// WebSocket stuff
//var rooms = ["room1", "room2"];
var namespaces = [];
client.registerMethod("getRoomData", room_data_endpoint, "GET");
client.methods.getRoomData(function(roomResults, response) {
	//console.log(data);
	//console.log(response);
	roomResults.results.forEach(function(thisRoom) {
		var aRoom = thisRoom.name;
		console.log(aRoom);
		namespaces[aRoom] = io.of('/' + aRoom);
		namespaces[aRoom].on('connection', function(socket) {
			console.log('someone connected to ' + aRoom);

			socket.on('disconnect', function(){
				console.log('someone disconnected from ' + aRoom);
			});

			socket.on('msg', function(msg) {
				namespaces[aRoom].emit('msg', msg);
				message_template.data.text = msg;
				client.post(msg_endpoint, message_template, function(data,response) { console.log(msg) });
			});
		});
	});
});

function broadcast(msg, activeNamespaces) {
	activeNamespaces.forEach(function(aNamespace) {
		aNamespace.emit('msg', msg);
	});
}

// Start the server
http.listen(3000, function(){
	console.log('Starting NodeJS server');
	console.log('listening on 3000');
});