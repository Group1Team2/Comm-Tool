// Express and SocketIO boilerplate
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Client = require('node-rest-client').Client;
var os = require('os');
var util = require('util');

var client = new Client();

var ip_address = os.networkInterfaces()['eth1'][0].address;

var msg_endpoint = util.format('http://%s/api/messages/', ip_address);

var message_template = {

	"data": {
		"at_message": false, 
		"room": util.format("http://%s/api/rooms/1/", ip_address), 
		"user": util.format("http://%s/api/users/1/", ip_address)
	},

	"headers": { "Content-Type": "application/json" }   
}

// WebSocket stuff
var rooms = ["room1", "room2"];
var namespaces = [];
rooms.forEach(function(aRoom) {
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
