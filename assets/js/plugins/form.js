(function formFactory() {
  const $form = document.getElementById('form');
  const $inputs = document.getElementsByClassName('form__input');

  function formSubmit(element, event) {
    Array.from(element).forEach(() => {
      console.log(element);
      console.log(event);
      if (element.value === '') {
        event.preventDefault();
        $form.classList.add('error');
      } else if (element.value !== '') {
        $form.classList.remove('error');
      }
    });
  }

  if ($form) {
    $form.addEventListener('submit', (event) => {
      // event.preventDefault();
      formSubmit($inputs, event);
    });
  }
}());
