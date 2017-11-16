import $ from 'jquery';
import plugin from './plugin';

class Menu {
  constructor(element) {
    const $element = $(element);
    const $body = $('body');
    const $trigger = $('#trigger');
    const $menu = $element.children('ul.menu__list');
    const $subMenu = $element.find('ul.sub-menu');
    const $hasSubMenu = $element.find('.menu__item--has-children').children('a');
    let $menuItemIndex;

    $subMenu.prepend('<li class="menu__item menu__item--back"><a href="#" class="menu__link">back</a></li>');

    const $back = $menu.find('li.menu__item--back').children('a');

    $trigger.click(() => {
      $body.toggleClass('menu-open');
      $menu.removeClass('animate-out');
      $subMenu.removeClass('animate-in');
    });

    Array.from($element.find('ul')).forEach((el) => {
      const $menuList = el;
      $menuItemIndex = $($menuList).children('li').length;

      $($menuList).addClass(`menu-list--items-${$menuItemIndex}`);
      return $menuItemIndex;
    });

    $hasSubMenu.on('click', (event) => {
      event.preventDefault();
      const selected = $(event.target);

      $(selected).next('ul').addClass('animate-in').end();
      $menu.addClass('animate-out');
    });

    $back.on('click', (event) => {
      const selected = $(event.target);

      $(selected).parents('.sub-menu').removeClass('animate-in');
      $menu.removeClass('animate-out');
    });
  }
}

plugin('Menu', Menu);
