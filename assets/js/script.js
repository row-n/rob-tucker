import $ from 'jquery';

import './plugins/form';
import './plugins/lazy-load';
import './plugins/loading';
import './plugins/menu';
import './plugins/to-top';
import './plugins/splash';

$('#trigger').click(() => $('body').toggleClass('menu-open'));
$('#scroll-to-top').ScrollToTop();
$('#splash').Splash();
