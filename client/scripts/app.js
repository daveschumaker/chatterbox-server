
//////////////////////////////////////
// BACKBONE STUFF
//////////////////////////////////////

var Message = Backbone.Model.extend({

});

var Messages = Backbone.Collection.extend({
  model: Message,
  url: 'https://api.parse.com/1/classes/chatterbox',
  parse: function(response, options) {
    // console.log('response from parse method:');
    // console.log(response);
    return response.results;
  }
});


var MessageView = Backbone.View.extend({
  template: _.template("<div><%- objectId %></div>"),
  render: function() {
    // console.log(this.template);
    // console.log(this.model.attributes);
    this.$el.html(this.template(this.model.attributes));
    // console.log(this);
    return this.$el;
    // console.log(this.model.attributes);
  }
});

var MessagesView = Backbone.View.extend({
  initialize: function() {
    this.collection.on('sync', this.render, this);
    this.collection.fetch();
  },
  render: function() {
    //this, in this case, is the 
    this.collection.forEach(this.renderMessage, this);
  },
  renderMessage: function (message) {
    // ??? call template function somehow
    var messageView = new MessageView({ model: message });
    // messageView.render();
    
    this.$el.append(messageView.render());
    // console.log(messageView);
    // console.log(this);
  }
});




//////////////////////////////////////
// JQUERY STUFF
//////////////////////////////////////


//to execute on load
$(document).ready(function() {
  
  //app.init();

  setInterval(function() {
    //console.log('Loading. . . . ');
    //app.fetch();
  }, 5000);
}); 


// Global variables
var app = {};
app.user = 'Captain Fancy Pants III';
app.beersDaveOwes = 1; // This is a lie.
app.beersHarryOwes = 0;
app.chatStorage = {}; // Stores ALL chat messages we've recevied since the page loaded. (Useful for filtering between rooms)
app.chatKeyList = []; // Store ObjectId keys from chat messages to properly sort and display messages in the DOM.
app.chats = {}; // Real time updated list of the chats we've received from the server.
app.displayed = []; // Push ObjectID of chat messages here so we can make sure we aren't posting duplicates.
app.rooms = {}; // Build and store our list of chatrooms. TODO: Make this work.
app.currentRoom = null; // Stores the current room that we'll pass into our chat iterator

app.init = function() {
  var context = this;

  this.fetch();
  
  // Event handling for clicking on username
  $('.username').on('click', function() {
    context.addFriend();
  });

  // Event handling for submit buttom
  $('#send .submit').on('click',function(e) {
    e.preventDefault();
    context.handleSubmit();
  });

  // Create a new chatroom
  $('#createRoom').on('click', function() {
    app.currentRoom = prompt("Create a new room:");
    $('#rooms').append('<option id="' + app.roomname + '">' + app.roomname + '</option>');
  });

  //set username
  $('#setUser').on('click', function() {
    app.user = prompt("Choose your username:");
  });  

  $('#rooms').change(function() {
    context.currentRoom = $(this).find('option:selected').text();
    if (context.currentRoom === 'All Rooms') {
      context.currentRoom = null;
    }
    $('#chats').html('');
    // app.firstLoad = true;
    app.displayed = [];
    app.displayChats();
    console.log(context.currentRoom);
  });
};


app.clearMessages = function() {
  $('#chats').html('');
};

app.addRoom = function(room) {
  $('#roomSelect').append('<div>' + room + '</div>');
};

app.addFriend = function(message_obj) {
  // var username = message_obj.username;
  return true;
};


//utility funcs
var sanitize = function(input) {
  if (input === null) {
    input = '';
  }

  var output = input === undefined ? undefined : input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
    replace(/<[\/\!]*?[^<>]*?>/gi, '').
    replace(/<style[^>]*?>.*?<\/style>/gi, '').
    replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
  
  return output;
};







