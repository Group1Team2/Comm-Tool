// Express and SocketIO boilerplate
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Database stuff
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'demo',
	password: 'demo',
	database: 'comm'
});

// Routes (for API)
// app.get('/', function(req, res) {
// 	res.sendFile('index.html');
// });

// Database test
connection.connect();
connection.query('select * from ChatUser;', function(err, rows, fields) {
	if (err) throw err;
	console.log(rows);
});
connection.end();

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
	console.log('listening on 3000');
});

console.log('yeah!');