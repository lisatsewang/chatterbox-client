window.friends = {};

var getUrlParameter = function(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i ++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam ) {
      return sParameterName[1];
    }
  }
};

var ajaxGet = function(successFunction) {
  $.ajax({
          url: "https://api.parse.com/1/classes/chatterbox",
          type: "GET",
          success: function(data) {
            successFunction(data);
          },
          error: function(data) {console.log("get failed!"); }
        });
};

var ajaxPost = function(message) {
  $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
};

var displayRoomMessage = function(data) {
  var selectedRoom = getUrlParameter("roomname");
  $(".messageBoard").empty();
  for (var i = 0; i < data.results.length; i++) {
    var room = data.results[i].roomname;
    if (selectedRoom === room) {
      var username = document.createTextNode(data.results[i].username);
      var text = document.createTextNode(data.results[i].text);
      var userDiv = $("<div class='userDiv'></div>");
      var textDiv = $("<div class='textDiv'></div>");
      var messageDiv = $("<div class='messageDiv'></div>");
      userDiv.append(username);
      textDiv.append(text);
      messageDiv.append(userDiv);
      messageDiv.append(textDiv);
      $(".messageBoard").prepend(messageDiv);
    }
  }
  $('#roomName').append($('<option>', {
    value: selectedRoom,
    text: selectedRoom
  }));
};

var displayAllMessage = function(data) {
  var roomObj = {};
  for (var i = 0; i < data.results.length; i++) {
    var username = document.createTextNode(data.results[i].username);
    var text = document.createTextNode(data.results[i].text);
    var userDiv = $("<div class='userDiv'></div>");
    var textDiv = $("<div class='textDiv'></div>");
    var messageDiv = $("<div class='messageDiv'></div>");
    userDiv.append(username);
    textDiv.append(text);
    messageDiv.append(userDiv);
    messageDiv.append(textDiv);
    $(".messageBoard").prepend(messageDiv);
    

    var room = data.results[i].roomname;
    if (!roomObj.hasOwnProperty(room)) {
      roomObj[room] = true;
      $('#roomName').append($('<option>', {
       value: room,
       text: room
      }));
      console.log(room);
    }
  }
};

var displayBoldedFriendMessage = function() {
  $('.userDiv').each(function(){
   var user = $(this).text()
   if (window.friends.hasOwnProperty(user)) {
    $(this).addClass('friends');
   }
  })
};

var submitMessage = function(roomName, displayMessage) {
  var username = $("input[name=username]").val();
  var text = $("input[name=message]").val();
  var message = {
    username: username,
    text: text,
    roomname: roomName
  }
  
  ajaxPost(message);

  ajaxGet(displayMessage);
};














