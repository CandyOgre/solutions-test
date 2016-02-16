Meteor.methods({
	setNewMarkers: function(venues, map) {
		var markers = [];
    	 // delete old markers
	     // for (var j = 0; j < markers.length; j++) {
	     // 	markers[j].setMap(null);
	     // }

	     for (var i = 0; i < venues.length; i++) {
	     	var marker = new google.maps.Marker({
	     		position: new google.maps.LatLng(venues[i].lat, venues[i].lng),
	     		map: map.instance,
	     		title: venues[i].name
	     	});

	     	markers.push(marker);
	     	markers[i].setMap(map.instance);
	     }

	}

});