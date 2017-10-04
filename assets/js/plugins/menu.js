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
        console.log($(el).siblings());

        $(el).siblings().on('click', (event) => {
          event.preventDefault();
          console.log('sib click');
        });
      });
    }
  }
}

Menu.DEFAULTS = {};

plugin('Menu', Menu);
