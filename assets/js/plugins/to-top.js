const $body = document.getElementsByTagName('body')[0];
const $backToTop = document.getElementById('back-to-top');
const offset = 300;
const scrollTopDuration = 700;
let scrollObject = {};

function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  const elementScroll = element.scrollTop;
  const difference = to - elementScroll;
  const perTick = (difference / duration) * 20;


  setTimeout(() => {
    element.scrollTop += perTick;
    if (elementScroll === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

function getScrollPosition() {
  scrollObject = {
    x: window.pageXOffset,
    y: window.pageYOffset,
  };

  if (scrollObject.y >= offset) {
    $backToTop.classList.add('is-visible');
  } else {
    $backToTop.classList.remove('is-visible');
  }
}

function runScroll() {
  scrollTo($body, 0, scrollTopDuration);
}

window.onscroll = () => {
  getScrollPosition();
};
$backToTop.addEventListener('click', runScroll, false);
