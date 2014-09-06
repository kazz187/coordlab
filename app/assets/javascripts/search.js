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
  $("#search_iqon_item").on('click', function() {
    var category_id1 = $('select[name="category_id1"]').val();
    var category_id2 = $('select[name="category_id2"]').val();

    var endpoint = '/chat/search/iqon_item?category_id1' + '=' + category_id1;
    if (category_id2 != '') {
      endpoint +='&category_id2=' + category_id2;
    }

    $.get(endpoint, function() {
    }).done(function(data) {
      $('#search_items').html('');
      for(var item in data['results']) {
        var item_obj = data['results'][item];
        var item_div = create_item_div(item_obj);
        $("#search_items").append(item_div);
      }
    });
  });

  $("#category_id1").change(function() {
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

var create_item_div = function(item_obj) {
  var item_image = item_obj.images.s_image;
  var item_div = $('<div id="s_item_' + item_obj.item_id + '" class="item"><img src="' + item_image + '" /></div>');
  item_div.draggable({
    cursor: "move",
    refreshPositions: true,
    helper: 'clone',
    opacity: 0.45,
    revert: 'invalid'
  });
  return item_div;
};
