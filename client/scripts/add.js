// Send a new chat message to the server using an AJAX POST request.
app.send = function(message) {
  $.ajax({
    type: 'POST',
    url: 'https://api.parse.com/1/classes/chatterbox',
    contentType: 'application/json',
    data: JSON.stringify(message)
  });
};

// After the user clicks the submit button, this method is invoked and handles what happens.
// TODO: Potentially update DOM **before** the server gives us an update.
app.handleSubmit = function() {
  var context = this;

  var text = $('#message').val();
  $('#message').val('');
  var sendMessage = {
    username: context.user,
    text: text,
    roomname: context.currentRoom
  }

  context.send(sendMessage);
};