require('jquery');
require('tether');
require('bootstrap');

console.log('hohoho');

$( document ).ready(function() {
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tooltip"]').tooltip();
    $( 'button.bd-toggle-animated-progress' ).click(function() {
        $( this ).prev().children( '.progress-bar' ).toggleClass( 'progress-bar-animated' );
    });
    $('.display-4').css('color', 'blue')
});
