import $ from 'jquery';
import plugin from './plugin';

class Hero {
  constructor(element, options) {
    const $element = $(element);

    $(window).scroll(() => {
      const $mouse = document.getElementById('mouse');
      const limit = $element.offset().top + $element.outerHeight();
      const scrollObject = {
        x: window.pageXOffset,
        y: window.pageYOffset,
      };

      if (scrollObject.y > $element.offset().top && scrollObject.y <= limit) {
        const scrollOffset = (scrollObject.y - $element.offset().top) / 1.5;
        $element.css({ 'background-position-y': `-${scrollOffset}px` });
      } else {
        $element.css({ 'background-position-y': '0' });
      }

      if (scrollObject.y >= options.offset) {
        if ($mouse) {
          $mouse.classList.remove('is-visible');
        }
      } else if (scrollObject.y < options.offset) {
        if ($mouse) {
          $mouse.classList.add('is-visible');
        }
      }
    });
  }
}

Hero.DEFAULTS = {
  offset: 100,
};

plugin('Hero', Hero);
