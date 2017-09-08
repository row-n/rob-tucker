(function scrollTopFactory() {
  const $body = document.getElementsByTagName('body')[0];
  const $backToTop = document.getElementById('back-to-top');
  const offset = 300;
  const scrollTopDuration = 700;
  const debounceWait = 25;
  let scrollObject = {};

  function debounce(func, wait, immediate, args) {
    let timeout;
    return () => {
      const context = this;
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    const thisElement = element;
    const elementScroll = thisElement.scrollTop;
    const difference = to - elementScroll;
    const perTick = (difference / duration) * 20;


    setTimeout(() => {
      thisElement.scrollTop += perTick;
      if (elementScroll === to) return;
      scrollTo(thisElement, to, duration - 10);
    }, 10);
  }

  function runScroll() {
    scrollTo($body, 0, scrollTopDuration);
  }

  const getScrollPosition = debounce(() => {
    scrollObject = {
      x: window.pageXOffset,
      y: window.pageYOffset,
    };

    if (scrollObject.y >= offset) {
      $backToTop.classList.add('is-visible');
    } else if (scrollObject.y < offset) {
      $backToTop.classList.remove('is-visible');
    }
  }, debounceWait);

  $backToTop.addEventListener('click', runScroll, false);
  window.addEventListener('scroll', getScrollPosition, false);
}());
