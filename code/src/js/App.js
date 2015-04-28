window.React = require('react');
var Router = require('react-router');
var routes = require('./router').routes;
var Fixtures = require('./fixtures');
var AppActions = require('./actions/AppActions');
var UserWebAPI = require('./api/UserWebAPI');
var ApplicationWebAPI = require('./api/ApplicationWebAPI');
var ConclusionWebAPI = require('./api/ConclusionWebAPI');
var UserWebAPI = require('./api/UserWebAPI');

Fixtures.init();

UserWebAPI.getCurrentUser(function(current_user){
	UserWebAPI.getAll(function(users){
		ApplicationWebAPI.getAll(function(applications){
			ConclusionWebAPI.getAll(function(conclusions){

				var appState = {
					current_user: current_user,
					users: users,
				  	applications: applications,
				  	conclusions: conclusions,
				};
				AppActions.load(appState);

				Router.run(routes, function(Handler, state){
				  	React.render(<Handler />, document.getElementById('app'));
				});
				
			});
		});
	});
});
