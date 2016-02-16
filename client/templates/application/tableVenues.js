Template.tableVenues.helpers({
	venues: function() {
		return Session.get('venues');
	},
	numberOfVenues: function() {
		return Session.get('venues').length;
	},
	venuesExist: function() {
		return Session.get('venues') != null;
	},
});

Template.tableVenues.events({
	'click #export-btn': function(event) {
		var nameFile = 'venues.csv';
		Meteor.call('download', Session.get('venues'), function(err, fileContent) {
			if(fileContent){
				var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
				saveAs(blob, nameFile);
			}
		});
	},

});
