import $ from 'jquery';
import plugin from './plugin';

class Menu {
  constructor(element) {
    const $element = $(element);
    const $subMenu = $element.find('.sub-menu');

    Array.from($element.find('ul')).forEach((el) => {
      const $menuList = el;
      const $menuItems = $($menuList).children('li').length;

      $($menuList).addClass(`child-items-${$menuItems}`);
    });

    if ($subMenu) {
      Array.from($subMenu).forEach((el) => {
        const $subMenuTrigger = $(el).siblings();

        $subMenuTrigger.on('click', (event) => {
          event.preventDefault();
          $(el).show().children('li').addClass('is-visible');
          $element.children().children('li').addClass('is-hidden');
        });
      });
    }
  }
}

Menu.DEFAULTS = {};

plugin('Menu', Menu);
