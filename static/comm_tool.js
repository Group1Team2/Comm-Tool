// global state variables
global_room_list = [];
global_user_list = [];

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


var mobile_nav = {
  'message': function() {
    $('div.sidebar').addClass('hidden-xs');
    $('div.message').removeClass('hidden-xs');
  },
  'sidebar': function() {
    $('div.message').addClass('hidden-xs');
    $('div.sidebar').removeClass('hidden-xs');
  }
}

function switch_room(target_room){

  // Mobile navigation
  mobile_nav.message();

  global_room_list.results.forEach( function(room){

    var room_num = 'room-' + room.id;
    if (room_num === target_room) {
      $('div.messagecontent').filter('#' + room_num).show();
      $('div#room-list a').filter('#' + room_num).attr('class', 'list-group-item room-link active');
    } else {
      $('div.messagecontent').filter('#' + room_num).hide();
      $('div#room-list a').filter('#' + room_num).attr('class', 'list-group-item room-link');
    }

  });

}

function populate_room_list() {
  $.getJSON('http://' + server_host + '/api/rooms/?format=json', function(data) { 
    global_room_list = data;
    data.results.forEach(function(room) {

      var room_link = $('<a />', {
        'href': '#',
        'id': 'room-' + room.id,
        'class': 'list-group-item room-link',
      })
      .append( $('<span />', {
        'class': 'glyphicon glyphicon-comment padded-icon',
        'ariad-hidden': true
      }))
      .append(room.name)
      .append( $('<span />',{
        'class': 'badge',
        // 'text': 1
      }));

      $('div#room-list').append(room_link)

      // add room to message list
      $('div#message_list').append( $('<div />', {
        'class': 'messagecontent',
        'id': 'room-' + room.id,
        'text': room.id,
      }));

    });

  });
}

function populate_user_list() {
  $.getJSON('http://' + server_host + '/api/users/?format=json', function(data) { 
    global_user_list = data;
    data.results.forEach(function(user) {
      var user_link = $('<li />', {
        'class': user.online ? 'user' : 'user disabled',
        'html': 
        $('<a />', {
          'href': '#'
        })
        .append( $('<span />', {
          'class': 'glyphicon glyphicon-user padded-icon'
          })).append(user.name)
      })

      $('ul.user_list').append(user_link);

    });
  });
}


// MAIN
$(document).ready(function(){

  populate_room_list();
  populate_user_list();

  $('div#room-list').on('click', 'a', function(){ switch_room( $(this).attr('id') ) } );

  mobile_nav.sidebar();

});