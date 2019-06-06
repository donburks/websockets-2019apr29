$(function() {
  const socket = new WebSocket("ws://localhost:4000");

  socket.onmessage = function(message) {
    const { msg, colour } = JSON.parse(message.data);
    $("<p>").text(msg).css('color', colour).appendTo("#output");
  };

  $("#chat").on('keyup', function(e) {
    const colours = ["red", "green", "blue", "magenta"];
    if (e.keyCode === 13) {
      const msg = $(this).val();
      const colour = colours[Math.floor(Math.random()*4)];
      const payload = { msg, colour };
      socket.send(JSON.stringify(payload));
      $(this).val("");
    }
  });
});
