window.React = require('react');
var Router = require('react-router');
var AppActions = require('./actions/AppActions');
var ApplicationWebAPI = require('./api/ApplicationWebAPI');
var routes = require('./router').routes;
var Fixtures = require('./fixtures');

Fixtures.init();

ApplicationWebAPI.getAll(function(applications){
	var appState = {
	  	applications: applications
	};
	AppActions.load(appState);

	Router.run(routes, function(Handler, state){
	  	React.render(<Handler />, document.getElementById('app'));
	})
});
