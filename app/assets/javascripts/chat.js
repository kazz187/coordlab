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

var get_categoryid2 = function(category_id1) {
  switch(category_id1) {
    case '10':
      return {
        10001: 'コート',
        10002: 'ジャケット',
        10003: 'ダウン',
        10004: 'パーカー',
        10005: 'そのほか'
      };
    case '11':
      return {
        11001: 'ワンピース',
        11002: 'ブラウス',
        11003: 'Tシャツ',
        11004: 'ノースリーブ',
        11005: 'ニット',
        11006: 'カーディガン',
        11007: 'チュニック',
        11008: 'そのほか'
      };
    case '12':
      return {
        12001: 'スカート',
        12002: 'ロングスカート',
        12003: 'ロングパンツ',
        12004: 'ショートパンツ'
      };
    case '13':
      return {
        13001: 'パンプス',
        13002: 'スニーカー',
        13003: 'サンダル',
        13004: 'ブーツ',
        13005: 'そのほか'
      };
    case '14':
      return {
        14001: 'ショルダー',
        14002: 'ボストン',
        14003: 'トート',
        14004: 'リュック',
        14005: 'ハンドバッグ',
        14006: 'クラッチ',
        14007: 'そのほか'
      };
    case '15':
      return {
        15001: 'ネックレス',
        15002: 'ピアス',
        15003: 'リング',
        15004: 'ブレスレット',
        15005: 'ブローチ',
        15006: 'ヘアアクセ',
        15007: 'そのほか'
      };
    case '16':
      return {
        16001: 'ニット帽',
        16002: 'ハット',
        16003: 'キャップ',
        16004: 'そのほか'
      };
    case '17':
      return {
        17001: 'サングラス',
        17002: 'メガネ',
        17003: 'ベルト',
        17004: 'ストール',
        17005: '時計',
        17006: '手袋',
        17007: 'レイングッズ',
        17008: 'レッグウェア',
        17009: 'ポーチ・財布',
        17010: 'そのほか'
      };
    case '18':
      return {
        18001: 'ルームウェア',
        18002: 'ルームシューズ',
        18003: 'アンダーウェア',
        18004: 'そのほか'
      };
    case '20':
      return {
        20001: 'インテリア',
        20002: 'ステーショナリー',
        20003: 'そのほか'
      };
    case '21':
      return {
        21001: '水着',
        21002: '浴衣'
      };
    case '22':
      return {
        22001: 'テキスト',
        22002: 'フレーム',
        22003: '人物',
        22004: '写真',
        22005: 'コラージュ素材'
      };
    default:
      console.warn('undefined category_id1:' + category_id1);
      return {};
  }
}

$(function() {
  $("#message_form_submit").on('click', function() {
    var icon_url = encodeURIComponent('https://pbs.twimg.com/profile_images/592317390/twitter_400x400.png');
    $('div.message-form > form').append('<input name="icon" type="hidden" value="' + icon_url + '">');
  });

  $("#search_iqon_item").on('click', function() {
    var category_id1 = $('select[name="category_id1"]').val();

    var endpoint = '/chat/search/iqon_item?category_id1' + '=' + category_id1;
    $.get(endpoint, function() {
    }).done(function(data) {
      $('#search_items').html('');
      for(var item in data['results']) {
        var item_image = data['results'][item].images.s_image;
        var item_div = $('<div class="item"><img src="' + item_image + '" /></div>');
        item_div.draggable({
          cursor: "move",
          refreshPositions: true,
          helper: 'clone',
          opacity: 0.45,
          revert: 'invalid'
        });
        $("#search_items").append(item_div);
      }
    });
  });

  $("#category_select > select").change(function() {
    $('#category_id2 > option').remove();
    var category_id1 = $('select[name="category_id1"]').val();
    var subcategory_items = get_categoryid2(category_id1);
    var element = '';
    for(item in subcategory_items) {
      element += '<option value="' + item + '">' + subcategory_items[item] + '</option>';
    }
    $("#category_id2").append(element);
  });

});
