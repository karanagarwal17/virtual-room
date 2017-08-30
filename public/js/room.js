$(document).ready(function(){

  var id = document.location.href;
  id = id.split('?')[1].split('=');
  id = id[1];
  var player = videojs("vid1");

  $.get('/room/' + id , function(data){
    var url = data.url;
    player.src({src: url, type: 'video/youtube'});
    player.autoplay(true);
    player.currentTime(data.delay);
    player.play();
  });

  $('#message-content').keypress(function(e){
    if(e.keyCode==13)
    $('#send').click();
  });
});

var username = Math.round(Math.random()*1000000) % 1000000;
var id = document.location.href;
id = id.split('?')[1].split('=');
id = id[1];

var addReply = function(x){
  var element = document.getElementById("chat-messages");
  var html = element.innerHTML;
  html += "<div class=\"message\"><div class=\"img\"></div><div class=\"bubble\">" + x + "</div></div>";
  element.innerHTML = html;
  element.scrollTop = element.scrollHeight;
}
var addMessage = function(x){
  var element = document.getElementById("chat-messages");
  var html = element.innerHTML;
  html += "<div class=\"message right\"><div class=\"img\"></div><div class=\"bubble\">" + x + "</div></div>";
  element.innerHTML = html;
  element.scrollTop = element.scrollHeight;
}
var addLabel = function(x){
  var element = document.getElementById("chat-messages");
  var html = element.innerHTML;
  html += "<label>" + x + "</label>";
  element.innerHTML = html;
  element.scrollTop = element.scrollHeight;
}
var addUsername = function(x){
  var element = document.getElementById("chat-messages");
  var html = element.innerHTML;
  html += "<label class=\"left\">User: " + x + "</label>";
  element.innerHTML = html;
  element.scrollTop = element.scrollHeight;
}
var sendMessage = function(){
    var msg = document.getElementById("message-content").value;
    document.getElementById("message-content").value = "";
    if( msg != ""){
      socket.emit('new message', {
        roomId: id,
        message: msg,
        username: username
      });
    }
}

var socket = io.connect('http://localhost:3000/');

socket.on('message created', function(data){
  console.log(data);
  if(data.username == username){
    addMessage(data.message);
  }
  else {
    addUsername(data.username);
    addReply(data.message);
  }
});

socket.on('setup', function(data){
  socket.emit('new user',{
    roomId: id,
    username: username
  });
});

socket.on('user joined', function(data){
  if(data.username == username){
    addLabel("You have joined the chatroom");
  }
  else {
    addLabel("User:" + data.username + " has joined");
  }
});
