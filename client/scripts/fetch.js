// Initial AJAX request that we send to the server to get our chat data.
app.fetch = function() {
  var context = this;
  $.ajax({
    type: 'GET',
    url: 'https://api.parse.com/1/classes/chatterbox',
    contentType: 'application/json',
    success: function(data) {
      context.chats = data.results;
      context.chats.reverse();
    }
  }).done(function(){
    // After AJAX GET call completes, we invoke the .displayChats() method to iterate through all chat data.
    context.displayChats();
  });
};


// Adds new chat messages to the DOM. This is not used for posting our own texts to the server.
app.addMessage = function(message_obj) {

  var chatElement = '<div class="chat"><span class="username">' + 
        sanitize(message_obj.username) + ': </span><span class="message">' + 
        sanitize(message_obj.text) + '</span><br/><small>' + message_obj.createdAt 
        + '</small><br><small>Room name: ' + sanitize(message_obj.roomname) + '</small></div>';

  $('#chats').prepend(chatElement);
};

// This is our method for iterating through all the chat objects we've received from the server.
// The real work of our app happens here.
// This includes filtering based on rooms, looking for undefined usernames, etc.
app.displayChats = function() {
  var context = this;
  
  $('#chats').html('');

  _.each(this.chats, function(chat) {
    context.getRooms(chat);  
    context.storeChat(chat);
  });

  _.each(context.chatKeyList, function(key) {
    var chat = context.chatStorage[key];
    //TODO: make this filter better..
    if(chat.username !== undefined || chat.username !== '' || chat.username !== null) {

      //if app.currentRoom is null, display all by default
      if(context.currentRoom === null) {
        context.addMessage(chat);
      }

      //if chat.roomname is same as app.currentRoom, then display
      else if(chat.roomname === context.currentRoom) {
        context.addMessage(chat);
      }

    }
  });
};

// Get all rooms from chat objects list
app.getRooms = function(chat) {
  if(chat.roomname === undefined) {
    //do nothing
    return;
  }

  // This updates the "ROOMS" dropdown bar on the top of the page
  if(!this.rooms[chat.roomname]) {
    this.rooms[chat.roomname] = 1;
    $('#rooms').append('<option id="' + chat.roomname + '">' + chat.roomname + '</option>');
  } else {
    this.rooms[chat.roomname]++;
  }
};

// Stores all chats we receive as an object as long as the page hasn't been reloaded.
app.storeChat = function(chat) {
  var context = this;
  if(!context.chatStorage[chat.objectId]) {
    context.chatKeyList.push(chat.objectId);
    context.chatStorage[chat.objectId] = chat;
  }
};



