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
			, $panelOpenerXs = $('.top-panel-opener-xs')
			, negativeIndent = parseInt($('.box.box-subheader').css('margin-top'))

			, panelTop = $('.site-header').outerHeight(true) 
										+ $('.box.box-subheader').outerHeight(true)
										- $panel.height()

			, panelTopXs = $('.site-header').outerHeight(true) 
										+ $('.box.box-subheader').outerHeight(true)
										- negativeIndent
			;

		if ($(window).scrollTop() >= panelTop) {
			$panel.addClass('_show');
		} else {
			$panel.removeClass('_show');
		}

		if ($(window).scrollTop() >= panelTopXs) {
			$panel.addClass('_show');
			$panelOpenerXs.addClass('_show');
		} else {
			$panel.removeClass('_show').removeClass('_show-xs');
			$panelOpenerXs.removeClass('_show');
		}
	}

	fixPanel();

	// opens top panel on xs screen
	$('.top-panel-opener-xs').each(function(){
		var $this = $(this);

		$this.on('close', function() {
			return $('.top-panel').removeClass('_show-xs');
		});

		$this.on('open', function() {
			return $('.top-panel').addClass('_show-xs');
		});
		
		$this.click(function(e){
			e.preventDefault();

			if ($('.top-panel').hasClass('_show-xs')){
				$(this).triggerHandler('close');
			} else {
				$(this).triggerHandler('open');
			}
		});

	});

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

  // tabs
  $('.tabs').responsiveTabs({
		rotate: false,
		startCollapsed: false,
		collapsible: true,
		setHash: true,
		scrollToAccordion: true,
		activate: function(event, tab){
			google.maps.event.trigger(map1, 'resize');
			google.maps.event.trigger(map2, 'resize');
		}
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

		// .top-panel
		if (	(!$(e.target).parents().is('.top-panel')) &&
					(!$(e.target).parents().is('.top-panel-opener-xs')) &&
					(!$(e.target).is('.top-panel-opener-xs')) &&
					$('.top-panel').hasClass('_show-xs')	){

			$('.top-panel-opener-xs').triggerHandler('close');
		}

	});

});