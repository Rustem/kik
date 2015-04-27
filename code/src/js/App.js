var React = require('react');
var Router = require('react-router');
var AppActions = require('./actions/AppActions');
var UserWebAPI = require('./api/UserWebAPI');
var ApplicationWebAPI = require('./api/ApplicationWebAPI');
var routes = require('./router').routes;
var Fixtures = require('./fixtures');

Fixtures.init();

UserWebAPI.getAll(function(users){
    ApplicationWebAPI.getAll(function(applications){
        var appState = {
          	applications: applications,
            users: users
        };
        AppActions.load(appState);

        Router.run(routes, function(Handler, state){
          	React.render(<Handler />, document.getElementById('app'));
        })
    });
});