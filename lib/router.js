Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
});

Router.route('/', { name: 'mainPage' } );
