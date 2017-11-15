import $ from 'jquery';
import plugin from './plugin';

class Menu {
  constructor(element, options) {
    // const animEndEventNames = {
    //   WebkitAnimation: 'webkitAnimationEnd',
    //   OAnimation: 'oAnimationEnd',
    //   msAnimation: 'MSAnimationEnd',
    //   animation: 'animationend',
    // };
    const $element = $(element);
    const $menu = this.$element.children('ul.menu__list');
    const $menuItems = $menu.find('li:not(.menu__item--back)').children('a');
    const $subMenu = $menu.find('ul.sub-menu');
    let $menuItemIndex;

    $subMenu.prepend('<li class="menu__item menu__item--back"><a href="#" class="menu__link">back</a></li>');

    const $back = $menu.find('li.menu__item--back').children('a');

    // const animEndEventName = `${animEndEventNames.animation}.menu`;

    Array.from($element.find('ul')).forEach((el) => {
      const $menuList = el;
      $menuItemIndex = $($menuList).children('li').length;

      $($menuList).addClass(`child-items-${$menuItemIndex}`);
      return $menuItemIndex;
    });

    $('.has-children').children('a').on('click', function(event){
  		//prevent default clicking on direct children of .has-children
  		event.preventDefault();
  		var selected = $(this);
  		selected.next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('move-out');
  	});

    // $menuItems.on('click.menu', (event) => {
    //   event.stopPropagation();
    //
    //   const $link = $(event.target);
    //   const $item = $link.parent();
    //   const $submenu = $link.siblings('ul.sub-menu');
    //
    //   if ($submenu.length > 0) {
    //     const $flyin = $submenu.clone().insertAfter($menu);
    //     const onAnimationEndFn = () => {
    //       console.log(animEndEventName);
    //       $menu.off(animEndEventName).removeClass('animate-out').addClass('sub-view');
    //       $item.addClass('sub-view--open').parents('.sub-view--open:first').removeClass('sub-view--open').addClass('sub-view');
    //       $flyin.remove();
    //     };
    //
    //     setTimeout(() => {
    //       $flyin.addClass('animate-in');
    //       $menu.addClass('animate-out');
    //       console.log(animEndEventName);
    //       $menu.on(animEndEventName, onAnimationEndFn());
    //
    //       // onAnimationEndFn.call();
    //
    //       options.onLevelClick($link, $link.text());
    //     });
    //   } else {
    //     options.onLinkClick($link, event);
    //   }
    // });
    //
    // $back.on('click.menu', (event) => {
    //   const $this = $(event.target);
    //   const $submenu = $this.parents('ul.sub-menu:first');
    //   const $item = $submenu.parent();
    //   const $flyin = $submenu.clone().insertAfter($menu);
    //   const onAnimationEndFn = () => {
    //     console.log(animEndEventName);
    //     $menu.off(animEndEventName).removeClass('animate-in');
    //     $flyin.remove();
    //   };
    //
    //   setTimeout(() => {
    //     $flyin.addClass('animate-out');
    //     $menu.addClass('animate-in');
    //     console.log(animEndEventName);
    //     $menu.on(animEndEventName, onAnimationEndFn());
    //
    //     // onAnimationEndFn.call();
    //
    //     $item.removeClass('sub-view--open');
    //
    //     const $subview = $this.parents('.sub-view:first');
    //     if ($subview.is('li')) {
    //       $subview.addClass('sub-view--open');
    //     }
    //     $subview.removeClass('sub-view');
    //   });
    //
    //   return false;
    // });
  }
}

// Menu.DEFAULTS = {
//   onLevelClick(el, name) { return false; },
//   onLinkClick(el, ev) { return false; },
// };

plugin('Menu', Menu);
