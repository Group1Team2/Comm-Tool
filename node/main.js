var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile('index.html');
});

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

http.listen(3000, function(){
	console.log('listening on 3000');
});

console.log('yeah!');