var markers = [];

setNewMarkers = function(venues, map) {
  if(venues == null) {
   console.log('No venues');
   return;
  } else {
   console.log('Venues received');
  }

  deleteMarkers();

  for (var i = 0; i < venues.length; i++) {
   var location = new google.maps.LatLng(venues[i].lat, venues[i].lng);
    addMarker(location);
   }
  setMapOnAll(map);
}

var addMarker = function(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: GoogleMaps.maps.exampleMap.instance
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
var setMapOnAll = function(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map ? map.instance : null);
  }
}

// Deletes all markers in the array by removing references to them.
var deleteMarkers = function() {
  setMapOnAll(null);
  markers = [];
}