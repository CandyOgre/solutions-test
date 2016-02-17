Template.queries.helpers({
	queries: function() {
      return Queries.find();
    },
});

Template.queries.events({
  'click .delete': function() {
    Meteor.call('deleteQuery', this._id);
  },
});