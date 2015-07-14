// YOUR CODE HERE:
$(document).ready(function() {
    //Get data from server


    $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: "GET",
      success: function(data) {
        console.log(data.results);
        var roomObj = {};
        for (var i = 0; i < data.results.length; i++) {
          var username = document.createTextNode(data.results[i].username);
          console.log(username);
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
          }
        }

      },
      error: function(data) {console.log("get failed!"); }
    });

  //change chat room
  $('select').change(function() {
    var roomName = $("#roomName").val();
    var url = "roomIndex.html?roomname=" + roomName;
    window.location = url;
  });



  $('button').click(function() {
    var username = $("input[name=username]").val();
    var text = $("input[name=message]").val();
    var room = $("input[name=room]").val();
    var roomName = $("#roomName").val();
    console.log(roomName);

    var message = {
      username: username,
      text: text,
      roomname: room
    }
    
    //Post message to server
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
    
    // refresh message board
    $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: "GET",
      success: function(data) {
        console.log(data.results);
        for (var i = 0; i < data.results.length; i++) {
          var username = document.createTextNode(data.results[i].username);
          console.log(username);
          var text = document.createTextNode(data.results[i].text);
          var userDiv = $("<div class='userDiv'></div>");
          var textDiv = $("<div class='textDiv'></div>");
          var messageDiv = $("<div class='messageDiv'></div>");
          userDiv.append(username);
          textDiv.append(text);
          messageDiv.append(userDiv);
          messageDiv.append(textDiv);
          $(".messageBoard").prepend(messageDiv);

          //Add rooms to select form:
          var room = data.results[i].roomname
          $('#roomName').append($('<option>', {
            value: room,
            text: room
          }))
          
        }
      },
      error: function(data) {console.log("get failed!"); }
    });

  })

  //Get data from server
})

$("#roomName option").each(function() {console.log($(this).attr('value'))});
