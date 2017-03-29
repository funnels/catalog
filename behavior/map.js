jQuery(document).ready(function() { 

	function initMap() {
	 
		var map1 = new google.maps.Map(
			document.getElementById('map1'),
			{
		    center: new google.maps.LatLng(55.746029, 37.676460),
		    zoom: 16,
		  	panControl: false,
		  	mapTypeControl: false,
		  	streetViewControl: false,
		  	scrollwheel: false,
		  	cursor: 'crosshair'
			}
		);
	 
		var map2 = new google.maps.Map(
			document.getElementById('map2'),
			{
		    center: new google.maps.LatLng(55.746029, 37.676460),
		    zoom: 16,
		  	panControl: false,
		  	mapTypeControl: false,
		  	streetViewControl: false,
		  	scrollwheel: false,
		  	cursor: 'crosshair'
			}
		);

	}
	 
	google.maps.event.addDomListener(window, "load", initMap);

});

