;(function loadHighResImage() {
  const $hero = $('.conflict--hero');

  if ($hero.length > 0 && $(window).innerWidth() > 600) {
    const origUrl = $hero.css('backgroundImage');
    const heroUrl = origUrl.replace('/img/', '/img/hero/');

    $.ajax({
      url: heroUrl.replace('url("', '').replace('")', ''),
      success: function () {
        $hero.css('backgroundImage', heroUrl + ', ' + origUrl);
      }
    });
  }
}());

;(function selectCurrentPage() {
  let path = window.location.pathname;

  $(`a[href="${path}"]`).addClass('selected');
}());


;(function zoomImage() {
  const $hero = $('.conflict--hero');

  // no point zooming on a low res image
  if ($hero.length > 0 && $(window).innerWidth() > 600) {
    $hero.click(() => $hero.toggleClass('zoom'));
  }
}());

;(function mapClick() {
  $('body').on('mousedown', '.map', function (e) {
    $(this).find('iframe').css('pointer-events','auto');
  });
}());

;(function randomHomeImage() {
  const $header = $('header.home');

  if ($header.length > 0) {
    const conflicts = ['Libya', 'Syria', 'Bahrain', 'Somalia', 'Iraq', 'Burundi'];
    const number = Math.floor(Math.random() * conflicts.length);

    $header.attr('class', `home conflict--${conflicts[number]}`);

    window.setTimeout(randomHomeImage, 1000 * 10);
  }
}());