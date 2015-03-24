

  var server_host = window.location.hostname;

  var socket = io('http://' + server_host + ':3000');

  var username = random_user();
 
  // Get the messages from the API and add to the page
  $.getJSON('http://' + server_host + ':8000/api/messages/?format=json', function(json) {

    json.results.forEach(function(msg){
      add_message(msg.text);
    });

  });

  // When you receive a message, add it to the page
  socket.on('msg', function(msg){
    add_message(msg);
  });

  function add_message(msg) {
    $('div#messagecontent').append(msg + '<br>');
  }

  // Called when button is clicked
  function send_message() {
    var message = username + " : " + document.getElementById("text").value;
    socket.emit('msg', message);
  }
//input enter to send message too
  function _b(){
   if (event.KeyCode==13)
    send_message();
  }
  // Generate random user
  function random_user() {
    var random_index = Math.floor( Math.random() * 100 ) + 1;
    return "User " + random_index;
  }

function change_team() {
  $('.top_bar_header').text("Team Three");
  $('div#sidebar').removeClass('hidden-xs');
  $('div#messages_hidden').addClass('hidden');
  $('div#messages_hidden').removeClass('visible-xs');
}

$('button#sendcleartext').on('click', send_message());