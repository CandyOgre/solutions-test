Meteor.methods({
	addQuery: function(query) {
		Queries.insert(query);
	},

	deleteQuery: function(queryId) {
		var query = Queries.findOne(queryId);

		Queries.remove(queryId);
	},

	getSimplifyData: function(LatLng, input) {

		const CLIENT_ID = 'ZBFC3BYIZATNLHX1FDKFLQXONCQLFDVDDJDFQIMB12D5CCIT';
		const CLIENT_SECRET = 'NJLRNBE5NYHZO2SUHR0OKEVGOVIFEFUOUYYIBN4U2EGU4BKR';

		var request = "https://api.foursquare.com/v2/venues/search" +
		"?client_id=" + CLIENT_ID + 
		"&client_secret=" + CLIENT_SECRET +
		"&v=20140806" +
		"&ll=" + LatLng.lat + "," + LatLng.lng +
		"&radius=" + 500 +
		"&query=" + input;

		var response = HTTP.get(request).data.response;
		var venues = [];

		for(var i = 0; i < response.venues.length; i++) {
			var venue = {
				name: response.venues[i].name,
				city: response.venues[i].location.city,
				address: response.venues[i].location.address,
				lat: response.venues[i].location.lat,
				lng: response.venues[i].location.lng
			};

			venues.push(venue);
		}
		return(venues);
		//return request.data.response.venues.map(venue => _.pick(venue, [name,city,address,lat,lng]);
	},

	download: function(collectionToDownload) {
		var collection = collectionToDownload;
	    var heading = true; // Optional, defaults to true
  	    var delimiter = "," // Optional, defaults to ",";
  		
  		return exportcsv.exportToCSV(collection, heading, delimiter);
	},

});