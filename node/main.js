// Express and SocketIO boilerplate
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Client = require('node-rest-client').Client;
var os = require('os');
var util = require('util');
var _ = require('lodash');

var client = new Client();

// We should stash the username (ID?) of everyone connected to the global namespace here
var users = [];

var global_namespace = io.of('/');
global_namespace.on('connection', function(socket){
	var user;
	socket.on('user', function(msg) { 
		console.log(msg);
		user = msg.username;
		users.push(user);
		global_namespace.emit('user', {'username': user, 'action': 'connected' });
		console.log( util.format('%s connected', user) );
	});
	socket.on('disconnect', function(){
		users.pop(user);
		console.log( util.format('%s disconnected', user) );
		global_namespace.emit('user', {'username': user, 'action': 'disconnected' });
	})
});


// Make a REST call to get the currently connected users

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/users', function(req,res){
	res.header
	res.send(_.unique(users));
});


var room_url = 'http://localhost/api/rooms/?format=json';
client.get(room_url,function(data,response){
	namespaces = {}; 
	data.forEach(function(room){
		namespaces[room.id] = io.of(util.format('/%s', room.id))
		.on('connection', function(socket) {
			// console.log(util.format('someone connected to %s', room.id));
			socket.on('msg',function(msg){
				namespaces[room.id].emit('msg', msg);
				messages.save(room.id, util.format('%s: %s', msg.username, msg.value));
			});

			socket.on('disconnect',function(){
				// console.log(util.format('someone disconnected from %s', room.id ));
			});

		});
	});

});

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
