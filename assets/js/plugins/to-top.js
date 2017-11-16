import $ from 'jquery';
import debounce from './debounce';
import plugin from './plugin';

class ScrollToTop {
  constructor(element, options) {
    const $element = $(element);

    $(window).scroll((event) => {
      const scroll = debounce(() => {
        if ($(event.target).scrollTop() > options.offset) {
          $element.addClass('is-visible');
        } else {
          $element.removeClass('is-visible');
        }
      }, 250);

      scroll();
    });

    $element.click((e) => {
      e.preventDefault();

      $('html, body').animate({
        scrollTop: 0,
      }, options.speed);
    });
  }
}

ScrollToTop.DEFAULTS = {
  offset: 300,
  speed: 500,
};

plugin('ScrollToTop', ScrollToTop);
