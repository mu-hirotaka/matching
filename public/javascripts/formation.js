$(function() {
  var socket = io.connect($('#uri').data('uri'));
  var $formation = $('#formation');
  var $players = $('#players');

  initView();
  initEvent();
  login();

  function initView() {
    var positions = [
      { top: 10, left: 100 },
      { top: 50, left: 30 },
      { top: 50, left: 170 },
      { top: 130, left: 40 },
      { top: 140, left: 100 },
      { top: 130, left: 160 },
      { top: 210, left: 10 },
      { top: 210, left: 190 },
      { top: 220, left: 70 },
      { top: 220, left: 130 },
      { top: 300, left: 100 },
    ];
    _.each(positions, function(item, index) {
      $formation.append('<div id="' + 'position' + (index + 1) + '"></div>' );
      var $position = $('#position' + (index + 1));
      $position.css("background-image", "url('" + '/images/noImage.png' + "')");
      $position.animate({top: item.top, left: item.left });
      $position.addClass('position-image-default formation-player');
    });

    var players = [
      { id: 1, path: '1.gif' },
      { id: 2, path: '2.gif' },
      { id: 3, path: '3.jpg' },
      { id: 4, path: '4.jpg' },
      { id: 5, path: '5.gif' },
      { id: 6, path: '6.gif' },
    ];
    _.each(players, function(item) {
      $players.append('<div id="player' + item.id + '" class="select-player"></div>');
      var $player = $('#player' + item.id);
      $player.css("background-image", "url('/images/" + item.path + "')");
      $player.addClass('position-image-default');
    });
  }

  function initEvent() {
    $('.formation-player').on('click', function() {
      localStorage.setItem('formation-player-id', $(this).attr('id'));
      $('.formation-player').removeClass('shadow');
      $(this).addClass('shadow');
    });

    $('.select-player').on('click', function() {
      var id = '#' + localStorage.getItem('formation-player-id');
      var uri = $(this).css("background-image");
      var $position = $(id);
      $position.css("background-image", uri);
      socket.emit('send player', { id: id, uri: uri });
    });
  }

  function login() {
    socket.emit('login formation', {});
  }
  socket.on('init formation', function(data) {
    var playerPosition = data.position;
    _.each(playerPosition, function(value, key, list) {
      $(key).css("background-image", value);
    });
  });

  socket.on('change player', function(data) {
    $(data.id).css("background-image", data.uri);
  });
});
