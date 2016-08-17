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

  if (path.endsWith('/')) {
    path = path.substring(0, path.length - 1);
  }

  $(`a[href="${path}"]`).addClass('selected');
}());


;(function zoomImage() {
  const $hero = $('.conflict--hero');

  // no point zooming on a low res image
  if ($hero.length > 0 && $(window).innerWidth() > 600) {
    $hero.click(() => $hero.toggleClass('zoom'));
  }
}());

