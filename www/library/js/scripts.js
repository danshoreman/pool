(function($)	{

	$(document).ready(function() {
		
		$(document).on('click','.begin-btn', function(e) {
			e.preventDefault();
			// welcome page
			$('.main-logo').addClass('logo-click');
			$('.begin-btn').addClass('begin-none');
			
			// add player screen
			$('.add-players').addClass('player-position');
		});
	});
})(jQuery);