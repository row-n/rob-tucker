var $body = document.getElementsByTagName('body')[0]
var $backToTop = document.getElementById('back-to-top');
var scrollObject = {};

var offset = 300;
var scrollTopDuration = 700;

function runScroll() {
  scrollTo($body, 0, scrollTopDuration);
}

function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop == to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

function getScrollPosition() {
  scrollObject = {
    x: window.pageXOffset,
    y: window.pageYOffset
  }

  if(scrollObject.y >= offset) {
    $backToTop.classList.add('is-visible');
  } else {
    $backToTop.classList.remove('is-visible');
  }
}

window.onscroll = function() {
  getScrollPosition();
}
$backToTop.addEventListener('click', runScroll, false)
