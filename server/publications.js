Meteor.publish('queries', function() {
	return Queries.find( { owner: this.userId } );
});