$(document).ready(function(){

  $.get("room", function(){

  });

  $("#sendmessage input").focus(function() {
    if ($(this).val() == "Send message...") {
      $(this).val("");
    }
  });
  $("#sendmessage input").focusout(function() {
    if ($(this).val() == "") {
      $(this).val("Send message...");
    }
  });

});
