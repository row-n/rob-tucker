import $ from 'jquery';
import pace from 'pace-progress';

import './plugins/form';
import './plugins/hero';
import './plugins/lazy-load';
import './plugins/menu';
import './plugins/to-top';

pace.start({
  ajax: false,
});

$('#trigger').click(() => $('body').toggleClass('menu-open'));

$('#menu').Menu();
$('#scroll-to-top').ScrollToTop();
$('#splash').Splash();
