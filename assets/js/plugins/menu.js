var $body = document.getElementsByTagName('body')[0];
var $trigger = document.getElementById('trigger');

// Menu trigger
function classToggle() {
  $body.classList.toggle('menu-open');
}

$trigger.addEventListener('click', classToggle, false);