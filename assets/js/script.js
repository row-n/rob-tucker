import $ from 'jquery';
import pace from 'pace-progress';

import './plugins/form';
import './plugins/lazy-load';
import './plugins/menu';
import './plugins/to-top';
import './plugins/splash';

pace.start({
  ajax: false,
});

$('#trigger').click(() => $('body').toggleClass('menu-open'));

$('#menu').Menu();
$('#scroll-to-top').ScrollToTop();
$('#splash').Splash();
