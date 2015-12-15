(function($)	{

	$(document).ready(function() {
		
		$(document).on('click','.begin-btn', function(e) {
			e.preventDefault();
			// welcome page
			$('.main-logo').addClass('logo-click');
			$('.begin-btn').addClass('begin-none');
			
			 setTimeout(function () {
           $('.loader').addClass('loading');
       }, 500);
       
       
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
		
		$(document).on('click','.kept-life', function(e) {
			// button anim
			$('.player-list .playing-on').addClass('playing-on-in');
		});
		
		$(document).on('click','.lost-life', function(e) {
			// button anim off
			$('.player-list .playing-on').removeClass('playing-on-in');
		});
		
	});
})(jQuery);