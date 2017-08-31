var $form = $('.form');

// Form floating labels
$("input:not([value]), input[value=''], textarea:not([value]), textarea[value='']").addClass('empty');

$('input, textarea').on('input keyup', function() {
    $(this).toggleClass('empty', !Boolean($(this).val()));
});


// Form validation
$form.on('submit', function(e) {

  var hasError = false;

  $('input, textarea').each(function() {
    var $this = $(this);

    if ($this.val() == '') {
      hasError = true;
      $this.parent().addClass('error');
      e.preventDefault();
    } if($this.val() != '') {
      $this.parent().removeClass('error');
    } else {
      return true;
    }
  });
});
