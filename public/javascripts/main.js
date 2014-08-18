$(function() {
  var socket = io.connect($('#uri').data('uri'));
  var $leftPlayer = $('.left-battle-area');
  var $rightPlayer = $('.right-battle-area');
  var $searchBtn = $('.search-target');
  var $spinner = $('#spinner');
  var $heart = $('#heart');

  initView();

  function getPlayerImagePath() {
    var image = ['1.gif', '2.gif', '3.jpg', '4.jpg', '5.gif', '6.gif'];
    return '/images/' + image[Math.floor(Math.random() * image.length)];
  }
  function initView() {
    var myPlayerImagePath = getPlayerImagePath();
    $leftPlayer.hide();
    $leftPlayer.css("background-image", "url('" + myPlayerImagePath + "')");
    $leftPlayer.addClass('player-image');
    $leftPlayer.show();
    $rightPlayer.hide();
    $spinner.hide();
    localStorage.setItem('myPlayerImagePath', myPlayerImagePath);
  }
  function createTargetView(data) {
    var targetPlayerImagePath = data.playerImagePath;
    $spinner.fadeOut('normal');
    $rightPlayer.css("background-image", "url('" + targetPlayerImagePath + "')");
    $rightPlayer.addClass('player-image');
    $rightPlayer.fadeIn('slow');
    $rightPlayer.addClass('matching-animation');
    $searchBtn.fadeTo('normal', 1.0);
  }

  function emitLogin() {
    var myPlayerImagePath = localStorage.getItem('myPlayerImagePath');
    socket.emit('login', { playerImagePath: myPlayerImagePath });
  }

  function showHeart() {
    $heart.fadeIn(2000);
  }

  $searchBtn.on('click', function() {
    $rightPlayer.hide();
    $heart.fadeOut('normal');
    $spinner.fadeIn('normal');
    emitLogin();
    $(this).fadeTo('normal', 0.33);
  });
  socket.on('target player', function(data) {
    createTargetView(data);
    setTimeout(showHeart, 1000);
  });
});
