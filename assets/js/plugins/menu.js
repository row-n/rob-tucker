const $body = document.getElementsByTagName('body')[0];
const $trigger = document.getElementById('trigger');

// Menu trigger
function classToggle() {
  $body.classList.toggle('menu-open');
}

$trigger.addEventListener('click', classToggle, false);
