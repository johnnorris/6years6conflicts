const $hero = $('.conflict--hero');
const origUrl = $hero.css('backgroundImage');
const heroUrl = origUrl.replace('/img/', '/img/hero/');

$.ajax({
  url: heroUrl.replace('url("', '').replace('")', ''),
  success: function () {
    $hero.css('backgroundImage', heroUrl + ', ' + origUrl);
  }
});