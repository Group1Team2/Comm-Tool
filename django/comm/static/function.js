

  var server_host = window.location.hostname;

  var socket = io('http://' + server_host + ':3000/my-namespace1');
  
  var thisNameSpace = prompt("Please enter '1' or '2'. One is for room1. Two is for room2. Cancelling or nonsense puts you in room1.", "1");
  if (thisNameSpace != "2") {
    var socket = io('http://' + server_host + ':3000/room1');
  }
  else {
    var socket = io('http://' + server_host + ':3000/room2');
  }

  var username = random_user();

       function _b()
       { 
      if(event.keyCode ==13)
      display();
      } 
       
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
  function display() {
    var message = username + " : " + document.getElementById("text").value;
    socket.emit('msg', message);
  }
//input enter to send message too
  function _b(){
   if (event.KeyCode==13)
    display();
}
  // Generate random user
  function random_user() {
    var random_index = Math.floor( Math.random() * 100 ) + 1;
    return "User " + random_index;
  }

