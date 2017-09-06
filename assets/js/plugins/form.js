(function formFactory() {
  const $form = document.getElementById('form');
  const $inputs = document.getElementsByClassName('form__input');

  function textInputFocusHandler(element) {
    element.classList.remove('empty');
  }

  function textInputChangeHandler(element) {
    if (element.value === '') {
      element.classList.add('empty');
    } else {
      element.classList.remove('empty');
    }
  }

  function formSubmit(element, event) {
    Array.from($inputs).forEach(() => {
      if (element.value === '') {
        event.preventDefault();
        $form.classList.add('error');
      } else if (element.value !== '') {
        $form.classList.remove('error');
      }
    });
  }

  Array.from($inputs).forEach((element) => {
    element.classList.add('empty');
    element.addEventListener('focus', textInputFocusHandler.bind(null, element), false);
    element.addEventListener('input', textInputChangeHandler.bind(null, element), false);
    element.addEventListener('blur', textInputChangeHandler.bind(null, element), false);
  });

  if ($form) {
    $form.addEventListener('submit', (event) => {
      formSubmit($inputs, event);
    });
  }
}());
