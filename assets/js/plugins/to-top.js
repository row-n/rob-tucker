// var $window = $(window),
//     $body = $('body'),
//     $backToTop = $('.back-to-top'),
//     offset = 300,
//     offsetOpacity = 1200,
//     scrollTopDuration = 700;

// // Back to top
// $window.scroll(function(){
//   ( $(this).scrollTop() > offset ) ? $backToTop.addClass('is-visible') : $backToTop.removeClass('is-visible fade-out');
//   if( $(this).scrollTop() > offsetOpacity ) {
//     $backToTop.addClass('fade-out');
//   }
// });

// $backToTop.on('click', function(event){
//   event.preventDefault();
//   $body.animate({
//     scrollTop: 0 ,
//     }, scrollTopDuration
//   );
// });

var $body = document.getElementsByTagName('body')[0]
var $backToTop = document.getElementById('back-to-top');

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

window.addEventListener('scroll', function() {
  // console.log(this);
  if (this.offsetTop > offset) {
    $backToTop.classList.toggle('menu-open');
  }
});

$backToTop.addEventListener('click', runScroll, false)
