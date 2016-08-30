;(function loadHighResImage() {
  const $hero = $('.conflict--hero');

  if ($hero.length > 0 && $(window).innerWidth() > 600) {
    const origUrl = $hero.css('backgroundImage');
    const heroUrl = origUrl.replace('/img/conflicts/', '/img/conflicts/hero/');

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

  if (path === '/tickets/') return;

  $(`a[href="${path}"]`).addClass('selected');
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

;(function handleVideo() {
  const $container = $('.home .video');

  if ($container.length > 0) {
    const $hideVideo = $('.hide-video', $container);
    const $video = $('video', $container);

    if (window.localStorage && typeof window.localStorage.getItem === 'function') {
      if (!window.localStorage.getItem('introSeen')) {
        $hideVideo.show();
        $video.show();
      } else {
        hideVideo(0);
      }
    }

    function hideVideo(speed) {
      $video[0].pause();
      $container.fadeOut(speed);

      if (window.localStorage && typeof window.localStorage.setItem === 'function') {
        window.localStorage.setItem('introSeen', true);
      }
    }

    function fadeOutVideo() {
        if ($video[0].ended) {
          hideVideo(500);
        } else {
          window.setTimeout(fadeOutVideo, 1000);
        }
    }

    fadeOutVideo();

    $hideVideo.click(() => {
      hideVideo(500);
    });

    $('.footer .nav-intro').click(() => {
      if (window.localStorage && typeof window.localStorage.removeItem === 'function') {
        window.localStorage.removeItem('introSeen');
      }
    });
  }
}());