Meteor.subscribe('queries');

Template.body.helpers({
  exampleMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(-37.8136, 144.9631),
          zoom: 11
        };
      }
    },
    queries: function() {
      return Queries.find({});
    },
    numberOfVenues: function() {
      // we must return real number according to data from Foursquare
      return 1;
    },
  });

Template.body.events({
  'click #search': function(text) {
    // create query and post it to search queries
    console.log(text);
    // var query = { 
    //   'text': text,
    //   // where I must get it ??
    //   latitude: 123,
    //   longitude: 321,
    //   radius: '5km'
    // };

    // Meteor.call('addQuery', query);

    // call method to find venues in Foursquare and receive data
    // call method to add markers to map
    // call method to add venues to a list
  },
  'click #exportBtn': function() {
    // find out how to export to CSV data from array with venues
  }
});

Template.body.onRendered(function() {
  GoogleMaps.load();
});
