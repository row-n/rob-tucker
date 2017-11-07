import $ from 'jquery';
import pace from 'pace-progress';

import './plugins/hero';
import './plugins/lazy-load';
import './plugins/menu';
import './plugins/to-top';

pace.start({
  ajax: false,
});

$('#trigger').click(() => $('body').toggleClass('menu-open'));

$('#menu').Menu();
$('#hero').Hero();
$('#scroll-to-top').ScrollToTop();
