$(function() {
  var $leftPlayer = $('.left-battle-area');
  var leftImagePath = '/images/1.gif';

  $leftPlayer.hide();
  $leftPlayer.css("background-image", "url('" + leftImagePath + "')");
  $leftPlayer.addClass('player-image');
  $leftPlayer.show();

  var $rightPlayer = $('.right-battle-area');
  var rightImagePath = '/images/2.gif';
  $rightPlayer.hide();

  setTimeout(createTargetView, 1000);

  function createTargetView() {
    $rightPlayer.css("background-image", "url('" + rightImagePath + "')");
    $rightPlayer.addClass('player-image');
    $rightPlayer.fadeIn('slow');
    $rightPlayer.addClass('matching-animation');
  }

});