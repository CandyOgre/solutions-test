Meteor.subscribe('queries');

Template.mainPage.onRendered(function() {
  GoogleMaps.load();
});

Template.mainPage.helpers({
  exampleMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(35.70, 139.70),
          zoom: 16
        };
      }
    },

  });

Template.mainPage.events({
  'click #search': function() {
    var input = $("input").val();
    if(_.isEmpty(input)) {
      alert('Enter search string! NOW!!');
      return;
    }
    $("input").val('');
    var map = GoogleMaps.maps.exampleMap;
    LatLng = {
      lat: map.instance.center.lat(),
      lng: map.instance.center.lng()
    };

    // Add search query to collection
    Meteor.call('addQuery', { 
      owner: Meteor.userId(),
      text: input,
      latitude: LatLng.lat,
      longitude: LatLng.lng,
      radius: (map.instance.zoom + 'km'),
      createdAt: moment().format("MMM D h:mm")
    });

    // get data from API request and set in Session variable
    Meteor.call('getSimplifyData', LatLng, input, function(error, result) {
      if(result != null)
        Session.set('venues', result);
    });

    // delete old markers and set new
    deleteMarkers();
    setNewMarkers(Session.get('venues'), map);
  },

});





var markers = [];

function setNewMarkers(venues, map) {
  if(venues == null) {
   console.log('No venues');
   return;
 }
 else {
   console.log('Venues received');
 }

 for (var i = 0; i < venues.length; i++) {
  var location = new google.maps.LatLng(venues[i].lat, venues[i].lng);
  addMarker(location);
}
setMapOnAll(map);
}

function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: GoogleMaps.maps.exampleMap.instance
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map ? map.instance : null);
  }
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  setMapOnAll(null);
  markers = [];
}
