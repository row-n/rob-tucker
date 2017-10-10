import $ from 'jquery';
import plugin from './plugin';

class Menu {
  constructor(element) {
    const $element = $(element);
    const $menu = $element.children('ul');
    const $subMenu = $menu.find('ul');
    let $menuItems;

    Array.from($element.find('ul')).forEach((el) => {
      const $menuList = el;
      $menuItems = $($menuList).children('li').length;

      $($menuList).addClass(`child-items-${$menuItems}`);
      return $menuItems;
    });

    if ($subMenu) {
      Array.from($subMenu).forEach((el) => {
        const $subMenuTrigger = $(el).siblings();

        $subMenuTrigger.on('click', (event) => {
          event.preventDefault();
          $menu.find('> li > a').addClass('animate-out');
          $subMenu.show().animate({ left: '0' });
          $subMenu.find('> li > a').addClass('animate-in');
          for (let i = 0; i <= $menuItems; i += 1) {
            console.log(this);
          }
          setTimeout(() => {
            // $menu.find('> li > a').removeClass('animate-out').addClass('is-hidden');
            // $subMenu.find('> li > a').removeClass('animate-in').addClass('is-visible');
          }, 1000);
        });
      });
    }
  }
}

Menu.DEFAULTS = {};

plugin('Menu', Menu);
