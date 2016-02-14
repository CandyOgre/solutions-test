Meteor.publish('queries', function() {
	return Queries.find();
	// return Queries.find( { owner: this.userId } );
});