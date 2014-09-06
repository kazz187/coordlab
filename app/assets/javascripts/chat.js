var chat = function(attr) {
  var icon = '<img class="icon" width="50" height="50" src="' + decodeURIComponent(attr.icon) + '"/>';
  var name = '<div class="name">' + attr.name + '</div>';
  var message = '<div class="message">' + attr.comment + '</div>';
  var chat_area = $("#chat_area");
  chat_area.append('<li>' + icon + name + message + '</li>');
  console.log(chat_area[0].scrollHeight);
  var chat_div = $('#messages');
  chat_div.animate({scrollTop: chat_div[0].scrollHeight}, 'fast');
}

var coordinate = function(attr) {
  switch(attr.type) {
    case 'create':
      create_item(attr.item_id, attr.item_img, Number(attr.x), Number(attr.y));
      break;
    default:
      break;
  }
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
      var re = /s_item_([0-9]+)$/;
      var item_id = re.exec(ui.draggable.prop('id'))[1];
      var item_img = $('img', ui.draggable).prop('src');
      var base_offset = $('#coord_box').offset();
      var x = ui.position.left - base_offset.left;
      var y = ui.position.top - base_offset.top;
      if ($("#item_" + item_id).length == 0) {
        post_event('create', item_id, item_img, x, y);
      }
    }
  });

  $("#login_submit").on('click', function() {
    $.get('/chat/user?twitter_name=' + $('#twitter_name').val(), function() {
    }).done(function(data) {
      console.log(data);
    });
  });
});

var create_item = function(item_id, item_img, x, y) {
  var img = $('<img class="coord_item" id="item_' + item_id + '" src="' + item_img+ '" />');
  img.css('left', x);
  img.css('top', y);
  $('#coord_box').append(img);
};

var post_event = function(event_type, item_id, item_img, x, y) {
  $.ajax({
    type: "POST",
    url: "/chat/coord",
    data: {
      type: event_type,
      item_id: item_id,
      item_img: item_img,
      x: x,
      y: y
    },
    dataType: "json",
    success: function(data) {
    }
  });
}
