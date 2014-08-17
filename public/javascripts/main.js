$(function() {
  var $leftPlayer = $('.left-battle-area');
  var $rightPlayer = $('.right-battle-area');
  var $spinner = $('#spinner');
  var leftImagePath = '/images/1.gif';
  var rightImagePath = '/images/2.gif';

  $leftPlayer.hide();
  $leftPlayer.css("background-image", "url('" + leftImagePath + "')");
  $leftPlayer.addClass('player-image');
  $leftPlayer.show();

  $rightPlayer.hide();

  setTimeout(createTargetView, 1000);

  function createTargetView() {
    $spinner.fadeOut('normal');
    $rightPlayer.css("background-image", "url('" + rightImagePath + "')");
    $rightPlayer.addClass('player-image');
    $rightPlayer.fadeIn('slow');
    $rightPlayer.addClass('matching-animation');
  }

});
