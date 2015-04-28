window.React = require('react');
var Router = require('react-router');
var routes = require('./router').routes;
var Fixtures = require('./fixtures');
var AppActions = require('./actions/AppActions');
var ApplicationWebAPI = require('./api/ApplicationWebAPI');
var ConclusionWebAPI = require('./api/ConclusionWebAPI');

Fixtures.init();

ApplicationWebAPI.getAll(function(applications){
	ConclusionWebAPI.getAll(function(conclusions){

		var appState = {
		  	applications: applications,
		  	conclusions: conclusions,
		};
		AppActions.load(appState);

		Router.run(routes, function(Handler, state){
		  	React.render(<Handler />, document.getElementById('app'));
		});
		
	})
});
