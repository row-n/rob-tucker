(function splashFactory() {
  const $header = document.getElementById('header');
  const $mouse = document.getElementById('mouse');
  const offset = 10;
  let scrollObject = {};

  function getScrollPosition() {
    scrollObject = {
      x: window.pageXOffset,
      y: window.pageYOffset,
    };

    if (scrollObject.y >= offset) {
      $header.classList.add('header--sm');
      if ($mouse) {
        $mouse.classList.remove('is-visible');
      }
    } else if (scrollObject.y < offset) {
      $header.classList.remove('header--sm');
      if ($mouse) {
        $mouse.classList.add('is-visible');
      }
    }
  }

  window.addEventListener('scroll', () => {
    getScrollPosition();
  }, false);
}());
