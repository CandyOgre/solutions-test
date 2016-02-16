Meteor.subscribe('queries');


var mapZoom = 18;

// var t = Geolocation.latLng;
// console.log(t);
var LatLng;
// if(Geolocation.latLng() != null)
//   LatLng = {lat: Geolocation.latLng.lat, lng: Geolocation.latLng.lng};
// else
  LatLng = {lat: -37.8136, lng: 144.9631};
// LatLng = {lat: 35.70, lng: 139.70};  // Tokyo

Template.body.helpers({
  exampleMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(LatLng.lat, LatLng.lng),
          zoom: mapZoom
        };
      }
    },
    queries: function() {
      return Queries.find({owner: Meteor.userId()});
    },
  });

Template.body.events({
  'click #search': function() {
    // create query and post it to search queries
    var input = $('input').val();
    var map = GoogleMaps.maps.exampleMap;

    LatLng = {
      lat: map.instance.center.lat(),
      lng: map.instance.center.lng()
    };

    var query = { 
      owner: Meteor.userId(),
      text: input,
      latitude: LatLng.lat,
      longitude: LatLng.lng,
      radius: (map.instance.zoom + 'km'),
      createdAt: new Date()
    };
    Meteor.call('addQuery', query);

    // call method to find venues in Foursquare and receive data
    Meteor.call('getVenues', LatLng, input, function(error, result) {
      if(result != null) {
        Meteor.call('simplifyData', result, function(error, result) {
          if(result != null)
            Session.set('venues', result);
        });
      }
    });

    // call method to  add markers to map
    Meteor.call('addMarker');
    // call method to add venues to a list

  },

});

Template.body.onRendered(function() {
  GoogleMaps.load();
});

Template.body.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});