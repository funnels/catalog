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


	// fix panel
	function fixPanel(){
		var $panel = $('.top-panel')
			, negativeIndent = parseInt($('.box.box-subheader').css('margin-top'))

			, panelTop = $('.site-header').outerHeight(true) 
										+ $('.box.box-subheader').outerHeight(true)
										- $panel.height()

			, panelTopXs = $('.site-header').outerHeight(true) 
										+ $('.box.box-subheader').outerHeight(true)
										- negativeIndent

			, flagToggle = true
			;

		if ($(window).scrollTop() >= panelTop) {
			$panel.addClass('_show');
			if (flagToggle) {
				$('.toggle-absolute').fadeIn();
				flagToggle = false;  
			}
		} else {
			$panel.removeClass('_show');
		}

		flagToggle = true;

		if ($(window).scrollTop() >= panelTopXs) {
			$panel.addClass('_show-xs');
			if (flagToggle) {
				$('.toggle-absolute').fadeIn();
				flagToggle = false;  
			}
		} else {
			$panel.removeClass('_show-xs');
		}
	}

	fixPanel();


	// popup
	$('.popup-link').magnificPopup({
	  closeMarkup: '<div class="mfp-close">'+
									'<svg class="icon-close"><use xlink:href="images/icons-vector.svg#close"></use></svg>'+
		            '</div>',
	  fixedContentPos: true,
		preloader: false,
		closeBtnInside: true,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
  });


	// window scroll
	$(window).scroll(function(){

		// top panel
		fixPanel();

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