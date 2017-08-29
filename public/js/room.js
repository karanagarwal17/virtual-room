$(document).ready(function(){

  var id = document.location.href;
  id = id.split('?')[1].split('=');
  id = id[1];
  console.log(id);
  var player = videojs("vid1");

  $.get('/room/'+id,function(data){
    console.log(data.url);
    var url = 'https://www.youtube.com/watch?v=tbEy9a9aW0Y';
    player.src({src: url, type: 'video/youtube'});
    player.autoplay(false);
    player.currentTime(data.delay);
    //player.play();
  });
});

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

var sendMessage = function(){
    var msg = document.getElementById("message-content").value;
    document.getElementById("message-content").value = "";
    socket.emit('new message', {
      room: 'test',
      message: msg
    });
}

var id = document.location.href;
id = id.split('?')[1].split('=');
id = id[1];

var socket = io.connect('http://localhost:3000/');

socket.on('message created', function(data){
  console.log(data);
  addReply(data.message);
});

socket.on('user joined', function(data){

});
