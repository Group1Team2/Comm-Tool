
  function createTeamFunc(){
    
  }
function createteam(){
  $("#myModal").modal('show');
}
function general(){
$('.top_bar_text').text("General");
$('div#sidebar').addClass('hidden-xs');
//$('div#messages_hidden').removeClass('hidden');
//$('div#messages_hidden').addClass('visible-xs');
};
function user_list(){
$('.top_bar_text').text("Userlist");
$('div#sidebar').addClass('hidden-xs');
$('div#messagecontent').addClass('hidden-xs');
//what i wanna do is to change the div#messagecontent into another div but in the same place with all the user in this place.

//$('div#messages_hidden').removeClass('hidden');
//$('div#messages_hidden').addClass('visible-xs');
};
function teamone(){
$('.top_bar_text').text("Team One");
$('div#sidebar').addClass('hidden-xs');
};
function teamtwo(){
$('.top_bar_text').text("Team Two");
$('div#sidebar').addClass('hidden-xs');
};
function teamthree(){
$('.top_bar_text').text("Team Three");
$('div#sidebar').addClass('hidden-xs');
};
function back_to_homepage(){
$('div#sidebar').removeClass('hidden-xs');
}
  var server_host = window.location.hostname;
  var socket = io('http://' + server_host + ':3000');
  var globalNamespace = io('http://' + server_host + ':3000/globalNamespace');
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
  function display() {
  var message = username + " : " + document.getElementById("text").value;
  socket.emit('msg', message);
  $('input#text').val('');
  }

  // Generate random user and room
  function random_user() {
	  var random_index = Math.floor( Math.random() * 100 ) + 1;
	  return "User " + random_index;
  }

  // Generate random user and room
  function add_user() {
	  var this_user = 5;
	  var this_room = 6;
	  var newUserRoom = {
		data: {
			'room': this_user,
			'user': this_room,
		},
		headers: { 'Content-Type': 'application/json' }
	  };
	  globalNamespace.emit('msg', newUserRoom);
  }

  // Add a new message whenever the user presses the enter key
  $(document).keypress(function(e) {
    if(e.which == 13) {
       var x = document.getElementById("text").value;
         display();
       
    }
  });

