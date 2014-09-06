var chat = function(attr) {
  var icon = '<img class="icon" width="50" height="50" src="' + attr.icon + '"/>';
  var name = '<div class="name">' + attr.name + '</div>';
  var message = '<div class="message">' + attr.comment + '</div>';
  $("#chat_area").append('<li>' + icon + name + message + '</li>');
}

var coordinate = function(attr) {
}

var sse = new EventSource("/chat/stream");
sse.onmessage = function(event) {
    var root_event = JSON.parse(event.data);

    switch(root_event.type) {
      case 'chat':
        chat(root_event.attr);
        break;
      case 'coordinate':
        coordinate(root_event.attr);
        break;
      default:
        console.error('unknown root event');
        break;
    }
};
