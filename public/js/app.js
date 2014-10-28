(function($) {

	'use strict';

  $(document).ready(function() {
    $('.nav-menu-trigger').click(function(event) {
      event.preventDefault();
      $('.header').toggleClass('open-menu');
    })
  })

})(jQuery);
