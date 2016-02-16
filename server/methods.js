Meteor.methods({
	addQuery: function(query) {
		Queries.insert(query);
	},

	deleteQuery: function(queryId) {
		var query = Queries.findOne(queryId);

		Queries.remove(queryId);
	},

	getVenues: function(LatLng, input) {
		const CLIENT_ID = 'ZBFC3BYIZATNLHX1FDKFLQXONCQLFDVDDJDFQIMB12D5CCIT';
		const CLIENT_SECRET = 'NJLRNBE5NYHZO2SUHR0OKEVGOVIFEFUOUYYIBN4U2EGU4BKR';

		var request = "https://api.foursquare.com/v2/venues/search" +
		"?client_id=" + CLIENT_ID + 
		"&client_secret=" + CLIENT_SECRET +
		"&v=20140806" +
		"&ll=" + LatLng.lat + "," + LatLng.lng +
		"&query=" + input;

		return HTTP.get(request);
	},

	simplifyData: function(request) {
		var venues = [];

		for(var i = 0; i < request.data.response.venues.length; i++) {
			var venue = {
				name: request.data.response.venues[i].name,
				city: request.data.response.venues[i].location.city,
				address: request.data.response.venues[i].location.address,
				lat: request.data.response.venues[i].location.lat,
				lng: request.data.response.venues[i].location.lng
			};
			venues.push(venue);
		}
		return(venues);
	},

	addMarker: function() {
		var myLatLng = {lat: -37.8136, lng: 144.9631};

		var marker = new google.maps.Marker({
			position: myLatLng,
			map: GoogleMaps.maps.exampleMap.instance,
			title: 'Hello World!'
		});

	},

	download: function(collectionToDownload) {
		var collection = collectionToDownload;
	    var heading = true; // Optional, defaults to true
  	    var delimiter = "," // Optional, defaults to ",";
  		
  		return exportcsv.exportToCSV(collection, heading, delimiter);
	},

});