Queries = new Mongo.Collection('queries');

Meteor.methods({
	addQuery: function(query) {
		Queries.insert(query);
	},

	deleteQuery: function(queryId) {
		var query = Queries.findOne(queryId);

		Queries.remove(queryId);
	},
});