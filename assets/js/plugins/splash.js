(function splashFactory() {
  const $mouse = document.getElementById('mouse');
  const offset = 10;

  // helper function
  function $$(selector, context) {
    const newContext = context || document;
    const elements = newContext.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
  }

  function scrollSplash() {
    const $splash = $$('.splash');
    const scrollObject = {
      x: window.pageXOffset,
      y: window.pageYOffset,
    };

    Array.from($splash).forEach((el) => {
      const $element = el;
      const limit = $element.offsetTop + $element.offsetHeight;

      if (scrollObject.y > $element.offsetTop && scrollObject.y <= limit) {
        const scrollOffset = (scrollObject.y - $element.offsetTop) / 1.5;
        $element.style.backgroundPositionY = `-${scrollOffset}px`;
      } else {
        $element.style.backgroundPositionY = '0';
      }
    });

    if (scrollObject.y >= offset) {
      if ($mouse) {
        $mouse.classList.remove('is-visible');
      }
    } else if (scrollObject.y < offset) {
      if ($mouse) {
        $mouse.classList.add('is-visible');
      }
    }
  }

  window.addEventListener('scroll', () => {
    scrollSplash();
  }, false);
}());
