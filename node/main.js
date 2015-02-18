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


// really should switch to a connection pool or something
connection.connect();

// Routes (for API)

	// get the last 10 posts;
app.get('/old_data', function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	connection.query('select * from ChatMessage order by time limit 10;', function(err, rows, fields){
		if (err) throw err;
		res.json(rows);
	});
});

// Database test
// connection.query('select * from ChatUser;', function(err, rows, fields) {
// 	if (err) throw err;
// 	console.log(rows);
// });
// connection.end();

// WebSocket stuff
io.on('connection', function(socket) {
	console.log('user connected!');	

	socket.on('disconnect', function(){
		console.log('user disconnected!');
	});

	// Glaring SQL injection vulnerability...
	socket.on('msg', function(msg) {
		console.log(msg);
		io.emit('msg', msg);
		connection.query('insert into ChatMessage (message, time, room_id, user_id) values (?, now(), 1, 1);', msg);
	});

});

// Start the server
http.listen(3000, function(){
	console.log('listening on 3000');
});

console.log('yeah!');