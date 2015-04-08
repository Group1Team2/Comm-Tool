// Express and SocketIO boilerplate
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Client = require('node-rest-client').Client;
var os = require('os');
var util = require('util');

var client = new Client();

var globalNamespace = io.of('/globalNamespace');
globalNamespace.on('connection', function(socket) {
	console.log(util.format('someone connected to global'));

	socket.on('msg',function(msg){
		globalNamespace.emit('msg', msg);
		userroom.save(util.format('%s: %s', msg.user), util.format('%s: %s', msg.room));
	});

	socket.on('disconnect',function(){
		console.log(util.format('someone disconnected from global'));
	});
});

var room_url = 'http://localhost/api/rooms/?format=json';
client.get(room_url,function(data,response){
	namespaces = {}; 
	data.forEach(function(room){
		namespaces[room.id] = io.of(util.format('/%s', room.id))
		.on('connection', function(socket) {
			console.log(util.format('someone connected to %s', room.id));

			socket.on('msg',function(msg){
				namespaces[room.id].emit('msg', msg);
				messages.save(room.id, util.format('%s: %s', msg.username, msg.value));
			});

			socket.on('disconnect',function(){
				console.log(util.format('someone disconnected from %s', room.id ));
			});

		});
	});
});

var userroom = {
	'save': function(user_id, room_id) {
		message_template = {
			data: {
				'room': util.format('http://localhost/api/rooms/%s/', room_id),
				'user': util.format('http://localhost/api/users/%s/', user_id),
			},
			headers: { 'Content-Type': 'application/json' }
		};
		client.post('http://localhost/api/messages/', message_template, function(data,response) {
			console.log( util.format('(%s) Room %s : "%s"', response.statusCode, room_id) );
		});
	}
}

var messages = {
	'save': function(room_id, message) {
		message_template = {
			data: {
				'at_message': false,
				'room': util.format('http://localhost/api/rooms/%s/', room_id),
				'user': util.format('http://localhost/api/users/%s/', 7),
				'text': message 
			},
			headers: { 'Content-Type': 'application/json' }
		};
		client.post('http://localhost/api/messages/', message_template, function(data,response) {
			console.log( util.format('(%s) Room %s : "%s"', response.statusCode, room_id, message) );
		});
	}
}

var rooms = {
	'save': function(name, description, public) {
		message_template = {
			data: {
				'name': name,
				'description': description,
				'public': true 
			},
			headers: { 'Content-Type': 'application/json' }
		};
		client.post('http://localhost/api/messages', message_template, function(data,response) {
			console.log(response.statusCode);
		});
	}
}

// Start the server
http.listen(3000, function(){
	console.log('Starting NodeJS server');
	console.log('listening on 3000');
});
