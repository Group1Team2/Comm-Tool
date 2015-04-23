// Express and SocketIO boilerplate
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Client = require('node-rest-client').Client;
var os = require('os');
var util = require('util');
var _ = require('lodash');
var multer = require('multer');
var fs = require('fs');
var crypto = require('crypto');

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// file upload
var done = false;

app.use(multer({
	'dest': 'static/uploads',
	onFileUploadStart: function(file) {
		console.log(file.originalname + ' is starting...');
	},
	onFileUploadComplete: function(file) {
		console.log(file.fieldname + ' uploaded to ' + file.path);
		done = true;
	}
}));

app.post('/upload', function(req,res){
	if (done==true) {
		var hash = crypto.randomBytes(20).toString('hex');
		fs.mkdir( util.format('static/uploads/%s', hash), function(){
			var final_path = util.format('static/uploads/%s/%s', hash, req.files.fileUpload.originalname);
			fs.rename(req.files.fileUpload.path, final_path);
			res.send(final_path);
		});
	}
});

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
				messages.save(room.id, util.format('%s: %s', msg.username, msg.value), msg.user_id);
			});

			socket.on('disconnect',function(){
				// console.log(util.format('someone disconnected from %s', room.id ));
			});

		});
	});

});

var messages = {
	'save': function(room_id, message, user_id) {
		message_template = {
			data: {
				'at_message': false,
				'room': util.format('http://localhost/api/rooms/%s/', room_id),
				'user': util.format('http://localhost/api/users/%s/', user_id),
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
