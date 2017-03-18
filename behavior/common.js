jQuery(document).ready(function() { 
	
	// dropdown
	$('.dropdown').each(function(){
		var $this 	= $(this)
			, $trigger 	=	$('.trigger', $this)
			;

		$trigger.on('click', function(e){
			e.preventDefault();

			if ($this.hasClass('_open')){
				$trigger.trigger('forced_close');
			} else {
				$trigger.trigger('forced_open');
			}

		});

		$trigger.on('forced_open', function() {
			$this.addClass('_open');
    });

		$trigger.on('forced_close', function() {
			$this.removeClass('_open');
    });

	});


	// outside click
	$('body').click(function(e){

		// dropdown
		if (!$(e.target).parents().hasClass('dropdown') &&
			$('.dropdown._open').length > 0 ) {
			$('.dropdown').find('.trigger').trigger('forced_close');
		}

	});

});
