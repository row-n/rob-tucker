import $ from 'jquery';
import plugin from './plugin';

class Menu {
  constructor(element) {
    const $element = $(element);

    Array.from($element.find('ul')).forEach((el) => {
      const $menuList = el;
      const $menuItems = $($menuList).children('li').length;

      $($menuList).addClass(`child-items-${$menuItems}`);
    });
  }
}

Menu.DEFAULTS = {};

plugin('Menu', Menu);
