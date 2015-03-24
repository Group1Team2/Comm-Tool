var server_host = window.location.hostname;

var socket = io('http://' + server_host + ':3000');

var username = random_user();

// // Get the messages from the API and add to the page
// $.getJSON('http://' + server_host + '/api/messages/?format=json', function(json) {

//   json.results.forEach(function(msg){
//     add_message(msg.text, 1);
//   });

// });

// When you receive a message, add it to the page
socket.on('msg', function(msg){
  add_message(msg);
});

function add_message(msg, target) {
  $('div#message_' + target).append(msg + '<br>');
}

// Called when button is clicked
function display() {
  console.log('sending message...');
  var message = {
    'username': get_user_name(),
    'value': $('input#text').val()
  }
  socket.emit('msg', message);
  $('input#text').val('');
}

// Generate random user
function random_user() {
  var random_index = Math.floor( Math.random() * 100 ) + 1;
  return "User " + random_index;
}

// Add a new message whenever the user presses the enter key
$(document).keypress(function(e) {
    if(e.which == 13) {
        display();
    }
});

$.getJSON('http://' + server_host + '/api/rooms/?format=json', function(data) { console.log(data.results) });