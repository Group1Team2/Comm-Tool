// Express and SocketIO boilerplate
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


// really should switch to a connection pool or something
connection.connect();

// WebSocket stuff
io.on('connection', function(socket) {
	console.log('user connected!');	

	socket.on('disconnect', function(){
		console.log('user disconnected!');
	});

	socket.on('msg', function(msg) {
		console.log(msg);
		io.emit('msg', msg);
	});

});

// Start the server
http.listen(3000, function(){
	console.log('Starting NodeJS server');
	console.log('listening on 3000');
});