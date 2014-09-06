var sse = new EventSource("/chat/stream");
sse.onmessage = function(event) {
    var new_message = $('<li><img class="icon" width="50" height="50" src="https://pbs.twimg.com/profile_images/592317390/twitter_400x400.png"/><div class="name">KAZZONE</div><div class="message">' + event.data + '</div></li>');
    $("#chat_area").append(new_message);
};
