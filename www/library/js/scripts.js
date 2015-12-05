(function($)	{

	$(document).ready(function() {
		
		$(document).on('click','.begin-btn', function(e) {
			e.preventDefault();
			$('.main-logo').addClass('logo-click');
			$('.begin-btn').addClass('begin-none');
		});
	});
})(jQuery);