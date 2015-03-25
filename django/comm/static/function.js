

  var server_host = window.location.hostname;

  var socket = io('http://' + server_host + ':3000/Test');

  // This is temporary code to test the namespaces
  // Get the rooms from the API
  var promptMessage = "These are your possible rooms: ";
  var roomName;
  //promptMessage = promptMessage + " big room";
  $.getJSON('http://' + server_host + ':8000/api/rooms/?format=json', function(theseRooms) {
    theseRooms.results.forEach(function(newRoom) {
      //promptMessage += newRoom.name;
      //var aMessage = prompt("This works");
        roomName = newRoom.name;
        promptMessage = promptMessage + "\n" + roomName;
      //var aMessage = prompt(promptMessage);
    });
  });

  //var thisNameSpace = prompt("Please enter '1' or '2'. One is for Test. Two is for Another Room. Cancelling or nonsense puts you in Test.", "1");
  var thisNameSpace = prompt(promptMessage);
  
  if (thisNameSpace != "2") {
    var socket = io('http://' + server_host + ':3000/Test');
  }
  else {
    var socket = io('http://' + server_host + ':3000/Another Room');
  }

  var username = random_user();

  function _b() { 
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
