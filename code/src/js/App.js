window.React = require('react');
var Router = require('react-router');
var routes = require('./router').routes;
var Fixtures = require('./fixtures');
var AppActions = require('./actions/AppActions');
var UserWebAPI = require('./api/UserWebAPI');
var ApplicationWebAPI = require('./api/ApplicationWebAPI');
var ConclusionWebAPI = require('./api/ConclusionWebAPI');
var UserWebAPI = require('./api/UserWebAPI');
var PersonWebAPI = require('./api/PersonWebAPI');
var NoteWebAPI = require('./api/NoteWebAPI');

// var utils = require('./utils');
// utils.checkPersonDetails({'iin': '01822'});

Fixtures.init();

UserWebAPI.getCurrentUser(function(current_user){
	UserWebAPI.getAll(function(users){
		ApplicationWebAPI.getAll(function(applications){
			ConclusionWebAPI.getAll(function(conclusions){
				PersonWebAPI.getAll(function(people) {
					NoteWebAPI.getAll(function(notes) {

						var appState = {
							current_user: current_user,
							users: users,
							people: people,
						  	applications: applications,
						  	conclusions: conclusions,
						  	notes: notes,
						};
						AppActions.load(appState);

						Router.run(routes, function(Handler, state){
						  	React.render(<Handler />, document.getElementById('app'));
						});
					});
				});

			});
		});
	});
});
