// Express and SocketIO boilerplate
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Client = require('node-rest-client').Client;
var os = require('os');
var util = require('util');

var client = new Client();

// maybe we don't need to use this?
var ip_address = os.networkInterfaces()['eth1'][0].address;

var msg_endpoint = 'http://localhost/api/messages/';

var message_template = {

	"data": {
		"at_message": false, 
		"room": "http://localhost/api/rooms/1/", 
		"user": "http://localhost/api/users/1/"
	},

	"headers": { "Content-Type": "application/json" }   
}

var room_data;
var room_url = 'http://localhost/api/rooms/?format=json';
client.get(room_url,function(data,response){ 
	data.results.forEach(function(room){
		io.of(util.format('/%s', room.id))
		.on('connection', function(socket) {
			console.log(util.format('someone connected to %s', room.id));
			socket.on('msg',function(msg){
				console.log(util.format('%s : %s', msg.username, msg.value))
				socket.emit('msg', msg)
			});
		});
	});
});

console.log(io.nsps);

	// data.results.forEach(function(room){
	// io.of('/' + room.id).on('connection', function(socket){
	// 	console.log(util.format('someone connected to %s', room.id));
	// 	socket.on('msg', function(msg) {
	// 		io.of('/' + room_id).emit('msg', msg);

// // WebSocket stuff
// var rooms = ["room1", "room2"];
// var namespaces = [];
// rooms.forEach(function(aRoom) {
// 	namespaces[aRoom] = io.of('/' + aRoom);
// 	namespaces[aRoom].on('connection', function(socket) {
// 		console.log('someone connected to ' + aRoom);

// 		socket.on('disconnect', function(){
// 			console.log('someone disconnected from ' + aRoom);
// 		});

// 		socket.on('msg', function(msg) {
// 			namespaces[aRoom].emit('msg', msg);
// 			message_template.data.text = msg;
// 			client.post(msg_endpoint, message_template, function(data,response) { console.log(msg) });
// 		});
// 	});
// });

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
