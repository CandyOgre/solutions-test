Template.query.events({
	'click .delete': function() {
		Meteor.call('deleteQuery', this._id);
	},
});