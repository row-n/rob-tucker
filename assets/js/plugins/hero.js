import $ from 'jquery';
import plugin from './plugin';

class Hero {
  constructor(element, options) {
    const $element = $(element);
    const $mouse = document.getElementById('mouse');
    const splashOffset = $('.splash').offset().top;

    $(window).scroll(() => {
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

    $($mouse).click((e) => {
      e.preventDefault();

      $('html, body').animate({
        scrollTop: splashOffset,
      }, options.speed);
    });
  }
}

Hero.DEFAULTS = {
  offset: 100,
  speed: 500,
};

plugin('Hero', Hero);
