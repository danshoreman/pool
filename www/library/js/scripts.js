(function($)	{

	$(document).ready(function() {
		
		$(document).on('click','.begin-btn', function(e) {
			e.preventDefault();
			// welcome page
			$('.main-logo').addClass('logo-click');
			$('.begin-btn').addClass('begin-none');
			
			 setTimeout(function () {
           $('.loader').addClass('loading');
       }, 700);
       
       
       setTimeout(function () {
          // add player screen
          $('.loader').removeClass('loading');
					$('.add-players').addClass('player-position');
       }, 2500);
			
			
		});
		
		$(document).on('click','.players-title', function(e) {
			// welcome page
			$('.name-entry').slideToggle('fast');
		});
		
	});
})(jQuery);