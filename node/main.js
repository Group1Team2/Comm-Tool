// Express and SocketIO boilerplate
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Client = require('node-rest-client').Client;

var client = new Client();

//store the users online
var users={};

//user login decision
app.get('/',function(req,res){
	if(req.cookies.user==null){
		res.redirect('/signinpage');
	}else{
		//webuser login page
		//res.sendfile('/newpage');
	}
});

app.get('/signin',function(req,res){
	res.sendfile('/signinpage')
});

app.post('/signin',function(req,res)){
	if(users[req.body.name]){
		//if the user has existed, this user is not allowed to login again
		res.redirect('/signin');
	}else{
		res.cookie('user',req.body.name);
		res.redirect('/');
	}
});



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
var server=http.createServer(app);
var io=require.SocketIO.listen(server);
io.on('connection', function(socket) {
	socket.on('online',function(msg){
		socket.name=msg.user;
		
		if(!users[msg.user]){
			users[msg.user]=data.user;
		}
		//emit online message to all users
		io.sockets.emit('online',{users:users,user:data.user}); //confused about what to pass into the function. is it a jquery part?
});

	socket.on('msg', function(msg) {
		message_template.data.text = msg;
		if(data.to=='all'){
			socket.broadcast.emit('msg',msg);
		}else{
			var clients=io.sockets.clients();
			clients.forEach(function(client){
				client.emit('msg',msg);
			})
		}
		
		client.post(msg_endpoint, message_template, function(data,response) { console.log(msg) });
	});

	//if some user log off
	socket.on('disconnect',function(){
		if(users[socket.name]){
			delete users[socket.name];
		socket.broadcast.emit('offline',{users:user,user:socket.name});
	}
});

// Start the server
server.listen(app.get('port', function(){
	console.log('Starting NodeJS server');
	console.log('listening on port'+app.get('port'));
});