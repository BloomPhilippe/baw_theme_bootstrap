console.log('hohoho');

$(document).ready(function () {
  $('.carousel').carousel();
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
  $('button.bd-toggle-animated-progress').click(function () {
    $(this).prev().children('.progress-bar').toggleClass('progress-bar-animated');
  });
  $('.display-4').css('color', 'blue')
});
