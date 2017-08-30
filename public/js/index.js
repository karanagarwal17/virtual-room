$(document).ready(function(){
    $('#text-field').keypress(function(e){
      if(e.keyCode==13)
      $('#go-button').click();
    });
});

var getRoom = function(){
  var url = $('#text-field').val();
  console.log(url);
  $('#text-field').val("");
  $.post("room", {url: url} ,function(room){
    console.log("Sent successfully " + url);
    console.log(room);
    window.location.href = "room.html?id=" + room._id;
  });
}
