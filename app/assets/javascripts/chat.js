var chat = function(attr) {
  var icon = '<img class="icon" width="50" height="50" src="' + decodeURIComponent(attr.icon) + '"/>';
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

$(function() {
  $("#message_form_submit").on('click', function() {
    var icon_url = encodeURIComponent('https://pbs.twimg.com/profile_images/592317390/twitter_400x400.png');
    $('div.message-form > form').append('<input name="icon" type="hidden" value="' + icon_url + '">');
  });
  $('#coord_box').droppable({
    drop: function(ev, ui) {
      console.log(ui.draggable.context.id);
      var re = /s_item_([0-9]+)$/;
      var item_id = re.exec(ui.draggable.prop('id'))[1];
      var item_img = $('img', ui.draggable).prop('src');
      var base_offset = $('#coord_box').offset();
      var x = ui.position.left - base_offset.left;
      var y = ui.position.top - base_offset.top;
      create_item(item_id, item_img, x, y);
    }
  });
});

var create_item = function(item_id, item_img, x, y) {
  var img = $('<img class="coord_item" id="item_' + item_id + '" src="' + item_img+ '" />');
  img.css('left', x);
  img.css('top', y);
  $('#coord_box').append(img);
};
