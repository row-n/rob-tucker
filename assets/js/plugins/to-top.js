(function scrollTopFactory() {
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

  window.addEventListener('scroll', () => {
    getScrollPosition();
  }, false);
  $backToTop.addEventListener('click', runScroll, false);
}());

// (function scrollTopFactory() {
//   this.ScrollTop = function () {
//     // Create global element references
//     this.body = document.getElementsByTagName('body')[0];
//     this.scrollButton = document.getElementById('back-to-top');
//
//     // Define option defaults
//     this.options = {
//       duration: 700,
//       offset: 300,
//     };
//
//     // Initialize our event listeners
//     initializeEvents.call(this);
//   };
//
//   // Public Methods
//
//   ScrollTop.prototype.runScroll = function runScroll(element, to, duration) {
//     if (duration <= 0) return;
//     const elementScroll = element.scrollTop;
//     const difference = to - elementScroll;
//     const perTick = (difference / duration) * 20;
//
//
//     setTimeout(() => {
//       element.scrollTop += perTick;
//       if (elementScroll === to) return;
//       ScrollTop.prototype.runScroll(element, to, duration - 10);
//     }, 10);
//   };
//
//   ScrollTop.prototype.showScroll = function showScroll() {
//     const scrollObject = {
//       x: window.pageXOffset,
//       y: window.pageYOffset,
//     };
//
//     if (scrollObject.y >= this.options.offset) {
//       this.scrollButton.classList.add('is-visible');
//     } else {
//       this.scrollButton.classList.remove('is-visible');
//     }
//   };
//
//   // Private Methods
//
//   function initializeEvents() {
//     if (this.scrollButton) {
//       this.scrollButton.addEventListener('click', this.runScroll.bind(this.body, 0, this.options.duration), false);
//     }
//
//     window.addEventListener('scroll', () => {
//       this.showScroll();
//     }, false);
//   }
// }());
//
// new ScrollTop();
